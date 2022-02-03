INSERT INTO department (name)
VALUES ("Accounting"),
 ("Finance"),
("IT"),
("Sales");

INSERT INTO role (title, salary, deparment_id)
VALUES ("Account Payable  Manager", 22.50, 1),
("Accounts Payable Assistant", 23.50, 1),
("Finance Manager", 34.00, 2),
("Finance Assistant", 21.22, 2),
("IT Manager", 30.10, 3),
("IT Assistant", 28.90, 3),
("Sales Manager", 24.50, 4),
("Sales Assistant", 18.80,4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jen","Reynolds", 1, NULL),
("Maria","Ray", 2, 1),
("Mike","Wazowski", 3, NULL),
("James","Sulivan", 4, 3),
("Edna","Mode", 5, NULL),
("Simba","King", 5, 5),
("Mufasa","Lyon", 7, NULL),
("Scarr", "Lyon", 8, 7);

