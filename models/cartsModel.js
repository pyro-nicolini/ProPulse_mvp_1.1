const pool = require("../db/conection");

// RESTRICCIONES:
/* 1. carrito abierto x usuario luego pasa a cerrado para historial
2. carrito es un contenedor de varios carritos_detalles
3. carrito_detalles tiene solo 1 id_producto (FOREIGN KEY) puede aumentar la cantidad
4. carrito_detalles tiene un precio_fijo (snapshot del precio en el momento de agregar al carrito)
5. Se debe calcular el subtotal (cantidad * precio_fijo) y total (suma de subtotales) en la app
*/



// CREA UN CARRITO ABIERTO si no hay conflicto
/*
(evitar errores en la app)
*/

const obtenerOCrearCarrito = async (id_usuario) => {
  const obtenerCarro = `
    SELECT * FROM carritos 
    WHERE id_usuario = $1 AND estado = 'abierto'
    LIMIT 1;
  `;
  const { rows } = await pool.query(obtenerCarro, [id_usuario]);

  if (rows.length > 0) {
    return rows[0]; // ya existe
  }

  // si no existe, crear uno nuevo
  const crearCarro = `
    INSERT INTO carritos (id_usuario, estado)
    VALUES ($1, 'abierto')
    RETURNING *;
  `;
  const { rows: nuevo } = await pool.query(crearCarro, [id_usuario]);
  return nuevo[0];
};


// agrega un producto, en la bd esta activado la unicidad (UNIQUE) lo que protege de errores de duplicados
// en vez de lanzar error, ON CONFLICT salta el error a DO UPDATE (para actualizar cantidad y subtotal)
// LEAST para que cantiddad no pueda superar el stock disponible => LEAST ( cantidad, stock maximo )
// EXCLUDED es una tabla virtual que representa los valores que se intentaron insertar

const agregarProductoAlCarrito = async (id_carrito, id_producto) => {
  const values = [id_carrito, id_producto];
  const sumarUno = `
    INSERT INTO carritos_detalle (id_carrito, id_producto, precio_fijo, cantidad, subtotal)
    VALUES ($1, $2, (SELECT precio FROM productos WHERE id_producto = $2), 1, (SELECT precio FROM productos WHERE id_producto = $2))

    ON CONFLICT (id_carrito, id_producto) DO UPDATE
    SET cantidad = LEAST(carritos_detalle.cantidad + 1, (
                          SELECT stock FROM productos WHERE id_producto = EXCLUDED.id_producto
                        )),
        subtotal = LEAST(carritos_detalle.cantidad + 1, (
                           SELECT stock FROM productos WHERE id_producto = EXCLUDED.id_producto
                         )) * EXCLUDED.precio_fijo
    RETURNING *;
  `;

  const result = await pool.query(sumarUno, values);
  return result.rows[0];
};


const disminuirProductoAlCarrito = async (id_carrito, id_producto) => {
  const values = [id_carrito, id_producto];

  const eliminarUno = `
    DELETE FROM carritos_detalle
    WHERE id_carrito = $1 AND id_producto = $2 AND cantidad = 1
    RETURNING *;
  `;
  const deleted = await pool.query(eliminarUno, values); // si se elimina delete devuelve datos
  if (deleted.rows.length > 0) { // aqui contamos si devolvio algo
    return deleted.rows[0]; // si se eliminó, devolver la fila borrada
  }

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
  
  const result = await pool.query(query, [id_carrito]);
  return result.rows[0]; // devuelves total, impuestos y gran_total
};

// Cerrar un carrito (cambia estado a cerrado)
const cerrarCarritoAbrirPedido = async (id_usuario) => {
  const datosCarrito = `
  SELECT * from carritos WHERE estado = 'abierto' AND id_usuario = $1;
  `
  const copiandoCarrito = await pool.query(datosCarrito, [id_usuario]);
  if (copiandoCarrito.rows.length === 0) {
    throw { code: 400, message: "No hay carrito abierto para este usuario" };
  }
  const { id_carrito } = copiandoCarrito.rows[0];

  const crearPedido = `
  INSERT INTO pedidos (id_usuario, estado, total_pedido)
  VALUES ($1, 'pendiente', (SELECT COALESCE(SUM(subtotal), 0) FROM carritos_detalle WHERE id_carrito = $2))
  RETURNING *;
  `;
  const nuevoPedido = await pool.query(crearPedido, [id_usuario, id_carrito]);
  const { id_pedido } = nuevoPedido.rows[0];

  const copiarDetalles = `
  INSERT INTO pedidos_detalle (id_pedido, id_producto, precio_fijo, cantidad, subtotal)
  SELECT $1, id_producto, precio_fijo, cantidad, subtotal
  FROM carritos_detalle
  WHERE id_carrito = $2;
  `;
  await pool.query(copiarDetalles, [id_pedido, id_carrito]);

   const updateQuery = `
   UPDATE carritos
   SET estado = 'cerrado'
   WHERE id_carrito = $1
   AND estado = 'abierto'
   RETURNING *;
 `;
 const cerrarCarro = await pool.query(updateQuery, [id_carrito]);
 return cerrarCarro.rows[0];
};

const actualizarEstadoPedido = async (id_pedido, nuevo_estado) => {
  const query = `
    UPDATE pedidos
    SET estado = $1
    WHERE id_pedido = $2
    RETURNING *;
  `;
  const result = await pool.query(query, [nuevo_estado, id_pedido]);
  return result.rows[0];
};

// Borrar carrito abierto de un usuario (solo admin)
const borrarCarrito = async (id_usuario) => {
  const query = `
    DELETE FROM carritos
    WHERE id_usuario = $1 AND estado = 'abierto'
    RETURNING *;
  `;
  const result = await pool.query(query, [id_usuario]);
  return result.rows[0];
};


// Historial de pedidos (admin)
const obtenerTodosPedidos = async () => {
  const query = `SELECT * FROM pedidos;`;
  const result = await pool.query(query);
  return result.rows;
};



module.exports = {
  obtenerOCrearCarrito,
  agregarProductoAlCarrito,
  disminuirProductoAlCarrito,
  cerrarCarritoAbrirPedido,
  actualizarEstadoPedido,
  borrarCarrito,
  obtenerTodosPedidos,
  obtenerTotalCarrito
};
