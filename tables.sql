CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username varchar(255),
  email varchar(255),
  password varchar(255)
);

CREATE TABLE IF NOT EXISTS songs (
  id SERIAL PRIMARY KEY,
  user_id int REFERENCES users(id),
  name varchar(255),
  composer varchar(255),
  description varchar(255),
  image varchar(255),
  lyrics varchar(255)
);

CREATE TABLE IF NOT EXISTS tabs (
  tabnum SERIAL PRIMARY KEY,
  song_id int REFERENCES songs(id),
  user_id int REFERENCES users(id),
  arranger varchar(255),
  link varchar(255),
  youtube varchar(255)
);