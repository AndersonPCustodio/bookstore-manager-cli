import { testarConexao } from './database/connection';
import { menuPrincipal } from './menus/menuPrincipal';

async function iniciarAplicacao() {
  console.clear();
  console.log("=== Inicializando BookStore Manager CLI ===");
  const conexaoOk = await testarConexao();

  if (!conexaoOk) {
    console.log("❌ Falha crítica na conexão com o banco de dados. Encerrando.");
    process.exit(1);
  }

  await menuPrincipal();
  
  console.log("\n====================================");
  console.log(" Sistema encerrado com sucesso!    ");
  console.log("====================================");
  process.exit(0);
}

iniciarAplicacao();
