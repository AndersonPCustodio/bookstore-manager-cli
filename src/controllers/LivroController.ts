import readlineSync from 'readline-sync';
import { LivroService } from '../services/LivroService';

export class LivroController {
  private livroService: LivroService;

  constructor() {
    this.livroService = new LivroService();
  }

  async cadastrar() {
    console.log("\n--- CADASTRAR NOVO LIVRO ---");
    const titulo = readlineSync.question("Digite o titulo do livro: ");
    const autorId = Number(readlineSync.question("Digite o ID do autor: "));
    const quantidade = Number(readlineSync.question("Digite a quantidade em estoque: "));
    try {
      const livro = await this.livroService.cadastrar(titulo, autorId, quantidade);
      console.log(`\n✅ Livro cadastrado com sucesso! ID: ${livro.id}`);
    } catch (error: any) {
      console.log(`\n❌ Erro: ${error.message}`);
    }
  }

  async listarTodos() {
    console.log("\n--- LISTA DE LIVROS ---");
    try {
      const livros = await this.livroService.listarTodos();
      if (livros.length === 0) {
        console.log("Nenhum livro cadastrado no momento.");
        return;
      }
      console.table(livros);
    } catch (error: any) {
      console.log(`\n❌ Erro: ${error.message}`);
    }
  }

  async consultarPorId() {
    console.log("\n--- CONSULTAR LIVRO POR ID ---");
    const id = Number(readlineSync.question("Digite o ID do livro: "));
    try {
      const livro = await this.livroService.buscarPorId(id);
      console.table([livro]);
    } catch (error: any) {
      console.log(`\n❌ Erro: ${error.message}`);
    }
  }

  async atualizar() {
    console.log("\n--- EDITAR LIVRO ---");
    const id = Number(readlineSync.question("Digite o ID do livro que deseja editar: "));
    try {
      const atual = await this.livroService.buscarPorId(id);
      console.log(`Editando: ${atual.titulo}`);
      
      const novoTitulo = readlineSync.question(`Novo titulo (ou Enter para manter): `) || atual.titulo;
      
      const inputAutor = readlineSync.question(`Novo ID do autor (ou Enter para manter): `);
      const novoAutorId = inputAutor ? Number(inputAutor) : atual.autor_id;
      
      const inputQtd = readlineSync.question(`Nova quantidade em estoque (ou Enter para manter): `);
      const novaQtd = inputQtd ? Number(inputQtd) : atual.quantidade_disponivel;

      await this.livroService.atualizar(id, novoTitulo, novoAutorId, novaQtd);
      console.log("\n✅ Livro atualizado com sucesso!");
    } catch (error: any) {
      console.log(`\n❌ Erro: ${error.message}`);
    }
  }

  async remover() {
    console.log("\n--- EXCLUIR LIVRO ---");
    const id = Number(readlineSync.question("Digite o ID do livro que deseja excluir: "));
    const confirmar = readlineSync.keyInYNStrict(`Confirma a exclusão do livro ID ${id}? `);
    if (!confirmar) return;
    try {
      await this.livroService.remover(id);
      console.log("\n✅ Livro removido com sucesso!");
    } catch (error: any) {
      console.log(`\n❌ Erro: ${error.message}`);
    }
  }
}
