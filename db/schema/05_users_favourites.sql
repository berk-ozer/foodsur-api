DROP TABLE IF EXISTS users_favourites CASCADE;
CREATE TABLE users_favourites (
user_id integer REFERENCES users(id),
favourite_id integer REFERENCES favourites(id)
)
