INSERT INTO plants (plant_name, nickname, frequency, count)
VALUES
(
    'Snake Plant',
    'Jeffrey',
    10,
    5
),
(
    'Pothos',
    'Adonis',
    20,
    3
),
(
    'Aloe Vera',
    'Bruh',
    4,
    2
),
(
    'Philodendron Green',
    'Oof',
    5,
    2
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

INSERT INTO events (plantId, userid)
VALUES (3, 2), (2, 3);