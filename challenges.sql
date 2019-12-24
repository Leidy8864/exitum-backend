INSERT INTO `stage` (`id`, `stage`, `description`, `type`) 
VALUES (1, 'Pre semilla', "Etapa donde solo se tiene una idea superficial y se busca validarla.", 'startup'), 
(2, 'Semilla', "Etapa donde se pone en marcha el desarrollar nuestra idea aplicando metodologías para crear un modelo de negocio sustentable.", 'startup'), 
(3, 'Temprana', "Etapa donde se ha de crear un MVP, producto mínimo viable, para lanzarlo al mercado y recibir un feedback para detectar pros y contras.", 'startup'), 
(4, 'Crecimiento', "Etapa donde nuestra empresa consigue escalar consiguiendo ingresos de inversores y propios.", 'startup'), 
(5, 'Expansión', "Etapa donde se busca alcanzar nuevos horizontes en otros mercados.", 'startup'), 

(6, 'Etapa 1 empleado', "Etapa 1 empleado.", 'employee'),
(7, 'Etapa 2 empleado', "Etapa 2 empleado.", 'employee'),
(8, 'Etapa 3 empleado', "Etapa 3 empleado.", 'employee'),
(9, 'Etapa 4 empleado', "Etapa 4 empleado.", 'employee');

INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('1', 'Nivel 1 Etapa 1 startup', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '1');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('2', 'Nivel 2 Etapa 1 startup', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '1');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('3', 'Nivel 3 Etapa 1 startup', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '1');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('4', 'Nivel 4 Etapa 1 startup', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '1');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('5', 'Nivel 5 Etapa 1 startup', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '1');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('6', 'Nivel 6 Etapa 1 startup', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '1');

INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ( '7', 'Nivel 1 Etapa 2 startup', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '2');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ( '8', 'Nivel 2 Etapa 2 startup', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '2');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ( '9', 'Nivel 3 Etapa 2 startup', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '2');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('10', 'Nivel 4 Etapa 2 startup', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '2');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('11', 'Nivel 5 Etapa 2 startup', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '2');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('12', 'Nivel 6 Etapa 2 startup', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '2');

INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('13', 'Nivel 1 Etapa 3 startup', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '3');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('14', 'Nivel 2 Etapa 3 startup', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '3');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('15', 'Nivel 3 Etapa 3 startup', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '3');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('16', 'Nivel 4 Etapa 3 startup', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '3');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('17', 'Nivel 5 Etapa 3 startup', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '3');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('18', 'Nivel 6 Etapa 3 startup', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '3');

INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('19', 'Nivel 1 Etapa 4 startup', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '4');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('20', 'Nivel 2 Etapa 4 startup', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '4');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('21', 'Nivel 3 Etapa 4 startup', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '4');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('22', 'Nivel 4 Etapa 4 startup', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '4');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('23', 'Nivel 5 Etapa 4 startup', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '4');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('24', 'Nivel 6 Etapa 4 startup', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '4');

INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('25', 'Nivel 1 Etapa 5 startup', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '5');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('26', 'Nivel 2 Etapa 5 startup', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '5');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('27', 'Nivel 3 Etapa 5 startup', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '5');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('28', 'Nivel 4 Etapa 5 startup', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '5');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('29', 'Nivel 5 Etapa 5 startup', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '5');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('30', 'Nivel 6 Etapa 5 startup', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '5');


INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('1', 'Reto 1 Nivel 1 Etapa 1 startup', '1');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('2', 'Reto 2 Nivel 1 Etapa 1 startup', '1');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('3', 'Reto 3 Nivel 1 Etapa 1 startup', '1');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('4', 'Reto 4 Nivel 1 Etapa 1 startup', '1');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('5', 'Reto 1 Nivel 2 Etapa 1 startup', '2');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('6', 'Reto 2 Nivel 2 Etapa 1 startup', '2');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('7', 'Reto 3 Nivel 2 Etapa 1 startup', '2');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('8', 'Reto 4 Nivel 2 Etapa 1 startup', '2');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ( '9', 'Reto 1 Nivel 3 Etapa 1 startup', '3');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('10', 'Reto 2 Nivel 3 Etapa 1 startup', '3');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('11', 'Reto 3 Nivel 3 Etapa 1 startup', '3');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('12', 'Reto 4 Nivel 3 Etapa 1 startup', '3');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('13', 'Reto 1 Nivel 4 Etapa 1 startup', '4');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('14', 'Reto 2 Nivel 4 Etapa 1 startup', '4');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('15', 'Reto 3 Nivel 4 Etapa 1 startup', '4');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('16', 'Reto 4 Nivel 4 Etapa 1 startup', '4');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('17', 'Reto 1 Nivel 5 Etapa 1 startup', '5');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('18', 'Reto 2 Nivel 5 Etapa 1 startup', '5');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('19', 'Reto 3 Nivel 5 Etapa 1 startup', '5');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('20', 'Reto 4 Nivel 5 Etapa 1 startup', '5');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('21', 'Reto 1 Nivel 6 Etapa 1 startup', '6');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('22', 'Reto 2 Nivel 6 Etapa 1 startup', '6');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('23', 'Reto 3 Nivel 6 Etapa 1 startup', '6');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('24', 'Reto 4 Nivel 6 Etapa 1 startup', '6');


INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('25', 'Reto 1 Nivel 1 Etapa 2 startup', '7');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('26', 'Reto 2 Nivel 1 Etapa 2 startup', '7');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('27', 'Reto 3 Nivel 1 Etapa 2 startup', '7');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('28', 'Reto 4 Nivel 1 Etapa 2 startup', '7');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('29', 'Reto 1 Nivel 2 Etapa 2 startup', '8');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('30', 'Reto 2 Nivel 2 Etapa 2 startup', '8');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('31', 'Reto 3 Nivel 2 Etapa 2 startup', '8');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('32', 'Reto 4 Nivel 2 Etapa 2 startup', '8');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('33', 'Reto 1 Nivel 3 Etapa 2 startup', '9');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('34', 'Reto 2 Nivel 3 Etapa 2 startup', '9');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('35', 'Reto 3 Nivel 3 Etapa 2 startup', '9');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('36', 'Reto 4 Nivel 3 Etapa 2 startup', '9');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('37', 'Reto 1 Nivel 4 Etapa 2 startup', '10');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('38', 'Reto 2 Nivel 4 Etapa 2 startup', '10');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('39', 'Reto 3 Nivel 4 Etapa 2 startup', '10');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('40', 'Reto 4 Nivel 4 Etapa 2 startup', '10');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('41', 'Reto 1 Nivel 5 Etapa 2 startup', '11');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('42', 'Reto 2 Nivel 5 Etapa 2 startup', '11');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('43', 'Reto 3 Nivel 5 Etapa 2 startup', '11');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('44', 'Reto 4 Nivel 5 Etapa 2 startup', '11');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('45', 'Reto 1 Nivel 6 Etapa 2 startup', '12');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('46', 'Reto 2 Nivel 6 Etapa 2 startup', '12');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('47', 'Reto 3 Nivel 6 Etapa 2 startup', '12');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('48', 'Reto 4 Nivel 6 Etapa 2 startup', '12');


INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('49', 'Reto 1 Nivel 1 Etapa 3 startup', '13');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('50', 'Reto 2 Nivel 1 Etapa 3 startup', '13');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('51', 'Reto 3 Nivel 1 Etapa 3 startup', '13');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('52', 'Reto 4 Nivel 1 Etapa 3 startup', '13');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('53', 'Reto 1 Nivel 2 Etapa 3 startup', '14');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('54', 'Reto 2 Nivel 2 Etapa 3 startup', '14');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('55', 'Reto 3 Nivel 2 Etapa 3 startup', '14');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('56', 'Reto 4 Nivel 2 Etapa 3 startup', '14');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('57', 'Reto 1 Nivel 3 Etapa 3 startup', '15');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('58', 'Reto 2 Nivel 3 Etapa 3 startup', '15');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('59', 'Reto 3 Nivel 3 Etapa 3 startup', '15');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('60', 'Reto 4 Nivel 3 Etapa 3 startup', '15');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('61', 'Reto 1 Nivel 4 Etapa 3 startup', '16');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('62', 'Reto 2 Nivel 4 Etapa 3 startup', '16');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('63', 'Reto 3 Nivel 4 Etapa 3 startup', '16');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('64', 'Reto 4 Nivel 4 Etapa 3 startup', '16');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('65', 'Reto 1 Nivel 5 Etapa 3 startup', '17');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('66', 'Reto 2 Nivel 5 Etapa 3 startup', '17');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('67', 'Reto 3 Nivel 5 Etapa 3 startup', '17');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('68', 'Reto 4 Nivel 5 Etapa 3 startup', '17');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('69', 'Reto 1 Nivel 6 Etapa 3 startup', '18');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('70', 'Reto 2 Nivel 6 Etapa 3 startup', '18');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('71', 'Reto 3 Nivel 6 Etapa 3 startup', '18');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('72', 'Reto 4 Nivel 6 Etapa 3 startup', '18');


INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('73', 'Reto 1 Nivel 1 Etapa 4 startup', '19');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('74', 'Reto 2 Nivel 1 Etapa 4 startup', '19');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('75', 'Reto 3 Nivel 1 Etapa 4 startup', '19');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('76', 'Reto 4 Nivel 1 Etapa 4 startup', '19');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('77', 'Reto 1 Nivel 2 Etapa 4 startup', '20');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('78', 'Reto 2 Nivel 2 Etapa 4 startup', '20');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('79', 'Reto 3 Nivel 2 Etapa 4 startup', '20');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('80', 'Reto 4 Nivel 2 Etapa 4 startup', '20');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('81', 'Reto 1 Nivel 3 Etapa 4 startup', '21');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('82', 'Reto 2 Nivel 3 Etapa 4 startup', '21');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('83', 'Reto 3 Nivel 3 Etapa 4 startup', '21');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('84', 'Reto 4 Nivel 3 Etapa 4 startup', '21');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('85', 'Reto 1 Nivel 4 Etapa 4 startup', '22');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('86', 'Reto 2 Nivel 4 Etapa 4 startup', '22');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('87', 'Reto 3 Nivel 4 Etapa 4 startup', '22');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('88', 'Reto 4 Nivel 4 Etapa 4 startup', '22');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('89', 'Reto 1 Nivel 5 Etapa 4 startup', '23');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('90', 'Reto 2 Nivel 5 Etapa 4 startup', '23');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('91', 'Reto 3 Nivel 5 Etapa 4 startup', '23');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('92', 'Reto 4 Nivel 5 Etapa 4 startup', '23');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('93', 'Reto 1 Nivel 6 Etapa 4 startup', '24');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('94', 'Reto 2 Nivel 6 Etapa 4 startup', '24');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('95', 'Reto 3 Nivel 6 Etapa 4 startup', '24');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('96', 'Reto 4 Nivel 6 Etapa 4 startup', '24');


INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ( '97', 'Reto 1 Nivel 1 Etapa 5 startup', '25');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ( '98', 'Reto 2 Nivel 1 Etapa 5 startup', '25');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ( '99', 'Reto 3 Nivel 1 Etapa 5 startup', '25');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('100', 'Reto 4 Nivel 1 Etapa 5 startup', '25');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('101', 'Reto 1 Nivel 2 Etapa 5 startup', '26');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('102', 'Reto 2 Nivel 2 Etapa 5 startup', '26');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('103', 'Reto 3 Nivel 2 Etapa 5 startup', '26');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('104', 'Reto 4 Nivel 2 Etapa 5 startup', '26');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('105', 'Reto 1 Nivel 3 Etapa 5 startup', '27');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('106', 'Reto 2 Nivel 3 Etapa 5 startup', '27');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('107', 'Reto 3 Nivel 3 Etapa 5 startup', '27');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('108', 'Reto 4 Nivel 3 Etapa 5 startup', '27');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('109', 'Reto 1 Nivel 4 Etapa 5 startup', '28');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('110', 'Reto 2 Nivel 4 Etapa 5 startup', '28');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('111', 'Reto 3 Nivel 4 Etapa 5 startup', '28');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('112', 'Reto 4 Nivel 4 Etapa 5 startup', '28');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('113', 'Reto 1 Nivel 5 Etapa 5 startup', '29');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('114', 'Reto 2 Nivel 5 Etapa 5 startup', '29');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('115', 'Reto 3 Nivel 5 Etapa 5 startup', '29');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('116', 'Reto 4 Nivel 5 Etapa 5 startup', '29');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('117', 'Reto 1 Nivel 6 Etapa 5 startup', '30');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('118', 'Reto 2 Nivel 6 Etapa 5 startup', '30');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('119', 'Reto 3 Nivel 6 Etapa 5 startup', '30');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('120', 'Reto 4 Nivel 6 Etapa 5 startup', '30');

INSERT INTO `tip_skill` (`tip_id`, `skill_id`) VALUES ('1', '1');
INSERT INTO `tip_skill` (`tip_id`, `skill_id`) VALUES ('4', '1');
INSERT INTO `tip_skill` (`tip_id`, `skill_id`) VALUES ('5', '1');
INSERT INTO `tip_skill` (`tip_id`, `skill_id`) VALUES ('8', '1');
INSERT INTO `tip_skill` (`tip_id`, `skill_id`) VALUES ('9', '1');
INSERT INTO `tip_skill` (`tip_id`, `skill_id`) VALUES ('12', '1');
INSERT INTO `tip_skill` (`tip_id`, `skill_id`) VALUES ('13', '1');
INSERT INTO `tip_skill` (`tip_id`, `skill_id`) VALUES ('16', '1');
INSERT INTO `tip_skill` (`tip_id`, `skill_id`) VALUES ('17', '1');
INSERT INTO `tip_skill` (`tip_id`, `skill_id`) VALUES ('20', '1');
INSERT INTO `tip_skill` (`tip_id`, `skill_id`) VALUES ('21', '1');
INSERT INTO `tip_skill` (`tip_id`, `skill_id`) VALUES ('24', '1');

INSERT INTO `tip_category` (`tip_id`, `category_id`) VALUES ('1', '1');
INSERT INTO `tip_category` (`tip_id`, `category_id`) VALUES ('4', '2');
INSERT INTO `tip_category` (`tip_id`, `category_id`) VALUES ('5', '3');
INSERT INTO `tip_category` (`tip_id`, `category_id`) VALUES ('8', '1');
INSERT INTO `tip_category` (`tip_id`, `category_id`) VALUES ('9', '2');
INSERT INTO `tip_category` (`tip_id`, `category_id`) VALUES ('12', '1');
INSERT INTO `tip_category` (`tip_id`, `category_id`) VALUES ('13', '2');
INSERT INTO `tip_category` (`tip_id`, `category_id`) VALUES ('16', '3');
INSERT INTO `tip_category` (`tip_id`, `category_id`) VALUES ('17', '1');
INSERT INTO `tip_category` (`tip_id`, `category_id`) VALUES ('20', '2');
INSERT INTO `tip_category` (`tip_id`, `category_id`) VALUES ('21', '1');
INSERT INTO `tip_category` (`tip_id`, `category_id`) VALUES ('24', '2');

INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('31', 'Nivel 1 Etapa 1 employee', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '6');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('32', 'Nivel 2 Etapa 1 employee', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '6');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('33', 'Nivel 3 Etapa 1 employee', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '6');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('34', 'Nivel 4 Etapa 1 employee', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '6');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('35', 'Nivel 5 Etapa 1 employee', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '6');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('36', 'Nivel 6 Etapa 1 employee', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '6');

INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('37', 'Nivel 1 Etapa 2 employee', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '7');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('38', 'Nivel 2 Etapa 2 employee', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '7');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('39', 'Nivel 3 Etapa 2 employee', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '7');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('40', 'Nivel 4 Etapa 2 employee', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '7');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('41', 'Nivel 5 Etapa 2 employee', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '7');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('42', 'Nivel 6 Etapa 2 employee', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '7');

INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('43', 'Nivel 1 Etapa 3 employee', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '8');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('44', 'Nivel 2 Etapa 3 employee', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '8');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('45', 'Nivel 3 Etapa 3 employee', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '8');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('46', 'Nivel 4 Etapa 3 employee', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '8');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('47', 'Nivel 5 Etapa 3 employee', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '8');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('48', 'Nivel 6 Etapa 3 employee', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '8');

INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('49', 'Nivel 1 Etapa 4 employee', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '9');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('50', 'Nivel 2 Etapa 4 employee', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '9');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('51', 'Nivel 3 Etapa 4 employee', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '9');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('52', 'Nivel 4 Etapa 4 employee', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '9');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('53', 'Nivel 5 Etapa 4 employee', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '9');
INSERT INTO `step` (`id`, `step`, `icon`, `stage_id`) VALUES ('54', 'Nivel 6 Etapa 4 employee', 'https://techie-exitum.s3-us-west-1.amazonaws.com/imagenes/email-images/rojo.png', '9');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('121', 'Reto 1 Nivel 1 Etapa 1 employee', '31');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('122', 'Reto 2 Nivel 1 Etapa 1 employee', '31');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('123', 'Reto 3 Nivel 1 Etapa 1 employee', '31');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('124', 'Reto 4 Nivel 1 Etapa 1 employee', '31');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('125', 'Reto 1 Nivel 2 Etapa 1 employee', '32');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('126', 'Reto 2 Nivel 2 Etapa 1 employee', '32');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('127', 'Reto 3 Nivel 2 Etapa 1 employee', '32');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('128', 'Reto 4 Nivel 2 Etapa 1 employee', '32');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('129', 'Reto 1 Nivel 3 Etapa 1 employee', '33');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('130', 'Reto 2 Nivel 3 Etapa 1 employee', '33');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('131', 'Reto 3 Nivel 3 Etapa 1 employee', '33');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('132', 'Reto 4 Nivel 3 Etapa 1 employee', '33');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('133', 'Reto 1 Nivel 4 Etapa 1 employee', '34');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('134', 'Reto 2 Nivel 4 Etapa 1 employee', '34');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('135', 'Reto 3 Nivel 4 Etapa 1 employee', '34');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('136', 'Reto 4 Nivel 4 Etapa 1 employee', '34');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('137', 'Reto 1 Nivel 3 Etapa 1 employee', '35');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('138', 'Reto 2 Nivel 3 Etapa 1 employee', '35');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('139', 'Reto 3 Nivel 3 Etapa 1 employee', '35');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('140', 'Reto 4 Nivel 3 Etapa 1 employee', '35');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('141', 'Reto 1 Nivel 4 Etapa 1 employee', '36');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('142', 'Reto 2 Nivel 4 Etapa 1 employee', '36');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('143', 'Reto 3 Nivel 4 Etapa 1 employee', '36');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('144', 'Reto 4 Nivel 4 Etapa 1 employee', '36');


INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('145', 'Reto 1 Nivel 1 Etapa 2 employee', '37');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('146', 'Reto 2 Nivel 1 Etapa 2 employee', '37');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('147', 'Reto 3 Nivel 1 Etapa 2 employee', '37');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('148', 'Reto 4 Nivel 1 Etapa 2 employee', '37');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('149', 'Reto 1 Nivel 2 Etapa 2 employee', '38');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('150', 'Reto 2 Nivel 2 Etapa 2 employee', '38');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('151', 'Reto 3 Nivel 2 Etapa 2 employee', '38');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('152', 'Reto 4 Nivel 2 Etapa 2 employee', '38');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('153', 'Reto 1 Nivel 3 Etapa 2 employee', '39');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('154', 'Reto 2 Nivel 3 Etapa 2 employee', '39');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('155', 'Reto 3 Nivel 3 Etapa 2 employee', '39');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('156', 'Reto 4 Nivel 3 Etapa 2 employee', '39');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('157', 'Reto 1 Nivel 4 Etapa 2 employee', '40');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('158', 'Reto 2 Nivel 4 Etapa 2 employee', '40');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('159', 'Reto 3 Nivel 4 Etapa 2 employee', '40');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('160', 'Reto 4 Nivel 4 Etapa 2 employee', '40');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('161', 'Reto 1 Nivel 5 Etapa 2 employee', '41');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('162', 'Reto 2 Nivel 5 Etapa 2 employee', '41');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('163', 'Reto 3 Nivel 5 Etapa 2 employee', '41');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('164', 'Reto 4 Nivel 5 Etapa 2 employee', '41');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('165', 'Reto 1 Nivel 6 Etapa 2 employee', '42');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('166', 'Reto 2 Nivel 6 Etapa 2 employee', '42');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('167', 'Reto 3 Nivel 6 Etapa 2 employee', '42');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('168', 'Reto 4 Nivel 6 Etapa 2 employee', '42');


INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('169', 'Reto 1 Nivel 1 Etapa 3 employee', '43');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('170', 'Reto 2 Nivel 1 Etapa 3 employee', '43');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('171', 'Reto 3 Nivel 1 Etapa 3 employee', '43');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('172', 'Reto 4 Nivel 1 Etapa 3 employee', '43');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('173', 'Reto 1 Nivel 2 Etapa 3 employee', '44');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('174', 'Reto 2 Nivel 2 Etapa 3 employee', '44');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('175', 'Reto 3 Nivel 2 Etapa 3 employee', '44');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('176', 'Reto 4 Nivel 2 Etapa 3 employee', '44');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('177', 'Reto 1 Nivel 3 Etapa 3 employee', '45');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('178', 'Reto 2 Nivel 3 Etapa 3 employee', '45');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('179', 'Reto 3 Nivel 3 Etapa 3 employee', '45');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('180', 'Reto 4 Nivel 3 Etapa 3 employee', '45');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('181', 'Reto 1 Nivel 4 Etapa 3 employee', '46');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('182', 'Reto 2 Nivel 4 Etapa 3 employee', '46');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('183', 'Reto 3 Nivel 4 Etapa 3 employee', '46');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('184', 'Reto 4 Nivel 4 Etapa 3 employee', '46');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('185', 'Reto 1 Nivel 5 Etapa 3 employee', '47');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('186', 'Reto 2 Nivel 5 Etapa 3 employee', '47');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('187', 'Reto 3 Nivel 5 Etapa 3 employee', '47');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('188', 'Reto 4 Nivel 5 Etapa 3 employee', '47');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('189', 'Reto 1 Nivel 6 Etapa 3 employee', '48');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('190', 'Reto 2 Nivel 6 Etapa 3 employee', '48');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('191', 'Reto 3 Nivel 6 Etapa 3 employee', '48');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('192', 'Reto 4 Nivel 6 Etapa 3 employee', '48');


INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('193', 'Reto 1 Nivel 1 Etapa 4 employee', '49');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('194', 'Reto 2 Nivel 1 Etapa 4 employee', '49');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('195', 'Reto 3 Nivel 1 Etapa 4 employee', '49');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('196', 'Reto 4 Nivel 1 Etapa 4 employee', '49');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('197', 'Reto 1 Nivel 2 Etapa 4 employee', '50');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('198', 'Reto 2 Nivel 2 Etapa 4 employee', '50');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('199', 'Reto 3 Nivel 2 Etapa 4 employee', '50');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('200', 'Reto 4 Nivel 2 Etapa 4 employee', '50');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('201', 'Reto 1 Nivel 3 Etapa 4 employee', '51');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('202', 'Reto 2 Nivel 3 Etapa 4 employee', '51');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('203', 'Reto 3 Nivel 3 Etapa 4 employee', '51');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('204', 'Reto 4 Nivel 3 Etapa 4 employee', '51');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('205', 'Reto 1 Nivel 4 Etapa 4 employee', '52');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('206', 'Reto 2 Nivel 4 Etapa 4 employee', '52');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('207', 'Reto 3 Nivel 4 Etapa 4 employee', '52');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('208', 'Reto 4 Nivel 4 Etapa 4 employee', '52');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('209', 'Reto 1 Nivel 5 Etapa 4 employee', '53');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('210', 'Reto 2 Nivel 5 Etapa 4 employee', '53');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('211', 'Reto 3 Nivel 5 Etapa 4 employee', '53');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('212', 'Reto 4 Nivel 5 Etapa 4 employee', '53');

INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('213', 'Reto 1 Nivel 6 Etapa 4 employee', '54');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('214', 'Reto 2 Nivel 6 Etapa 4 employee', '54');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('215', 'Reto 3 Nivel 6 Etapa 4 employee', '54');
INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('216', 'Reto 4 Nivel 6 Etapa 4 employee', '54');

INSERT INTO `tip_skill` (`tip_id`, `skill_id`) VALUES ('121', '6');
INSERT INTO `tip_skill` (`tip_id`, `skill_id`) VALUES ('121', '8');
INSERT INTO `tip_skill` (`tip_id`, `skill_id`) VALUES ('121', '9');
INSERT INTO `tip_skill` (`tip_id`, `skill_id`) VALUES ('124', '7');
INSERT INTO `tip_skill` (`tip_id`, `skill_id`) VALUES ('124', '12');
INSERT INTO `tip_skill` (`tip_id`, `skill_id`) VALUES ('125', '6');
INSERT INTO `tip_skill` (`tip_id`, `skill_id`) VALUES ('125', '8');
INSERT INTO `tip_skill` (`tip_id`, `skill_id`) VALUES ('125', '9');
INSERT INTO `tip_skill` (`tip_id`, `skill_id`) VALUES ('128', '7');
INSERT INTO `tip_skill` (`tip_id`, `skill_id`) VALUES ('128', '12');
INSERT INTO `tip_skill` (`tip_id`, `skill_id`) VALUES ('129', '6');
INSERT INTO `tip_skill` (`tip_id`, `skill_id`) VALUES ('129', '8');
INSERT INTO `tip_skill` (`tip_id`, `skill_id`) VALUES ('129', '9');
INSERT INTO `tip_skill` (`tip_id`, `skill_id`) VALUES ('132', '7');
INSERT INTO `tip_skill` (`tip_id`, `skill_id`) VALUES ('132', '12');
INSERT INTO `tip_skill` (`tip_id`, `skill_id`) VALUES ('133', '6');
INSERT INTO `tip_skill` (`tip_id`, `skill_id`) VALUES ('133', '8');
INSERT INTO `tip_skill` (`tip_id`, `skill_id`) VALUES ('133', '9');
INSERT INTO `tip_skill` (`tip_id`, `skill_id`) VALUES ('136', '7');
INSERT INTO `tip_skill` (`tip_id`, `skill_id`) VALUES ('136', '12');

