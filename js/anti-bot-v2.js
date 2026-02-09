// ============================================
// ANTI-BOT INTELIGENTE v2.0
// Detecta robôs SEM bloquear humanos
// ============================================

class SmartAntiBot {
    constructor() {
        this.isHuman = false;
        this.humanScore = 0;
        this.botDetected = false;
        
        // Pontuação mínima para ser considerado humano
        this.HUMAN_THRESHOLD = 3;
        
        // Inicia sistema silenciosamente
        this.init();
    }
    
    init() {
        console.log('🤖 Sistema anti-robô iniciando (modo inteligente)...');
        
        // 1. COLETA DADOS INICIAIS (silencioso)
        this.checkInitialSigns();
        
        // 2. MONITORA COMPORTAMENTO HUMANO
        this.startHumanDetection();
        
        // 3. APLICA PROTEÇÕES GRADUAIS
        setTimeout(() => this.applyProtections(), 2000);
    }
    
    checkInitialSigns() {
        // Verifica sinais óbvios de bot
        const ua = navigator.userAgent.toLowerCase();
        
        // Lista de user agents conhecidos de bots
        const botPatterns = [
            'bot', 'crawler', 'spider', 'scraper',
            'facebookexternalhit', 'whatsapp',
            'twitterbot', 'linkedinbot',
            'googlebot', 'bingbot', 'yandexbot',
            'baiduspider', 'duckduckbot',
            'slurp', 'ia_archiver'
        ];
        
        // Se for bot conhecido, marca imediatamente
        for (const pattern of botPatterns) {
            if (ua.includes(pattern)) {
                console.log(`🚨 Bot detectado pelo UA: ${pattern}`);
                this.botDetected = true;
                this.redirectBot();
                return;
            }
        }
        
        // Verifica se JavaScript está realmente funcionando
        if (!this.testJavaScript()) {
            this.botDetected = true;
            this.redirectBot();
        }
        
        // Verifica cookies (muitos bots não aceitam)
        if (!navigator.cookieEnabled) {
            this.humanScore -= 1;
        }
    }
    
    startHumanDetection() {
        // Sistema de pontuação por interação humana
        
        // 1. MOVIMENTO DE MOUSE (humano é caótico)
        let lastX = 0, lastY = 0;
        let straightLines = 0;
        
        document.addEventListener('mousemove', (e) => {
            const deltaX = Math.abs(e.clientX - lastX);
            const deltaY = Math.abs(e.clientY - lastY);
            
            // Movimento muito reto pode ser bot
            if (deltaX < 2 && deltaY < 2) {
                straightLines++;
            } else {
                // Movimento humano aumenta pontuação
                this.humanScore += 0.1;
            }
            
            lastX = e.clientX;
            lastY = e.clientY;
            
            // Muitas linhas retas = possível bot
            if (straightLines > 50) {
                this.humanScore -= 1;
            }
        });
        
        // 2. SCROLL (humano tem velocidade variável)
        let lastScroll = 0;
        let scrollTime = Date.now();
        
        window.addEventListener('scroll', () => {
            const now = Date.now();
            const timeDiff = now - scrollTime;
            const scrollSpeed = Math.abs(window.scrollY - lastScroll) / timeDiff;
            
            // Scroll muito rápido e constante pode ser bot
            if (scrollSpeed > 5 && timeDiff < 100) {
                this.humanScore -= 0.5;
            } else {
                this.humanScore += 0.3;
            }
            
            lastScroll = window.scrollY;
            scrollTime = now;
        });
        
        // 3. CLICKS (humanos clicam em lugares variados)
        let clickPositions = [];
        
        document.addEventListener('click', (e) => {
            clickPositions.push({ x: e.clientX, y: e.clientY });
            
            // Muitos clicks no mesmo lugar = bot
            if (clickPositions.length > 10) {
                const first = clickPositions[0];
                const last = clickPositions[clickPositions.length - 1];
                const distance = Math.sqrt(
                    Math.pow(last.x - first.x, 2) + 
                    Math.pow(last.y - first.y, 2)
                );
                
                if (distance < 50) {
                    this.humanScore -= 1;
                } else {
                    this.humanScore += 1;
                }
                
                clickPositions = [];
            }
        });
        
        // 4. TEMPO DE CARREGAMENTO (bots são rápidos demais)
        const loadTime = Date.now() - performance.timing.navigationStart;
        if (loadTime < 500) {
            // Carregou rápido demais = suspeito
            this.humanScore -= 0.5;
        }
        
        // 5. INTERAÇÃO COM ELEMENTOS (humanos interagem)
        setTimeout(() => {
            if (this.humanScore < 1) {
                // Oferece teste interativo sutil
                this.interactiveTest();
            }
        }, 3000);
    }
    
