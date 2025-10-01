

INSERT INTO usuarios (nombre, email, password, rol) VALUES
('admin','admin@admin.com', '$2b$10$fKZgXe6y2fAOmPbbQ4XWt.WIbhMW0Dg15xzOhZ0m1Q1im4FvIF7uC','admin');

INSERT INTO usuarios (nombre, email, password) VALUES
('cliente','cliente@cliente.com', '$2b$10$uy6iwIOExIrCMQ4QBuT5au48lm9H7BNCzCUzB4E7.B/NZqwpCdaBS');


INSERT INTO productos (id_admin, titulo, descripcion, stock, tipo, 
url_imagen, url_imagen2, url_imagen3, url_imagen4, destacado, activo, precio) VALUES
(1,'Mancuernas Hexagonales 2×10 kg','Par de mancuernas de goma antideslizante.',15,'producto',
'producto1_1.webp','producto1_2.webp','producto1_3.webp','producto1_4.webp',true,true,89990),

(1,'Mancuernas Ajustables 2×24 kg','Sistema de ajuste rápido de peso.',15,'producto',
'producto2_1.webp','producto2_2.webp','producto2_3.webp','producto2_4.webp',true,true,299990),

(1,'Barra Olímpica 20 kg','Barra para powerlifting y halterofilia.',15,'producto',
'producto3_1.webp','producto3_2.webp','producto3_3.webp','producto3_4.webp',false,true,109990),

(1,'Discos Bumper 150 kg','Juego completo de discos de caucho.',12,'producto',
'producto4_1.webp','producto4_2.webp','producto4_3.webp','producto4_4.webp',true,true,399990),

(1,'Kettlebell Competición 24 kg','Kettlebell profesional para cross-training.',20,'producto',
'producto5_1.webp','producto5_2.webp','producto5_3.webp','producto5_4.webp',false,true,59990),

(1,'Power Rack 2.5×2 m','Jaula de potencia multifuncional.',10,'producto',
'producto6_1.webp','producto6_2.webp','producto6_3.webp','producto6_4.webp',true,true,499990),

(1,'Banco Ajustable Comercial','Banco multiposición de acero reforzado.',15,'producto',
'producto7_1.webp','producto7_2.webp','producto7_3.webp','producto7_4.webp',false,true,129990),

(1,'Rack para Mancuernas 3 Niveles','Soporte para 12 pares de mancuernas.',8,'producto',
'producto8_1.webp','producto8_2.webp','producto8_3.webp','producto8_4.webp',true,true,159990),

(1,'Máquina Polea Dual','Poleas ajustables para múltiples ejercicios.',7,'producto',
'producto9_1.webp','producto9_2.webp','producto9_3.webp','producto9_4.webp',true,true,799990),

(1,'Prensa de Piernas 45°','Máquina profesional para tren inferior.',5,'producto',
'producto10_1.webp','producto10_2.webp','producto10_3.webp','producto10_4.webp',true,true,999990),

(1,'Cuerda de Batalla 12 m','Battle rope de uso intensivo.',20,'producto',
'producto11_1.webp','producto11_2.webp','producto11_3.webp','producto11_4.webp',false,true,59990),

(1,'Balón Medicinal 10 kg','Balón de caucho sólido para lanzamientos.',25,'producto',
'producto12_1.webp','producto12_2.webp','producto12_3.webp','producto12_4.webp',false,true,34990),

(1,'Esterilla Antideslizante 10 mm','Colchoneta premium para entrenamientos.',30,'producto',
'producto13_1.webp','producto13_2.webp','producto13_3.webp','producto13_4.webp',true,true,19990),

(1,'Máquina Remo Sentado','Equipo con polea baja para dorsal y espalda.',6,'producto',
'producto14_1.webp','producto14_2.webp','producto14_3.webp','producto14_4.webp',true,true,849990),

(1,'Soga para Escalada 5 m','Cuerda de escalada para fuerza de agarre.',15,'producto',
'producto15_1.webp','producto15_2.webp','producto15_3.webp','producto15_4.webp',false,true,44990),

(1,'Paralelas de Fondo','Barras para dips y calistenia.',20,'producto',
'producto16_1.webp','producto16_2.webp','producto16_3.webp','producto16_4.webp',true,true,79990),

(1,'Máquina Smith','Estructura guiada para levantamientos seguros.',5,'producto',
'producto17_1.webp','producto17_2.webp','producto17_3.webp','producto17_4.webp',true,true,899990),

(1,'Soga de Velocidad','Cuerda ligera para entrenamiento cardiovascular.',35,'producto',
'producto18_1.webp','producto18_2.webp','producto18_3.webp','producto18_4.webp',false,true,9990),

(1,'TRX Pro Kit','Sistema de suspensión para entrenamiento funcional.',15,'producto',
'producto19_1.webp','producto19_2.webp','producto19_3.webp','producto19_4.webp',true,true,59990),

(1,'Máquina Peck Deck','Equipo para pectorales y deltoides.',5,'producto',
'producto20_1.webp','producto20_2.webp','producto20_3.webp','producto20_4.webp',true,true,759990);


