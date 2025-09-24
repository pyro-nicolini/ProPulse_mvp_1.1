const usersModel = require("../models/usersModel.js");


// Obtener usuario solo si el id del token coincide con el id solicitado. 
// gracias al MIDDLEWARE se puede usar  req.user.id, req.user.rol, etc

const getUser = async (req, res) => {
  try {
    const usuario = await usersModel.obtenerUsuario(req.user.id);
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

const jwt = require("jsonwebtoken");
const ultraSecreto = process.env.JWT_SECRET || "az_AZ";
// Login de usuario y generación de JWT
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "email y password son obligatorios" });
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

// la autorizacion de admin se maneja en el router con el middleware
const admin_getUsers = async (req, res) => {
  try {
    const usuarios = await usersModel.obtenerUsuarios();
    res.status(200).json(usuarios);
  } catch (err) {
    console.error("Error en admin_getUsers:", err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

// VIEJA VERSION
// const admin_getUsers = async (req, res) => {
//   try {
//     const Authorization = req.header("Authorization");
//     const token = Authorization?.split("Bearer ")[1];
//     const payload = jwt.verify(token, ultraSecreto);
//     if (payload.rol !== "admin") {
//       return res.status(403).send("No autorizado");
//     }

//     const usuarios = await usersModel.obtenerUsuarios();
//     res.status(200).json(usuarios);
//   } catch (err) {
//     console.error("Error en admin_getUsers:", err);
//     res.status(500).json({ error: "Error al obtener usuarios" });
//   }
// };

// Actualizar usuario y admin (global)
const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    // validación: puede actualizarse a sí mismo o si es admin
    if (Number(req.user.id) !== Number(id) && req.user.rol !== "admin") {
      return res.status(403).send("No tienes permiso para actualizar este usuario");
    }
    const fecha_modificacion = new Date().toISOString();
    const { nombre, email, password } = req.body;
    await usersModel.actualizarUsuario(id, {
      nombre,
      email,
      password,
      fecha_modificacion,
    });
    res.status(200).json({ mensaje: `Usuario ${id} actualizado con éxito` });
  } catch (err) {
    console.error("Error en updateUser:", err);
    res.status(err.code || 500).json({ error: "Error al actualizar usuario" });
  }
};
// Eliminar usuario (solo admin puede eliminar)
const admin_deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await usersModel.borrarUsuario(id);
    res.status(200).json({ mensaje: `Usuario ${id} eliminado con éxito` });
  } catch (err) {
    console.error("Error en admin_deleteUser:", err);
    res.status(err.code || 500).json({ error: "Error al eliminar usuario" });
  }
};

module.exports = {
  registerUser,
  getUser,
  admin_getUsers,
  loginUser,
  updateUser,
  admin_deleteUser,
};