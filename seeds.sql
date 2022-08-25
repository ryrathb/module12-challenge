INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Greg', 'Abraham', 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Ryan', 'Rathbun', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Ryan', 'Raad', 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Malachi', 'Daniels', 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Kai', 'Walsh', 5, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Cody', 'Wheeler', 6, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Alex', 'Ramirez', 6, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Mathew', 'Saper', 7, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jarod', 'Boginske', 7, 2);

INSERT INTO department (department_name)
VALUES ('Big Picture');
INSERT INTO department (department_name)
VALUES ('Day to Day');
INSERT INTO department (department_name)
VALUES ('Finance');
INSERT INTO department (department_name)
VALUES ('Organization');
INSERT INTO department (department_name)
VALUES ('New Member Development');
INSERT INTO department (department_name)
VALUES ('Recruitment');
INSERT INTO department (department_name)
VALUES ('Social');

INSERT INTO role (title, salary, department_id)
VALUES ('Commander', 120000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ('Lieutenant Commander', 80000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ('Treasurer', 90000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ('Recorder', 40000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ('Marshal', 75000, 5);
INSERT INTO role (title, salary, department_id)
VALUES ('Recruitment Chairmen', 250000, 6);
INSERT INTO role (title, salary, department_id)
VALUES ('Social Chairmen', 125000, 7);