/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `name`, `email`)
VALUES
	(1,'Alien Morty','alien@mortys.com'),
	(2,'Banana Morty','slippery@mortys.com'),
	(3,'Cat Morty','meow@mortys.com'),
	(4,'Dog Morty','dawg@mortys.com'),
	(5,'Evil Morty','666@mortys.com'),
	(6,'Frozen Morty','letitgo@mortys.com'),
	(7,'Genius Morty','rick@mortys.com'),
	(8,'Hammerhead Morty','hammertime@mortys.com'),
	(9,'Pickle Morty','letsmarinate@mortys.com');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table work_order_assignees
# ------------------------------------------------------------

DROP TABLE IF EXISTS `work_order_assignees`;

CREATE TABLE `work_order_assignees` (
  `work_order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`work_order_id`,`user_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `work_order_assignees` WRITE;
/*!40000 ALTER TABLE `work_order_assignees` DISABLE KEYS */;

INSERT INTO `work_order_assignees` (`work_order_id`, `user_id`)
VALUES
	(3,1),
	(5,1),
	(2,3),
	(3,4),
	(6,5),
	(4,8);

/*!40000 ALTER TABLE `work_order_assignees` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table work_orders
# ------------------------------------------------------------

DROP TABLE IF EXISTS `work_orders`;

CREATE TABLE `work_orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('OPEN','CLOSED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'OPEN',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `work_orders` WRITE;
/*!40000 ALTER TABLE `work_orders` DISABLE KEYS */;

INSERT INTO `work_orders` (`id`, `name`, `status`)
VALUES
	(1,'Unfreeze Frozen Morty','OPEN'),
	(2,'Clean Cat Morty\'s litterbox','OPEN'),
	(3,'Walk Dog Morty around the block','OPEN'),
	(4,'Hammer nails','OPEN'),
	(5,'Land on Earth','CLOSED'),
	(6,'Freeze Morty','CLOSED'),
	(8,'Go to Work','OPEN'),
	(7,'Don\'t assign and close','CLOSED');

/*!40000 ALTER TABLE `work_orders` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
