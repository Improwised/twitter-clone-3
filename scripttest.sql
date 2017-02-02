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
-- Name: follower_id_seq; Type: SEQUENCE; Schema: public; Owner: hemangi
--

CREATE SEQUENCE follower_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE follower_id_seq OWNER TO hemangi;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: follower; Type: TABLE; Schema: public; Owner: hemangi
--

CREATE TABLE follower (
    login_user_id integer,
    follower_id integer,
    id integer DEFAULT nextval('follower_id_seq'::regclass) NOT NULL
);


ALTER TABLE follower OWNER TO hemangi;

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

--
-- Name: tweet; Type: TABLE; Schema: public; Owner: hemangi
--

CREATE TABLE tweet (
    userid integer,
    tweet character varying(140),
    "time" timestamp without time zone DEFAULT now(),
    id integer DEFAULT nextval('tweet_id_seq'::regclass) NOT NULL,
    imagetweet text
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
    username text,
    mobilenumber text,
    email text,
    password text,
    image text,
    user_id integer DEFAULT nextval('users_id_seq'::regclass) NOT NULL
);


ALTER TABLE users OWNER TO hemangi;

--
-- Data for Name: follower; Type: TABLE DATA; Schema: public; Owner: hemangi
--

COPY follower (login_user_id, follower_id, id) FROM stdin;
\.


--
-- Name: follower_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hemangi
--

SELECT pg_catalog.setval('follower_id_seq', 48, true);


--
-- Data for Name: tweet; Type: TABLE DATA; Schema: public; Owner: hemangi
--

COPY tweet (userid, tweet, "time", id, imagetweet) FROM stdin;
\.


--
-- Name: tweet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hemangi
--

SELECT pg_catalog.setval('tweet_id_seq', 45, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: hemangi
--

COPY users (username, mobilenumber, email, password, image, user_id) FROM stdin;
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hemangi
--

SELECT pg_catalog.setval('users_id_seq', 24, true);


--
-- Name: follower follower_pkey; Type: CONSTRAINT; Schema: public; Owner: hemangi
--

ALTER TABLE ONLY follower
    ADD CONSTRAINT follower_pkey PRIMARY KEY (id);


--
-- Name: tweet tweet_pkey; Type: CONSTRAINT; Schema: public; Owner: hemangi
--

ALTER TABLE ONLY tweet
    ADD CONSTRAINT tweet_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: hemangi
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- PostgreSQL database dump complete
--

