/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE IF NOT EXISTS `class` (
  `clss_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `clss_name` varchar(100) NOT NULL,
  PRIMARY KEY (`clss_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DELETE FROM `class`;
INSERT INTO `class` (`clss_id`, `clss_name`) VALUES
	(1, 'CH 101'),
	(2, 'CSC 116'),
	(3, 'MA 141');

CREATE TABLE IF NOT EXISTS `assignment` (
  `asm_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `asm_name` varchar(100) NOT NULL ,
  `asm_type` varchar(100) NOT NULL,
  `asm_due` datetime NOT NULL,
  `asm_grade` varchar(10) DEFAULT NULL,
  `asm_status` varchar(50) NOT NULL,
  PRIMARY KEY (`asm_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DELETE FROM `assignment`;
INSERT INTO `assignment` (`asm_id`, `asm_name`, `asm_type`, `asm_due`, `asm_grade`, `asm_status`) VALUES
	(1, 'Webassign Ch. 1', 'Homework', '2024-01-24 23:59:00', '23/25', 'Completed'),
	(2, 'Week 1 Lab', 'Lab', '2024-01-16 10:45:00', '95/100', 'Completed'),
	(3, 'Homework 1', 'Homework', '2024-01-16 23:59:00', '22/30', 'Completed'),
	(4, 'Week 2 Lab', 'Lab', '2024-01-23 10:45:00', NULL, 'In Progress'),
	(5, 'Test 1', 'Exam', '2024-02-01 15:00:00', NULL, 'Not Started');



CREATE TABLE IF NOT EXISTS `assignment_class` (
  `acl_asm_id` int(10) unsigned NOT NULL,
  `acl_clss_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`acl_asm_id`,`acl_clss_id`),
  KEY `FK_ACL_CLSS` (`acl_clss_id`),
  CONSTRAINT `FK_ACL_CLSS` FOREIGN KEY (`acl_clss_id`) REFERENCES `class` (`clss_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_ACL_ASM` FOREIGN KEY (`acl_asm_id`) REFERENCES `assignment` (`asm_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DELETE FROM `assignment_class`;
INSERT INTO `assignment_class` (`acl_asm_id`,`acl_clss_id`) VALUES
	(1,1),
	(2,2),
	(3,3),
	(4,2),
	(5,3);

CREATE TABLE IF NOT EXISTS `user` (
  `usr_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `usr_first_name` varchar(100) NOT NULL,
  `usr_last_name` varchar(100) NOT NULL,
  `usr_username` varchar(150) NOT NULL,
  `usr_password` varchar(255) NOT NULL,
  `usr_salt` varchar(100) NOT NULL,
  `usr_avatar` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`usr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DELETE FROM `user`;
INSERT INTO `user` (`usr_id`, `usr_first_name`, `usr_last_name`, `usr_username`, `usr_password`, `usr_salt`, `usr_avatar`) VALUES
	(1, 'Stu', 'Dent', 'student', '83d9bdb5e20f3571b087db9aabf190a296741c3e864d7742f35658cfccc1b79c4599aad25084aa9a28c649a50c92244227b3e53e197621301d619d1ea01873c4', '48c8947f69c054a5caa934674ce8881d02bb18fb59d5a63eeaddff735b0e9', 'https://robohash.org/veniamdoloresenim.png?size=64x64&set=set1'),
	(2, 'Gra', 'Duate', 'graduate', 'e289219c34f9a32ebc82393f09719b7f34872de95463242b5ffe8bb4b11a5fe7d454f9f5d082c8207c5d69b220ba06624b4bb15ffa05cc7d7d53c43f9e96da6a', '801e87294783281ae49fc8287a0fd86779b27d7972d3e84f0fa0d826d7cb67dfefc', 'https://robohash.org/nullaautemin.png?size=64x64&set=set1');
