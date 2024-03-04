--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists eventlist;
DROP TABLE if exists friendlist;
DROP TABLE if exists users;
SET foreign_key_checks = 1;

--
-- Create Tables
--
CREATE TABLE users(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_firstname VARCHAR(255) NOT NULL,
    user_surname VARCHAR(255) NOT NULL
   
    );
CREATE TABLE eventlist(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    eventname VARCHAR(40) not null, 
    location VARCHAR(255) not null,
    date DATETIME NOT NULL,
    userid INT,
     FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE
    );

CREATE TABLE friendlist(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    firstname VARCHAR(255) not null, 
    lastname VARCHAR(255) not null,
    email VARCHAR(255) unique,
    confirmed BOOLEAN,
    eventid INT NOT NULL,
    FOREIGN KEY (eventid) REFERENCES eventlist(id) ON DELETE CASCADE
    );

