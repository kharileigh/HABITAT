INSERT INTO plants (plant_name, nickname)
VALUES
(
    'Snake Plant',
    'Jeffrey'
),
(
    'Pothos',
    'Adonis'
),
(
    'Aloe Vera',
    'Bruh'
),
(
    'Philodendron Green',
    'Oof'
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
    '$2y$12$Nu9OPRgbeYDS1BIuLFIYmuYMSyUMNj6nyBUHuDBEll5VGPUMW8Iwe',
    'khari@outlook.com'  
),
(
    'ILovePlants',
    '$2y$12$Nu9OPRgbeYDS1BIuLFIYmuYMSyUMNj6nyBUHuDBEll5VGPUMW8Iwe',
    'libby@outlook.com'
),
(
    'sffsaj1',
    '$2y$12$Nu9OPRgbeYDS1BIuLFIYmuYMSyUMNj6nyBUHuDBEll5VGPUMW8Iwe',
    'robyn@outlook.com'
);

INSERT INTO habits (habit, count, frequency)
VALUES
(
    'water',
    4,
    5,
    ''
),
(
    'repot',
    2,
    6
),
(
    'take plant for a walk',
    6,
    10
),
(
    'make plant greener',
    15,
    20
);

INSERT INTO events (plantId, habitId, userId)
VALUES (3, 3, 2), (2, 1, 3);