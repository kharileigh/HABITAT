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

INSERT INTO users (username, password, name)
VALUES
(
    'Eluent',
    'Bruh123',
    'Onur'
),
(
    'goodvibes',
    'Vibes123',
    'Khari'  
),
(
    'ILovePlants',
    'Plant123',
    'Libby'
),
(
    'sffsaj1',
    'ILoveConstruction123',
    'Robyn'
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