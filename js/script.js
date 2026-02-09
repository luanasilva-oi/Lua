// ==========================================================
// SCRIPT CORRIGIDO - SISTEMA DE VENDAS OTIMIZADO
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 Site Luana Silva - Inicializando...");

    // ==========================================================
    // 1. CONFIGURAÇÃO DE VENDAS FAKE OTIMIZADA
    // ==========================================================
    let totalSales = 0;
    let salesTimer = null;
    let isFirstSaleShown = false;

    function initOptimizedFakeSales() {
        console.log("💰 Iniciando sistema de vendas otimizado...");
        
        // Dados para vendas fake
        const names = ['Pedro', 'João', 'Lucas', 'Mateus', 'Gabriel', 'Rafael'];
        const cities = ['SP', 'RJ', 'MG', 'RS', 'PR', 'SC'];
        
        // Cria elementos se não existirem
        if (!document.getElementById('sales-notification')) {
            const notification = document.createElement('div');
            notification.id = 'sales-notification';
            notification.className = 'sales-notification';
            document.body.appendChild(notification);
        }

        if (!document.getElementById('sales-counter')) {
            const counter = document.createElement('div');
            counter.id = 'sales-counter';
            counter.className = 'sales-counter';
            counter.innerHTML = '<span>🔥</span> <span id="total-sales">0</span> vendas hoje';
            document.body.appendChild(counter);
        }

        // Função para mostrar UMA venda
        function showSingleSale() {
            const notification = document.getElementById('sales-notification');
            const counter = document.getElementById('sales-counter');
            const totalSalesEl = document.getElementById('total-sales');
            
            if (!notification || !counter || !totalSalesEl) return;

            // Incrementa vendas
            totalSales++;
            totalSalesEl.textContent = totalSales;

            // Mostra contador após primeira venda
            if (totalSales === 1) {
                counter.style.display = 'flex';
                setTimeout(() => {
                    counter.style.opacity = '1';
                }, 100);
            }

            // Dados aleatórios
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomCity = cities[Math.floor(Math.random() * cities.length)];
            
            // Escolhe plano aleatório (60% chance de completo, 40% de básico)
            const isComplete = Math.random() < 0.6;
            const randomPlan = isComplete ? 'Completo ⭐' : 'Básico 🔓';
            const planIcon = isComplete ? '⭐' : '🔓';
            
            // Tempo aleatório
            const times = ['há 2 min', 'há 5 min', 'há 8 min', 'há 12 min', 'há 15 min', 'agora mesmo'];
            const randomTime = times[Math.floor(Math.random() * times.length)];

            // Cria notificação
            notification.innerHTML = `
                <div class="sales-content">
                    <div class="sales-icon">${planIcon}</div>
                    <div class="sales-text">
                        <div class="sales-name">${randomName} • ${randomCity}</div>
                        <div class="sales-plan">Acabou de comprar: ${randomPlan}</div>
                        <div class="sales-time">${randomTime}</div>
                    </div>
                </div>
            `;
            
            // Mostra com animação
            notification.style.display = 'block';
            notification.style.animation = 'slideInRight 0.5s ease';
            
            // Remove após 6-8 segundos
            const removeTime = Math.random() * (8000 - 6000) + 6000;
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.5s ease forwards';
                setTimeout(() => {
                    notification.style.display = 'none';
                    notification.style.animation = '';
                }, 500);
            }, removeTime);
        }

        // INICIA O SISTEMA DE VENDAS
        function startSalesSystem() {
            // 1. PRIMEIRA VENDA (2 segundos após carregar)
            setTimeout(() => {
                console.log("🔄 Gerando primeira venda fake...");
                showSingleSale();
                isFirstSaleShown = true;
                
                // 2. INICIA CICLO AUTOMÁTICO (20-40 segundos)
                function scheduleNextSale() {
                    // Para o timer anterior se existir
                    if (salesTimer) clearTimeout(salesTimer);
                    
                    // Tempo aleatório entre 20 e 40 segundos
                    const nextSaleTime = Math.random() * (40000 - 20000) + 20000;
                    
                    console.log(`⏱️ Próxima venda em: ${Math.round(nextSaleTime/1000)} segundos`);
                    
                    salesTimer = setTimeout(() => {
                        showSingleSale();
                        // Agenda próxima venda
                        scheduleNextSale();
                    }, nextSaleTime);
                }
                
                // Inicia o ciclo
                scheduleNextSale();
            }, 2000); // 2 segundos para a primeira venda
        }

        // Inicia o sistema
        startSalesSystem();

        // Pausa vendas quando página não está visível
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                console.log("⏸️ Vendas pausadas (página oculta)");
                if (salesTimer) clearTimeout(salesTimer);
            } else if (isFirstSaleShown) {
                console.log("▶️ Vendas retomadas (página visível)");
                // Agenda próxima venda após voltar
                const nextSaleTime = Math.random() * (40000 - 20000) + 20000;
                salesTimer = setTimeout(() => {
                    showSingleSale();
                    scheduleNextSale();
                }, nextSaleTime);
            }
        });
    }

    // ==========================================================
    // 2. CONTADORES DINÂMICOS
    // ==========================================================
    let accessCount = 44;
    let onlineCount = 30;

    function initDynamicCounters() {
        console.log("📊 Iniciando contadores dinâmicos...");
        
        const accessEl = document.getElementById("access-count");
        const onlineEl = document.getElementById("online-count");
        const urgencyEl = document.getElementById("urgency-text");

        if (!accessEl || !onlineEl || !urgencyEl) return;

        // Atualiza contador de acessos
        function updateAccessCounter() {
            if (accessEl) {
                const increment = Math.floor(Math.random() * 2) + 1;
                accessCount += increment;
                
                if (accessCount > 180) {
                    accessCount = Math.floor(Math.random() * (100 - 70 + 1)) + 70;
                }
                
                accessEl.textContent = accessCount;
                localStorage.setItem('daily_access_count', accessCount);
                
                setTimeout(updateAccessCounter, Math.random() * (80000 - 40000) + 40000);
            }
        }

        // Atualiza contador online
        function updateOnlineCounter() {
            if (onlineEl && urgencyEl) {
                const change = Math.floor(Math.random() * 5) - 2;
                onlineCount += change;
                
                if (onlineCount < 25) onlineCount = 25 + Math.floor(Math.random() * 5);
                if (onlineCount > 42) onlineCount = 42 - Math.floor(Math.random() * 5);
                
                onlineEl.textContent = onlineCount;
                urgencyEl.innerHTML = `⚡ <strong>${onlineCount} PESSOAS ONLINE AGORA!</strong> Vagas limitadas!`;
                
                setTimeout(updateOnlineCounter, Math.random() * (25000 - 15000) + 15000);
            }
        }

        // Inicia os contadores
        setTimeout(() => {
            updateAccessCounter();
            updateOnlineCounter();
        }, 3000);
    }

    // ==========================================================
    // 3. PROTEÇÃO ANTI-ROBÔ
    // ==========================================================
    function initAntiBotProtection() {
        console.log("🛡️ Ativando proteção anti-robô...");
        
        // Carrega mídias após verificação
        setTimeout(() => {
            document.querySelectorAll('video[data-real-src]').forEach(video => {
                const src = video.getAttribute('data-real-src');
                if (src) {
                    video.querySelector('source').setAttribute('src', src);
                    video.load();
                }
            });
            
            document.querySelectorAll('img[data-real-src]').forEach(img => {
                const src = img.getAttribute('data-real-src');
                if (src) img.setAttribute('src', src);
            });
        }, 1500);
    }

    // ==========================================================
    // 4. TESTEMUNHOS FAKE
    // ==========================================================
    function initTestimonials() {
        console.log("💬 Carregando testemunhos...");
        
        const testimonials = [
            {
                name: 'Carlos, 28 anos • SP',
                rating: '⭐⭐⭐⭐⭐',
                text: 'Comprei semana passada e já vi mais de 100 vídeos. Vale cada centavo! Conteúdo real e muito explícito.',
                time: 'Comprou há 2 dias'
            },
            {
                name: 'Pedro, 32 anos • RJ',
                rating: '⭐⭐⭐⭐⭐',
                text: 'Já comprei vários conteúdos, mas esse é o mais autêntico. Os gemidos são reais, e ela não tem medo de mostrar tudo.',
                time: 'Comprou há 5 dias'
            },
            {
                name: 'Bruno, 25 anos • MG',
                rating: '⭐⭐⭐⭐⭐',
                text: 'Pensei que era exagero, mas são mais de 600 vídeos mesmo! A qualidade é incrível. Melhor investimento.',
                time: 'Comprou hoje'
            }
        ];

        const container = document.getElementById('testimonials-container');
        if (!container) return;

        testimonials.forEach(testimonial => {
            const card = document.createElement('div');
            card.className = 'testimonial-card';
            card.innerHTML = `
                <div class="testimonial-header">
                    <span class="testimonial-name">${testimonial.name}</span>
                    <span class="testimonial-rating">${testimonial.rating}</span>
                </div>
                <p class="testimonial-text">${testimonial.text}</p>
                <span class="testimonial-time">${testimonial.time}</span>
            `;
            container.appendChild(card);
        });
    }

    // ==========================================================
    // 5. CONTADOR PROMOCIONAL
    // ==========================================================
    function initCountdown() {
        console.log("⏱️ Iniciando contador promocional...");
        
        const countdownEl = document.getElementById('countdown-timer');
        if (!countdownEl) return;

        let timeInSeconds = 2 * 60 * 60; // 2 horas
        
        const savedTime = localStorage.getItem('promo_end_time');
        if (savedTime) {
            const now = Math.floor(Date.now() / 1000);
            const endTime = parseInt(savedTime);
            timeInSeconds = Math.max(0, endTime - now);
        } else {
            const endTime = Math.floor(Date.now() / 1000) + timeInSeconds;
            localStorage.setItem('promo_end_time', endTime.toString());
        }

        const interval = setInterval(() => {
            const hours = Math.floor(timeInSeconds / 3600);
            const minutes = Math.floor((timeInSeconds % 3600) / 60);
            const seconds = timeInSeconds % 60;
            
            countdownEl.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (timeInSeconds <= 600) {
                countdownEl.style.color = '#ff4444';
            }
            
            if (timeInSeconds <= 0) {
                clearInterval(interval);
                countdownEl.textContent = "OFERTA ENCERRADA";
                countdownEl.style.background = "rgba(255, 0, 0, 0.3)";
                localStorage.removeItem('promo_end_time');
            }
            
            timeInSeconds--;
        }, 1000);
    }

    // ==========================================================
    // 6. MODAL DE CONSENTIMENTO
    // ==========================================================
    function initConsentModal() {
        console.log("✅ Configurando modal de consentimento...");
        
        const consentModal = document.getElementById('consent-modal');
        const consentYesBtn = document.getElementById('consent-yes');
        const mainContent = document.getElementById('main-content');

        if (!consentModal || !consentYesBtn || !mainContent) return;

        if (localStorage.getItem('terms_accepted') === 'true') {
            consentModal.style.display = 'none';
            mainContent.style.filter = 'none';
            mainContent.style.pointerEvents = 'auto';
            return;
        }

        consentModal.style.display = 'flex';
        mainContent.style.filter = 'blur(10px)';
        mainContent.style.pointerEvents = 'none';

        function closeModal() {
            consentModal.style.display = 'none';
            mainContent.style.filter = 'none';
            mainContent.style.pointerEvents = 'auto';
            localStorage.setItem('terms_accepted', 'true');
        }

        consentYesBtn.addEventListener('click', closeModal);
        consentModal.addEventListener('click', (e) => {
            if (e.target === consentModal) closeModal();
        });
    }

    // ==========================================================
    // 7. OTIMIZAÇÕES
    // ==========================================================
    function initOptimizations() {
        console.log("⚡ Aplicando otimizações...");
        
        // Lazy loading
        const images = document.querySelectorAll('img');
        images.forEach(img => img.loading = 'lazy');
        
        // Feedback para botões
        document.querySelectorAll('.plan-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                this.style.transform = 'scale(0.97)';
                setTimeout(() => this.style.transform = '', 200);
            });
        });
        
        // Previews
        document.querySelectorAll('.preview-card.locked').forEach(card => {
            card.addEventListener('click', function() {
                const text = this.querySelector('.locked-text');
                if (text) {
                    const original = text.innerHTML;
                    text.innerHTML = '💋 ABRINDO WHATSAPP...';
                    text.style.background = 'rgba(37, 211, 102, 0.95)';
                    
                    setTimeout(() => {
                        window.open('https://wa.me/56974783157?text=Olá%20Luana!%20Vi%20as%20prévias%20e%20quero%20ver%20todo%20o%20conteúdo!%20Me%20envie%20as%20informações%20💋', '_blank');
                        text.innerHTML = original;
                        text.style.background = '';
                    }, 1500);
                }
            });
        });
    }

    // ==========================================================
    // 8. VERIFICAÇÃO
    // ==========================================================
    function verifyProtection() {
        console.log("🔍 Verificando proteção anti-robô...");
        
        setTimeout(() => {
            const testElements = document.querySelectorAll('[data-real-src]');
            console.log(`✅ Elementos protegidos encontrados: ${testElements.length}`);
        }, 3000);
    }

    // ==========================================================
    // 9. INICIALIZAÇÃO PRINCIPAL
    // ==========================================================
    function initializeAllSystems() {
        console.log("🚀 INICIANDO TODOS OS SISTEMAS...");
        
        // 1. Modal de consentimento
        initConsentModal();
        
        // 2. Proteção anti-robô
        initAntiBotProtection();
        
        // 3. Sistemas visuais
        setTimeout(() => {
            initDynamicCounters();
            initTestimonials();
            initCountdown();
            initOptimizations();
            
            // 4. SISTEMA DE VENDAS OTIMIZADO
            // IMPORTANTE: Esta é a correção principal
            initOptimizedFakeSales();
            
            // 5. Verificação
            verifyProtection();
            
            // 6. Mostra conteúdo
            document.body.classList.add('loaded');
            console.log("✅ TODOS OS SISTEMAS INICIALIZADOS COM SUCESSO!");
            console.log("💰 Vendas fake: ATIVO (1 venda inicial + a cada 20-40s)");
        }, 1000);
    }

    // ==========================================================
    // INICIALIZAÇÃO
    // ==========================================================
    setTimeout(initializeAllSystems, 500);
});

// Função global para WhatsApp
function contactWhatsApp(plan = 'exclusivo') {
    const message = `Olá Luana! Quero conhecer seu conteúdo ${plan.toUpperCase()}! Me envie as informações por favor 😊`;
    const url = `https://wa.me/56974783157?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    return true;
}
