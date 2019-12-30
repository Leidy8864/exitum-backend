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
-- Table `exitum`.`area`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`area` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`category` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(145) NULL DEFAULT NULL,
  `ciiu` VARCHAR(100) NULL DEFAULT NULL,
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
  `calling_code` VARCHAR(200) NULL DEFAULT NULL,
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
  `lastname_1` VARCHAR(100) NULL DEFAULT NULL,
  `lastname_2` VARCHAR(100) NULL DEFAULT NULL,
  `genre` VARCHAR(100) NULL DEFAULT NULL,
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
  `country_phone_id` INT(11) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `fk_user_country1_idx` (`country_id` ASC),
  INDEX `fk_user_currency1_idx` (`currency_id` ASC),
  INDEX `fk_user_country2_idx` (`country_phone_id` ASC),
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
  CONSTRAINT `fk_user_country2`
    FOREIGN KEY (`country_phone_id` , `country_currency_id`)
    REFERENCES `exitum`.`country` (`id` , `currency_id`)
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
  `created` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
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
  `icon` VARCHAR(250) NULL DEFAULT NULL,
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
  `participants` INT(11) NULL DEFAULT NULL,
  `photo` VARCHAR(255) NULL DEFAULT NULL,
  `department_id` INT NOT NULL,
  
  PRIMARY KEY (`id`),
  INDEX `fk_workshop_user1_idx` (`user_id` ASC) ,
  INDEX `fk_workshop_department1_idx` (`department_id` ASC) ,
  CONSTRAINT `fk_workshop_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_workshop_department1`
    FOREIGN KEY (`department_id`)
    REFERENCES `exitum`.`department` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


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
  `icon` VARCHAR(250) NULL DEFAULT NULL,
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
  `icon` VARCHAR(250) NULL DEFAULT NULL,
  `stage_id` INT(11) NOT NULL,
  `status` tinyint(1) NULL DEFAULT 1, 
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
  `type` VARCHAR(255) NOT NULL DEFAULT "evaluado por la comunidad",
  `duration_days` INT(3) NOT NULL DEFAULT 1,
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
  `date_max` DATETIME NULL DEFAULT NULL,
  `date_completed` DATETIME NULL DEFAULT NULL,
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
  `icon` VARCHAR(250) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `university_UNIQUE` (`university` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `exitum`.`career`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`career` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(191) NULL,
  PRIMARY KEY (`id`))
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
  `career_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_educations_universities1_idx` (`university_id` ASC),
  INDEX `fk_education_user1_idx` (`user_id` ASC),
  INDEX `fk_education_career1_idx` (`career_id` ASC),
  CONSTRAINT `fk_education_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_educations_universities1`
    FOREIGN KEY (`university_id`)
    REFERENCES `exitum`.`university` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_education_career1`
    FOREIGN KEY (`career_id`)
    REFERENCES `exitum`.`career` (`id`)
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
  `icon` VARCHAR(250) NULL DEFAULT NULL,
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
  `date_initial` DATETIME NULL DEFAULT NULL,,
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
  `id` INT(11) NOT NULL AUTO_INCREMENT,
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
  `date_initial` DATETIME NULL DEFAULT NULL,
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
  `password` VARCHAR(120) NOT NULL,
  `status` TINYINT(1) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `exitum`.`tip_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`tip_category` (
  `tip_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`tip_id`, `category_id`),
  INDEX `fk_tip_has_category_category1_idx` (`category_id` ASC),
  INDEX `fk_tip_has_category_tip1_idx` (`tip_id` ASC),
  CONSTRAINT `fk_tip_has_category_tip1`
    FOREIGN KEY (`tip_id`)
    REFERENCES `exitum`.`tip` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tip_has_category_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `exitum`.`category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


INSERT INTO `currency` (`id`, `currency`) VALUES (NULL, 'PEN'), (NULL, 'USD');

INSERT INTO `category` (`id`, `name`) 
VALUES (NULL, 'Tecnológico'), 
(NULL, 'Radio y televisión'), 
(NULL, 'Automotriz'), 
(NULL, 'Alimenticia'), 
(NULL, 'Bebidas'),
(NULL, 'Textil'), 
(NULL, 'Construnccion'), 
(NULL, 'Maquinaria y equipo'), 
(NULL, 'Productos Químicos'), 
(NULL, 'Farmaceutica'), 
(NULL, 'Inmoviliarias'), 
(NULL, 'Transporte'),
(NULL, 'Agricultura'), 
(NULL, 'Educación'), 
(NULL, 'Salud');

INSERT INTO `area` (`id`, `name`) VALUES (NULL, 'Área 1'), (NULL, 'Área 2'), (NULL, 'Área 3'), (NULL, 'Área 4');

INSERT INTO `language` (`id`, `language`) VALUES ('1', 'ingles');
INSERT INTO `language` (`id`, `language`) VALUES ('2', 'espanol');
INSERT INTO `language` (`id`, `language`) VALUES ('3', 'portugues');

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

INSERT INTO `stage` (`id`, `stage`, `description`, `type`) 
VALUES (1, 'Pre semilla', "Etapa donde solo se tiene una idea superficial y se busca validarla.", 'startup'), 
(2, 'Semilla', "Etapa donde se pone en marcha el desarrollar nuestra idea aplicando metodologías para crear un modelo de negocio sustentable.", 'startup'), 
(3, 'Temprana', "Etapa donde se ha de crear un MVP, producto mínimo viable, para lanzarlo al mercado y recibir un feedback para detectar pros y contras.", 'startup'), 
(4, 'Crecimiento', "Etapa donde nuestra empresa consigue escalar consiguiendo ingresos de inversores y propios.", 'startup'), 
(5, 'Expansión', "Etapa donde se busca alcanzar nuevos horizontes en otros mercados.", 'startup'), 
(6, 'Etapa 1 empleado', "Etapa 1 empleado.", 'employee');

INSERT INTO `country` (`id`, `country`, `code`, `calling_code`, `currency_id`) VALUES
(1, 'Afghanistan ', 'AF', '+93', 1),
(2, 'Albania ', 'AL', '+355', 1),
(3, 'Algeria ', 'DZ', '+213', 1),
(4, 'American Samoa', 'AS', '+1-684', 1),
(5, 'Andorra, Principality of ', 'AD', '+376', 1),
(6, 'Angola', 'AO', '+244', 1),
(7, 'Anguilla ', 'AI', '+1-264', 1),
(8, 'Antarctica', 'AQ', '+672', 1),
(9, 'Antigua and Barbuda', 'AG', '+1-268', 1),
(10, 'Argentina ', 'AR', '+54', 1),
(11, 'Armenia', 'AM', '+374', 1),
(12, 'Aruba', 'AW', '+297', 1),
(13, 'Australia', 'AU', '+61', 1),
(14, 'Austria', 'AT', '+43', 1),
(15, 'Azerbaijan or Azerbaidjan (Former Azerbaijan Soviet Socialist Republic)', 'AZ', '+994', 1),
(16, 'Bahamas, Commonwealth of The', 'BS', '+1-242', 1),
(17, 'Bahrain, Kingdom of (Former Dilmun)', 'BH', '+973', 1),
(18, 'Bangladesh (Former East Pakistan)', 'BD', '+880', 1),
(19, 'Barbados ', 'BB', '+1-246', 1),
(20, 'Belarus (Former Belorussian [Byelorussian] Soviet Socialist Republic)', 'BY', '+375', 1),
(21, 'Belgium ', 'BE', '+32', 1),
(22, 'Belize (Former British Honduras)', 'BZ', '+501', 1),
(23, 'Benin (Former Dahomey)', 'BJ', '+229', 1),
(24, 'Bermuda ', 'BM', '+1-441', 1),
(25, 'Bhutan, Kingdom of', 'BT', '+975', 1),
(26, 'Bolivia ', 'BO', '+591', 1),
(27, 'Bosnia and Herzegovina ', 'BA', '+387', 1),
(28, 'Botswana (Former Bechuanaland)', 'BW', '+267', 1),
(29, 'Bouvet Island (Territory of Norway)', 'BV', '', 1),
(30, 'Brazil ', 'BR', '+55', 1),
(31, 'British Indian Ocean Territory (BIOT)', 'IO', '', 1),
(32, 'Brunei (Negara Brunei Darussalam) ', 'BN', '+673', 1),
(33, 'Bulgaria ', 'BG', '+359', 1),
(34, 'Burkina Faso (Former Upper Volta)', 'BF', '+226', 1),
(35, 'Burundi (Former Urundi)', 'BI', '+257', 1),
(36, 'Cambodia, Kingdom of (Former Khmer Republic, Kampuchea Republic)', 'KH', '+855', 1),
(37, 'Cameroon (Former French Cameroon)', 'CM', '+237', 1),
(38, 'Canada ', 'CA', '+1', 1),
(39, 'Cape Verde ', 'CV', '+238', 1),
(40, 'Cayman Islands ', 'KY', '+1-345', 1),
(41, 'Central African Republic ', 'CF', '+236', 1),
(42, 'Chad ', 'TD', '+235', 1),
(43, 'Chile ', 'CL', '+56', 1),
(44, 'China ', 'CN', '+86', 1),
(45, 'Christmas Island ', 'CX', '+53', 1),
(46, 'Cocos (Keeling) Islands ', 'CC', '+61', 1),
(47, 'Colombia ', 'CO', '+57', 1),
(48, 'Comoros, Union of the ', 'KM', '+269', 1),
(49, 'Congo, Democratic Republic of the (Former Zaire) ', 'CD', '+243', 1),
(50, 'Congo, Republic of the', 'CG', '+242', 1),
(51, 'Cook Islands (Former Harvey Islands)', 'CK', '+682', 1),
(52, 'Costa Rica ', 'CR', '+506', 1),
(53, 'Cote D\'Ivoire (Former Ivory Coast) ', 'CI', '+225', 1),
(54, 'Croatia (Hrvatska) ', 'HR', '+385', 1),
(55, 'Cuba ', 'CU', '+53', 1),
(56, 'Cyprus ', 'CY', '+357', 1),
(57, 'Czech Republic', 'CZ', '+420', 1),
(58, 'Czechoslavakia (Former) See CZ Czech Republic or Slovakia', 'CS', '', 1),
(59, 'Denmark ', 'DK', '+45', 1),
(60, 'Djibouti (Former French Territory of the Afars and Issas, French Somaliland)', 'DJ', '+253', 1),
(61, 'Dominica ', 'DM', '+1-767', 1),
(62, 'Dominican Republic ', 'DO', '+1-809 and +1-829? ', 1),
(63, 'East Timor (Former Portuguese Timor)', 'TP', '+670', 1),
(64, 'Ecuador ', 'EC', '+593 ', 1),
(65, 'Egypt (Former United Arab Republic - with Syria)', 'EG', '+20', 1),
(66, 'El Salvador ', 'SV', '+503', 1),
(67, 'Equatorial Guinea (Former Spanish Guinea)', 'GQ', '+240', 1),
(68, 'Eritrea (Former Eritrea Autonomous Region in Ethiopia)', 'ER', '+291', 1),
(69, 'Estonia (Former Estonian Soviet Socialist Republic)', 'EE', '+372', 1),
(70, 'Ethiopia (Former Abyssinia, Italian East Africa)', 'ET', '+251', 1),
(71, 'Falkland Islands (Islas Malvinas) ', 'FK', '+500', 1),
(72, 'Faroe Islands ', 'FO', '+298', 1),
(73, 'Fiji ', 'FJ', '+679', 1),
(74, 'Finland ', 'FI', '+358', 1),
(75, 'France ', 'FR', '+33', 1),
(76, 'French Guiana or French Guyana ', 'GF', '+594', 1),
(77, 'French Polynesia (Former French Colony of Oceania)', 'PF', '+689', 1),
(78, 'French Southern Territories and Antarctic Lands ', 'TF', '', 1),
(79, 'Gabon (Gabonese Republic)', 'GA', '+241', 1),
(80, 'Gambia, The ', 'GM', '+220', 1),
(81, 'Georgia (Former Georgian Soviet Socialist Republic)', 'GE', '+995', 1),
(82, 'Germany ', 'DE', '+49', 1),
(83, 'Ghana (Former Gold Coast)', 'GH', '+233', 1),
(84, 'Gibraltar ', 'GI', '+350', 1),
(85, 'Great Britain (United Kingdom) ', 'GB', '', 1),
(86, 'Greece ', 'GR', '+30', 1),
(87, 'Greenland ', 'GL', '+299', 1),
(88, 'Grenada ', 'GD', '+1-473', 1),
(89, 'Guadeloupe', 'GP', '+590', 1),
(90, 'Guam', 'GU', '+1-671', 1),
(91, 'Guatemala ', 'GT', '+502', 1),
(92, 'Guinea (Former French Guinea)', 'GN', '+224', 1),
(93, 'Guinea-Bissau (Former Portuguese Guinea)', 'GW', '+245', 1),
(94, 'Guyana (Former British Guiana)', 'GY', '+592', 1),
(95, 'Haiti ', 'HT', '+509', 1),
(96, 'Heard Island and McDonald Islands (Territory of Australia)', 'HM', '', 1),
(97, 'Holy See (Vatican City State)', 'VA', '', 1),
(98, 'Honduras ', 'HN', '+504', 1),
(99, 'Hong Kong ', 'HK', '+852', 1),
(100, 'Hungary ', 'HU', '+36', 1),
(101, 'Iceland ', 'IS', '+354', 1),
(102, 'India ', 'IN', '+91', 1),
(103, 'Indonesia (Former Netherlands East Indies; Dutch East Indies)', 'ID', '+62', 1),
(104, 'Iran, Islamic Republic of', 'IR', '+98', 1),
(105, 'Iraq ', 'IQ', '+964', 1),
(106, 'Ireland ', 'IE', '+353', 1),
(107, 'Israel ', 'IL', '+972', 1),
(108, 'Italy ', 'IT', '+39', 1),
(109, 'Jamaica ', 'JM', '+1-876', 1),
(110, 'Japan ', 'JP', '+81', 1),
(111, 'Jordan (Former Transjordan)', 'JO', '+962', 1),
(112, 'Kenya (Former British East Africa)', 'KE', '+254', 1),
(113, 'Kiribati (Pronounced keer-ree-bahss) (Former Gilbert Islands)', 'KI', '+686', 1),
(114, 'Korea, Democratic People\'s Republic of (North Korea)', 'KP', '+850', 1),
(115, 'Korea, Republic of (South Korea) ', 'KR', '+82', 1),
(116, 'Kuwait ', 'KW', '+965', 1),
(117, 'Kyrgyzstan (Kyrgyz Republic) (Former Kirghiz Soviet Socialist Republic)', 'KG', '+996', 1),
(118, 'Lao People\'s Democratic Republic (Laos)', 'LA', '+856', 1),
(119, 'Lebanon ', 'LB', '+961', 1),
(120, 'Lesotho (Former Basutoland)', 'LS', '+266', 1),
(121, 'Liberia ', 'LR', '+231', 1),
(122, 'Libya (Libyan Arab Jamahiriya)', 'LY', '+218', 1),
(123, 'Liechtenstein ', 'LI', '+423', 1),
(124, 'Lithuania (Former Lithuanian Soviet Socialist Republic)', 'LT', '+370', 1),
(125, 'Luxembourg ', 'LU', '+352', 1),
(126, 'Macau ', 'MO', '+853', 1),
(127, 'Macedonia, The Former Yugoslav Republic of', 'MK', '+389', 1),
(128, 'Malawi (Former British Central African Protectorate, Nyasaland)', 'MW', '+265', 1),
(129, 'Malaysia ', 'MY', '+60', 1),
(130, 'Maldives ', 'MV', '+960', 1),
(131, 'Mali (Former French Sudan and Sudanese Republic) ', 'ML', '+223', 1),
(132, 'Malta ', 'MT', '+356', 1),
(133, 'Marshall Islands (Former Marshall Islands District - Trust Territory of the Pacific Islands)', 'MH', '+692', 1),
(134, 'Martinique (French) ', 'MQ', '+596', 1),
(135, 'Mauritania ', 'MR', '+222', 1),
(136, 'Mauritius ', 'MU', '+230', 1),
(137, 'Mayotte (Territorial Collectivity of Mayotte)', 'YT', '+269', 1),
(138, 'Mexico ', 'MX', '+52', 1),
(139, 'Micronesia, Federated States of (Former Ponape, Truk, and Yap Districts - Trust Territory of the Pacific Islands)', 'FM', '+691', 1),
(140, 'Moldova, Republic of', 'MD', '+373', 1),
(141, 'Monaco, Principality of', 'MC', '+377', 1),
(142, 'Mongolia (Former Outer Mongolia)', 'MN', '+976', 1),
(143, 'Montserrat ', 'MS', '+1-664', 1),
(144, 'Morocco ', 'MA', '+212', 1),
(145, 'Mozambique (Former Portuguese East Africa)', 'MZ', '+258', 1),
(146, 'Myanmar, Union of (Former Burma)', 'MM', '+95', 1),
(147, 'Namibia (Former German Southwest Africa, South-West Africa)', 'NA', '+264', 1),
(148, 'Nauru (Former Pleasant Island)', 'NR', '+674', 1),
(149, 'Nepal ', 'NP', '+977', 1),
(150, 'Netherlands Antilles (Former Curacao and Dependencies)', 'AN', '+599', 1),
(151, 'New Caledonia ', 'NC', '+687', 1),
(152, 'New Zealand (Aotearoa) ', 'NZ', '+64', 1),
(153, 'Nicaragua ', 'NI', '+505', 1),
(154, 'Niger ', 'NE', '+227', 1),
(155, 'Nigeria ', 'NG', '+234', 1),
(156, 'Niue (Former Savage Island)', 'NU', '+683', 1),
(157, 'Norfolk Island ', 'NF', '+672', 1),
(158, 'Northern Mariana Islands (Former Mariana Islands District - Trust Territory of the Pacific Islands)', 'MP', '+1-670', 1),
(159, 'Norway ', 'NO', '+47', 1),
(160, 'Oman, Sultanate of (Former Muscat and Oman)', 'OM', '+968', 1),
(161, 'Pakistan (Former West Pakistan)', 'PK', '+92', 1),
(162, 'Palau (Former Palau District - Trust Terriroty of the Pacific Islands)', 'PW', '+680', 1),
(163, 'Palestinian State (Proposed)', 'PS', '+970', 1),
(164, 'Papua New Guinea (Former Territory of Papua and New Guinea)', 'PG', '+675', 1),
(165, 'Peru ', 'PE', '+51', 1),
(166, 'Philippines ', 'PH', '+63', 1),
(167, 'Pitcairn Island', 'PN', '', 1),
(168, 'Poland ', 'PL', '+48', 1),
(169, 'Portugal ', 'PT', '+351', 1),
(170, 'Puerto Rico ', 'PR', '+1-787 or +1-939', 1),
(171, 'Qatar, State of ', 'QA', '+974 ', 1),
(172, 'Reunion (French) (Former Bourbon Island)', 'RE', '+262', 1),
(173, 'Romania ', 'RO', '+40', 1),
(174, 'Russia - USSR (Former Russian Empire, Union of Soviet Socialist Republics, Russian Soviet Federative Socialist Republic) Now RU - Russian Federat', 'SU', '', 1),
(175, 'Russian Federation ', 'RU', '+7', 1),
(176, 'Rwanda (Rwandese Republic) (Former Ruanda)', 'RW', '+250', 1),
(177, 'Saint Helena ', 'SH', '+290', 1),
(178, 'Saint Kitts and Nevis (Former Federation of Saint Christopher and Nevis)', 'KN', '+1-869', 1),
(179, 'Saint Lucia ', 'LC', '+1-758', 1),
(180, 'Saint Pierre and Miquelon ', 'PM', '+508', 1),
(181, 'Saint Vincent and the Grenadines ', 'VC', '+1-784', 1),
(182, 'Samoa (Former Western Samoa)', 'WS', '+685', 1),
(183, 'San Marino ', 'SM', '+378', 1),
(184, 'Sao Tome and Principe ', 'ST', '+239', 1),
(185, 'Saudi Arabia ', 'SA', '+966', 1),
(186, 'Serbia, Republic of', 'RS', '', 1),
(187, 'Senegal ', 'SN', '+221', 1),
(188, 'Seychelles ', 'SC', '+248', 1),
(189, 'Sierra Leone ', 'SL', '+232', 1),
(190, 'Singapore ', 'SG', '+65', 1),
(191, 'Slovakia', 'SK', '+421', 1),
(192, 'Slovenia ', 'SI', '+386', 1),
(193, 'Solomon Islands (Former British Solomon Islands)', 'SB', '+677', 1),
(194, 'Somalia (Former Somali Republic, Somali Democratic Republic) ', 'SO', '+252', 1),
(195, 'South Africa (Former Union of South Africa)', 'ZA', '+27', 1),
(196, 'South Georgia and the South Sandwich Islands', 'GS', '', 1),
(197, 'Spain ', 'ES', '+34', 1),
(198, 'Sri Lanka (Former Serendib, Ceylon) ', 'LK', '+94', 1),
(199, 'Sudan (Former Anglo-Egyptian Sudan) ', 'SD', '+249', 1),
(200, 'Suriname (Former Netherlands Guiana, Dutch Guiana)', 'SR', '+597', 1),
(201, 'Svalbard (Spitzbergen) and Jan Mayen Islands ', 'SJ', '', 1),
(202, 'Swaziland, Kingdom of ', 'SZ', '+268', 1),
(203, 'Sweden ', 'SE', '+46', 1),
(204, 'Switzerland ', 'CH', '+41', 1),
(205, 'Syria (Syrian Arab Republic) (Former United Arab Republic - with Egypt)', 'SY', '+963', 1),
(206, 'Taiwan (Former Formosa)', 'TW', '+886', 1),
(207, 'Tajikistan (Former Tajik Soviet Socialist Republic)', 'TJ', '+992', 1),
(208, 'Tanzania, United Republic of (Former United Republic of Tanganyika and Zanzibar)', 'TZ', '+255', 1),
(209, 'Thailand (Former Siam)', 'TH', '+66', 1),
(210, 'Togo (Former French Togoland)', 'TG', '', 1),
(211, 'Tokelau ', 'TK', '+690', 1),
(212, 'Tonga, Kingdom of (Former Friendly Islands)', 'TO', '+676', 1),
(213, 'Trinidad and Tobago ', 'TT', '+1-868', 1),
(214, 'Tromelin Island ', 'TE', '', 1),
(215, 'Tunisia ', 'TN', '+216', 1),
(216, 'Turkey ', 'TR', '+90', 1),
(217, 'Turkmenistan (Former Turkmen Soviet Socialist Republic)', 'TM', '+993', 1),
(218, 'Turks and Caicos Islands ', 'TC', '+1-649', 1),
(219, 'Tuvalu (Former Ellice Islands)', 'TV', '+688', 1),
(220, 'Uganda, Republic of', 'UG', '+256', 1),
(221, 'Ukraine (Former Ukrainian National Republic, Ukrainian State, Ukrainian Soviet Socialist Republic)', 'UA', '+380', 1),
(222, 'United Arab Emirates (UAE) (Former Trucial Oman, Trucial States)', 'AE', '+971', 1),
(223, 'United Kingdom (Great Britain / UK)', 'GB', '+44', 1),
(224, 'United States ', 'US', '+1', 1),
(225, 'United States Minor Outlying Islands ', 'UM', '', 1),
(226, 'Uruguay, Oriental Republic of (Former Banda Oriental, Cisplatine Province)', 'UY', '+598', 1),
(227, 'Uzbekistan (Former UZbek Soviet Socialist Republic)', 'UZ', '+998', 1),
(228, 'Vanuatu (Former New Hebrides)', 'VU', '+678', 1),
(229, 'Vatican City State (Holy See)', 'VA', '+418', 1),
(230, 'Venezuela ', 'VE', '+58', 1),
(231, 'Vietnam ', 'VN', '+84', 1),
(232, 'Virgin Islands, British ', 'VI', '+1-284', 1),
(233, 'Virgin Islands, United States (Former Danish West Indies) ', 'VQ', '+1-340', 1),
(234, 'Wallis and Futuna Islands ', 'WF', '+681', 1),
(235, 'Western Sahara (Former Spanish Sahara)', 'EH', '', 1),
(236, 'Yemen ', 'YE', '+967', 1),
(237, 'Yugoslavia ', 'YU', '', 1),
(238, 'Zaire (Former Congo Free State, Belgian Congo, Congo/Leopoldville, Congo/Kinshasa, Zaire) Now CD - Congo, Democratic Republic of the ', 'ZR', '', 1),
(239, 'Zambia, Republic of (Former Northern Rhodesia) ', 'ZM', '+260', 1),
(240, 'Zimbabwe, Republic of (Former Southern Rhodesia, Rhodesia) ', 'ZW', '+263', 1);

INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('1', 'CULTIVO DE CEREALES (EXCEPTO ARROZ), LEGUMBRES Y SEMILLAS OLEAGINOSAS', '111');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('2', 'CULTIVO DE ARROZ', '112');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('3', 'CULTIVO DE HORTALIZAS Y MELONES, RAÍCES Y TUBÉRCULOS.', '113');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('4', 'CULTIVO DE CAÑA DE AZÚCAR', '114');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('5', 'CULTIVO DE TABACO', '115');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('6', 'CULTIVO DE PLANTAS DE FIBRA', '116');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('7', 'CULTIVO DE OTRAS PLANTAS NO PERENNES', '119');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('8', 'CULTIVO DE UVA', '121');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('9', 'CULTIVO DE FRUTAS TROPICALES Y SUBTROPICALES', '122');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('10', 'CULTIVO DE  CÍTRICOS', '123');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('11', 'CULTIVO DE FRUTAS DE PEPITA Y DE HUESO', '124');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('12', 'CULTIVO DE OTROS FRUTOS Y NUECES DE ÁRBOLES Y ARBUSTOS ', '125');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('13', 'CULTIVO DE FRUTOS OLEAGINOSOS', '126');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('14', 'CULTIVO DE PLANTAS CON LAS QUE SE PREPARAN BEBIDAS', '127');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('15', 'CULTIVO DE ESPECIAS Y DE PLANTAS AROMÁTICAS, MEDICINALES Y FARMACEUTICAS', '128');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('16', 'CULTIVO DE OTRAS PLANTAS NO PERENNES', '129');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('17', 'PROPAGACIÓN DE PLANTAS', '130');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('18', 'CRÍA DE GANADO BOVINO Y BÚFALOS', '141');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('19', 'CRÍA DE CABALLOS Y OTROS EQUINOS', '142');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('20', 'CRÍA DE CAMELLOS Y OTROS CAMÉLIDOS', '143');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('21', 'CRÍA DE OVEJAS Y CABRAS', '144');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('22', 'CRÍA DE CERDOS', '145');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('23', 'CRÍA DE AVES DE CORRAL', '146');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('24', 'CRÍA DE OTROS ANIMALES', '149');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('25', 'CULTIVO DE PRODUCTOS AGRÌCOLAS EN COMBINACIÒN CON LA CRÌA DE ANIMALES', '150');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('26', 'ACTIVIDADES DE APOYO A LA AGRICULTURA', '161');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('27', 'ACTIVIDADES DE APOYO A LA GANADERÍA', '162');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('28', 'ACTIVIDADES POSCOSECHA', '163');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('29', 'TRATAMIENTO DE SEMILLAS PARA PROPAGACIÓN', '164');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('30', 'CAZA ORDINARIA Y MEDIANTE TRAMPAS Y ACTIVIDADES DE SERVICIOS CONEXAS', '170');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('31', 'SILVICULTURA Y OTRAS ACTIVIDADES FORESTALES', '210');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('32', 'EXTRACCIÓN DE MADERA', '220');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('33', 'RECOLECCIÓN DE PRODUCTOS FORESTALES DISTINTOS DE LA MADERA', '230');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('34', 'SERVICIOS DE APOYO A LA SILVICULTURA', '240');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('35', 'PESCA MARÍTIMA', '311');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('36', 'PESCA DE AGUA DULCE', '312');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('37', 'ACUICULTURA MARÍTIMA', '321');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('38', 'ACUICULTURA DE AGUA DULCE', '322');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('39', 'EXTRACCIÓN DE CARBÓN DE PIEDRA', '510');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('40', 'EXTRACCIÓN DE LIGNITO', '520');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('41', 'EXTRACCIÓN DE PETRÓLEO CRUDO', '610');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('42', 'EXTRACCIÓN DE GAS NATURAL', '620');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('43', 'EXTRACCIÓN DE MINERALES DE HIERRO', '710');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('44', 'EXTRACCIÓN DE MINERALES DE URANIO Y TORIO', '721');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('45', 'EXTRACCIÓN DE OTROS MINERALES METALÍFEROS NO FERROSOS', '729');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('46', 'EXTRACCIÓN DE PIEDRA, ARENA Y ARCILLA', '810');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('47', 'EXTRACCIÓN DE MINERALES PARA LA FABRICACIÓN DE ABONOS Y PRODUCTOS QUÍMICOS', '891');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('48', 'EXTRACCIÓN DE TURBA', '892');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('49', 'EXTRACCIÓN DE SAL', '893');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('50', 'EXPLOTACIÓN DE OTRAS MINAS Y CANTERAS N.C.P.', '899');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('51', 'ACTIVIDADES DE APOYO PARA LA EXTRACCIÓN DE PETRÓLEO Y GAS NATURAL', '910');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('52', 'ACTIVIDADES DE APOYO PARA OTRAS ACTIVIDADES DE EXPLOTACIÓN DE MINAS Y CANTERAS', '990');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('53', 'ELABORACIÒN Y CONSERVACIÓN DE CARNE', '1010');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('54', 'ELABORACIÒN Y CONSERVACIÓN DE PESCADOS, CRUSTÁCEOS Y MOLUSCOS', '1020');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('55', 'ELABORACIÒN Y CONSERVACIÓN DE FRUTAS,LEGUMBRES Y HORTALIZAS', '1030');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('56', 'ELABORACIÓN DE ACEITES Y GRASAS DE ORIGEN VEGETAL Y ANIMAL', '1040');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('57', 'ELABORACIÓN DE PRODUCTOS LÁCTEOS', '1050');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('58', 'ELABORACIÓN DE PRODUCTOS DE MOLINERÍA.', '1061');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('59', 'ELABORACIÓN DE ALMIDONES Y PRODUCTOS DERIVADOS DEL ALMIDÓN.', '1062');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('60', 'ELABORACIÓN DE PRODUCTOS DE PANADERÍA', '1071');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('61', 'ELABORACIÓN DE AZÚCAR', '1072');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('62', 'ELABORACIÓN DE CACAO Y CHOCOLATE Y DE PRODUCTOS DE CONFITERÍA', '1073');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('63', 'ELABORACIÓN DE MACARRONES, FIDEOS, ALCUZCUS Y PRODUCTOS FARINÁCEOS SIMILARES', '1074');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('64', 'ELABORACIÓN DE COMIDAS Y PLATOS PREPARADOS', '1075');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('65', 'ELABORACIÓN DE OTROS PRODUCTOS ALIMENTICIOS N.C.P.', '1079');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('66', 'ELABORACIÓN DE PIENSOS PREPARADOS PARA ANIMALES', '1080');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('67', 'DESTILACIÓN, RECTIFICACIÓN Y MEZCLA DE BEBIDAS ALCOHÓLICAS', '1101');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('68', 'ELABORACIÓN DE VINOS', '1102');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('69', 'ELABORACIÓN DE BEBIDAS MALTEADAS Y DE MALTA', '1103');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('70', 'ELABORACIÓN DE BEBIDAS NO ALCOHÓLICAS; PRODUCCIÓN DE AGUAS MINERALES Y OTRAS AGUAS EMBOTELLADAS', '1104');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('71', 'ELABORACIÓN DE PRODUCTOS DE TABACO', '1200');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('72', 'PREPARACIÓN E HILATURA DE FIBRAS TEXTILES', '1311');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('73', 'TEJEDURA DE PRODUCTOS TEXTILES', '1312');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('74', 'ACABADO DE PRODUCTOS TEXTILES', '1313');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('75', 'FABRICACIÓN DE TEJIDOS DE PUNTO Y GANCHILLO', '1391');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('76', 'FABRICACIÓN DE ARTÍCULOS CONFECCIONADOS DE MATERIALES TEXTILES, EXCEPTO PRENDAS DE VESTIR', '1392');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('77', 'FABRICACIÓN DE TAPICES Y ALFOMBRAS', '1393');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('78', 'FABRICACIÓN DE CUERDAS, CORDELES, BRAMANTES Y REDES', '1394');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('79', 'FABRICACIÓN DE OTROS PRODUCTOS TEXTILES N.C.P.', '1399');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('80', 'FABRICACIÓN DE PRENDAS DE VESTIR, EXCEPTO PRENDAS DE PIEL', '1410');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('81', 'FABRICACIÓN DE ARTÍCULOS DE PIEL', '1420');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('82', 'FABRICACIÓN DE ARTICULOS DE PUNTO Y GANCHILLO', '1430');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('83', 'CURTIDO Y ADOBO DE CUEROS; ADOBO Y TEÑIDO DE PIELES', '1511');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('84', 'FABRICACIÓN DE MALETAS, BOLSOS DE MANO, Y ARTÍCULOS SIMILARES,Y DE ARTICULOS DE TALABARTERÍA Y GUARNICIONERÍA', '1512');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('85', 'FABRICACIÓN DE CALZADO', '1520');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('86', 'ASERRADOS Y ACEPILLADURA DE MADERA', '1610');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('87', 'FABRICACIÓN DE HOJAS DE MADERA PARA ENCHAPADO Y TABLEROS A BASE DE MADERA', '1621');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('88', 'FABRICACIÓN DE PARTES Y PIEZAS DE CARPINTERÍA PARA EDIFICIOS Y CONSTRUCCIONES', '1622');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('89', 'FABRICACIÓN DE RECIPIENTES DE MADERA', '1623');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('90', 'FABRICACIÓN DE OTROS PRODUCTOS DE MADERA; FABRICACIÓN DE ARTÍCULOS DE CORCHO, PAJA Y MATERIALES TRENZABLES.', '1629');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('91', 'FABRICACIÓN DE PASTA DE MADERA, PAPEL Y CARTÓN', '1701');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('92', 'FABRICACIÓN DEL PAPEL Y CARTÓN ONDULADO Y DE ENVASES DE PAPEL Y CARTÓN', '1702');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('93', 'FABRICACIÓN DE OTROS ARTÍCULOS DEL PAPEL Y CARTÓN', '1709');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('94', 'IMPRESIÓN', '1811');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('95', 'ACTIVIDADES DE SERVICIOS RELACIONADAS CON LA IMPRESIÓN', '1812');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('96', 'REPRODUCCIÓN DE GRABACIONES', '1820');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('97', 'FABRICACIÓN DE PRODUCTOS DE HORNOS DE COQUE', '1910');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('98', 'FABRICACIÓN DE PRODUCTOS DE LA REFINACIÓN DEL PETRÓLEO', '1920');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('99', 'FABRICACIÓN DE SUSTANCIAS QUÍMICAS BÁSICAS', '2011');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('100', 'FABRICACIÓN ABONOS Y COMPUESTOS DE NITRÓGENO', '2012');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('101', 'FABRICACIÓN DE PLÁSTICOS Y DE CAUCHO SINTÉTICO EN FORMAS PRIMARIAS', '2013');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('102', 'FABRICACIÓN DE PLAGUICIDAS Y OTROS PRODUCTOS QUÍMICOS DE USO AGROPECUARIO', '2021');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('103', 'FABRICACIÓN DE PINTURAS, BARNICES Y PRODUCTOS DE REVESTIMIENTO SIMILARES, TINTAS DE IMPRENTA Y MASILLAS', '2022');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('104', 'FABRICACIÓN DE JABONES Y DETERGENTES, PREPARADOS PARA LIMPIAR Y PULIR, PERFUMES Y PREPARADOS DE TOCADOR.', '2023');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('105', 'FABRICACIÓN DE OTROS PRODUCTOS QUÍMICOS N.C.P.', '2029');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('106', 'FABRICACIÓN DE FIBRAS ARTIFICIALES', '2030');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('107', 'FABRICACIÓN DE PRODUCTOS FARMACÉUTICOS, SUSTANCIAS QUÍMICAS MEDICINALES Y PRODUCTOS BOTÁNICOS DE USO FARMACÉUTICO', '2100');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('108', 'FABRICACIÓN DE CUBIERTAS Y CÁMARAS DE CAUCHO; RECAUCHUTADO Y RENOVACIÓN DE CUBIERTAS DE CAUCHO', '2211');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('109', 'FABRICACIÓN DE OTROS PRODUCTOS DE CAUCHO', '2219');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('110', 'FABRICACIÓN DE PRODUCTOS DE PLÁSTICO', '2220');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('111', 'FABRICACIÓN DE VIDRIO Y DE PRODUCTOS DE VIDRIO', '2310');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('112', 'FABRICACIÓN DE PRODUCTOS REFRACTARIOS', '2391');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('113', 'FABRICACIÓN DE MATERIALES DE CONSTRUCCIÓN DE ARCILLA', '2392');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('114', 'FABRICACIÓN DE OTROS PRODUCTOS DE PORCELANA Y DE CERÁMICA', '2393');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('115', 'FABRICACIÓN DE CEMENTO, CAL Y YESO', '2394');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('116', 'FABRICACIÓN DE ARTÍCULOS DE HORMIGÓN, DE CEMENTO Y DE YESO', '2395');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('117', 'CORTE, TALLA Y ACABADO DE LA PIEDRA', '2396');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('118', 'FABRICACIÓN DE OTROS PRODUCTOS MINERALES NO METÁLICOS N.C.P.', '2399');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('119', 'INDUSTRIAS BÁSICAS DE HIERRO Y ACERO ', '2410');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('120', 'FABRICACIÓN DE PRODUCTOS PRIMARIOS DE METALES PRECIOSOS Y OTROS METALES NO FERROSOS', '2420');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('121', 'FUNDICIÓN DE HIERRO Y ACERO', '2431');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('122', 'FUNDICIÓN DE METALES NO FERROSOS', '2432');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('123', 'FABRICACIÓN DE PRODUCTOS METÁLICOS PARA USO ESTRUCTURAL', '2511');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('124', 'FABRICACIÓN DE TANQUES, DEPÓSITOS Y RECIPIENTES DE METAL', '2512');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('125', 'FABRICACIÓN DE LOS GENERADORES DEL VAPOR, EXCEPTO CALDERAS DE AGUA CALIENTE PARA CALEFACCIÓN CENTRAL', '2513');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('126', 'FABRICACIÓN DE ARMAS Y MUNICIONES', '2520');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('127', 'FORJA, PRENSADO, ESTAMPADO Y LAMINADO DE METALES; PULVIMETALURGIA', '2591');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('128', 'TRATAMIENTO Y REVESTIMIENTO DE METALES; MAQUINADO', '2592');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('129', 'FABRICACIÓN DE ARTÍCULOS DE CUCHILLERÍA, HERRAMIENTAS DE MANO Y ARTÍCULOS DE FERRETERÍA', '2593');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('130', 'FABRICACIÓN DE OTROS PRODUCTOS ELABORADOS DE METAL N.C.P.', '2599');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('131', 'FABRICACIÓN DE COMPONENTES Y TABLEROS ELECTRÓNICOS', '2610');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('132', 'FABRICACIÓN DE ORDENADORES Y EQUIPO PERIFÉRICO', '2620');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('133', 'FABRICACIÓN DE EQUIPOS DE COMUNICACIONES', '2630');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('134', 'FABRICACIÓN DE APARATOS ELECTRÓNICOS DE CONSUMO', '2640');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('135', 'FABRICACIÓN DE EQUIPO DE MEDICIÓN, PRUEBA, NAVEGACIÓN Y CONTROL', '2651');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('136', 'FABRICACIÓN DE RELOJES', '2652');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('137', 'FABRICACIÓN DE EQUIPO DE IRRADIACIÓN Y EQUIPO ELECTRÓNICO DE USO MÉDICO Y TERAPÉUTICO', '2660');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('138', 'FABRICACIÓN DE INSTRUMENTOS ÓPTICOS Y EQUIPO FOTOGRÁFICO', '2670');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('139', 'FABRICACIÓN DE SOPORTES MAGNÉTICOS Y ÓPTICOS', '2680');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('140', 'FABRICACIÓN DE MOTORES, GENERADORES Y TRANSFORMADORES ELÉCTRICOS Y APARATOS DE DISTRIBUCIÓN Y CONTROL DE LA ENERGÍA ELÉCTRICA', '2710');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('141', 'FABRICACIÓN DE PILAS, BATERÍAS Y ACUMULADORES', '2720');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('142', 'FABRICACIÓN DE CABLES DE FIBRA ÓPTICA', '2731');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('143', 'FABRICACIÓN DE OTROS HILOS Y CABLES ELÉCTRICOS', '2732');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('144', 'FABRICACIÓN DE DISPOSITIVOS DE CABLEADO', '2733');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('145', 'FABRICACIÓN DE EQUIPO ELÉCTRICO DE ILUMINACIÓN', '2740');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('146', 'FABRICACIÓN DE APARATOS DE USO DOMÉSTICO', '2750');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('147', 'FABRICACIÓN DE OTROS TIPOS DE EQUIPO ELÉCTRICO', '2790');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('148', 'FABRICACIÓN DE MOTORES Y TURBINAS, EXCEPTO MOTORES PARA AERONAVES, VEHÍCULOS AUTOMOTORES Y MOTOCICLETAS', '2811');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('149', 'FABRICACIÓN DE EQUIPO DE PROPULSIÓN DE FLUIDOS', '2812');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('150', 'FABRICACIÓN DE BOMBAS, COMPRESORES, GRIFOS Y VÁLVULAS', '2813');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('151', 'FABRICACIÓN DE COJINETES, ENGRANAJES, TRENES DE ENGRANAJES Y PIEZAS DE TRANSMISIÓN', '2814');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('152', 'FABRICACIÓN DE HORNOS, HOGARES Y QUEMADORES', '2815');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('153', 'FABRICACIÓN DE EQUIPO DE ELEVACIÓN Y MANIPULACIÓN', '2816');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('154', 'FABRICACIÓN DE MAQUINARIA Y EQUIPO DE OFICINA (EXCEPTO ORDENADORES Y EQUIPO PERIFÉRICO)', '2817');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('155', 'FABRICACIÓN DE HERRAMIENTAS DE MANO MOTORIZADAS', '2818');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('156', 'FABRICACIÓN DE OTROS TIPOS DE MAQUINARIA DE USO GENERAL', '2819');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('157', 'FABRICACIÓN DE MAQUINARIA AGROPECUARIA Y FORESTAL', '2821');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('158', 'FABRICACIÓN DE MAQUINARIA PARA LA CONFORMACIÓN DE METALES Y DE MÁQUINAS HERRAMIENTA', '2822');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('159', 'FABRICACIÓN DE MAQUINARIA METALÚRGICA', '2823');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('160', 'FABRICACIÓN DE MAQUINARIA PARA EXPLOTACIÓN DE MINAS Y CANTERAS Y PARA OBRAS DE CONSTRUCCIÓN', '2824');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('161', 'FABRICACIÓN DE MAQUINARIA PARA LA ELABORACIÓN DE ALIMENTOS, BEBIDAS Y TABACO', '2825');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('162', 'FABRICACIÓN DE MAQUINARIA PARA LA ELABORACIÓN DE PRODUCTOS TEXTILES, PRENDAS DE VESTIR Y CUEROS', '2826');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('163', 'FABRICACIÓN DE OTROS TIPOS DE MAQUINARIA DE USO ESPECIAL', '2829');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('164', 'FABRICACIÓN DE VEHÍCULOS AUTOMOTORES', '2910');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('165', 'FABRICACIÓN DE CARROCERÍAS PARA VEHÍCULOS AUTOMOTORES; FABRICACIÓN DE REMOLQUES Y SEMIRREMOLQUES', '2920');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('166', 'FABRICACIÓN DE PARTES, PIEZAS Y ACCESORIOS PARA VEHÍCULOS DE AUTOMOTORES', '2930');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('167', 'CONSTRUCCIÓN DE BUQUES Y ESTRUCTURAS FLOTANTES', '3011');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('168', 'CONSTRUCCIÓN DE EMBARCACIONES DE RECREO Y DEPORTE', '3012');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('169', 'FABRICACIÓN DE LOCOMOTORAS Y DE MATERIAL RODANTE', '3020');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('170', 'FABRICACIÓN DE AERONAVES Y  NAVES ESPACIALES Y MAQUINARIA CONEXA', '3030');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('171', 'FABRICACIÓN DE VEHÍCULOS MILITARES DE COMBATE', '3040');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('172', 'FABRICACIÓN DE MOTOCICLETAS', '3091');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('173', 'FABRICACIÓN DE BICICLETAS Y DE SILLONES DE RUEDAS PARA INVÁLIDOS', '3092');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('174', 'FABRICACIÓN DE OTROS TIPOS DE EQUIPO DE TRANSPORTE N.C.P.', '3099');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('175', 'FABRICACIÓN DE MUEBLES', '3100');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('176', 'FABRICACIÓN DE JOYAS Y ARTÍCULOS CONEXOS', '3211');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('177', 'FABRICACIÓN DE BISUTERÍA Y ARTÍCULOS CONEXOS', '3212');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('178', 'FABRICACIÓN DE INSTRUMENTOS DE MÚSICA', '3220');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('179', 'FABRICACIÓN DE ARTÍCULOS DE DEPORTE', '3230');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('180', 'FABRICACIÓN DE JUEGOS Y JUGUETES', '3240');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('181', 'FABRICACIÓN DE INSTRUMENTOS Y MATERIALES MÉDICOS Y ODONTOLÓGICOS', '3250');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('182', 'OTRAS INDUSTRIAS MANUFACTURERAS N.C.P.', '3290');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('183', 'REPARACIÓN DE PRODUCTOS ELABORADOS DE METAL', '3311');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('184', 'REPARACIÓN DE MAQUINARIA', '3312');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('185', 'REPARACIÓN DE EQUIPO ELECTRÓNICO Y ÓPTICO', '3313');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('186', 'REPARACIÓN DE EQUIPO ELÉCTRICO', '3314');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('187', 'REPARACIÓN DE EQUIPO DE TRANSPORTE, EXCEPTO VEHÍCULOS AUTOMOTORES', '3315');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('188', 'REPARACIÓN DE OTROS TIPOS DE EQUIPO', '3319');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('189', 'INSTALACIÓN DE MAQUINARIA Y EQUIPO INDUSTRIALES', '3320');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('190', 'GENERACIÓN, TRANSMISIÓN Y DISTRIBUCIÓN DE ENERGÍA ELÉCTRICA', '3510');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('191', 'FABRICACIÓN DEL GAS; DISTRIBUCIÓN DE COMBUSTIBLES GASEOSOS POR TUBERÍAS', '3520');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('192', 'SUMINISTRO DE VAPOR Y AIRE ACONDICIONADO', '3530');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('193', 'CAPTACIÓN, TRATAMIENTO Y DISTRIBUCIÓN DE AGUA', '3600');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('194', 'EVACUACIÓN DE AGUAS RESIDUALES', '3700');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('195', 'RECOGIDA DE DESECHOS NO PELIGROSOS', '3811');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('196', 'RECOGIDA DE DESECHOS PELIGROSOS', '3812');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('197', 'TRATAMIENTO Y ELIMINACIÓN DE DESECHOS NO PELIGROSOS', '3821');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('198', 'TRATAMIENTO Y ELIMINACIÓN DE DESECHOS PELIGROSOS', '3822');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('199', 'RECUPERACIÓN DE MATERIALES', '3830');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('200', 'ACTIVIDADES DE DESCONTAMINACIÓN Y OTROS SERVICIOS DE GESTIÓN DE DESECHOS', '3900');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('201', 'CONSTRUCCIÓN DE EDIFICIOS', '4100');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('202', 'CONSTRUCCIÓN DE CARRETERAS Y LÍNEAS DE FERROCARRIL', '4210');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('203', 'CONSTRUCCIÓN DE PROYECTOS DE SERVICIO PÚBLICO', '4220');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('204', 'CONSTRUCCIÓN DE OTRAS OBRAS DE INGENIERÍA CIVIL', '4290');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('205', 'DEMOLICIÓN', '4311');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('206', 'PREPARACIÓN DEL TERRENO', '4312');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('207', 'INSTALACIONES ELÉCTRICAS', '4321');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('208', 'INSTALACIONES DE FONTANERÍA, CALEFACCIÓN Y AIRE ACONDICIONADO', '4322');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('209', 'OTRAS INSTALACIONES PARA OBRAS DE CONSTRUCCIÓN', '4329');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('210', 'TERMINACIÓN Y ACABADO DE EDIFICIOS', '4330');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('211', 'OTRAS ACTIVIDADES ESPECIALIZADAS DE LA CONSTRUCCIÓN', '4390');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('212', 'VENTA DE VEHÍCULOS AUTOMOTORES', '4510');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('213', 'MANTENIMIENTO Y REPARACIÓN DE VEHÍCULOS AUTOMOTORES', '4520');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('214', 'VENTAS DE PARTES, PIEZAS Y ACCESORIOS PARA VEHÍCULOS AUTOMOTORES', '4530');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('215', 'VENTA, MANTENIMIENTO Y REPARACIÓN DE MOTOCICLETAS Y DE SUS PARTES, PIEZAS Y ACCESORIOS.', '4540');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('216', 'VENTA AL POR MAYOR A CAMBIO DE UNA RETRIBUCIÓN O POR CONTRATA', '4610');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('217', 'VENTA AL POR MAYOR DE MATERIAS PRIMAS AGROPECUARIAS Y ANIMALES VIVOS.', '4620');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('218', 'VENTA AL POR MAYOR DE ALIMENTOS, BEBIDAS Y TABACO.', '4630');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('219', 'VENTA AL POR MAYOR DE PRODUCTOS TEXTILES, PRENDAS DE VESTIR Y CALZADO', '4641');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('220', 'VENTA AL POR MAYOR DE OTROS ENSERES DOMÉSTICOS', '4649');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('221', 'VENTA AL POR MAYOR DE ORDENADORES, EQUIPO PERIFÉRICO Y PROGRAMAS DE INFORMÁTICA', '4651');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('222', 'VENTA AL POR MAYOR DE EQUIPO, PARTES Y PIEZAS ELECTRÓNICOS Y DE TELECOMUNICACIONES', '4652');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('223', 'VENTA AL POR MAYOR DE MAQUINARIA, EQUIPO Y MATERIALES AGROPECUARIOS ', '4653');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('224', 'VENTA AL POR MAYOR DE OTROS TIPOS DE MAQUINARIA Y EQUIPO', '4659');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('225', 'VENTA AL POR MAYOR DE COMBUSTIBLES SÓLIDOS, LÍQUIDOS Y GASEOSOS Y  PRODUCTOS CONEXOS', '4661');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('226', 'VENTA AL POR MAYOR DE METALES Y MINERALES METALÍFEROS', '4662');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('227', 'VENTA AL POR MAYOR DE MATERIALES DE CONSTRUCCIÓN, ARTÍCULOS DE FERRETERÍA Y EQUIPO Y MATERIALES DE FONTANERÍA Y CALEFACCIÓN.', '4663');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('228', 'VENTA AL POR MAYOR DE DESPERDICIOS, DESECHOS, CHATARRA Y OTROS PRODUCTOS N.C.P ', '4669');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('229', 'VENTA AL POR MAYOR NO ESPECIALIZADA ', '4690');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('230', 'VENTA AL POR MENOR EN COMERCIOS NO ESPECIALIZADOS CON PREDOMINIO DE LA VENTA DE ALIMENTOS, BEBIDAS O TABACO', '4711');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('231', 'OTRAS ACTIVIDADES DE VENTA AL POR MENOR EN COMERCIOS NO ESPECIALIZADOS', '4719');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('232', 'VENTA AL POR MENOR DE ALIMENTOS EN COMERCIOS ESPECIALIZADOS', '4721');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('233', 'VENTA AL POR MENOR DE BEBIDAS EN COMERCIOS ESPECIALIZADOS', '4722');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('234', 'VENTA AL POR MENOR DE PRODUCTOS DE TABACO EN COMERCIOS ESPECIALIZADOS', '4723');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('235', 'VENTA AL POR MENOR DE COMBUSTIBLES PARA VEHÍCULOS AUTOMOTORES EN COMERCIOS ESPECIALIZADOS', '4730');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('236', 'VENTA AL POR MENOR DE ORDENADORES, EQUIPO PERIFÉRICO, PROGRAMAS INFORMÁTICOS Y EQUIPO DE TELECOMUNICACIONES EN COMERCIOS ESPECIALIZADOS', '4741');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('237', 'VENTA AL POR MENOR DE EQUIPO DE SONIDO Y DE VÍDEO EN COMERCIOS ESPECIALIZADOS', '4742');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('238', 'VENTA AL POR MENOR DE PRODUCTOS TEXTILES EN COMERCIOS ESPECIALIZADOS', '4751');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('239', 'VENTA AL POR MENOR DE ARTÍCULOS DE FERRETERÍA, PINTURAS Y PRODUCTOS DE VIDRIO EN COMERCIOS ESPECIALIZADOS', '4752');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('240', 'VENTA AL POR MENOR DE TAPICES, ALFOMBRAS Y CUBRIMIENTOS PARA PAREDES Y PISOS EN COMERCIOS ESPECIALIZADOS', '4753');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('241', 'VENTA AL POR MENOR DE APARATOS ELÉCTRICOS DE USO DOMÉSTICO,  MUEBLES, EQUIPO DE ILUMINACIÓN Y OTROS ENSERES DOMÉSTICOS EN COMERCIOS ESPECIALIZADOS', '4759');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('242', 'VENTA AL POR MENOR DE LIBROS, PERIÓDICOS Y ARTÍCULOS DE PAPELERÍA EN COMERCIOS ESPECIALIZADOS', '4761');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('243', 'VENTA AL POR MENOR DE GRABACIONES DE MÚSICA Y DE VÍDEO EN COMERCIOS ESPECIALIZADOS', '4762');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('244', 'VENTA AL POR MENOR DE EQUIPO DE DEPORTE EN COMERCIOS ESPECIALIZADOS', '4763');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('245', 'VENTA AL POR MENOR DE JUEGOS Y  JUGUETES EN COMERCIOS ESPECIALIZADOS', '4764');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('246', 'VENTA AL POR MENOR DE PRENDAS DE VESTIR, CALZADO Y ARTÍCULOS DE CUERO EN COMERCIOS ESPECIALIZADOS', '4771');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('247', 'VENTA AL POR MENOR DE PRODUCTOS FARMACÉUTICOS Y MEDICINALES, COSMÉTICOS Y ARTÍCULOS DE TOCADOR EN COMERCIOS ESPECIALIZADOS   ', '4772');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('248', 'VENTA AL POR MENOR DE OTROS PRODUCTOS NUEVOS EN COMERCIOS ESPECIALIZADOS', '4773');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('249', 'VENTA AL POR MENOR DE ARTÍCULOS DE SEGUNDA MANO', '4774');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('250', 'VENTA AL POR MENOR DE ALIMENTOS, BEBIDAS Y TABACO EN PUESTOS DE VENTA Y MERCADOS ', '4781');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('251', 'VENTA AL POR MENOR DE PRODUCTOS TEXTILES, PRENDAS DE VESTIR Y CALZADO EN PUESTOS DE VENTA Y MERCADOS', '4782');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('252', 'VENTA AL POR MENOR DE OTROS PRODUCTOS EN PUESTOS DE VENTA Y MERCADOS', '4789');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('253', 'VENTA AL POR MENOR POR CORREO Y POR INTERNET', '4791');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('254', 'OTRAS ACTIVIDADES DE VENTA AL POR MENOR NO REALIZADAS EN COMERCIOS, PUESTOS DE VENTA O MERCADOS', '4799');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('255', 'TRANSPORTE INTERURBANO DE PASAJEROS POR FERROCARRIL', '4911');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('256', 'TRANSPORTE DE CARGA POR FERROCARRIL', '4912');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('257', 'TRANSPORTE URBANO Y SUBURBANO DE PASAJEROS POR VÍA TERRESTRE ', '4921');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('258', 'OTRAS ACTIVIDADES DE TRANSPORTE POR VÍA TERRESTRE', '4922');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('259', 'TRANSPORTE DE CARGA POR CARRETERA', '4923');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('260', 'TRANSPORTE POR TUBERÍAS', '4930');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('261', 'TRANSPORTE DE PASAJEROS MARÍTIMO Y DE CABOTAJE', '5011');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('262', 'TRANSPORTE DE CARGA MARÍTIMO Y DE CABOTAJE', '5012');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('263', 'TRANSPORTE DE PASAJEROS POR VÍAS DE NAVEGACIÓN INTERIORES', '5021');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('264', 'TRANSPORTE DE CARGA, POR VÍAS DE NAVEGACIÓN INTERIORES', '5022');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('265', 'TRANSPORTE DE PASAJEROS POR VÍA AÉREA', '5110');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('266', 'TRANSPORTE DE CARGA POR VÍA AÉREA', '5120');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('267', 'ALMACENAMIENTO Y DEPÓSITO', '5210');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('268', 'ACTIVIDADES DE SERVICIOS VINCULADAS AL TRANSPORTE TERRESTRE', '5221');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('269', 'ACTIVIDADES DE SERVICIOS VINCULADAS AL TRANSPORTE ACUÁTICO', '5222');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('270', 'ACTIVIDADES DE SERVICIOS VINCULADAS AL TRANSPORTE AÉREO', '5223');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('271', 'MANIPULACIÓN DE CARGA', '5224');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('272', 'OTRAS ACTIVIDADES DE APOYO AL TRANSPORTE', '5229');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('273', 'ACTIVIDADES POSTALES', '5310');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('274', 'ACTIVIDADES DE MENSAJERÍA', '5320');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('275', 'ACTIVIDADES DE ALOJAMIENTO PARA ESTANCIAS CORTAS', '5510');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('276', 'ACTIVIDADES DE CAMPAMENTOS, PARQUES DE VEHÍCULOS RECREATIVOS Y PARQUES DE CARAVANAS', '5520');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('277', 'OTRAS ACTIVIDADES DE ALOJAMIENTO', '5590');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('278', 'ACTIVIDADES DE RESTAURANTES Y DE SERVICIO MÓVIL DE COMIDAS', '5610');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('279', 'SUMINISTRO DE COMIDAS POR ENCARGO', '5621');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('280', 'OTRAS ACTIVIDADES DE SERVICIO DE COMIDAS', '5629');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('281', 'ACTIVIDADES DE SERVICIO DE BEBIDAS', '5630');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('282', 'EDICIÓN DE LIBROS', '5811');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('283', 'EDICIÓN DE DIRECTORIOS Y LISTAS DE CORREO', '5812');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('284', 'EDICIÓN DE PERIÓDICOS, REVISTAS Y OTRAS PUBLICACIONES PERIÓDICAS', '5813');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('285', 'OTRAS ACTIVIDADES DE EDICIÓN', '5819');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('286', 'EDICIÓN DE PROGRAMAS DE INFORMÁTICOS', '5820');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('287', 'ACTIVIDADES DE PRODUCCIÓN DE PELÍCULAS CINEMATOGRÁFICAS, VÍDEOS Y PROGRAMAS DE TELEVISIÓN', '5911');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('288', 'ACTIVIDADES DE POSTPRODUCCIÓN DE PELÍCULAS CINEMATOGRÁFICAS, VÍDEOS Y PROGRAMAS DE TELEVISIÓN', '5912');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('289', 'ACTIVIDADES DE DISTRIBUCIÓN DE PELÍCULAS CINEMATOGRÁFICAS, VÍDEOS Y PROGRAMAS DE TELEVISIÓN', '5913');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('290', 'ACTIVIDADES DE EXHIBICIÓN DE PELÍCULAS CINEMATOGRÁFICAS Y CINTAS DE VÍDEO ', '5914');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('291', 'ACTIVIDADES DE GRABACIÓN DE SONIDO Y EDICIÓN DE MÚSICA', '5920');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('292', 'TRANSMISIONES DE RADIO', '6010');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('293', 'PROGRAMACIÓN Y TRANSMISIONES DE TELEVISIÓN', '6020');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('294', 'ACTIVIDADES DE TELECOMUNICACIONES ALÁMBRICAS', '6110');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('295', 'ACTIVIDADES DE TELECOMUNICACIONES INALÁMBRICAS', '6120');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('296', 'ACTIVIDADES DE TELECOMUNICACIONES POR SATÉLITE.', '6130');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('297', 'OTRAS ACTIVIDADES DE TELECOMUNICACIÓN.', '6190');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('298', 'PROGRAMACIÓN INFORMÁTICA', '6201');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('299', 'CONSULTORÍA DE INFORMÁTICA Y DE GESTIÓN DE INSTALACIONES INFORMÁTICAS', '6202');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('300', 'OTRAS ACTIVIDADES DE TECNOLOGÍA DE LA INFORMACIÓN Y DE SERVICIOS INFORMÁTICOS', '6209');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('301', 'PROCESAMIENTO DE DATOS, HOSPEDAJE Y ACTIVIDADES CONEXAS', '6311');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('302', 'PORTALES WEB', '6312');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('303', 'ACTIVIDADES DE AGENCIAS DE NOTICIAS', '6391');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('304', 'OTRAS ACTIVIDADES DE SERVICIOS DE INFORMACIÓN N.C.P.', '6399');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('305', 'BANCA CENTRAL', '6411');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('306', 'OTROS TIPOS DE INTERMEDIACIÓN MONETARIA.', '6419');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('307', 'ACTIVIDADES DE SOCIEDADES DE CARTERA', '6420');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('308', 'FONDOS Y SOCIEDADES DE INVERSIÓN Y ENTIDADES FINANCIERAS SIMILARES', '6430');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('309', 'ARRENDAMIENTO FINANCIERO', '6491');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('310', 'OTRAS ACTIVIDADES DE CONCESIÓN DE CRÉDITO', '6492');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('311', 'OTRAS ACTIVIDADES DE SERVICIOS FINANCIEROS, EXCEPTO LAS DE SEGUROS Y FONDOS DE PENSIONES, N.C.P.', '6499');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('312', 'SEGUROS DE VIDA', '6511');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('313', 'SEGUROS GENERALES', '6512');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('314', 'REASEGUROS', '6520');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('315', 'FONDOS DE PENSIONES', '6530');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('316', 'ADMINISTRACIÓN DE MERCADOS FINANCIEROS', '6611');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('317', 'CORRETAJE DE VALORES Y DE CONTRATOS DE PRODUCTOS BÁSICOS', '6612');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('318', 'OTRAS ACTIVIDADES AUXILIARES DE LAS ACTIVIDADES DE SERVICIOS FINANCIEROS', '6619');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('319', 'EVALUACIÓN DE RIESGOS Y DAÑOS', '6621');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('320', 'ACTIVIDADES DE AGENTES Y CORREDORES DE SEGUROS', '6622');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('321', 'OTRAS ACTIVIDADES AUXILIARES DE LAS ACTIVIDADES DE SEGUROS Y FONDOS DE PENSIONES', '6629');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('322', 'ACTIVIDADES DE GESTIÓN DE FONDOS', '6630');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('323', 'ACTIVIDADES INMOBILIARIAS REALIZADAS CON BIENES PROPIOS O ARRENDADOS', '6810');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('324', 'ACTIVIDADES INMOBILIARIAS REALIZADAS A CAMBIO DE UNA RETRIBUCIÓN O POR CONTRATA', '6820');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('325', 'ACTIVIDADES JURÍDICAS', '6910');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('326', 'ACTIVIDADES DE CONTABILIDAD, TENEDURÍA DE LIBROS Y AUDITORÍA; CONSULTORÍA FISCAL', '6920');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('327', 'ACTIVIDADES DE OFICINAS CENTRALES', '7010');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('328', 'ACTIVIDADES DE CONSULTORÍA DE GESTIÓN', '7020');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('329', 'ACTIVIDADES DE ARQUITECTURA E INGENIERÍA Y ACTIVIDADES CONEXAS DE CONSULTORÍA TÉCNICA', '7110');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('330', 'ENSAYOS Y ANÁLISIS TÉCNICOS', '7120');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('331', 'INVESTIGACIÓN Y DESARROLLO EXPERIMENTAL EN EL CAMPO DE LAS CIENCIAS NATURALES Y LA INGENIERÍA', '7210');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('332', 'INVESTIGACIÓN Y DESARROLLO EXPERIMENTAL EN EL CAMPO DE LAS CIENCIAS SOCIALES Y LAS HUMANIDADES', '7220');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('333', 'PUBLICIDAD', '7310');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('334', 'ESTUDIOS DE MERCADO Y ENCUESTAS DE OPINIÓN PÚBLICA', '7320');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('335', 'ACTIVIDADES ESPECIALIZADAS DE DISEÑO', '7410');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('336', 'ACTIVIDADES DE FOTOGRAFÍA', '7420');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('337', 'OTRAS ACTIVIDADES PROFESIONALES, CIENTÍFICAS Y TÉCNICAS N.C.P.', '7490');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('338', 'ACTIVIDADES VETERINARIAS', '7500');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('339', 'ALQUILER Y ARRENDAMIENTO DE VEHÍCULOS AUTOMOTORES', '7710');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('340', 'ALQUILER Y ARRENDAMIENTO DE EQUIPO RECREATIVO Y DEPORTIVO', '7721');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('341', 'ALQUILER DE CINTAS DE VÍDEO Y DISCOS', '7722');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('342', 'ALQUILER Y ARRENDAMIENTO DE OTROS EFECTOS PERSONALES Y ENSERES DOMÉSTICOS ', '7729');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('343', 'ALQUILER Y ARRENDAMIENTO DE OTROS TIPOS DE MAQUINARIA, EQUIPO Y BIENES TANGIBLES', '7730');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('344', 'ARRENDAMIENTO DE PROPIEDAD INTELECTUAL Y PRODUCTOS SIMILARES, EXCEPTO OBRAS PROTEGIDAS  POR DERECHOS DE AUTOR', '7740');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('345', 'ACTIVIDADES DE AGENCIAS DE EMPLEO', '7810');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('346', 'ACTIVIDADES DE AGENCIAS DE EMPLEO TEMPORAL', '7820');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('347', 'OTRAS ACTIVIDADES DE DOTACIÓN DE RECURSOS HUMANOS', '7830');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('348', 'ACTIVIDADES DE AGENCIAS DE VIAJES', '7911');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('349', 'ACTIVIDADES DE OPERADORES TURÍSTICOS', '7912');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('350', 'OTROS SERVICIOS DE RESERVAS Y ACTIVIDADES CONEXAS', '7990');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('351', 'ACTIVIDADES DE SEGURIDAD PRIVADA', '8010');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('352', 'ACTIVIDADES DE SERVICIO DE SISTEMAS DE SEGURIDAD', '8020');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('353', 'ACTIVIDADES DE INVESTIGACIÓN', '8030');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('354', 'ACTIVIDADES COMBINADAS DE APOYO A INSTALACIONES', '8110');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('355', 'LIMPIEZA GENERAL DE EDIFICIOS', '8121');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('356', 'OTRAS ACTIVIDADES DE LIMPIEZA DE EDIFICIOS E INSTALACIONES INDUSTRIALES', '8129');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('357', 'ACTIVIDADES DE PAISAJISMO Y SERVICIOS DE MANTENIMIENTO CONEXOS', '8130');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('358', 'ACTIVIDADES COMBINADAS DE SERVICIOS ADMINISTRATIVOS DE OFICINA', '8211');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('359', 'FOTOCOPIADO, PREPARACIÓN DE DOCUMENTOS Y OTRAS ACTIVIDADES ESPECIALIZADAS DE APOYO DE OFICINA', '8219');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('360', 'ACTIVIDADES DE CENTROS DE LLAMADAS', '8220');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('361', 'ORGANIZACIÓN DE CONVENCIONES Y EXPOSICIONES COMERCIALES', '8230');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('362', 'ACTIVIDADES DE AGENCIAS DE COBRO Y AGENCIAS DE CALIFICACIÓN CREDITICIA', '8291');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('363', 'ACTIVIDADES DE ENVASADO Y EMPAQUETADO', '8292');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('364', 'OTRAS ACTIVIDADES DE SERVICIOS DE APOYO A LAS EMPRESAS N.C.P', '8299');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('365', 'ACTIVIDADES DE LA ADMINISTRACIÓN PÚBLICA EN GENERAL', '8411');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('366', 'REGULACIÓN DE LAS ACTIVIDADES DE ORGANISMOS QUE PRESTAN SERVICIOS SANITARIOS, EDUCATIVOS, CULTURALES Y OTROS SERVICIOS SOCIALES, EXCEPTO SERVICIOS DE SEGURIDAD SOCIAL', '8412');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('367', 'REGULACIÓN Y FACILITACIÓN DE LA ACTIVIDAD ECONÓMICA', '8413');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('368', 'RELACIONES EXTERIORES', '8421');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('369', 'ACTIVIDADES DE DEFENSA', '8422');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('370', 'ACTIVIDADES DE MANTENIMIENTO DEL ORDEN PÚBLICO Y DE SEGURIDAD', '8423');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('371', 'ACTIVIDADES DE PLANES DE SEGURIDAD SOCIAL DE AFILIACIÓN OBLIGATORIA', '8430');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('372', 'ENSEÑANZA PREESCOLAR Y PRIMARIA', '8510');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('373', 'ENSEÑANZA SECUNDARIA DE FORMACIÓN GENERAL', '8521');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('374', 'ENSEÑANZA SECUNDARIA DE FORMACIÓN TÉCNICA Y PROFESIONAL', '8522');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('375', 'ENSEÑANZA SUPERIOR', '8530');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('376', 'EDUCACIÓN DEPORTIVA Y RECREATIVA', '8541');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('377', 'ENSEÑANZA CULTURAL', '8542');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('378', 'OTROS TIPOS DE ENSEÑANZA N.C.P.', '8549');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('379', 'ACTIVIDADES DE APOYO A LA ENSEÑANZA', '8550');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('380', 'ACTIVIDADES DE HOSPITALES', '8610');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('381', 'ACTIVIDADES DE MÉDICOS Y ODONTÓLOGOS', '8620');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('382', 'OTRAS ACTIVIDADES DE ATENCIÓN DE LA SALUD HUMANA', '8690');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('383', 'ACTIVIDADES DE ATENCIÓN DE ENFERMERÍA EN INSTITUCIONES', '8710');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('384', 'ACTIVIDADES DE ATENCIÓN EN INSTITUCIONES PARA PERSONAS CON RETRASO MENTAL, ENFERMOS MENTALES Y TOXICÓMANOS', '8720');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('385', 'ACTIVIDADES DE ATENCIÓN EN INSTITUCIONES PARA PERSONAS DE EDAD PERSONAS CON DISCAPACIDAD', '8730');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('386', 'OTRAS ACTIVIDADES DE ATENCIÓN EN INSTITUCIONES', '8790');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('387', 'ACTIVIDADES DE ASISTENCIA SOCIAL SIN ALOJAMIENTO PARA PERSONAS DE EDAD Y PERSONAS CON DISCAPACIDAD', '8810');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('388', 'OTRAS ACTIVIDADES DE ASISTENCIA SOCIAL SIN ALOJAMIENTO', '8890');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('389', 'ACTIVIDADES CREATIVAS, ARTÍSTICAS Y DE ENTRETENIMIENTO', '9000');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('390', 'ACTIVIDADES DE BIBLIOTECAS Y ARCHIVOS', '9101');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('391', 'ACTIVIDADES DE MUSEOS Y GESTIÓN DE LUGARES Y EDIFICIOS HISTÓRICOS', '9102');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('392', 'ACTIVIDADES DE JARDINES BOTÁNICOS Y ZOOLÓGICOS Y RESERVAS NATURALES', '9103');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('393', 'ACTIVIDADES DE JUEGOS DE AZAR Y APUESTAS', '9200');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('394', 'GESTIÓN DE INSTALACIONES DEPORTIVAS', '9311');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('395', 'ACTIVIDADES DE CLUBES DEPORTIVOS', '9312');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('396', 'OTRAS ACTIVIDADES DEPORTIVAS', '9319');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('397', 'ACTIVIDADES DE PARQUES DE ATRACCIONES Y PARQUES TEMÁTICOS', '9321');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('398', 'OTRAS ACTIVIDADES DE ESPARCIMIENTO Y RECREATIVAS N.C.P.', '9329');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('399', 'ACTIVIDADES DE ASOCIACIONES EMPRESARIALES Y DE EMPLEADORES', '9411');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('400', 'ACTIVIDADES DE ASOCIACIONES PROFESIONALES', '9412');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('401', 'ACTIVIDADES DE SINDICATOS', '9420');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('402', 'ACTIVIDADES DE ORGANIZACIONES RELIGIOSAS', '9491');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('403', 'ACTIVIDADES DE ORGANIZACIONES POLÍTICAS', '9492');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('404', 'ACTIVIDADES DE OTRAS ASOCIACIONES N.C.P.', '9499');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('405', 'REPARACIÓN DE ORDENADORES Y EQUIPO PERIFÉRICO', '9511');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('406', 'REPARACIÓN DE EQUIPOS COMUNICACIONALES', '9512');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('407', 'REPARACIÓN DE APARATOS ELECTRÓNICOS DE CONSUMO', '9521');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('408', 'REPARACIÓN DE APARATOS DE USO DOMÉSTICO Y EQUIPO DOMÉSTICO Y DE JARDINERÍA', '9522');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('409', 'REPARACIÓN DE CALZADO Y ARTÍCULOS DE CUERO', '9523');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('410', 'REPARACIÓN DE MUEBLES Y ACCESORIOS DOMÉSTICOS', '9524');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('411', 'REPARACIÓN DE OTROS EFECTOS PERSONALES Y ENSERES DOMÉSTICOS', '9529');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('412', 'LAVADO Y LIMPIEZA, INCLUIDA LA LIMPIEZA EN SECO, DE PRODUCTOS TEXTILES Y DE PIEL', '9601');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('413', 'PELUQUERÍA Y OTROS TRATAMIENTOS DE BELLEZA', '9602');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('414', 'POMPAS FÚNEBRES Y ACTIVIDADES CONEXAS', '9603');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('415', 'OTRAS ACTIVIDADES DE SERVICIOS PERSONALES N.C.P.', '9609');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('416', 'ACTIVIDADES DE LOS HOGARES COMO EMPLEADORES DE PERSONAL DOMÉSTICO', '9700');
INSERT INTO `category` (`id`, `name`, `ciiu`) VALUES ('417', 'ACTIVIDADES DE ORGANIZACIONES Y ÓRGANOS EXTRATERRITORIALES', '9900');

INSERT INTO `department` (`id`, `department`,`country_id`) VALUES 
(1, 'Ancash', 165), 
(2, 'Apurimac', 165),
(3, 'Arequipa', 165),
(4, 'Ica', 165),
(5, 'Cusco', 165),
(6, 'Lambayeque', 165),
(7, 'Ucayali', 165),
(8, 'La Libertad', 165),
(9, 'Ayacucho', 165),
(10, 'Lima', 165),
(11, 'Puno', 165),
(12, 'Junin', 165),
(13, 'Tumbes', 165),
(14, 'Tacna', 165),
(15, 'Cajamarca', 165),
(16, 'Huancavelica', 165),
(17, 'Moquegua', 165),
(18, 'Amazonas', 165),
(19, 'Huanuco', 165),
(20, 'San Martin', 165),
(21, 'Piura', 165),
(22, 'Loreto', 165),
(23, 'Pasco', 165),
(24, 'Madre de Dios', 165),
(25, 'Callao', 165);