DROP DATABASE IF EXISTS employDB;
CREATE database employDB;

USE employDB;

CREATE TABLE department (
  dept_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (dept_id)
);

CREATE TABLE emp_role (
  role_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2) NULL,
  dept_id INT,
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