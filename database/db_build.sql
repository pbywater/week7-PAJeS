BEGIN;

DROP TABLE IF EXISTS users, blogPosts CASCADE;

CREATE TABLE users (
id SERIAL PRIMARY KEY NOT NULL,
username VARCHAR(30) UNIQUE NOT NULL,
password VARCHAR(30) NOT NULL
);

CREATE TABLE blogPosts (
id SERIAL PRIMARY KEY NOT NULL,
title VARCHAR(50) NOT NULL,
body VARCHAR(50000) UNIQUE NOT NULL,
username INTEGER REFERENCES users(id)
);


INSERT INTO users(username, password) VALUES
('Joey', 'pigeon'),
('Philippa', 'otter'),
('Akin', 'ardvark'),
('Samatar', 'prayingmantis')
RETURNING ID;

INSERT INTO blogPosts(title, body, username) VALUES
('Pigeons are the cutest', 'I really think pigeons have the prettiest toes. They are the best. The end', 1),
('Otters are obviously better', 'Clearly otters are better. They are just so cute and fun to watch', 2),
('Ardvarks are insanely cool', 'You guys are really stupid. Ardvarks are the best animal in the whole entire world. Ever', 3),
('Praying Mantises are dreamy', 'Literally all they do is pray. It is pretty cool to watch and you guys are all wrong', 4)
RETURNING ID;

COMMIT;
