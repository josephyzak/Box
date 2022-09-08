-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.6.7-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para box
CREATE DATABASE IF NOT EXISTS `box` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `box`;

-- Volcando estructura para tabla box.peces
CREATE TABLE IF NOT EXISTS `peces` (
  `pez` varchar(50) NOT NULL,
  `temperatura` int(10) unsigned NOT NULL,
  `pH_low` double unsigned NOT NULL,
  `pH_up` double unsigned NOT NULL,
  `luminocidad` int(10) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla box.peces: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `peces` DISABLE KEYS */;
INSERT INTO `peces` (`pez`, `temperatura`, `pH_low`, `pH_up`, `luminocidad`) VALUES
	('Ninguno', 0, 0, 0, 0),
	('Betta', 28, 5.6, 7.5, 82),
	('Golf', 24, 5.3, 6.5, 95),
	('Pejerey', 20, 4.3, 7.8, 70);
/*!40000 ALTER TABLE `peces` ENABLE KEYS */;

-- Volcando estructura para tabla box.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL DEFAULT '0',
  `password` varchar(50) NOT NULL DEFAULT '0',
  `nombre` varchar(50) NOT NULL DEFAULT '0',
  `tipo` varchar(50) NOT NULL DEFAULT '0',
  `color` int(10) unsigned NOT NULL DEFAULT 0,
  `img` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla box.usuarios: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`ID`, `email`, `password`, `nombre`, `tipo`, `color`, `img`) VALUES
	(1, 'joseph.torres.yz@gmail.com', 'cdf07c6705fe5130c3e6bf8ea893e377', 'Joseph', 'Maestro', 1, './img/Foto_Joseph.png');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;

-- Volcando estructura para tabla box.vista_pez
CREATE TABLE IF NOT EXISTS `vista_pez` (
  `item` int(11) NOT NULL,
  `pez` varchar(50) NOT NULL,
  `temperatura` int(11) NOT NULL DEFAULT 0,
  `pH_low` float NOT NULL DEFAULT 0,
  `pH_up` float NOT NULL DEFAULT 0,
  `luminocidad` int(11) NOT NULL DEFAULT 0,
  `on_off_temp` varchar(50) NOT NULL DEFAULT 'off',
  `kp` float NOT NULL,
  `ki` float NOT NULL,
  `kd` float NOT NULL,
  `on_off_lum` varchar(50) NOT NULL,
  `on_off_bom` varchar(50) NOT NULL,
  `minutos` int(11) NOT NULL,
  `comida` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla box.vista_pez: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `vista_pez` DISABLE KEYS */;
INSERT INTO `vista_pez` (`item`, `pez`, `temperatura`, `pH_low`, `pH_up`, `luminocidad`, `on_off_temp`, `kp`, `ki`, `kd`, `on_off_lum`, `on_off_bom`, `minutos`, `comida`) VALUES
	(1, 'Pejerey', 20, 4.3, 7.8, 70, 'off', 2.3, 6.5, 8.8, 'on', 'on', 15, 50);
/*!40000 ALTER TABLE `vista_pez` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