INSERT INTO `tip_category` (`tip_id`, `category_id`) VALUES ('121', '1');
INSERT INTO `tip_category` (`tip_id`, `category_id`) VALUES ('121', '2');
INSERT INTO `tip_category` (`tip_id`, `category_id`) VALUES ('121', '3');
INSERT INTO `tip_category` (`tip_id`, `category_id`) VALUES ('124', '1');
INSERT INTO `tip_category` (`tip_id`, `category_id`) VALUES ('124', '2');
INSERT INTO `tip_category` (`tip_id`, `category_id`) VALUES ('125', '1');
INSERT INTO `tip_category` (`tip_id`, `category_id`) VALUES ('125', '2');
INSERT INTO `tip_category` (`tip_id`, `category_id`) VALUES ('125', '3');
INSERT INTO `tip_category` (`tip_id`, `category_id`) VALUES ('128', '1');
INSERT INTO `tip_category` (`tip_id`, `category_id`) VALUES ('128', '2');
INSERT INTO `tip_category` (`tip_id`, `category_id`) VALUES ('129', '1');
INSERT INTO `tip_category` (`tip_id`, `category_id`) VALUES ('129', '2');
INSERT INTO `tip_category` (`tip_id`, `category_id`) VALUES ('129', '3');
INSERT INTO `tip_category` (`tip_id`, `category_id`) VALUES ('132', '1');
INSERT INTO `tip_category` (`tip_id`, `category_id`) VALUES ('132', '2');
INSERT INTO `tip_category` (`tip_id`, `category_id`) VALUES ('133', '1');
INSERT INTO `tip_category` (`tip_id`, `category_id`) VALUES ('133', '2');
INSERT INTO `tip_category` (`tip_id`, `category_id`) VALUES ('133', '3');
INSERT INTO `tip_category` (`tip_id`, `category_id`) VALUES ('136', '1');
INSERT INTO `tip_category` (`tip_id`, `category_id`) VALUES ('136', '2');

insert into `exitum`.`file_tip`(id, name, key_s3, tip_id) values 
( 1, "Business_Model_Canvas.docx", "Business_Model_Canvas.docx", 1),
( 2, "Business_Model_Canvas.docx", "Business_Model_Canvas.docx", 2),
( 3, "Business_Model_Canvas.docx", "Business_Model_Canvas.docx", 3),
( 4, "Business_Model_Canvas.docx", "Business_Model_Canvas.docx", 4),
( 5, "Business_Model_Canvas.docx", "Business_Model_Canvas.docx", 5),
( 6, "Business_Model_Canvas.docx", "Business_Model_Canvas.docx", 6),
( 7, "Business_Model_Canvas.docx", "Business_Model_Canvas.docx", 7),
( 8, "Business_Model_Canvas.docx", "Business_Model_Canvas.docx", 8),
( 9, "Business_Model_Canvas.docx", "Business_Model_Canvas.docx", 9),
(10, "Business_Model_Canvas.docx", "Business_Model_Canvas.docx", 10),
(11, "Business_Model_Canvas.docx", "Business_Model_Canvas.docx", 11),
(12, "Business_Model_Canvas.docx", "Business_Model_Canvas.docx", 12),
(13, "Business_Model_Canvas.docx", "Business_Model_Canvas.docx", 13),
(14, "Business_Model_Canvas.docx", "Business_Model_Canvas.docx", 14),
(15, "Business_Model_Canvas.docx", "Business_Model_Canvas.docx", 15),
(16, "Business_Model_Canvas.docx", "Business_Model_Canvas.docx", 16),
(17, "Business_Model_Canvas.docx", "Business_Model_Canvas.docx", 17),
(18, "Business_Model_Canvas.docx", "Business_Model_Canvas.docx", 18),
(19, "Business_Model_Canvas.docx", "Business_Model_Canvas.docx", 19),
(20, "Business_Model_Canvas.docx", "Business_Model_Canvas.docx", 20),
(21, "Business_Model_Canvas.docx", "Business_Model_Canvas.docx", 21),
(22, "Business_Model_Canvas.docx", "Business_Model_Canvas.docx", 22),
(23, "Business_Model_Canvas.docx", "Business_Model_Canvas.docx", 23),
(24, "Business_Model_Canvas.docx", "Business_Model_Canvas.docx", 24),
(25, "Business_Model_Canvas.docx", "Business_Model_Canvas.docx", 25);