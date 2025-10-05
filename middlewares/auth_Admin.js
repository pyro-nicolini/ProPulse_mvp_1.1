const jwt = require("jsonwebtoken");
const ultraSecreto = process.env.JWT_SECRET || "az_AZ";

/* 
LA AUTENTICACION Y AUTORIZACION SE REPETIA EN VARIOS CONTROLLERS, ASI QUE
SE EXTRAE A UN MIDDLEWARE PARA REUTILIZARLO


*/
function reqAuth(req, res, next) {
  const Authorization = req.header("Authorization");
  if (!Authorization || !Authorization.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Token no proporcionado o malformado" });
  }

  try {
    const token = Authorization.split("Bearer ")[1];
    const payload = jwt.verify(token, ultraSecreto);
    req.user = payload; // 👈👈👈👈👈 SE CREA OBJETO USER con el payload del token
    // ahora cualquier controller puede usar req.user.id, req.user.rol, etc.
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
}

function reqAdmin(req, res, next) {
  if (!req.user || req.user.rol !== "admin") {
    return res.status(403).json({ error: "Acceso denegado" });
  }
  next();
}

module.exports = { reqAuth, reqAdmin };
