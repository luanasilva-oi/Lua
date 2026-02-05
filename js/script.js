// COMBINED AND ROBUST script.js (VERSÃO OTIMIZADA)

// Flag para evitar execução múltipla
let isInitialized = false;

document.addEventListener('DOMContentLoaded', () => {
    if (isInitialized) return;
    isInitialized = true;
    
    console.log("Script inicializando...");

    // ==========================================================
    // 1. LÓGICA DO MODAL DE CONSENTIMENTO (OTIMIZADA)
    // ==========================================================
    function setupConsentModal() {
        const consentModal = document.getElementById('consent-modal');
        const consentYesBtn = document.getElementById('consent-yes');
        const mainContent = document.getElementById('main-content');

        if (!consentModal || !consentYesBtn || !mainContent) return;

        console.log("Modal encontrado, configurando...");
        
        // VERIFICAR SE JÁ ACEITOU ANTES (Importante!)
        const hasConsented = sessionStorage.getItem('hasConsented');
        if (hasConsented === 'true') {
            console.log("Consentimento já dado, fechando modal...");
            consentModal.style.display = 'none';
            mainContent.style.filter = 'none';
            mainContent.style.pointerEvents = 'auto';
            return;
        }

        // Função para fechar o modal (OTIMIZADA)
        function closeModal() {
            console.log("Fechando modal...");
            consentModal.style.opacity = '0';
            consentModal.style.visibility = 'hidden';
            mainContent.style.filter = 'none';
            mainContent.style.pointerEvents = 'auto';
            
            // Usar setTimeout para evitar travamento
            setTimeout(() => {
                consentModal.style.display = 'none';
            }, 300);
            
            // Marcar como aceito
            sessionStorage.setItem('hasConsented', 'true');
        }

        // Evento de clique otimizado
        consentYesBtn.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            console.log("Botão consentimento clicado");
            closeModal();
        }, { once: true }); // Usar once para evitar múltiplos listeners

        // Evento de clique no fundo (com debounce)
        let modalClickTimeout;
        consentModal.addEventListener('click', function(event) {
            if (event.target === consentModal) {
                clearTimeout(modalClickTimeout);
                modalClickTimeout = setTimeout(() => {
                    console.log("Fundo do modal clicado");
                    closeModal();
                }, 50);
            }
        });

        // Garantir que o modal esteja visível
        setTimeout(() => {
            consentModal.style.display = 'flex';
            consentModal.style.opacity = '1';
            consentModal.style.visibility = 'visible';
        }, 100);
    }

    // ==========================================================
    // 2. LÓGICA DAS PRÉVIAS CLIQUE (LEVE)
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
                    clickText.style.opacity = '0';
                    setTimeout(() => clickText.remove(), 300);
                }
                
                this.classList.remove('locked');
                this.classList.add('unlocked');
            }, { passive: true });
        });
    }

    // ==========================================================
    // 3. CONTADORES DINÂMICOS (OTIMIZADOS)
    // ==========================================================
    function setupDynamicCounters() {
        const onlineCountEl = document.getElementById("online-count");
        const accessCountEl = document.getElementById("access-count");

        // Online Users Counter
        function updateOnlineUsers() {
            if (!onlineCountEl) return;
            const count = Math.floor(Math.random() * (25 - 8 + 1)) + 8;
            onlineCountEl.textContent = count;
        }

        // Daily Access Counter
        function initializeDailyAccess() {
            if (!accessCountEl) return;
            
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

            // Usar setInterval mais leve
            let accessInterval = setInterval(() => {
                let currentCount = parseInt(localStorage.getItem('daily_access_count')) || 30;
                currentCount++;
                localStorage.setItem('daily_access_count', currentCount);
                if(accessCountEl) {
                    accessCountEl.textContent = currentCount;
                }
            }, 45000);

            // Limpar intervalo se a página for fechada
            window.addEventListener('beforeunload', () => {
                clearInterval(accessInterval);
            });
        }

        // Iniciar contadores com delay para não travar
        setTimeout(() => {
            updateOnlineUsers();
            initializeDailyAccess();
            
            // Atualizar online users com intervalo maior
            setInterval(updateOnlineUsers, 15000); // Aumentado para 15s
        }, 1000);
    }

    // ==========================================================
    // 4. CONTAGEM REGRESSIVA DA PROMOÇÃO
    // ==========================================================
    function setupPromoCountdown() {
        const countdownEl = document.getElementById('countdown-timer');
        if (!countdownEl) return;

        let timeInSeconds = 2 * 60 * 60; // 2 horas
        
        function updateCountdown() {
            if (timeInSeconds <= 0) {
                countdownEl.textContent = "OFERTA ENCERRADA";
                countdownEl.style.background = "rgba(255, 0, 0, 0.5)";
                return;
            }
            
            const hours = Math.floor(timeInSeconds / 3600);
            const minutes = Math.floor((timeInSeconds % 3600) / 60);
            const seconds = timeInSeconds % 60;
            
            countdownEl.textContent = 
                `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            
            timeInSeconds--;
        }

        // Iniciar com delay
        setTimeout(() => {
            updateCountdown();
            setInterval(updateCountdown, 1000);
        }, 500);
    }

    // ==========================================================
    // 5. CONTADOR DE COMPRAS (SIMPLIFICADO)
    // ==========================================================
    function setupPurchaseCounter() {
        // Só ativar se necessário
        if (!document.querySelector('.plan-btn')) return;
        
        let totalSales = parseInt(localStorage.getItem('total_sales')) || 0;
        
        // Criar contador de vendas apenas se não existir
        if (!document.querySelector('.sales-counter') && totalSales > 0) {
            const salesCounter = document.createElement('div');
            salesCounter.className = 'sales-counter';
            salesCounter.innerHTML = `
                <span class="fire-icon">🔥</span>
                <span id="total-sales-count">${totalSales}</span> vendas hoje
            `;
            document.body.appendChild(salesCounter);
            
            // Mostrar após animação
            setTimeout(() => {
                salesCounter.style.display = 'flex';
            }, 1000);
        }
        
        // Simulação leve de compras
        if (Math.random() > 0.5) { // 50% chance de ativar
            setTimeout(() => {
                simulateRandomPurchase();
            }, 5000);
        }
        
        function simulateRandomPurchase() {
            const randomTime = Math.random() * (90000 - 30000) + 30000; // 30-90 segundos
            
            setTimeout(() => {
                // Incrementar vendas
                totalSales++;
                localStorage.setItem('total_sales', totalSales);
                
                // Atualizar contador se existir
                const salesCountEl = document.getElementById('total-sales-count');
                if (salesCountEl) {
                    salesCountEl.textContent = totalSales;
                }
                
                // Próxima simulação
                simulateRandomPurchase();
            }, randomTime);
        }
    }

    // ==========================================================
    // 6. FUNCIONALIDADES ESPECÍFICAS DA PÁGINA BIO
    // ==========================================================
    function setupBioPageFeatures() {
        if (!window.location.pathname.includes('bio.html')) return;
        
        // Vagas decrescentes
        let spots = 3;
        const spotsElement = document.getElementById('remaining-spots');
        const urgencySection = document.getElementById('urgency-section');
        
        if (spotsElement && urgencySection) {
            // Diminuir vagas lentamente
            const spotsInterval = setInterval(() => {
                if (spots > 0) {
                    spots--;
                    spotsElement.textContent = spots;
                    
                    if (spots === 1) {
                        urgencySection.innerHTML = '🚨 <strong>ÚLTIMA VAGA!</strong> Essa é sua última chance! 🔥';
                        urgencySection.style.background = 'linear-gradient(90deg, #ff0000, #ff0000)';
                    } else if (spots === 0) {
                        urgencySection.innerHTML = '⛔ <strong>VAGAS ESGOTADAS!</strong> Volte amanhã!';
                        urgencySection.style.background = 'linear-gradient(90deg, #333, #555)';
                        urgencySection.style.animation = 'none';
                        clearInterval(spotsInterval);
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
        
        // Efeito nos botões
        document.querySelectorAll('.plan-btn.enhanced').forEach(btn => {
            btn.addEventListener('click', function(e) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
                
                // Atualizar vagas se clicado
                if (spots > 0 && spotsElement) {
                    spots--;
                    spotsElement.textContent = spots;
                }
            });
        });
    }

    // ==========================================================
    // 7. INICIALIZAÇÃO OTIMIZADA
    // ==========================================================
    console.log("Iniciando configurações...");
    
    // Executar funções com delays estratégicos
    setTimeout(setupConsentModal, 100);
    setTimeout(setupPreviewCards, 200);
    setTimeout(setupDynamicCounters, 300);
    setTimeout(setupPromoCountdown, 400);
    setTimeout(setupPurchaseCounter, 500);
    setTimeout(setupBioPageFeatures, 600);
    
    // Efeitos leves nos cards
    setTimeout(() => {
        document.querySelectorAll('.plan-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }, 1000);
    
    console.log("Configuração completa!");
});

// Função auxiliar global
function getQueryParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
}
