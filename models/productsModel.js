const pool = require("../db/conection");

// --- PRODUCTOS ---
const obtenerProductos = async () => {
  const query = `SELECT * FROM productos`;
  const result = await pool.query(query);
  return result.rows;
};

const obtenerProducto = async (id) => {
  const query = `SELECT * FROM productos WHERE id_producto = $1`;
  const result = await pool.query(query, [id]);
  return result.rows;
};

const crearProducto = async (
  titulo,
  descripcion,
  stock,
  tipo,
  url_imagen,
  precio
) => {
  const values = [titulo, descripcion, stock, tipo, url_imagen, precio];
  const query = `
    INSERT INTO productos (titulo, descripcion, stock, tipo, url_imagen, precio) 
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING *;
  `;
  const result = await pool.query(query, values);
  return result.rows;
};

const borrarProducto = async (id_producto) => {
  const query = `DELETE FROM productos WHERE id_producto = $1 RETURNING *;`;
  const result = await pool.query(query, [id_producto]);
  return result.rows;
};

const actualizarProducto = async (
  id_producto,
  titulo,
  descripcion,
  stock,
  tipo,
  url_imagen,
  precio
) => {
  const values = [titulo, descripcion, stock, tipo, url_imagen, precio, id_producto];
  const query = `
    UPDATE productos 
    SET titulo = $1, descripcion = $2, stock = $3, tipo = $4, url_imagen = $5, precio = $6 
    WHERE id_producto = $7 
    RETURNING *;
  `;
  const result = await pool.query(query, values);
  return result.rows;
};

// --- FAVORITOS ---
async function getUserLikeProductModel(id_usuario, id_producto) {
  const result = await pool.query(
    `SELECT * FROM favoritos WHERE id_usuario = $1 AND id_producto = $2`,
    [id_usuario, id_producto]
  );
  return result.rows;
}

async function addLikeModel(id_usuario, id_producto) {
  const result = await pool.query(
    `INSERT INTO favoritos (id_usuario, id_producto)
     VALUES ($1, $2)
     ON CONFLICT DO NOTHING`,
    [id_usuario, id_producto]
  );

  if (result.rowCount > 0) {
    await pool.query(
      `UPDATE productos
       SET likes_count = likes_count + 1
       WHERE id_producto = $1`,
      [id_producto]
    );
  }

  return { success: true, id_producto };
}

async function removeLikeModel(id_usuario, id_producto) {
  const result = await pool.query(
    `DELETE FROM favoritos
     WHERE id_usuario = $1 AND id_producto = $2`,
    [id_usuario, id_producto]
  );

  if (result.rowCount > 0) {
    await pool.query(
      `UPDATE productos
       SET likes_count = GREATEST(likes_count - 1, 0)
       WHERE id_producto = $1`,
      [id_producto]
    );
  }

  return { success: true, id_producto };
}

// --- RESEÑAS ---
const getAllResenasModel = async () => {
  const query = `SELECT * FROM resenas;`;
  const result = await pool.query(query);
  return result.rows;
};

const getResenaProductModel = async (id_producto) => {
  const query = `SELECT * FROM resenas WHERE id_producto = $1;`;
  const result = await pool.query(query, [id_producto]);
  return result.rows;
};

const addResenaModel = async (id_producto, resena, calificacion) => {
  const values = [id_producto, resena, calificacion];
  const query = `
    INSERT INTO resenas (id_producto, resena, calificacion) 
    VALUES ($1, $2, $3) 
    RETURNING *;
  `;
  const result = await pool.query(query, values);
  return result.rows;
};

// Aquí mejor usar id_resena para identificar reseñas individuales
const updateResenaModel = async (id_resena, resena, calificacion) => {
  const values = [resena, calificacion, id_resena];
  const query = `
    UPDATE resenas 
    SET resena = $1, calificacion = $2 
    WHERE id_resena = $3 
    RETURNING *;
  `;
  const result = await pool.query(query, values);
  return result.rows;
};

const deleteResenaModel = async (id_resena) => {
  const query = `
    DELETE FROM resenas 
    WHERE id_resena = $1 
    RETURNING *;
  `;
  const result = await pool.query(query, [id_resena]);
  return result.rows;
};

module.exports = {
  obtenerProducto,
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  borrarProducto,
  getUserLikeProductModel,
  addLikeModel,
  removeLikeModel,
  getAllResenasModel,
  getResenaProductModel,
  addResenaModel,
  updateResenaModel,
  deleteResenaModel,
};
