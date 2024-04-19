/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE IF NOT EXISTS `class` (
  `clss_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `clss_name` varchar(100) NOT NULL,
  `credit_hours` int(10) unsigned NOT NULL,
  `usr_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`clss_id`),
  FOREIGN KEY (`usr_id`) REFERENCES `user`(`usr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DELETE FROM `class`;
INSERT INTO `class` (`clss_name`, `credit_hours`, `usr_id`) VALUES
	('CH 101', 4, 1),
	('CSC 116', 3, 2),
	('MA 141', 3, 3);

CREATE TABLE IF NOT EXISTS `assignment_type` (
  `type_name` varchar(100) NOT NULL,
  `clss_id` int(11) unsigned NOT NULL,
  `percentage`  int(10) unsigned NOT NULL,
  PRIMARY KEY (`type_name`, `clss_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DELETE FROM `assignment_type`;
INSERT INTO `assignment_type` (`type_name`, `clss_id`, `percentage`) VALUES
	('Homework', 1, 20),
	('Lab', 2, 35),
	('Homework', 3, 20),
  ('Exam', 3, 50);

CREATE TABLE IF NOT EXISTS `assignment` (
  `asm_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `clss_id`  int(11) unsigned NOT NULL,
  `asm_name` varchar(100) NOT NULL ,
  `asm_type` varchar(100) NOT NULL,
  `asm_due` datetime NOT NULL,
  `asm_grade` varchar(10) DEFAULT NULL,
  `asm_status` varchar(50) NOT NULL,
  `usr_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`asm_id`),
  FOREIGN KEY (`clss_id`) REFERENCES `class`(`clss_id`),
  FOREIGN KEY (`usr_id`) REFERENCES `user`(`usr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DELETE FROM `assignment`;
INSERT INTO `assignment` (`asm_id`, `clss_id`, `asm_name`, `asm_type`, `asm_due`, `asm_grade`, `asm_status`, `usr_id`) VALUES
	(1, 1, 'Webassign Ch. 1', 'Homework', '2024-01-24 23:59:00', '23/25', 'Completed', 1),
	(2, 2, 'Week 1 Lab', 'Lab', '2024-01-16 10:45:00', '95/100', 'Completed', 2),
	(3, 3, 'Homework 1', 'Homework', '2024-01-16 23:59:00', '22/30', 'Completed', 3),
	(4, 2, 'Week 2 Lab', 'Lab', '2024-01-23 10:45:00', NULL, 'In Progress', 2),
	(5, 3, 'Test 1', 'Exam', '2024-02-01 15:00:00', NULL, 'Not Started', 3);



CREATE TABLE IF NOT EXISTS `user` (
  `usr_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `usr_first_name` varchar(100) NOT NULL,
  `usr_last_name` varchar(100) NOT NULL,
  `usr_username` varchar(150) NOT NULL,
  `usr_password` varchar(255) NOT NULL,
  `usr_salt` varchar(100) NOT NULL,
  PRIMARY KEY (`usr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DELETE FROM `user`;
INSERT INTO `user` (`usr_id`, `usr_first_name`, `usr_last_name`, `usr_username`, `usr_password`, `usr_salt`) VALUES
	(1, 'Austin', 'Heyward', 'abheywar', '9c8d9ebeee9a3f909d0f497ede145f32e948e8ecc91cfa5cfde47de8e1b1d1203cfa2e1b2e34104a3edf1af27e2203dedff13370632200144c414a3d8bd665a0', '12a26f95a04b60dbd58e94523420f6cb160071a7ab0c76d1'),
	(2, 'Mico', 'Guevarra', 'ffguevar', '5bfab061495e0c9db57564a2beee3ca657c264d38d833b20da33fc9391536b9b71088feea60b275a5c43f8f86b5ded259c0ea5079b5521b506ff7a27505a1281', '30632322d429db6b3792c70c3f5531a988df94e64d2aaf37'),
  (3, 'Olivia', 'Carson', 'orcarson', 'fcd97ee173b80861a98730a1044ec3120861bd4784b1af15a651e7f3167c1edb6ff3d9993aa55986c99be37f840d8381752b150b82e45aca054bc675fd6dee4f', 'cc582f61801419a01c2ee3e3ebf53ed6d23f2b0aaf4f1b75');

-- CREATE TABLE IF NOT EXISTS `user_class` (
--   `usr_id` int(11) unsigned NOT NULL,
--   `clss_name` varchar(100) NOT NULL,
--   PRIMARY KEY (`usrclss_usr_id`,`usrclss_clss_id`),
--   KEY `FK_USR_CLSS` (`usrclss_usr_id`),
--   CONSTRAINT `FK_USRCLSS_USR` FOREIGN KEY (`usrclss_usr_id`) REFERENCES `user` (`usr_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
--   CONSTRAINT `FK_USRCLSS_CLSS` FOREIGN KEY (`usrclss_clss_id`) REFERENCES `class` (`clss_name`) ON DELETE NO ACTION ON UPDATE NO ACTION,
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
