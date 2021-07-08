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
  password: 'CocoLilyBenny',
  database: 'employDB',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to employDB');
  runPrompt();
});

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
          console.log('\n\n');
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
  const query = 'SELECT * FROM department';
  connection.query(query, (err, res) => {
    if (err) throw err;
    let deptArray = [];
    res.forEach(department => deptArray.push(department));
    console.log('\n');
    console.log('\nVIEW DEPARTMENTS\n');
    console.table(deptArray);
    console.log('\n\n');
  });
  runPrompt();
};

const viewRoles = () => {
  
  const query = 'SELECT * FROM emp_role';
  connection.query(query, (err, res) => {
    if (err) throw err;
    let rolesArray = [];
    res.forEach(emp_role => rolesArray.push(emp_role));
    console.log('\n');
    console.log('\nVIEW ROLES\n');
    console.table(rolesArray);
    console.log('\n\n');
  });
  runPrompt();
};


const addDept = () => {
  inquirer
    .prompt([{
        name: 'name',
        type: 'input',
        message: 'What is the name of the new department?'
      },
      {
        name: 'dept_id',
        type: 'input',
        message: 'What is the ID of the new department?'
      },
    ])
    .then((answer) => {
      connection.query(
        'INSERT INTO department SET ?', {
          name: answer.name,
          dept_id: answer.dept_id
        },
      )

      console.log(
        `\n${answer.name} department added!\n`
      );
      runPrompt();
    });
};

const addRole = () => {
  inquirer
    .prompt([{
        name: 'title',
        type: 'input',
        message: 'What is the title of the new role?'
      },
      {
        name: 'role_id',
        type: 'input',
        message: 'What is the ID of the new role?'
      },
      {
        name: 'salary',
        type: 'input',
        message: 'What is the salary of the new role?'
      },
    ])
    .then((answer) => {
      connection.query(
        'INSERT INTO emp_role SET ?', {
          title: answer.title,
          salary: answer.salary,
          role_id: answer.role_id
        },
      )
      console.log(
        `${answer.title} role added!`
      );
      runPrompt();
    });
};

const addEmployee = () => {
  inquirer
    .prompt([{
        name: 'first_name',
        type: 'input',
        message: 'What is the first name of the new employee?'
      },
      {
        name: 'last_name',
        type: 'input',
        message: 'What is the last name of the new employee?'
      },
      {
        name: 'id',
        type: 'input',
        message: 'What is the ID of the new employee?'
      },
      {
        name: 'role',
        type: 'input',
        message: 'What is the role of the new employee?'
      },
    ])
    .then((answer) => {
      connection.query(
        'INSERT INTO employee SET ?', {
          id: answer.id,
          first_name: answer.first_name,
          last_name: answer.last_name
        },
      )
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
      //   name: 'update_employee',
      //   type: 'list',
      //   message: 'Select the employee whose role you want to update:',
      //   choices: //list employees as choices
      // },
      {
        name: 'first_name',
        type: 'input',
        message: 'What is the first name of the employee whose role you want to update?',
      }, {
        name: 'last_name',
        type: 'input',
        message: 'What is the last name of the employee whose role you want to update?',
      }, {
        name: 'title',
        type: 'input',
        message: 'What is the updated role for this employee?',
      })
    .then((answer) => {
      connection.query(
        'UPDATE employee SET ? WHERE ?', {
          first_name: employee.first_name,
          last_name: employee.last_name
        },
      )
      console.log(
        `Employee's role has been updated!\n`
      );
      runPrompt();
    });
};