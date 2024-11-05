
/*
create database Artesanato

=========================

/* Create table tbl_Produto(
 Id int Identity(1,1) Primary Key,
 Nome varchar(100),
 Descricao varchar(100),
 Imagem VARCHAR(255),
 Preco money ); 
 --ImagemURL NVARCHAR(255)  -- Coluna para armazenar a URL da imagem --Imagem  VARBINARY (MAX),
);

==============================

create table tbl_Artesao(
    Id int Identity(1,1) Primary Key,
    Nome VARCHAR(100),
    Cidade VARCHAR(100),
    RG VARCHAR(20),
    CPF VARCHAR(11),
    Email VARCHAR(100),
    Telefone VARCHAR(20),
    Endereco VARCHAR(200),
    Idade INT
);	

==============================

create table tbl_Cadastro(
Id int primary key Identity(1,1) not null,
Nome varchar(100) not null,
Telefone  varchar(100) not null,
Senha varchar(100) not null
);

CREATE TABLE tbl_Cadastro (
    Id int PRIMARY KEY IDENTITY(1,1) NOT NULL,
    Nome varchar(100) NOT NULL,
    Telefone varchar(100) NOT NULL,
    Senha varchar(100) NOT NULL,
    ResetToken varchar(255) NULL,
    ResetTokenExpiration datetime NULL
);

*/


