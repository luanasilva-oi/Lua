// ==========================================================
// SCRIPT OTIMIZADO E CORRIGIDO
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log("🔒 Site Luana Silva - Carregando...");

    // ==========================================================
    // 1. REMOVER NOTIFICAÇÕES BUGADAS DE VENDAS
    // ==========================================================
    // Removemos o sistema bugado de notificações fixas
    
    // ==========================================================
    // 2. LÓGICA DO MODAL DE CONSENTIMENTO
    // ==========================================================
    const consentModal = document.getElementById('consent-modal');
    const consentYesBtn = document.getElementById('consent-yes');
    const mainContent = document.getElementById('main-content');

    if (consentModal && consentYesBtn && mainContent) {
        console.log("🎯 Modal de consentimento ativado.");
        
        // Verifica se já aceitou antes
        if (localStorage.getItem('terms_accepted') === 'true') {
            consentModal.style.display = 'none';
            mainContent.style.filter = 'none';
            mainContent.style.pointerEvents = 'auto';
        } else {
            consentModal.style.display = 'flex';
            mainContent.style.filter = 'blur(10px)';
            mainContent.style.pointerEvents = 'none';
        }

        function closeModal() {
            console.log("✅ Modal fechado.");
            consentModal.style.display = 'none';
            mainContent.style.filter = 'none';
            mainContent.style.pointerEvents = 'auto';
            localStorage.setItem('terms_accepted', 'true');
        }

        consentYesBtn.addEventListener('click', (event) => {
            event.preventDefault();
            closeModal();
        });

        consentModal.addEventListener('click', (event) => {
            if (event.target === consentModal) {
                closeModal();
            }
        });
    }

    // ==========================================================
    // 3. SISTEMA DE ESTATÍSTICAS DINÂMICAS (CORRIGIDO)
    // ==========================================================
    const onlineCountEl = document.getElementById("online-count");
    const accessCountEl = document.getElementById("access-count");

    function updateOnlineUsers() {
        if (onlineCountEl) {
            // Números mais realistas: 15-35 online
            const minOnline = 15;
            const maxOnline = 35;
            const count = Math.floor(Math.random() * (maxOnline - minOnline + 1)) + minOnline;
            onlineCountEl.textContent = count;
            
            // Atualiza a cada 45-90 segundos
            const nextUpdate = Math.random() * (90000 - 45000) + 45000;
            setTimeout(updateOnlineUsers, nextUpdate);
        }
    }
    
    function initializeDailyAccess() {
        if (accessCountEl) {
            const today = new Date().toDateString();
            const lastAccess = localStorage.getItem('last_access_date');
            
            // Se é um novo dia, reseta o contador
            if (!lastAccess || lastAccess !== today) {
                // Começa com 40-60 acessos
                const initialCount = Math.floor(Math.random() * (60 - 40 + 1)) + 40;
                localStorage.setItem('daily_access_count', initialCount);
                localStorage.setItem('last_access_date', today);
                accessCountEl.textContent = initialCount;
            } else {
                // Pega o valor atual
                let count = parseInt(localStorage.getItem('daily_access_count')) || 40;
                accessCountEl.textContent = count;
            }

            // Incrementa a cada 1-2 minutos de forma mais lenta
            setInterval(() => {
                let currentCount = parseInt(localStorage.getItem('daily_access_count'));
                if (currentCount < 150) { // Limite máximo razoável
                    // Incrementa 1-2 a cada vez
                    currentCount += Math.floor(Math.random() * 2) + 1;
                    localStorage.setItem('daily_access_count', currentCount);
                    if(accessCountEl) accessCountEl.textContent = currentCount;
                }
            }, Math.random() * (120000 - 60000) + 60000);
        }
    }

    // ==========================================================
    // 4. CONTADOR PROMOCIONAL SIMPLES
    // ==========================================================
    function startPromoCountdown() {
        const countdownEl = document.getElementById('countdown-timer');
        if (!countdownEl) return;
        
        // 2 horas a partir do acesso
        let timeInSeconds = 2 * 60 * 60;
        
        // Atualiza imediatamente
        updateCountdown();
        
        const interval = setInterval(() => {
            timeInSeconds--;
            updateCountdown();
            
            if (timeInSeconds <= 0) {
                clearInterval(interval);
                countdownEl.textContent = "OFERTA ENCERRADA";
                countdownEl.style.background = "rgba(255, 0, 0, 0.3)";
            }
        }, 1000);
        
        function updateCountdown() {
            const hours = Math.floor(timeInSeconds / 3600);
            const minutes = Math.floor((timeInSeconds % 3600) / 60);
            const seconds = timeInSeconds % 60;
            const displayTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            countdownEl.textContent = displayTime;
        }
    }

    // ==========================================================
    // 5. SISTEMA DE VENDAS SIMPLES (SEM BUG)
    // ==========================================================
    function initSimpleSalesCounter() {
        // Remove qualquer contador bugado existente
        const buggedCounter = document.querySelector('.sales-counter');
        if (buggedCounter) {
            buggedCounter.remove();
        }
        
        // Remove notificações bugadas
        const buggedNotifications = document.querySelectorAll('.purchase-notification');
        buggedNotifications.forEach(el => el.remove());
        
        console.log("✅ Sistema de vendas bugado removido.");
    }

    // ==========================================================
    // 6. OTIMIZAÇÃO DE PERFORMANCE
    // ==========================================================
    function optimizePerformance() {
        // Lazy loading para imagens
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
        });
        
        // Otimiza vídeos
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.preload = 'metadata';
        });
        
        // Feedback visual para botões
        document.querySelectorAll('.plan-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                // Pequeno feedback visual
                this.style.transform = 'scale(0.97)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Log para analytics
                const planType = this.classList.contains('basic') ? 'Básico' : 'Completo';
                console.log(`📱 WhatsApp clicado - Plano: ${planType}`);
            });
        });
    }

    // ==========================================================
    // 7. PROTEÇÃO ANTI-BOT LEVE (NÃO INTERFERE)
    // ==========================================================
    function initLightBotProtection() {
        // Apenas detecta, não bloqueia
        const userAgent = navigator.userAgent.toLowerCase();
        const isKnownBot = userAgent.includes('instagram') || 
                          userAgent.includes('facebookexternalhit') ||
                          userAgent.includes('whatsapp');
        
        if (isKnownBot) {
            console.log("🤖 Bot detectado (não bloqueado para evitar problemas)");
            // Não faz nada, apenas log
        }
        
        // Proteção simples contra inspeção (não atrapalha usuários)
        document.addEventListener('contextmenu', (e) => {
            // Permite clique direito normalmente
            return true;
        });
    }

    // ==========================================================
    // 8. SISTEMA DE INTERAÇÃO COM PREVIEWS
    // ==========================================================
    function initPreviewInteractions() {
        // Apenas se estiver na página bio.html
        if (!window.location.pathname.includes('bio.html')) return;
        
        const previewCards = document.querySelectorAll('.preview-card.locked');
        previewCards.forEach(card => {
            card.addEventListener('click', function() {
                // Efeito visual
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
                
                // Muda o texto
                const lockedText = this.querySelector('.locked-text');
                if (lockedText) {
                    const originalText = lockedText.innerHTML;
                    lockedText.innerHTML = '💋 ABRINDO WHATSAPP...';
                    lockedText.style.background = 'rgba(37, 211, 102, 0.9)';
                    
                    setTimeout(() => {
                        lockedText.innerHTML = originalText;
                        lockedText.style.background = '';
                    }, 1500);
                }
            });
        });
    }

    // ==========================================================
    // 9. INICIALIZAÇÃO DE TODOS OS SISTEMAS
    // ==========================================================
    function initializeAllSystems() {
        console.log("🚀 Inicializando sistemas...");
        
        // 1. Remove sistema bugado
        initSimpleSalesCounter();
        
        // 2. Inicia estatísticas
        updateOnlineUsers();
        initializeDailyAccess();
        
        // 3. Contador promocional
        startPromoCountdown();
        
        // 4. Otimizações
        optimizePerformance();
        
        // 5. Proteção leve
        initLightBotProtection();
        
        // 6. Interações
        initPreviewInteractions();
        
        console.log("✅ Todos os sistemas inicializados!");
    }

    // ==========================================================
    // 10. EVENT LISTENERS ADICIONAIS
    // ==========================================================
    // Feedback para WhatsApp
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', function() {
            // Pequena animação
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Analytics simples
            console.log("💬 WhatsApp aberto:", this.href);
        });
    });
    
    // Previne duplo clique rápido
    let lastClickTime = 0;
    document.addEventListener('click', (e) => {
        const currentTime = new Date().getTime();
        if (currentTime - lastClickTime < 300) { // 300ms
            e.preventDefault();
        }
        lastClickTime = currentTime;
    }, true);

    // ==========================================================
    // INICIALIZAÇÃO FINAL
    // ==========================================================
    // Aguarda 500ms para carregar tudo
    setTimeout(initializeAllSystems, 500);
    
    // Adiciona classe de carregamento
    document.body.classList.add('loaded');
});

// Função global para WhatsApp (opcional)
function contactWhatsApp(plan = 'exclusivo') {
    const message = `Olá Luana! Quero conhecer seu conteúdo ${plan.toUpperCase()}! Me envie as informações por favor 😊`;
    const url = `https://wa.me/56974783157?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    return true;
}
