const { Pool } = require('pg');


const pool = new Pool({
  user: 'postgres',
  password: '1234',
  host: 'localhost',
  database: 'propulse',
  port: 5432,
  allowExitOnIdle: true
})


module.exports = pool;


// Para la facilidad del ejercicio entre compañeros utilizamos esta configuración. 

// Sabemos que nunca se deben incluir estos datos sensibles en un proyecto real y utilizar la variable de entorno.