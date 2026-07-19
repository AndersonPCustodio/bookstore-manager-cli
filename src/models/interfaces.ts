// 1. Modelo de Autor (Mapeia a tabela 'autores')
export interface Autor {
  id?: number;
  nome: string;
  nacionalidade: string;
}

// 2. Modelo de Livro (Mapeia a tabela 'livros')
export interface Livro {
  id?: number;
  titulo: string;
  autor_id: number;
  quantidade_disponivel: number;
}

// 3. Modelo de Cliente (Mapeia a tabela 'clientes')
export interface Cliente {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
}

// 4. Modelo de Empréstimo (Mapeia a tabela 'emprestimos')
export interface Emprestimo {
  id?: number;
  cliente_id: number;
  livro_id: number;
  data_emprestimo?: Date;
  data_devolucao?: Date | null;
  status: 'ATIVO' | 'DEVOLVIDO';
}
