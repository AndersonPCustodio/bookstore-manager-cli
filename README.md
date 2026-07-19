# 📚 BookStore Manager CLI

> 🔗 **Repositório Oficial no GitHub:** [https://github.com/AndersonPCustodio/bookstore-manager-cli.git](https://github.com/AndersonPCustodio/bookstore-manager-cli.git)

Um sistema de gerenciamento de livraria robusto, operado via interface de linha de comando (CLI), desenvolvido em **TypeScript** e **Node.js**, utilizando o **PostgreSQL** como banco de dados relacional através de consultas SQL puras.

---

## 🏗️ Arquitetura do Projeto

O sistema foi rigorosamente estruturado seguindo o padrão de **Arquitetura em Camadas** (Multi-tier Architecture), garantindo o princípio da responsabilidade única e a separação estrita de conceitos:

- **`src/models/`**: Definição das interfaces e tipagens estáticas estritas do TypeScript.
- **`src/database/`**: Configuração da conexão pool com o PostgreSQL e scripts de migração DDL.
- **`src/repositories/`**: Camada de persistência contendo exclusivamente instruções SQL nativas (`INSERT`, `SELECT`, `UPDATE`, `DELETE`).
- **`src/services/`**: Camada central contendo todas as regras de negócio, validações cruzadas e tratamento de erros.
- **`src/controllers/`**: Controle do fluxo de dados e orquestração de entradas/saídas do terminal.
- **`src/menus/`**: Interfaces visuais e menus interativos de navegação da CLI.
- **`src/main.ts`**: Ponto de partida limpo da aplicação.

---

## ⚡ Regras de Negócio e Validações Implementadas

### 👥 Módulo de Clientes
- Cadastro completo (CRUD).
- Validação estrutural de formato de e-mail por Expressão Regular (Regex).
- Garantia de e-mail único em nível de aplicação e banco de dados.
- **Trava de Integridade:** Bloqueio rígido na exclusão de clientes que possuem empréstimos ativos pendentes.

### ✍️ Módulo de Autores
- Cadastro completo (CRUD).
- **Trava de Integridade:** Bloqueio na exclusão de autores que possuem livros vinculados cadastrados no acervo (`ON DELETE RESTRICT`), impedindo a deleção indesejada em cascata.

### 📚 Módulo de Livros
- Cadastro completo (CRUD).
- Validação cruzada para impedir o vínculo de livros a autores inexistentes.
- Listagem dinâmica enriquecida via `INNER JOIN` para exibição dos dados dos autores.
- **Trava de Integridade:** Bloqueio na exclusão de livros com unidades atualmente emprestadas.

### 💳 Módulo de Empréstimos e Devoluções
- **Controle de Estoque Rígido:** Validação que impede a realização de empréstimos caso a quantidade disponível do livro seja igual a zero.
- Decremento automático (`-1`) no estoque do livro ao efetivar um empréstimo.
- Incremento automático (`+1`) no estoque e alteração do status para `DEVOLVIDO` ao registrar a devolução.
- Histórico visual detalhado com cruzamento de dados de múltiplas tabelas.

### 📊 Painel de Relatórios Avançados
- Ranking dos livros mais emprestados através de consultas com agrupamento e funções de agregação (`GROUP BY` e `COUNT`).
- Histórico de vida completo de transações por ID de cliente.
- Listagem preditiva de livros indisponíveis (estoque zerado) para controle de reposição.

---

## 🛠️ Tecnologias Utilizadas

- **TypeScript** (Tipagem estática e segurança de código)
- **Node.js** (Ambiente de execução)
- **ts-node-dev** (Compilação em tempo de execução com live reload)
- **pg (node-postgres)** (Cliente nativo do PostgreSQL para execução de SQL puro)
- **readline-sync** (Captura interativa e síncrona de entradas no terminal)
- **dotenv** (Isolamento de credenciais em variáveis de ambiente)

---

## 🚀 Como Executar o Projeto

1. Certifique-se de ter o **Node.js** e o **PostgreSQL** instalados em sua máquina.
2. Clone o repositório e acesse a pasta raiz.
3. Instale as dependências do projeto:
   ```bash
   npm install
   ```
4. Crie um arquivo `.env` na raiz do projeto seguindo a estrutura de credenciais do seu banco local:
   ```env
   DB_USER=seu_usuario
   DB_HOST=localhost
   DB_DATABASE=bookstore_db
   DB_PASSWORD=sua_senha
   DB_PORT=5432
   ```
5. Execute as queries do arquivo `src/database/schema.sql` na ferramenta de gerenciamento do seu banco de dados (como o pgAdmin) para criar as tabelas e restrições.
6. Inicie a aplicação no modo de desenvolvimento:
   ```bash
   npm run dev
   ```
