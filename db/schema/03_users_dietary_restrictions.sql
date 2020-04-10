DROP TABLE IF EXISTS users_dietary_restrictions CASCADE;
CREATE TABLE users_dietary_restrictions (
user_id integer REFERENCES users(id),
restrictions_id integer REFERENCES dietary_restrictions(id)
)
