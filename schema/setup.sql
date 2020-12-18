CREATE EXTENSION pgcrypto;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  username VARCHAR(255) NOT NULL,
  password TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  wins INTEGER,
  losses INTEGER,
  PRIMARY KEY (username, email)
);

DROP TABLE IF EXISTS friends;
CREATE TABLE friends (
  username VARCHAR(255) NOT NULL,
  friend VARCHAR(255) NOT NULL,
  PRIMARY KEY (username, friend) -- Prevent multiple friend entries
);