const productsModel = require("../models/productsModel.js");

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

const getProducts = async (req, res) => {
    const result = await productsModel.obtenerProductos();
    res.status(200).send(result);
}
const getProductsById = async (req, res) => {
    const  {id}  = req.params;
    const result = await productsModel.obtenerProducto(id);
    console.log(result);
    res.status(200).send(result[0]);
}

//_________________


const createProduct = async (req, res) => {
    const { titulo, descripcion, tipo, stock, url_imagen, precio  } = req.body;

    const result = await productsModel.crearProducto( titulo, descripcion, tipo, stock, url_imagen, precio );
    console.log(result);
    res.status(201).send(result);
}
const updateProduct = async (req, res) => {
    const { id_product, titulo, descripcion, tipo, stock, url_imagen, precio  } = req.body;
    const result = await productsModel.actualizarProducto(id_product, titulo, descripcion, tipo, stock, url_imagen, precio);
    res.status(200).send(result);
}
const deleteProduct = async (req, res) => {
    const { id_producto } = req.body;
    await productsModel.borrarProducto(id_producto);
    res.status(204).send();
}

module.exports = {
    getProducts,
    getProductsById,
    createProduct,
    updateProduct,
    deleteProduct
}