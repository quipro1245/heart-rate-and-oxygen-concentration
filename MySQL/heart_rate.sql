CREATE TABLE `benhnhan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hoten` varchar(250) DEFAULT NULL,
  `cmnd` varchar(12) DEFAULT NULL,
  `gioitinh` varchar(3) DEFAULT NULL,
  `ngaysinh` date DEFAULT NULL,
  `sophong` int DEFAULT NULL,
  `ghichu` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mathietbi` varchar(50) DEFAULT NULL,
  `hr` int DEFAULT NULL,
  `oxi` float DEFAULT NULL,
  `times` datetime DEFAULT CURRENT_TIMESTAMP,
  `id_benhnhan` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_benhnhan` (`id_benhnhan`),
  CONSTRAINT `data_ibfk_1` FOREIGN KEY (`id_benhnhan`) REFERENCES `benhnhan` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `taikhoan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tendangnhap` varchar(250) DEFAULT NULL,
  `matkhau` varchar(250) DEFAULT NULL,
  `quyen` int DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
