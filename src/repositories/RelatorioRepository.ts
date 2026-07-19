import { pool } from '../database/connection';

export class RelatorioRepository {
  
  // Relatório 1: Livros mais emprestados
  async obterLivrosMaisEmprestados(): Promise<any[]> {
    const query = `
      SELECT l.id, l.titulo, COUNT(e.id) as total_emprestimos
      FROM emprestimos e
      INNER JOIN livros l ON e.livro_id = l.id
      GROUP BY l.id, l.titulo
      ORDER BY total_emprestimos DESC;
    `;
    const resultado = await pool.query(query);
    return resultado.rows;
  }

  // Relatório 2: Histórico completo de empréstimos por cliente (Ativos e Devolvidos)
  async obterHistoricoPorCliente(clienteId: number): Promise<any[]> {
    const query = `
      SELECT e.id as emprestimo_id, l.titulo as livro, e.data_emprestimo, e.data_devolucao, e.status
      FROM emprestimos e
      INNER JOIN livros l ON e.livro_id = l.id
      WHERE e.cliente_id = $1
      ORDER BY e.data_emprestimo DESC;
    `;
    const resultado = await pool.query(query, [clienteId]);
    return resultado.rows;
  }

  // Relatório 3: Livros atualmente sem estoque disponível
  async obterLivrosSemEstoque(): Promise<any[]> {
    const query = `
      SELECT l.id, l.titulo, a.nome as autor, l.quantidade_disponivel
      FROM livros l
      INNER JOIN autores a ON l.autor_id = a.id
      WHERE l.quantidade_disponivel = 0
      ORDER BY l.titulo ASC;
    `;
    const resultado = await pool.query(query);
    return resultado.rows;
  }
}
