```sql
CREATE DATABASE IF NOT EXISTS bibliopolisdb;

USE bibliopolisdb;

CREATE TABLE IF NOT EXISTS `students` (
  `id` varchar(10) PRIMARY KEY,
  `name` varchar(40) NOT NULL,
  `lastname` varchar(40) NOT NULL,
  `email` varchar(80) UNIQUE NOT NULL,
  `career_id` int NOT NULL
);

CREATE TABLE IF NOT EXISTS `librarians` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `lastname` varchar(40) NOT NULL,
  `email` varchar(80) UNIQUE NOT NULL,
  `rol_id` int NOT NULL
);

CREATE TABLE IF NOT EXISTS `roles` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS `books` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `author` varchar(200) NOT NULL,
  `isbn` varchar(15) NOT NULL,
  `units` int NOT NULL,
  `image_name` varchar(200) NOT NULL,
  `editorial_id` int NOT NULL
);

CREATE TABLE IF NOT EXISTS `careers` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS `editorials` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS `loans` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` ENUM ('active', 'expired', 'returned', 'cancelled', 'pending') NOT NULL,
  `student_id` varchar(10) NOT NULL,
  `book_id` int NOT NULL
);

CREATE TABLE IF NOT EXISTS `tags` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100) NOT NULL
);

ALTER TABLE `students` ADD FOREIGN KEY IF NOT EXISTS (`career_id`) REFERENCES `careers` (`id`);

ALTER TABLE `librarians` ADD FOREIGN KEY IF NOT EXISTS (`rol_id`) REFERENCES `roles` (`id`);

ALTER TABLE `books` ADD FOREIGN KEY IF NOT EXISTS (`editorial_id`) REFERENCES `editorials` (`id`);

ALTER TABLE `loans` ADD FOREIGN KEY IF NOT EXISTS (`student_id`) REFERENCES `students` (`id`);

ALTER TABLE `loans` ADD FOREIGN KEY IF NOT EXISTS (`book_id`) REFERENCES `books` (`id`);

CREATE TABLE IF NOT EXISTS `books_tags` (
  `books_id` int,
  `tags_id` int,
  PRIMARY KEY (`books_id`, `tags_id`)
);

ALTER TABLE `books_tags` ADD FOREIGN KEY IF NOT EXISTS (`books_id`) REFERENCES `books` (`id`);

ALTER TABLE `books_tags` ADD FOREIGN KEY IF NOT EXISTS (`tags_id`) REFERENCES `tags` (`id`);
```
