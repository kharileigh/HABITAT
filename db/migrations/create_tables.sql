DROP TABLE IF EXISTS plants;
DROP TABLE IF EXISTS trackers;
DROP TABLE IF EXISTS users;

CREATE TABLE plants(
    plantId serial PRIMARY KEY,
    plant_name varchar(50) NOT NULL
);

CREATE TABLE users(
    usersId serial PRIMARY KEY,
    username varchar(50) NOT NULL,
    password varchar(50) NOT NULL,
    name varchar(50) NOT NULL
);

CREATE TABLE trackers(
    id serial PRIMARY KEY,
    habits varchar(50) NOT NULL,
    count INT NOT NULL,
    habit_date DATE,
    usersId int,
    FOREIGN KEY(usersId) REFERENCES users(usersId),
    plantId int,
    FOREIGN KEY(plantId) REFERENCES plants(plantId)
);
