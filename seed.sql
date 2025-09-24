

INSERT INTO usuarios (nombre, email, password, rol) VALUES
('admin','admin@admin.com', '$2b$10$fKZgXe6y2fAOmPbbQ4XWt.WIbhMW0Dg15xzOhZ0m1Q1im4FvIF7uC','admin');

INSERT INTO usuarios (nombre, email, password) VALUES
('cliente','cliente@cliente.com', '$2b$10$uy6iwIOExIrCMQ4QBuT5au48lm9H7BNCzCUzB4E7.B/NZqwpCdaBS');


INSERT INTO productos (id_admin, titulo, descripcion, stock, tipo, url_imagen, destacado, activo, precio) VALUES
(1, 'Mancuernas Ajustables 40kg', 'Par de mancuernas de acero con seguro rápido.', 15, 'producto', 'https://images.pexels.com/photos/6339487/pexels-photo-6339487.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', false, true, 120000),
(1, 'Kettlebell 24kg',            'Pesa rusa de hierro fundido con base plana.',   20, 'producto', 'https://images.pexels.com/photos/8612034/pexels-photo-8612034.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', false, true,  85000),
(1, 'Banda Elástica Pro',         'Set de bandas de resistencia múltiples.',       40, 'producto', 'https://images.pexels.com/photos/14925384/pexels-photo-14925384.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', false, true,  25000),
(1, 'Colchoneta Yoga Premium',    'EVA antideslizante 8mm, ideal para pilates.',   30, 'producto', 'https://images.pexels.com/photos/6339731/pexels-photo-6339731.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', true,  true,  32000),
(1, 'Barra Olímpica 20kg',        'Barra de entrenamiento estándar 28mm.',         10, 'producto', 'https://images.pexels.com/photos/19025673/pexels-photo-19025673.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', false, true, 180000),
(1, 'Discos Bumper 2x10kg',       'Discos recubiertos de goma, bajo rebote.',      25, 'producto', 'https://images.pexels.com/photos/4451119/pexels-photo-4451119.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', false, true,  99000),
(1, 'Cuerda de Saltar Speed',     'Rodamientos metálicos, alta velocidad.',        60, 'producto', 'https://images.pexels.com/photos/4587694/pexels-photo-4587694.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', false, true,  15000),
(1, 'Rodillo de Espuma 45cm',     'Masaje miofascial media densidad.',             18, 'producto', 'https://images.pexels.com/photos/4587694/pexels-photo-4587694.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', false, true,  22000),
(1, 'Botella Térmica 750ml',      'Acero inoxidable doble pared.',                 50, 'producto', 'https://images.pexels.com/photos/18466691/pexels-photo-18466691.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', false, true,  18000),
(1, 'Guantes de Gimnasio',        'Cuero sintético, agarre y protección.',         35, 'producto', 'https://images.pexels.com/photos/6456153/pexels-photo-6456153.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', false, true,  17000),

-- ===== 10 SERVICIOS =====
(1, 'Servicio Montaje Muro 6m',   'Muro de escalada mediano con monitores.',       NULL, 'servicio', 'https://images.pexels.com/photos/31602610/pexels-photo-31602610.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', true,  true, 270000),
(1, 'Servicio Montaje Muro 8m',   'Muro alto para eventos corporativos.',          NULL, 'servicio', 'https://images.pexels.com/photos/31602610/pexels-photo-31602610.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', false, true, 450000),
(1, 'Clase Personal Trainer',     'Sesión 60 min personalizada en domicilio.',     NULL, 'servicio', 'https://images.pexels.com/photos/6455920/pexels-photo-6455920.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', false, true, 35000),
(1, 'Servicio Slackline Básico',  'Instalación y guía de slackline 15m.',          NULL, 'servicio', 'https://images.pexels.com/photos/13776712/pexels-photo-13776712.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', false, true, 60000),
(1, 'Servicio Slackline Pro',     'Slackline con trucos y show.',                  NULL, 'servicio', 'https://images.pexels.com/photos/13776712/pexels-photo-13776712.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', false, true, 120000),
(1, 'Animación Deportiva Kids',   'Juegos y circuitos infantiles (2 monitores).',  NULL, 'servicio', 'https://images.pexels.com/photos/5485460/pexels-photo-5485460.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', false, true, 140000),
(1, 'Clínica Running 90min',      'Técnica, calentamiento y plan básico.',         NULL, 'servicio', 'https://images.pexels.com/photos/33879982/pexels-photo-33879982.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', false, true, 55000),
(1, 'Taller Movilidad Corporal',  'Workshop grupal de movilidad y estiramientos.', NULL, 'servicio', 'https://images.pexels.com/photos/25596885/pexels-photo-25596885.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', false, true, 90000),
(1, 'Servicio Sonido Básico',     'Amplificación para evento deportivo pequeño.',  NULL, 'servicio', 'https://images.pexels.com/photos/30836116/pexels-photo-30836116.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', false, true, 80000),
(1, 'Producción Evento Fit Day',  'Coordinación full-day + staff.',                NULL, 'servicio', 'https://images.pexels.com/photos/18466691/pexels-photo-18466691.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', true,  true, 520000);
    