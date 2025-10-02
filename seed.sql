

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


INSERT INTO productos (
  id_admin, titulo, descripcion, stock, tipo, categoria,
  url_imagen, url_imagen2, destacado, activo, precio
) VALUES
(1,
'Gold Standard 100% Whey Protein (5 Lb) - Original',
'Gold Standard® 100% Whey de Optimum Nutrition, contiene una mezcla de proteína aislada de suero, proteína de suero concentrada y proteína de suero hidrolizada que aporta 24 gramos de proteína por porción. Además, aporta naturalmente 5,5 g de aminoácidos ramificados. Fórmula que aporta una buena fuente de calcio y bajo aporte de sodio por porción de consumo.',
20,
'producto',
'suplementos','producto21_1.webp','producto21_2.webp',true,true,90990),


(1,'Prostar Whey, Whey Protein (5 Lb) - Original','Prostar Whey es una mezcla de concentrado y aislado de proteína de suero de leche, con una elevada concentración de aminoácidos, los que contribuirán a la protección, recuperación y reconstrucción de las fibras musculares después de la práctica deportiva. Aporta 25g de proteína, 5g de carbohidratos y sólo 1g de grasa por porción.',20,'producto',
'suplementos','producto22_1.webp','producto22_2.webp',true,true,70540),


(1,'Whey Pro Win (4,4 lb)','Su alto contenido de proteínas y aminoácidos, proporcionan energía al músculo en actividades físicas tanto aeróbicas, como anaeróbicas. También contribuyen a cubrir posibles déficits proteicos en la ingesta diaria. Fomentando de esta manera el anabolismo muscular (recuperación, desarrollo, crecimiento). Y previniendo el catabolismo muscular (pérdida, reducción, degradación).',20,'producto',
'suplementos','producto23_1.webp','producto23_2.webp',true,true,87520),


(1,'Nutrex creatina monohidratada 400gr','La creatina Nutrex monohidratada de 400gr es un suplemento de máxima pureza formulado para optimizar tu rendimiento deportivo. Cada porción proporciona 5 gramos de creatina monohidratada de calidad premium, diseñada para aumentar significativamente la fuerza, potencia muscular y resistencia durante los entrenamientos intensos. La creatina Nutrex de 400gr es altamente soluble y de rápida absorción, garantizando que tu cuerpo reciba eficazmente los beneficios energéticos necesarios para maximizar resultados físicos. Esta creatina es la opción perfecta para deportistas que buscan mejorar de manera segura y efectiva su desempeño y recuperación muscular',20,'producto',
'suplementos','producto24_1.webp','producto24_2.webp',true,true,22740),


(1,'Ultimate Nutrition creatina monohidratada 300gr','La creatina Ultimate Nutrition de 300 gr es una opción premium diseñada específicamente para mejorar tu rendimiento deportivo mediante una fórmula avanzada de creatina monohidratada. Esta creatina utiliza tecnología biovolumizing, incrementando eficazmente el volumen celular, lo que optimiza la fuerza, resistencia y recuperación muscular tras esfuerzos intensos. La creatina monohidratada Ultimate Nutrition de 300gr se destaca por ser micronizada, garantizando una disolución rápida y una absorción inmediata, proporcionando resultados visibles desde las primeras semanas de uso. Ideal para atletas que buscan maximizar su desempeño y lograr un crecimiento muscular sostenido y eficiente.',20,'producto',
'suplementos','producto25_1.webp','producto25_2.webp',true,true,20990),


