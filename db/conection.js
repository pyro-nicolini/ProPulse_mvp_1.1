const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  allowExitOnIdle: true,
  client_encoding: "UTF8",
});

module.exports = pool;

// Para la facilidad del ejercicio entre compañeros utilizamos esta configuración.

// Sabemos que nunca se deben incluir estos datos sensibles en un proyecto real y utilizar la variable de entorno.


