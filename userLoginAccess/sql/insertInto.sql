CREATE USER 'linkie'@'localhost' IDENTIFIED BY 'Linkie';
GRANT SELECT, INSERT, UPDATE ON `users`.* TO 'user_one'@'localhost';


INSERT INTO `users` (username, password) VALUES('Linkie', 546543);