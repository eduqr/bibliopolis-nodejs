# bibliopolis-nodejs

### Script para las tablas (bibliopolisdb)
```sql
CREATE TABLE `students` (
  `id` varchar(10) PRIMARY KEY,
  `name` varchar(40) NOT NULL,
  `lastname` varchar(40) NOT NULL,
  `email` varchar(40) UNIQUE NOT NULL,
  `career_id` int NOT NULL
);

CREATE TABLE `librarians` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `lastname` varchar(40) NOT NULL,
  `email` varchar(40) UNIQUE NOT NULL,
  `rol_id` int NOT NULL
);

CREATE TABLE `roles` (
  `id` int PRIMARY KEY,
  `name` varchar(40) NOT NULL
);

CREATE TABLE `books` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `author` varchar(200) NOT NULL,
  `isbn` varchar(200) NOT NULL,
  `units` int NOT NULL,
  `image_name` varchar(200) NOT NULL;
  `editorial_id` int NOT NULL
);

CREATE TABLE `careers` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100) NOT NULL
);

CREATE TABLE `editorials` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100) NOT NULL
);

CREATE TABLE `loans` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` ENUM ('active', 'expired', 'returned', 'cancelled', 'pending') NOT NULL,
  `student_id` varchar(10) NOT NULL,
  `book_id` int NOT NULL
);

CREATE TABLE `tags` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100) NOT NULL
);

ALTER TABLE `students` ADD FOREIGN KEY (`career_id`) REFERENCES `careers` (`id`);

ALTER TABLE `librarians` ADD FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`);

ALTER TABLE `books` ADD FOREIGN KEY (`editorial_id`) REFERENCES `editorials` (`id`);

ALTER TABLE `loans` ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`id`);

ALTER TABLE `loans` ADD FOREIGN KEY (`book_id`) REFERENCES `books` (`id`);

CREATE TABLE `books_tags` (
  `books_id` int,
  `tags_id` int,
  PRIMARY KEY (`books_id`, `tags_id`)
);

ALTER TABLE `books_tags` ADD FOREIGN KEY (`books_id`) REFERENCES `books` (`id`);

ALTER TABLE `books_tags` ADD FOREIGN KEY (`tags_id`) REFERENCES `tags` (`id`);
```
