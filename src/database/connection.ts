import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export async function testarConexao(): Promise<boolean> {
  try {
    const client = await pool.connect();
    console.log("⚡ [Database] Conexão com o PostgreSQL estabelecida com sucesso!");
    client.release(); // Libera o cliente de volta para o Pool
    return true;
  } catch (error) {
    console.error("❌ [Database] Erro crítico ao conectar no banco de dados:", error);
    return false;
  }
}
