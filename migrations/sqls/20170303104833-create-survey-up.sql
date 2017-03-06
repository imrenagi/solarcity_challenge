/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS ages (
	id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
	name VARCHAR(255) NOT NULL
);

INSERT INTO ages (name) values ('Below 20');
INSERT INTO ages (name) values ('Between 20 and 29');
INSERT INTO ages (name) values ('Between 30 and 34');
INSERT INTO ages (name) values ('Between 35 and 39');
INSERT INTO ages (name) values ('Between 40 and 49');
INSERT INTO ages (name) values ('Under 50');

CREATE TABLE IF NOT EXISTS survey (
	id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	age INT UNSIGNED NOT NULL,
	sex TINYINT NOT NULL,
	address VARCHAR(255) NOT NULL,
	interested TINYINT DEFAULT 0 NOT NULL,
	reason TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE survey  ADD FOREIGN KEY (age) REFERENCES ages(id);