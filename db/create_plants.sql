DROP TABLE IF EXISTS Plants;

CREATE TABLE Plants (
    id serial PRIMARY KEY,
    plant_name varchar(50) NOT NULL
);