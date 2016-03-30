CREATE TABLE public.users
(
   id uuid NOT NULL, 
   user_name character varying(250) NOT NULL, 
   grade character varying(5), 
   min_level smallint NOT NULL DEFAULT 0, 
   max_level smallint NOT NULL DEFAULT 32767, 
   CONSTRAINT users_pk PRIMARY KEY (id)
) 
WITH (
  OIDS = FALSE
)
;

CREATE TABLE public.user_data
(
   id uuid NOT NULL, 
   user_id uuid NOT NULL, 
   user_data jsonb NOT NULL, 
   start_time timestamp with time zone, 
   end_time timestamp with time zone, 
   CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES public.users (id) ON UPDATE NO ACTION ON DELETE NO ACTION, 
   CONSTRAINT user_data_pk PRIMARY KEY (id)
) 
WITH (
  OIDS = FALSE
)
;
