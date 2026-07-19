import { AutorRepository } from '../repositories/AutorRepository';
import { Autor } from '../models/interfaces';

export class AutorService {
  private autorRepository: AutorRepository;

  constructor() {
    this.autorRepository = new AutorRepository();
  }

  async cadastrar(nome: string, nacionalidade: string): Promise<Autor> {
    if (!nome || nome.trim() === "") throw new Error("O nome do autor é obrigatório.");
    if (!nacionalidade || nacionalidade.trim() === "") throw new Error("A nacionalidade é obrigatória.");
    return await this.autorRepository.cadastrar({ nome: nome.trim(), nacionalidade: nacionalidade.trim() });
  }

  async listarTodos(): Promise<Autor[]> {
    return await this.autorRepository.listarTodos();
  }

  async buscarPorId(id: number): Promise<Autor> {
    if (!id || isNaN(id)) throw new Error("ID inválido fornecido.");
    const autor = await this.autorRepository.buscarPorId(id);
    if (!autor) throw new Error(`Autor com o ID ${id} não foi encontrado.`);
    return autor;
  }

  async atualizar(id: number, nome: string, nacionalidade: string): Promise<void> {
    await this.buscarPorId(id);
    if (!nome || nome.trim() === "") throw new Error("O nome do autor não pode ficar vazio.");
    if (!nacionalidade || nacionalidade.trim() === "") throw new Error("A nacionalidade não pode ficar vazia.");
    await this.autorRepository.atualizar(id, nome.trim(), nacionalidade.trim());
  }

  async remover(id: number): Promise<void> {
    await this.buscarPorId(id);
    
    const possuiLivros = await this.autorRepository.possuiLivrosCadastrados(id);
    if (possuiLivros) {
      throw new Error("Não é possível remover o autor. Ele possui livros cadastrados vinculados ao seu nome.");
    }

    try {
      await this.autorRepository.remover(id);
    } catch (error) {
      throw new Error("Erro ao remover o autor no banco de dados.");
    }
  }
}
