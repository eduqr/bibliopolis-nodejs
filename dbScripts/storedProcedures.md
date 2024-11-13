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
CREATE PROCEDURE IF NOT EXISTS spGetStudentByEmail(
  IN StudentEmail VARCHAR(55)
)
BEGIN
  SELECT *
  FROM students
  WHERE email = StudentEmail;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spGetStudentsLoanById(
  IN studentId VARCHAR(10)
)
BEGIN
  SELECT *
  FROM loans
  WHERE student_id = studentId;
END
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

```sql
-- roles
DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spGetRoles()
BEGIN
  SELECT *
  FROM roles;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spGetRoleById(
  IN roleId INT
)
BEGIN
  SELECT *
  FROM roles
  WHERE id = roleId;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spCreateRole(
  IN roleName VARCHAR(40)
)
BEGIN
  INSERT INTO
  roles (name)
  VALUES (roleName);
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spUpdateRole(
  IN roleId INT,
  IN roleName VARCHAR(40)
)
BEGIN
  UPDATE roles
  SET
  name = roleName
  WHERE id = roleId;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spDeleteRole(
  IN roleId INT
)
BEGIN
  DELETE
  FROM roles
  WHERE id = roleId;
END$$
DELIMITER ;
```

```sql
-- loans
DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spGetLoans()
BEGIN
  SELECT *
  FROM loans;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spGetLoanById(
  IN loanId INT
)
BEGIN
  SELECT *
  FROM loans
  WHERE id = loanId;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spGetLoanActive(
  IN studentId VARCHAR(10)
)
BEGIN
  SELECT COUNT(*) AS prestamos_activos
  FROM loans
  WHERE studentId = student_id AND status = 'active';
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spCreateLoan(
  IN startDate DATE,
  IN endDate DATE,
  IN status ENUM ('active', 'expired', 'returned', 'cancelled', 'pending'),
  IN studentId VARCHAR(10),
  IN bookId INT
)
BEGIN
  INSERT INTO
  loans (start_date, end_date, status, student_id, book_id)
  VALUES (startDate, endDate, status, studentId, bookId);
END$$

DELIMITER ;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spUpdateLoan(
  IN loanId INT,
  IN startDate DATE,
  IN endDate DATE,
  IN status ENUM ('active', 'expired', 'returned', 'cancelled', 'pending'),
  IN studentId VARCHAR(10),
  IN bookId INT
)
BEGIN
  UPDATE loans
  SET
  start_date = startDate,
  end_date = endDate,
  status = status,
  student_id = studentId,
  book_id = bookId
  WHERE id = loanId;
END$$

DELIMITER ;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spDeleteLoan(
  IN loanId INT
)
BEGIN
  DELETE
  FROM loans
  WHERE id = loanId;
END$$
DELIMITER ;

```

```sql
--librarians
DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spGetLibrarians()
BEGIN
  SELECT *
  FROM librarians;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spGetLibrarianById(
  IN librarianId INT
)
BEGIN
  SELECT *
  FROM librarians
  WHERE id = librarianId;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spGetLibrarianByEmail(
  IN LibrarianEmail VARCHAR(55)
)
BEGIN
  SELECT *
  FROM librarians
  WHERE email = LibrarianEmail;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spCreateLibrarian(
  IN librarianName VARCHAR(40),
  IN librarianLastname VARCHAR(40),
  IN librarianEmail VARCHAR(80),
  IN roleId INT
)
BEGIN
  INSERT INTO
  librarians (name, lastname, email, rol_id)
  VALUES (librarianName, librarianLastname, librarianEmail, roleId);
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spUpdateLibrarian(
  IN librarianId INT,
  IN librarianName VARCHAR(40),
  IN librarianLastname VARCHAR(40),
  IN librarianEmail VARCHAR(80),
  IN roleId INT
)
BEGIN
  UPDATE librarians
  SET
  name = librarianName,
  lastname = librarianLastname,
  email = librarianEmail,
  rol_id = roleId
  WHERE id = librarianId;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spDeleteLibrarian(
  IN librarianId INT
)
BEGIN
  DELETE
  FROM librarians
  WHERE id = librarianId;
END$$
DELIMITER ;

```

```sql
--editorial
DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spGetEditorials()
BEGIN
  SELECT *
  FROM editorials;
END$$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spGetEditorialById(
  IN editorialId INT
)
BEGIN
  SELECT *
  FROM editorials
  WHERE id = editorialId;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spCreateEditorial(
  IN editorialName VARCHAR(100)
)
BEGIN
  INSERT INTO
  editorials (name)
  VALUES (editorialName);
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spUpdateEditorial(
  IN editorialId INT,
  IN editorialName VARCHAR(100)
)
BEGIN
  UPDATE editorials
  SET
  name = editorialName
  WHERE id = editorialId;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spDeleteEditorial(
  IN editorialId INT
)
BEGIN
  DELETE
  FROM editorials
  WHERE id = editorialId;
END$$
DELIMITER ;
```

```sql
--careers
DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spGetCareers()
BEGIN
  SELECT *
  FROM careers;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spGetCareerById(
  IN careerId INT
)
BEGIN
  SELECT *
  FROM careers
  WHERE id = careerId;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spCreateCareer(
  IN careerName VARCHAR(100)
)
BEGIN
  INSERT INTO
  careers (name)
  VALUES (careerName);
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spUpdateCareer(
  IN careerId INT,
  IN careerName VARCHAR(100)
)
BEGIN
  UPDATE careers
  SET
  name = careerName
  WHERE id = careerId;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spDeleteCareer(
  IN careerId INT
)
BEGIN
  DELETE
  FROM careers
  WHERE id = careerId;
END$$
DELIMITER ;

```

```sql
--books
DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spGetBooks()
BEGIN
  SELECT *
  FROM books;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spGetBookById(
  IN bookId INT
)
BEGIN
  SELECT *
  FROM books
  WHERE id = bookId;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spCreateBook(
  IN bookTitle VARCHAR(200),
  IN bookAuthor VARCHAR(200),
  IN bookISBN VARCHAR(15),
  IN bookUnits INT,
  IN bookImageName VARCHAR(200),
  IN editorialId INT
)
BEGIN
  INSERT INTO
  books (title, author, isbn, units, image_name, editorial_id)
  VALUES (bookTitle, bookAuthor, bookISBN, bookUnits, bookImageName, editorialId);
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spUpdateBook(
  IN bookId INT,
  IN bookTitle VARCHAR(200),
  IN bookAuthor VARCHAR(200),
  IN bookISBN VARCHAR(15),
  IN bookUnits INT,
  IN bookImageName VARCHAR(200),
  IN editorialId INT
)
BEGIN
  UPDATE books
  SET
  title = bookTitle,
  author = bookAuthor,
  isbn = bookISBN,
  units = bookUnits,
  image_name = bookImageName,
  editorial_id = editorialId
  WHERE id = bookId;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS spDeleteBook(
  IN bookId INT
)
BEGIN
  DELETE
  FROM books
  WHERE id = bookId;
END$$
DELIMITER ;
```
