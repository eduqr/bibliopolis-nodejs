```sql
-- students
DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spGetStudents()
BEGIN
  SELECT *
  FROM students;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spGetStudentById(
  IN studentId VARCHAR(10)
)
BEGIN
  SELECT *
  FROM students
  WHERE id = studentId;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spCreateStudent(
	IN studentId VARCHAR(10),
  IN studentName VARCHAR(40),
  IN studentLastname VARCHAR(40),
  IN studentEmail VARCHAR(80),
  IN studentCareerId INT
)
BEGIN
  INSERT INTO
  students (id, name, lastname, email, career_id)
  VALUES (studentId, studentName, studentLastname, studentEmail, studentCareerId);
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spUpdateStudent(
	IN studentId VARCHAR(10),
	IN studentName VARCHAR(40),
	IN studentLastname VARCHAR(40),
	IN studentEmail VARCHAR(80),
	IN studentCareerId INT
)
BEGIN
	UPDATE students
	SET
	name = IF(studentName IS NOT NULL, studentName, name),
	lastname = IF(studentLastname IS NOT NULL, studentLastname, lastname),
	email = IF(studentEmail IS NOT NULL, studentEmail, email),
	career_id = IF(studentCareerId IS NOT NULL, studentCareerId, career_id)
	WHERE id = studentId;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spDeleteStudent(
	IN studentId VARCHAR(10)
)
BEGIN
	DELETE
  FROM students
	WHERE id = studentId;
END$$
DELIMITER ;
```
