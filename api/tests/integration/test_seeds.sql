TRUNCATE users, plants, trackers, events RESTART IDENTITY;

INSERT INTO users (username, password, name)
VALUES 
(
    'Username 1',
    'Password 1',
    'Test User 1'
),
(
    'Username 2',
    'Password 2',
    'Test User 2'
),
(
    'Username',
    'Password',
    'Test User 3'
);

INSERT INTO plants (plant_name)
VALUES 
('Test Plant 1')
('Test Plant 2')
('Test Plant 3')

INSERT INTO trackers 
VALUES

INSERT INTO events 
VALUES