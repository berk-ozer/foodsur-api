DROP TABLE IF EXISTS dietary_restrictions CASCADE;
CREATE TABLE dietary_restrictions (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);
