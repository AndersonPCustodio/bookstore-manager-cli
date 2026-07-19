import readlineSync from 'readline-sync';
import { AutorService } from '../services/AutorService';

export class AutorController {
  private autorService: AutorService;

  constructor() {
    this.autorService = new AutorService();
  }

  async cadastrar() {
    console.log("\n--- CADASTRAR NOVO AUTOR ---");
    const nome = readlineSync.question("Digite o nome do autor: ");
    const nacionalidade = readlineSync.question("Digite a nacionalidade do autor: ");
    try {
      const autor = await this.autorService.cadastrar(nome, nacionalidade);
      console.log(`\n✅ Autor cadastrado com sucesso! ID: ${autor.id}`);
    } catch (error: any) {
      console.log(`\n❌ Erro: ${error.message}`);
    }
  }

  async listarTodos() {
    console.log("\n--- LISTA DE AUTORES ---");
    try {
      const autores = await this.autorService.listarTodos();
      if (autores.length === 0) {
        console.log("Nenhum autor cadastrado no momento.");
        return;
      }
      console.table(autores);
    } catch (error: any) {
      console.log(`\n❌ Erro: ${error.message}`);
    }
  }

  async consultarPorId() {
    console.log("\n--- CONSULTAR AUTOR POR ID ---");
    const id = Number(readlineSync.question("Digite o ID do autor: "));
    try {
      const autor = await this.autorService.buscarPorId(id);
      console.table([autor]);
    } catch (error: any) {
      console.log(`\n❌ Erro: ${error.message}`);
    }
  }

  async atualizar() {
    console.log("\n--- EDITAR AUTOR ---");
    const id = Number(readlineSync.question("Digite o ID do autor que deseja editar: "));
    try {
      const autorAtual = await this.autorService.buscarPorId(id);
      console.log(`Editando: ${autorAtual.nome} (${autorAtual.nacionalidade})`);
      const novoNome = readlineSync.question("Novo nome (ou Enter para manter): ") || autorAtual.nome;
      const novaNac = readlineSync.question("Nova nacionalidade (ou Enter para manter): ") || autorAtual.nacionalidade;
      await this.autorService.atualizar(id, novoNome, novaNac);
      console.log("\n✅ Autor updated com sucesso!");
    } catch (error: any) {
      console.log(`\n❌ Erro: ${error.message}`);
    }
  }

  async remover() {
    console.log("\n--- EXCLUIR AUTOR ---");
    const id = Number(readlineSync.question("Digite o ID do autor que deseja excluir: "));
    const confirmar = readlineSync.keyInYNStrict(`Tem certeza que deseja excluir o autor ID ${id}? `);
    if (!confirmar) return;
    try {
      await this.autorService.remover(id);
      console.log("\n✅ Autor removido com sucesso!");
    } catch (error: any) {
      console.log(`\n❌ Erro: ${error.message}`);
    }
  }
}
