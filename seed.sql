

INSERT INTO usuarios (nombre, email, password, rol) VALUES
('admin','admin@admin.com', '$2b$10$fKZgXe6y2fAOmPbbQ4XWt.WIbhMW0Dg15xzOhZ0m1Q1im4FvIF7uC','admin');

INSERT INTO usuarios (nombre, email, password) VALUES
('cliente','cliente@cliente.com', '$2b$10$uy6iwIOExIrCMQ4QBuT5au48lm9H7BNCzCUzB4E7.B/NZqwpCdaBS');


INSERT INTO productos (id_admin, titulo, descripcion, stock, tipo, url_imagen, destacado, activo, precio) VALUES
-- 15 PRODUCTOS (stock=15)
(1,'Whey Protein Isolate 2 lb','Proteína de suero aislada para ganancia de masa magra.',15,'producto','https://upload.wikimedia.org/wikipedia/commons/4/4b/Whey_powder.jpg',true,true,36990),
(1,'Caseína Micelar 2 lb','Proteína de liberación lenta, ideal para la noche.',15,'producto','https://upload.wikimedia.org/wikipedia/commons/2/20/Orgain_organic_protein_powder.jpg',false,true,34990),
(1,'Creatina Monohidratada 300 g','Mejora fuerza y rendimiento; monohidrato micronizado.',15,'producto','https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Protein_Powder_in_a_Blender_Bottle_%2844547157820%29.jpg/1280px-Protein_Powder_in_a_Blender_Bottle_%2844547157820%29.jpg',true,true,16990),
(1,'BCAA 2:1:1 300 g','Aminoácidos de cadena ramificada para recuperación muscular.',15,'producto','https://upload.wikimedia.org/wikipedia/commons/4/4b/Whey_powder.jpg',false,true,14990),
(1,'Pre-Entreno Ultra Pump','Fórmula con citrulina y cafeína para energía y bombeo.',15,'producto','https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Protein_Powder_in_a_Blender_Bottle_%2844547157820%29.jpg/1280px-Protein_Powder_in_a_Blender_Bottle_%2844547157820%29.jpg',true,true,19990),
(1,'Beta-Alanina 200 g','Ayuda a bufferar el ácido láctico y retrasar la fatiga.',15,'producto','https://upload.wikimedia.org/wikipedia/commons/4/4b/Whey_powder.jpg',false,true,12990),
(1,'Shaker Pro 700 ml','Botella mezcladora para batidos y suplementos.',15,'producto','https://upload.wikimedia.org/wikipedia/commons/1/1b/Osaka_protein_shaker.jpg',true,true,5990),
(1,'Mancuernas Hexagonales Par 2×10 kg','Par de mancuernas de goma para entrenamientos de fuerza.',15,'producto','https://upload.wikimedia.org/wikipedia/commons/9/9c/Dumbbells_In_Workout.jpg',false,true,89990),
(1,'Mancuernas Ajustables 2×24 kg','Mancuernas con selector de peso para alto rendimiento.',15,'producto','https://upload.wikimedia.org/wikipedia/commons/7/7c/Dumbells_and_free_weights_in_a_gym.jpg',true,true,299990),
(1,'Barra Olímpica 20 kg','Barra estándar olímpica para powerlifting y halterofilia.',15,'producto','https://upload.wikimedia.org/wikipedia/commons/7/7a/Olympic_barbell.jpg',false,true,109990),
(1,'Discos Bumper Set 150 kg','Juego de discos de caucho para levantamientos técnicos.',15,'producto','https://upload.wikimedia.org/wikipedia/commons/2/28/Men_lifting_heavy_weights.jpg',true,true,399990),
(1,'Kettlebell Competición 16 kg','Kettlebell para swings, cleans y snatches.',15,'producto','https://upload.wikimedia.org/wikipedia/commons/7/74/8kg_kettlebell.jpg',false,true,39990),
(1,'Power Rack 2.5×2 m','Jaula de potencia para sentadilla, press y dominadas.',15,'producto','https://upload.wikimedia.org/wikipedia/commons/9/9f/Power_Rack.JPG',true,true,499990),
(1,'Banco Ajustable Comercial','Banco multiposición para press e inclinados.',15,'producto','https://upload.wikimedia.org/wikipedia/commons/7/7c/Dumbells_and_free_weights_in_a_gym.jpg',false,true,129990),
(1,'Rack para Mancuernas 2 Niveles','Soporte robusto para organizar mancuernas.',15,'producto','https://upload.wikimedia.org/wikipedia/commons/7/7c/Dumbells_and_free_weights_in_a_gym.jpg',true,true,159990),

