const inquirer = require('inquirer');
require('console.table')
const db = require('./db')

userOptions()


function userOptions() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: "Select from the options listed.",
            choices: ["View all departments", "View all Roles", "View All Employees", "Add Department", "Add a role", "Add an employee", "Update Employee Role", "Quit"]

        }
    ]).then((res) => {
        switch (res.options) {
            case "View all departments":
                viewAllDepartments()
                break;
            case "View all Roles":
                viewRoles()
                break;
        }
    })
}

function viewAllDepartments() {
    db.findAllDepartments().then(([depts]) => {
        console.table(depts)
    }).then(() => userOptions())
}

function viewRoles() {
    db.roleInfo().then(([roles]) => {
        console.table(roles)
    }).then(() => userOptions())
}


function addDept() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: "Name of new department"
        }
    ])
}

function addRole() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'roletitle',
            message: "What is the title of new role?"
        },
        {
            type: 'number',
            name: 'salary',
            message: "What is the salary for this role?"
        },
        {
            type: 'number',
            name: 'deptid',
            message: "What is the role's department ID?"
        }
    ])
}

function addEmployee() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "First name of new employee"
        },
        {
            type: 'input',
            name: 'LastName',
            message: "Last name of new employee"
        },
        {
            type: 'number',
            name: 'roleID',
            message: "What is the role ID?"
        },
        {
            type: 'number',
            name: 'managerID',
            message: "What is the manager's ID?"
        }

    ])
}

function updateEmp() {
    return inquirer.prompt([
        {
            name: 'employeeSelection',
            message: 'Select employee to update via ID',
            type: 'number'
        },
        {
            name: 'newRole',
            message: 'What is their new role ID?',
            type: 'number'
        },
        {
            name: 'managerSelection',
            message: "What is their new manager's employee ID",
            type: 'number'
        },
        {
            name: 'newDep',
            message: 'What is their new department ID?',
            type: 'number'
        },
    ]);
}

// function deleteDept(){
//     return inquirer.prompt([
//         {
//             type:
//             name:
//             message:
//         }
//     ])
// }
// function deleteRole(){
//     return inquirer.prompt([
//         {
//             type:
//             name:
//             message:
//         }
//     ])}
// function deleteEmp(){
//     return inquirer.prompt([
//         {
//             type:
//             name:
//             message:
//         }
//     ])}