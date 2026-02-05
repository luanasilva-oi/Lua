// COMBINED AND ROBUST script.js (VERSÃO ATUALIZADA COM IDIOMAS)

document.addEventListener('DOMContentLoaded', async () => {
    // Aguardar inicialização do gerenciador de idiomas
    if (window.languageManager) {
        await languageManager.init();
    }

    // ==========================================================
    // 1. LÓGICA DO MODAL DE CONSENTIMENTO (COM IDIOMA)
    // ==========================================================
    const consentModal = document.getElementById('consent-modal');
    const consentYesBtn = document.getElementById('consent-yes');
    const mainContent = document.getElementById('main-content');

    // Só executa se os elementos do modal existirem na página
    if (consentModal && consentYesBtn && mainContent) {
        console.log("Elementos do modal encontrados.");
        
        // Garantir que o modal esteja visível inicialmente
        consentModal.style.display = 'flex';
        mainContent.style.filter = 'blur(10px)';
        mainContent.style.pointerEvents = 'none';

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
        console.log("Página explícita detectada. Ativando lógica de prévias.");
        
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
    // 3. OUTRAS FUNCIONALIDADES DINÂMICAS
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
    // 4. LÓGICA DA CONTAGEM REGRESSIVA DA PROMOÇÃO
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
                const endedText = languageManager ? languageManager.get('offerEnded') : 'OFERTA ENCERRADA';
                countdownEl.textContent = endedText;
                countdownEl.style.background = "rgba(255, 0, 0, 0.5)";
            }
            timeInSeconds--;
        }, 1000);
    }
    startPromoCountdown();

    // ==========================================================
    // 5. CONTADOR DE COMPRAS PROFISSIONAL (ATUALIZADO)
    // ==========================================================
    function initializeProfessionalPurchaseCounter() {
        // Lista de nomes baseados no idioma
        const getNamesByLanguage = () => {
            const currentLang = languageManager?.currentLang || 'pt';
            
            if (currentLang === 'pt') {
                return [
                    'Pedro', 'João', 'Lucas', 'Mateus', 'Gabriel', 'Rafael', 'Felipe', 'Daniel',
                    'Marcos', 'Thiago', 'Carlos', 'Eduardo', 'Bruno', 'Leonardo', 'André',
                    'Robson', 'Mario', 'Miguel', 'Bejamim', 'Arthur', 'Izaque', 'Israel', 'Victor',
                    'Julio', 'Tico', 'Vitor', 'Alex', 'Adriano', 'Chico', 'Daniel'
                ];
            } else if (currentLang === 'es') {
                return [
                    'Carlos', 'Juan', 'Luis', 'Miguel', 'José', 'Javier', 'Francisco', 'David',
                    'Antonio', 'Manuel', 'Pedro', 'Jorge', 'Sergio', 'Fernando', 'Diego',
                    'Alejandro', 'Raúl', 'Pablo', 'Ángel', 'Rubén', 'Ricardo', 'Roberto', 'Alberto',
                    'Eduardo', 'Víctor', 'Mario', 'Jesús', 'Óscar', 'Andrés', 'Alfonso'
                ];
            } else {
                return [
                    'John', 'Michael', 'David', 'James', 'Robert', 'William', 'Joseph', 'Richard',
                    'Thomas', 'Charles', 'Daniel', 'Matthew', 'Anthony', 'Donald', 'Mark', 'Paul',
                    'Steven', 'Andrew', 'Kenneth', 'Joshua', 'George', 'Kevin', 'Brian', 'Edward',
                    'Ronald', 'Timothy', 'Jason', 'Jeffrey', 'Ryan', 'Jacob'
                ];
            }
        };
        
        // Criar contador de vendas total
        let totalSales = parseInt(localStorage.getItem('total_sales')) || 0;
        
        // Criar elemento do contador de vendas
        if (!document.querySelector('.sales-counter')) {
            const salesCounter = document.createElement('div');
            salesCounter.className = 'sales-counter';
            salesCounter.innerHTML = `
                <span class="fire-icon">🔥</span>
                <span id="total-sales-count">${totalSales}</span> ${languageManager ? languageManager.get('dailyAccess').replace('acessos hoje', 'vendas hoje') : 'vendas hoje'}
            `;
            document.body.appendChild(salesCounter);
        }
        
        // Atualizar contador de vendas
        function updateSalesCounter() {
            const salesCountEl = document.getElementById('total-sales-count');
            if (salesCountEl) {
                salesCountEl.textContent = totalSales;
            }
            const salesCounter = document.querySelector('.sales-counter');
            if (salesCounter && totalSales > 0) {
                salesCounter.style.display = 'flex';
            }
        }
        
        // Função para mostrar notificação de compra
        function showPurchaseNotification(planType) {
            // Remover notificação anterior se existir
            const oldNotification = document.querySelector('.purchase-notification');
            if (oldNotification) {
                oldNotification.style.animation = 'slideOut 0.5s ease forwards';
                setTimeout(() => {
                    if (oldNotification.parentNode) {
                        oldNotification.remove();
                    }
                }, 500);
            }
            
            // Escolher nome aleatório baseado no idioma
            const names = getNamesByLanguage();
            const randomName = names[Math.floor(Math.random() * names.length)];
            
            // Determinar plano e cores
            const planName = planType === 'basic' ? 
                (languageManager ? languageManager.get('basicTitle') : 'Acesso Básico 🛡️') : 
                (languageManager ? languageManager.get('completeTitle') : 'Acesso Completo ⭐');
            const planClass = planType === 'basic' ? 'basic' : 'complete';
            const planIcon = planType === 'basic' ? '🛡️' : '⭐';
            
            // Criar nova notificação
            const notification = document.createElement('div');
            notification.className = `purchase-notification ${planClass}`;
            notification.innerHTML = `
                <div class="notification-content">
                    <div class="icon">${planIcon}</div>
                    <div class="text-content">
                        <div class="purchase-text">${randomName} ${languageManager ? languageManager.get('dailyAccess').includes('acesso') ? 'comprou' : 'purchased' : 'comprou'}</div>
                        <div class="plan-info">
                            <span class="plan-type">${planName}</span>
                        </div>
                        <div class="time-ago">${languageManager ? languageManager.get('mostUsers').includes('agora') ? 'Agora mesmo' : 'Just now' : 'Agora mesmo'}</div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            // Mostrar notificação
            setTimeout(() => {
                notification.style.display = 'block';
            }, 50);
            
            // Incrementar vendas totais
            totalSales++;
            localStorage.setItem('total_sales', totalSales);
            updateSalesCounter();
            
            // Remover notificação após 6 segundos
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.style.animation = 'slideOut 0.5s ease forwards';
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.remove();
                        }
                    }, 500);
                }
            }, 6000);
        }
        
        // Simular compras aleatórias
        function simulateRandomPurchase() {
            // Tempo aleatório entre 25 e 60 segundos
            const randomTime = Math.random() * (60000 - 25000) + 25000;
            
            setTimeout(() => {
                // Escolher plano aleatório (60% chance de completo, 40% básico)
                const randomPlan = Math.random() < 0.6 ? 'complete' : 'basic';
                
                // Mostrar notificação
                showPurchaseNotification(randomPlan);
                
                // Próxima simulação
                simulateRandomPurchase();
            }, randomTime);
        }
        
        // Inicializar contador de vendas
        updateSalesCounter();
        
        // Mostrar contador ao rolar
        window.addEventListener('scroll', () => {
            const salesCounter = document.querySelector('.sales-counter');
            if (salesCounter && totalSales > 0) {
                salesCounter.style.display = 'flex';
            }
        });
        
        // Iniciar simulação após 5 segundos
        setTimeout(simulateRandomPurchase, 5000);
    }

    // ==========================================================
    // 6. INICIALIZAÇÃO DOS SISTEMAS
    // ==========================================================
    
    // Inicializar contador de compras profissional
    setTimeout(initializeProfessionalPurchaseCounter, 3000);
    
    // Efeito de clique nos botões de plano
    document.querySelectorAll('.plan-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Pequeno feedback visual
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    // Efeito hover nos cards de plano
    document.querySelectorAll('.plan-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ==========================================================
    // 7. FUNCIONALIDADES ESPECÍFICAS DA PÁGINA BIO
    // ==========================================================
    if (window.location.pathname.includes('bio.html')) {
        // Contador de vagas decrescente
        let spots = 3;
        const spotsElement = document.getElementById('remaining-spots');
        const urgencySection = document.getElementById('urgency-section');
        
        if (spotsElement && urgencySection) {
            // Atualizar texto de urgência com tradução
            const updateUrgencyText = () => {
                if (spots > 1) {
                    const text = languageManager ? 
                        languageManager.get('urgencyText', { spots }) : 
                        `⚠️ <strong>ÚLTIMAS VAGAS DISPONÍVEIS!</strong> Apenas ${spots} pessoas podem entrar hoje!`;
                    urgencySection.innerHTML = text;
                } else if (spots === 1) {
                    const text = languageManager ? 
                        languageManager.get('lastSpot') : 
                        '🚨 <strong>ÚLTIMA VAGA!</strong> Essa é sua última chance! 🔥';
                    urgencySection.innerHTML = text;
                    urgencySection.style.background = 'linear-gradient(90deg, #ff0000, #ff0000)';
                } else if (spots === 0) {
                    const text = languageManager ? 
                        languageManager.get('spotsEnded') : 
                        '⛔ <strong>VAGAS ESGOTADAS!</strong> Volte amanhã!';
                    urgencySection.innerHTML = text;
                    urgencySection.style.background = 'linear-gradient(90deg, #333, #555)';
                    urgencySection.style.animation = 'none';
                }
            };
            
            // Inicializar texto
            updateUrgencyText();
            
            // Diminuir vagas a cada 90 segundos
            setInterval(() => {
                if(spots > 0) {
                    spots--;
                    spotsElement.textContent = spots;
                    updateUrgencyText();
                }
            }, 90000);
        }
        
        // FAQ
        document.querySelectorAll('.faq-question').forEach(button => {
            button.addEventListener('click', () => {
                button.classList.toggle('active');
                const answer = button.nextElementSibling;
                answer.classList.toggle('show');
            });
        });
        
        // Efeito de clique nos botões aprimorados
        document.querySelectorAll('.plan-btn.enhanced').forEach(btn => {
            btn.addEventListener('click', function(e) {
                // Feedback visual
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
                
                // Atualizar contador de vagas imediatamente
                if(spots > 0) {
                    spots--;
                    if (spotsElement) spotsElement.textContent = spots;
                    if (urgencySection) updateUrgencyText();
                }
            });
        });
        
        // Simular atualização de vendas
        setInterval(() => {
            const accessCount = document.getElementById('access-count');
            const onlineCount = document.getElementById('online-count');
            
            if(accessCount) {
                let current = parseInt(accessCount.textContent);
                if(current < 100) {
                    accessCount.textContent = current + Math.floor(Math.random() * 3);
                }
            }
            
            if(onlineCount) {
                let current = parseInt(onlineCount.textContent);
                onlineCount.textContent = Math.floor(Math.random() * (25 - 15 + 1)) + 15;
            }
        }, 30000);
    }

    // ==========================================================
    // 8. ATUALIZAR TEXTO DINÂMICO AO MUDAR IDIOMA
    // ==========================================================
    window.addEventListener('languageChanged', function() {
        // Atualizar contador regressivo se a oferta terminou
        const countdownEl = document.getElementById('countdown-timer');
        if (countdownEl && countdownEl.textContent.includes('ENCERRADA') || countdownEl.textContent.includes('ENDED') || countdownEl.textContent.includes('FINALIZADA')) {
            countdownEl.textContent = languageManager ? languageManager.get('offerEnded') : 'OFERTA ENCERRADA';
        }
        
        // Atualizar notificações de vendas se existirem
        const salesCounter = document.querySelector('.sales-counter');
        if (salesCounter) {
            const salesCount = document.getElementById('total-sales-count');
            const count = salesCount ? salesCount.textContent : '0';
            salesCounter.innerHTML = `
                <span class="fire-icon">🔥</span>
                <span id="total-sales-count">${count}</span> ${languageManager ? languageManager.get('dailyAccess').replace('acessos hoje', 'vendas hoje') : 'vendas hoje'}
            `;
        }
        
        // Atualizar texto de urgência na página bio
        if (window.location.pathname.includes('bio.html')) {
            const spotsElement = document.getElementById('remaining-spots');
            const urgencySection = document.getElementById('urgency-section');
            
            if (spotsElement && urgencySection) {
                const spots = parseInt(spotsElement.textContent);
                if (spots > 1) {
                    urgencySection.innerHTML = languageManager ? 
                        languageManager.get('urgencyText', { spots }) : 
                        `⚠️ <strong>ÚLTIMAS VAGAS DISPONÍVEIS!</strong> Apenas ${spots} pessoas podem entrar hoje!`;
                }
            }
        }
    });
});

// Funções auxiliares globais
function getQueryParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
}
