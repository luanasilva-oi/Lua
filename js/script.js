// Garante que o script só execute após o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO MODAL E TROCA DE TEXTO ---
    const consentModal = document.getElementById('consent-modal');
    const consentYesBtn = document.getElementById('consent-yes');
    const mainContent = document.getElementById('main-content');

    if (consentModal && consentYesBtn && mainContent) {
        // Adiciona um log para depuração
        console.log("Tentando encontrar elementos do modal. Adicionando listener...");

        // Adiciona o evento de clique ao botão
        consentYesBtn.addEventListener('click', () => {
            console.log("Botão 'Concordo e Prosseguir' clicado.");
            consentModal.style.display = 'none';
            mainContent.style.filter = 'none';
            mainContent.style.pointerEvents = 'auto';
        });

        // Fecha o modal se o usuário clicar no fundo
        consentModal.addEventListener('click', (event) => {
            if (event.target === consentModal) {
                console.log("Fundo do modal clicado.");
                consentModal.style.display = 'none';
                mainContent.style.filter = 'none';
                mainContent.style.pointerEvents = 'auto';
            }
        });
    }

    // --- OUTRAS FUNCIONALIDADES DINÂMICAS ---
    const onlineCountEl = document.getElementById("online-count");
    const accessCountEl = document.getElementById("access-count");
    const purchaseToastEl = document.getElementById("purchase-toast");

    function updateOnlineUsers() { /* ... */ }
    setInterval(updateOnlineUsers, 6000); updateOnlineUsers();
    function initializeDailyAccess() { /* ... */ }
    initializeDailyAccess();
    function showFakePurchase() { /* ... */ }
    startFakePurchaseNotifications();
    initializePersonalCounter();
    const previewCards = document.querySelectorAll('.preview-card.locked');
    previewCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoSrc = this.dataset.src;
            const video = document.createElement('video');
            video.autoplay = true; video.loop = true; video.muted = true; video.playsinline = true;
            video.innerHTML = `<source src="${videoSrc}" type=" vídeo/mp4">`;
            this.innerHTML = ''; this.appendChild(video); this.classList.remove('locked');
        });
    });

});
