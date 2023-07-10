SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- Schema UnB Reviews
CREATE SCHEMA IF NOT EXISTS `UnB Reviews` DEFAULT CHARACTER SET utf8 ;
USE `UnB Reviews` ;

-- Tabela Estudantes
CREATE TABLE IF NOT EXISTS `UnB Reviews`.`Estudantes` (
  `pk_matricula` VARCHAR(9) NOT NULL,
  `nome_estudante` VARCHAR(255) NULL,
  `email` VARCHAR(255) NOT NULL,
  `senha` VARCHAR(20) NOT NULL,
  `curso` VARCHAR(255) NULL,
  `foto_perfil` BLOB NULL,
  `status` VARCHAR(7) NOT NULL DEFAULT 'usuario',
  PRIMARY KEY (`pk_matricula`),
  UNIQUE INDEX `Matricula_UNIQUE` (`pk_matricula` ASC) VISIBLE);
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);

-- Tabela Departamentos
CREATE TABLE IF NOT EXISTS `UnB Reviews`.`Departamentos` (
  `pk_codigo_dep` INT NOT NULL,
  `nome_dep` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`pk_codigo_dep`),
  UNIQUE INDEX `pk_codigo_dep_UNIQUE` (`pk_codigo_dep` ASC) VISIBLE);

-- Tabela Disciplinas
CREATE TABLE IF NOT EXISTS `UnB Reviews`.`Disciplinas` (
  `pk_codigo_disc` VARCHAR(7) NOT NULL,
  `nome_disc` VARCHAR(255) NOT NULL,
  `fk_codigo_dep` INT NOT NULL,
  PRIMARY KEY (`pk_codigo_disc`),
  UNIQUE INDEX `pk_codigo_disc_UNIQUE` (`pk_codigo_disc` ASC) VISIBLE,
  INDEX `fk_codigo_dep_idx` (`fk_codigo_dep` ASC) VISIBLE,
  CONSTRAINT `fk_codigo_dep_disc`
    FOREIGN KEY (`fk_codigo_dep`)
    REFERENCES `UnB Reviews`.`Departamentos` (`pk_codigo_dep`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- Tabela Professores
CREATE TABLE IF NOT EXISTS `UnB Reviews`.`Professores` (
  `pk_id_prof` INT NOT NULL AUTO_INCREMENT,
  `nome_prof` VARCHAR(255) NOT NULL,
  `fk_codigo_dep` INT NOT NULL,
  PRIMARY KEY (`pk_id_prof`),
  UNIQUE INDEX `pk_id_prof_UNIQUE` (`pk_id_prof` ASC) VISIBLE,
  INDEX `fk_codigo_dep_idx` (`fk_codigo_dep` ASC) VISIBLE,
  CONSTRAINT `fk_codigo_dep_prof`
    FOREIGN KEY (`fk_codigo_dep`)
    REFERENCES `UnB Reviews`.`Departamentos` (`pk_codigo_dep`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- Tabela Turmas
CREATE TABLE IF NOT EXISTS `UnB Reviews`.`Turmas` (
  `pk_id_turma` INT NOT NULL AUTO_INCREMENT,
  `numero` INT NOT NULL DEFAULT 1,
  `periodo` VARCHAR(6) NULL,
  `fk_id_prof` INT NOT NULL,
  `horario` VARCHAR(255) NULL,
  `vagas_ocupadas` INT NULL DEFAULT 0,
  `vagas_totais` INT NULL DEFAULT 0,
  `local` VARCHAR(45) NULL,
  `fk_codigo_disc` VARCHAR(7) NOT NULL,
  `fk_codigo_dep` INT NOT NULL,
  PRIMARY KEY (`pk_id_turma`),
  UNIQUE INDEX `pk_id_turma_UNIQUE` (`pk_id_turma` ASC) VISIBLE,
  INDEX `fk_codigo_disc_idx` (`fk_codigo_disc` ASC) VISIBLE,
  INDEX `fk_codigo_dep_idx` (`fk_codigo_dep` ASC) VISIBLE,
  INDEX `fk_id_prof_idx` (`fk_id_prof` ASC) VISIBLE,
  CONSTRAINT `fk_codigo_disc`
    FOREIGN KEY (`fk_codigo_disc`)
    REFERENCES `UnB Reviews`.`Disciplinas` (`pk_codigo_disc`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_codigo_dep_turma`
    FOREIGN KEY (`fk_codigo_dep`)
    REFERENCES `UnB Reviews`.`Departamentos` (`pk_codigo_dep`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_prof`
    FOREIGN KEY (`fk_id_prof`)
    REFERENCES `UnB Reviews`.`Professores` (`pk_id_prof`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- Tabela Avaliacoes
CREATE TABLE IF NOT EXISTS `UnB Reviews`.`Avaliacoes` (
  `pk_id_avaliacao` INT NOT NULL AUTO_INCREMENT,
  `texto_avaliacao` TEXT NOT NULL,
  `fk_id_turma` INT NOT NULL,
  `fk_matricula_estud` VARCHAR(9) NOT NULL,
  `nota` INT NOT NULL,
  PRIMARY KEY (`pk_id_avaliacao`),
  UNIQUE INDEX `pk_id_avaliacao_UNIQUE` (`pk_id_avaliacao` ASC) VISIBLE,
  INDEX `fk_id_turma_idx` (`fk_id_turma` ASC) VISIBLE,
  INDEX `fk_matricula_estud_idx` (`fk_matricula_estud` ASC) VISIBLE,
  CONSTRAINT `fk_id_turma`
    FOREIGN KEY (`fk_id_turma`)
    REFERENCES `UnB Reviews`.`Turmas` (`pk_id_turma`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_matricula_estud`
    FOREIGN KEY (`fk_matricula_estud`)
    REFERENCES `UnB Reviews`.`Estudantes` (`pk_matricula`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- Tabela Denuncias
CREATE TABLE IF NOT EXISTS `UnB Reviews`.`Denuncias` (
  `pk_id_denuncia` INT NOT NULL AUTO_INCREMENT,
  `texto_denuncia` TEXT NOT NULL,
  `fk_matricula_autor` VARCHAR(9) NOT NULL,
  `fk_id_avaliacao` INT NOT NULL,
  PRIMARY KEY (`pk_id_denuncia`),
  INDEX `fk_matricula_autor_idx` (`fk_matricula_autor` ASC) VISIBLE,
  INDEX `fk_id_avaliacao_idx` (`fk_id_avaliacao` ASC) VISIBLE,
  CONSTRAINT `fk_matricula_autor`
    FOREIGN KEY (`fk_matricula_autor`)
    REFERENCES `UnB Reviews`.`Estudantes` (`pk_matricula`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_avaliacao`
    FOREIGN KEY (`fk_id_avaliacao`)
    REFERENCES `UnB Reviews`.`Avaliacoes` (`pk_id_avaliacao`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;