(1,'Optimum Nutrition creatina powder 300gr','La creatina Optimum Nutrition de 300gr es un suplemento diseñado para potenciar tu rendimiento físico y ayudarte a alcanzar tus objetivos deportivos. Formulada con creatina monohidratada, este producto en formato powder ofrece una absorción eficiente y una mezcla instantánea, ideal para tu rutina diaria. Cada porción contiene 5 g de creatina monohidratada marca Optimum Nutrition de 300 gr, un compuesto que favorece la regeneración del ATP (Adenosín Trifosfato), la principal fuente de energía utilizada por los músculos durante esfuerzos intensos. Esto se traduce en mayor fuerza, potencia y recuperación muscular tras el entrenamiento. Perfecta para deportistas que buscan mejorar su rendimiento, incrementar masa muscular y acelerar su progreso de forma segura y eficaz.',20,'producto',
'suplementos','producto26_1.webp','producto26_2.webp',true,true,35990),


(1,'LIPO 6 INTENSE ULTRA CONCENTRATE 60 CAPSULES, NUTREX','Lipo 6 Intense Ultra Concentrate de Nutrex es un alimento para deportistas con adición de cafeína aportada por el extracto de té verde y cafeína anhidra, entregando 351 mg por porción. Es suplementado con vitamina D, vitamina B6, vitamina B12, Cromo y Yodo. Todos los ingredientes activos de esta fórmula son permitidos por la reglamentación Chilena.',20,'producto',
'suplementos','producto27_1.webp','producto27_2.webp',true,true,22950),


(1,'Caffeine 200, Energía (60 caps) - Original','Lipo-6 caffeine es un suplemento que te aporta energía de forma rápida para aumentar tu capacidad física y mental antes, durante y después de tus entrenamientos. También puede ser consumido en cualquier momento del día cuando necesites energía extra y una máxima concentración. Cada cápsula contiene 210 mg de cafeína..',20,'producto',
'suplementos','producto28_1.webp','producto28_2.webp',true,true,19990),


(1,'KREATOR BLUE AGGRESSION 600 GRS','Pre entreno KREATOR es un potente activador y pre-entreno, diseñado para personas que entrenan a alta intensidad.',20,'producto',
'suplementos','producto29_1.webp','producto29_2.webp',true,true,34990),


(1,'Solgar L-glutamina 60 tabletas','Solgar glutamina es un suplemento diseñado para proteger la masa muscular en momentos de estrés físico, entrenamientos intensos o recuperación tras enfermedad. Gracias a su formato en tabletas, permite una dosificación precisa y cómoda para quienes desean mantener su masa magra, reducir el dolor muscular y favorecer la reconstrucción de los tejidos.',20,'producto',
'suplementos','producto30_1.webp','producto30_2.webp',true,true,24990),


(1,'Optimun Nutrition glutamina Glutamine Powder 300 gr','La glutamina Optimum Nutrition es una excelente alternativa para proteger y recuperar tu masa muscular después de entrenamientos intensos o en periodos de alta exigencia física. Este suplemento ayuda a reducir el dolor muscular, acelera la recuperación y reconstruye los tejidos musculares dañados por el esfuerzo.',20,'producto',
'suplementos','producto31_1.webp','producto31_2.webp',true,true,34990),


(1,'Glutamine Drive (300 gr) - Original','El suplemento L-Glutamina ayuda a mantener altos niveles de glutamina muscular, lo que a su vez acelera la reparación y el crecimiento del tejido muscular. El consumo diario de L-Glutamina ayuda a maximizar los resultados de la construcción muscular. GLUTAMINE DRIVE contiene L-Glutamina pura, es sin sabor y se puede agregar fácilmente a cualquier bebida de su elección. Agregar una cucharada de GLUTAMINE DRIVE a su bebida o comida después del entrenamiento mejorará enormemente la reparación muscular y estimulará un crecimiento más rápido del tejido muscular.',20,'producto',
'suplementos','producto32_1.webp','producto32_2.webp',true,true,32990),


