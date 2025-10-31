import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

// Configurar CORS para permitir requisições do frontend
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Configurar body-parser para processar JSON
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/martelogic")
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch(err => console.error("❌ Erro ao conectar:", err));

// Força o nome exato da coleção 'acesso' para evitar pluralização do mongoose
const Acesso = mongoose.model(
  "Acesso",
  new mongoose.Schema({ senha: String }),
  "acesso" // <<<<<<<<<< nome exato da coleção no seu MongoDB
);

app.post("/login", async (req, res) => {
  try {
    console.log("----- /login recebido -----");
    console.log("Body recebido (raw):", req.body);

    // garante que senha seja string e sem espaços acidentais
    let senha = req.body.senha;
    if (typeof senha !== "string") senha = String(senha);
    senha = senha.trim();

    console.log("Senha (após trim):", `"${senha}"`);

    // Vamos listar todas as senhas no banco para debug
    const todasSenhas = await Acesso.find({});
    console.log("🔍 Todas as senhas no banco:", todasSenhas);
    console.log("🔑 Senha recebida:", senha);
    
    // busca exata por senha
    const usuario = await Acesso.findOne({ senha });

    console.log("Resultado findOne:", usuario);

    if (usuario) {
      console.log("✅ Senha encontrada no banco!");
      return res.json({ sucesso: true, mensagem: "Login OK" });
    } else {
      console.log("❌ Senha NÃO encontrada no banco!");
      return res.json({ sucesso: false, mensagem: "Senha incorreta" });
    }
  } catch (err) {
    console.error("Erro no /login:", err);
    return res.status(500).json({ erro: "Erro interno", detalhe: err.message });
  }
});

app.listen(3000, () => console.log("🚀 Servidor rodando em http://localhost:3000"));
