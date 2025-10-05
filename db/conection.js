const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const connectionString = isProduction
  ? process.env.DATABASE_URL
  : `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const pool = new Pool({
  connectionString,
  ssl: isProduction
    ? { require: true, rejectUnauthorized: false }
    : undefined, // 🔹 Mejor usar undefined que false (evita warnings)
});

pool
  .connect()
  .then(() => {
    console.log(
      `✅ Connected to PSQL → ${isProduction ? "Render (producción)" : "Local (desarrollo)"}`
    );
  })
  .catch((err) => {
    console.error("❌ Error de conexión a PostgreSQL:");
    console.error(err.message || err);
  });

module.exports = pool;
