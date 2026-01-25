// COMBINED AND ROBUST script.js (VERSÃO OTIMIZADA)

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
            event.preventDefault();
            console.log("Botão 'Concordo e Prosseguir' clicado.");
            closeModal();
        });

        // Evento de clique no fundo escuro do modal para fechar
        consentModal.addEventListener('click', (event) => {
            if (event.target === consentModal) {
                console.log("Fundo do modal clicado.");
                closeModal();
            }
        });
    }

    // ==========================================================
    // 2. LÓGICA DAS PRÉVIAS CLIQUE (SÓ NA PÁGINA EXPLÍCITA)
    // ==========================================================
    if (window.location.pathname.includes('bio.html')) {
        console.log("Página explícita detectada. Ativando lógica de prévias com vídeo borrado PERMANENTE.");
        
        const previewCards = document.querySelectorAll('.preview-card.locked');
        previewCards.forEach(card => {
            card.addEventListener('click', function() {
                if (this.classList.contains('unlocked')) return;
                const clickText = this.querySelector('span');
                if (clickText) clickText.remove();
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

    // ==========================================================
    // 4. LÓGICA DA CONTAGEM REGRESSIVA DA PROMOÇÃO (CORRIGIDA)
    // ==========================================================
    function startPromoCountdown() {
        const countdownEl = document.getElementById('countdown-timer');
        if (!countdownEl) return;
        
        let timeInSeconds = 2 * 60 * 60;
        const interval = setInterval(() => {
            const hours = Math.floor(timeInSeconds / 3600);
            const minutes = Math.floor((timeInSeconds % 3600) / 60);
            const seconds = timeInSeconds % 60;
            const displayTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            countdownEl.textContent = displayTime;
            
            if (timeInSeconds <= 0) {
                clearInterval(interval);
                countdownEl.textContent = "OFERTA ENCERRADA";
                countdownEl.style.background = "rgba(255, 0, 0, 0.5)";
            }
            timeInSeconds--;
        }, 1000);
    }
    startPromoCountdown();
});
