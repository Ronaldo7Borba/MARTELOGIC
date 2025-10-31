document.addEventListener('DOMContentLoaded', () => {
  const botaoLogin = document.querySelector("#botao-login");
  const inputSenha = document.querySelector("#input_senha");

  botaoLogin.addEventListener("click", async () => {
    const senhaRaw = inputSenha.value;
    const senha = senhaRaw ? senhaRaw.trim() : "";

    console.log("🔑 Senha digitada (raw):", `"${senhaRaw}"`);
    console.log("🔑 Senha após trim:", `"${senha}"`);

    if (!senha) {
      alert("Digite a senha!");
      return;
    }
    
    console.log("📡 Enviando requisição para:", "http://localhost:3000/login");

  try {
    const resposta = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ senha })
    });

    const dados = await resposta.json();
    console.log("📥 Resposta do servidor:", dados);

    if (dados.sucesso) {
      console.log("✅ Login bem sucedido!");
      window.location.href = "../HTML/index.html";
    } else {
      console.log("❌ Login falhou:", dados.mensagem);
      alert("❌ Senha incorreta!");
    }
  } catch (erro) {
    console.error("Erro ao conectar:", erro);
    alert("Erro ao tentar acessar o servidor!");
  }
  });
});
