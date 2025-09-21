const cartsModel = require("../models/cartsModel.js");
const jwt = require("jsonwebtoken");
const ultraSecreto = process.env.JWT_SECRET || "az_AZ";

const getOrCreateCart = async (req, res) => {
  try {
    const Authorization = req.header("Authorization");
    if(!Authorization || !Authorization.startsWith("Bearer ")) {
      return res.status(401).send("Token no proporcionado o malformado")
    }
    const token = Authorization.split("Bearer ")[1];
    const payload = jwt.verify(token, ultraSecreto);
    const userIdFromToken = parseInt(payload.id);
    if (!userIdFromToken) {
      return res.status(403).json({ error: "No autorizado" });
    }
    const { id } = payload;
    const miCarrito = await cartsModel.obtenerOCrearCarrito(id);
    console.log("Carrito Creado!", miCarrito);
    res.status(200).json(miCarrito);
  } catch (err) {
    console.error("Error en getOrCreateCart:", err);
    res
      .status(err.code || 500)
      .json({ error: "Error al obtener o crear carrito" });
  }
};

const AddItemCart = async (req, res) => {
  const { id_carrito, id_producto } = req.body;
  const result = await cartsModel.agregarProductoAlCarrito(id_carrito, id_producto);
  res.status(200).json(result);
};





// const removeItemCart = async (req, res) => {
//   const { id } = req.body;
//   const result = await cartsModel.disminuirProductoAlCarrito(id);
// };
// const getTotalCart = async (req, res) => {
//   const { id } = req.body;
//   const result = await cartsModel.obtenerTotalCarrito(id);
// };
// const closeCart = async (req, res) => {
//   const { id } = req.body;
//   const result = await cartsModel.cerrarCarritoAbrirPedido(id);
// };
// const deleteCartAdmin = async (req, res) => {
//   const { id } = req.body;
//   const result = await cartsModel.borrarCarrito(id);
// };
// const getAllOrdersAdmin = async (req, res) => {
//   const { id } = req.body;
//   const result = await cartsModel.obtenerTodosPedidos();
// };

module.exports = {
  getOrCreateCart,
  AddItemCart
}
  // AddItemCart,
  // removeItemCart,
  // getTotalCart,
  // closeCart,
  // deleteCartAdmin,
  // getAllOrdersAdmin
