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