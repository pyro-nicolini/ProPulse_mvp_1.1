\c postgres;
drop database propulse;

CREATE DATABASE propulse;

\c propulse;

CREATE TABLE IF NOT EXISTS usuarios (
id SERIAL PRIMARY KEY,
nombre VARCHAR (120) NOT NULL,
email VARCHAR (160) NOT NULL, 
password VARCHAR (255) NOT NULL,
rol VARCHAR (20) NOT NULL DEFAULT 'cliente' CHECK (rol IN ('admin','cliente')),
fecha_creacion TIMESTAMP NOT NULL DEFAULT NOW(),
fecha_modificacion TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS productos (
id_producto SERIAL PRIMARY KEY,
id_admin INT NOT NULL REFERENCES usuarios(id),
titulo VARCHAR(200) NOT NULL,
descripcion TEXT NOT NULL,
stock INT CHECK (stock IS NULL OR stock >= 0),
tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('producto','servicio')),
categoria VARCHAR(20) NOT NULL CHECK (categoria IN ('suplementos','articulos deportivos', 'servicios personalizados', 'maquinas y equipos', 'ropa deportiva', 'accesorios', 'otros')) DEFAULT 'otros',
url_imagen VARCHAR(255) NOT NULL DEFAULT '',
url_imagen2 VARCHAR(255) NOT NULL DEFAULT '',
url_imagen3 VARCHAR(255) NOT NULL DEFAULT '',
url_imagen4 VARCHAR(255) NOT NULL DEFAULT '',
destacado BOOLEAN NOT NULL DEFAULT FALSE,
likes_count INT NOT NULL DEFAULT 0,
activo BOOLEAN NOT NULL DEFAULT TRUE,
precio NUMERIC (12,0) NOT NULL CHECK (precio >= 0),
fecha_creacion TIMESTAMP NOT NULL DEFAULT NOW(),
fecha_modificacion TIMESTAMP NOT NULL DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS carritos (
id_carrito SERIAL PRIMARY KEY,
id_usuario INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
estado VARCHAR(25) NOT NULL DEFAULT 'abierto' CHECK (estado IN('abierto','cerrado')),
fecha_creacion TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Agregar INDICE UNICO CONDICIONAL (solo permite 1 "abierto" por usuario) y muchos "cerrados"
CREATE UNIQUE INDEX IF NOT EXISTS uq_usuario_carrito_abierto
ON carritos (id_usuario)
WHERE estado = 'abierto';

CREATE TABLE IF NOT EXISTS carritos_detalle (
id_item SERIAL PRIMARY KEY,
id_carrito INT NOT NULL REFERENCES carritos(id_carrito) ON DELETE CASCADE,
id_producto INT NOT NULL REFERENCES productos(id_producto),
precio_fijo NUMERIC (12,0) NOT NULL CHECK (precio_fijo >= 0),
cantidad INT NOT NULL DEFAULT 1 CHECK (cantidad >=1),
subtotal NUMERIC (12,0) NOT NULL CHECK (subtotal >=0),
fecha_creacion TIMESTAMP NOT NULL DEFAULT NOW(),
UNIQUE (id_carrito, id_producto)
);

CREATE TABLE IF NOT EXISTS pedidos (
id_pedido SERIAL PRIMARY KEY,
id_usuario INT NOT NULL REFERENCES usuarios(id),
estado VARCHAR(25) NOT NULL DEFAULT 'pendiente' CHECK (estado IN('pendiente','pagado','enviado','entregado','cancelado')),
fecha_creacion TIMESTAMP NOT NULL DEFAULT NOW(),
total_pedido NUMERIC (12,0) NOT NULL CHECK (total_pedido >=0)
);

CREATE TABLE IF NOT EXISTS pedidos_detalle (
id_detalle SERIAL PRIMARY KEY,
id_pedido INT NOT NULL REFERENCES pedidos(id_pedido) ON DELETE CASCADE,
id_producto INT NOT NULL REFERENCES productos(id_producto),
precio_fijo NUMERIC (12,0) NOT NULL CHECK (precio_fijo >= 0),
cantidad INT NOT NULL CHECK (cantidad >=1),
subtotal NUMERIC (12,0) NOT NULL CHECK (subtotal >=0),
fecha_creacion TIMESTAMP NOT NULL DEFAULT NOW(),
UNIQUE (id_pedido, id_producto)
);

CREATE TABLE IF NOT EXISTS favoritos (
id_favorito SERIAL PRIMARY KEY,
id_usuario INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
id_producto INT NOT NULL REFERENCES productos(id_producto) ON DELETE CASCADE,
fecha_creacion TIMESTAMP NOT NULL DEFAULT NOW(),
UNIQUE (id_usuario, id_producto)
);

CREATE TABLE IF NOT EXISTS resenas (
id_resena SERIAL PRIMARY KEY,
id_usuario INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
id_producto INT NOT NULL REFERENCES productos(id_producto) ON DELETE CASCADE,
comentario VARCHAR(255) NOT NULL DEFAULT '',
calificacion INT NOT NULL CHECK (calificacion BETWEEN 1 AND 5),
fecha_creacion TIMESTAMP NOT NULL DEFAULT NOW(),
UNIQUE (id_usuario, id_producto)
);

