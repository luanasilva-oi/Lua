// Garante que o script só execute após o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENTOS DO DOM ---
    const onlineCountEl = document.getElementById("online-count");
    const accessCountEl = document.getElementById("access-count");
    const purchaseToastEl = document.getElementById("purchase-toast");

    // --- FUNCIONALIDADES DINÂMICAS ---

    /**
     * Atualiza o contador de usuários online com um valor aleatório.
     */
    function updateOnlineUsers() {
        const minUsers = 8;
        const maxUsers = 14;
        const randomUsers = Math.floor(Math.random() * (maxUsers - minUsers + 1)) + minUsers;
        onlineCountEl.innerText = randomUsers;
    }
    setInterval(updateOnlineUsers, 6000);
    updateOnlineUsers();

    /**
     * Inicializa o contador de acessos diários.
     */
    function initializeDailyAccess() {
        const today = new Date().toDateString();
        const storedDay = localStorage.getItem("access_day");
        if (storedDay !== today) {
            const minAccess = 25;
            const maxAccess = 55;
            const randomAccess = Math.floor(Math.random() * (maxAccess - minAccess + 1)) + minAccess;
            localStorage.setItem("access_day", today);
            localStorage.setItem("access_count", randomAccess);
        }
        accessCountEl.innerText = localStorage.getItem("access_count");
    }
    initializeDailyAccess();

    /**
     * Exibe uma notificação toast de compra falsa.
     */
    function showFakePurchase() {
        const names = ["Henrique", "Gustavo", "Mateus", "Lucas", "Rafael", "Bruno", "Diego", "Felipe"];
        const plans = [{ name: "Plano Essencial", type: "basic" }, { name: "Plano Completo", type: "complete" }];
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomPlan = plans[Math.floor(Math.random() * plans.length)];
        purchaseToastEl.className = `show ${randomPlan.type}`;
        purchaseToastEl.innerHTML = `<strong>${randomName}</strong> comprou<br><span>${randomPlan.name}</span>`;
        setTimeout(() => { purchaseToastEl.className = ""; }, 4000);
    }

    /**
     * Inicia o loop de notificações de compra.
     */
    function startFakePurchaseNotifications() {
        function scheduleNextNotification() {
            const interval = Math.random() * 6000 + 7000;
            setTimeout(() => { showFakePurchase(); scheduleNextNotification(); }, interval);
        }
        scheduleNextNotification();
    }
    startFakePurchaseNotifications();

    /**
     * Inicializa o contador de visualizações pessoal.
     */
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

    // --- CLICK-TO-LOAD PARA VÍDEOS (MÉTODO MAIS SEGURO) ---
    const previewCards = document.querySelectorAll('.preview-card.locked');
    previewCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoSrc = this.dataset.src;
            const video = document.createElement('video');
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.playsinline = true;
            video.innerHTML = `<source src="${videoSrc}" type="video/mp4">`;
            this.innerHTML = '';
            this.appendChild(video);
            this.classList.remove('locked');
        });
    });
    // --- LÓGICA DO MODAL DE CONSENTIMENTO ---
    const consentModal = document.getElementById('consent-modal');
    const consentYesBtn = document.getElementById('consent-yes');
    const mainContent = document.getElementById('main-content');

    // Fecha o modal e revela o conteúdo
    consentYesBtn.addEventListener('click', () => {
        consentModal.style.display = 'none';
        mainContent.style.filter = 'none';
        mainContent.style.pointerEvents = 'auto';
    });

    // Se o usuário clicar fora do modal, ele também fecha
    consentModal.addEventListener('click', (event) => {
        if (event.target === consentModal) {
            consentModal.style.display = 'none';
            mainContent.style.filter = 'none';
            mainContent.style.pointerEvents = 'auto';
        }
    });
    // --- LÓGICA INTELIGENTE DE CONTEÚDO E MODAL ---
    document.addEventListener('DOMContentLoaded', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const isFromMeta = urlParams.get('from') === 'meta';

        // Lógica para a landing.html
        const metaContent = document.getElementById('meta-content');
        const directContent = document.getElementById('direct-content');
        if (metaContent && directContent) {
            if (isFromMeta) {
                metaContent.style.display = 'block';
                directContent.style.display = 'none';
            } else {
                metaContent.style.display = 'none';
                directContent.style.display = 'block';
            }
        }

        // Lógica para a acesso.html
        const consentModal = document.getElementById('consent-modal');
        const consentYesBtn = document.getElementById('consent-yes');
        const mainContent = document.getElementById('main-content');

        if (consentModal && mainContent) {
            if (isFromMeta) {
                // Se vier da Meta, mostra o modal e esconde o conteúdo
                mainContent.style.filter = 'blur(10px)';
                mainContent.style.pointerEvents = 'none';
            } else {
                // Se vier do tráfego direto, esconde o modal e mostra o conteúdo
                consentModal.style.display = 'none';
                mainContent.style.filter = 'none';
                mainContent.style.pointerEvents = 'auto';
            }

            // Ação do botão do modal
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