(1,'E-Amino 2200, Aminoácidos (120 soft) - Original','E AMINO 2200, contiene una exclusiva formulación en base a 18 aminoácidos esenciales y no esenciales + L- Carnitina. Los aminoácidos son el elemento esencial de las proteínas y se utilizan para potenciar el desarrollo y favorecer la reparación muscular. Cuatro softgels de E-Amino 2200 contienen 2.200 mg de aminoácidos esenciales y no esenciales derivados del caseinato de calcio, de fácil absorción a nivel intestinal permitiendo una óptima utilización y un aumento significativo de la capacidad funcional del músculo.',20,'producto',
'suplementos','producto33_1.webp','producto33_2.webp',true,true,26990),


(1,'Amino 2222, Aminoácidos (320 Tabs) - Original','Los aminoácidos son las estructuras que conforman las proteínas, por lo tanto son fundamentales para la regeneración y reconstitución muscular. AMINO 2222 es una mezcla de aminoácidos esenciales y no esenciales especialmente diseñado para mantener constante el nivel de aminoácidos en el organismo y así favorecer la recuperación muscular dañada o desgastada producto de la práctica deportiva o estilo de vida actual. Amino 2222 es ideal además para ser utilizado por hombres y mujeres en períodos de dieta que quieran evitar la pérdida de masa muscular.',20,'producto',
'suplementos','producto34_1.webp','producto34_2.webp',true,true,50990),


(1,'Aminoxine Plus, Aminoácidos (60 caps)','Los aminoácidos, en combinación con zinc, son fundamentales para la síntesis de proteínas necesarias para el metabolismo. Algunas de ellas participan directamente en la síntesis del colágeno y queratina, componentes fundamentales de la piel, el cabello y las uñas, así como otras estructuras de sostén como tendones y cartílagos. Producto fabricado con certificación GMP',20,'producto',
'suplementos','producto35_1.webp','producto35_2.webp',true,true,14990),


(1,'Amino 2002, Aminoácidos (100 Tabs) - Original','Los aminoácidos son las estructuras que conforman las proteínas, por lo tanto son fundamentales para la regeneración y reconstitución muscular. AMINO 2002 es una mezcla de aminoácidos esenciales y no esenciales especialmente diseñado para mantener constante el nivel de aminoácidos en el organismo y así favorecer la recuperación muscular dañada o desgastada producto de la práctica deportiva o estilo de vida actual. Amino 2002 es ideal además para ser usado por hombres y mujeres en períodos de dieta que quieran evitar la pérdida de masa muscular.',20,'producto',
'suplementos','producto36_1.webp','producto36_2.webp',true,true,29990),


(1,'Quest, Barra proteica (60 gr)','QUEST BAR es una exquisita barra que aporta desde 20 g a 21 g de proteína de alta calidad por porción, procedentes de proteína de leche aislada y proteína de suero aislada. Además proporciona una excelente fuente de fibra dietética y calcio.',20,'producto',
'suplementos','producto37_1.webp','producto37_2.webp',true,true,3670),


(1,'Twenty´s, Snack proteico (60 gr)','Las barras Twentys son ideales para quienes buscan incorporar proteína a su dieta, con snacks de buen perfil nutricional. También para personas que buscan mantener o bajar de peso.',20,'producto',
'suplementos','producto38_1.webp','producto38_2.webp',true,true,3090),


(1,'Wild Protein, barra proteica, Chocolate Maní (45 gr)','Barra de proteínas con una textura crocante. Hecha de proteína de soya orgánica y de suero de leche. Dentro de los ingredientes que le entregan el buen sabor está mantequilla de maní natural, chocolate sin azúcar y dátiles.',20,'producto',
'suplementos','producto39_1.webp','producto39_2.webp',true,true,1890),


(1,'BARRA PROTEICA PROTEIN BITE, YGOAL','Protein Bite Black & White, es una exquisita barra de tres capas: deliciosa barra de chocolate dulce, capa de caramelo y bañada en una irresistible capa de chocolate blanco con crispis de chocolate. Su perfil nutricional es perfecto para quienes realizan actividad física.',20,'producto',
'suplementos','producto40_1.webp','producto40_2.webp',true,true,2790);
