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
    expirationdate DATE NOT NULL,
    PRIMARY KEY (id)
    );