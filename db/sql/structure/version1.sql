DROP TABLE IF EXISTS games_words;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS words;

CREATE TABLE IF NOT EXISTS words
(
  id uuid NOT NULL,
  word character varying(100) NOT NULL,
  grade integer NOT NULL,
  difficulty integer NOT NULL,
  do_transform boolean NOT NULL DEFAULT true,
  CONSTRAINT words_pk PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);

CREATE TABLE IF NOT EXISTS users
(
   id uuid NOT NULL,
   user_name character varying(250) NOT NULL,
   active boolean NOT NULL DEFAULT true,
   CONSTRAINT users_pk PRIMARY KEY (id),
   CONSTRAINT user_name_uniq UNIQUE (user_name)
)
WITH (
  OIDS = FALSE
)
;

CREATE TABLE IF NOT EXISTS games
(
   id uuid NOT NULL,
   user_id uuid NOT NULL,
   in_progress boolean NOT NULL DEFAULT true,
   start_time timestamp with time zone NOT NULL DEFAULT now(),
   end_time timestamp with time zone,
   min_level smallint NOT NULL,
   max_level smallint NOT NULL,
   CONSTRAINT games_pk PRIMARY KEY (id),
   CONSTRAINT user_games_fk FOREIGN KEY (user_id) REFERENCES public.users (id) ON UPDATE CASCADE ON DELETE CASCADE
)
;

CREATE TABLE IF NOT EXISTS games_words
(
    game_id uuid NOT NULL,
    word_id uuid NOT NULL,
    status character varying(250) NOT NULL,
    attempts smallint NOT NULL,
    elapsed_time smallint NOT NULL,
    CONSTRAINT games_games_word_fk FOREIGN KEY (game_id) REFERENCES public.games (id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT words_games_word_fk FOREIGN KEY (word_id) REFERENCES public.words (id) ON UPDATE CASCADE ON DELETE CASCADE
)
;
