const bcrypt = require("bcryptjs");
const pool = require("../db/conection");

const obtenerUsuarios = async () => {
  const query = `SELECT * FROM usuarios`;
  const result = await pool.query(query);
  return result.rows;
};

const obtenerUsuario = async (id) => {
  const values = [id];
  const query = `SELECT id, nombre, email, rol FROM usuarios WHERE id = $1;`;
  const { rows } = await pool.query(query, values);
  return rows;
};

const crearUsuario = async (newUser) => {
  try {
    let { nombre, email, password } = newUser;
    const saltRounds = 10; // estándar
    const passwordEncriptada = bcrypt.hashSync(password, saltRounds);
    const newUserHashed = [nombre, email, passwordEncriptada];
    const creandoUser = `INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING *;`;
    const { rows } = await pool.query(creandoUser, newUserHashed);

    return rows[0];
  } catch (error) {
    throw { code: 500, message: "Error al crear Usuario" };
  }
};
// si no existe, crear uno nuevo
const getOrCreate_CartUser = async (id_usuario) => {
  const crearCarro = `
    INSERT INTO carritos (id_usuario, estado)
    VALUES ($1, 'abierto')
    ON CONFLICT DO NOTHING
    RETURNING *;
  `;
  const { rows } = await pool.query(crearCarro, [id_usuario]);

  if (rows.length > 0) return rows[0];

  const { rows: existentes } = await pool.query(
    `SELECT * FROM carritos WHERE id_usuario = $1 AND estado = 'abierto'`,
    [id_usuario]
  );

  return existentes[0];
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
    throw {
      code: Number(404),
      message: `No se encontro ningun usuario con id: ${id}`,
    };
};

const actualizarUsuario = async (id, cambios) => {
  const { nombre, email, password, fecha_modificacion } = cambios;
  const saltRounds = 10;
  const passwordEncriptada = bcrypt.hashSync(password, saltRounds);
  const values = [nombre, email, passwordEncriptada, fecha_modificacion, id];
  const consulta = `UPDATE usuarios SET nombre = $1, email = $2, password = $3, fecha_modificacion = $5 WHERE id = $6 RETURNING *;`;
  const { rows, rowCount } = await pool.query(consulta, values);
  if (!rowCount)
    throw { code: 404, message: `No se encontro ningun user con id: ${id}` };
  return rows;
};

module.exports = {
  obtenerUsuario,
  obtenerUsuarios,
  crearUsuario,
  verificarCredenciales,
  borrarUsuario,
  actualizarUsuario,
  getOrCreate_CartUser,
};
