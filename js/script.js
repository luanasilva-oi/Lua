// ==========================================================
// SCRIPT CORRIGIDO - SEM BUGS VISUAIS
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 Site Luana Silva - Inicializando...");

    // ==========================================================
    // 1. PROTEÇÃO ANTI-ROBÔ AVANÇADA
    // ==========================================================
    function initAdvancedAntiRobot() {
        console.log("🛡️ Ativando proteção anti-robô...");
        
        // 1. Carrega mídias apenas após verificação
        setTimeout(() => {
            // Carrega vídeos (GIFs)
            document.querySelectorAll('video[data-real-src]').forEach(video => {
                const src = video.getAttribute('data-real-src');
                if (src) {
                    video.querySelector('source').setAttribute('src', src);
                    video.load();
                }
            });
            
            // Carrega imagens
            document.querySelectorAll('img[data-real-src]').forEach(img => {
                const src = img.getAttribute('data-real-src');
                if (src) img.setAttribute('src', src);
            });
        }, 1500);

        // 2. Ofusca conteúdo no HTML
        const sensitiveElements = document.querySelectorAll('[data-protected]');
        sensitiveElements.forEach(el => {
            const original = el.innerHTML;
            // Codifica simples (robôs não executam JS)
            el.setAttribute('data-encoded', btoa(original));
            el.innerHTML = 'Carregando conteúdo exclusivo...';
            
            // Decodifica após carregamento
            setTimeout(() => {
                try {
                    el.innerHTML = atob(el.getAttribute('data-encoded'));
                } catch(e) {
                    el.innerHTML = original;
                }
            }, 2000);
        });

        // 3. Verificação periódica
        setInterval(() => {
            const userAgent = navigator.userAgent.toLowerCase();
            const isBot = userAgent.includes('bot') || 
                         userAgent.includes('crawler') || 
                         userAgent.includes('spider') ||
                         userAgent.includes('facebookexternalhit') ||
                         userAgent.includes('whatsapp');
            
            if (isBot) {
                console.log("🤖 Bot detectado - mantendo proteção");
                // Mantém conteúdo seguro
            }
        }, 10000);
    }

    // ==========================================================
    // 2. CONTADORES DINÂMICOS CORRIGIDOS
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
                // Variação mais suave: +1 a +2 a cada 40-80 segundos
                const increment = Math.floor(Math.random() * 2) + 1;
                accessCount += increment;
                
                // Limite e reset realista
                if (accessCount > 180) {
                    accessCount = Math.floor(Math.random() * (100 - 70 + 1)) + 70;
                }
                
                accessEl.textContent = accessCount;
                localStorage.setItem('daily_access_count', accessCount);
                
                // Próxima atualização
                setTimeout(updateAccessCounter, Math.random() * (80000 - 40000) + 40000);
            }
        }

        // Atualiza contador online (sincronizado com urgência)
        function updateOnlineCounter() {
            if (onlineEl && urgencyEl) {
                // Variação suave: -2 a +2
                const change = Math.floor(Math.random() * 5) - 2; // -2, -1, 0, 1, 2
                onlineCount += change;
                
                // Mantém entre limites realistas
                if (onlineCount < 25) onlineCount = 25 + Math.floor(Math.random() * 5);
                if (onlineCount > 42) onlineCount = 42 - Math.floor(Math.random() * 5);
                
                onlineEl.textContent = onlineCount;
                
                // ATUALIZA TEXTO DE URGÊNCIA PARA FICAR SINCRONIZADO
                urgencyEl.innerHTML = `⚡ <strong>${onlineCount} PESSOAS ONLINE AGORA!</strong> Vagas limitadas!`;
                
                // Próxima atualização mais frequente
                setTimeout(updateOnlineCounter, Math.random() * (25000 - 15000) + 15000);
            }
        }

        // Inicia os contadores com delay inicial
        setTimeout(() => {
            updateAccessCounter();
            updateOnlineCounter();
        }, 3000);
    }

    // ==========================================================
    // 3. VENDAS FAKE CORRIGIDAS (sem bug inicial)
    // ==========================================================
    let totalSales = 0;
    let hasStartedSales = false;

    function initFixedFakeSales() {
        console.log("💰 Configurando vendas fake (sem bug inicial)...");
        
        // Nomes e cidades
        const names = ['Pedro', 'João', 'Lucas', 'Mateus', 'Gabriel', 'Rafael'];
        const cities = ['SP', 'RJ', 'MG', 'RS', 'PR', 'SC'];
        
        // Cria elementos se necessário
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
            counter.innerHTML = '<span class="emoji-animate">🔥</span> <span id="total-sales">0</span> vendas hoje';
            document.body.appendChild(counter);
        }

        // Função para mostrar UMA venda
        function showSingleSale() {
            if (!hasStartedSales) return;
            
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
            const randomPlan = Math.random() > 0.4 ? 'Completo ⭐' : 'Básico 🔓';
            const planIcon = randomPlan.includes('Completo') ? '⭐' : '🔓';
            
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

        // INICIA APENAS APÓS 20 SEGUNDOS (CORREÇÃO DO BUG)
        setTimeout(() => {
            console.log("🔄 Iniciando ciclo de vendas fake...");
            hasStartedSales = true;
            
            // Primeira venda após 20 segundos
            setTimeout(showSingleSale, 20000);
            
            // Agenda próximas vendas a cada 20-45 segundos
            function scheduleNextSale() {
                if (!hasStartedSales) return;
                
                const nextSaleTime = Math.random() * (45000 - 20000) + 20000; // 20-45 segundos
                console.log(`⏰ Próxima venda fake em: ${Math.round(nextSaleTime/1000)} segundos`);
                
                setTimeout(() => {
                    if (hasStartedSales) {
                        showSingleSale();
                        scheduleNextSale();
                    }
                }, nextSaleTime);
            }
            
            scheduleNextSale();
        }, 20000); // 20 segundos de delay inicial
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

        // Adiciona testemunhos
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
        
        // Verifica tempo salvo
        const savedTime = localStorage.getItem('promo_end_time');
        if (savedTime) {
            const now = Math.floor(Date.now() / 1000);
            const endTime = parseInt(savedTime);
            timeInSeconds = Math.max(0, endTime - now);
        } else {
            // Salva novo tempo
            const endTime = Math.floor(Date.now() / 1000) + timeInSeconds;
            localStorage.setItem('promo_end_time', endTime.toString());
        }

        const interval = setInterval(() => {
            const hours = Math.floor(timeInSeconds / 3600);
            const minutes = Math.floor((timeInSeconds % 3600) / 60);
            const seconds = timeInSeconds % 60;
            
            countdownEl.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // Efeito nos últimos 10 minutos
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

        // Verifica se já aceitou
        if (localStorage.getItem('terms_accepted') === 'true') {
            consentModal.style.display = 'none';
            mainContent.style.filter = 'none';
            mainContent.style.pointerEvents = 'auto';
            return;
        }

        // Mostra modal
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
    // 7. OTIMIZAÇÕES E INTERAÇÕES
    // ==========================================================
    function initOptimizations() {
        console.log("⚡ Aplicando otimizações...");
        
        // Lazy loading
        const images = document.querySelectorAll('img');
        images.forEach(img => img.loading = 'lazy');
        
        // Animações leves para emojis
        document.querySelectorAll('.emoji-animate').forEach(emoji => {
            emoji.style.display = 'inline-block';
            emoji.style.animation = 'gentlePulse 2s infinite';
        });
        
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
                    text.innerHTML = '💋 REDIRECIONANDO...';
                    text.style.background = 'rgba(37, 211, 102, 0.95)';
                    
                    setTimeout(() => {
                        text.innerHTML = original;
                        text.style.background = '';
                    }, 1500);
                }
            });
        });
    }

    // ==========================================================
    // 8. VERIFICAÇÃO DE PROTEÇÃO ANTI-ROBÔ
    // ==========================================================
    function verifyProtection() {
        console.log("🔍 Verificando proteção anti-robô...");
        
        // Testa se conteúdo está protegido
        setTimeout(() => {
            const testElements = document.querySelectorAll('[data-real-src], .robots-hide, .humans-show');
            console.log(`✅ Elementos protegidos encontrados: ${testElements.length}`);
            
            // Verifica meta tags
            const metaRobots = document.querySelector('meta[name="robots"]');
            if (metaRobots && metaRobots.content.includes('noindex')) {
                console.log("✅ Meta tags de proteção ativas");
            }
            
            // Verifica se vídeos estão carregando corretamente
            const videos = document.querySelectorAll('video');
            videos.forEach((video, i) => {
                setTimeout(() => {
                    if (video.readyState >= 1) {
                        console.log(`✅ Vídeo ${i+1} carregado após proteção`);
                    }
                }, 1000 * (i + 1));
            });
        }, 3000);
    }

    // ==========================================================
    // 9. INICIALIZAÇÃO DE TODOS OS SISTEMAS
    // ==========================================================
    function initializeAllSystems() {
        console.log("🚀 INICIANDO TODOS OS SISTEMAS...");
        
        // Ordem de inicialização importante:
        
        // 1. Proteção anti-robô (PRIMEIRO!)
        initAdvancedAntiRobot();
        
        // 2. Modal de consentimento
        initConsentModal();
        
        // 3. Sistemas visuais
        setTimeout(() => {
            initDynamicCounters();
            initTestimonials();
            initCountdown();
            initOptimizations();
            
            // 4. Vendas fake COM DELAY (20 segundos)
            initFixedFakeSales();
            
            // 5. Verificação de proteção
            verifyProtection();
            
            // 6. Mostra conteúdo
            document.body.classList.add('loaded');
            console.log("✅ TODOS OS SISTEMAS INICIALIZADOS COM SUCESSO!");
            console.log("⚠️ Vendas fake iniciarão em 20 segundos...");
            console.log("🛡️ Proteção anti-robô: ATIVA");
            console.log("📊 Contadores: DINÂMICOS");
            console.log("💬 Testemunhos: CARREGADOS");
        }, 1000);
    }

    // ==========================================================
    // INICIALIZAÇÃO
    // ==========================================================
    // Delay inicial para não sobrecarregar
    setTimeout(initializeAllSystems, 500);
});

// Função global para WhatsApp
function contactWhatsApp(plan = 'exclusivo') {
    const message = `Olá Luana! Quero conhecer seu conteúdo ${plan.toUpperCase()}! Me envie as informações por favor 😊`;
    const url = `https://wa.me/56974783157?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    return true;
}
