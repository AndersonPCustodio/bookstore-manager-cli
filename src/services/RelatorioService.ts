import { RelatorioRepository } from '../repositories/RelatorioRepository';
import { ClienteRepository } from '../repositories/ClienteRepository';

export class RelatorioService {
  private relatorioRepository: RelatorioRepository;
  private clienteRepository: ClienteRepository;

  constructor() {
    this.relatorioRepository = new RelatorioRepository();
    this.clienteRepository = new ClienteRepository();
  }

  async obterLivrosMaisEmprestados(): Promise<any[]> {
    try {
      return await this.relatorioRepository.obterLivrosMaisEmprestados();
    } catch (error) {
      throw new Error("Erro ao gerar o relatório de livros mais emprestados.");
    }
  }

  async obterHistoricoPorCliente(clienteId: number): Promise<any[]> {
    if (!clienteId || isNaN(clienteId)) {
      throw new Error("ID de cliente inválido.");
    }

    // Validação de Negócio: Garante que o cliente consultado existe
    const cliente = await this.clienteRepository.buscarPorId(clienteId);
    if (!cliente) {
      throw new Error(`Cliente com ID ${clienteId} não foi encontrado.`);
    }

    try {
      return await this.relatorioRepository.obterHistoricoPorCliente(clienteId);
    } catch (error) {
      throw new Error("Erro ao buscar o histórico do cliente.");
    }
  }

  async obterLivrosSemEstoque(): Promise<any[]> {
    try {
      return await this.relatorioRepository.obterLivrosSemEstoque();
    } catch (error) {
      throw new Error("Erro ao buscar os livros sem estoque.");
    }
  }
}
