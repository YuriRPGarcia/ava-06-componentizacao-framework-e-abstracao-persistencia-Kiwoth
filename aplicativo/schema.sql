DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS produtos;

CREATE TABLE usuarios (
  id        INTEGER     NOT NULL PRIMARY KEY AUTOINCREMENT,
  nome      VARCHAR(20) NOT NULL,
  sobrenome VARCHAR(20)     NULL
);

CREATE TABLE produtos (
  id        INTEGER     NOT NULL PRIMARY KEY AUTOINCREMENT,
  descricao VARCHAR(40) NOT NULL,
  preco     REAL        NOT NULL
);

INSERT INTO usuarios (nome, sobrenome)
VALUES ('Ricardo', 'Pereira');

INSERT INTO usuarios (nome, sobrenome)
VALUES ('Eduardo', 'Silveira');

INSERT INTO usuarios (nome, sobrenome)
VALUES ('Renata', 'Lopes');

INSERT INTO produtos (descricao, preco)
VALUES ('Feijão Carioc 1kg KICALDO', 7.99);

INSERT INTO produtos (descricao, preco)
VALUES ('Arroz Agulhinha 1kg QUALITÁ', 4.99);

INSERT INTO produtos (descricao, preco)
VALUES ('Lentilha 500g YOKI', 13.49);