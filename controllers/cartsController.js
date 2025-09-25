const cartsModel = require("../models/cartsModel.js");

/* Status
200 OK → Petición exitosa.
201 Created → Recurso creado correctamente.
204 No Content → Éxito sin devolver contenido.
400 Bad Request → Petición malformada o datos inválidos.
401 Unauthorized → No autenticado (token inválido o faltante).
403 Forbidden → Autenticado, pero sin permisos.
404 Not Found → Recurso no encontrado.
409 Conflict → Conflicto con reglas de negocio (ej. duplicado, stock insuficiente).
500 Internal Server Error → Error inesperado en el servidor.
503 Service Unavailable → Servicio no disponible (temporalmente caído). 
*/

const getCart = async (req, res) => {
  try {
    const miCarrito = await cartsModel.obtenerCarrito(req.user.id);
    res.status(200).json(miCarrito);
  } catch (err) {
    console.error("Error en getCart:", err);
    res.status(err.code || 500).json({ error: "Error al obtener cart" });
  }
};

// FUNCION CREAR CARRITO SE INTEGRO AL CREAR USUARIO.
// const createCart = async (req, res) => {
//   try {
//     const miCarrito = await cartsModel.crearCarrito(req.user.id);
//     res.status(201).send(miCarrito);
//   } catch (err) {
//     console.error("Error en createCart:", err);
//     res.status(err.code || 500).json({ error: "Error al crear cart" });
//   }
// };

const addItemCart = async (req, res) => {
  const { id_carrito, id_producto } = req.body;
  const result = await cartsModel.agregarItemCarrito(id_carrito, id_producto);
  res.status(200).send(result);
};

const removeItemCart = async (req, res) => {
  const { id_carrito, id_producto } = req.body;
  const result = await cartsModel.disminuirItemCarrito(id_carrito, id_producto);
  res.status(204).send(result);
};

const deleteItemCart = async (req, res) => {
  const { id_carrito, id_producto } = req.body;
  const result = await cartsModel.eliminarProductoDelCarrito(
    id_carrito,
    id_producto
  );
  res.status(204).send(result);
};

// Antiguo método para calcular el total, PEEEEERO carrito esta devolviendo eso.
const getTotalCart = async (req, res) => {
  const { id_carrito } = req.body;
  const result = await cartsModel.obtenerTotalCarrito(id_carrito);
  res.status(200).json(result);
};

const checkOutCart = async (req, res) => {
  const result = await cartsModel.confirmarCarrito(req.user.id);
  res.status(201).send(result);
};

const getUserOrders = async (req, res) => {
  const result = await cartsModel.obtenerPedidosUsuario(req.user.id);
  res.status(200).json(result);
};

const admin_updateOrder = async (req, res) => {
  const { id_pedido, nuevo_estado } = req.body;
  const result = await cartsModel.admin_actualizarEstadoPedido(
    id_pedido,
    nuevo_estado
  );
  res.status(201).send(result);
};

const admin_deleteCart = async (req, res) => {
  const { id } = req.body;
  const result = await cartsModel.admin_BorrarCarrito(id);
  res.status(201).send(result);
};

const admin_getAllOrders = async (req, res) => {
  const result = await cartsModel.admin_ObtenerTodosPedidos();
  res.status(201).send(result);
};

module.exports = {
  getCart,

  addItemCart,
  removeItemCart,
  deleteItemCart,

  getTotalCart,

  checkOutCart,
  getUserOrders,

  admin_deleteCart,

  admin_updateOrder,
  admin_getAllOrders,
};
