DROP TABLE IF EXISTS Tracker;

CREATE TABLE Tracker (
    id serial PRIMARY KEY,
    habit varchar(50) NOT NULL,
    count INT NOT NULL,
    habit_date DATE,
    FOREIGN KEY(userId) REFERENCES User(id),
    FOREIGN KEY(plantId) REFERENCES Plant(id)
);