const cartsModel = require("../models/cartsModel.js");

const getCart = async (req, res) => {
  try {
    const carrito = await cartsModel.obtenerCarrito(req.user.id);
    res.status(200).json(carrito);
  } catch (err) {
    console.error("Error en getCart:", err);
    res.status(err.code || 500).json({ error: "Error al obtener carrito" });
  }
};

const addItemCart = async (req, res) => {
  try {
    const { id_carrito, id_producto } = req.body;
    const result = await cartsModel.agregarItemCarrito(id_carrito, id_producto);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error en addItemCart:", err);
    res.status(err.code || 500).json({ error: "Error al agregar producto" });
  }
};

const removeItemCart = async (req, res) => {
  try {
    const { id_carrito, id_producto } = req.body;
    const result = await cartsModel.disminuirItemCarrito(id_carrito, id_producto);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error en removeItemCart:", err);
    res.status(err.code || 500).json({ error: "Error al disminuir cantidad" });
  }
};

const deleteItemCart = async (req, res) => {
  try {
    const { id_carrito, id_producto } = req.body;
    const result = await cartsModel.eliminarProductoDelCarrito(id_carrito, id_producto);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error en deleteItemCart:", err);
    res.status(err.code || 500).json({ error: "Error al eliminar producto" });
  }
};

const getTotalCart = async (req, res) => {
  try {
    const { id_carrito } = req.body;
    const result = await cartsModel.obtenerTotalCarrito(id_carrito);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error en getTotalCart:", err);
    res.status(err.code || 500).json({ error: "Error al calcular total" });
  }
};

const checkOutCart = async (req, res) => {
  try {
    const result = await cartsModel.confirmarCarrito(req.user.id);
    res.status(201).json(result);
  } catch (err) {
    console.error("Error en checkOutCart:", err);
    res.status(err.code || 500).json({ error: err.message || "Error al cerrar carrito" });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const result = await cartsModel.obtenerPedidosUsuario(req.user.id);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error en getUserOrders:", err);
    res.status(err.code || 500).json({ error: "Error al obtener pedidos" });
  }
};

const admin_updateOrder = async (req, res) => {
  try {
    const { id_pedido, nuevo_estado } = req.body;
    const result = await cartsModel.admin_actualizarEstadoPedido(id_pedido, nuevo_estado);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error en admin_updateOrder:", err);
    res.status(err.code || 500).json({ error: "Error al actualizar pedido" });
  }
};

const admin_deleteCart = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await cartsModel.admin_borrarCarrito(id);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error en admin_deleteCart:", err);
    res.status(err.code || 500).json({ error: "Error al eliminar carrito" });
  }
};

const admin_getAllOrders = async (req, res) => {
  try {
    const result = await cartsModel.admin_obtenerTodosPedidos();
    res.status(200).json(result);
  } catch (err) {
    console.error("Error en admin_getAllOrders:", err);
    res.status(err.code || 500).json({ error: "Error al listar pedidos" });
  }
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
