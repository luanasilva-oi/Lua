// COMBINED AND ROBUST script.js

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================
    // 1. LÓGICA DO MODAL DE CONSENTIMENTO (RODA EM TODAS AS PÁGINAS QUE O TÊM)
    // ==========================================================
    const consentModal = document.getElementById('consent-modal');
    const consentYesBtn = document.getElementById('consent-yes');
    const mainContent = document.getElementById('main-content');

    // Só executa se os elementos do modal existirem na página
    if (consentModal && consentYesBtn && mainContent) {
        console.log("Elementos do modal encontrados. Adicionando listeners...");

        // Função para fechar o modal
        function closeModal() {
            console.log("Fechando o modal.");
            consentModal.style.display = 'none';
            mainContent.style.filter = 'none';
            mainContent.style.pointerEvents = 'auto';
        }

        // Evento de clique no botão "Concordo e Prosseguir"
        consentYesBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Previne qualquer comportamento padrão do botão
            console.log("Botão 'Concordo e Prosseguir' clicado.");
            closeModal();
        });

        // Evento de clique no fundo escuro do modal para fechar
        consentModal.addEventListener('click', (event) => {
            // Verifica se o clique foi diretamente no fundo, e não no conteúdo do modal
            if (event.target === consentModal) {
                console.log("Fundo do modal clicado.");
                closeModal();
            }
        });
    } else {
        console.log("Modal não encontrado nesta página. Ignorando lógica do modal.");
    }


    // ==========================================================
    // 2. LÓGICA DAS PRÉVIAS CLIQUE PARA CARREGAR (SÓ NA PÁGINA EXPLÍCITA)
    // ==========================================================
    // Verificamos se a URL da página contém 'bio.html' para ativar a função
    if (window.location.pathname.includes('bio.html')) {
        console.log("Página explícita detectada. Ativando lógica de prévias.");
        
        const previewCards = document.querySelectorAll('.preview-card.locked');

        previewCards.forEach(card => {
            card.addEventListener('click', function() {
                // Evita múltiplos cliques
                if (this.classList.contains('unlocked')) return;

                const videoSrc = this.dataset.src;
                if (!videoSrc) {
                    console.error("Atributo data-src não encontrado no card.");
                    return;
                }

                const thumbImg = this.querySelector('.preview-thumb');
                const clickText = this.querySelector('span');

                // Cria o elemento de vídeo
                const video = document.createElement('video');
                video.autoplay = true;
                video.loop = true;
                video.muted = true;
                video.playsinline = true;
                video.style.width = '100%';
                video.style.height = 'auto';
                video.style.display = 'block';
                video.style.aspectRatio = '1 / 1';
                video.style.objectFit = 'cover';
                video.style.filter = 'none'; // Remove o borrão do vídeo

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

    // ==========================================================
    // 3. OUTRAS FUNCIONALIDADES DINÂMICAS (RODAM EM TODAS AS PÁGINAS)
    // ==========================================================
    const onlineCountEl = document.getElementById("online-count");
    const accessCountEl = document.getElementById("access-count");

    function updateOnlineUsers() {
        if (onlineCountEl) {
            const count = Math.floor(Math.random() * (25 - 8 + 1)) + 8;
            onlineCountEl.textContent = count;
        }
    }
    setInterval(updateOnlineUsers, 8000);
    updateOnlineUsers();

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

            setInterval(() => {
                let currentCount = parseInt(localStorage.getItem('daily_access_count'));
                currentCount++;
                localStorage.setItem('daily_access_count', currentCount);
                if(accessCountEl) accessCountEl.textContent = currentCount;
            }, 45000);
        }
    }
    initializeDailyAccess();

    // ... (adicione aqui as funções de notificação de compra, etc.)
});
