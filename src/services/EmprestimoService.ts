import { EmprestimoRepository } from '../repositories/EmprestimoRepository';
import { LivroRepository } from '../repositories/LivroRepository';
import { ClienteRepository } from '../repositories/ClienteRepository';
import { Emprestimo } from '../models/interfaces';

export class EmprestimoService {
  private emprestimoRepository: EmprestimoRepository;
  private livroRepository: LivroRepository;
  private clienteRepository: ClienteRepository;

  constructor() {
    this.emprestimoRepository = new EmprestimoRepository();
    this.livroRepository = new LivroRepository();
    this.clienteRepository = new ClienteRepository();
  }

  async realizarEmprestimo(clienteId: number, livroId: number): Promise<Emprestimo> {
    const cliente = await this.clienteRepository.buscarPorId(clienteId);
    if (!cliente) {
      throw new Error(`Não é possível realizar empréstimo. Cliente com ID ${clienteId} não existe.`);
    }

    const livro = await this.livroRepository.buscarPorId(livroId);
    if (!livro) {
      throw new Error(`Não é possível realizar empréstimo. Livro com ID ${livroId} não existe.`);
    }

    if (livro.quantidade_disponivel <= 0) {
      throw new Error(`O livro '${livro.titulo}' está com estoque zerado no momento.`);
    }

    try {
      const novoEmprestimo = await this.emprestimoRepository.criar(clienteId, livroId);
      
      const novoEstoque = livro.quantidade_disponivel - 1;
      await this.livroRepository.atualizarEstoque(livroId, novoEstoque);

      return novoEmprestimo;
    } catch (error) {
      throw new Error("Erro ao processar o empréstimo no banco de dados.");
    }
  }

  async registrarDevolucao(emprestimoId: number): Promise<void> {
    const emprestimo = await this.emprestimoRepository.buscarAtivoPorId(emprestimoId);
    if (!emprestimo) {
      throw new Error(`Nenhum empréstimo ativo encontrado com o ID ${emprestimoId}.`);
    }

    try {
      await this.emprestimoRepository.registrarDevolucao(emprestimoId);

      const livro = await this.livroRepository.buscarPorId(emprestimo.livro_id);
      if (livro) {
        const novoEstoque = livro.quantidade_disponivel + 1;
        await this.livroRepository.atualizarEstoque(emprestimo.livro_id, novoEstoque);
      }
    } catch (error) {
      throw new Error("Erro ao processar a devolução no banco de dados.");
    }
  }

  async listarAtivos(): Promise<any[]> {
    try {
      return await this.emprestimoRepository.listarAtivosDetalhados();
    } catch (error) {
      throw new Error("Erro ao buscar a lista de empréstimos ativos.");
    }
  }
}
