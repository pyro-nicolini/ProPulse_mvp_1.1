const pool = require("../db/conection");

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
  const values = [
    titulo,
    descripcion,
    stock,
    tipo,
    url_imagen,
    precio,
    id_producto,
  ];
  const query = `
    UPDATE productos 
    SET titulo = $1, descripcion = $2, stock = $3, tipo = $4, url_imagen = $5, precio = $6 
    WHERE id_producto = $7 
    RETURNING *;
  `;
  const result = await pool.query(query, values);
  return result.rows;
};

async function getLikesDelUserModel(id_usuario) {
  const query = `
    SELECT f.id_producto,
           p.titulo,
           p.url_imagen,
           p.likes_count,
           p.tipo
    FROM favoritos f
    INNER JOIN productos p ON f.id_producto = p.id_producto
    WHERE f.id_usuario = $1;
  `;
  const result = await pool.query(query, [id_usuario]);
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

const addResenaModel = async (id_producto, id_usuario, comentario, calificacion) => {
  const values = [id_producto, id_usuario, comentario, calificacion];
  const query = `
    INSERT INTO resenas (id_producto, id_usuario, comentario, calificacion) 
    VALUES ($1, $2, $3, $4) 
    RETURNING *;
  `;
  const result = await pool.query(query, values);
  return result.rows;
};

const updateResenaModel = async (id_producto,id_usuario, comentario, calificacion) => {
  const values = [id_producto, id_usuario, comentario, calificacion];
  const query = `
    UPDATE resenas 
    SET comentario = $3, calificacion = $4 
    WHERE id_producto = $1 AND id_usuario = $2
    RETURNING *;
  `;
  const result = await pool.query(query, values);
  return result.rows;
};

const deleteResenaModel = async (id_producto, id_usuario) => {
  const query = `
    DELETE FROM resenas 
    WHERE id_producto = $1 AND id_usuario = $2 RETURNING *;
  `;
  const result = await pool.query(query, [id_producto, id_usuario]);
  return result.rows;
};

module.exports = {
  obtenerProducto,
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  borrarProducto,
  getLikesDelUserModel,
  addLikeModel,
  removeLikeModel,
  getAllResenasModel,
  getResenaProductModel,
  addResenaModel,
  updateResenaModel,
  deleteResenaModel,
};
