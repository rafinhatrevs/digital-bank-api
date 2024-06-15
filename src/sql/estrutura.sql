CREATE DATABASE digital_bank;

CREATE TABLE contas (
	id serial primary key,
    nome varchar NOT NULL,
    cpf varchar(11) NOT NULL UNIQUE,
    data_nascimento date NOT NULL,
    telefone varchar NOT NULL,
    email varchar NOT NULL UNIQUE,
    senha varchar(6) NOT NULL
);

CREATE TABLE depositos (
	id serial primary key,
    valor integer NOT NULL,
    conta_id integer NOT NULL references contas(id)
);

CREATE TABLE saques (
	id serial primary key,
    valor integer NOT NULL,
    conta_id integer NOT NULL references contas(id)
);

CREATE TABLE transferencias (
	id serial primary key,
    valor integer NOT NULL,
    conta_origem_id integer NOT NULL references contas(id),
    conta_destino_id integer NOT NULL references contas(id)
);

ALTER TABLE contas
ADD saldo NUMERIC DEFAULT 0;

ALTER TABLE contas
ALTER COLUMN senha TYPE VARCHAR;

ALTER TABLE contas
ADD saldo integer;




