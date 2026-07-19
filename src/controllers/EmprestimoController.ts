import readlineSync from 'readline-sync';
import { EmprestimoService } from '../services/EmprestimoService';

export class EmprestimoController {
  private emprestimoService: EmprestimoService;

  constructor() {
    this.emprestimoService = new EmprestimoService();
  }

  async realizarEmprestimo() {
    console.log("\n--- REGISTRAR NOVO EMPRÉSTIMO ---");
    const clienteId = Number(readlineSync.question("Digite o ID do cliente: "));
    const livroId = Number(readlineSync.question("Digite o ID do livro: "));
    try {
      const emprestimo = await this.emprestimoService.realizarEmprestimo(clienteId, livroId);
      console.log(`\n✅ Empréstimo registrado com sucesso! ID: ${emprestimo.id}`);
    } catch (error: any) {
      console.log(`\n❌ Erro: ${error.message}`);
    }
  }

  async registrarDevolucao() {
    console.log("\n--- REGISTRAR DEVOLUÇÃO DE LIVRO ---");
    const emprestimoId = Number(readlineSync.question("Digite o ID do empréstimo a ser devolvido: "));
    try {
      await this.emprestimoService.registrarDevolucao(emprestimoId);
      console.log(`\n✅ Devolução registrada e estoque atualizado com sucesso!`);
    } catch (error: any) {
      console.log(`\n❌ Erro: ${error.message}`);
    }
  }

  async listarAtivos() {
    console.log("\n--- EMPRÉSTIMOS ATIVOS NO MOMENTO ---");
    try {
      const ativos = await this.emprestimoService.listarAtivos();
      if (ativos.length === 0) {
        console.log("Nenhum empréstimo ativo registrado.");
        return;
      }
      console.table(ativos);
    } catch (error: any) {
      console.log(`\n❌ Erro: ${error.message}`);
    }
  }
}
