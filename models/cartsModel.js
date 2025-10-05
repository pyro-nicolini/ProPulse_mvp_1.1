const pool = require("../db/conection");

// 🛒 Obtener carrito abierto del usuario
const obtenerCarrito = async (id_usuario) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM carritos WHERE id_usuario = $1 AND estado = 'abierto' LIMIT 1;`,
      [id_usuario]
    );

    if (rows.length === 0) return null;
    const carro = rows[0];

    const items = await pool.query(
      `SELECT d.id_item, d.id_carrito, d.id_producto, d.precio_fijo, d.cantidad, d.subtotal,
              p.titulo, p.descripcion, p.stock, p.tipo, p.url_imagen
       FROM carritos_detalle d
       LEFT JOIN productos p ON d.id_producto = p.id_producto
       WHERE d.id_carrito = $1;`,
      [carro.id_carrito]
    );

    const total = await pool.query(
      `SELECT 
          COALESCE(SUM(d.subtotal), 0) AS sub_total,
          COALESCE(SUM(d.subtotal), 0) * 0.19 AS impuestos,
          COALESCE(SUM(d.subtotal), 0) * 1.19 AS total_carrito
       FROM carritos_detalle d
       WHERE d.id_carrito = $1;`,
      [carro.id_carrito]
    );

    return { ...carro, items_carrito: items.rows, total: total.rows[0] };
  } catch {
    throw { code: 500, message: "Error al obtener carrito" };
  }
};

// ➕ Agregar item al carrito
const agregarItemCarrito = async (id_carrito, id_producto) => {
  const query = `
    INSERT INTO carritos_detalle (id_carrito, id_producto, precio_fijo, cantidad, subtotal)
    VALUES (
      $1, 
      $2, 
      (SELECT precio FROM productos WHERE id_producto = $2), 
      1, 
      (SELECT precio FROM productos WHERE id_producto = $2)
    )
    ON CONFLICT (id_carrito, id_producto) DO UPDATE
    SET cantidad = LEAST(
          carritos_detalle.cantidad + 1,
          COALESCE((SELECT stock FROM productos WHERE id_producto = EXCLUDED.id_producto), 1)
        ),
        subtotal = LEAST(
          carritos_detalle.cantidad + 1,
          COALESCE((SELECT stock FROM productos WHERE id_producto = EXCLUDED.id_producto), 1)
        ) * EXCLUDED.precio_fijo
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [id_carrito, id_producto]);
  return rows[0];
};

// ➖ Disminuir cantidad del carrito
const disminuirItemCarrito = async (id_carrito, id_producto) => {
  const values = [id_carrito, id_producto];
  const deleted = await pool.query(
    `DELETE FROM carritos_detalle
     WHERE id_carrito = $1 AND id_producto = $2 AND cantidad = 1
     RETURNING *;`,
    values
  );

  if (deleted.rows.length > 0) return deleted.rows[0];

  const updated = await pool.query(
    `UPDATE carritos_detalle
     SET cantidad = cantidad - 1,
         subtotal = (cantidad - 1) * precio_fijo
     WHERE id_carrito = $1 AND id_producto = $2
     RETURNING *;`,
    values
  );

  return updated.rows[0];
};

// ❌ Eliminar producto/servicio del carrito
const eliminarProductoDelCarrito = async (id_carrito, id_producto) => {
  const { rows } = await pool.query(
    `DELETE FROM carritos_detalle
     WHERE id_carrito = $1 AND id_producto = $2
     RETURNING *;`,
    [id_carrito, id_producto]
  );
  return rows[0];
};

// 💰 Calcular total del carrito
const obtenerTotalCarrito = async (id_carrito) => {
  const { rows } = await pool.query(
    `SELECT 
        COALESCE(SUM(subtotal), 0) AS sub_total,
        COALESCE(SUM(subtotal), 0) * 0.19 AS impuestos,
        COALESCE(SUM(subtotal), 0) * 1.19 AS total_carrito
     FROM carritos_detalle
     WHERE id_carrito = $1;`,
    [id_carrito]
  );
  return rows[0];
};

