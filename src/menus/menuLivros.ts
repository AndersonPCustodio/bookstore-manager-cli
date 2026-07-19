import readlineSync from 'readline-sync';
import { LivroController } from '../controllers/LivroController';

export async function menuLivros() {
  const controller = new LivroController();
  let continuar = true;

  while (continuar) {
    console.log("\n=========================");
    console.log("    MÓDULO DE LIVROS     ");
    console.log("=========================");
    console.log("1. Cadastrar Livro");
    console.log("2. Listar Todos os Livros");
    console.log("3. Consultar Livro por ID");
    console.log("4. Editar Livro");
    console.log("5. Excluir Livro");
    console.log("0. Voltar ao Menu Principal");
    console.log("=========================");
    
    const opcao = readlineSync.question("Escolha uma opcao: ");
    switch (opcao) {
      case '1': await controller.cadastrar(); break;
      case '2': await controller.listarTodos(); break;
      case '3': await controller.consultarPorId(); break;
      case '4': await controller.atualizar(); break;
      case '5': await controller.remover(); break;
      case '0': continuar = false; break;
      default: console.log("\n❌ Opção inválida!");
    }
  }
}
