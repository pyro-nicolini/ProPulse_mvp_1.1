const pool = require("../db/conection");

// LOGICA QUE ESPERO DEL CARRITO:
// 1. carrito abierto x usuario luego pasa a cerrado para historial
// 2. carrito es un contenedor de varios carritos_detalles
// 3. carrito_detalles tiene solo 1 id_producto (FOREIGN KEY) puede aumentar la cantidad
// 4. carrito_detalles tiene un precio_fijo (snapshot del precio en el momento de agregar al carrito, lo que uno pago no cambia)
// 5. Se debe calcular el subtotal (cantidad * precio_fijo) y total (suma de subtotales) en la app

// CREA O OBTIENE UN CARRITO ABIERTO con los items anidados y el total para que mantengamos la integridad
const obtenerCarrito = async (id_usuario) => {
  try {
    const obtenerCarro = `
      SELECT * FROM carritos
      WHERE id_usuario = $1 AND estado = 'abierto'
      LIMIT 1;
    `;
    const { rows } = await pool.query(obtenerCarro, [id_usuario]);

    if (rows.length === 0) return null; // No hay carrito abierto

    const carro = rows[0];

    // Traer detalles
    const obtenerItem = await pool.query(
      `
      SELECT 
        d.id_item, d.id_carrito, d.id_producto, d.precio_fijo, d.cantidad, d.subtotal,
        p.titulo, p.descripcion, p.stock, p.tipo, p.url_imagen
      FROM carritos_detalle d
      LEFT JOIN productos p ON d.id_producto = p.id_producto
      WHERE d.id_carrito = $1;
      `,
      [carro.id_carrito]
    );

    carro.items_carrito = obtenerItem.rows;

    // Totales
    const total = await pool.query(
      `
      SELECT 
        COALESCE(SUM(d.subtotal), 0) AS sub_total,
        COALESCE(SUM(d.subtotal), 0) * 0.19 AS impuestos,
        COALESCE(SUM(d.subtotal), 0) * 1.19 AS total_carrito
      FROM carritos_detalle d
      WHERE d.id_carrito = $1;
      `,
      [carro.id_carrito]
    );

    carro.total = total.rows[0];

    return carro;
  } catch (error) {
    throw { code: 500, message: "Error al obtener carrito" };
  }
};

// AGREGA UN PRODUCTO AL CARRITO (UNIQUE lanzara ERROR para evitar duplicados en el carro en schema)
// (ON CONCLICT)  se salta el ERROR y lanza DO UPDATE...
// actualizando la cantidad.

// LEAST para que cantidad no pueda superar el stock => LEAST ( cantidad, stock maximo )
// EXCLUDED es una tabla virtual que representa los valores que se intentaron insertar
const agregarItemCarrito = async (id_carrito, id_producto) => {
  const values = [id_carrito, id_producto];
  const sumarUno = `
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
          (SELECT stock FROM productos WHERE id_producto = EXCLUDED.id_producto)
        ),
        subtotal = LEAST(
          carritos_detalle.cantidad + 1,
          (SELECT stock FROM productos WHERE id_producto = EXCLUDED.id_producto)
        ) * EXCLUDED.precio_fijo
    RETURNING *;`;
  const result = await pool.query(sumarUno, values);
  return result.rows[0];
};

// DISMINUIR PRODUCTO DEL CARRITO
const disminuirItemCarrito = async (id_carrito, id_producto) => {
  const values = [id_carrito, id_producto];

  // Si cantidad = 1 → borrar fila
  const eliminarUno = `
    DELETE FROM carritos_detalle
    WHERE id_carrito = $1 AND id_producto = $2 AND cantidad = 1
    RETURNING *;
  `;
  const deleted = await pool.query(eliminarUno, values);
  if (deleted.rows.length > 0) {
    return deleted.rows[0];
  }

  // Si cantidad > 1 → restar uno
  const restarUno = `
    UPDATE carritos_detalle
    SET cantidad = cantidad - 1,
        subtotal = (cantidad - 1) * precio_fijo
    WHERE id_carrito = $1 AND id_producto = $2
    RETURNING *;
  `;
  const updated = await pool.query(restarUno, values);
  return updated.rows[0];
};

const eliminarProductoDelCarrito = async (id_carrito, id_producto) => {
  const values = [id_carrito, id_producto];
  const eliminarUno = `
    DELETE FROM carritos_detalle
    WHERE id_carrito = $1 AND id_producto = $2
    RETURNING *;
  `;
  const deleted = await pool.query(eliminarUno, values);
  if (deleted.rows.length > 0) {
    return deleted.rows[0];
  }
};

// TOTAL DEL CARRITO
// Obtener total del carrito (suma de subtotales) no se guarda hasta que se cierra
// COALESCE para manejar carritos vacíos
// Ej. El carrito 2 no tiene productos → SUM(...) devuelve NULL. COALESCE lo convierte en 0.
const obtenerTotalCarrito = async (id_carrito) => {
  const query = `
  SELECT 
  COALESCE(SUM(subtotal), 0) AS sub_total,
  COALESCE(SUM(subtotal), 0) * 0.19 AS impuestos,
  COALESCE(SUM(subtotal), 0) * 1.19 AS total_carrito
  FROM carritos_detalle
  WHERE id_carrito = $1;
  `;
  const total = await pool.query(query, [id_carrito]);
  return total.rows[0];
};

