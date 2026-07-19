import { pool } from '../database/connection';
import { Cliente } from '../models/interfaces';

export class ClienteRepository {
  async cadastrar(cliente: Cliente): Promise<Cliente> {
    const query = 'INSERT INTO clientes (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *;';
    const resultado = await pool.query(query, [cliente.nome, cliente.email, cliente.telefone]);
    return resultado.rows[0];
  }

  async listarTodos(): Promise<Cliente[]> {
    const query = 'SELECT * FROM clientes ORDER BY nome ASC;';
    const resultado = await pool.query(query);
    return resultado.rows;
  }

  async buscarPorId(id: number): Promise<Cliente | null> {
    const query = 'SELECT * FROM clientes WHERE id = $1;';
    const resultado = await pool.query(query, [id]);
    if (resultado.rows.length === 0) return null;
    return resultado.rows[0];
  }

  async buscarPorEmail(email: string): Promise<Cliente | null> {
    const query = 'SELECT * FROM clientes WHERE email = $1;';
    const resultado = await pool.query(query, [email]);
    if (resultado.rows.length === 0) return null;
    return resultado.rows[0];
  }

  async atualizar(id: number, nome: string, email: string, telefone: string): Promise<void> {
    const query = 'UPDATE clientes SET nome = $1, email = $2, telefone = $3 WHERE id = $4;';
    await pool.query(query, [nome, email, telefone, id]);
  }

  async remover(id: number): Promise<void> {
    const query = 'DELETE FROM clientes WHERE id = $1;';
    await pool.query(query, [id]);
  }

  // Verifica se o cliente tem vínculo de empréstimo ativo antes de deletar
  async possuiEmprestimoAtivo(clienteId: number): Promise<boolean> {
    const query = "SELECT 1 FROM emprestimos WHERE cliente_id = $1 AND status = 'ATIVO' LIMIT 1;";
    const resultado = await pool.query(query, [clienteId]);
    return resultado.rows.length > 0;
  }
}
