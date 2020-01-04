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
  `name` VARCHAR(145) NULL DEFAULT NULL
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
  `date_publication` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
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
  `date_expedition` DATETIME NULL DEFAULT NULL,
  `date_expiration` DATETIME NULL DEFAULT NULL,
  `document_url` VARCHAR(255) NULL DEFAULT NULL,
  `user_id` INT(11) NOT NULL,
  `company_id` INT(11) NOT NULL,
  `certification_name_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_certification_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_certification_company1_idx` (`company_id` ASC) VISIBLE,
  INDEX `fk_certification_certification_name1_idx` (`certification_name_id` ASC) VISIBLE,
  CONSTRAINT `fk_certification_company1`
    FOREIGN KEY (`company_id`)
    REFERENCES `exitum`.`company` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_certification_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `exitum`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_certification_certification_name1`
    FOREIGN KEY (`certification_name_id`)
    REFERENCES `exitum`.`certification_name` (`id`)
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
  `questionnaire` TINYINT(1) NOT NULL DEFAULT 0,
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
  `date_publication` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `comment` TEXT NULL DEFAULT NULL,
  `reply` TEXT NULL DEFAULT NULL,
  `verifying_user` INT(11) NULL DEFAULT NULL,
  `date_max` DATETIME NULL DEFAULT NULL,
  `date_completed` DATETIME NULL DEFAULT NULL,
  `viewed` TINYINT(1) NOT NULL DEFAULT 0,
  `date_viewed` DATETIME NULL DEFAULT NULL,
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


-- -----------------------------------------------------
-- Table `exitum`.`query`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`query` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `query` TEXT NULL,
  `tip_id` INT NOT NULL,
  `active` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `fk_question_tip1_idx` (`tip_id` ASC),
  CONSTRAINT `fk_question_tip1`
    FOREIGN KEY (`tip_id`)
    REFERENCES `exitum`.`tip` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `exitum`.`reply`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exitum`.`reply` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `reply` TEXT NULL,
  `challenge_id` INT NOT NULL,
  `query_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_answer_challenge1_idx` (`challenge_id` ASC),
  INDEX `fk_reply_query1_idx` (`query_id` ASC),
  CONSTRAINT `fk_answer_challenge1`
    FOREIGN KEY (`challenge_id`)
    REFERENCES `exitum`.`challenge` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_reply_query1`
    FOREIGN KEY (`query_id`)
    REFERENCES `exitum`.`query` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `exitum`.`speciality` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `exitum`.`education_speciality` (
  `education_id` INT(11) NOT NULL,
  `speciality_id` INT NOT NULL,
  PRIMARY KEY (`education_id`, `speciality_id`),
  INDEX `fk_education_has_speciality_speciality1_idx` (`speciality_id` ASC),
  INDEX `fk_education_has_speciality_education1_idx` (`education_id` ASC),
  CONSTRAINT `fk_education_has_speciality_education1`
    FOREIGN KEY (`education_id`)
    REFERENCES `exitum`.`education` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_education_has_speciality_speciality1`
    FOREIGN KEY (`speciality_id`)
    REFERENCES `exitum`.`speciality` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `exitum`.`advertisement_speciality` (
  `advertisement_id` INT(11) NOT NULL,
  `speciality_id` INT NOT NULL,
  PRIMARY KEY (`advertisement_id`, `speciality_id`),
  INDEX `fk_advertisement_has_speciality_speciality1_idx` (`speciality_id` ASC),
  INDEX `fk_advertisement_has_speciality_advertisement1_idx` (`advertisement_id` ASC),
  CONSTRAINT `fk_advertisement_has_speciality_advertisement1`
    FOREIGN KEY (`advertisement_id`)
    REFERENCES `exitum`.`advertisement` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_advertisement_has_speciality_speciality1`
    FOREIGN KEY (`speciality_id`)
    REFERENCES `exitum`.`speciality` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


CREATE TABLE IF NOT EXISTS `exitum`.`certification_speciality` (
  `certification_id` INT(11) NOT NULL,
  `speciality_id` INT NOT NULL,
  PRIMARY KEY (`certification_id`, `speciality_id`),
  INDEX `fk_certification_has_speciality_speciality1_idx` (`speciality_id` ASC),
  INDEX `fk_certification_has_speciality_certification1_idx` (`certification_id` ASC),
  CONSTRAINT `fk_certification_has_speciality_certification1`
    FOREIGN KEY (`certification_id`)
    REFERENCES `exitum`.`certification` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_certification_has_speciality_speciality1`
    FOREIGN KEY (`speciality_id`)
    REFERENCES `exitum`.`speciality` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

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

INSERT INTO `category` (`id`, `name`) VALUES ('1',  'AGRICULTURA');
INSERT INTO `category` (`id`, `name`) VALUES ('2',  'ACUICULTURA');
INSERT INTO `category` (`id`, `name`) VALUES ('3',  'ADMINISTRACION PUBLICA');
INSERT INTO `category` (`id`, `name`) VALUES ('4',  'AGENCIAS DE VIAJE Y OPERADOR TURISTICO');
INSERT INTO `category` (`id`, `name`) VALUES ('5',  'ALMACENES');
INSERT INTO `category` (`id`, `name`) VALUES ('6',  'ALOJAMIENTO');
INSERT INTO `category` (`id`, `name`) VALUES ('7',  'ALQUILER DE ESPACIOS PARA EVENTOS');
INSERT INTO `category` (`id`, `name`) VALUES ('8',  'ARQUITECTURA');
INSERT INTO `category` (`id`, `name`) VALUES ('9',  'ARTE MANUAL');
INSERT INTO `category` (`id`, `name`) VALUES ('10', 'CATERING Y BOCADITOS');
INSERT INTO `category` (`id`, `name`) VALUES ('11', 'COACH');
INSERT INTO `category` (`id`, `name`) VALUES ('12', 'COMERCIO MAYORISTA - VENTA DE ALIMENTOS BEBIDAS Y TABACO');
INSERT INTO `category` (`id`, `name`) VALUES ('13', 'COMERCIO MAYORISTA - VENTA DE ANIMALES VIVOS'); 
INSERT INTO `category` (`id`, `name`) VALUES ('14', 'COMERCIO MAYORISTA - VENTA DE COMPUTADORAS');
INSERT INTO `category` (`id`, `name`) VALUES ('15', 'COMERCIO MAYORISTA - VENTA DE ENSERES DOMESTICOS');
INSERT INTO `category` (`id`, `name`) VALUES ('16', 'COMERCIO MAYORISTA - VENTA DE EQUIPOS ELECTRONICOS DE TELECOMUNICACION');
INSERT INTO `category` (`id`, `name`) VALUES ('17', 'COMERCIO MAYORISTA - VENTA DE MATERIALES PARA LA CONSTRUCCION y ART.FERRETERIA');
INSERT INTO `category` (`id`, `name`) VALUES ('18', 'COMERCIO MAYORISTA - VENTA DE MATERIAS PRIMAS AGROPECUARIAS'); 
INSERT INTO `category` (`id`, `name`) VALUES ('19', 'COMERCIO MAYORISTA - VENTA EQUIPOS MEDICOS');
INSERT INTO `category` (`id`, `name`) VALUES ('20', 'COMERCIO MAYORISTA - VENTA EQUIPOS PARA LA INDUSTRIA');
INSERT INTO `category` (`id`, `name`) VALUES ('21', 'COMERCIO MAYORISTA - OTROS');
INSERT INTO `category` (`id`, `name`) VALUES ('22', 'COMERCIO MINORISTA - MINIMARKETS O BODEGAS');
INSERT INTO `category` (`id`, `name`) VALUES ('23', 'COMERCIO MINORISTA - OTROS');  
INSERT INTO `category` (`id`, `name`) VALUES ('24', 'COMERCIO MINORISTA - SUPERMERCADOS');
INSERT INTO `category` (`id`, `name`) VALUES ('25', 'COMERCIO MINORISTA - VEHICULOS CONVENCIONALES');
INSERT INTO `category` (`id`, `name`) VALUES ('26', 'COMERCIO MINORISTA - VEHICULOS DE TRANSPORTE MASIVO');
INSERT INTO `category` (`id`, `name`) VALUES ('27', 'COMERCIO MINORISTA - VEHICULOS DE TRANSPORTE MASIVO 2DA MANO');
INSERT INTO `category` (`id`, `name`) VALUES ('28', 'COMERCIO MINORISTA - VENTA DE COMPUTADORAS');
INSERT INTO `category` (`id`, `name`) VALUES ('29', 'COMERCIO MINORISTA - VENTA DE PRODUCTOS EN ALMACENES ESPECIALIZADOS');
INSERT INTO `category` (`id`, `name`) VALUES ('30', 'COMERCIO MINORISTA - VENTA DE PRODUCTOS MEDICINALES');
INSERT INTO `category` (`id`, `name`) VALUES ('31', 'COMERCIO MINORISTA - MOTOCICLETAS');
INSERT INTO `category` (`id`, `name`) VALUES ('32', 'COMERCIO MINORISTA - VEHICULOS CONVENCIONALES DE 2DA MANO');
INSERT INTO `category` (`id`, `name`) VALUES ('33', 'CONSTRUCCION');
INSERT INTO `category` (`id`, `name`) VALUES ('34', 'CONSULTORIA');
INSERT INTO `category` (`id`, `name`) VALUES ('35', 'CORREO');
INSERT INTO `category` (`id`, `name`) VALUES ('36', 'DECORACION');
INSERT INTO `category` (`id`, `name`) VALUES ('37', 'ELECTRICIDAD');
INSERT INTO `category` (`id`, `name`) VALUES ('38', 'ESTILISTA');
INSERT INTO `category` (`id`, `name`) VALUES ('39', 'FENG SHUI');
INSERT INTO `category` (`id`, `name`) VALUES ('40', 'GANADERIA');
INSERT INTO `category` (`id`, `name`) VALUES ('41', 'GAS');
INSERT INTO `category` (`id`, `name`) VALUES ('42', 'GESTION EMPRESARIAL');
INSERT INTO `category` (`id`, `name`) VALUES ('43', 'INGENIERIA');
INSERT INTO `category` (`id`, `name`) VALUES ('44', 'INVESTIGACION DE MERCADOS');
INSERT INTO `category` (`id`, `name`) VALUES ('45', 'MANUFACTURA');
INSERT INTO `category` (`id`, `name`) VALUES ('46', 'MENSAJERIA');
INSERT INTO `category` (`id`, `name`) VALUES ('47', 'MENTOR');
INSERT INTO `category` (`id`, `name`) VALUES ('48', 'MOTIVADOR PROFESIONAL');
INSERT INTO `category` (`id`, `name`) VALUES ('49', 'MOTOCICLETAS REPARACION');
INSERT INTO `category` (`id`, `name`) VALUES ('50', 'PECUARIA 1 (AVE, HUEVO, LECHE)');
INSERT INTO `category` (`id`, `name`) VALUES ('51', 'PECUARIA 2 (PORCINO, VACUNO, OVINO)');
INSERT INTO `category` (`id`, `name`) VALUES ('52', 'PELUQUERIA SERVICIOS VARIOS');
INSERT INTO `category` (`id`, `name`) VALUES ('53', 'PENSIONES');
INSERT INTO `category` (`id`, `name`) VALUES ('54', 'PESCA');
INSERT INTO `category` (`id`, `name`) VALUES ('55', 'PETROLEO');
INSERT INTO `category` (`id`, `name`) VALUES ('56', 'PROFESOR PARTICULAR');
INSERT INTO `category` (`id`, `name`) VALUES ('57', 'PSICOLOGIA');
INSERT INTO `category` (`id`, `name`) VALUES ('58', 'PUBLICIDAD');
INSERT INTO `category` (`id`, `name`) VALUES ('59', 'RESTAURANTES - CARNES Y PARRILLAS');
INSERT INTO `category` (`id`, `name`) VALUES ('60', 'RESTAURANTES - CHIFAS');
INSERT INTO `category` (`id`, `name`) VALUES ('61', 'RESTAURANTES - COMIDA CRIOLLA');
INSERT INTO `category` (`id`, `name`) VALUES ('62', 'RESTAURANTES - COMIDA DIETETICA');
INSERT INTO `category` (`id`, `name`) VALUES ('63', 'RESTAURANTES - COMIDA ORGANICA');
INSERT INTO `category` (`id`, `name`) VALUES ('64', 'RESTAURANTES - COMIDA RAPIDA');
INSERT INTO `category` (`id`, `name`) VALUES ('65', 'RESTAURANTES - HELADERIAS');
INSERT INTO `category` (`id`, `name`) VALUES ('66', 'RESTAURANTES - OTROS');
INSERT INTO `category` (`id`, `name`) VALUES ('67', 'RESTAURANTES - PIZZAS');
INSERT INTO `category` (`id`, `name`) VALUES ('68', 'RESTAURANTES - POLLERIAS');
INSERT INTO `category` (`id`, `name`) VALUES ('69', 'ROPA ALQUILER');
INSERT INTO `category` (`id`, `name`) VALUES ('70', 'ROPA VENTA');
INSERT INTO `category` (`id`, `name`) VALUES ('71', 'SEGURIDAD');
INSERT INTO `category` (`id`, `name`) VALUES ('72', 'SEGUROS');
INSERT INTO `category` (`id`, `name`) VALUES ('73', 'SERVICIOS DE LIMPIEZA');
INSERT INTO `category` (`id`, `name`) VALUES ('74', 'SERVICIOS FINANCIEROS');
INSERT INTO `category` (`id`, `name`) VALUES ('75', 'SILVICULTURA');
INSERT INTO `category` (`id`, `name`) VALUES ('76', 'TELECOMUNICACIONES - ALQUILER DE CONEXIÓN INTERNET (cabina)');
INSERT INTO `category` (`id`, `name`) VALUES ('77', 'TELECOMUNICACIONES - OTROS');
INSERT INTO `category` (`id`, `name`) VALUES ('78', 'TELECOMUNICACIONES - VENTA DE CONEXIÓN INTERNET');
INSERT INTO `category` (`id`, `name`) VALUES ('79', 'TELECOMUNICACIONES - VENTA DE CABLE');
INSERT INTO `category` (`id`, `name`) VALUES ('80', 'TELECOMUNICACIONES - VENTA DE CELULAR');
INSERT INTO `category` (`id`, `name`) VALUES ('81', 'TELECOMUNICACIONES - VENTA DE TELEFONO');
INSERT INTO `category` (`id`, `name`) VALUES ('82', 'TORTAS Y DULCES');
INSERT INTO `category` (`id`, `name`) VALUES ('83', 'TRANSPORTE');
INSERT INTO `category` (`id`, `name`) VALUES ('84', 'VEHICULOS REPARACION');

INSERT INTO `area` (`id`, `name`) VALUES
(1,'Área de gestión'),
(2,'Área de recursos humanos'),
(3,'Área de comercialización'),
(4,'Área de contabilidad y finanzas'),
(5,'Área de producción'),
(6,'Área de administración'),
(7,'Área de aspectos legales');

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