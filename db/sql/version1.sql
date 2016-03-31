CREATE TABLE public.users
(
   id uuid NOT NULL, 
   user_name character varying(250) NOT NULL, 
   CONSTRAINT users_pk PRIMARY KEY (id)
) 
WITH (
  OIDS = FALSE
)
;

CREATE TABLE public.people
(
   id uuid NOT NULL, 
   user_id uuid NOT NULL, 
   person_name character varying(250) NOT NULL, 
   grade character varying(5), 
   min_level smallint NOT NULL DEFAULT 0, 
   max_level smallint NOT NULL DEFAULT 32767, 
   CONSTRAINT user_people_fk FOREIGN KEY (user_id) REFERENCES public.users (id) ON UPDATE CASCADE ON DELETE CASCADE, 
   CONSTRAINT people_pk PRIMARY KEY (id)
) 
WITH (
  OIDS = FALSE
)
;

CREATE TABLE public.people_data
(
   id uuid NOT NULL, 
   person_id uuid NOT NULL, 
   person_data jsonb NOT NULL, 
   start_time timestamp with time zone, 
   end_time timestamp with time zone, 
   CONSTRAINT people_people_data_fk FOREIGN KEY (person_id) REFERENCES public.people (id) ON UPDATE CASCADE ON DELETE CASCADE, 
   CONSTRAINT people_data_pk PRIMARY KEY (id)
) 
WITH (
  OIDS = FALSE
)
;
