DROP TABLE IF EXISTS plants;
DROP TABLE IF EXISTS trackers;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS event;

CREATE TABLE plants(
    plantId serial PRIMARY KEY,
    plant_name varchar(255) NOT NULL,
    nickname varchar(255) NOT NULL
);

CREATE TABLE users(
    userId serial PRIMARY KEY,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    name varchar(255) NOT NULL
);

CREATE TABLE habits(
    habitId serial PRIMARY KEY,
    habit varchar(255) NOT NULL,
    count INT NOT NULL,
    frequency INT NOT NULL,
    created_on timestamp default CURRENT_TIMESTAMP not null
);

CREATE TABLE events(
    id serial PRIMARY KEY,
    plantId int,
    FOREIGN KEY(plantId) REFERENCES plants(plantId) ON UPDATE CASCADE,
    habitId int,
    FOREIGN KEY(habitId) REFERENCES habits(habitId) ON UPDATE CASCADE,
    userId int,
    FOREIGN KEY(userId) REFERENCES users(userId) ON UPDATE CASCADE
);