INSERT INTO productos (id_admin, titulo, descripcion, stock, tipo,
url_imagen, url_imagen2, url_imagen3, url_imagen4, destacado, activo, precio) VALUES
(1,'Instalación de Power Rack','Montaje, nivelación y anclaje de jaula de potencia.',NULL,'servicio',
'servicio1_1.webp','servicio1_2.webp','servicio1_3.webp','servicio1_4.webp',true,true,119990),

(1,'Mantenimiento Preventivo de Máquinas','Ajuste, limpieza y lubricación de equipos de fuerza y cardio.',NULL,'servicio',
'servicio2_1.webp','servicio2_2.webp','servicio2_3.webp','servicio2_4.webp',true,true,89990),

(1,'Armado de Home Gym','Planificación del espacio y montaje de equipo básico.',NULL,'servicio',
'servicio3_1.webp','servicio3_2.webp','servicio3_3.webp','servicio3_4.webp',true,true,159990),

(1,'Coaching Personal 1:1 (60 min)','Sesión personalizada de fuerza/hipertrofia.',NULL,'servicio',
'servicio4_1.webp','servicio4_2.webp','servicio4_3.webp','servicio4_4.webp',false,true,34990),

(1,'Plan Nutricional Deportivo','Plan personalizado orientado a rendimiento y composición.',NULL,'servicio',
'servicio5_1.webp','servicio5_2.webp','servicio5_3.webp','servicio5_4.webp',false,true,39990),

(1,'Evaluación Física y Test de Fuerza','Mediciones, RM estimada y movilidad base.',NULL,'servicio',
'servicio6_1.webp','servicio6_2.webp','servicio6_3.webp','servicio6_4.webp',false,true,29990),

(1,'Clínica de Powerlifting (3 h)','Técnica de sentadilla, banca y peso muerto.',NULL,'servicio',
'servicio7_1.webp','servicio7_2.webp','servicio7_3.webp','servicio7_4.webp',true,true,89990),

(1,'Taller de Halterofilia (3 h)','Arranque y envión: progresiones y seguridad.',NULL,'servicio',
'servicio8_1.webp','servicio8_2.webp','servicio8_3.webp','servicio8_4.webp',true,true,99990),

(1,'Entrenamiento Funcional Grupal (hasta 10)','Circuitos full-body con implementos.',NULL,'servicio',
'servicio9_1.webp','servicio9_2.webp','servicio9_3.webp','servicio9_4.webp',false,true,69990),

(1,'Mobility & Stretching (60 min)','Sesión guiada para movilidad y descarga.',NULL,'servicio',
'servicio10_1.webp','servicio10_2.webp','servicio10_3.webp','servicio10_4.webp',false,true,24990),

(1,'Programación de Entrenamiento (4 sem)','Plan escrito con progresiones y seguimiento.',NULL,'servicio',
'servicio11_1.webp','servicio11_2.webp','servicio11_3.webp','servicio11_4.webp',true,true,44990),

(1,'Traslado y Montaje de Equipos','Retiro, transporte y reinstalación segura.',NULL,'servicio',
'servicio12_1.webp','servicio12_2.webp','servicio12_3.webp','servicio12_4.webp',false,true,129990),

(1,'Ajuste y Lubricación de Máquinas','Elimina ruidos, calibra cables y guías.',NULL,'servicio',
'servicio13_1.webp','servicio13_2.webp','servicio13_3.webp','servicio13_4.webp',false,true,49990),

(1,'Clínica de Kettlebells (2 h)','Técnica segura de swing, clean y press.',NULL,'servicio',
'servicio14_1.webp','servicio14_2.webp','servicio14_3.webp','servicio14_4.webp',false,true,54990),

(1,'Recuperación con Foam Roller (45 min)','Liberación miofascial guiada.',NULL,'servicio',
'servicio15_1.webp','servicio15_2.webp','servicio15_3.webp','servicio15_4.webp',false,true,19990),

(1,'HIIT Corporativo On-Site (60 min)','Clase intensa para equipos de empresa.',NULL,'servicio',
'servicio16_1.webp','servicio16_2.webp','servicio16_3.webp','servicio16_4.webp',true,true,119990),

(1,'Arriendo Jaula+Barra+Discos (por día)','Set completo para eventos o sesiones puntuales.',NULL,'servicio',
'servicio17_1.webp','servicio17_2.webp','servicio17_3.webp','servicio17_4.webp',true,true,149990),

(1,'Workshop Ergonomía en Oficina','Prevención de lesiones y pausas activas.',NULL,'servicio',
'servicio18_1.webp','servicio18_2.webp','servicio18_3.webp','servicio18_4.webp',false,true,99990),

(1,'Armado y Anclaje de Barra Dominadas','Instalación en muro/techo con refuerzos.',NULL,'servicio',
'servicio19_1.webp','servicio19_2.webp','servicio19_3.webp','servicio19_4.webp',false,true,69990),

(1,'Sanitización de Equipos','Desinfección profunda grado profesional.',NULL,'servicio',
'servicio20_1.webp','servicio20_2.webp','servicio20_3.webp','servicio20_4.webp',false,true,39990);