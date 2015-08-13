CREATE TABLE users
(
    Id int NOT NULL auto_increment primary key,
	username VARCHAR(30) NOT NULL,
	password VARCHAR(30) NOT NULL
);

CREATE TABLE conversation
(
    Id int NOT NULL auto_increment primary key,
	user_one int(15),
	user_two int(15),
	ip VARCHAR(30),
	time int(11),
	status int(11)
);

CREATE TABLE conversation_reply
(
    Id int NOT NULL auto_increment primary key,
    reply TEXT,
    conversation_Id int NOT NULL,
    user_Id int,
    FOREIGN KEY (conversation_Id) REFERENCES conversation(Id),
    FOREIGN KEY (user_Id) REFERENCES users(Id),
    ip VARCHAR(30),
    time int(11),
    status int(11) 
);

