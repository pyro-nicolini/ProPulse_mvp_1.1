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

// GET todos los productos
const getProducts = async (req, res) => {
  try {
    const result = await productsModel.obtenerProductos();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

// GET producto por id
const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productsModel.obtenerProducto(id);
    if (!result.length) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener producto" });
  }
};

// POST crear producto
const createProduct = async (req, res) => {
  try {
    const { titulo, descripcion, stock, tipo, url_imagen, precio } = req.body;
    const result = await productsModel.crearProducto(
      titulo,
      descripcion,
      stock,      // ✅ orden corregido
      tipo,
      url_imagen,
      precio
    );
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "Error al crear producto" });
  }
};

// PUT actualizar producto
const updateProduct = async (req, res) => {
  try {
    const { id_producto, titulo, descripcion, stock, tipo, url_imagen, precio } = req.body;
    const result = await productsModel.actualizarProducto(
      id_producto,
      titulo,
      descripcion,
      stock,
      tipo,
      url_imagen,
      precio
    );
    if (!result.length) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar producto" });
  }
};

// DELETE producto
const deleteProduct = async (req, res) => {
  try {
    const { id_producto } = req.params;
    const result = await productsModel.borrarProducto(id_producto);
    if (!result.length) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar producto" });
  }
};

// GET verificar si usuario dio like a producto
const getUserLikeProduct = async (req, res) => {
  try {
    const { id_producto } = req.params;
    const result = await productsModel.getUserLikeProductModel(req.user.id, id_producto);
    res.status(200).json({ liked: result.length > 0 }); // ✅ corregido
  } catch (err) {
    res.status(500).json({ error: "Error al verificar like" });
  }
};

// POST agregar like
const addLike = async (req, res) => {
  try {
    const { id_producto } = req.body;
    const result = await productsModel.addLikeModel(req.user.id, id_producto);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "Error al agregar like" });
  }
};

// DELETE quitar like
const removeLike = async (req, res) => {
  try {
    const { id_producto } = req.params;
    const result = await productsModel.removeLikeModel(req.user.id, id_producto);
    if (!result) {
      return res.status(404).json({ error: "Like no encontrado" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar like" });
  }
};


// GET todas las reseñas (admin)
const admin_getAllResenas = async (req, res) => {
  try {
    const result = await productsModel.getAllResenasModel();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener reseñas" });
  }
};

// GET reseñas de un producto
const getResenaProduct = async (req, res) => {
  try {
    const { id_producto } = req.params;
    const result = await productsModel.getResenaProductModel(id_producto);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener reseñas del producto" });
  }
};

// POST agregar reseña
const addResena = async (req, res) => {
  try {
    const { id_producto, resena, calificacion } = req.body;
    const result = await productsModel.addResenaModel(
      id_producto,
      resena,
      calificacion
    );
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "Error al agregar reseña" });
  }
};

// PUT actualizar reseña
const updateResena = async (req, res) => {
  try {
    const { id_resena, resena, calificacion } = req.body;
    const result = await productsModel.updateResenaModel(
      id_resena,
      resena,
      calificacion
    );
    if (!result.length) {
      return res.status(404).json({ error: "Reseña no encontrada" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar reseña" });
  }
};

// DELETE reseña
const deleteResena = async (req, res) => {
  try {
    const { id_resena } = req.params;
    const result = await productsModel.deleteResenaModel(id_resena);
    if (!result.length) {
      return res.status(404).json({ error: "Reseña no encontrada" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar reseña" });
  }
};

module.exports = {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
  getUserLikeProduct,
  addLike,
  removeLike,
  admin_getAllResenas,
  getResenaProduct,
  addResena,
  updateResena,
  deleteResena,
};
