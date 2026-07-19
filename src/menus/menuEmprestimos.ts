import readlineSync from 'readline-sync';
import { EmprestimoController } from '../controllers/EmprestimoController';

export async function menuEmprestimos() {
  const controller = new EmprestimoController();
  let continuar = true;

  while (continuar) {
    console.log("\n=========================");
    console.log("   MÓDULO EMPRÉSTIMOS    ");
    console.log("=========================");
    console.log("1. Realizar Empréstimo");
    console.log("2. Registrar Devolução");
    console.log("3. Listar Empréstimos Ativos");
    console.log("0. Voltar ao Menu Principal");
    console.log("=========================");
    
    const opcao = readlineSync.question("Escolha uma opcao: ");
    switch (opcao) {
      case '1': await controller.realizarEmprestimo(); break;
      case '2': await controller.registrarDevolucao(); break;
      case '3': await controller.listarAtivos(); break;
      case '0': continuar = false; break;
      default: console.log("\n❌ Opção inválida!");
    }
  }
}
