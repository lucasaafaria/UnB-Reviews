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

-- Registros iniciais da Tabela Estudantes
INSERT INTO `UnB Reviews`.`Estudantes`
  (`pk_matricula`, `nome_estudante`, `email`, `senha`, `curso`, `status`)
VALUES
  ('111111111', 'Admin Supremo', 'admin@unb.br', '123456', 'Ciência da Computação', 'admin'),
  ('123456789', 'João da Silva Santos', 'joao@unb.br', '123456', 'Turismo', 'usuario'),
  ('987654321', 'Maria Gomes Leite', 'maria@unb.br', '123456', 'Engenharia Ambiental', 'usuario');

-- Tabela Departamentos
CREATE TABLE IF NOT EXISTS `UnB Reviews`.`Departamentos` (
  `pk_codigo_dep` INT NOT NULL,
  `nome_dep` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`pk_codigo_dep`),
  UNIQUE INDEX `pk_codigo_dep_UNIQUE` (`pk_codigo_dep` ASC) VISIBLE);

-- Registros iniciais da Tabela Departamentos
INSERT INTO `UnB Reviews`.`Departamentos`
  (`pk_codigo_dep`, `nome_dep`)
VALUES
  (643, 'CENTRO DE APOIO AO DESENVOLVIMENTO TECNOLÓGICO'),
  (640, 'CENTRO DE DESENVOLVIMENTO SUSTENTÁVEL'),
  (314, 'CENTRO DE EXCELÊNCIA EM TURISMO');

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
    ON DELETE CASCADE
    ON UPDATE NO ACTION);

-- Registros iniciais da Tabela Disciplinas
INSERT INTO `UnB Reviews`.`Disciplinas`
  (`pk_codigo_disc`, `nome_disc`, `fk_codigo_dep`)
VALUES
  ('CDT1101', 'TECNOLOGIA SOCIAL E INOVAÇÃO', 643),
  ('CDS0004', 'AGRICULTURA E MEIO AMBIENTE', 640),
  ('CET0001', 'PLANEJAMENTO E GESTÃO EM TURISMO 1', 314);

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
    ON DELETE CASCADE
    ON UPDATE NO ACTION);

-- Registros iniciais da Tabela Professores
INSERT INTO `UnB Reviews`.`Professores`
  (`nome_prof`, `fk_codigo_dep`)
VALUES
  ('JONATHAS FELIPE AIRES FERREIRA', 643),
  ('LAURA ANGELICA FERREIRA DARNET', 640),
  ('MARUTSCHKA MARTINI MOESCH', 314);

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
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_codigo_dep_turma`
    FOREIGN KEY (`fk_codigo_dep`)
    REFERENCES `UnB Reviews`.`Departamentos` (`pk_codigo_dep`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_prof`
    FOREIGN KEY (`fk_id_prof`)
    REFERENCES `UnB Reviews`.`Professores` (`pk_id_prof`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);

-- Registros iniciais da Tabela Turmas
INSERT INTO `UnB Reviews`.`Turmas`
  (`numero`, `periodo`, `fk_id_prof`, `horario`, `vagas_ocupadas`, `vagas_totais`, `local`, `fk_codigo_disc`, `fk_codigo_dep`)
VALUES
  (1, '2023.1', 1, '6T2345 (28/03/2023 - 25/07/2023)', 22, 50, 'CDT - Sala Interação', 'CDT1101', 643),
  (1, '2023.1', 1, '35T23', 28, 30, 'ICC AT 114/18', 'CDS0004', 640),
  (1, '2023.1', 1, '3T2345', 26, 40, 'CET - Módulo B - Sala 2', 'CET0001', 314);

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
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_matricula_estud`
    FOREIGN KEY (`fk_matricula_estud`)
    REFERENCES `UnB Reviews`.`Estudantes` (`pk_matricula`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);

-- Registros iniciais da Tabela Avaliacoes
INSERT INTO `UnB Reviews`.`Avaliacoes`
  (`texto_avaliacao`, `fk_id_turma`, `fk_matricula_estud`, `nota`)
VALUES
  ('Excelente matéria, tive a oportunidade de aprender muito com o professor Jonathas, que ministrou o conteúdo com maestria e passou avaliações coerentes.', 1, '111111111', 10),
  ('Senti que o andamento da matéria foi bem mediano ao longo do semestre, sem muitos altos e baixos. Não houve muita motivação por parte da professora também.', 2, '123456789', 5),
  ('Desgraça de matéria do cão que só serviu pra que eu perdesse todo o resto de sanidade mental que me faltava.', 3, '987654321', 0);

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
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_avaliacao`
    FOREIGN KEY (`fk_id_avaliacao`)
    REFERENCES `UnB Reviews`.`Avaliacoes` (`pk_id_avaliacao`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);

-- Registros iniciais da Tabela Denuncias
INSERT INTO `UnB Reviews`.`Denuncias`
  (`texto_denuncia`, `fk_matricula_autor`, `fk_id_avaliacao`)
VALUES
  ('Acho que passou dos limites nessa aqui.', '123456789', 3),
  ('Sem noção demais, aí viajou.', '111111111', 3),
  ('Passei por essa de novo agora e tô denunciando pela segunda vez, cadê os admins??', '123456789', 3);

DELIMITER //

CREATE PROCEDURE CreateDenunciasView()
BEGIN
  DECLARE viewExists INT;

  SELECT COUNT(*)
  INTO viewExists
  FROM information_schema.VIEWS
  WHERE TABLE_SCHEMA = 'UnB Reviews'
    AND TABLE_NAME = 'Denuncias_Aprimoradas';

  IF viewExists = 0 THEN
    -- Create the view
    SET @createViewQuery = '
      CREATE VIEW Denuncias_Aprimoradas AS
      SELECT D.*, A.texto_avaliacao, A.nota, E.nome_estudante, DI.nome_disc
      FROM `UnB Reviews`.`Denuncias` AS D
      JOIN `UnB Reviews`.`Avaliacoes` AS A ON D.fk_id_avaliacao = A.pk_id_avaliacao
      JOIN `UnB Reviews`.`Estudantes` AS E ON A.fk_matricula_estud = E.pk_matricula
      JOIN `UnB Reviews`.`Turmas` AS T ON A.fk_id_turma = T.pk_id_turma
      JOIN `UnB Reviews`.`Disciplinas` AS DI ON T.fk_codigo_disc = DI.pk_codigo_disc';

    PREPARE createViewStatement FROM @createViewQuery;
    EXECUTE createViewStatement;
    DEALLOCATE PREPARE createViewStatement;

    SELECT 'Denuncias_Aprimoradas created successfully.' AS Result;
  ELSE
    SELECT 'Denuncias_Aprimoradas already exists.' AS Result;
  END IF;
END //

DELIMITER ;

CALL CreateDenunciasView();
