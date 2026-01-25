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
    // Executa a função a cada 6 segundos
    setInterval(updateOnlineUsers, 6000);
    updateOnlineUsers(); // Executa uma vez imediatamente

    /**
     * Inicializa o contador de acessos diários.
     * Usa o localStorage para persistir a contagem durante o dia.
     */
    function initializeDailyAccess() {
        const today = new Date().toDateString();
        const storedDay = localStorage.getItem("access_day");

        if (storedDay !== today) {
            // Se for um novo dia, redefine o contador
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
        const plans = [
            { name: "Plano Essencial", type: "basic" },
            { name: "Plano Completo", type: "complete" }
        ];

        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomPlan = plans[Math.floor(Math.random() * plans.length)];

        // Adiciona a classe e o conteúdo para exibir o toast
        purchaseToastEl.className = `show ${randomPlan.type}`;
        purchaseToastEl.innerHTML = `<strong>${randomName}</strong> comprou<br><span>${randomPlan.name}</span>`;

        // Remove o toast após 4 segundos
        setTimeout(() => {
            purchaseToastEl.className = "";
        }, 4000);
    }

    /**
     * Inicia o loop de notificações de compra em intervalos aleatórios.
     */
    function startFakePurchaseNotifications() {
        function scheduleNextNotification() {
            const interval = Math.random() * 6000 + 7000; // Intervalo entre 7 e 13 segundos
            setTimeout(() => {
                showFakePurchase();
                scheduleNextNotification(); // Agenda a próxima notificação
            }, interval);
        }
        scheduleNextNotification(); // Inicia o processo
    }
    startFakePurchaseNotifications();
    // --- CONTADOR DE VISUALIZAÇÕES PESSOAL ---
    function initializePersonalCounter() {
        // Verifica se o "segredo" está na URL
        const urlParams = new URLSearchParams(window.location.search);
        const secretKey = urlParams.get('stats');

        if (secretKey === 'liberado123') { // <-- Você pode mudar 'liberado123' para o que quiser
            const counterEl = document.getElementById('view-counter');
            const countEl = document.getElementById('admin-view-count');

            // Mostra o painel do contador
            counterEl.style.display = 'block';

            // Pega o número atual de visitas do localStorage
            let currentCount = parseInt(localStorage.getItem('personal_page_views') || '0');
            
            // Incrementa o contador
            currentCount++;
            
            // Salva o novo número
            localStorage.setItem('personal_page_views', currentCount);

            // Exibe o número na página
            countEl.innerText = currentCount;
        }
    }

    // Chama a função quando a página carrega
    initializePersonalCounter();
});
// ... (todo o seu script existente até o final) ...

    // --- CLICK-TO-LOAD PARA VÍDEOS (MÉTODO MAIS SEGURO) ---
    const previewCards = document.querySelectorAll('.preview-card.locked');

    previewCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoSrc = this.dataset.src;

            // Cria o elemento de vídeo dinamicamente
            const video = document.createElement('video');
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.playsinline = true;
            video.innerHTML = `<source src="${videoSrc}" type="video/mp4">`;

            // Substitui o conteúdo do card pelo vídeo
            this.innerHTML = '';
            this.appendChild(video);

            // Remove a classe 'locked' para que não possa ser clicado novamente
            this.classList.remove('locked');
        });
    });

}); // <-- Garanta que este }); seja o final do arquivo
