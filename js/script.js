// Garante que o script só execute após o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENTOS DO DOM ---
    const onlineCountEl = document.getElementById("online-count");
    const accessCountEl = document.getElementById("access-count");
    const purchaseToastEl = document.getElementById("purchase-toast");

    // --- FUNCIONALIDADES DINÂMICAS ---
    function updateOnlineUsers() { /* ... */ }
    setInterval(updateOnlineUsers, 6000); updateOnlineUsers();
    function initializeDailyAccess() { /* ... */ }
    initializeDailyAccess();
    function showFakePurchase() { /* ... */ }
    startFakePurchaseNotifications();
    function initializePersonalCounter() { /* ... */ }

    // --- CLICK-TO-LOAD PARA VÍDEOS ---
    const previewCards = document.querySelectorAll('.preview-card.locked');
    previewCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoSrc = this.dataset.src;
            const video = document.createElement('video');
            video.autoplay = true; video.loop = true; video.muted = true; video.playsinline = true;
            video.innerHTML = `<source src="${videoSrc}" type="video/mp4">`;
            this.innerHTML = ''; this.appendChild(video); this.classList.remove('locked');
        });
    });

    // --- LÓGICA DO MODAL E TROCA DE TEXTO ---
    const consentModal = document.getElementById('consent-modal');
    const consentYesBtn = document.getElementById('consent-yes');
    const mainContent = document.getElementById('main-content');

    if (consentModal && consentYesBtn && mainContent) {
        // Adiciona o evento de clique ao botão
        consentYesBtn.addEventListener('click', () => {
            // 1. Fecha o modal
            consentModal.style.display = 'none';
            mainContent.style.filter = 'none';
            mainContent.style.pointerEvents = 'auto';

            // 2. TROCA O TEXTO DOS PLANOS
            const basicTitle = document.getElementById('plan-basic-title');
            const basicDesc = document.getElementById('plan-basic-desc');
            const completeTitle = document.getElementById('plan-complete-title');
            const completeDesc = document.getElementById('plan-complete-desc');

            if (basicTitle) basicTitle.innerText = "Acesso Essencial";
            if (basicDesc) {
                basicDesc.innerHTML = `
                    <li>Uma curadoria com meus 100 melhores momentos de autoexploração e sensualidade.</li>
                    <li>Vídeos íntimos com brinquedos.</li>
                    <li>Momentos puros de prazer e descoberta.</li>
                    <li>Uma introdução ao meu universo mais pessoal.</li>
                `;
            }
            if (completeTitle) completeTitle.innerText = "Acesso Completo ⭐";
            if (completeDesc) {
                completeDesc.innerHTML = `
                    <li>Acesso total à minha biblioteca com mais de 600 vídeos. Sem censura, sem limites.</li>
                    <li>Cenas explícitas de masturbação e êxtase.</li>
                    <li>Close-ups íntimos e sons de prazer autênticos.</li>
                    <li>Posando e me exibindo completamente nua para você.</li>
                    <li>Galeria com mais de 500 imagens privadas e exclusivas.</li>
                `;
            }
        });

        // Fecha o modal se o usuário clicar no fundo
        consentModal.addEventListener('click', (event) => {
            if (event.target === consentModal) {
                consentModal.style.display = 'none';
                mainContent.style.filter = 'none';
                mainContent.style.pointerEvents = 'auto';
            }
        });
    }

});
