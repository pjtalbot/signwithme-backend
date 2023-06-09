DROP DATABASE IF EXISTS roller;


CREATE DATABASE roller;

DROP TABLE IF EXISTS "users" CASCADE;
DROP TABLE IF EXISTS "rooms" CASCADE;
DROP TABLE IF EXISTS "user_room" CASCADE;
DROP TABLE IF EXISTS "character_room" CASCADE;
DROP TABLE IF EXISTS "characters" CASCADE;
DROP TABLE IF EXISTS "images" CASCADE;
DROP TABLE IF EXISTS "cards" CASCADE;

-- \c signwithme;

CREATE TABLE "gifs" (
    "id"  SERIAL  NOT NULL,
    "giphy_id" text   NOT NULL,
    "url" text   NOT NULL,
    "count" int,
    "creator" text   NOT NULL
);