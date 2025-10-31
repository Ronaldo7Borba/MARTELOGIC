import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/martelogic")
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch(err => console.error("❌ Erro ao conectar:", err));

const Acesso = mongoose.model(
  "Acesso",
  new mongoose.Schema({ senha: String }),
  "acesso"
);

async function verificarSenhas() {
  try {
    const senhas = await Acesso.find({});
    console.log("\n🔐 Senhas cadastradas no banco:");
    console.log(JSON.stringify(senhas, null, 2));
    console.log("\nTotal de senhas:", senhas.length);
  } catch (err) {
    console.error("❌ Erro:", err);
  } finally {
    mongoose.disconnect();
  }
}

verificarSenhas();