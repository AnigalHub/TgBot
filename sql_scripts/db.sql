CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- DROP TABLE test
CREATE TABLE test(
	id uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
	user_id bigInt,
	message text,
	time bigInt,
	status text
)
GRANT ALL ON test TO lang_user

INSERT INTO test (text) VALUES ('world')

SELECT * FROM test

ALTER TABLE MessagesAndTime RENAME TO messages_and_time
DROP TABLE messages_and_time

SELECT * FROM MessagesAndTime