INSERT INTO
    accounts (
        email,
        password,
        first_name,
        last_name,
        account_id,
        setup_completed
    )
VALUES
    (
        'papabear@email.com',
        '213a007af01b018f2104b75f534f03ae031db8cf4e7eeef6f6b0d1a2a68e213ef9fe0a774b311e4c08f1488fe029e67e39bc8422a15609d2b593576abd3dc9af',
        'Papa',
        'Bear',
        'papabear_acc_id',
        'true'
    );

INSERT INTO
    profiles (
        profile_id,
        first_name,
        last_name,
        date_of_birth,
        gender,
        account_id
    )
VALUES
    (
        'brown_bear_profile_id',
        'Brown',
        'Bear',
        '2022-04-01',
        'male',
        'papabear_acc_id'
    );

INSERT INTO
    feeds (id, feed_type, amount, notes, profile_id)
VALUES
    (
        'feed_id_1',
        'milk',
        '100',
        'Breakfast',
        'brown_bear_profile_id'
    ),
    (
        'feed_id_2',
        'solids',
        '0',
        'Lunch - Apple sauce puree',
        'brown_bear_profile_id'
    );

INSERT INTO
    diaper_changes (id, reason, size, notes, profile_id)
VALUES
    (
        'diaper_change_id_1',
        'pee',
        'large',
        'Leaked out of diapers',
        'brown_bear_profile_id'
    ),
    (
        'diaper_change_id_2',
        'poop',
        'small',
        'Poop is mushy',
        'brown_bear_profile_id'
    );

INSERT INTO
    sleep (
        id,
        duration,
        notes,
        sleep_start,
        sleep_end,
        profile_id
    )
VALUES
    (
        'sleep_id_1',
        '60',
        'Morning nap',
        '2022-04-10 11:00:00.000 +0800',
        '2022-04-10 12:00:00.000 +0800',
        'brown_bear_profile_id'
    );