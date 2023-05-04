CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- DROP TABLE tg_bot
CREATE TABLE tg_bot(
	id uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
	telegram_user_id bigInt,
	message text,
	message_date timestamp,
	future_message_date timestamp,
	status text
)
GRANT ALL ON test TO lang_user


SELECT * FROM pg_timezone_names where name like '%Moscow%';
SET TIME ZONE 'Europe/Moscow';
ALTER DATABASE tg_bot SET timezone TO 'Europe/Moscow';