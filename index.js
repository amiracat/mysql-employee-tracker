const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
// const connec = require('./connection');
const util = require('util');

// const Sequelize = require('sequelize');
// require('dotenv').config();


const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'employDB',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to employDB');
  runPrompt();
});

//in process - testing

const runPrompt = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
        'View all employees',
        'View departments',
        'View roles',
        'Add department',
        'Add role',
        'Add employee',
        'Update employee role',
        'Exit'
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all employees':
          viewAllEmp();
          break;

        case 'View departments':
          viewDept();
          break;

        case 'View roles':
          viewRoles();
          break;

        case 'Add department':
          addDept();
          break;

        case 'Add role':
          addRole();
          break;

        case 'Add employee':
          addEmployee();
          break;

        case 'Update employee role':
          updateEmpRole();
          break;

        case 'Exit':
          connection.end();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

const viewAllEmp = () => {
    console.log('\nVIEW ALL EMPLOYEES\n');
    const query = 'SELECT * FROM employee';
    // 'SELECT employee.id,employee.first_name,employee.last_name,emp_role.title,emp_role.salary FROM employee INNER JOIN emp_role ON employee.role_id=emp_role.role_id';
  // const query = 'SELECT employee.id,employee.first_name,employee.last_name FROM employee RIGHT JOIN emp_role.title,emp_role.salary FROM emp_role RIGHT JOIN department.name FROM department';
  connection.query(query, (err, res) => {
    if (err) throw err;
    let employeeArray = [];
    res.forEach(employee => employeeArray.push(employee));
    console.log('\n');
    console.table(employeeArray);
    console.log('\n\n');
  });
  runPrompt();
};

const viewDept = () => {
  console.log('\nVIEW DEPARTMENTS\n');
  const query = 'SELECT * FROM department';
connection.query(query, (err, res) => {
  if (err) throw err;
  let deptArray = [];
  res.forEach(department => deptArray.push(department));
  console.log('\n');
  console.table(deptArray);
  console.log('\n\n');
});
runPrompt();
};

const viewRoles = () => {
  console.log('\nVIEW ROLES\n');
  const query = 'SELECT * FROM emp_role';
connection.query(query, (err, res) => {
  if (err) throw err;
  let rolesArray = [];
  res.forEach(emp_role => rolesArray.push(emp_role));
  console.log('\n');
  console.table(rolesArray);
  console.log('\n\n');
});
runPrompt();
};


const addDept = () => {
  inquirer
    .prompt([{
        name: 'new_dept_name',
        type: 'input',
        message: 'What is the name of the new department?'
      },
      {
        name: 'new_dept_id',
        type: 'input',
        message: 'What is the ID of the new department?'
      },
    ])
    .then((answer) => {
      const query =
        'INSERT INTO department (id,name) VALUES(prompt.new_dept_name,prompt.new_dept_id)';

      console.log(
        `New department has been added!`
      );
      runPrompt();
    });
};

const addRole = () => {
  inquirer
    .prompt([{
        name: 'new_role_title',
        type: 'input',
        message: 'What is the title of the new role?'
      },
      {
        name: 'new_role_id',
        type: 'input',
        message: 'What is the ID of the new role?'
      },
      {
        name: 'new_role_salary',
        type: 'input',
        message: 'What is the salary of the new role?'
      },
    ])
    .then((answer) => {
      const query =
        'INSERT INTO emp_role (id,title,salary) VALUES(prompt.new_role_id,prompt.new_role_title,prompt.new_role_salary)';

      console.log(
        `New role added!`
      );
      // });
      runPrompt();
    });
  // });
};

const addEmployee = () => {
  inquirer
    .prompt([{
        name: 'new_emp_first_name',
        type: 'input',
        message: 'What is the first name of the new employee?'
      },
      {
        name: 'new_emp_last_name',
        type: 'input',
        message: 'What is the last name of the new employee?'
      },
      {
        name: 'new_emp_id',
        type: 'input',
        message: 'What is the ID of the new employee?'
      },
      {
        name: 'new_emp_role',
        type: 'input',
        message: 'What is the role of the new employee?'
      },
    ])
    .then((answer) => {
      const query =
        'INSERT INTO employee (id,first_name,last_name) VALUES(prompt.new_emp_id,prompt.new_emp_first_name,prompt.new_emp_last_name)';

      console.log(
        `New employee added!`
      );
      runPrompt();
    });
};

const updateEmpRole = () => {
  inquirer
    .prompt(
      // {
      //   name: 'updated_emp',
      //   type: 'list',
      //   message: 'Select the employee whose role you want to update:',
      //   choices: //list employees as choices
      // },
      {
        name: 'update_role_first_name',
        type: 'input',
        message: 'What is the first name of the employee whose role you want to update?',
      }, {
        name: 'update_role_last_name',
        type: 'input',
        message: 'What is the last name of the employee whose role you want to update?',
      }, {
        name: 'update_role_title',
        type: 'input',
        message: 'What is the updated role for this employee?',
      })
    .then((answer) => {
      const query =
        'INSERT INTO employee (id,first_name,last_name) VALUES(prompt.new_emp_id,prompt.new_emp_first_name,prompt.new_emp_last_name)';

      console.log(
        `Employee's role has been updated!`
      );
      runPrompt();
    });
};