import readlineSync from 'readline-sync';
import { ClienteService } from '../services/ClienteService';

export class ClienteController {
  private clienteService: ClienteService;

  constructor() {
    this.clienteService = new ClienteService();
  }

  async cadastrar() {
    console.log("\n--- CADASTRAR NOVO CLIENTE ---");
    const nome = readlineSync.question("Digite o nome do cliente: ");
    const email = readlineSync.question("Digite o e-mail: ");
    const telefone = readlineSync.question("Digite o telefone: ");
    try {
      const cliente = await this.clienteService.cadastrar(nome, email, telefone);
      console.log(`\n✅ Cliente cadastrado com sucesso! ID: ${cliente.id}`);
    } catch (error: any) {
      console.log(`\n❌ Erro: ${error.message}`);
    }
  }

  async listarTodos() {
    console.log("\n--- LISTA DE CLIENTES ---");
    try {
      const clientes = await this.clienteService.listarTodos();
      if (clientes.length === 0) {
        console.log("Nenhum cliente cadastrado.");
        return;
      }
      console.table(clientes);
    } catch (error: any) {
      console.log(`\n❌ Erro: ${error.message}`);
    }
  }

  async consultarPorId() {
    console.log("\n--- CONSULTAR CLIENTE POR ID ---");
    const id = Number(readlineSync.question("Digite o ID do cliente: "));
    try {
      const cliente = await this.clienteService.buscarPorId(id);
      console.table([cliente]);
    } catch (error: any) {
      console.log(`\n❌ Erro: ${error.message}`);
    }
  }

  async atualizar() {
    console.log("\n--- EDITAR CLIENTE ---");
    const id = Number(readlineSync.question("Digite o ID do cliente: "));
    try {
      const atual = await this.clienteService.buscarPorId(id);
      console.log(`Editando: ${atual.nome}`);
      const novoNome = readlineSync.question(`Novo nome (ou Enter para manter): `) || atual.nome;
      const novoEmail = readlineSync.question(`Novo e-mail (ou Enter para manter): `) || atual.email;
      const novoTel = readlineSync.question(`Novo telefone (ou Enter para manter): `) || atual.telefone;
      
      await this.clienteService.atualizar(id, novoNome, novoEmail, novoTel);
      console.log("\n✅ Cliente atualizado com sucesso!");
    } catch (error: any) {
      console.log(`\n❌ Erro: ${error.message}`);
    }
  }

  async remover() {
    console.log("\n--- EXCLUIR CLIENTE ---");
    const id = Number(readlineSync.question("Digite o ID do cliente: "));
    const confirmar = readlineSync.keyInYNStrict(`Confirma a exclusão do cliente ID ${id}? `);
    if (!confirmar) return;
    try {
      await this.clienteService.remover(id);
      console.log("\n✅ Cliente removido com sucesso!");
    } catch (error: any) {
      console.log(`\n❌ Erro: ${error.message}`);
    }
  }
}
