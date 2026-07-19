import { LivroRepository } from '../repositories/LivroRepository';
import { AutorRepository } from '../repositories/AutorRepository';
import { Livro } from '../models/interfaces';

export class LivroService {
  private livroRepository: LivroRepository;
  private autorRepository: AutorRepository;

  constructor() {
    this.livroRepository = new LivroRepository();
    this.autorRepository = new AutorRepository();
  }

  async cadastrar(titulo: string, autorId: number, quantidade: number): Promise<Livro> {
    if (!titulo || titulo.trim() === "") throw new Error("O título do livro é obrigatório.");
    if (!autorId || isNaN(autorId)) throw new Error("Um ID de autor válido é obrigatório.");
    if (quantidade < 0 || isNaN(quantidade)) throw new Error("A quantidade disponível não pode ser negativa.");

    const autorExiste = await this.autorRepository.buscarPorId(autorId);
    if (!autorExiste) throw new Error(`Não é possível cadastrar o livro. O autor com ID ${autorId} não existe.`);

    return await this.livroRepository.cadastrar({
      titulo: titulo.trim(),
      autor_id: autorId,
      quantidade_disponivel: quantidade
    });
  }

  async listarTodos(): Promise<any[]> {
    return await this.livroRepository.listarTodos();
  }

  async buscarPorId(id: number): Promise<Livro> {
    if (!id || isNaN(id)) throw new Error("ID de livro inválido.");
    const livro = await this.livroRepository.buscarPorId(id);
    if (!livro) throw new Error(`Livro com o ID ${id} não foi encontrado.`);
    return livro;
  }

  async atualizar(id: number, titulo: string, autorId: number, quantidade: number): Promise<void> {
    await this.buscarPorId(id);
    if (!titulo || titulo.trim() === "") throw new Error("O título não pode ficar vazio.");
    if (quantidade < 0 || isNaN(quantidade)) throw new Error("A quantidade em estoque não pode ser negativa.");

    const autorExiste = await this.autorRepository.buscarPorId(autorId);
    if (!autorExiste) throw new Error(`O autor com ID ${autorId} fornecido não existe.`);

    await this.livroRepository.atualizar(id, titulo.trim(), autorId, quantidade);
  }

  async remover(id: number): Promise<void> {
    await this.buscarPorId(id);

    const possuiVinculo = await this.livroRepository.possuiEmprestimoAtivo(id);
    if (possuiVinculo) {
      throw new Error("Não é possível remover o livro. Existem unidades dele atualmente emprestadas.");
    }

    await this.livroRepository.remover(id);
  }
}
