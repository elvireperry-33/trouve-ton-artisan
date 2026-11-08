-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: trouve_ton_artisan
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `categories`
--

/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (4,'Alimentation'),(1,'Bâtiment'),(3,'Fabrication'),(2,'Services');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;

--
-- Dumping data for table `specialites`
--

/*!40000 ALTER TABLE `specialites` DISABLE KEYS */;
INSERT INTO `specialites` VALUES (1,'Boucher',4),(2,'Boulanger',4),(3,'Chocolatier',4),(4,'Traiteur',4),(5,'Chauffagiste',1),(6,'Electricien',1),(7,'Menuisier',1),(8,'Plombier',1),(9,'Bijoutier',3),(10,'Couturier',3),(11,'Ferronier',3),(12,'Coiffeur',2),(13,'Fleuriste',2),(14,'Toiletteur',2),(15,'Webdesign',2);
/*!40000 ALTER TABLE `specialites` ENABLE KEYS */;

--
-- Dumping data for table `artisans`
--

/*!40000 ALTER TABLE `artisans` DISABLE KEYS */;
INSERT INTO `artisans` VALUES (1,'Boucherie Dumont',4.5,'Lyon','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.','boucherie.dumond@gmail.com',NULL,0,1),(2,'Au pain chaud',4.8,'Montélimar','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.','aupainchaud@hotmail.com',NULL,1,2),(3,'Chocolaterie Labbé',4.9,'Lyon','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.','chocolaterie-labbe@gmail.com','https://chocolaterie-labbe.fr',1,3),(4,'Traiteur Truchon',4.1,'Lyon','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.','contact@truchon-traiteur.fr','https://truchon-traiteur.fr',0,4),(5,'Orville Salmons',5.0,'Evian','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.','o-salmons@live.com',NULL,1,5),(6,'Mont Blanc Eléctricité',4.5,'Chamonix','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.','contact@mont-blanc-electricite.com','https://mont-blanc-electricite.com',0,6),(7,'Boutot & fils',4.7,'Bourg-en-bresse','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.','boutot-menuiserie@gmail.com','https://boutot-menuiserie.com',0,7),(8,'Vallis Bellemare',4.0,'Vienne','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.','v.bellemare@gmail.com','https://plomberie-bellemare.com',0,8),(9,'Claude Quinn',4.2,'Aix-les-bains','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.','claude.quinn@gmail.com',NULL,0,9),(10,'Amitee Lécuyer',4.5,'Annecy','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.','a.amitee@hotmail.com','https://lecuyer-couture.com',0,10),(11,'Ernest Carignan',5.0,'Le Puy-en-Velay','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.','e-carigan@hotmail.com',NULL,0,11),(12,'Royden Charbonneau',3.8,'Saint-Priest','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.','r.charbonneau@gmail.com',NULL,0,12),(13,'Leala Dennis',3.8,'Chambéry','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.','l.dennos@hotmail.fr','https://coiffure-leala-chambery.fr',0,12),(14,'C\'est sup\'hair',4.1,'Romans-sur-Isère','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.','sup-hair@gmail.com','https://sup-hair.fr',0,12),(15,'Le monde des fleurs',4.6,'Annonay','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.','contact@le-monde-des-fleurs-annonay.fr','https://le-monde-des-fleurs-annonay.fr',0,13),(16,'Valérie Laderoute',4.5,'Valence','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.','v-laredoute@gmail.com',NULL,0,14),(17,'CM Graphisme',4.4,'Valence','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.','contact@cm-graphisme.com','https://cm-graphisme.com',0,15);
/*!40000 ALTER TABLE `artisans` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-08 17:54:45
