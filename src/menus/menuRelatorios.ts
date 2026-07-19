import readlineSync from 'readline-sync';
import { RelatorioController } from '../controllers/RelatorioController';

export async function menuRelatorios() {
  const controller = new RelatorioController();
  let continuar = true;

  while (continuar) {
    console.log("\n=========================");
    console.log("    PAINEL DE RELATÓRIOS ");
    console.log("=========================");
    console.log("1. Ranking de Livros Mais Emprestados");
    console.log("2. Histórico Completo de um Cliente");
    console.log("3. Listar Livros Sem Estoque");
    console.log("0. Voltar ao Menu Principal");
    console.log("=========================");
    
    const opcao = readlineSync.question("Escolha uma opcao: ");
    switch (opcao) {
      case '1': await controller.exibirLivrosMaisEmprestados(); break;
      case '2': await controller.exibirHistoricoPorCliente(); break;
      case '3': await controller.exibirLivrosSemEstoque(); break;
      case '0': continuar = false; break;
      default: console.log("\n❌ Opção inválida!");
    }
  }
}
