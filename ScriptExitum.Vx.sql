-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema exitum
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
-- Table `exitum`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(145) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`currency`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`currency` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `currency` VARCHAR(145) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`country`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`country` (
  `id` INT NOT NULL AUTO_INCREMENT,
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
  `id` INT NOT NULL AUTO_INCREMENT,
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
  `photo_dni` VARCHAR(145) NULL DEFAULT NULL,
  `avg_rating` FLOAT(3,2) UNSIGNED NULL DEFAULT '0.00',
  `created_at` DATETIME NULL DEFAULT NULL,
  `from_hour` TIME NULL,
  `to_hour` TIME NULL,
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
  `id` INT NOT NULL AUTO_INCREMENT,
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
  `id` INT NOT NULL AUTO_INCREMENT,
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
  `id` INT NOT NULL AUTO_INCREMENT,
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
-- Table `exitum`.`area`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`area` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `exitum`.`advertisement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`advertisement` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(120) NULL DEFAULT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `state` ENUM('active', 'closed', 'archived') NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `startup_id` INT(11) NOT NULL,
  `area_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_project_startup1_idx` (`startup_id` ASC),
  INDEX `fk_advertisement_area1_idx` (`area_id` ASC),
  CONSTRAINT `fk_project_startup1`
    FOREIGN KEY (`startup_id`)
    REFERENCES `exitum`.`startup` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_advertisement_area1`
    FOREIGN KEY (`area_id`)
    REFERENCES `exitum`.`area` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`skill`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`skill` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `skill` VARCHAR(145) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
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
-- Table `exitum`.`test`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`test` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(70) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`question`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`question` (
  `id` INT NOT NULL AUTO_INCREMENT,
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
  `id` INT NOT NULL AUTO_INCREMENT,
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
-- Table `exitum`.`employee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`employee` (
  `id` INT NOT NULL AUTO_INCREMENT,
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
-- Table `exitum`.`certification`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`certification` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(145) NULL DEFAULT NULL,
  `issuing_company` VARCHAR(145) NULL DEFAULT NULL,
  `date_expedition` DATETIME NULL DEFAULT NULL,
  `date_expiration` DATETIME NULL DEFAULT NULL,
  `document_url` VARCHAR(255) NULL DEFAULT NULL,
  `employee_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_certification_employee1_idx` (`employee_id` ASC),
  CONSTRAINT `fk_certification_employee1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `exitum`.`employee` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`chat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`chat` (
  `id` INT NOT NULL AUTO_INCREMENT,
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
  `id` INT NOT NULL AUTO_INCREMENT,
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
  `id` INT NOT NULL AUTO_INCREMENT,
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
  `id` INT NOT NULL AUTO_INCREMENT,
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
  `id` INT NOT NULL AUTO_INCREMENT,
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
  `id` INT NOT NULL AUTO_INCREMENT,
  `university` VARCHAR(145) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`education`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`education` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` TEXT NULL DEFAULT NULL,
  `date_start` DATETIME NULL DEFAULT NULL,
  `date_end` DATETIME NULL DEFAULT NULL,
  `university_id` INT(11) NULL DEFAULT NULL,
  `employee_id` INT(11) NOT NULL,
  `other_university` VARCHAR(145) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_educations_universities1_idx` (`university_id` ASC),
  INDEX `fk_education_employee1_idx` (`employee_id` ASC),
  CONSTRAINT `fk_education_employee1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `exitum`.`employee` (`id`)
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
  `id` INT NOT NULL AUTO_INCREMENT,
  `language` VARCHAR(145) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`level`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`level` (
  `id` INT NOT NULL AUTO_INCREMENT,
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
-- Table `exitum`.`employee_skill`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`employee_skill` (
  `skill_id` INT(11) NOT NULL,
  `employee_id` INT(11) NOT NULL,
  PRIMARY KEY (`skill_id`, `employee_id`),
  INDEX `fk_skill_has_employee_employee1_idx` (`employee_id` ASC),
  INDEX `fk_skill_has_employee_skill1_idx` (`skill_id` ASC),
  CONSTRAINT `fk_skill_has_employee_employee1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `exitum`.`employee` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_skill_has_employee_skill1`
    FOREIGN KEY (`skill_id`)
    REFERENCES `exitum`.`skill` (`id`)
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
-- Table `exitum`.`step`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`step` (
  `id` INT NOT NULL AUTO_INCREMENT,
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
  `id` INT NOT NULL AUTO_INCREMENT,
  `tip` VARCHAR(145) NULL DEFAULT NULL,
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
  `id` INT NOT NULL AUTO_INCREMENT,
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
-- Table `exitum`.`experience`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`experience` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `position` VARCHAR(145) NULL DEFAULT NULL,
  `company` VARCHAR(145) NULL DEFAULT NULL,
  `date_start` DATETIME NULL DEFAULT NULL,
  `date_end` DATETIME NULL DEFAULT NULL,
  `description` VARCHAR(1024) NULL DEFAULT NULL,
  `current_job` TINYINT(4) NULL DEFAULT NULL,
  `employee_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_experiencie_employee1_idx` (`employee_id` ASC),
  CONSTRAINT `fk_experiencie_employee1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `exitum`.`employee` (`id`)
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
-- Table `exitum`.`invitation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`invitation` (
  `advertisement_id` INT(11) NOT NULL,
  `employee_id` INT(11) NOT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
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
  `id` INT NOT NULL AUTO_INCREMENT,
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
  `id` INT NOT NULL AUTO_INCREMENT,
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
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(145) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`notification`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`notification` (
  `id` INT NOT NULL AUTO_INCREMENT,
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
  `id` INT NOT NULL AUTO_INCREMENT,
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
  `id` INT NOT NULL AUTO_INCREMENT,
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
-- Table `exitum`.`startup_tip`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`startup_tip` (
  `tip_id` INT(11) NOT NULL,
  `startup_id` INT(11) NOT NULL,
  `checked` TINYINT(4) NULL DEFAULT NULL,
  PRIMARY KEY (`tip_id`, `startup_id`),
  INDEX `fk_tips_has_startup_startup1_idx` (`startup_id` ASC),
  INDEX `fk_tips_has_startup_tips1_idx` (`tip_id` ASC),
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
-- Table `exitum`.`subcategory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`subcategory` (
  `id` INT NOT NULL AUTO_INCREMENT,
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
-- Table `exitum`.`token`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`token` (
  `id` INT NOT NULL AUTO_INCREMENT,
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
-- Table `exitum`.`hour`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`hour` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `hour` TIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `exitum`.`appointment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`appointment` (
  `hour_id` INT NOT NULL,
  `user_id` INT(11) NOT NULL,
  `date` DATE NULL,
  `type` ENUM('reunion', 'recordatorio') NULL,
  `description` TEXT NULL,
  `status` TINYINT(1) NULL DEFAULT 0,
  PRIMARY KEY (`hour_id`, `user_id`),
  INDEX `fk_hour_has_user_user1_idx` (`user_id` ASC),
  INDEX `fk_hour_has_user_hour1_idx` (`hour_id` ASC),
  CONSTRAINT `fk_hour_has_user_hour1`
    FOREIGN KEY (`hour_id`)
    REFERENCES `exitum`.`hour` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_hour_has_user_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `exitum`.`schedule`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`schedule` (
  `hour_id` INT NOT NULL,
  `user_id` INT(11) NOT NULL,
  `break` TINYINT(1) NULL,
  PRIMARY KEY (`hour_id`, `user_id`),
  INDEX `fk_hour_has_user_user2_idx` (`user_id` ASC),
  INDEX `fk_hour_has_user_hour2_idx` (`hour_id` ASC),
  CONSTRAINT `fk_hour_has_user_hour2`
    FOREIGN KEY (`hour_id`)
    REFERENCES `exitum`.`hour` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_hour_has_user_user2`
    FOREIGN KEY (`user_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `exitum`.`workshop`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`workshop` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(145) NULL,
  `description` TEXT NULL,
  `day` DATE NULL,
  `hour_start` TIME NULL,
  `hour_end` TIME NULL,
  `place` VARCHAR(200) NULL,
  `lat` DECIMAL(10,8) NULL,
  `lng` DECIMAL(11,8) NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_workshop_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_workshop_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

INSERT INTO `currency` (`id`, `currency`) VALUES (NULL, 'PEN'), (NULL, 'USD');
INSERT INTO `country` (`id`, `country`, `code`, `currency_id`) VALUES (NULL, 'Perú', 'PE', 1), (NULL, 'Estados Unidos', 'EEUU', 2);
INSERT INTO `user` (`id`, `name`, `lastname`, `email`, `password`, `provider_id`, `confirmed`, `phone`, `role`, `method`, `active`, `last_login`, `photo`, `photo_dni`, `avg_rating`, `created_at`, `country_id`, `currency_id`, `from_hour`, `to_hour`)
VALUES (NULL, 'Usuario', 'Usuario', 'usuario@gmail.com', '$2b$10$AVbAuGsBU0pDnTrrhuRn9uON0HTDcALvdcTqlSHbDgyDoNQ8Qc0.6', NULL, '1', NULL, 'employee', 'local', '1', NULL, NULL, NULL, NULL, '2019-10-11 00:00:00', '1', '1',  '09:00:00', '19:00:00'),
(NULL, 'Usuaria', 'Usuaria', 'usuaria@gmail.com', '$2b$10$AVbAuGsBU0pDnTrrhuRn9uON0HTDcALvdcTqlSHbDgyDoNQ8Qc0.6', NULL, '1', NULL, 'employee', 'local', '1', NULL, NULL, NULL, NULL, '2019-10-11 00:00:00', '1', '1',  '09:00:00', '19:00:00'),
(NULL, 'Usuarito', 'Usuarito', 'usuarito@gmail.com', '$2b$10$AVbAuGsBU0pDnTrrhuRn9uON0HTDcALvdcTqlSHbDgyDoNQ8Qc0.6', NULL, '1', NULL, 'employee', 'local', '1', NULL, NULL, NULL, NULL, '2019-10-11 00:00:00', '1', '1',  '09:00:00', '19:00:00'),
(NULL, 'Usuarita', 'Usuarita', 'usuarita@gmail.com', '$2b$10$AVbAuGsBU0pDnTrrhuRn9uON0HTDcALvdcTqlSHbDgyDoNQ8Qc0.6', NULL, '1', NULL, 'employee', 'local', '1', NULL, NULL, NULL, NULL, '2019-10-11 00:00:00', '1', '1',  '09:00:00', '19:00:00');

INSERT INTO `user` (`id`, `name`, `lastname`, `email`, `password`, `provider_id`, `confirmed`, `phone`, `role`, `method`, `active`, `last_login`, `photo`, `photo_dni`, `avg_rating`, `created_at`, `country_id`, `currency_id`, `from_hour`, `to_hour`)
VALUES (NULL, 'Emprendedor', 'Emprendedor', 'emprendedor@gmail.com', '$2b$10$AVbAuGsBU0pDnTrrhuRn9uON0HTDcALvdcTqlSHbDgyDoNQ8Qc0.6', NULL, '1', NULL, 'entrepreneur', 'local', '1', NULL, NULL, NULL, NULL, '2019-10-11 00:00:00', '1', '1', '09:00:00', '19:00:00'),
(NULL, 'Emprendedora', 'Emprendedora', 'emprendedora@gmail.com', '$2b$10$AVbAuGsBU0pDnTrrhuRn9uON0HTDcALvdcTqlSHbDgyDoNQ8Qc0.6', NULL, '1', NULL, 'entrepreneur', 'local', '1', NULL, NULL, NULL, NULL, '2019-10-11 00:00:00', '2', '2', '09:00:00', '19:00:00');

INSERT INTO `entrepreneur` (`id`, `user_id`) VALUES (NULL, '5'), (NULL, '6');
INSERT INTO `stage` (`id`, `stage`, `description`, `type`) 
VALUES (null, 'Pre semilla', "Etapa donde solo se tiene una idea superficial y se busca validarla.", 'startup'), 
(null, 'Semilla', "Etapa donde se pone en marcha el desarrollar nuestra idea aplicando metodologías para crear un modelo de negocio sustentable.", 'startup'), 
(null, 'Temprana', "Etapa donde se ha de crear un MVP, producto mínimo viable, para lanzarlo al mercado y recibir un feedback para detectar pros y contras.", 'startup'), 
(null, 'Crecimiento', "Etapa donde nuestra empresa consigue escalar consiguiendo ingresos de inversores y propios.", 'startup'), 
(null, 'Expansión', "Etapa donde se busca alcanzar nuevos horizontes en otros mercados.", 'startup'), 
(null, 'IPO', "Etapa donde se lanza al mercado acciones de nuestra empresa para conseguir acciones y expandir planes de negocio.", 'startup');
INSERT INTO `category` (`id`, `name`) VALUES (NULL, 'Tecnológico'), (NULL, 'Radio y televisión'), (NULL, 'Automotriz'), (NULL, 'Alimenticia'), (NULL, 'Bebidas'),
(NULL, 'Textil'), (NULL, 'Construnccion'), (NULL, 'Maquinaria y equipo'), (NULL, 'Productos Químicos'), (NULL, 'Farmaceutica'), (NULL, 'Inmoviliarias'), (NULL, 'Transporte'),
(NULL, 'Agricultura'), (NULL, 'Educación');

INSERT INTO `startup` (`id`, `name`, `photo_url`, `ruc`, `description`, `avg_rating`, `entrepreneur_id`, `stage_id`, `category_id`)
VALUES (NULL, 'Startup', NULL, '12345678', NULL, NULL, '1', '1', '1'), (NULL, 'Startup2', NULL, '12345698', NULL, NULL, '2', '2', '2'),
(NULL, 'Startup3', NULL, '98765432', NULL, NULL, '1', '2', '2'), (NULL, 'Startup4', NULL, '56974563', NULL, NULL, '1', '1', '2');

INSERT INTO `area` (`id`, `name`) VALUES (NULL, 'Área 1'), (NULL, 'Área 2'), (NULL, 'Área 3'), (NULL, 'Área 4');