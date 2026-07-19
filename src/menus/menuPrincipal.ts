import readlineSync from 'readline-sync';
import { menuAutores } from './menuAutores';
import { menuLivros } from './menuLivros';
import { menuClientes } from './menuClientes';
import { menuEmprestimos } from './menuEmprestimos';
import { menuRelatorios } from './menuRelatorios';

export async function menuPrincipal() {
  let continuar = true;

  while (continuar) {
    console.log("\n====================================");
    console.log("    BOOKSTORE MANAGER CLI - MENU    ");
    console.log("====================================");
    console.log("1. Gerenciar Autores");
    console.log("2. Gerenciar Livros");
    console.log("3. Gerenciar Clientes");
    console.log("4. Gerenciar Empréstimos e Devoluções");
    console.log("5. Painel de Relatórios Gerenciais");
    console.log("0. Sair do Sistema");
    console.log("====================================");

    const opcao = readlineSync.question("Escolha o modulo desejado: ");

    switch (opcao) {
      case '1': await menuAutores(); break;
      case '2': await menuLivros(); break;
      case '3': await menuClientes(); break;
      case '4': await menuEmprestimos(); break;
      case '5': await menuRelatorios(); break;
      case '0': continuar = false; break;
      default: console.log("\n❌ Opção inválida! Tente novamente.");
    }
  }
}
