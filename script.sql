--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- Name: tweet_id_seq; Type: SEQUENCE; Schema: public; Owner: hemangi
--

CREATE SEQUENCE tweet_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tweet_id_seq OWNER TO hemangi;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: tweet; Type: TABLE; Schema: public; Owner: hemangi
--

CREATE TABLE tweet (
    id integer DEFAULT nextval('tweet_id_seq'::regclass) NOT NULL,
    userid integer,
    tweet character varying(140),
    "time" timestamp without time zone DEFAULT now()
);


ALTER TABLE tweet OWNER TO hemangi;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: hemangi
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO hemangi;

--
-- Name: users; Type: TABLE; Schema: public; Owner: hemangi
--

CREATE TABLE users (
    id integer DEFAULT nextval('users_id_seq'::regclass) NOT NULL,
    username text,
    mobilenumber integer,
    email text,
    password text
);


ALTER TABLE users OWNER TO hemangi;

--
-- Data for Name: tweet; Type: TABLE DATA; Schema: public; Owner: hemangi
--

COPY tweet (id, userid, tweet, "time") FROM stdin;
20	2	cccccccc	2017-01-23 12:24:13.095342
21	1	444444444	2017-01-23 12:24:51.578085
22	3	xxyyyzzzz	2017-01-23 12:25:45.586938
\.


--
-- Name: tweet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hemangi
--

SELECT pg_catalog.setval('tweet_id_seq', 22, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: hemangi
--

COPY users (id, username, mobilenumber, email, password) FROM stdin;
1	abc	332	abc@abc.com	123
2	xyz	454	x@x.com	12
3	hemangi	4545	hemangi@improwised.com	34
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hemangi
--

SELECT pg_catalog.setval('users_id_seq', 3, true);


--
-- Name: tweet tweet_pkey; Type: CONSTRAINT; Schema: public; Owner: hemangi
--

ALTER TABLE ONLY tweet
    ADD CONSTRAINT tweet_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

