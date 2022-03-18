INSERT INTO department (department_name)
VALUES ("Accounting"),
 ("Finance"),
("IT"),
("Sales");

INSERT INTO role (title, salary, deparment_id)
VALUES ("Account Payable  Manager", 100000, 1),
("Accounts Payable Assistant", 45000, 1),
("Finance Manager", 99000, 2),
("Finance Assistant", 60000, 2),
("IT Manager", 115000, 3),
("IT Assistant", 75000, 3),
("Sales Manager", 80000, 4),
("Sales Assistant", 50000,4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jen","Reynolds", 1, NULL),
("Maria","Ray", 2, 1),
("Mike","Wazowski", 3, NULL),
("James","Sulivan", 4, 3),
("Edna","Mode", 5, NULL),
("Simba","King", 6, 5),
("Mufasa","Lyon", 7, NULL),
("Scarr", "Lyon", 8, 7);

