import { pool } from '../database/connection';
import { Livro } from '../models/interfaces';

export class LivroRepository {
  async cadastrar(livro: Livro): Promise<Livro> {
    const query = `
      INSERT INTO livros (titulo, autor_id, quantidade_disponivel)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [livro.titulo, livro.autor_id, livro.quantidade_disponivel];
    const resultado = await pool.query(query, values);
    return resultado.rows[0];
  }

  async listarTodos(): Promise<any[]> {
    const query = `
      SELECT l.id, l.titulo, a.nome as autor, l.quantidade_disponivel
      FROM livros l
      INNER JOIN autores a ON l.autor_id = a.id
      ORDER BY l.titulo ASC;
    `;
    const resultado = await pool.query(query);
    return resultado.rows;
  }

  async buscarPorId(id: number): Promise<Livro | null> {
    const query = 'SELECT * FROM livros WHERE id = $1;';
    const resultado = await pool.query(query, [id]);
    if (resultado.rows.length === 0) return null;
    return resultado.rows[0];
  }

  async atualizar(id: number, titulo: string, autorId: number, quantidade: number): Promise<void> {
    const query = `
      UPDATE livros 
      SET titulo = $1, autor_id = $2, quantidade_disponivel = $3 
      WHERE id = $4;
    `;
    await pool.query(query, [titulo, autorId, quantidade, id]);
  }

  async remover(id: number): Promise<void> {
    const query = 'DELETE FROM livros WHERE id = $1;';
    await pool.query(query, [id]);
  }

  async atualizarEstoque(id: number, novaQuantidade: number): Promise<void> {
    const query = 'UPDATE livros SET quantidade_disponivel = $1 WHERE id = $2;';
    await pool.query(query, [novaQuantidade, id]);
  }

  async possuiEmprestimoAtivo(livroId: number): Promise<boolean> {
    const query = "SELECT 1 FROM emprestimos WHERE livro_id = $1 AND status = 'ATIVO' LIMIT 1;";
    const resultado = await pool.query(query, [livroId]);
    return resultado.rows.length > 0;
  }
}
