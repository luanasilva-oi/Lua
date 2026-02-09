// ==========================================================
// SISTEMA ANTI-BOT AVANÇADO
// ==========================================================

class AntiBotSystem {
    constructor() {
        this.isHumanVerified = false;
        this.humanInteractionCount = 0;
        this.protectionActive = true;
        this.init();
    }

    init() {
        console.log('🛡️ Sistema Anti-Bot inicializando...');
        
        // 1. Verifica se é humano
        this.detectHumanInteraction();
        
        // 2. Bloqueia ferramentas de desenvolvedor
        this.blockDevTools();
        
        // 3. Esconde conteúdo sensível inicialmente
        this.protectSensitiveContent();
        
        // 4. Monitora comportamento suspeito
        this.monitorSuspiciousBehavior();
        
        // 5. Carrega conteúdo gradualmente
        this.loadContentGradually();
    }

    detectHumanInteraction() {
        // Conta interações humanas
        document.addEventListener('mousemove', () => {
            this.humanInteractionCount++;
            if (this.humanInteractionCount > 3) {
                this.isHumanVerified = true;
            }
        });

        document.addEventListener('click', () => {
            this.humanInteractionCount++;
            this.isHumanVerified = true;
        });

        document.addEventListener('keydown', () => {
            this.humanInteractionCount++;
            this.isHumanVerified = true;
        });

        // Scroll também conta
        document.addEventListener('wheel', () => {
            this.humanInteractionCount++;
            if (this.humanInteractionCount > 2) {
                this.isHumanVerified = true;
            }
        });
    }

    blockDevTools() {
        // Bloqueia F12
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
                (e.ctrlKey && e.key === 'U')) {
                e.preventDefault();
                this.showWarning('Ferramentas de desenvolvedor bloqueadas');
                return false;
            }
        });

        // Bloqueia clique direito
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showWarning('Menu de contexto bloqueado');
            return false;
        });

        // Detecta se DevTools está aberto
        const devToolsCheck = () => {
            const threshold = 160;
            const widthThreshold = window.outerWidth - window.innerWidth > threshold;
            const heightThreshold = window.outerHeight - window.innerHeight > threshold;
            
            if (widthThreshold || heightThreshold) {
                this.showWarning('Ferramentas de desenvolvedor detectadas');
                // Redireciona para honeypot
                setTimeout(() => {
                    window.location.href = 'honeypot.html';
                }, 2000);
            }
        };
        
        setInterval(devToolsCheck, 1000);
    }

    protectSensitiveContent() {
        // Esconde conteúdo inicialmente
        const sensitiveElements = document.querySelectorAll('[data-protected], .preview-card, .locked-text');
        sensitiveElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transition = 'opacity 0.5s ease';
        });

        // Mostra gradualmente após verificação humana
        setTimeout(() => {
            if (this.isHumanVerified) {
                sensitiveElements.forEach(el => {
                    el.style.opacity = '1';
                });
                console.log('✅ Conteúdo sensível liberado para humano');
            } else {
                // Se não detectou humano, mantém proteção
                console.log('⚠️ Possível bot detectado - mantendo proteção');
                this.activateFullProtection();
            }
        }, 3000);
    }

    monitorSuspiciousBehavior() {
        let suspiciousActions = 0;
        
        // Detecta comportamento de bot
        const checkBehavior = () => {
            // Bot geralmente não tem movimento natural do mouse
            if (this.humanInteractionCount === 0 && suspiciousActions > 5) {
                this.activateFullProtection();
            }
            
            // Click muito rápido (bot)
            let clickCount = 0;
            document.addEventListener('click', () => {
                clickCount++;
                setTimeout(() => {
                    if (clickCount > 10) {
                        suspiciousActions++;
                    }
                    clickCount = 0;
                }, 1000);
            });
        };
        
        setInterval(checkBehavior, 5000);
    }

    loadContentGradually() {
        // Carrega mídias em etapas
        setTimeout(() => {
            // Primeiro: imagens de perfil
            document.querySelectorAll('.avatar, .profile-banner').forEach(img => {
                const src = img.getAttribute('data-real-src') || img.src;
                img.src = src;
            });
        }, 1000);

        setTimeout(() => {
            // Segundo: previews
            document.querySelectorAll('.blurred-preview-video').forEach(video => {
                const src = video.getAttribute('data-real-src');
                if (src) {
                    video.src = src;
                    video.load();
                }
            });
        }, 2000);

        setTimeout(() => {
            // Terceiro: conteúdo restante
            if (this.isHumanVerified) {
                document.body.classList.add('human-verified');
                this.protectionActive = false;
                console.log('✅ Proteção anti-bot desativada - humano verificado');
            }
        }, 3000);
    }

    activateFullProtection() {
        // Redireciona para honeypot
        setTimeout(() => {
            window.location.href = 'honeypot.html';
        }, 3000);
        
        // Bloqueia tudo
        document.body.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #000;
                color: #ff4444;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 24px;
                font-weight: bold;
                text-align: center;
                padding: 20px;
                z-index: 99999;
            ">
                ⚠️ ATIVIDADE SUSPEITA DETECTADA ⚠️<br><br>
                Redirecionando para verificação...
            </div>
        `;
    }

    showWarning(message) {
        const warning = document.createElement('div');
        warning.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 0, 0, 0.9);
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            font-weight: bold;
            z-index: 99999;
            animation: fadeInOut 2s ease;
        `;
        warning.textContent = `⚠️ ${message}`;
        document.body.appendChild(warning);
        
        setTimeout(() => warning.remove(), 2000);
    }
}

// Inicializa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Verifica se já passou pela verificação de idade
    if (localStorage.getItem('age_verified') === 'true') {
        const antiBot = new AntiBotSystem();
        
        // Aguarda 1 segundo e carrega a página principal
        setTimeout(() => {
            // Verifica qual página deve carregar
            const currentPath = window.location.pathname;
            const isBioPage = currentPath.includes('bio.html');
            
            if (isBioPage) {
                // Já está na bio.html
                console.log('✅ Já na página principal');
            } else {
                // Carrega a bio.html (página principal)
                window.location.href = 'bio.html';
            }
        }, 1000);
    } else {
        // Se não verificou idade, volta para index.html
        window.location.href = 'index.html';
    }
});

// Exporta para uso global
window.AntiBotSystem = AntiBotSystem;
