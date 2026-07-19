import readlineSync from 'readline-sync';
import { RelatorioService } from '../services/RelatorioService';

export class RelatorioController {
  private relatorioService: RelatorioService;

  constructor() {
    this.relatorioService = new RelatorioService();
  }

  async exibirLivrosMaisEmprestados() {
    console.log("\n--- RELATÓRIO: LIVROS MAIS EMPRESTADOS ---");
    try {
      const dados = await this.relatorioService.obterLivrosMaisEmprestados();
      if (dados.length === 0) {
        console.log("Nenhum dado de empréstimo registrado até o momento.");
        return;
      }
      console.table(dados);
    } catch (error: any) {
      console.log(`\n❌ Erro: ${error.message}`);
    }
  }

  async exibirHistoricoPorCliente() {
    console.log("\n--- RELATÓRIO: HISTÓRICO DO CLIENTE ---");
    const clienteId = Number(readlineSync.question("Digite o ID do cliente: "));
    try {
      const dados = await this.relatorioService.obterHistoricoPorCliente(clienteId);
      if (dados.length === 0) {
        console.log("Este cliente ainda não realizou nenhum empréstimo.");
        return;
      }
      console.table(dados);
    } catch (error: any) {
      console.log(`\n❌ Erro: ${error.message}`);
    }
  }

  async exibirLivrosSemEstoque() {
    console.log("\n--- RELATÓRIO: LIVROS INDISPONÍVEIS (SEM ESTOQUE) ---");
    try {
      const dados = await this.relatorioService.obterLivrosSemEstoque();
      if (dados.length === 0) {
        console.log("Excelente! Todos os livros cadastrados possuem estoque disponível.");
        return;
      }
      console.table(dados);
    } catch (error: any) {
      console.log(`\n❌ Erro: ${error.message}`);
    }
  }
}
