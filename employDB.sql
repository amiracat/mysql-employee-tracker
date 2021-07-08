DROP DATABASE IF EXISTS employDB;
CREATE database employDB;

USE employDB;

CREATE TABLE department (
  dept_id INT NOT NULL,
  name VARCHAR(30) NULL,
  PRIMARY KEY (dept_id)
);

CREATE TABLE emp_role (
  role_id INT NOT NULL,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2) NULL,
  dept_id INT NOT NULL,
  PRIMARY KEY (role_id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL,
  PRIMARY KEY (id)
);

SELECT * FROM department;
SELECT * FROM emp_role;
SELECT * FROM employee;

INSERT INTO department (id, name)
VALUES (15, "Marketing"), (16, "IT"), (17, "Admin"), (18, "Accounting");

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Michelle", "Johnson", 12, 77), ("Emma", "Mathews", 11, 77), ("Clare", "Abdallah", 13, 77), ("Mary", "Russell", 14, 77);

INSERT INTO emp_role (role_id, title, salary, dept_id)
VALUES (12, "Manager", 130000, 150), (11, "Tech Lead", 115000, 751), (13, "Office Manager", 70000, 222), (14, "Accountant", 100000, 915);