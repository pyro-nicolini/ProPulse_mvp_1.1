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
  res.json({
    message: "Bienvenido a ProPulse API",
    version: "1.0.0",
    endpoints: {
      users: "/auth/users",
      products: "/productos",
      carts: "/carritos",
      orders: "/pedidos",
      favorites: "/favoritos",
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
