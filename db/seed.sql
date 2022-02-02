INSERT INTO department (name)
VALUES ("Finance"),
("IT"),
("Sales"),;

INSERT INTO role (title, salary, deparment_id)
VALUES ("Account Recievables", 22.50, 1),
("Accounts Payable", 23.50, 1),
("Finance Assistant", 21.22, 1),
("IT Manager", 30.10, 2),
("Sales Manager", 24.50, 3),
("Sales Assistant", 18.80, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jen","Reynolds", 1, 1),
("Jen","Reynolds", 1, 2),
("Mike","Wazowski", 2, 3),
("James","Sulivan", 3, 1),
("Edna","Mode", 3, 4),
("Simba","King", 2, 6),
("Mufasa","Lyon", 2, 6);