// ✅ Confirmar carrito → generar pedido y nuevo carrito
const confirmarCarrito = async (id_usuario) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const carritoRes = await client.query(
      `SELECT * FROM carritos WHERE estado = 'abierto' AND id_usuario = $1;`,
      [id_usuario]
    );
    if (carritoRes.rows.length === 0)
      throw { code: 400, message: "No hay carrito abierto para este usuario" };

    const { id_carrito } = carritoRes.rows[0];

    // Revisar stock solo en productos (no servicios)
    const stockCheck = await client.query(
      `SELECT cd.id_producto, cd.cantidad, p.stock, p.titulo, p.tipo
       FROM carritos_detalle cd
       INNER JOIN productos p ON cd.id_producto = p.id_producto
       WHERE cd.id_carrito = $1;`,
      [id_carrito]
    );

    for (const i of stockCheck.rows) {
      if (i.tipo === "producto" && i.cantidad > i.stock) {
        throw { code: 400, message: `Stock insuficiente para ${i.titulo}` };
      }
    }

    // Crear pedido
    const pedido = await client.query(
      `INSERT INTO pedidos (id_usuario, total_pedido)
       VALUES (
         $1,
         (SELECT COALESCE(SUM(subtotal), 0) FROM carritos_detalle WHERE id_carrito = $2)
       )
       RETURNING *;`,
      [id_usuario, id_carrito]
    );

    const id_pedido = pedido.rows[0].id_pedido;

    // Copiar detalles
    await client.query(
      `INSERT INTO pedidos_detalle (id_pedido, id_producto, precio_fijo, cantidad, subtotal)
       SELECT $1, id_producto, precio_fijo, cantidad, subtotal
       FROM carritos_detalle
       WHERE id_carrito = $2;`,
      [id_pedido, id_carrito]
    );

    // Restar stock solo a productos
    await client.query(
      `UPDATE productos
       SET stock = stock - cd.cantidad
       FROM carritos_detalle cd
       WHERE productos.id_producto = cd.id_producto
       AND cd.id_carrito = $1
       AND productos.tipo = 'producto';`,
      [id_carrito]
    );

    // Cerrar carrito actual y crear uno nuevo vacío
    await client.query(
      `UPDATE carritos
       SET estado = 'cerrado'
       WHERE id_carrito = $1 AND estado = 'abierto';`,
      [id_carrito]
    );

    await client.query(
      `INSERT INTO carritos (id_usuario, estado)
       VALUES ($1, 'abierto');`,
      [id_usuario]
    );

    await client.query("COMMIT");
    return { pedido: pedido.rows[0] };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

// 📦 Pedidos del usuario
const obtenerPedidosUsuario = async (id_usuario) => {
  const { rows } = await pool.query(
    `SELECT * FROM pedidos
     WHERE id_usuario = $1
     ORDER BY fecha_creacion DESC;`,
    [id_usuario]
  );

  const pedidos = [];
  for (const p of rows) {
    const items = await pool.query(
      `SELECT pd.id_detalle, pd.id_producto, pr.titulo, pr.url_imagen,
              pd.cantidad, pd.precio_fijo, pd.subtotal
       FROM pedidos_detalle pd
       INNER JOIN productos pr ON pd.id_producto = pr.id_producto
       WHERE pd.id_pedido = $1;`,
      [p.id_pedido]
    );
    pedidos.push({ ...p, items_pedido: items.rows });
  }
  return pedidos;
};

// 🧾 Admin: actualizar estado de pedido
const admin_actualizarEstadoPedido = async (id_pedido, nuevo_estado) => {
  const { rows } = await pool.query(
    `UPDATE pedidos
     SET estado = $1
     WHERE id_pedido = $2
     RETURNING *;`,
    [nuevo_estado, id_pedido]
  );
  return rows[0];
};

// 🗑️ Admin: borrar carrito abierto
const admin_borrarCarrito = async (id_usuario) => {
  const { rows } = await pool.query(
    `DELETE FROM carritos
     WHERE id_usuario = $1 AND estado = 'abierto'
     RETURNING *;`,
    [id_usuario]
  );
  return rows[0];
};

// 📋 Admin: listar todos los pedidos
const admin_obtenerTodosPedidos = async () => {
  const { rows } = await pool.query(`SELECT * FROM pedidos;`);
  return rows;
};

module.exports = {
  obtenerCarrito,
  agregarItemCarrito,
  disminuirItemCarrito,
  eliminarProductoDelCarrito,
  obtenerTotalCarrito,
  confirmarCarrito,
  obtenerPedidosUsuario,
  admin_actualizarEstadoPedido,
  admin_borrarCarrito,
  admin_obtenerTodosPedidos,
};
