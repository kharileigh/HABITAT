INSERT INTO plants (plant_name, nickname, frequency, count, updatedOn)
VALUES
(
    'Snake Plant',
    'Jeffrey',
    10,
    5,
    '2022-03-25'
),
(
    'Pothos',
    'Adonis',
    20,
    3,
    '2022-04-21'
),
(
    'Aloe Vera',
    'Bruh',
    4,
    2,
    '2022-04-27'
),
(
    'Philodendron Green',
    'Oof',
    5,
    2,
    '2022-04-25'
);

INSERT INTO user_account (user_name, user_password, user_email)
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
    'robyn',
    '$2y$12$Nu9OPRgbeYDS1BIuLJIYmuYMSyUMNj6nyBUHuDBEll5VGPUMW8Iwe',
    'robyn@outlook.com'
);

/* giving myself admin role */
INSERT INTO user_account (
    user_name,
    user_password,
    user_email,
    user_role
) VALUES (
    'onur',
    '$2y$12$Nu9OPRgbeYDS1BIuLFIYmuYMSyUMNj6nyBUHuDBEll5VGPUMW8Iwe',
    NULL,
    'admin'
);

INSERT INTO events (plantId, userId)
VALUES (3, 2), (2, 3);