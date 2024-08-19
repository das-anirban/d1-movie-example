-- Migration number: 0001 	 2024-08-19T05:10:50.263Z

-- table movie
--  - id
--  - title
--  - release date
--  - rating (1-5)

DROP TABLE IF EXISTS movies;
CREATE TABLE movies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  release_date TEXT NOT NULL,
  rating INTEGER NOT NULL
);