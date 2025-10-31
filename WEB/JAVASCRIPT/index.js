function mostrarArea(id) {
    // Esconde todas as áreas
    document.querySelectorAll('.expand-area').forEach(div => div.classList.remove('active'));
    // Mostra a área clicada
    document.getElementById(id).classList.add('active');
}