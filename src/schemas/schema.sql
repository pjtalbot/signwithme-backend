


CREATE TABLE "gifs" (
    "id"  SERIAL  NOT NULL,
    "giphy_id" text   NOT NULL,
    "url" text   NOT NULL,
    "count" int,
    "creator" text   NOT NULL
);