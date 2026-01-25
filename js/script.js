// Garante que o script só execute após o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================
    // LÓGICA DAS PRÉVIAS CLIQUE PARA CARREGAR (SÓ NA PÁGINA EXPLÍCITA)
    // ==========================================================
    // Verificamos se a URL da página contém 'bio.html' para ativar a função
    if (window.location.pathname.includes('bio.html')) {
        
        const previewCards = document.querySelectorAll('.preview-card.locked');

        previewCards.forEach(card => {
            card.addEventListener('click', function() {
                // Evita múltiplos cliques
                if (this.classList.contains('unlocked')) return;

                const videoSrc = this.dataset.src;
                const thumbImg = this.querySelector('.preview-thumb');
                const clickText = this.querySelector('span');

                // Cria o elemento de vídeo
                const video = document.createElement('video');
                video.autoplay = true;
                video.loop = true;
                video.muted = true;
                video.playsinline = true; // Essencial para iOS
                video.style.width = '100%';
                video.style.height = 'auto';
                video.style.display = 'block';
                video.style.aspectRatio = '1 / 1';
                video.style.objectFit = 'cover';

                // Adiciona a fonte ao vídeo
                video.innerHTML = `<source src="${videoSrc}" type="video/mp4">`;

                // Remove o texto de clique
                if (clickText) {
                    clickText.remove();
                }

                // Substitui a imagem pelo vídeo
                this.replaceChild(video, thumbImg);

                // Marca o card como desbloqueado para não ser clicado de novo
                this.classList.remove('locked');
                this.classList.add('unlocked');
            });
        });
    }

    // --- OUTRAS FUNCIONALIDADES DINÂMICAS (QUE RODAM EM TODAS AS PÁGINAS) ---
    const onlineCountEl = document.getElementById("online-count");
    const accessCountEl = document.getElementById("access-count");
    const purchaseToastEl = document.getElementById("purchase-toast");

    // Função para atualizar o número de usuários online
    function updateOnlineUsers() {
        if (onlineCountEl) {
            const count = Math.floor(Math.random() * (25 - 8 + 1)) + 8;
            onlineCountEl.textContent = count;
        }
    }
    setInterval(updateOnlineUsers, 8000); // Atualiza a cada 8 segundos
    updateOnlineUsers();

    // Função para inicializar e incrementar o contador de acesso diário
    function initializeDailyAccess() {
        if (accessCountEl) {
            let count = localStorage.getItem('daily_access_count');
            const today = new Date().toDateString();

            if (!localStorage.getItem('last_access_date') || localStorage.getItem('last_access_date') !== today) {
                count = Math.floor(Math.random() * (50 - 30 + 1)) + 30;
                localStorage.setItem('daily_access_count', count);
                localStorage.setItem('last_access_date', today);
            } else {
                count = parseInt(count) || 30;
            }
            
            accessCountEl.textContent = count;

            // Incrementa o contador a cada 45 segundos
            setInterval(() => {
                let currentCount = parseInt(localStorage.getItem('daily_access_count'));
                currentCount++;
                localStorage.setItem('daily_access_count', currentCount);
                if(accessCountEl) accessCountEl.textContent = currentCount;
            }, 45000);
        }
    }
    initializeDailyAccess();

    // ... (restante das suas funções como showFakePurchase, etc.)
    // Inclua aqui as outras funções que você precisa, como as de notificação de compra.
});