// CERRAR CARRITO Y ABRIR PEDIDO
const confirmarCarrito = async (id_usuario) => {
  const client = await pool.connect(); // Usar transacción para atomicidad

  try {
    await client.query("BEGIN");

    // Buscar carrito abierto
    const carritoDelUser = `
      SELECT * FROM carritos 
      WHERE estado = 'abierto' AND id_usuario = $1;
    `;
    const copiandoCarrito = await client.query(carritoDelUser, [id_usuario]);
    if (copiandoCarrito.rows.length === 0) {
      throw { code: 400, message: "No hay carrito abierto para este usuario" };
    }
    const { id_carrito } = copiandoCarrito.rows[0];

    // Verificar stock disponible antes de procesar
    const verificarStock = `
      SELECT cd.id_producto, cd.cantidad, p.stock, p.titulo
      FROM carritos_detalle cd
      INNER JOIN productos p ON cd.id_producto = p.id_producto
      WHERE cd.id_carrito = $1;
    `;
    const stockCheck = await client.query(verificarStock, [id_carrito]);

    // Validar que hay suficiente stock para todos los productos
    for (const item of stockCheck.rows) {
      if (item.cantidad > item.stock) {
        throw {
          code: 400,
          message: `Stock insuficiente para ${item.titulo}. Disponible: ${item.stock}, Solicitado: ${item.cantidad}`,
        };
      }
    }

    // Crear pedido
    const crearPedido = `
      INSERT INTO pedidos (id_usuario, total_pedido) 
      VALUES (
        $1,
        (SELECT COALESCE(SUM(subtotal), 0)    
         FROM carritos_detalle 
         WHERE id_carrito = $2)
      )
      RETURNING *;
    `;
    const nuevoPedido = await client.query(crearPedido, [
      id_usuario,
      id_carrito,
    ]);
    const { id_pedido } = nuevoPedido.rows[0];

    // Copiar detalles a pedidos_detalle
    const copiandoItems = `
      INSERT INTO pedidos_detalle (id_pedido, id_producto, precio_fijo, cantidad, subtotal)
      SELECT $1, id_producto, precio_fijo, cantidad, subtotal
      FROM carritos_detalle
      WHERE id_carrito = $2;
    `;
    await client.query(copiandoItems, [id_pedido, id_carrito]);

    // ⭐ NUEVO: Restar stock de los productos
    const restarStock = `
      UPDATE productos 
      SET stock = stock - cd.cantidad
      FROM carritos_detalle cd
      WHERE productos.id_producto = cd.id_producto 
      AND cd.id_carrito = $1;
    `;
    await client.query(restarStock, [id_carrito]);

    // Cerrar carrito usado
    const cerrandoCarrito = `
      UPDATE carritos
      SET estado = 'cerrado'
      WHERE id_carrito = $1 AND estado = 'abierto'
      RETURNING *;
    `;
    const cerrarCarro = await client.query(cerrandoCarrito, [id_carrito]);

    // Abrir un nuevo carrito vacío
    const nuevoCarrito = `
      INSERT INTO carritos (id_usuario, estado)
      VALUES ($1, 'abierto')
      RETURNING *;
    `;
    const carritoAbierto = await client.query(nuevoCarrito, [id_usuario]);

    await client.query("COMMIT");

    return {
      pedido: nuevoPedido.rows[0],
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const obtenerPedidosUsuario = async (id_usuario) => {
  const query = `
    SELECT p.*
    FROM pedidos p
    WHERE p.id_usuario = $1
    ORDER BY p.fecha_creacion DESC;
  `;
  const pedidosResult = await pool.query(query, [id_usuario]);
  const pedidos = pedidosResult.rows;

  if (pedidos.length === 0) {
    return [];
  }

  // Por cada pedido, traer sus items
  const pedidosConItems = [];
  for (const pedido of pedidos) {
    const detalleQuery = `
      SELECT pd.id_detalle,
             pd.id_producto,
             pr.titulo,
             pr.url_imagen,
             pd.cantidad,
             pd.precio_fijo,
             pd.subtotal
      FROM pedidos_detalle pd
      INNER JOIN productos pr ON pd.id_producto = pr.id_producto
      WHERE pd.id_pedido = $1;
    `;
    const detalleResult = await pool.query(detalleQuery, [pedido.id_pedido]);

    pedidosConItems.push({
      ...pedido,
      items_pedido: detalleResult.rows,
    });
  }

  return pedidosConItems;
};

// BORRAR CARRITO ABIERTO (ADMIN)
const admin_borrarCarrito = async (id_usuario) => {
  const query = `
    DELETE FROM carritos
    WHERE id_usuario = $1 AND estado = 'abierto'
    RETURNING *;
  `;
  const result = await pool.query(query, [id_usuario]);
  return result.rows[0];
};

// ACTUALIZAR ESTADO PEDIDO (ADMIN)
const admin_actualizarEstadoPedido = async (id_pedido, nuevo_estado) => {
  const query = `
    UPDATE pedidos
    SET estado = $1
    WHERE id_pedido = $2
    RETURNING *;
  `;
  const result = await pool.query(query, [nuevo_estado, id_pedido]);
  return result.rows[0];
};

// HISTORIAL DE PEDIDOS (ADMIN)
const admin_obtenerTodosPedidos = async () => {
  const query = `SELECT * FROM pedidos;`;
  const result = await pool.query(query);
  return result.rows;
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
