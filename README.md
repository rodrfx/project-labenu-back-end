CREATE TABLE USER_FULLSTACK (
    id varchar(255) NOT NULL PRIMARY KEY,
    name varchar (255) NOT NULL,
    email varchar (255) NOT NULL,
    password varchar (255) NOT NULL,
    nickname varchar (255) NOT NULL UNIQUE
);

