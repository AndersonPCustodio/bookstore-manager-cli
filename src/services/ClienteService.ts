import { ClienteRepository } from '../repositories/ClienteRepository';
import { Cliente } from '../models/interfaces';

export class ClienteService {
  private clienteRepository: ClienteRepository;

  constructor() {
    this.clienteRepository = new ClienteRepository();
  }

  async cadastrar(nome: string, email: string, telefone: string): Promise<Cliente> {
    if (!nome || nome.trim() === "") throw new Error("O nome do cliente é obrigatório.");
    if (!email || email.trim() === "") throw new Error("O e-mail é obrigatório.");
    if (!telefone || telefone.trim() === "") throw new Error("O telefone é obrigatório.");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      throw new Error("O formato do e-mail digitado é inválido. Certifique-se de usar um e-mail correto (ex: nome@email.com).");
    }

    const emailExistente = await this.clienteRepository.buscarPorEmail(email.trim());
    if (emailExistente) throw new Error("Já existe um cliente cadastrado com este e-mail.");

    return await this.clienteRepository.cadastrar({
      nome: nome.trim(),
      email: email.trim(),
      telefone: telefone.trim()
    });
  }

  async listarTodos(): Promise<Cliente[]> {
    return await this.clienteRepository.listarTodos();
  }

  async buscarPorId(id: number): Promise<Cliente> {
    if (!id || isNaN(id)) throw new Error("ID inválido fornecido.");
    const cliente = await this.clienteRepository.buscarPorId(id);
    if (!cliente) throw new Error(`Cliente com o ID ${id} não foi encontrado.`);
    return cliente;
  }

  async atualizar(id: number, nome: string, email: string, telefone: string): Promise<void> {
    const atual = await this.buscarPorId(id);
    if (!nome || nome.trim() === "") throw new Error("O nome não pode ficar vazio.");
    if (!email || email.trim() === "") throw new Error("O e-mail não pode ficar vazio.");
    if (!telefone || telefone.trim() === "") throw new Error("O telefone não pode ficar vazio.");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      throw new Error("O formato do novo e-mail digitado é inválido.");
    }

    if (email.trim() !== atual.email) {
      const emailExistente = await this.clienteRepository.buscarPorEmail(email.trim());
      if (emailExistente) throw new Error("Este e-mail já está sendo usado por outro cliente.");
    }

    await this.clienteRepository.atualizar(id, nome.trim(), email.trim(), telefone.trim());
  }

  async remover(id: number): Promise<void> {
    await this.buscarPorId(id);
    
    const possuiVinculo = await this.clienteRepository.possuiEmprestimoAtivo(id);
    if (possuiVinculo) {
      throw new Error("Não é possível remover o cliente. Ele possui empréstimos ativos pendentes de devolução.");
    }

    await this.clienteRepository.remover(id);
  }
}
