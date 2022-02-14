CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- DROP TABLE test
CREATE TABLE test(
	id uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
	text text
)
GRANT ALL ON test TO lang_user

INSERT INTO test (text) VALUES ('world')

SELECT * FROM test