-- 15 SERVICIOS (stock=NULL)
(1,'Plan Nutricional Personalizado (4 semanas)','Diseñado para hipertrofia y recomposición corporal.',NULL,'servicio','https://upload.wikimedia.org/wikipedia/commons/4/45/Personal_trainer_assessing_a_client%27s_goals_and_needs_as_they_write_a_fitness_programme.jpg',false,true,39990),
(1,'Entrenamiento Personal 1 a 1 (8 sesiones)','Sesiones individualizadas para objetivos de fuerza.',NULL,'servicio','https://upload.wikimedia.org/wikipedia/commons/2/28/Men_lifting_heavy_weights.jpg',true,true,159990),
(1,'Asesoría Online de Entrenamiento (Zoom)','Programa y seguimiento semanal a distancia.',NULL,'servicio','https://upload.wikimedia.org/wikipedia/commons/4/45/Personal_trainer_assessing_a_client%27s_goals_and_needs_as_they_write_a_fitness_programme.jpg',false,true,34990),
(1,'Evaluación de Composición Corporal','Mediciones y plan de acción inicial.',NULL,'servicio','https://upload.wikimedia.org/wikipedia/commons/4/45/Personal_trainer_assessing_a_client%27s_goals_and_needs_as_they_write_a_fitness_programme.jpg',true,true,19990),
(1,'Taller Técnica Sentadilla y Peso Muerto (2 h)','Correcciones, seguridad y progresiones.',NULL,'servicio','https://upload.wikimedia.org/wikipedia/commons/6/67/Dead_Lift.jpg',false,true,29990),
(1,'Clases HIIT Grupal (8 clases)','Condicionamiento metabólico de alta intensidad.',NULL,'servicio','https://upload.wikimedia.org/wikipedia/commons/2/28/Men_lifting_heavy_weights.jpg',true,true,49990),
(1,'Taller de Movilidad y Flexibilidad (2 h)','Enfoque en caderas, hombros y columna.',NULL,'servicio','https://upload.wikimedia.org/wikipedia/commons/2/28/Men_lifting_heavy_weights.jpg',false,true,29990),
(1,'Programa Hipertrofia (12 semanas + seguimiento)','Rutinas por bloques, sobrecarga progresiva.',NULL,'servicio','https://upload.wikimedia.org/wikipedia/commons/4/45/Personal_trainer_assessing_a_client%27s_goals_and_needs_as_they_write_a_fitness_programme.jpg',true,true,179990),
(1,'Plan Recuperación Post-Entreno','Sesión guiada de descarga y cuidados.',NULL,'servicio','https://upload.wikimedia.org/wikipedia/commons/2/28/Men_lifting_heavy_weights.jpg',false,true,24990),
(1,'Taller de Alimentación para Ganancia Muscular','Macros, timing y compras inteligentes.',NULL,'servicio','https://upload.wikimedia.org/wikipedia/commons/4/45/Personal_trainer_assessing_a_client%27s_goals_and_needs_as_they_write_a_fitness_programme.jpg',true,true,24990),
(1,'Entrenamiento Grupal de Fuerza (8 sesiones)','Técnica, seguridad y progresiones en grupo.',NULL,'servicio','https://upload.wikimedia.org/wikipedia/commons/2/28/Men_lifting_heavy_weights.jpg',false,true,79990),
(1,'Coaching de Hábitos y Sueño (4 sesiones)','Rutinas, descanso y adherencia de largo plazo.',NULL,'servicio','https://upload.wikimedia.org/wikipedia/commons/4/45/Personal_trainer_assessing_a_client%27s_goals_and_needs_as_they_write_a_fitness_programme.jpg',true,true,49990),
(1,'Plan de Rutina Full Body (1 mes)','Programa 3×/semana + progresión de cargas.',NULL,'servicio','https://upload.wikimedia.org/wikipedia/commons/4/45/Personal_trainer_assessing_a_client%27s_goals_and_needs_as_they_write_a_fitness_programme.jpg',false,true,29990),
(1,'Taller de Core y Estabilidad (2 h)','Fortalecimiento de zona media y prevención.',NULL,'servicio','https://upload.wikimedia.org/wikipedia/commons/2/28/Men_lifting_heavy_weights.jpg',true,true,29990),
(1,'Asesoría de Suplementación Deportiva','Plan de uso de proteínas, creatina y pre-entreno.',NULL,'servicio','https://upload.wikimedia.org/wikipedia/commons/2/20/Orgain_organic_protein_powder.jpg',false,true,19990);
