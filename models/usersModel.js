const bcrypt = require("bcryptjs");
const pool = require("../db/conection");

const obtenerUsuarios = async () => {
  const query = `SELECT * FROM usuarios`;
  const  result  = await pool.query(query);
  return result.rows;
};

const obtenerUsuario = async (id) => {
  const values = [id];
  const query = `SELECT id, nombre, email, rol FROM usuarios WHERE id = $1;`;
  const { rows } = await pool.query(query, values);
  return rows;
};

const crearUsuario = async (newUser) => {
  let { nombre, email, password } = newUser;
  const saltRounds = 10; // estándar
  const passwordEncriptada = bcrypt.hashSync(password, saltRounds);
  const values = [nombre, email, passwordEncriptada];
  const query = `INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING *;`;
  const { rows } = await pool.query(query, values);
  return rows[0]; 
};


const verificarCredenciales = async (email, password) => {
  const values = [email];
  const consulta = "SELECT * FROM usuarios WHERE email = $1";
  const {
    rows: [user],
    rowCount,
  } = await pool.query(consulta, values);
  if (!user || !rowCount) {
    throw { code: 401, message: "Usuario o contraseña incorrecta" };
  }
  const { password: passwordEncriptada } = user;
  const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada);
  if (!passwordEsCorrecta)
    throw { code: 401, message: "Usuario o contraseña incorrecta" };
  return user;
};

const borrarUsuario = async (id) => {
  const values = [id];
  const consulta = "DELETE FROM usuarios WHERE id = $1 AND rol = 'cliente'";
  const { rowCount } = await pool.query(consulta, values);
  if (!rowCount)
    throw { code: Number(404), message: `No se encontro ningun usuario con id: ${id}` };
};

const actualizarUsuario = async (id, cambios) => {
  const { nombre, email, password, rol, fecha_creacion } = cambios;
  const saltRounds = 10;
    const passwordEncriptada = bcrypt.hashSync(password, saltRounds);
    const values = [nombre, email, passwordEncriptada, rol, fecha_creacion, id];
    const consulta = `UPDATE usuarios SET nombre = $1, email = $2, password = $3, rol = $4, fecha_creacion = $5 WHERE id = $6 RETURNING *;`;
    const { rows, rowCount } = await pool.query(consulta, values);
    if (!rowCount)
      throw { code: 404, message: `No se encontro ningun user con id: ${id}` };
    return rows;
}

module.exports = {
  obtenerUsuario,
  obtenerUsuarios,
  crearUsuario,
  verificarCredenciales,
  borrarUsuario,
  actualizarUsuario,
};
