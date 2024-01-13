CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(50),
    password VARCHAR(100),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    birthday DATE
    
);

