DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
    id serial PRIMARY KEY,
    username varchar(50) NOT NULL,
    pass varchar(50) NOT NULL
);