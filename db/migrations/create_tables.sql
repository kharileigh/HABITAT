/* if this table exists DROP IT when setting the database up */
DROP TABLE IF EXISTS plants;
DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS events;

/* creating plants table */
CREATE TABLE plants(
    plantid serial PRIMARY KEY,
    plant_name varchar(255) NOT NULL,
    nickname varchar(255) NOT NULL,
    frequency INT NOT NULL,
    count INT default 0,
    updatedon timestamp default CURRENT_TIMESTAMP not null
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

/* creates citext posgresql extension for user table */
CREATE EXTENSION IF NOT EXISTS citext;
/* creates email column for user - regrex for characters below before @ - after @ */
CREATE DOMAIN email AS citext
  CHECK ( value ~* '^[a-z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$' );

/* gives a role type to users - either admin or user */
CREATE TYPE user_role_type AS ENUM ('admin', 'user');

CREATE TABLE IF NOT EXISTS user_account (
    userid SERIAL PRIMARY KEY,
    name varchar(50),
    user_name citext 
      CONSTRAINT duplicate_username UNIQUE
      CONSTRAINT username_length CHECK (LENGTH(user_name) BETWEEN 3 AND 30),
    user_password varchar(100),
    user_email email
      CONSTRAINT duplicate_email UNIQUE,
    user_role user_role_type DEFAULT 'user'
);

/* the holy grail - connects all tables together as an EVENT */
CREATE TABLE events(
    id serial PRIMARY KEY,
    plantid int,
    FOREIGN KEY(plantid) REFERENCES plants(plantid) ON UPDATE CASCADE,
    userid int,
    FOREIGN KEY(userid) REFERENCES user_account(userid) ON UPDATE CASCADE
);