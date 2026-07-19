import readlineSync from 'readline-sync';
import { AutorController } from '../controllers/AutorController';

export async function menuAutores() {
  const controller = new AutorController();
  let continuar = true;

  while (continuar) {
    console.log("\n=========================");
    console.log("    MÓDULO DE AUTORES    ");
    console.log("=========================");
    console.log("1. Cadastrar Autor");
    console.log("2. Listar Todos os Autores");
    console.log("3. Consultar Autor por ID");
    console.log("4. Editar Autor");
    console.log("5. Excluir Autor");
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
