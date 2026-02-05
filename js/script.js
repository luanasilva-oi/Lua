// COMBINED AND ROBUST script.js (VERSÃO OTIMIZADA PARA TELEGRAM)

// Detectar Telegram WebView
const isTelegram = navigator.userAgent.includes('Telegram') || 
                   navigator.userAgent.includes('WebView') ||
                   window.TelegramWebviewProxy;

// Adicionar classe ao body se for Telegram
if (isTelegram) {
    document.body.classList.add('telegram-webview');
    console.log('Telegram WebView detectado - otimizando...');
}

// Função principal otimizada
function initApp() {
    console.log('Inicializando aplicação...');
    
    // 1. Configurar modal (PRIMEIRO E MAIS IMPORTANTE)
    setupConsentModal();
    
    // 2. Configurar funcionalidades com delay
    setTimeout(() => {
        setupPreviewCards();
        setupDynamicCounters();
        setupPromoCountdown();
        setupPurchaseCounter();
        setupBioPageFeatures();
        setupLanguageSwitcher();
    }, 300);
    
    // 3. Configurar eventos leves
    setTimeout(() => {
        setupCardHoverEffects();
        setupButtonEffects();
    }, 500);
    
    console.log('Aplicação inicializada com sucesso!');
}

// ==========================================================
// 1. CONFIGURAÇÃO DO MODAL (OTIMIZADA PARA TELEGRAM)
// ==========================================================
function setupConsentModal() {
    const consentModal = document.getElementById('consent-modal');
    const consentYesBtn = document.getElementById('consent-yes');
    const mainContent = document.getElementById('main-content');
    
    if (!consentModal || !consentYesBtn || !mainContent) {
        console.log('Elementos do modal não encontrados');
        return;
    }
    
    console.log('Configurando modal...');
    
    // Verificar se já consentiu anteriormente
    const hasConsented = sessionStorage.getItem('consentGiven');
    if (hasConsented === 'true') {
        console.log('Consentimento já dado anteriormente');
        consentModal.style.display = 'none';
        mainContent.classList.remove('blurred');
        return;
    }
    
    // Garantir que o modal esteja visível
    setTimeout(() => {
        consentModal.style.display = 'flex';
        mainContent.classList.add('blurred');
        
        // Auto-fechamento de segurança (8 segundos)
        setTimeout(() => {
            if (consentModal.style.display === 'flex') {
                closeModal();
                console.log('Modal auto-fechado por segurança');
            }
        }, 8000);
    }, 100);
    
    // Função para fechar modal
    function closeModal() {
        console.log('Fechando modal...');
        
        // Fechamento IMEDIATO (sem transições no Telegram)
        if (isTelegram) {
            consentModal.style.display = 'none';
            mainContent.classList.remove('blurred');
        } else {
            // Fechamento suave para outros navegadores
            consentModal.style.opacity = '0';
            setTimeout(() => {
                consentModal.style.display = 'none';
                mainContent.classList.remove('blurred');
            }, 300);
        }
        
        // Marcar como consentido
        sessionStorage.setItem('consentGiven', 'true');
        
        // Forçar redraw
        void consentModal.offsetHeight;
    }
    
    // Configurar botão de consentimento (OTIMIZADO)
    const originalBtn = consentYesBtn.cloneNode(true);
    consentYesBtn.parentNode.replaceChild(originalBtn, consentYesBtn);
    
    // Novo listener SIMPLES
    document.getElementById('consent-yes').onclick = function(e) {
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();
        
        console.log('Botão de consentimento clicado');
        closeModal();
        
        // Prevenir qualquer ação adicional
        return false;
    };
    
    // Configurar botão "Voltar"
    const backBtn = document.querySelector('.modal-buttons .plan-btn.basic');
    if (backBtn) {
        backBtn.onclick = function(e) {
            e.preventDefault();
            window.location.href = this.href;
            return false;
        };
    }
    
    // Configurar clique no fundo (apenas para não-Telegram)
    if (!isTelegram) {
        consentModal.onclick = function(e) {
            if (e.target === this) {
                closeModal();
            }
        };
    }
}

// ==========================================================
// 2. CONFIGURAÇÃO DAS PRÉVIAS
// ==========================================================
function setupPreviewCards() {
    if (!window.location.pathname.includes('bio.html')) return;
    
    const previewCards = document.querySelectorAll('.preview-card.locked');
    if (previewCards.length === 0) return;
    
    previewCards.forEach(card => {
        card.addEventListener('click', function() {
            if (this.classList.contains('unlocked')) return;
            
            const clickText = this.querySelector('span');
            if (clickText) {
                clickText.style.transition = 'opacity 0.3s';
                clickText.style.opacity = '0';
                setTimeout(() => clickText.remove(), 300);
            }
            
            this.classList.remove('locked');
            this.classList.add('unlocked');
        });
    });
}

// ==========================================================
// 3. CONTADORES DINÂMICOS
// ==========================================================
function setupDynamicCounters() {
    const onlineCountEl = document.getElementById("online-count");
    const accessCountEl = document.getElementById("access-count");
    
    if (onlineCountEl) {
        function updateOnlineUsers() {
            const count = Math.floor(Math.random() * (25 - 8 + 1)) + 8;
            onlineCountEl.textContent = count;
        }
        
        updateOnlineUsers();
        setInterval(updateOnlineUsers, 10000); // A cada 10 segundos
    }
    
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
        
        // Incrementar periodicamente
        setInterval(() => {
            let currentCount = parseInt(localStorage.getItem('daily_access_count')) || 30;
            currentCount++;
            localStorage.setItem('daily_access_count', currentCount);
            accessCountEl.textContent = currentCount;
        }, 45000);
    }
}

