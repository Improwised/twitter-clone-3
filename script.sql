PGDMP         4    	             u            parita    9.6.1    9.6.1     O           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            P           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            Q           1262    16384    parita    DATABASE     v   CREATE DATABASE parita WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';
    DROP DATABASE parita;
             postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false            R           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    3                        3079    12390    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false            S           0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1            �            1259    16388    registeruser    TABLE     �   CREATE TABLE registeruser (
    id integer NOT NULL,
    username text,
    mobileno integer,
    email text,
    password text
);
     DROP TABLE public.registeruser;
       public         parita    false    3            �            1259    16386    registeruser_id_seq    SEQUENCE     u   CREATE SEQUENCE registeruser_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.registeruser_id_seq;
       public       parita    false    186    3            T           0    0    registeruser_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE registeruser_id_seq OWNED BY registeruser.id;
            public       parita    false    185            �           2604    16391    registeruser id    DEFAULT     d   ALTER TABLE ONLY registeruser ALTER COLUMN id SET DEFAULT nextval('registeruser_id_seq'::regclass);
 >   ALTER TABLE public.registeruser ALTER COLUMN id DROP DEFAULT;
       public       parita    false    186    185    186            L          0    16388    registeruser 
   TABLE DATA               H   COPY registeruser (id, username, mobileno, email, password) FROM stdin;
    public       parita    false    186            U           0    0    registeruser_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('registeruser_id_seq', 1, false);
            public       parita    false    185            �           2606    16396    registeruser registeruser_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY registeruser
    ADD CONSTRAINT registeruser_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.registeruser DROP CONSTRAINT registeruser_pkey;
       public         parita    false    186    186            L      x������ � �     