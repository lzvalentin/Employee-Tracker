// const { response } = require('express');
const inquirer = require('inquirer');
require('console.table')
const mysql = require('mysql');
const divider = '---------------------------------'
require('dotenv').config();

// connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.MYSQL_PASSWORD,
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

// first view of options
function userOptions() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: "Select from the options listed.",
            choices:
                [
                    {
                        name: "View all Departments",
                        value: "viewAllDepartments"
                    },
                    {
                        name: "View all Roles",
                        value: "viewRoles"
                    },
                    {
                        name: "View all Employees",
                        value: "viewEmployees"
                    },
                    {
                        name: "Add a Department",
                        value: "addDepartment"
                    },
                    {
                        name: "Add a Role",
                        value: "addRole"
                    },
                    {
                        name: "Add an Employee",
                        value: "addEmployee"
                    },
                    {
                        name: "Update an Existing Employee Role",
                        value: "updateEmployeeRole"
                    }
                ]
         }
    ]).then((res) => {
        switch (res.options) {
            case "View all Departments":
                viewAllDepartments()
                break;
            case "View all Roles":
                viewRoles()
                break;
            case 'View all Employees':
                viewEmployees()
                break;
            case 'Add a Department':
                addDepartment()
                break;
            case 'Add a Role':
                addRole()
                break;
            case 'Add an Employee':
                addEmployee()
                break;
            case 'Update an Existing Employee Role':
                updateEmployeeRole()
                break;
            default:
                exit ()
        }
    })
}

const viewAllDepartments = () => {
    db.query(`SELECT * FROM department`, (err, data) => {
        if (err) {
            throw err
        } else {
            console.log(divider)
            console.table(data);
            userOptions();
        }
    })
}

const viewRoles = () => {
    db.query(`SELECT * FROM role`, (err, data) => {
        if (err) {
            throw err
        } else {
            console.log(divider)
            console.table(data);
            userOptions();
        }
    })
}



const addDepartment = () => {
    inquirer.prompt({
        name: 'department',
        message: 'Please provide the name of the new department.'
    }).then(function (response) {
        db.query(`INSERT INTO department (department_name) VALUES (?)`, response.department, (err, data) => {
            if (err) {
                throw err
            }
            else {
                // console.table(data)
                userOptions();
            }
        })
    },
    )
}

const addRole = () => {
    db.query(`SELECT * FROM department`, (err, result) => {
        if (err) throw err
        inquirer.prompt([
            {
                type: "input",
                name: 'title',
                message: 'Please provide the title.'
            },
            {
                type: "input",
                name: 'salary',
                message: 'Please provide the salary.'
            },
            {
                type: "list",
                name: 'departmentName',
                message: 'Please select the department name.',
                choices() {
                    const departmentArray = [];
                    result.forEach(({ department_name }) => {
                        departmentArray.push(department_name)
                    })
                    return departmentArray;
                },
            },
        ])
            .then(response => {
                db.query(`SELECT id FROM department WHERE department_name=?`, response.departmentName, (err, data) => {
                    if (err) {
                        throw err
                    } else {
                        let dep = JSON.stringify(data[0].id)
                        db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [response.title, response.salary, dep], (err) => {
                            if (err) {
                                throw err
                            } else {
                                userOptions();
                            }
                        }
                        )
                    }
                }
                )
            })
    })
}

const addEmployee=() => {
    db.query(`SELECT * FROM role`, (err, result) => {
        if (err) throw err
        inquirer.prompt([
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
            type: "list",
            name: 'title',
            message: "Please select the new employee's title.",
            choices() {
                const roleArray = [];
                result.forEach(({ title }) => {
                    roleArray.push(title)
                })
                return roleArray;
            }
        },
    ]).then(response => {
        db.query(`SELECT id FROM role WHERE title=?`, response.title, (err, results) => {
            if (err) {
                throw err
            } else {
                let title = JSON.stringify(results[0].id)
                db.query(`SELECT * FROM employee`, (err, data) => {
                    if (err) throw err;
                    inquirer.prompt([{
                        type: 'list',
                        name: "manager",
                        message: "Select the new employee's manager.",
                        choices() {
                            const managerArray = ['none'];
                            data.forEach(({ first_name, last_name }) => {
                                managerArray.push(`${first_name} ${last_name}`)
                            })
                            return managerArray;
                        }
                    }
                    ])
                        .then(answer => {
                            db.query(`SELECT id FROM employee WHERE CONCAT (first_name," ",last_name) = ?`, answer.manager, (err, data) => {
                                if (err) {
                                    throw err
                                } else {
                                    if (answer.manager !== 'none') {
                                        manager = JSON.stringify(data[0].id)
                                    } else {
                                        manager = null
                                    }
                                }
                                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [response.firstName, response.lastName, title, manager], (err) => {
                                    if (err) {
                                        throw err
                                    } else {
                                       userOptions();
                                    }
                                }
                                )
                            })
                        })
                })
            }
        }
        )
    })
})
}


const updateEmployeeRole= () => {
    db.query(`SELECT * FROM employee`, (err, result) => {
        if (err) throw err
        inquirer.prompt([
            {
                type: "list",
                name: 'employee',
                message: "Please select the employee you wish to change.",
                choices() {
                    const employeeArray = [];
                    result.forEach(({ first_name, last_name }) => {
                        employeeArray.push(`${first_name} ${last_name}`)
                    })
                    return employeeArray;
                }
            },
        ]).then (response => {
            db.query(`SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name)=?`, response.employee, (err, results) => {
                if (err) {
                    throw err
                } else {
                    let employeeID = JSON.stringify(results[0].id)
                    db.query(`SELECT * FROM role`, (err, data) => {
                        if (err) throw err;
                        inquirer.prompt([{
                            type: 'list',
                            name: "roleID",
                            message: "What's the employee's new role?",
                            choices() {
                                const roleArray = [];
                                data.forEach(({ title }) => {
                                    roleArray.push(title)
                                })
                                return roleArray;
                            }
                        }
                        ])
                            .then(answer => {
                                db.query(`SELECT id FROM role WHERE title = ?`, answer.roleID, (err, data) => {
                                    if (err) {
                                        throw err
                                    } else {
                                        let roleIdentification = JSON.stringify(data[0].id)
                                    db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [roleIdentification, employeeID], (err) => {
                                    if (err) {
                                        throw err
                                    } else {
                                        viewEmployees();
                                        userOptions();
                                    }
                                }
                                )}
                                })
                    })
                })
        }
            }
)
})
})

}
const exit = () => {
    console.log('Thanks for using the app')
    process.exit();
}

userOptions();