const usersModel = require("../models/usersModel.js");
const jwt = require("jsonwebtoken");

const ultraSecreto = process.env.JWT_SECRET || "az_AZ";

// Obtener usuario solo si el id del token coincide con el id solicitado
const getUser = async (req, res) => {
  try {
    const Authorization = req.header("Authorization");
    if (!Authorization || !Authorization.startsWith("Bearer ")) {
      return res.status(401).send("Token no proporcionado o malformado");
    }
    const token = Authorization.split("Bearer ")[1];
    const payload = jwt.verify(token, ultraSecreto);
    const userIdFromToken = parseInt(payload.id);

    if (!userIdFromToken) {
      return res.status(403).json({ error: "No autorizado" });
    }
    const usuario = await usersModel.obtenerUsuario(userIdFromToken);
    res.status(200).json(usuario);
  } catch (err) {
    console.error("Error en getUser:", err);
    res.status(err.code || 500).json({ error: "Error al obtener usuario" });
  }
};

// Registrar nuevo usuario
const registerUser = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const nuevoUsuario = await usersModel.crearUsuario({
      nombre,
      email,
      password,
    });
    if (!nuevoUsuario || !nuevoUsuario.id) {
      return res.status(400).json({ error: "No se pudo crear el usuario" });
    }
    res.status(201).json({ nuevoUsuario });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: error.message || "Error al crear usuario" });
  }
};

// Login de usuario y generación de JWT
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "email y password son obligatorios" });
    }
    const usuario = await usersModel.verificarCredenciales(email, password);
    if (!usuario) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }
    // datos para el payload
    const payload = {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
    };
    // generar token
    const token = jwt.sign(payload, ultraSecreto, { expiresIn: "1d" });
    // responder
    res.status(200).json({
      token,
      user: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        fecha_creacion: usuario.fecha_creacion,
        fecha_modificacion: usuario.fecha_modificacion,
      },
    });
  } catch (err) {
    console.error("Error en loginUser:", err);
    res.status(500).json({ error: err.message || "Error en login" });
  }
};

const getUsers = async (req, res) => {
  try {
    const Authorization = req.header("Authorization");
    const token = Authorization?.split("Bearer ")[1];
    const payload = jwt.verify(token, ultraSecreto);
    if (payload.rol !== "admin") {
      return res.status(403).send("No autorizado");
    }

    const usuarios = await usersModel.obtenerUsuarios();
    res.status(200).json(usuarios);
  } catch (err) {
    console.error("Error en getUsers:", err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

// Actualizar usuario
const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const Authorization = req.header("Authorization");
    if (!Authorization || !Authorization.startsWith("Bearer ")) {
      return res.status(401).send("Token no proporcionado o malformado");
    }
    const token = Authorization.split("Bearer ")[1];
    const payload = jwt.verify(token, ultraSecreto);
    if (Number(payload.id) !== Number(id) && payload.rol !== "admin") {
      return res
        .status(403)
        .send("No tienes permiso para actualizar este usuario");
    }
    const fecha_modificacion = new Date().toISOString();
    const { nombre, email, password, rol } = req.body;
    await usersModel.actualizarUsuario(id, {
      nombre,
      email,
      password,
      rol,
      fecha_modificacion,
    });
    res.status(200).json({ mensaje: `Usuario ${id} actualizado con éxito` });
  } catch (err) {
    console.error("Error en updateUser:", err);
    res.status(err.code || 500).json({ error: "Error al actualizar usuario" });
  }
};

// Eliminar usuario (solo admin puede eliminar)
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const Authorization = req.header("Authorization");
    if (!Authorization || !Authorization.startsWith("Bearer ")) {
      return res.status(401).send("Token no proporcionado o malformado");
    }
    const token = Authorization.split("Bearer ")[1];
    const payload = jwt.verify(token, ultraSecreto);
    if (payload.rol !== "admin") {
      return res
        .status(403)
        .send("No tienes permiso para eliminar este usuario");
    }
    await usersModel.borrarUsuario(id);
    res.status(200).json({ mensaje: `Usuario ${id} eliminado con éxito` });
  } catch (err) {
    console.error("Error en deleteUser:", err);
    res.status(err.code || 500).json({ error: "Error al eliminar usuario" });
  }
};

module.exports = {
  registerUser,
  getUser,
  getUsers,
  loginUser,
  updateUser,
  deleteUser,
};