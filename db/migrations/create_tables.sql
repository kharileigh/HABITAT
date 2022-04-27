/* if this table exists DROP IT when setting the database up */
DROP TABLE IF EXISTS plants;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS events;

/* creating plants table */
CREATE TABLE plants(
    plantId serial PRIMARY KEY,
    plant_name varchar(255) NOT NULL,
    nickname varchar(255) NOT NULL,
    frequency INT NOT NULL,
    count INT not NULL,
    updatedOn timestamp default CURRENT_TIMESTAMP not null
);

/* function for updating the current TIME for updatedOn WHEN a change is made in that row */
CREATE OR REPLACE FUNCTION update_updatedOn_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updatedOn = now(); 
   RETURN NEW;
END;
$$ language 'plpgsql';

/* trigger for when it updates a row - update the updatedOn time to NOW (now()) for each row? might need to change it */
CREATE TRIGGER update_plants_updatedOn BEFORE UPDATE
ON plants FOR EACH ROW EXECUTE PROCEDURE 
update_updatedOn_column();

/* users table - standard stuff */
CREATE TABLE users(
    userId serial PRIMARY KEY,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    name varchar(255) NOT NULL
);

/* the holy grail - connects all tables together as an EVENT */
CREATE TABLE events(
    id serial PRIMARY KEY,
    plantId int,
    FOREIGN KEY(plantId) REFERENCES plants(plantId) ON UPDATE CASCADE,
    userId int,
    FOREIGN KEY(userId) REFERENCES users(userId) ON UPDATE CASCADE
);