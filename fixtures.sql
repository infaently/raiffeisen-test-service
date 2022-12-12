-- random 1k accounts
INSERT INTO account.account (account_id, first_name, last_name, balance)
VALUES (generate_series(1, 1000), md5(random()::text), md5(random()::text), random()*(10000-1));
