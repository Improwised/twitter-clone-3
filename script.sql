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

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: follower; Type: TABLE; Schema: public; Owner: parita
--

CREATE TABLE follower (
    id integer NOT NULL,
    login_user_id integer,
    follower_id integer
);


ALTER TABLE follower OWNER TO parita;

--
-- Name: untitled_table_id_seq; Type: SEQUENCE; Schema: public; Owner: parita
--

CREATE SEQUENCE untitled_table_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE untitled_table_id_seq OWNER TO parita;

--
-- Name: untitled_table_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: parita
--

ALTER SEQUENCE untitled_table_id_seq OWNED BY follower.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: parita
--

CREATE TABLE users (
    id integer NOT NULL,
    username text,
    mobilenumber integer,
    email text,
    password text
);


ALTER TABLE users OWNER TO parita;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: parita
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO parita;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: parita
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: follower id; Type: DEFAULT; Schema: public; Owner: parita
--

ALTER TABLE ONLY follower ALTER COLUMN id SET DEFAULT nextval('untitled_table_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: parita
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Data for Name: follower; Type: TABLE DATA; Schema: public; Owner: parita
--

COPY follower (id, login_user_id, follower_id) FROM stdin;
\.


--
-- Name: untitled_table_id_seq; Type: SEQUENCE SET; Schema: public; Owner: parita
--

SELECT pg_catalog.setval('untitled_table_id_seq', 1, false);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: parita
--

COPY users (id, username, mobilenumber, email, password) FROM stdin;
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: parita
--

SELECT pg_catalog.setval('users_id_seq', 1, false);


--
-- Name: follower untitled_table_pkey; Type: CONSTRAINT; Schema: public; Owner: parita
--

ALTER TABLE ONLY follower
    ADD CONSTRAINT untitled_table_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: parita
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

