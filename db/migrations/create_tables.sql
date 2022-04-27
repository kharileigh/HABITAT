/* if this table exists DROP IT when setting the database up */
DROP TABLE IF EXISTS plants;
DROP TABLE IF EXISTS user_account;
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

/* trigger for when it updates a row - update the updatedOn time to NOW (now())  might need to change it */
CREATE TRIGGER update_plants_updatedOn BEFORE UPDATE
ON plants FOR EACH ROW EXECUTE PROCEDURE 
update_updatedOn_column();

/* gives a role type to users - either admin or user */
CREATE TYPE user_role_type AS ENUM ('admin', 'user');

/* citeext - case insensitive - converts the query string and the value of the comparing column to lowercase using LOWER - can use WHERE as you please*/
CREATE TABLE IF NOT EXISTS user_account (
    userId SERIAL PRIMARY KEY,
    user_name citext NOT NULL
      CONSTRAINT duplicate_username UNIQUE
      CONSTRAINT username_length CHECK (LENGTH(user_name) BETWEEN 3 AND 30),
    user_password CHAR(60) NOT NULL,
    user_email email
      CONSTRAINT duplicate_email UNIQUE,
    user_role user_role_type DEFAULT 'user'
);

/* the holy grail - connects all tables together as an EVENT */
CREATE TABLE events(
    id serial PRIMARY KEY,
    plantId int,
    FOREIGN KEY(plantId) REFERENCES plants(plantId) ON UPDATE CASCADE,
    userId int,
    FOREIGN KEY(userId) REFERENCES users(userId) ON UPDATE CASCADE
);