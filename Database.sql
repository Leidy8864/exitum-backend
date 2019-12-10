-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema exitum
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema exitum
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `exitum` DEFAULT CHARACTER SET utf8 ;
USE `exitum` ;

-- -----------------------------------------------------
-- Table `exitum`.`area`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`area` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`category` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(145) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`currency`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`currency` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `currency` VARCHAR(145) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`country`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`country` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `country` VARCHAR(145) NULL DEFAULT NULL,
  `code` VARCHAR(145) NULL DEFAULT NULL,
  `currency_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `currency_id`),
  INDEX `fk_country_currency1_idx` (`currency_id` ASC),
  CONSTRAINT `fk_country_currency1`
    FOREIGN KEY (`currency_id`)
    REFERENCES `exitum`.`currency` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL DEFAULT NULL,
  `lastname` VARCHAR(50) NULL DEFAULT NULL,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  `password` VARCHAR(120) NULL DEFAULT NULL,
  `provider_id` VARCHAR(100) NULL DEFAULT NULL,
  `confirmed` TINYINT(4) NULL DEFAULT NULL,
  `phone` VARCHAR(10) NULL DEFAULT NULL,
  `role` ENUM('entrepreneur', 'employee', 'admin', 'undefined') NULL DEFAULT NULL,
  `method` ENUM('local', 'google', 'facebook') NULL DEFAULT NULL,
  `active` TINYINT(4) NULL DEFAULT NULL,
  `last_login` DATETIME NULL DEFAULT NULL,
  `photo` VARCHAR(145) NULL DEFAULT NULL,
  `avg_rating` FLOAT(3,2) UNSIGNED NULL DEFAULT '0.00',
  `created_at` DATETIME NULL DEFAULT NULL,
  `from_hour` TIME NULL DEFAULT NULL,
  `to_hour` TIME NULL DEFAULT NULL,
  `birthday` DATE NULL DEFAULT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `country_id` INT(11) NOT NULL,
  `currency_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `fk_user_country1_idx` (`country_id` ASC),
  INDEX `fk_user_currency1_idx` (`currency_id` ASC),
  CONSTRAINT `fk_user_country1`
    FOREIGN KEY (`country_id`)
    REFERENCES `exitum`.`country` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_currency1`
    FOREIGN KEY (`currency_id`)
    REFERENCES `exitum`.`currency` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`entrepreneur`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`entrepreneur` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC),
  INDEX `fk_emprendedor_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_emprendedor_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`stage`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`stage` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `stage` VARCHAR(100) NULL DEFAULT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `type` ENUM('employee', 'startup') NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`startup`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`startup` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(145) NULL DEFAULT NULL,
  `photo_url` VARCHAR(145) NULL DEFAULT NULL,
  `ruc` VARCHAR(145) NULL DEFAULT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `avg_rating` FLOAT(3,2) UNSIGNED NULL DEFAULT '0.00',
  `entrepreneur_id` INT(11) NOT NULL,
  `stage_id` INT(11) NOT NULL,
  `category_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC),
  INDEX `fk_startup_emprendedor1_idx` (`entrepreneur_id` ASC),
  INDEX `fk_startup_stage1_idx` (`stage_id` ASC),
  INDEX `fk_startup_category1_idx` (`category_id` ASC),
  CONSTRAINT `fk_startup_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `exitum`.`category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_startup_emprendedor1`
    FOREIGN KEY (`entrepreneur_id`)
    REFERENCES `exitum`.`entrepreneur` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_startup_stage1`
    FOREIGN KEY (`stage_id`)
    REFERENCES `exitum`.`stage` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`advertisement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`advertisement` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(120) NULL DEFAULT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `state` ENUM('active', 'closed', 'archived') NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `slug` VARCHAR(255) NULL DEFAULT NULL,
  `startup_id` INT(11) NOT NULL,
  `area_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_project_startup1_idx` (`startup_id` ASC),
  INDEX `fk_advertisement_area1_idx` (`area_id` ASC),
  CONSTRAINT `fk_advertisement_area1`
    FOREIGN KEY (`area_id`)
    REFERENCES `exitum`.`area` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_project_startup1`
    FOREIGN KEY (`startup_id`)
    REFERENCES `exitum`.`startup` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`skill`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`skill` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `skill` VARCHAR(145) NOT NULL,
  `icon` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `skill_UNIQUE` (`skill` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`advertisement_skill`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`advertisement_skill` (
  `advertisement_id` INT(11) NOT NULL,
  `skill_id` INT(11) NOT NULL,
  PRIMARY KEY (`advertisement_id`, `skill_id`),
  INDEX `fk_skill_has_project_project1_idx` (`advertisement_id` ASC),
  INDEX `fk_skill_has_project_skill1_idx` (`skill_id` ASC),
  CONSTRAINT `fk_skill_has_project_project1`
    FOREIGN KEY (`advertisement_id`)
    REFERENCES `exitum`.`advertisement` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_skill_has_project_skill1`
    FOREIGN KEY (`skill_id`)
    REFERENCES `exitum`.`skill` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`advice`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`advice` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(145) NULL DEFAULT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `type` ENUM('employee', 'startup', 'entrepreneur') NULL DEFAULT NULL,
  `order` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`test`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`test` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(70) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`question`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`question` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `question` VARCHAR(255) NULL DEFAULT NULL,
  `test_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_questions_certiifications1_idx` (`test_id` ASC),
  CONSTRAINT `fk_questions_certiifications1`
    FOREIGN KEY (`test_id`)
    REFERENCES `exitum`.`test` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`answer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`answer` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `answer` VARCHAR(255) NULL DEFAULT NULL,
  `correct` TINYINT(4) NULL DEFAULT NULL,
  `question_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_answers_questions1_idx` (`question_id` ASC),
  CONSTRAINT `fk_answers_questions1`
    FOREIGN KEY (`question_id`)
    REFERENCES `exitum`.`question` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`appointment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`appointment` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `from_user_id` INT(11) NOT NULL,
  `to_user_id` INT(11) NOT NULL,
  `title` VARCHAR(100) NULL DEFAULT NULL,
  `date` DATE NULL DEFAULT NULL,
  `time` TIME NULL DEFAULT NULL,
  `type` ENUM('reunion', 'recordatorio') NULL DEFAULT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `status` TINYINT(1) NULL DEFAULT NULL,
  `rate` FLOAT(3,2) UNSIGNED NULL DEFAULT NULL,
  `commentary` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_has_user_user2_idx` (`to_user_id` ASC),
  INDEX `fk_user_has_user_user1_idx` (`from_user_id` ASC),
  CONSTRAINT `fk_user_has_user_user1`
    FOREIGN KEY (`from_user_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_user_user2`
    FOREIGN KEY (`to_user_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`workshop`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`workshop` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(145) NULL DEFAULT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `day` DATE NULL DEFAULT NULL,
  `hour_start` TIME NULL DEFAULT NULL,
  `hour_end` TIME NULL DEFAULT NULL,
  `place` VARCHAR(200) NULL DEFAULT NULL,
  `lat` DECIMAL(10,8) NULL DEFAULT NULL,
  `lng` DECIMAL(11,8) NULL DEFAULT NULL,
  `user_id` INT(11) NOT NULL,
  `participants` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_workshop_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_workshop_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`category_workshop`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`category_workshop` (
  `workshop_id` INT(11) NOT NULL,
  `category_id` INT(11) NOT NULL,
  PRIMARY KEY (`workshop_id`, `category_id`),
  INDEX `fk_workshop_has_category_category1_idx` (`category_id` ASC),
  INDEX `fk_workshop_has_category_workshop1_idx` (`workshop_id` ASC),
  CONSTRAINT `fk_workshop_has_category_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `exitum`.`category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_workshop_has_category_workshop1`
    FOREIGN KEY (`workshop_id`)
    REFERENCES `exitum`.`workshop` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`company`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`company` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(192) NOT NULL,
  `icon` VARCHAR(192) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`certification_name`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`certification_name` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `exitum`.`certification`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`certification` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(145) NULL DEFAULT NULL,
  `date_expedition` DATETIME NULL DEFAULT NULL,
  `date_expiration` DATETIME NULL DEFAULT NULL,
  `document_url` VARCHAR(255) NULL DEFAULT NULL,
  `user_id` INT(11) NOT NULL,
  `company_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_certification_user1_idx` (`user_id` ASC),
  INDEX `fk_certification_company1_idx` (`company_id` ASC),
  CONSTRAINT `fk_certification_company1`
    FOREIGN KEY (`company_id`)
    REFERENCES `exitum`.`company` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_certification_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`employee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`employee` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `stage_id` INT(11) NOT NULL,
  `category_id` INT(11) NOT NULL,
  `short_description` VARCHAR(145) NULL DEFAULT NULL,
  `behance_user` VARCHAR(145) NULL DEFAULT NULL,
  `behance_active` TINYINT(4) NULL DEFAULT NULL,
  `linkedin_active` TINYINT(4) NULL DEFAULT NULL,
  `price_hour` DECIMAL(10,2) NULL DEFAULT NULL,
  `about_me` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC),
  INDEX `fk_employee_user1_idx` (`user_id` ASC),
  INDEX `fk_employee_stage1_idx` (`stage_id` ASC),
  INDEX `fk_employee_category1_idx` (`category_id` ASC),
  CONSTRAINT `fk_employee_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `exitum`.`category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_employee_stage1`
    FOREIGN KEY (`stage_id`)
    REFERENCES `exitum`.`stage` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_employee_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`step`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`step` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `step` VARCHAR(245) NULL DEFAULT NULL,
  `icon` VARCHAR(120) NULL DEFAULT NULL,
  `stage_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_step_stage1_idx` (`stage_id` ASC),
  CONSTRAINT `fk_step_stage1`
    FOREIGN KEY (`stage_id`)
    REFERENCES `exitum`.`stage` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`tip`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`tip` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `tip` VARCHAR(145) NULL DEFAULT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `step_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tip_step1_idx` (`step_id` ASC),
  CONSTRAINT `fk_tip_step1`
    FOREIGN KEY (`step_id`)
    REFERENCES `exitum`.`step` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`challenge`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`challenge` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `employee_id` INT(11) NULL DEFAULT NULL,
  `startup_id` INT(11) NULL DEFAULT NULL,
  `stage_id` INT(11) NOT NULL,
  `step_id` INT(11) NOT NULL,
  `tip_id` INT(11) NOT NULL,
  `checked` TINYINT(4) NULL DEFAULT '0',
  `status` VARCHAR(45) NULL DEFAULT NULL,
  `date` DATETIME NULL DEFAULT NULL,
  `comment` TEXT NULL DEFAULT NULL,
  `reply` TEXT NULL DEFAULT NULL,
  `verifying_user` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tips_has_startup_startup1_idx` (`startup_id` ASC),
  INDEX `fk_tips_has_startup_tips1_idx` (`tip_id` ASC),
  INDEX `fk_startup_tip_step1_idx` (`step_id` ASC),
  INDEX `fk_startup_tip_stage1_idx` (`stage_id` ASC),
  INDEX `fk_challenge_employee1_idx` (`employee_id` ASC),
  INDEX `fk_challenge_user1_idx` (`user_id` ASC),
  INDEX `fk_challenge_user2` (`verifying_user` ASC),
  CONSTRAINT `fk_challenge_employee1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `exitum`.`employee` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_challenge_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_challenge_user2`
    FOREIGN KEY (`verifying_user`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_startup_tip_stage1`
    FOREIGN KEY (`stage_id`)
    REFERENCES `exitum`.`stage` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_startup_tip_step1`
    FOREIGN KEY (`step_id`)
    REFERENCES `exitum`.`step` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tips_has_startup_startup1`
    FOREIGN KEY (`startup_id`)
    REFERENCES `exitum`.`startup` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tips_has_startup_tips1`
    FOREIGN KEY (`tip_id`)
    REFERENCES `exitum`.`tip` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`chat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`chat` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `from_id` INT(11) NOT NULL,
  `to_id` INT(11) NOT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_chat_user1_idx` (`from_id` ASC),
  INDEX `fk_chat_user2_idx` (`to_id` ASC),
  CONSTRAINT `fk_chat_user1`
    FOREIGN KEY (`from_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chat_user2`
    FOREIGN KEY (`to_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`order` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NULL DEFAULT NULL,
  `employer_id` INT(11) NOT NULL,
  `employee_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_order_user1_idx` (`employer_id` ASC),
  INDEX `fk_order_user2_idx` (`employee_id` ASC),
  CONSTRAINT `fk_order_user1`
    FOREIGN KEY (`employer_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_user2`
    FOREIGN KEY (`employee_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`order_state`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`order_state` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `order_id` INT(11) NOT NULL,
  `state` TINYINT(4) NULL DEFAULT NULL,
  `date_delivery` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_order_state_order1_idx` (`order_id` ASC),
  CONSTRAINT `fk_order_state_order1`
    FOREIGN KEY (`order_id`)
    REFERENCES `exitum`.`order` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`delivery`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`delivery` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `order_state_id` INT(11) NOT NULL,
  `file` VARCHAR(145) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_deliveries_order_state1_idx` (`order_state_id` ASC),
  CONSTRAINT `fk_deliveries_order_state1`
    FOREIGN KEY (`order_state_id`)
    REFERENCES `exitum`.`order_state` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`department`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`department` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `department` VARCHAR(145) NULL DEFAULT NULL,
  `country_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_department_country_idx` (`country_id` ASC),
  CONSTRAINT `fk_department_country`
    FOREIGN KEY (`country_id`)
    REFERENCES `exitum`.`country` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`university`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`university` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `university` VARCHAR(192) NOT NULL,
  `icon` VARCHAR(192) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `university_UNIQUE` (`university` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`education`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`education` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `description` TEXT NULL DEFAULT NULL,
  `date_start` DATETIME NULL DEFAULT NULL,
  `date_end` DATETIME NULL DEFAULT NULL,
  `university_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_educations_universities1_idx` (`university_id` ASC),
  INDEX `fk_education_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_education_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_educations_universities1`
    FOREIGN KEY (`university_id`)
    REFERENCES `exitum`.`university` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`language`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`language` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `language` VARCHAR(192) NOT NULL,
  `icon` VARCHAR(192) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `language_UNIQUE` (`language` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`level`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`level` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `level` VARCHAR(145) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`employee_language`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`employee_language` (
  `employee_id` INT(11) NOT NULL,
  `language_id` INT(11) NOT NULL,
  `level_id` INT(11) NOT NULL,
  PRIMARY KEY (`employee_id`, `language_id`, `level_id`),
  INDEX `fk_employee_has_language_language1_idx` (`language_id` ASC),
  INDEX `fk_employee_has_language_employee1_idx` (`employee_id` ASC),
  INDEX `fk_employee_has_language_level1_idx` (`level_id` ASC),
  CONSTRAINT `fk_employee_has_language_employee1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `exitum`.`employee` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_employee_has_language_language1`
    FOREIGN KEY (`language_id`)
    REFERENCES `exitum`.`language` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_employee_has_language_level1`
    FOREIGN KEY (`level_id`)
    REFERENCES `exitum`.`level` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`employee_step`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`employee_step` (
  `employee_id` INT(11) NOT NULL,
  `step_id` INT(11) NOT NULL,
  `tip_completed` INT(11) NULL DEFAULT NULL,
  `icon_count_tip` VARCHAR(245) NULL DEFAULT NULL,
  `state` ENUM('completado', 'incompleto') NULL DEFAULT NULL,
  PRIMARY KEY (`employee_id`, `step_id`),
  INDEX `fk_employee_has_step_step1_idx` (`step_id` ASC),
  INDEX `fk_employee_has_step_employee1_idx` (`employee_id` ASC),
  CONSTRAINT `fk_employee_has_step_employee1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `exitum`.`employee` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_employee_has_step_step1`
    FOREIGN KEY (`step_id`)
    REFERENCES `exitum`.`step` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`employee_test`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`employee_test` (
  `employee_id` INT(11) NOT NULL,
  `test_id` INT(11) NOT NULL,
  PRIMARY KEY (`employee_id`, `test_id`),
  INDEX `fk_employee_has_certiification_certiification1_idx` (`test_id` ASC),
  INDEX `fk_employee_has_certiification_employee1_idx` (`employee_id` ASC),
  CONSTRAINT `fk_employee_has_certiification_certiification1`
    FOREIGN KEY (`test_id`)
    REFERENCES `exitum`.`test` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_employee_has_certiification_employee1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `exitum`.`employee` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`employee_tip`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`employee_tip` (
  `tip_id` INT(11) NOT NULL,
  `employee_id` INT(11) NOT NULL,
  `checked` TINYINT(4) NULL DEFAULT NULL,
  PRIMARY KEY (`tip_id`, `employee_id`),
  INDEX `fk_tip_has_employee_employee1_idx` (`employee_id` ASC),
  INDEX `fk_tip_has_employee_tip1_idx` (`tip_id` ASC),
  CONSTRAINT `fk_tip_has_employee_employee1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `exitum`.`employee` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tip_has_employee_tip1`
    FOREIGN KEY (`tip_id`)
    REFERENCES `exitum`.`tip` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`type` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(145) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`employee_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`employee_type` (
  `employee_id` INT(11) NOT NULL,
  `type_id` INT(11) NOT NULL,
  PRIMARY KEY (`employee_id`, `type_id`),
  INDEX `fk_employee_has_employee_types_employee_types1_idx` (`type_id` ASC),
  INDEX `fk_employee_has_employee_types_employee1_idx` (`employee_id` ASC),
  CONSTRAINT `fk_employee_has_employee_types_employee1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `exitum`.`employee` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_employee_has_employee_types_employee_types1`
    FOREIGN KEY (`type_id`)
    REFERENCES `exitum`.`type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`occupation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`occupation` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(190) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`experience`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`experience` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `date_start` DATETIME NULL DEFAULT NULL,
  `date_end` DATETIME NULL DEFAULT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `current_job` TINYINT(4) NULL DEFAULT NULL,
  `user_id` INT(11) NOT NULL,
  `company_id` INT(11) NOT NULL,
  `category_id` INT(11) NOT NULL,
  `occupation_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_experience_user1_idx` (`user_id` ASC),
  INDEX `fk_experience_company1_idx` (`company_id` ASC),
  INDEX `fk_experience_category_idx` (`category_id` ASC),
  INDEX `fk_experience_occupation1_idx` (`occupation_id` ASC),
  CONSTRAINT `fk_experience_category`
    FOREIGN KEY (`category_id`)
    REFERENCES `exitum`.`category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_experience_company1`
    FOREIGN KEY (`company_id`)
    REFERENCES `exitum`.`company` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_experience_occupation1`
    FOREIGN KEY (`occupation_id`)
    REFERENCES `exitum`.`occupation` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_experience_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`favorite`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`favorite` (
  `from_user_id` INT(11) NOT NULL,
  `to_user_id` INT(11) NOT NULL,
  `chosen` TINYINT(4) NULL DEFAULT NULL,
  PRIMARY KEY (`to_user_id`, `from_user_id`),
  INDEX `fk_favorite_user1_idx` (`from_user_id` ASC),
  INDEX `fk_favorite_user2_idx` (`to_user_id` ASC),
  CONSTRAINT `fk_favorite_user1`
    FOREIGN KEY (`from_user_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_favorite_user2`
    FOREIGN KEY (`to_user_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`file`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`file` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(145) NULL DEFAULT NULL,
  `challenge_id` INT(11) NOT NULL,
  `key_s3` VARCHAR(150) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_file_challenge_challenge1_idx` (`challenge_id` ASC),
  CONSTRAINT `fk_file_challenge_challenge1`
    FOREIGN KEY (`challenge_id`)
    REFERENCES `exitum`.`challenge` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`file_tip`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`file_tip` (
  `id` INT(11) NOT NULL,
  `key_s3` VARCHAR(245) NULL DEFAULT NULL,
  `name` VARCHAR(245) NULL DEFAULT NULL,
  `tip_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_file_tip_tip1_idx` (`tip_id` ASC),
  CONSTRAINT `fk_file_tip_tip1`
    FOREIGN KEY (`tip_id`)
    REFERENCES `exitum`.`tip` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`hour`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`hour` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `hour` TIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`invitation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`invitation` (
  `advertisement_id` INT(11) NOT NULL,
  `employee_id` INT(11) NOT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `saved` TINYINT(1) NULL DEFAULT '0',
  PRIMARY KEY (`advertisement_id`, `employee_id`),
  INDEX `fk_invitations_project1_idx` (`advertisement_id` ASC),
  INDEX `fk_invitations_employee1_idx` (`employee_id` ASC),
  CONSTRAINT `fk_invitations_employee1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `exitum`.`employee` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_invitations_project1`
    FOREIGN KEY (`advertisement_id`)
    REFERENCES `exitum`.`advertisement` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`recommendation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`recommendation` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `description` TEXT NULL DEFAULT NULL,
  `employee_id` INT(11) NOT NULL,
  `total_likes` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_recomendation_employee1_idx` (`employee_id` ASC),
  CONSTRAINT `fk_recomendation_employee1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `exitum`.`employee` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`like`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`like` (
  `startup_id` INT(11) NOT NULL,
  `recommendation_id` INT(11) NOT NULL,
  `like` TINYINT(4) NULL DEFAULT NULL,
  PRIMARY KEY (`startup_id`, `recommendation_id`),
  INDEX `fk_like_startup1_idx` (`startup_id` ASC),
  INDEX `fk_like_recomendation1_idx` (`recommendation_id` ASC),
  CONSTRAINT `fk_like_recomendation1`
    FOREIGN KEY (`recommendation_id`)
    REFERENCES `exitum`.`recommendation` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_like_startup1`
    FOREIGN KEY (`startup_id`)
    REFERENCES `exitum`.`startup` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`meeting`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`meeting` (
  `startup_id` INT(11) NOT NULL,
  `employee_id` INT(11) NOT NULL,
  `day_meet` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`startup_id`, `employee_id`),
  INDEX `fk_meetings_startup1_idx` (`startup_id` ASC),
  INDEX `fk_meetings_employee1_idx` (`employee_id` ASC),
  CONSTRAINT `fk_meetings_employee1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `exitum`.`employee` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_meetings_startup1`
    FOREIGN KEY (`startup_id`)
    REFERENCES `exitum`.`startup` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`message` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `message` TEXT NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `viewed` TINYINT(4) NULL DEFAULT NULL,
  `chat_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_messages_chat1_idx` (`chat_id` ASC),
  CONSTRAINT `fk_messages_chat1`
    FOREIGN KEY (`chat_id`)
    REFERENCES `exitum`.`chat` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`notification_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`notification_type` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(145) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`notification`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`notification` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `notification_type_id` INT(11) NOT NULL,
  `notification` VARCHAR(145) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `viewed` TINYINT(4) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_notifications_notifications_type1_idx` (`notification_type_id` ASC),
  INDEX `fk_notification_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_notification_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_notifications_notifications_type1`
    FOREIGN KEY (`notification_type_id`)
    REFERENCES `exitum`.`notification_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`notification_setting`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`notification_setting` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `active` TINYINT(4) NULL DEFAULT NULL,
  `user_id` INT(11) NOT NULL,
  `notification_type_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_notification_setting_user1_idx` (`user_id` ASC),
  INDEX `fk_notification_setting_notification_type1_idx` (`notification_type_id` ASC),
  CONSTRAINT `fk_notification_setting_notification_type1`
    FOREIGN KEY (`notification_type_id`)
    REFERENCES `exitum`.`notification_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_notification_setting_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`order_detail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`order_detail` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `advertisement_id` INT(11) NOT NULL,
  `order_id` INT(11) NOT NULL,
  `amount` DECIMAL(10,2) NULL DEFAULT NULL,
  `day_start` DATETIME NULL DEFAULT NULL,
  `day_end` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_order_detail_project1_idx` (`advertisement_id` ASC),
  INDEX `fk_order_detail_order1_idx` (`order_id` ASC),
  CONSTRAINT `fk_order_detail_order1`
    FOREIGN KEY (`order_id`)
    REFERENCES `exitum`.`order` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_detail_project1`
    FOREIGN KEY (`advertisement_id`)
    REFERENCES `exitum`.`advertisement` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`proposal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`proposal` (
  `advertisement_id` INT(11) NOT NULL,
  `employee_id` INT(11) NOT NULL,
  `accepted` TINYINT(4) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`advertisement_id`, `employee_id`),
  INDEX `fk_proposals_project1_idx` (`advertisement_id` ASC),
  INDEX `fk_proposals_employee1_idx` (`employee_id` ASC),
  CONSTRAINT `fk_proposals_employee1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `exitum`.`employee` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_proposals_project1`
    FOREIGN KEY (`advertisement_id`)
    REFERENCES `exitum`.`advertisement` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`review` (
  `from_user_id` INT(11) NOT NULL,
  `to_user_id` INT(11) NOT NULL,
  `review` TEXT NULL DEFAULT NULL,
  `rating` TINYINT(1) UNSIGNED NULL DEFAULT NULL,
  `state` TINYINT(4) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`from_user_id`, `to_user_id`),
  INDEX `fk_reviews_user1_idx` (`from_user_id` ASC),
  INDEX `fk_reviews_user2_idx` (`to_user_id` ASC),
  CONSTRAINT `fk_reviews_user1`
    FOREIGN KEY (`from_user_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_reviews_user2`
    FOREIGN KEY (`to_user_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`review_startup`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`review_startup` (
  `user_id` INT(11) NOT NULL,
  `startup_id` INT(11) NOT NULL,
  `rating` TINYINT(1) UNSIGNED NULL DEFAULT NULL,
  `recommendation` TEXT NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`, `startup_id`),
  INDEX `fk_user_has_startup_startup1_idx` (`startup_id` ASC),
  INDEX `fk_user_has_startup_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_has_startup_startup1`
    FOREIGN KEY (`startup_id`)
    REFERENCES `exitum`.`startup` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_startup_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`skill_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`skill_user` (
  `user_id` INT(11) NOT NULL,
  `skill_id` INT(11) NOT NULL,
  `highlight` TINYINT(1) NULL DEFAULT '0',
  PRIMARY KEY (`user_id`, `skill_id`),
  INDEX `fk_user_has_skill_skill2_idx` (`skill_id` ASC),
  INDEX `fk_user_has_skill_user3_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_has_skill_skill2`
    FOREIGN KEY (`skill_id`)
    REFERENCES `exitum`.`skill` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_skill_user3`
    FOREIGN KEY (`user_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`startup_employee_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`startup_employee_type` (
  `startup_id` INT(11) NOT NULL,
  `type_id` INT(11) NOT NULL,
  PRIMARY KEY (`startup_id`, `type_id`),
  INDEX `fk_startup_has_type_type1_idx` (`type_id` ASC),
  INDEX `fk_startup_has_type_startup1_idx` (`startup_id` ASC),
  CONSTRAINT `fk_startup_has_type_startup1`
    FOREIGN KEY (`startup_id`)
    REFERENCES `exitum`.`startup` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_startup_has_type_type1`
    FOREIGN KEY (`type_id`)
    REFERENCES `exitum`.`type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`startup_step`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`startup_step` (
  `startup_id` INT(11) NOT NULL,
  `step_id` INT(11) NOT NULL,
  `tip_completed` INT(11) NULL DEFAULT NULL,
  `icon_count_tip` VARCHAR(245) NULL DEFAULT NULL,
  `state` ENUM('completado', 'incompleto') NULL DEFAULT 'incompleto',
  PRIMARY KEY (`startup_id`, `step_id`),
  INDEX `fk_startup_has_step_step1_idx` (`step_id` ASC),
  INDEX `fk_startup_has_step_startup1_idx` (`startup_id` ASC),
  CONSTRAINT `fk_startup_has_step_startup1`
    FOREIGN KEY (`startup_id`)
    REFERENCES `exitum`.`startup` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_startup_has_step_step1`
    FOREIGN KEY (`step_id`)
    REFERENCES `exitum`.`step` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`subcategory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`subcategory` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(145) NULL DEFAULT NULL,
  `category_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_subcategory_category1_idx` (`category_id` ASC),
  CONSTRAINT `fk_subcategory_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `exitum`.`category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`team`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`team` (
  `employee_id` INT(11) NOT NULL,
  `startup_id` INT(11) NOT NULL,
  `contract` TINYINT(4) NULL DEFAULT NULL,
  PRIMARY KEY (`employee_id`, `startup_id`),
  INDEX `fk_employee_has_startup_startup1_idx` (`startup_id` ASC),
  INDEX `fk_employee_has_startup_employee1_idx` (`employee_id` ASC),
  CONSTRAINT `fk_employee_has_startup_employee1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `exitum`.`employee` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_employee_has_startup_startup1`
    FOREIGN KEY (`startup_id`)
    REFERENCES `exitum`.`startup` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`tip_skill`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`tip_skill` (
  `tip_id` INT(11) NOT NULL,
  `skill_id` INT(11) NOT NULL,
  PRIMARY KEY (`tip_id`, `skill_id`),
  INDEX `fk_tip_has_skill_skill1_idx` (`skill_id` ASC),
  INDEX `fk_tip_has_skill_tip1_idx` (`tip_id` ASC),
  CONSTRAINT `fk_tip_has_skill_skill1`
    FOREIGN KEY (`skill_id`)
    REFERENCES `exitum`.`skill` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tip_has_skill_tip1`
    FOREIGN KEY (`tip_id`)
    REFERENCES `exitum`.`tip` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`token`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`token` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `token` VARCHAR(255) NULL DEFAULT NULL,
  `token_created_at` DATETIME NULL DEFAULT NULL,
  `token_password` VARCHAR(255) NULL DEFAULT NULL,
  `token_password_created_at` DATETIME NULL DEFAULT NULL,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_token_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_token_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`unavailable`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`unavailable` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `time` TIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_unavailable_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_unavailable_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`user_advice`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`user_advice` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `advice_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `startup_id` INT(11) NULL DEFAULT NULL,
  `employee_id` INT(11) NULL DEFAULT NULL,
  `entrepreneur_id` INT(11) NULL DEFAULT NULL,
  `date_viewed` DATETIME NULL DEFAULT NULL,
  `viewed` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_has_advice_advice1_idx` (`advice_id` ASC),
  INDEX `fk_user_has_advice_user1_idx` (`user_id` ASC),
  INDEX `fk_user_has_advice_startup1_idx` (`startup_id` ASC),
  INDEX `fk_user_has_advice_employee1_idx` (`employee_id` ASC),
  INDEX `fk_user_has_advice_entrepreneur1_idx` (`entrepreneur_id` ASC),
  CONSTRAINT `fk_user_has_advice_advice1`
    FOREIGN KEY (`advice_id`)
    REFERENCES `exitum`.`advice` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_advice_employee1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `exitum`.`employee` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_advice_entrepreneur1`
    FOREIGN KEY (`entrepreneur_id`)
    REFERENCES `exitum`.`entrepreneur` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_advice_startup1`
    FOREIGN KEY (`startup_id`)
    REFERENCES `exitum`.`startup` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_advice_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`user_verification_skill`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`user_verification_skill` (
  `to_user_id` INT(11) NOT NULL,
  `from_user_id` INT(11) NOT NULL,
  `skill_id` INT(11) NOT NULL,
  PRIMARY KEY (`to_user_id`, `from_user_id`, `skill_id`),
  INDEX `fk_user_has_skill_skill1_idx` (`skill_id` ASC),
  INDEX `fk_user_has_skill_user1_idx` (`to_user_id` ASC),
  INDEX `fk_user_has_skill_user2_idx` (`from_user_id` ASC),
  CONSTRAINT `fk_user_has_skill_skill1`
    FOREIGN KEY (`skill_id`)
    REFERENCES `exitum`.`skill` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_skill_user1`
    FOREIGN KEY (`to_user_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_skill_user2`
    FOREIGN KEY (`from_user_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`user_workshop`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`user_workshop` (
  `user_id` INT(11) NOT NULL,
  `workshop_id` INT(11) NOT NULL,
  `rate` TINYINT(1) NULL DEFAULT NULL,
  `status` ENUM('ACCEPTED', 'PENDING', 'REJECTED') NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`, `workshop_id`),
  INDEX `fk_user_has_workshop_workshop1_idx` (`workshop_id` ASC),
  INDEX `fk_user_has_workshop_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_has_workshop_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_workshop_workshop1`
    FOREIGN KEY (`workshop_id`)
    REFERENCES `exitum`.`workshop` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`administrador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`administrador` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(191) NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `status` TINYINT(1) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


INSERT INTO `currency` (`id`, `currency`) VALUES (NULL, 'PEN'), (NULL, 'USD');
INSERT INTO `country` (`id`, `country`, `code`, `currency_id`) VALUES (NULL, 'Perú', 'PE', 1), (NULL, 'Estados Unidos', 'EEUU', 2);
INSERT INTO `user` (`id`, `name`, `lastname`, `email`, `password`, `provider_id`, `confirmed`, `phone`, `role`, `method`, `active`, `last_login`, `photo`, `avg_rating`, `created_at`, `country_id`, `currency_id`, `from_hour`, `to_hour`)
VALUES (NULL, 'Usuario', 'Usuario', 'usuario@gmail.com', '$2b$10$AVbAuGsBU0pDnTrrhuRn9uON0HTDcALvdcTqlSHbDgyDoNQ8Qc0.6', NULL, '1', NULL, 'employee', 'local', '1', NULL, NULL, NULL, '2019-10-11 00:00:00', '1', '1',  '7:00.00', '22:00:00'),
(NULL, 'Usuaria', 'Usuaria', 'usuaria@gmail.com', '$2b$10$AVbAuGsBU0pDnTrrhuRn9uON0HTDcALvdcTqlSHbDgyDoNQ8Qc0.6', NULL, '1', NULL, 'employee', 'local', '1', NULL, NULL, NULL, '2019-10-11 00:00:00', '1', '1',  '7:00.00', '22:00:00'),
(NULL, 'Usuarito', 'Usuarito', 'usuarito@gmail.com', '$2b$10$AVbAuGsBU0pDnTrrhuRn9uON0HTDcALvdcTqlSHbDgyDoNQ8Qc0.6', NULL, '1', NULL, 'employee', 'local', '1', NULL, NULL, NULL, '2019-10-11 00:00:00', '1', '1',  '7:00.00', '22:00:00'),
(NULL, 'Usuarita', 'Usuarita', 'usuarita@gmail.com', '$2b$10$AVbAuGsBU0pDnTrrhuRn9uON0HTDcALvdcTqlSHbDgyDoNQ8Qc0.6', NULL, '1', NULL, 'employee', 'local', '1', NULL, NULL, NULL, '2019-10-11 00:00:00', '1', '1',  '7:00.00', '22:00:00');

INSERT INTO `user` (`id`, `name`, `lastname`, `email`, `password`, `provider_id`, `confirmed`, `phone`, `role`, `method`, `active`, `last_login`, `photo`, `avg_rating`, `created_at`, `country_id`, `currency_id`, `from_hour`, `to_hour`)
VALUES (NULL, 'Emprendedor', 'Emprendedor', 'emprendedor@gmail.com', '$2b$10$AVbAuGsBU0pDnTrrhuRn9uON0HTDcALvdcTqlSHbDgyDoNQ8Qc0.6', NULL, '1', NULL, 'entrepreneur', 'local', '1', NULL, NULL, NULL, '2019-10-11 00:00:00', '1', '1', '7:00.00', '22:00:00'),
(NULL, 'Emprendedora', 'Emprendedora', 'emprendedora@gmail.com', '$2b$10$AVbAuGsBU0pDnTrrhuRn9uON0HTDcALvdcTqlSHbDgyDoNQ8Qc0.6', NULL, '1', NULL, 'entrepreneur', 'local', '1', NULL, NULL, NULL, '2019-10-11 00:00:00', '2', '2', '7:00.00', '22:00:00');

-- INSERT INTO `exitum`.`user` (`name`, `lastname`, `email`, `password`, `provider_id`, `confirmed`, `role`, `method`, `active`, `created_at`, `country_id`, `currency_id`) 
-- VALUES ('Mario', 'Bros', 'mario@gmail.com', '$10$AVbAuGsBU0pDnTrrhuRn9uON0HTDcALvdcTqlSHbDgyDoNQ8Qc0.6', null, '1', 'employee', 'local', '1', '2019-10-11 00:00:00', '1', '1'),
-- ('Rhaegar', 'Code', 'rhaegarcode@gmail.com', null, 115836172712480098535, '1', 'employee', 'google', '1', '2019-10-11 00:00:00', '1', '1')
-- ('javier', 'lecca', 'leccajavier@gmail.com', null, 101931926708859123325, '1', 'employee', 'google', '1', '2019-10-11 00:00:00', '1', '1')

INSERT INTO `entrepreneur` (`id`, `user_id`) VALUES (NULL, '5'), (NULL, '6');

INSERT INTO `category` (`id`, `name`) VALUES (NULL, 'Tecnológico'), (NULL, 'Radio y televisión'), (NULL, 'Automotriz'), (NULL, 'Alimenticia'), (NULL, 'Bebidas'),
(NULL, 'Textil'), (NULL, 'Construnccion'), (NULL, 'Maquinaria y equipo'), (NULL, 'Productos Químicos'), (NULL, 'Farmaceutica'), (NULL, 'Inmoviliarias'), (NULL, 'Transporte'),
(NULL, 'Agricultura'), (NULL, 'Educación'), (NULL, 'Salud');

INSERT INTO `exitum`.`skill` (`id`,`skill`) VALUES (1,'Emprendedor');
INSERT INTO `exitum`.`skill` (`id`,`skill`) VALUES (2,'Diseñador Ux');
INSERT INTO `exitum`.`skill` (`id`,`skill`) VALUES (3,'Responsable');
INSERT INTO `exitum`.`skill` (`id`,`skill`) VALUES (4,'Cientifico');
INSERT INTO `exitum`.`skill` (`id`,`skill`) VALUES (5,'Alegre');
INSERT INTO `exitum`.`skill` (`id`,`skill`) VALUES (6,'Desarrollador web');
INSERT INTO `exitum`.`skill` (`id`,`skill`) VALUES (7,'Desarrollador movil');
INSERT INTO `exitum`.`skill` (`id`,`skill`) VALUES (8,'JavaScript');
INSERT INTO `exitum`.`skill` (`id`,`skill`) VALUES (9,'NodeJS');
INSERT INTO `exitum`.`skill` (`id`,`skill`) VALUES (10,'PHP');
INSERT INTO `exitum`.`skill` (`id`,`skill`) VALUES (11,'Android');
INSERT INTO `exitum`.`skill` (`id`,`skill`) VALUES (12,'Java');

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

INSERT INTO `startup` (`id`, `name`, `photo_url`, `ruc`, `description`, `avg_rating`, `entrepreneur_id`, `stage_id`, `category_id`)
VALUES (NULL, 'Startup', NULL, '12345678', NULL, NULL, '1', '1', '1'), (NULL, 'Startup2', NULL, '12345698', NULL, NULL, '2', '2', '2'),
(NULL, 'Startup3', NULL, '98765432', NULL, NULL, '1', '2', '2'), (NULL, 'Startup4', NULL, '56974563', NULL, NULL, '1', '1', '2');

INSERT INTO `area` (`id`, `name`) VALUES (NULL, 'Área 1'), (NULL, 'Área 2'), (NULL, 'Área 3'), (NULL, 'Área 4');

INSERT INTO `language` (`id`, `language`) VALUES ('1', 'ingles');
INSERT INTO `language` (`id`, `language`) VALUES ('2', 'espanol');
INSERT INTO `language` (`id`, `language`) VALUES ('3', 'portugues');

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


-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('81', 'Reto 1 Nivel 1 Etapa 2 employee', '37');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('82', 'Reto 2 Nivel 1 Etapa 2 employee', '37');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('83', 'Reto 3 Nivel 1 Etapa 2 employee', '37');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('84', 'Reto 4 Nivel 1 Etapa 2 employee', '37');

-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('85', 'Reto 1 Nivel 2 Etapa 2 employee', '38');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('86', 'Reto 2 Nivel 2 Etapa 2 employee', '38');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('87', 'Reto 3 Nivel 2 Etapa 2 employee', '38');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('88', 'Reto 4 Nivel 2 Etapa 2 employee', '38');

-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('89', 'Reto 1 Nivel 3 Etapa 2 employee', '39');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('90', 'Reto 2 Nivel 3 Etapa 2 employee', '39');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('91', 'Reto 3 Nivel 3 Etapa 2 employee', '39');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('92', 'Reto 4 Nivel 3 Etapa 2 employee', '39');

-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('93', 'Reto 1 Nivel 4 Etapa 2 employee', '40');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('94', 'Reto 2 Nivel 4 Etapa 2 employee', '40');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('95', 'Reto 3 Nivel 4 Etapa 2 employee', '40');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('96', 'Reto 4 Nivel 4 Etapa 2 employee', '40');

-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ( '97', 'Reto 1 Nivel 5 Etapa 2 employee', '41');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ( '98', 'Reto 2 Nivel 5 Etapa 2 employee', '41');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ( '99', 'Reto 3 Nivel 5 Etapa 2 employee', '41');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('100', 'Reto 4 Nivel 5 Etapa 2 employee', '41');

-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('101', 'Reto 1 Nivel 6 Etapa 2 employee', '42');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('102', 'Reto 2 Nivel 6 Etapa 2 employee', '42');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('103', 'Reto 3 Nivel 6 Etapa 2 employee', '42');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('104', 'Reto 4 Nivel 6 Etapa 2 employee', '42');


-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('105', 'Reto 1 Nivel 1 Etapa 3 employee', '43');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('106', 'Reto 2 Nivel 1 Etapa 3 employee', '43');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('107', 'Reto 3 Nivel 1 Etapa 3 employee', '43');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('108', 'Reto 4 Nivel 1 Etapa 3 employee', '43');

-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('101', 'Reto 1 Nivel 2 Etapa 3 employee', '44');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('102', 'Reto 2 Nivel 2 Etapa 3 employee', '44');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('103', 'Reto 3 Nivel 2 Etapa 3 employee', '44');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('104', 'Reto 4 Nivel 2 Etapa 3 employee', '44');

-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('105', 'Reto 1 Nivel 3 Etapa 3 employee', '45');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('106', 'Reto 2 Nivel 3 Etapa 3 employee', '45');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('107', 'Reto 3 Nivel 3 Etapa 3 employee', '45');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('108', 'Reto 4 Nivel 3 Etapa 3 employee', '45');

-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('109', 'Reto 1 Nivel 4 Etapa 3 employee', '46');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('110', 'Reto 2 Nivel 4 Etapa 3 employee', '46');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('111', 'Reto 3 Nivel 4 Etapa 3 employee', '46');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('112', 'Reto 4 Nivel 4 Etapa 3 employee', '46');

-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('113', 'Reto 1 Nivel 5 Etapa 3 employee', '47');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('114', 'Reto 2 Nivel 5 Etapa 3 employee', '47');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('115', 'Reto 3 Nivel 5 Etapa 3 employee', '47');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('116', 'Reto 4 Nivel 5 Etapa 3 employee', '47');

-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('117', 'Reto 1 Nivel 6 Etapa 3 employee', '48');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('118', 'Reto 2 Nivel 6 Etapa 3 employee', '48');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('119', 'Reto 3 Nivel 6 Etapa 3 employee', '48');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('120', 'Reto 4 Nivel 6 Etapa 3 employee', '48');


-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('121', 'Reto 1 Nivel 1 Etapa 4 employee', '49');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('122', 'Reto 2 Nivel 1 Etapa 4 employee', '49');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('123', 'Reto 3 Nivel 1 Etapa 4 employee', '49');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('124', 'Reto 4 Nivel 1 Etapa 4 employee', '49');

-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('125', 'Reto 1 Nivel 2 Etapa 4 employee', '50');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('126', 'Reto 2 Nivel 2 Etapa 4 employee', '50');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('127', 'Reto 3 Nivel 2 Etapa 4 employee', '50');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('128', 'Reto 4 Nivel 2 Etapa 4 employee', '50');

-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('129', 'Reto 1 Nivel 3 Etapa 4 employee', '51');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('130', 'Reto 2 Nivel 3 Etapa 4 employee', '51');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('131', 'Reto 3 Nivel 3 Etapa 4 employee', '51');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('132', 'Reto 4 Nivel 3 Etapa 4 employee', '51');

-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('133', 'Reto 1 Nivel 4 Etapa 4 employee', '52');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('134', 'Reto 2 Nivel 4 Etapa 4 employee', '52');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('135', 'Reto 3 Nivel 4 Etapa 4 employee', '52');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('136', 'Reto 4 Nivel 4 Etapa 4 employee', '52');

-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('137', 'Reto 1 Nivel 5 Etapa 4 employee', '53');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('138', 'Reto 2 Nivel 5 Etapa 4 employee', '53');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('139', 'Reto 3 Nivel 5 Etapa 4 employee', '53');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('140', 'Reto 4 Nivel 5 Etapa 4 employee', '53');

-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('141', 'Reto 1 Nivel 6 Etapa 4 employee', '54');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('142', 'Reto 2 Nivel 6 Etapa 4 employee', '54');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('143', 'Reto 3 Nivel 6 Etapa 4 employee', '54');
-- INSERT INTO `tip` (`id`, `tip`, `step_id`) VALUES ('144', 'Reto 4 Nivel 6 Etapa 4 employee', '54');

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

insert into `exitum`.`file_tip`(id, name, key_s3,tip_id) values 
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

INSERT INTO `exitum`.`type` (`id`, `type`) VALUES ('1', 'Hormiga');

INSERT INTO `exitum`.`level` (`id`, `level`) VALUES ('1', 'Basico');
INSERT INTO `exitum`.`level` (`id`, `level`) VALUES ('2', 'Intermedio');
INSERT INTO `exitum`.`level` (`id`, `level`) VALUES ('3', 'Avanzado');

INSERT INTO `exitum`.`university` (`university`) VALUES ('Universidad Mayor de San Marcos');
INSERT INTO `exitum`.`university` (`university`) VALUES ('Pontificia Universidad Católica del Perú');

INSERT INTO `exitum`.`company` (`name`) VALUES ('Microsoft');
INSERT INTO `exitum`.`company` (`name`) VALUES ('Apple');

INSERT INTO `exitum`.`advice` (`id`, `title`, `description`, `type`, `order`) VALUES ( '1', 'Consejo 1', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.', 'employee', '1');
INSERT INTO `exitum`.`advice` (`id`, `title`, `description`, `type`, `order`) VALUES ( '2', 'Consejo 2', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.', 'employee', '2');
INSERT INTO `exitum`.`advice` (`id`, `title`, `description`, `type`, `order`) VALUES ( '3', 'Consejo 3', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.', 'employee', '3');
INSERT INTO `exitum`.`advice` (`id`, `title`, `description`, `type`, `order`) VALUES ( '4', 'Consejo 4', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.', 'employee', '4');
INSERT INTO `exitum`.`advice` (`id`, `title`, `description`, `type`, `order`) VALUES ( '5', 'Consejo 1', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.', 'startup', '1');
INSERT INTO `exitum`.`advice` (`id`, `title`, `description`, `type`, `order`) VALUES ( '6', 'Consejo 2', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.', 'startup', '2');
INSERT INTO `exitum`.`advice` (`id`, `title`, `description`, `type`, `order`) VALUES ( '7', 'Consejo 3', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.', 'startup', '3');
INSERT INTO `exitum`.`advice` (`id`, `title`, `description`, `type`, `order`) VALUES ( '8', 'Consejo 4', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.', 'startup', '4');
INSERT INTO `exitum`.`advice` (`id`, `title`, `description`, `type`, `order`) VALUES ( '9', 'Consejo 1', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.', 'entrepreneur', '1');
INSERT INTO `exitum`.`advice` (`id`, `title`, `description`, `type`, `order`) VALUES ('10', 'Consejo 2', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.', 'entrepreneur', '2');
INSERT INTO `exitum`.`advice` (`id`, `title`, `description`, `type`, `order`) VALUES ('11', 'Consejo 3', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.', 'entrepreneur', '3');
INSERT INTO `exitum`.`advice` (`id`, `title`, `description`, `type`, `order`) VALUES ('12', 'Consejo 4', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.', 'entrepreneur', '4');
