import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/martelogic")
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch(err => console.error("❌ Erro ao conectar:", err));

const Acesso = mongoose.model(
  "Acesso",
  new mongoose.Schema({ senha: String }),
  "acesso"
);

// Pegue a senha da linha de comando ou use a senha padrão
const SENHA_DESEJADA = process.argv[2] || "123456";

async function setupDB() {
  try {
    // Remove qualquer senha antiga
    await Acesso.deleteMany({});
    
    // Insere a nova senha
    await Acesso.create({ senha: SENHA_DESEJADA });
    
    console.log("✅ Senha configurada com sucesso!");
  } catch (err) {
    console.error("❌ Erro ao configurar senha:", err);
  } finally {
    mongoose.disconnect();
  }
}

setupDB();