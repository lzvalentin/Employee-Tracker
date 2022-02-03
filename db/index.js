const connection = require('./connection')

class DB {
    constructor(connection){
        this.connection = connection
    }

    findAllDepartments(){
        return this.connection.promise().query('SELECT * FROM department;')
    }

    //job title, role id, the department that role belongs to, and the salary for that role
    roleInfo(){
        return this.connection.promise().query('SELECT role.title, role.id, department.name, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;')
    }
}

module.exports = new DB(connection)