// ==========================================================
// 4. CONTAGEM REGRESSIVA
// ==========================================================
function setupPromoCountdown() {
    const countdownEl = document.getElementById('countdown-timer');
    if (!countdownEl) return;
    
    let timeInSeconds = 2 * 60 * 60;
    
    function updateCountdown() {
        if (timeInSeconds <= 0) {
            countdownEl.textContent = "OFERTA ENCERRADA";
            countdownEl.style.background = "rgba(255, 0, 0, 0.5)";
            return;
        }
        
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
        
        countdownEl.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        timeInSeconds--;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ==========================================================
// 5. CONTADOR DE COMPRAS
// ==========================================================
function setupPurchaseCounter() {
    // Lista de nomes
    const names = ['Pedro', 'João', 'Lucas', 'Mateus', 'Gabriel', 'Rafael', 'Felipe', 'Daniel'];
    
    // Criar contador de vendas
    let totalSales = parseInt(localStorage.getItem('total_sales')) || 0;
    
    if (!document.querySelector('.sales-counter') && totalSales > 0) {
        const salesCounter = document.createElement('div');
        salesCounter.className = 'sales-counter';
        salesCounter.innerHTML = `
            <span class="fire-icon">🔥</span>
            <span id="total-sales-count">${totalSales}</span> vendas hoje
        `;
        document.body.appendChild(salesCounter);
    }
    
    // Simular compras aleatórias
    function simulatePurchase() {
        const randomTime = Math.random() * (60000 - 30000) + 30000;
        
        setTimeout(() => {
            totalSales++;
            localStorage.setItem('total_sales', totalSales);
            
            const salesCountEl = document.getElementById('total-sales-count');
            if (salesCountEl) {
                salesCountEl.textContent = totalSales;
            }
            
            simulatePurchase();
        }, randomTime);
    }
    
    // Iniciar após 10 segundos
    setTimeout(simulatePurchase, 10000);
}

// ==========================================================
// 6. FUNCIONALIDADES DA PÁGINA BIO
// ==========================================================
function setupBioPageFeatures() {
    if (!window.location.pathname.includes('bio.html')) return;
    
    // Vagas decrescentes
    let spots = 3;
    const spotsElement = document.getElementById('remaining-spots');
    const urgencySection = document.getElementById('urgency-section');
    
    if (spotsElement && urgencySection) {
        setInterval(() => {
            if (spots > 0) {
                spots--;
                spotsElement.textContent = spots;
                
                if (spots === 1) {
                    urgencySection.innerHTML = '🚨 <strong>ÚLTIMA VAGA!</strong> Essa é sua última chance! 🔥';
                    urgencySection.style.background = 'linear-gradient(90deg, #ff0000, #ff0000)';
                } else if (spots === 0) {
                    urgencySection.innerHTML = '⛔ <strong>VAGAS ESGOTADAS!</strong> Volte amanhã!';
                    urgencySection.style.background = 'linear-gradient(90deg, #333, #555)';
                }
            }
        }, 120000); // A cada 2 minutos
    }
    
    // FAQ
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            answer.classList.toggle('show');
        });
    });
}

// ==========================================================
// 7. SELETOR DE IDIOMAS
// ==========================================================
function setupLanguageSwitcher() {
    const languageSelector = document.querySelector('.language-selector');
    if (!languageSelector) return;
    
    // Carregar idioma salvo
    const savedLang = localStorage.getItem('selectedLanguage') || 'pt';
    updateLanguageDisplay(savedLang);
    
    // Abrir/fechar dropdown
    languageSelector.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('open');
    });
    
    // Fechar ao clicar fora
    document.addEventListener('click', () => {
        languageSelector.classList.remove('open');
    });
    
    // Mudar idioma
    document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            
            // Salvar preferência
            localStorage.setItem('selectedLanguage', lang);
            
            // Atualizar display
            updateLanguageDisplay(lang);
            
            // Fechar dropdown
            languageSelector.classList.remove('open');
            
            // Recarregar página
            setTimeout(() => location.reload(), 300);
        });
    });
    
    function updateLanguageDisplay(lang) {
        const flags = {'pt': '🇧🇷', 'en': '🇺🇸', 'es': '🇪🇸'};
        const names = {'pt': 'PT', 'en': 'EN', 'es': 'ES'};
        
        const currentFlag = document.querySelector('.current-language .flag');
        const currentText = document.querySelector('.current-language span:not(.arrow)');
        
        if (currentFlag) currentFlag.textContent = flags[lang];
        if (currentText) currentText.textContent = names[lang];
        
        // Atualizar opção ativa
        document.querySelectorAll('.language-option').forEach(opt => {
            opt.classList.remove('active');
        });
        document.querySelector(`.language-option[data-lang="${lang}"]`)?.classList.add('active');
    }
}

// ==========================================================
// 8. EFEITOS VISUAIS LEVES
// ==========================================================
function setupCardHoverEffects() {
    document.querySelectorAll('.plan-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (!isTelegram) card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            if (!isTelegram) card.style.transform = 'translateY(0)';
        });
        
        card.addEventListener('touchstart', () => {
            card.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('touchend', () => {
            setTimeout(() => {
                card.style.transform = 'translateY(0)';
            }, 150);
        });
    });
}

function setupButtonEffects() {
    document.querySelectorAll('.plan-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
}

// ==========================================================
// 9. INICIALIZAÇÃO SEGURA
// ==========================================================
// Aguardar DOM completamente carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    // DOM já carregado
    setTimeout(initApp, 100);
}

// Funções auxiliares globais
window.getQueryParam = function(param) {
    return new URLSearchParams(window.location.search).get(param);
};
