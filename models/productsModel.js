const pool = require ("../db/conection");

const obtenerProductos = async () => {
    const query = `SELECT * FROM productos`;
    const result = await pool.query(query);
    return result.rows;
}

const obtenerProducto = async (id) => {
    const values = [id];
    const query = `SELECT * FROM productos WHERE id_producto = $1`;
    const result = await pool.query(query, values);
    return result.rows;
}


const crearProducto = async (titulo, description, stock, tipo, url_imagen, precio) => {
    const values = [titulo, description, stock, tipo, url_imagen, precio]
    const query = `INSERT INTO productos (titulo, description, stock, tipo, url_imagen, precio) VALUES $1, $2, $3, $4, $5, $6 RETURNING *;`;
    const result = await pool.query(query, values);
    return result.rows;
}


const borrarProducto = async (id) => {
    const query = `DELETE FROM productos WHERE id = $1 RETURNING *;`;
    const result = await pool.query(query, [id]);
    return result.rows;
}



const actualizarProducto = async (id, cambios) => {
    const { titulo, description, stock, tipo, url_imagen, precio } = cambios;
    const values = [titulo, description, stock, tipo, url_imagen, precio]
    const query = `UPDATE productos SET titulo = $1, description = $2, stock = $3, tipo = $4, url_imagen = $5, precio = $6 WHERE id = $7 RETURNING *;`;
    const result = await pool.query(query, [...values, id]);
    return result.rows;
}


module.exports = {
    obtenerProducto,
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    borrarProducto
}