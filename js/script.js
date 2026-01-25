// Garante que o script só execute após o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENTOS DO DOM ---
    const onlineCountEl = document.getElementById("online-count");
    const accessCountEl = document.getElementById("access-count");
    const purchaseToastEl = document.getElementById("purchase-toast");

    // --- FUNCIONALIDADES DINÂMICAS ---
    function updateOnlineUsers() {
        const minUsers = 8; const maxUsers = 14;
        onlineCountEl.innerText = Math.floor(Math.random() * (maxUsers - minUsers + 1)) + minUsers;
    }
    setInterval(updateOnlineUsers, 6000); updateOnlineUsers();

    function initializeDailyAccess() {
        const today = new Date().toDateString();
        if (localStorage.getItem("access_day") !== today) {
            const minAccess = 25; const maxAccess = 55;
            const randomAccess = Math.floor(Math.random() * (maxAccess - minAccess + 1)) + minAccess;
            localStorage.setItem("access_day", today); localStorage.setItem("access_count", randomAccess);
        }
        accessCountEl.innerText = localStorage.getItem("access_count");
    }
    initializeDailyAccess();

    function showFakePurchase() {
        const names = ["Henrique", "Gustavo", "Mateus", "Lucas", "Rafael", "Bruno", "Diego", "Felipe"];
        const plans = [{ name: "Plano Essencial", type: "basic" }, { name: "Plano Completo", type: "complete" }];
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomPlan = plans[Math.floor(Math.random() * plans.length)];
        purchaseToastEl.className = `show ${randomPlan.type}`;
        purchaseToastEl.innerHTML = `<strong>${randomName}</strong> comprou<br><span>${randomPlan.name}</span>`;
        setTimeout(() => { purchaseToastEl.className = ""; }, 4000);
    }
    function startFakePurchaseNotifications() {
        function scheduleNextNotification() {
            setTimeout(() => { showFakePurchase(); scheduleNextNotification(); }, Math.random() * 6000 + 7000);
        }
        scheduleNextNotification();
    }
    startFakePurchaseNotifications();

    function initializePersonalCounter() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('stats') === 'liberado123') {
            const counterEl = document.getElementById('view-counter');
            const countEl = document.getElementById('admin-view-count');
            counterEl.style.display = 'block';
            let currentCount = parseInt(localStorage.getItem('personal_page_views') || '0');
            currentCount++;
            localStorage.setItem('personal_page_views', currentCount);
            countEl.innerText = currentCount;
        }
    }
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

    // --- LÓGICA DO MODAL (CORRIGIDA PARA FUNCIONAR EM AMBOS OS LINKS) ---
    const consentModal = document.getElementById('consent-modal');
    const consentYesBtn = document.getElementById('consent-yes');
    const mainContent = document.getElementById('main-content');

    // Verifica se os elementos do modal existem na página antes de continuar
    if (consentModal && consentYesBtn && mainContent) {

        // Adiciona o evento de clique ao botão
        consentYesBtn.addEventListener('click', () => {
            consentModal.style.display = 'none';
            mainContent.style.filter = 'none';
            mainContent.style.pointerEvents = 'auto';
        });

        // Fecha o modal se o usuário clicar no fundo
        consentModal.addEventListener('click', (event) => {
            if (event.target === consentModal) {
                consentModal.style.display = 'none';
                mainContent.style.filter = 'none';
                mainContent.style.pointerEvents = 'auto';
            }
        });

        // LÓGICA PARA MOSTRAR O MODAL (SE NECESSÁRIO)
        const urlParams = new URLSearchParams(window.location.search);
        const isFromMeta = urlParams.get('from') === 'meta';

        // Mostra o modal se vier da meta OU se for a página bio.html
        if (isFromMeta || window.location.pathname.endsWith('/bio.html')) {
            mainContent.style.filter = 'blur(10px)';
            mainContent.style.pointerEvents = 'none';
        }
    }

});
