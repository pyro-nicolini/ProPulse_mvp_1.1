const cartsModel = require("../models/cartsModel.js");

/* Códigos de estado HTTP usados:
   200 OK → Éxito en la petición
   201 Created → Recurso creado correctamente
   204 No Content → Éxito sin contenido devuelto
   400 Bad Request → Datos inválidos
   401 Unauthorized → Token ausente o inválido
   403 Forbidden → Sin permisos
   404 Not Found → Recurso no encontrado
   409 Conflict → Conflicto (stock, duplicados, etc.)
   500 Internal Server Error → Error inesperado
   503 Service Unavailable → Servicio no disponible temporalmente
*/

const getCart = async (req, res) => {
  try {
    const carrito = await cartsModel.obtenerCarrito(req.user.id);
    if (!carrito) return res.status(404).json({ message: "No hay carrito abierto." });
    res.status(200).json(carrito);
  } catch (err) {
    console.error("❌ Error en getCart:", err);
    res.status(err.code || 500).json({ error: err.message || "Error al obtener el carrito." });
  }
};

const addItemCart = async (req, res) => {
  try {
    const { id_carrito, id_producto } = req.body;
    if (!id_carrito || !id_producto)
      return res.status(400).json({ error: "Faltan datos requeridos." });

    const result = await cartsModel.agregarItemCarrito(id_carrito, id_producto);
    res.status(200).json(result);
  } catch (err) {
    console.error("❌ Error en addItemCart:", err);
    res.status(err.code || 500).json({
      error: err.message || "Error al agregar producto o servicio al carrito.",
    });
  }
};

const removeItemCart = async (req, res) => {
  try {
    const { id_carrito, id_producto } = req.body;
    if (!id_carrito || !id_producto)
      return res.status(400).json({ error: "Faltan datos requeridos." });

    const result = await cartsModel.disminuirItemCarrito(id_carrito, id_producto);
    res.status(200).json(result);
  } catch (err) {
    console.error("❌ Error en removeItemCart:", err);
    res.status(err.code || 500).json({
      error: err.message || "Error al disminuir cantidad del carrito.",
    });
  }
};

const deleteItemCart = async (req, res) => {
  try {
    const { id_carrito, id_producto } = req.body;
    if (!id_carrito || !id_producto)
      return res.status(400).json({ error: "Faltan datos requeridos." });

    const result = await cartsModel.eliminarProductoDelCarrito(id_carrito, id_producto);
    res.status(200).json(result);
  } catch (err) {
    console.error("❌ Error en deleteItemCart:", err);
    res.status(err.code || 500).json({
      error: err.message || "Error al eliminar producto o servicio del carrito.",
    });
  }
};

const getTotalCart = async (req, res) => {
  try {
    const { id_carrito } = req.body;
    if (!id_carrito)
      return res.status(400).json({ error: "Debe especificar un carrito." });

    const result = await cartsModel.obtenerTotalCarrito(id_carrito);
    res.status(200).json(result);
  } catch (err) {
    console.error("❌ Error en getTotalCart:", err);
    res.status(err.code || 500).json({
      error: err.message || "Error al calcular el total del carrito.",
    });
  }
};

const checkOutCart = async (req, res) => {
  try {
    const result = await cartsModel.confirmarCarrito(req.user.id);
    res.status(201).json(result);
  } catch (err) {
    console.error("❌ Error en checkOutCart:", err);
    res.status(err.code || 500).json({
      error:
        err.message ||
        "Error al confirmar el pedido. Verifica stock o conexión.",
    });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const result = await cartsModel.obtenerPedidosUsuario(req.user.id);
    res.status(200).json(result);
  } catch (err) {
    console.error("❌ Error en getUserOrders:", err);
    res.status(err.code || 500).json({
      error: err.message || "Error al obtener tus pedidos.",
    });
  }
};

const admin_updateOrder = async (req, res) => {
  try {
    const { id_pedido, estado } = req.body;

    if (!id_pedido || !estado) {
      return res.status(400).json({ error: "Datos incompletos." });
    }

    const pedidoActualizado = await cartsModel.admin_actualizarEstadoPedido(id_pedido, estado);

    if (!pedidoActualizado) {
      return res.status(404).json({ error: "Pedido no encontrado." });
    }

    res.status(200).json({
      message: "Estado actualizado correctamente.",
      pedido: pedidoActualizado,
    });
  } catch (err) {
    console.error("❌ Error en admin_updateOrder:", err);
    res.status(500).json({
      error: err.message || "Error al actualizar el estado del pedido.",
    });
  }
};

const admin_deleteCart = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id)
      return res.status(400).json({ error: "Debe indicar el id del usuario." });

    const result = await cartsModel.admin_borrarCarrito(id);
    res.status(200).json(result);
  } catch (err) {
    console.error("❌ Error en admin_deleteCart:", err);
    res.status(err.code || 500).json({
      error: err.message || "Error al eliminar el carrito abierto.",
    });
  }
};

const admin_getAllOrders = async (_req, res) => {
  try {
    const result = await cartsModel.admin_obtenerTodosPedidos();
    res.status(200).json(result);
  } catch (err) {
    console.error("❌ Error en admin_getAllOrders:", err);
    res.status(err.code || 500).json({
      error: err.message || "Error al obtener todos los pedidos.",
    });
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
  admin_updateOrder,
  admin_deleteCart,
  admin_getAllOrders,
};
