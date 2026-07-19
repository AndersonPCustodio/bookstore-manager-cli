-- 1. Tabela de Autores
CREATE TABLE IF NOT EXISTS autores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    nacionalidade VARCHAR(100) NOT NULL
);

-- 2. Tabela de Livros
CREATE TABLE IF NOT EXISTS livros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    autor_id INT NOT NULL,
    quantidade_disponivel INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_autor FOREIGN KEY (autor_id) REFERENCES autores(id) ON DELETE CASCADE,
    CONSTRAINT chk_quantidade CHECK (quantidade_disponivel >= 0)
);

-- 3. Tabela de Clientes
CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telefone VARCHAR(20) NOT NULL
);

-- 4. Tabela de Empréstimos
CREATE TABLE IF NOT EXISTS emprestimos (
    id SERIAL PRIMARY KEY,
    cliente_id INT NOT NULL,
    livro_id INT NOT NULL,
    data_emprestimo TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_devolucao TIMESTAMP,
    status VARCHAR(20) NOT NULL DEFAULT 'ATIVO',
    CONSTRAINT fk_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
    CONSTRAINT fk_livro FOREIGN KEY (livro_id) REFERENCES livros(id) ON DELETE CASCADE
);
