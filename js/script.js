// ==========================================================
// SCRIPT COMPLETO COM TODOS OS SISTEMAS DINÂMICOS
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 Site Luana Silva - Inicializando sistemas...");

    // ==========================================================
    // 1. PROTEÇÃO ANTI-ROBÔ (Textos e GIFs invisíveis para crawlers)
    // ==========================================================
    function initAntiRobotProtection() {
        // Esconde todo o conteúdo sensível até que o JS carregue
        const sensitiveElements = document.querySelectorAll('.js-text, .protected-text, [data-sensitive]');
        
        // Mostra textos apenas após carregamento
        setTimeout(() => {
            document.querySelectorAll('.js-text').forEach(el => {
                el.style.display = 'block';
                el.style.opacity = '1';
                el.style.position = 'static';
            });
            
            // Esconde textos de proteção
            document.querySelectorAll('.protected-text').forEach(el => {
                el.style.display = 'none';
            });
        }, 1000);

        // Ofusca URLs dos vídeos para robôs
        const videos = document.querySelectorAll('video source');
        videos.forEach((video, index) => {
            // Armazena o src real em data attribute
            const realSrc = video.getAttribute('src');
            if (realSrc && !realSrc.includes('data:')) {
                video.setAttribute('data-real-src', realSrc);
                video.removeAttribute('src');
                
                // Restaura após carregamento
                setTimeout(() => {
                    video.setAttribute('src', realSrc);
                    video.load();
                }, 1500 + (index * 500));
            }
        });

        // Proteção contra inspeção
        const protectionScript = `
            // Bloqueia acesso ao código fonte
            document.addEventListener('keydown', function(e) {
                if (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S')) {
                    e.preventDefault();
                    return false;
                }
            });
            
            // Esconde elementos do DevTools
            Object.defineProperty(document, 'hidden', { get: () => true });
        `;
        
        // Executa a proteção
        try {
            const script = document.createElement('script');
            script.textContent = protectionScript;
            document.head.appendChild(script);
        } catch(e) {}
        
        console.log("🛡️ Proteção anti-robô ativada");
    }

    // ==========================================================
    // 2. CONTADORES DINÂMICOS (Acessos e Online)
    // ==========================================================
    let accessCount = 44;
    let onlineCount = 30;
    let isIncreasing = true;

    function initDynamicCounters() {
        const accessEl = document.getElementById("access-count");
        const onlineEl = document.getElementById("online-count");

        if (!accessEl || !onlineEl) return;

        // Função para atualizar contador de acessos
        function updateAccessCounter() {
            if (accessEl) {
                // Variação mais realista: +1 a +3 a cada 30-90 segundos
                const increment = Math.floor(Math.random() * 3) + 1;
                accessCount += increment;
                
                // Limite máximo realista
                if (accessCount > 200) {
                    accessCount = Math.floor(Math.random() * (120 - 80 + 1)) + 80; // Reseta
                }
                
                accessEl.textContent = accessCount;
                localStorage.setItem('daily_access_count', accessCount);
                
                // Próxima atualização em 30-90 segundos
                setTimeout(updateAccessCounter, Math.random() * (90000 - 30000) + 30000);
            }
        }

        // Função para atualizar contador online (mais dinâmico)
        function updateOnlineCounter() {
            if (onlineEl) {
                // Simula pessoas entrando e saindo
                const change = Math.random() > 0.5 ? 1 : -1;
                const amount = Math.floor(Math.random() * 3) + 1;
                
                onlineCount += (change * amount);
                
                // Mantém entre limites realistas
                if (onlineCount < 15) onlineCount = 15 + Math.floor(Math.random() * 5);
                if (onlineCount > 45) onlineCount = 45 - Math.floor(Math.random() * 5);
                
                onlineEl.textContent = onlineCount;
                
                // Atualiza mais frequentemente (10-30 segundos)
                setTimeout(updateOnlineCounter, Math.random() * (30000 - 10000) + 10000);
            }
        }

        // Inicia os contadores
        updateAccessCounter();
        updateOnlineCounter();
        
        // Atualiza a cada minuto também (backup)
        setInterval(() => {
            if (accessEl && onlineEl) {
                accessEl.textContent = accessCount;
                onlineEl.textContent = onlineCount;
            }
        }, 60000);

        console.log("📊 Contadores dinâmicos ativados");
    }

    // ==========================================================
    // 3. SISTEMA DE VENDAS FAKE DINÂMICAS
    // ==========================================================
    let totalSales = 0;
    let salesInterval;

    function initFakeSalesSystem() {
        // Nomes brasileiros realistas
        const names = [
            'Pedro', 'João', 'Lucas', 'Mateus', 'Gabriel', 'Rafael', 'Felipe', 'Daniel',
            'Marcos', 'Thiago', 'Carlos', 'Eduardo', 'Bruno', 'Leonardo', 'André',
            'Robson', 'Mário', 'Miguel', 'Benjamin', 'Arthur', 'Victor', 'Vitor',
            'Alex', 'Adriano', 'Francisco', 'Antônio', 'Ricardo', 'Roberto', 'Paulo'
        ];
        
        const cities = ['SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'BA', 'PE', 'CE', 'DF'];

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
            counter.innerHTML = '<span class="fire-icon">🔥</span> <span id="total-sales">0</span> vendas hoje';
            document.body.appendChild(counter);
        }

        // Função para mostrar notificação de venda
        function showSaleNotification() {
            const notification = document.getElementById('sales-notification');
            const counter = document.getElementById('sales-counter');
            const totalSalesEl = document.getElementById('total-sales');
            
            if (!notification || !counter || !totalSalesEl) return;

            // Incrementa vendas
            totalSales++;
            localStorage.setItem('total_sales_today', totalSales);
            totalSalesEl.textContent = totalSales;

            // Mostra contador
            counter.style.display = 'flex';
            
            // Escolhe dados aleatórios
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomCity = cities[Math.floor(Math.random() * cities.length)];
            const randomPlan = Math.random() > 0.4 ? 'Completo ⭐' : 'Básico 🔓';
            const planClass = randomPlan.includes('Completo') ? 'complete' : 'basic';
            
            // Tempos aleatórios
            const times = ['há 2 min', 'há 5 min', 'há 8 min', 'há 12 min', 'há 15 min', 'agora mesmo'];
            const randomTime = times[Math.floor(Math.random() * times.length)];

            // Cria notificação
            notification.innerHTML = `
                <div class="sales-content">
                    <div class="sales-icon">${randomPlan.includes('Completo') ? '⭐' : '🔓'}</div>
                    <div class="sales-text">
                        <div class="sales-name">${randomName} • ${randomCity}</div>
                        <div class="sales-plan ${planClass}">Acabou de comprar: ${randomPlan}</div>
                        <div class="sales-time">${randomTime}</div>
                    </div>
                </div>
            `;
            
            // Mostra notificação
            notification.style.display = 'block';
            
            // Remove após 8 segundos
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.5s ease forwards';
                setTimeout(() => {
                    notification.style.display = 'none';
                    notification.style.animation = '';
                }, 500);
            }, 8000);
        }

        // Inicia com algumas vendas
        const initialSales = Math.floor(Math.random() * 8) + 3;
        for (let i = 0; i < initialSales; i++) {
            setTimeout(() => showSaleNotification(), i * 3000);
        }
        totalSales = initialSales;
        document.getElementById('total-sales').textContent = totalSales;
        document.getElementById('sales-counter').style.display = 'flex';

        // Agenda vendas aleatórias (a cada 45-180 segundos)
        function scheduleNextSale() {
            const nextSaleTime = Math.random() * (180000 - 45000) + 45000; // 45-180 segundos
            salesInterval = setTimeout(() => {
                showSaleNotification();
                scheduleNextSale();
            }, nextSaleTime);
        }
        
        scheduleNextSale();

        console.log("💰 Sistema de vendas fake ativado");
    }

    // ==========================================================
    // 4. TESTEMUNHOS FAKE DINÂMICOS
    // ==========================================================
    function initFakeTestimonials() {
        const testimonials = [
            {
                name: 'Carlos, 28 anos • SP',
                rating: '⭐⭐⭐⭐⭐',
                text: 'Comprei semana passada e já vi mais de 100 vídeos. Vale cada centavo! Conteúdo real e muito explícito, exatamente como promete.',
                time: 'Comprou há 2 dias'
            },
            {
                name: 'Pedro, 32 anos • RJ',
                rating: '⭐⭐⭐⭐⭐',
                text: 'Já comprei vários conteúdos, mas esse é o mais autêntico. Os gemidos são reais, e ela não tem medo de mostrar tudo. Recomendo!',
                time: 'Comprou há 5 dias'
            },
            {
                name: 'Bruno, 25 anos • MG',
                rating: '⭐⭐⭐⭐⭐',
                text: 'Pensei que era exagero, mas são mais de 600 vídeos mesmo! A qualidade é incrível. Melhor investimento que fiz no ano.',
                time: 'Comprou hoje'
            },
            {
                name: 'André, 30 anos • PR',
                rating: '⭐⭐⭐⭐⭐',
                text: 'Conteúdo 100% real como prometido. Os vídeos são longos e mostram tudo sem cortes. Já indiquei pra dois amigos!',
                time: 'Comprou há 3 dias'
            },
            {
                name: 'Ricardo, 35 anos • SC',
                rating: '⭐⭐⭐⭐⭐',
                text: 'O acesso completo vale muito a pena. São mais de 600 vídeos mesmo, tudo muito bem filmado e explícito. Recomendo demais!',
                time: 'Comprou há 1 semana'
            },
            {
                name: 'Marcos, 27 anos • RS',
                rating: '⭐⭐⭐⭐⭐',
                text: 'Ela não engana, o conteúdo é realmente explícito e de qualidade. Gemidos autênticos e vídeos bem feitos. Superou minhas expectativas.',
                time: 'Comprou há 4 dias'
            }
        ];

        const container = document.getElementById('testimonials-container');
        if (!container) return;

        // Mistura os testemunhos
        const shuffled = [...testimonials].sort(() => Math.random() - 0.5);
        
        // Adiciona 3-4 testemunhos aleatórios
        const count = Math.floor(Math.random() * 2) + 3; // 3-4 testemunhos
        for (let i = 0; i < count && i < shuffled.length; i++) {
            const testimonial = shuffled[i];
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
        }

        // Rotaciona testemunhos a cada 2-3 minutos
        setInterval(() => {
            if (container.children.length > 0) {
                // Remove o primeiro e adiciona um novo aleatório
                container.removeChild(container.firstElementChild);
                
                const randomTestimonial = testimonials[Math.floor(Math.random() * testimonials.length)];
                const card = document.createElement('div');
                card.className = 'testimonial-card';
                card.innerHTML = `
                    <div class="testimonial-header">
                        <span class="testimonial-name">${randomTestimonial.name}</span>
                        <span class="testimonial-rating">${randomTestimonial.rating}</span>
                    </div>
                    <p class="testimonial-text">${randomTestimonial.text}</p>
                    <span class="testimonial-time">${randomTestimonial.time}</span>
                `;
                container.appendChild(card);
            }
        }, Math.random() * (180000 - 120000) + 120000); // 2-3 minutos

        console.log("💬 Testemunhos fake ativados");
    }

    // ==========================================================
    // 5. SISTEMA DE URGÊNCIA DINÂMICA
    // ==========================================================
    function initDynamicUrgency() {
        const urgencyEl = document.getElementById('urgency-text');
        if (!urgencyEl) return;

        const messages = [
            '⚡ <strong>ÚLTIMAS VAGAS!</strong> Entre em contato agora para garantir seu acesso!',
            '🔥 <strong>APENAS 3 VAGAS RESTANTES!</strong> Não perca essa oportunidade!',
            '🚨 <strong>PROMOÇÃO TERMINA EM:</strong> <span id="urgency-timer">30:00</span>',
            '💥 <strong>10 PESSOAS ONLINE AGORA!</strong> Vagas se esgotando rapidamente!',
            '⭐ <strong>MAIS VENDIDO HOJE:</strong> Acesso Completo com 600+ vídeos!'
        ];

        let currentIndex = 0;

        // Atualiza mensagem a cada 45-90 segundos
        function updateUrgencyMessage() {
            if (urgencyEl) {
                currentIndex = (currentIndex + 1) % messages.length;
                urgencyEl.innerHTML = messages[currentIndex];
                
                // Se tiver timer, inicia contagem
                const timerEl = document.getElementById('urgency-timer');
                if (timerEl && messages[currentIndex].includes('TERMINA EM')) {
                    startUrgencyTimer(timerEl);
                }
            }
            
            // Próxima atualização em 45-90 segundos
            setTimeout(updateUrgencyMessage, Math.random() * (90000 - 45000) + 45000);
        }

        function startUrgencyTimer(element) {
            let seconds = 30 * 60; // 30 minutos
            const interval = setInterval(() => {
                const minutes = Math.floor(seconds / 60);
                const secs = seconds % 60;
                element.textContent = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
                
                seconds--;
                if (seconds < 0) {
                    clearInterval(interval);
                    element.textContent = 'ENCERRADA!';
                }
            }, 1000);
        }

        updateUrgencyMessage();
        console.log("⏰ Sistema de urgência dinâmica ativado");
    }

    // ==========================================================
    // 6. CONTADOR PROMOCIONAL
    // ==========================================================
    function initPromoCountdown() {
        const countdownEl = document.getElementById('countdown-timer');
        if (!countdownEl) return;

        // 2 horas a partir do primeiro acesso
        let timeInSeconds = 2 * 60 * 60;
        
        // Verifica se já tem tempo salvo
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
            
            // Efeito visual nos últimos 10 minutos
            if (timeInSeconds <= 600) {
                countdownEl.style.color = '#ff4444';
                countdownEl.style.animation = timeInSeconds <= 300 ? 'pulse 0.5s infinite' : '';
            }
            
            if (timeInSeconds <= 0) {
                clearInterval(interval);
                countdownEl.textContent = "OFERTA ENCERRADA";
                countdownEl.style.background = "rgba(255, 0, 0, 0.3)";
                localStorage.removeItem('promo_end_time');
            }
            
            timeInSeconds--;
        }, 1000);

        console.log("⏱️ Contador promocional ativado");
    }

    // ==========================================================
    // 7. MODAL DE CONSENTIMENTO
    // ==========================================================
    function initConsentModal() {
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

        console.log("✅ Modal de consentimento ativado");
    }

    // ==========================================================
    // 8. OTIMIZAÇÕES E INTERAÇÕES
    // ==========================================================
    function initOptimizations() {
        // Lazy loading
        const images = document.querySelectorAll('img');
        images.forEach(img => img.loading = 'lazy');
        
        // Feedback visual para botões
        document.querySelectorAll('.plan-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                this.style.transform = 'scale(0.97)';
                setTimeout(() => this.style.transform = '', 200);
            });
        });
        
        // Previews interativos
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
        
        console.log("⚡ Otimizações aplicadas");
    }

    // ==========================================================
    // 9. INICIALIZAÇÃO DE TODOS OS SISTEMAS
    // ==========================================================
    function initializeAllSystems() {
        console.log("🚀 Inicializando todos os sistemas...");
        
        // 1. Proteção anti-robô (primeiro!)
        initAntiRobotProtection();
        
        // 2. Sistemas dinâmicos
        initDynamicCounters();
        initFakeSalesSystem();
        initFakeTestimonials();
        initDynamicUrgency();
        initPromoCountdown();
        
        // 3. Modal e otimizações
        initConsentModal();
        initOptimizations();
        
        // 4. Mostra conteúdo após carregamento
        setTimeout(() => {
            document.body.classList.add('loaded');
            console.log("✅ Todos os sistemas inicializados!");
        }, 1000);
    }

    // ==========================================================
    // INICIALIZAÇÃO
    // ==========================================================
    // Aguarda um pouco para não sobrecarregar
    setTimeout(initializeAllSystems, 500);
});

// Função global para WhatsApp
function contactWhatsApp(plan = 'exclusivo') {
    const message = `Olá Luana! Quero conhecer seu conteúdo ${plan.toUpperCase()}! Me envie as informações por favor 😊`;
    const url = `https://wa.me/56974783157?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    return true;
}
