CREATE EXTENSION pgcrypto;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  username VARCHAR(255) NOT NULL,
  password TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  PRIMARY_KEY (username, email)
);