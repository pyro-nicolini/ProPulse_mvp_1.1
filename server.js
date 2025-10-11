// server.js
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;
const cors = require("cors");

const authRoutes = require("./routes/auth");
const productsRoutes = require("./routes/products");
const marketplaceRoutes = require("./routes/marketplace");

const path = require("path");
const fs = require("fs");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static("."));

// Middleware para logging de solicitudes
app.use((req, _res, next) => {
  const fecha = new Date().toLocaleString("es-CL");
  const log = `[${fecha}] ${req.method} ${req.url}\n`;
  const rutaArchivo = path.join(__dirname, "logs.txt");

  fs.appendFile(rutaArchivo, log, (err) => {
    if (err) console.error("Error al escribir log:", err);
    else console.log("Log registrado:", log.trim());
  });

  next();
});

app.use("/", authRoutes);
app.use("/", productsRoutes);
app.use("/", marketplaceRoutes);

app.get("/", (_, res) => {
  res.status(200).json({
    api: "ProPulse API",
    version: "1.3.0",
    estado: "✅ Activa y funcionando correctamente",
    descripcion:
      "API REST Fullstack para productos, servicios, usuarios y operaciones del marketplace fitness ProPulse.",
    endpoints: {
      auth: {
        base: "/auth",
        me: "/auth/me",
        register: "/auth/register",
        login: "/auth/login",
      },
      usuarios: {
        base: "/usuarios",
        admin_get: "/usuarios",
        update: "/usuarios/:id",
        delete: "/usuarios/:id",
      },
      productos: {
        base: "/productos",
        detalle: "/productos/:id",
        admin_crear: "/productos/admin",
        admin_actualizar: "/productos/admin/:id",
        admin_borrar: "/productos/admin/:id",
      },
      favoritos: {
        base: "/likes",
        add: "/likes/:id_producto",
        remove: "/likes/:id_producto",
      },
      resenas: {
        base: "/resenas",
        producto: "/resenas/:id",
        add: "/resenas/:id",
        update: "/resenas/:id",
        delete: "/resenas/:id",
      },
      carritos: {
        base: "/carritos/me",
        agregar: "/carritos/detalle",
        disminuir: "/carritos/detalle (PATCH)",
        eliminar: "/carritos/detalle (DELETE)",
      },
      pedidos: {
        base: "/pedidos",
        misPedidos: "/pedidos/me",
        checkout: "/pedidos/checkout",
        detalle: "/pedidos/:id",
        admin_listar: "/pedidos/admin",
        admin_actualizar: "/pedidos/admin",
      },
      utils: {
        autenticacion: "asegurandoLaAuth() → valida sesión activa",
      },
    },
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Manejo de errores no capturados
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

// // Manejo de endpoints no encontrados
// app.use("*", (_, res) => {
//   res.status(404).json({ error: "Endpoint no encontrado" });
// });

module.exports = app;
