// ==========================================================
// SCRIPT OTIMIZADO COM PROTEÇÃO ANTI-BOT E WHATSAPP
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log("🔒 Site Luana Silva - Carregando...");

    // ==========================================================
    // 1. PROTEÇÃO ANTI-BOT DO INSTAGRAM
    // ==========================================================
    function initAntiBotProtection() {
        // Detecta comportamentos suspeitos
        const isBot = detectBotBehavior();
        
        if (isBot) {
            showAntiBotShield();
            return false;
        }
        
        return true;
    }
    
    function detectBotBehavior() {
        // 1. Verifica se é crawler do Instagram
        const userAgent = navigator.userAgent.toLowerCase();
        const isInstagram = userAgent.includes('instagram') || 
                           userAgent.includes('facebook') ||
                           userAgent.includes('crawler') ||
                           userAgent.includes('bot');
        
        // 2. Verifica velocidade de navegação (muito rápida = bot)
        let isTooFast = false;
        const navigationStart = performance.timing.navigationStart;
        const now = Date.now();
        const loadTime = now - navigationStart;
        
        if (loadTime < 500) { // Menos de 0.5 segundos
            isTooFast = true;
        }
        
        // 3. Verifica ações do mouse (bot não move mouse)
        let mouseMoved = false;
        document.addEventListener('mousemove', () => {
            mouseMoved = true;
        }, { once: true });
        
        setTimeout(() => {
            if (!mouseMoved && loadTime > 1000) {
                console.warn("⚠️ Comportamento suspeito detectado");
                showAntiBotShield();
            }
        }, 2000);
        
        return isInstagram || isTooFast;
    }
    
    function showAntiBotShield() {
        const shield = document.createElement('div');
        shield.className = 'anti-bot-shield active';
        shield.innerHTML = `
            <div class="bot-check">
                <h2>⚠️ VERIFICAÇÃO DE SEGURANÇA ⚠️</h2>
                <p style="color: #ccc; margin: 20px 0;">
                    Detectamos acesso suspeito ao site.
                    Por favor, confirme que você é humano:
                </p>
                <button id="verify-human">✅ EU SOU HUMANO</button>
                <p style="color: #888; font-size: 12px; margin-top: 20px;">
                    Esta verificação protege contra acessos automáticos.
                </p>
            </div>
        `;
        
        document.body.appendChild(shield);
        
        document.getElementById('verify-human').addEventListener('click', () => {
            shield.remove();
            localStorage.setItem('human_verified', 'true');
        });
    }
    
    // Inicia proteção anti-bot
    if (!localStorage.getItem('human_verified')) {
        setTimeout(initAntiBotProtection, 1000);
    }

    // ==========================================================
    // 2. LÓGICA DO MODAL DE CONSENTIMENTO
    // ==========================================================
    const consentModal = document.getElementById('consent-modal');
    const consentYesBtn = document.getElementById('consent-yes');
    const mainContent = document.getElementById('main-content');

    if (consentModal && consentYesBtn && mainContent) {
        console.log("🎯 Modal de consentimento ativado.");
        
        consentModal.style.display = 'flex';
        mainContent.style.filter = 'blur(10px)';
        mainContent.style.pointerEvents = 'none';

        function closeModal() {
            console.log("✅ Modal fechado.");
            consentModal.style.display = 'none';
            mainContent.style.filter = 'none';
            mainContent.style.pointerEvents = 'auto';
            
            // Salva que aceitou os termos
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
        
        // Se já aceitou antes, não mostra
        if (localStorage.getItem('terms_accepted') === 'true') {
            closeModal();
        }
    }

    // ==========================================================
    // 3. SISTEMA DE ESTATÍSTICAS DINÂMICAS
    // ==========================================================
    const onlineCountEl = document.getElementById("online-count");
    const accessCountEl = document.getElementById("access-count");

    function updateOnlineUsers() {
        if (onlineCountEl) {
            // Gera número aleatório entre 15-35
            const count = Math.floor(Math.random() * (35 - 15 + 1)) + 15;
            onlineCountEl.textContent = count;
            
            // Atualiza a cada 1-2 minutos
            const nextUpdate = Math.random() * (120000 - 60000) + 60000;
            setTimeout(updateOnlineUsers, nextUpdate);
        }
    }
    
    function initializeDailyAccess() {
        if (accessCountEl) {
            let count = localStorage.getItem('daily_access_count');
            const today = new Date().toDateString();
            const lastAccess = localStorage.getItem('last_access_date');

            // Se é um novo dia ou primeira visita
            if (!lastAccess || lastAccess !== today) {
                count = Math.floor(Math.random() * (80 - 40 + 1)) + 40;
                localStorage.setItem('daily_access_count', count);
                localStorage.setItem('last_access_date', today);
            } else {
                count = parseInt(count) || 40;
            }
            
            accessCountEl.textContent = count;

            // Incrementa a cada 2-4 minutos
            setInterval(() => {
                let currentCount = parseInt(localStorage.getItem('daily_access_count'));
                if (currentCount < 200) { // Limite máximo
                    currentCount += Math.floor(Math.random() * 3) + 1;
                    localStorage.setItem('daily_access_count', currentCount);
                    if(accessCountEl) accessCountEl.textContent = currentCount;
                }
            }, Math.random() * (240000 - 120000) + 120000);
        }
    }

    // ==========================================================
    // 4. SISTEMA DE VENDAS DINÂMICAS
    // ==========================================================
    function initSalesCounter() {
        const salesCounter = document.createElement('div');
        salesCounter.className = 'sales-counter';
        salesCounter.innerHTML = `
            <span class="fire-icon">🔥</span>
            <span id="total-sales-count">${getRandomSales()}</span> vendas hoje
        `;
        document.body.appendChild(salesCounter);
        
        // Mostra após rolagem
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                salesCounter.style.display = 'flex';
            }
        });
        
        // Atualiza vendas periodicamente
        setInterval(() => {
            const salesEl = document.getElementById('total-sales-count');
            if (salesEl) {
                let current = parseInt(salesEl.textContent);
                if (current < 50) { // Limite máximo
                    current += Math.floor(Math.random() * 2);
                    salesEl.textContent = current;
                }
            }
        }, 180000); // A cada 3 minutos
    }
    
    function getRandomSales() {
        return Math.floor(Math.random() * (25 - 12 + 1)) + 12;
    }

    // ==========================================================
    // 5. CONTADOR PROMOCIONAL
    // ==========================================================
    function startPromoCountdown() {
        const countdownEl = document.getElementById('countdown-timer');
        if (!countdownEl) return;
        
        // Define 3 horas a partir do acesso
        let timeInSeconds = 3 * 60 * 60;
        const interval = setInterval(() => {
            const hours = Math.floor(timeInSeconds / 3600);
            const minutes = Math.floor((timeInSeconds % 3600) / 60);
            const seconds = timeInSeconds % 60;
            const displayTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            countdownEl.textContent = displayTime;
            
            if (timeInSeconds <= 0) {
                clearInterval(interval);
                countdownEl.textContent = "OFERTA ENCERRADA";
                countdownEl.style.background = "rgba(255, 0, 0, 0.3)";
            }
            timeInSeconds--;
        }, 1000);
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
        
        // Previne múltiplos cliques
        document.querySelectorAll('.plan-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                this.style.pointerEvents = 'none';
                setTimeout(() => {
                    this.style.pointerEvents = 'auto';
                }, 2000);
            });
        });
        
        // Cache de elementos frequentemente usados
        window.luanaCache = {
            onlineCount: onlineCountEl,
            accessCount: accessCountEl,
            lastUpdate: Date.now()
        };
    }

    // ==========================================================
    // 7. SISTEMA DE NOTIFICAÇÕES DE VENDA (FAKE)
    // ==========================================================
    function initFakeSalesNotifications() {
        const names = ['Pedro', 'João', 'Lucas', 'Mateus', 'Gabriel', 'Rafael', 'Carlos', 'Bruno'];
        
        setInterval(() => {
            // 40% de chance de mostrar notificação
            if (Math.random() < 0.4) {
                const randomName = names[Math.floor(Math.random() * names.length)];
                const randomPlan = Math.random() < 0.6 ? 'COMPLETO' : 'BÁSICO';
                
                showToast(`${randomName} acabou de adquirir o acesso ${randomPlan}!`);
            }
        }, Math.random() * (300000 - 120000) + 120000); // 2-5 minutos
    }
    
    function showToast(message) {
        const toast = document.getElementById('purchase-toast');
        if (!toast) return;
        
        toast.innerHTML = `<span>🔥</span> ${message}`;
        toast.className = 'show complete';
        
        setTimeout(() => {
            toast.className = toast.className.replace('show', '');
        }, 4000);
    }

    // ==========================================================
    // 8. INICIALIZAÇÃO DE TODOS OS SISTEMAS
    // ==========================================================
    function initializeAllSystems() {
        console.log("🚀 Inicializando sistemas...");
        
        // Sistema de estatísticas
        updateOnlineUsers();
        initializeDailyAccess();
        
        // Sistema de vendas
        setTimeout(initSalesCounter, 5000);
        setTimeout(initFakeSalesNotifications, 10000);
        
        // Contador promocional
        startPromoCountdown();
        
        // Otimizações
        optimizePerformance();
        
        // Previews interativos (se na página bio.html)
        if (window.location.pathname.includes('bio.html')) {
            initPreviewInteractions();
        }
        
        console.log("✅ Todos os sistemas inicializados!");
    }
    
    function initPreviewInteractions() {
        const previewCards = document.querySelectorAll('.preview-card.locked');
        previewCards.forEach(card => {
            card.addEventListener('click', function() {
                if (this.classList.contains('unlocked')) return;
                const clickText = this.querySelector('span');
                if (clickText) clickText.remove();
                this.classList.remove('locked');
                this.classList.add('unlocked');
                
                // Muda o vídeo para não blur
                const video = this.querySelector('video');
                if (video) {
                    video.style.filter = 'none';
                }
            });
        });
    }

    // ==========================================================
    // 9. EVENT LISTENERS ADICIONAIS
    // ==========================================================
    document.querySelectorAll('.plan-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Feedback visual
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Log para WhatsApp
            const planType = this.classList.contains('basic') ? 'Básico' : 'Completo';
            console.log(`📞 Redirecionando para WhatsApp - Plano: ${planType}`);
        });
    });
    
    // Previne ações de bot
    document.addEventListener('keydown', (e) => {
        // Impede F12 (DevTools)
        if (e.key === 'F12') {
            e.preventDefault();
            showAntiBotShield();
            return false;
        }
        
        // Impede Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+U
        if (e.ctrlKey && (e.shiftKey || e.key === 'I' || e.key === 'J' || e.key === 'U')) {
            e.preventDefault();
            showAntiBotShield();
            return false;
        }
    });
    
    // Protege contra clique direito
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    }, false);

    // ==========================================================
    // INICIALIZAÇÃO FINAL
    // ==========================================================
    // Aguarda 1 segundo para carregar tudo
    setTimeout(initializeAllSystems, 1000);
    
    // Adiciona classe de carregamento
    document.body.classList.add('loaded');
});

// Função global para WhatsApp
function contactWhatsApp(plan = 'exclusivo') {
    const message = `Olá Luana! Quero conhecer seu conteúdo ${plan.toUpperCase()}! Me envie as informações por favor 😊`;
    const url = `https://wa.me/56974783157?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    
    // Log
    console.log(`📱 WhatsApp aberto - Plano: ${plan}`);
    return true;
}
