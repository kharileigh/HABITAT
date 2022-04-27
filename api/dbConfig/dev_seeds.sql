INSERT INTO plants (plant_name, nickname, frequency, count, updatedOn)
VALUES
(
    'Snake Plant',
    'Jeffrey',
    10,
    5,
    '2022-04-20 12:05:06'
),
(
    'Pothos',
    'Adonis',
    20,
    3,
    '2022-04-21 13:05:06'
),
(
    'Aloe Vera',
    'Bruh',
    4,
    2,
    '2022-04-27 10:05:06'
),
(
    'Philodendron Green',
    'Oof'
    5,
    2,
    '2022-04-25 11:05:06'
);

INSERT INTO users (user_name, user_password, user_email)
VALUES
(
    'Eluent',
    '$2y$12$Nu9OPRgbeYDS1BIuLFIYmuYMSyUMNj6nyBUHuDBEll5VGPUMW8Iwe',
    'onur@outlook.com'
),
(
    'goodvibes',
    '$2y$12$Nu9OPRgbeYDS1BIuLOEYmuYMSyUMNj6nyBUHuDBEll5VGPUMW8Iwe',
    'khari@outlook.com'  
),
(
    'ILovePlants',
    '$2y$12$Nu9OPRgbeYDS1BIuLBIYmuYMSyUMNj6nyBUHuDBEll5VGPUMW8Iwe',
    'libby@outlook.com'
),
(
    'sffsaj1',
    '$2y$12$Nu9OPRgbeYDS1BIuLJIYmuYMSyUMNj6nyBUHuDBEll5VGPUMW8Iwe',
    'robyn@outlook.com'
);

INSERT INTO events (plantId, habitId, userId)
VALUES (3, 3, 2), (2, 1, 3);