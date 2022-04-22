SET
    TIMEZONE = 'Asia/Singapore';

CREATE TABLE IF NOT EXISTS accounts (
    email VARCHAR PRIMARY KEY,
    password VARCHAR NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    account_id VARCHAR NOT NULL,
    setup_completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS profiles (
    profile_id VARCHAR PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR NOT NULL,
    account_id VARCHAR NOT NULL
);

CREATE TABLE feed_types(type VARCHAR PRIMARY KEY);

INSERT INTO
    feed_types(type)
VALUES
    ('milk'),
    ('solids'),
    ('others');

CREATE TABLE IF NOT EXISTS feeds (
    id VARCHAR PRIMARY KEY,
    feed_type VARCHAR REFERENCES feed_types(type) NOT NULL,
    amount INT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    profile_id VARCHAR NOT NULL,
    CONSTRAINT profile_id FOREIGN KEY(profile_id) REFERENCES profiles(profile_id) ON DELETE
    SET
        NULL
);

CREATE TABLE diaper_change_reasons(reason VARCHAR PRIMARY KEY);

INSERT INTO
    diaper_change_reasons(reason)
VALUES
    ('pee'),
    ('poop'),
    ('others');

CREATE TABLE poop_sizes(size VARCHAR PRIMARY KEY);

INSERT INTO
    poop_sizes(size)
VALUES
    ('small'),
    ('medium'),
    ('large');

CREATE TABLE IF NOT EXISTS diaper_changes (
    id VARCHAR PRIMARY KEY,
    reason VARCHAR REFERENCES diaper_change_reasons(reason) NOT NULL,
    size VARCHAR REFERENCES poop_sizes(size),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    profile_id VARCHAR NOT NULL,
    CONSTRAINT profile_id FOREIGN KEY(profile_id) REFERENCES profiles(profile_id) ON DELETE
    SET
        NULL
);

CREATE TABLE IF NOT EXISTS sleep (
    id VARCHAR PRIMARY KEY,
    duration INT NOT NULL,
    notes TEXT,
    sleep_start VARCHAR NOT NULL,
    sleep_end VARCHAR NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    profile_id VARCHAR NOT NULL,
    CONSTRAINT profile_id FOREIGN KEY(profile_id) REFERENCES profiles(profile_id) ON DELETE
    SET
        NULL
);

CREATE TABLE IF NOT EXISTS milestones_list(
    milestone_id SERIAL PRIMARY KEY,
    week int NOT NULL,
    tag VARCHAR NOT NULL,
    milestone_description VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS milestones(
    id VARCHAR PRIMARY KEY,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    milestone_id INT NOT NULL,
    CONSTRAINT milestone_id FOREIGN KEY(milestone_id) REFERENCES milestones_list(milestone_id) ON DELETE
    SET
        NULL,
        profile_id VARCHAR NOT NULL,
        CONSTRAINT profile_id FOREIGN KEY(profile_id) REFERENCES profiles(profile_id) ON DELETE
    SET
        NULL
);

INSERT INTO
    milestones_list (week, tag, milestone_description)
VALUES
    (1, 'newborn', 'recognize your voice'),
    (2, 'newborn', 'focus on objects 20-30cm away'),
    (3, 'newborn', 'snuggles close to you'),
    (4, 'newborn', 'makes cooing sounds'),
    (5, '1 Month', 'smoother body motions'),
    (6, '1 Month', 'first smile'),
    (
        7,
        '1 Month',
        'prefers 3d bright color objects to flat black and white ones'
    ),
    (8, '1 Month', 'tummy time with head lift'),
    (
        9,
        '2 Month',
        'shows an interest in hearing you talk, replies with cooing'
    ),
    (
        10,
        '2 Month',
        'recognises familiar faces -smiles when you go close or wiggles with excitement'
    ),
    (
        11,
        '2 Month',
        'develops an interest in playing with you'
    ),
    (
        12,
        '2 Month',
        'experiments with hands - bring their hands together, look at their hands or put hands in mouth'
    ),
    (13, '3 Month', 'first laugh'),
    (13, '3 Month', 'first chuckle'),
    (13, '3 Month', 'first babble'),
    (
        14,
        '3 Month',
        'shows interest in multi-textured toys, bright colors, anything which makes sounds'
    ),
    (15, '3 Month', 'first roll, back to front'),
    (15, '3 Month', 'first roll, front to back'),
    (
        16,
        '3 Month',
        'gets stronger by the day, requests for more tummy time'
    ),
    (
        17,
        '4 Month',
        'entertains themselves by making noises or blowing raspberries'
    ),
    (
        17,
        '4 Month',
        'laugh when you tickle their belly'
    ),
    (17, '4 Month', 'mimic your sounds'),
    (17, '4 Month', 'makes eye contact with you'),
    (
        18,
        '4 Month',
        'able to start playing with themselves on their own using their eyes and hands'
    ),
    (19, '4 Month', 'first word! Says daa daa'),
    (
        20,
        '4 Month',
        'smile when seeing their own reflection'
    ),
    (
        20,
        '4 Month',
        'displays some distinct personality traits'
    ),
    (
        21,
        '5 Month',
        'spinning and sprawling on the floor, turns their direction to get a new view'
    ),
    (
        22,
        '5 Month',
        'puts everything they can grab into their mouth'
    ),
    (
        23,
        '5 Month',
        'experiment with different positions - sitting, bouncing and standing on your lap'
    ),
    (
        24,
        '5 Month',
        'recognise words, familiar sounds - names, yes/no, hello, bye-bye'
    ),
    (25, '6 Month', 'first assisted sit!'),
    (26, '6 Month', 'smiles at strangers'),
    (
        27,
        '6 Month',
        'drops toys on the floor - to learn about cause and effect'
    ),
    (28, '6 Month', 'first clap!'),
    (28, '6 Month', 'first soft solid food!'),
    (
        28,
        '6 Month',
        'start feeding themselves with their hands'
    ),
    (29, '7 Month', 'plays peek-a-boo'),
    (30, '7 Month', 'first crawl!'),
    (31, '7 Month', 'learns how to use pincer grip'),
    (
        32,
        '7 Month',
        'leans against furniture with their hands free'
    ),
    (
        33,
        '8 Month',
        'develop preference for things they like and do not like'
    ),
    (
        34,
        '8 Month',
        'learns to pull themselves up to kneeling / standing position'
    ),
    (
        35,
        '8 Month',
        'develops an interest in words / reading books'
    ),
    (
        36,
        '8 Month',
        'remember how to play with a toy
        after
            showing it to them once'
    ),
    (37, '9 Month', 'more curious by the day'),
    (
        38,
        '9 Month',
        'being inquisitive - throws their toys
            and books around'
    ),
    (
        39,
        '9 Month',
        'sticks everything they pick up into their mouth'
    ),
    (
        40,
        '9 Month',
        'starts to watch
            and imitate you'
    ),
    (
        41,
        '10 Month',
        'loves reading the same book,
            seeing the same images,
            hearing the same words'
    ),
    (
        42,
        '10 Month',
        'discovers new
            and faster ways to move'
    ),
    (
        43,
        '10 Month',
        'loves playing hide
            and seek with you - learns object permanence'
    ),
    (
        44,
        '10 Month',
        'loves moving around to explore places around the house'
    ),
    (
        45,
        '11 Month',
        'shows interest in feeding themselves with a spoon'
    ),
    (
        46,
        '11 Month',
        'shows off their newfound independence - develop their own opinions
            and express themselves'
    ),
    (
        47,
        '11 Month',
        'strong desires to move more,
            dislikes sitting for long'
    ),
    (
        48,
        '11 Month',
        'first steps ! supported walking while holding furniture'
    ),
    (
        49,
        '12 Month',
        'maybe anxious around strangers - newfound independence develops insecurity'
    ),
    (50, '12 Month', 'falls asleep on their own'),
    (
        50,
        '12 Month',
        'Says Mama
            and Dada'
    ),
    (
        51,
        '12 Month',
        'learns to grab multiple things using their body while their hands are full'
    ),
    (52, '12 Month', 'HAPPY 1 YEAR OLD!');