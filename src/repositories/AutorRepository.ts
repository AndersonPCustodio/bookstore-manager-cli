import { pool } from '../database/connection';
import { Autor } from '../models/interfaces';

export class AutorRepository {
  async cadastrar(autor: Autor): Promise<Autor> {
    const query = 'INSERT INTO autores (nome, nacionalidade) VALUES ($1, $2) RETURNING *;';
    const resultado = await pool.query(query, [autor.nome, autor.nacionalidade]);
    return resultado.rows[0];
  }

  async listarTodos(): Promise<Autor[]> {
    const query = 'SELECT * FROM autores ORDER BY nome ASC;';
    const resultado = await pool.query(query);
    return resultado.rows;
  }

  async buscarPorId(id: number): Promise<Autor | null> {
    const query = 'SELECT * FROM autores WHERE id = $1;';
    const resultado = await pool.query(query, [id]);
    if (resultado.rows.length === 0) return null;
    return resultado.rows[0];
  }

  async atualizar(id: number, nome: string, nacionalidade: string): Promise<void> {
    const query = 'UPDATE autores SET nome = $1, nacionalidade = $2 WHERE id = $3;';
    await pool.query(query, [nome, nacionalidade, id]);
  }

  async remover(id: number): Promise<void> {
    const query = 'DELETE FROM autores WHERE id = $1;';
    await pool.query(query, [id]);
  }

  async possuiLivrosCadastrados(autorId: number): Promise<boolean> {
    const query = 'SELECT 1 FROM livros WHERE autor_id = $1 LIMIT 1;';
    const resultado = await pool.query(query, [autorId]);
    return resultado.rows.length > 0;
  }
}