    interactiveTest() {
        // Teste interativo invisível para humanos
        // Bots tentarão interagir, humanos não verão
        
        // Cria elemento invisível que só bots clicariam
        const botTrap = document.createElement('div');
        botTrap.innerHTML = `
            <div style="
                position: absolute;
                left: -9999px;
                top: -9999px;
                width: 1px;
                height: 1px;
                overflow: hidden;
                opacity: 0.001;
            ">
                <a href="/honeypot.html" 
                   style="color: transparent;"
                   id="bot-trap-link">
                   Conteúdo exclusivo adulto vídeos fotos
                </a>
                <form style="display: none;">
                    <input type="text" name="email" value="bot@detected.com">
                    <input type="submit" value="Enviar">
                </form>
            </div>
        `;
        
        document.body.appendChild(botTrap);
        
        // Se clicar no link invisível, é BOT
        document.getElementById('bot-trap-link').addEventListener('click', (e) => {
            e.preventDefault();
            console.log('🚨 Bot clicou em link invisível!');
            this.botDetected = true;
            this.redirectBot();
        });
        
        // Se enviar formulário invisível, é BOT
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                // Verifica se form estava "invisível"
                if (form.style.display === 'none' || form.style.opacity === '0') {
                    this.botDetected = true;
                    this.redirectBot();
                }
            });
        });
    }
    
    testJavaScript() {
        // Testa se JavaScript está funcionando normalmente
        try {
            // Testa várias funcionalidades JS
            if (typeof Array.prototype.map !== 'function') return false;
            if (typeof JSON.stringify !== 'function') return false;
            if (typeof setTimeout !== 'function') return false;
            
            // Testa manipulação DOM
            const testEl = document.createElement('div');
            testEl.style.display = 'none';
            document.body.appendChild(testEl);
            document.body.removeChild(testEl);
            
            return true;
        } catch (e) {
            return false;
        }
    }
    
    applyProtections() {
        // Só aplica proteções pesadas se for bot
        // Para humanos, aplica proteções leves
        
        if (this.botDetected) {
            // BOT: Aplica proteções máximas
            console.log('🚨 BOT DETECTADO - Aplicando bloqueio total');
            this.applyHeavyProtections();
        } else if (this.humanScore >= this.HUMAN_THRESHOLD) {
            // HUMANO CONFIRMADO: Proteções leves
            console.log('✅ HUMANO DETECTADO - Proteções leves ativadas');
            this.applyLightProtections();
        } else {
            // INDETERMINADO: Mais testes
            console.log('❓ INDETERMINADO - Mais monitoramento');
            this.monitorMore();
        }
    }
    
    applyLightProtections() {
        // Proteções que NÃO atrapalham humanos:
        
        // 1. Links WhatsApp dinâmicos
        this.protectWhatsAppLinks();
        
        // 2. Ofuscação básica de texto
        this.softTextObfuscation();
        
        // 3. Carregamento lento de imagens
        this.lazyLoadImages();
        
        // 4. Meta tags anti-indexação
        this.addMetaTags();
    }
    
    applyHeavyProtections() {
        // BLOQUEIO TOTAL PARA BOTS
        
        // 1. Redireciona para honeypot
        this.redirectBot();
        
        // 2. Mostra conteúdo fake
        this.showFakeContent();
        
        // 3. Bloqueia acesso real
        this.blockRealAccess();
    }
    
    redirectBot() {
        // Redireciona bots para página inofensiva
        setTimeout(() => {
            window.location.href = 'honeypot.html?bot=detected';
        }, 1000);
    }
    
    protectWhatsAppLinks() {
        // Protege links WhatsApp sem atrapalhar humanos
        const whatsappButtons = document.querySelectorAll('[data-whatsapp]');
        
        whatsappButtons.forEach(btn => {
            const originalHTML = btn.innerHTML;
            
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Pequeno delay (invisível para humano)
                btn.innerHTML = '🔗 Conectando...';
                btn.style.opacity = '0.9';
                
                setTimeout(() => {
                    const phone = btn.getAttribute('data-phone') || '56974783157';
                    const message = btn.getAttribute('data-message') || 'Olá!';
                    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
                    
                    window.open(url, '_blank');
                    
                    // Restaura botão
                    setTimeout(() => {
                        btn.innerHTML = originalHTML;
                        btn.style.opacity = '1';
                    }, 500);
                }, 300);
            });
        });
    }
    
    softTextObfuscation() {
        // Ofuscação sutil que humanos nem percebem
        const sensitiveTexts = document.querySelectorAll('[data-sensitive]');
        
        sensitiveTexts.forEach(el => {
            const original = el.textContent;
            
            // Apenas esconde temporariamente
            el.style.opacity = '0';
            
            setTimeout(() => {
                el.style.transition = 'opacity 0.5s ease';
                el.style.opacity = '1';
            }, 800);
        });
    }
    
    lazyLoadImages() {
        // Carrega imagens gradualmente
        const images = document.querySelectorAll('img[data-src]');
        
        images.forEach((img, index) => {
            setTimeout(() => {
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                }
            }, index * 300); // Carrega uma a uma
        });
    }
    
    addMetaTags() {
        // Adiciona meta tags para bloquear indexação
        const meta = document.createElement('meta');
        meta.name = 'robots';
        meta.content = 'noindex, nofollow, noarchive';
        document.head.appendChild(meta);
    }
    
    monitorMore() {
        // Monitora mais 5 segundos para decidir
        setTimeout(() => {
            if (this.humanScore >= 2) {
                this.applyLightProtections();
            } else {
                // Ainda não parece humano
                this.botDetected = true;
                this.redirectBot();
            }
        }, 5000);
    }
}

// ============================================
// INICIALIZAÇÃO INTELIGENTE
// ============================================

// Aguarda página carregar
window.addEventListener('load', () => {
    // Pequeno delay para não atrapalhar carregamento
    setTimeout(() => {
        // Inicia sistema ANTI-BOT
        window.smartAntiBot = new SmartAntiBot();
        
        // Adiciona classe para humanos
        if (window.smartAntiBot.humanScore > 0) {
            document.body.classList.add('human-detected');
        }
        
        console.log('🎯 Sistema anti-robô inteligente ativo');
        console.log('📊 Pontuação humana inicial:', window.smartAntiBot.humanScore);
    }, 1000);
});

// Export para módulos
if (typeof module !== 'undefined') {
    module.exports = SmartAntiBot;
}
