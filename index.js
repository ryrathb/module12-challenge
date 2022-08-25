//Grabbing dependencies
import { promisify } from 'util';
import { createConnection } from 'mysql';
import { prompt } from 'inquirer';



//Creation of the connection to the MySQL workbench
let config = createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Kaylee1@6163',
    database: 'employee_db'
});

config.query = promisify(config.query);

config.connect(function (error) {
    if (error) {
        throw error;
    }
    initialAction();
})

console.table(
    "\n------ Business Organizer ------\n"
)

const initialAction = async () => {
    try {
        let response = await prompt({
            name: 'action',
            type: 'list',
            message: 'What do you want to do?',
            choices: [
                'View Employees',
                'View Departments',
                'View Roles',
                'Add Employees',
                'Add Departments',
                'Add Roles',
                'Update Employee Role',
                'End Application'
            ]
        });
        switch (response.action) {
            case 'View Employees':
                employeeDisplay();
                break;

            case 'View Departments':
                departmentDisplay();
                break;

            case 'View Roles':
                roleDisplay();
                break;

            case 'Add Employees':
                employeeAdd();
                break;

            case 'Add Departments':
                departmentAdd();
                break;

            case 'Add Roles':
                roleAdd();
                break;

            case 'Update Employee Role':
                employeeUpdate();
                break;

            case 'End Application': 
                config.end();
                break;
        };
    } catch (error) {
        console.log(error);
        initialAction();
    };
}

const employeeDisplay = async () => {
    console.log('Employees');
    try {
        let query = 'SELECT * FROM employee';
        config.query(query, function (error, res) {
            if (error) {
                throw error;
            }
            let emplArray = [];
            res.forEach(employee => emplArray.push(employee));
            console.log(emplArray);
            initialAction();
        });
    } catch (error) {
        console.log(error);
        initialAction();
    };
}

const departmentDisplay = async () => {
    console.log('Departments');
    try {
        let query = 'SELECT * FROM department';
        config.query(query, function (error, res) {
            if (error) {
                throw error;
            }
            let depArray = [];
            res.forEach(department => depArray.push(department));
            console.log(depArray);
            initialAction();
        });
    } catch (error) {
        console.log(error);
        initialAction();
    };
}

const roleDisplay = async () => {
    console.log('Roles');
    try {
        let query = 'SELECT * FROM role';
        config.query(query, function (error, res) {
            if (error) {
                throw error;
            }
            let roArray = [];
            res.forEach(role => roArray.push(role));
            console.log(roArray);
            initialAction();
        });
    } catch (error) {
        console.log(error);
        initialAction();
    };
}

const employeeAdd = async () => {
    try {
        console.log('Add Employees');
        let managers = await config.query("SELECT * FROM employee");
        let roles = await config.query("SELECT * FROM roles");
        let solution = await prompt([
            {
                name: 'firstName',
                type: 'input',
                message: 'What is the Employees first name?'
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'What is the Employees last name?'
            },
            {
                name: 'RoleIDEmployee',
                type: 'list',
                choices: roles.map((role) => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                }),
                message: 'What is the role ID of the Employee?'
            },
            {
                name: 'ManagerIDEmployee',
                type: 'list',
                choices: managers.map((manager) => {
                    return {
                        name: manager.firt_name + " " + manager.last_name,
                        value: manager.id
                    }
                }),
                message: 'What is the ID of the Employees Manager?'
            }
        ])

        let response = await config.query("INSERT INTO employee SET ?", {
            first_name: solution.firstName,
            last_name: solution.lastName,
            role_id: (solution.RoleIDEmployee),
            manager_id: (solution.ManagerIDEmployee)
        });

        console.log(`${solution.firstName} ${solution.lastName} added impecably!!!!!\n`);
        initialAction();
    } catch (error) {
        console.log(error);
        initialAction();
    };
}

const departmentAdd = async () => {
    try {
        console.log('Add Departments');
        let solution = await prompt([
            {
                name: 'departmentName',
                type: 'input',
                message: 'What is the name you have come up with for your new department?'
            }
        ]);

        let response = await config.query("INSERT INTO department SET ?", {
            department_name: solution.departmentName
        });

        console.log(`${solution.departmentName} is a new department and it has been added to the database!!!!!\n`);
        initialAction();
    } catch (error) {
        console.log(error);
        initialAction();
    };
}

const roleAdd = async () => {
    try {
        console.log('Add Roles');
        let departments = await config.query("SELECT * FROM department")
        let solution = await prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the name of your new role you wish to add?'
            },
            {
                name: 'salary',
                type: 'input',
                message: "What is the salary of your new role?"
            },
            {
                name: 'departmentID',
                type: 'list',
                choices: departments.map((departmentID) => {
                    return {
                        name: departmentID.department_name,
                        value: departmentID.id
                    }
                }),
                message: 'What department identification number is this role related to?',
            }
        ]);

        let depChoice;
        for (i = 0; i < departments.length; i++) {
            if (departments[i].department_id === solution.choice) {
                depChoice = departments[i];
            };
        }
        let response = await config.query("INSERT INTO role SET ?", {
            title: solution.title,
            salary: solution.salary,
            department_id: solution.departmentID
        })

        console.log(`${solution.title} has been so successfully added that I don't even know what to do!!!!!!\n`);
        initialAction();
    } catch (error) {
        console.log(error);
        initialAction();
    };
}

const employeeUpdate = async () => {
    try {
        console.log('Update Employee');
        let employees = await config.query("SELECT * FROM employee");
        let employeeChoice = await prompt([
            {
                name: 'employee',
                type: 'list',
                choices: employees.map((employeeName) => {
                    return {
                        name: employeeName.first_name + " " + employeeName.last_name,
                        value: employeeName.id
                    }
                }),
                message: 'Choose an employee to update their information'
            }
        ]);
        let roles = await config.query("SELECT * FROM role");
        let roleChoice = await prompt([
            {
                name: 'role',
                type: 'list',
                choices: roles.map((roleName) => {
                    return {
                        name: roleName.title,
                        value: roleName.id
                    }
                }),
                message: "Please select the role so you can update the information"
            }
        ]);

        let response = await config.query("UPDATE employee SET ? WHERE ?", [{ role_id: roleChoice.role }, { id: employeeChoice.employee }]);

        console.log(`The role was successfully updated.\n`);
        initialAction();
    } catch (error) {
        console.log(error);
        initialAction();
    };
}