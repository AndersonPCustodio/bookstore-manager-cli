import { pool } from '../database/connection';
import { Emprestimo } from '../models/interfaces';

export class EmprestimoRepository {
  async criar(clienteId: number, livroId: number): Promise<Emprestimo> {
    const query = `
      INSERT INTO emprestimos (cliente_id, livro_id, status)
      VALUES ($1, $2, 'ATIVO')
      RETURNING *;
    `;
    const resultado = await pool.query(query, [clienteId, livroId]);
    return resultado.rows[0];
  }

  async buscarAtivoPorId(id: number): Promise<Emprestimo | null> {
    const query = "SELECT * FROM emprestimos WHERE id = $1 AND status = 'ATIVO';";
    const resultado = await pool.query(query, [id]);
    if (resultado.rows.length === 0) return null;
    return resultado.rows[0];
  }

  async registrarDevolucao(id: number): Promise<void> {
    const query = `
      UPDATE emprestimos 
      SET status = 'DEVOLVIDO', data_devolucao = CURRENT_TIMESTAMP 
      WHERE id = $1;
    `;
    await pool.query(query, [id]);
  }

  async listarAtivosDetalhados(): Promise<any[]> {
    const query = `
      SELECT e.id, c.nome as cliente, l.titulo as livro, e.data_emprestimo, e.status
      FROM emprestimos e
      INNER JOIN clientes c ON e.cliente_id = c.id
      INNER JOIN livros l ON e.livro_id = l.id
      WHERE e.status = 'ATIVO'
      ORDER BY e.data_emprestimo DESC;
    `;
    const resultado = await pool.query(query);
    return resultado.rows;
  }
}
