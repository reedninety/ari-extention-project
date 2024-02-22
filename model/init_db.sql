--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists eventlist;
SET foreign_key_checks = 1;

--
-- Create Tables
--

CREATE TABLE eventlist(
    id INT NOT NULL AUTO_INCREMENT, 
    eventname VARCHAR(40) not null, 
    location VARCHAR(255) not null,
    date DATETIME NOT NULL,
    PRIMARY KEY (id)
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