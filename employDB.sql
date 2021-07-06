DROP DATABASE IF EXISTS employDB;
CREATE database employDB;

USE employDB;

CREATE TABLE department (
  id INT NOT NULL,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE emp_role (
  id INT NOT NULL,
  title VARCHAR(30) NULL,
  salary DECIMAL(5,3) NULL,
  dept_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL,
  PRIMARY KEY (id)
);