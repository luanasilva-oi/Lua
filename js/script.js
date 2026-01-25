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
    initializePersonalCounter();

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

    // --- LÓGICA DO MODAL (FUNCIONAL EM TODAS AS PÁGINAS) ---
    const consentModal = document.getElementById('consent-modal');
    const consentYesBtn = document.getElementById('consent-yes');
    const mainContent = document.getElementById('main-content');

    if (consentModal && consentYesBtn && mainContent) {
        consentYesBtn.addEventListener('click', () => {
            consentModal.style.display = 'none';
            mainContent.style.filter = 'none';
            mainContent.style.pointerEvents = 'auto';
        });
        consentModal.addEventListener('click', (event) => {
            if (event.target === consentModal) {
                consentModal.style.display = 'none';
                mainContent.style.filter = 'none';
                mainContent.style.pointerEvents = 'auto';
            }
        });
    }
});
