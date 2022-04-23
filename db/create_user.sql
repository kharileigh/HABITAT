DROP TABLE IF EXISTS User;

CREATE TABLE User (
    id serial PRIMARY KEY,
    username varchar(50) NOT NULL,
    pass varchar(50) NOT NULL
);