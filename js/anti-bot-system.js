// ============================================
// SISTEMA ANTI-ROBÔ AVANÇADO - GitHub Pages
// ============================================

class AntiBotSystem {
    constructor() {
        console.log('🛡️ Sistema Anti-Robô Iniciando...');
        this.initProtection();
    }

    // 1. BLOQUEIO DE FERRAMENTAS DE DESENVOLVEDOR
    blockDevTools() {
        const blockShortcuts = (e) => {
            // F12
            if (e.key === 'F12' || e.keyCode === 123) {
                e.preventDefault();
                this.showWarning('⚠️ Ferramentas de desenvolvedor bloqueadas');
                return false;
            }
            
            // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
            if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'i', 'j', 'c'].includes(e.key)) {
                e.preventDefault();
                this.showWarning('⚠️ Ação bloqueada por segurança');
                return false;
            }
            
            // Ctrl+U (View Source)
            if (e.ctrlKey && ['U', 'u'].includes(e.key)) {
                e.preventDefault();
                this.showWarning('⚠️ Código-fonte protegido');
                return false;
            }
            
            // Ctrl+S (Save Page)
            if (e.ctrlKey && ['S', 's'].includes(e.key)) {
                e.preventDefault();
                this.showWarning('⚠️ Salvamento de página bloqueado');
                return false;
            }
        };

        // Bloqueia clique direito
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showWarning('⚠️ Menu de contexto bloqueado');
            return false;
        });

        document.addEventListener('keydown', blockShortcuts);
        document.addEventListener('keyup', blockShortcuts);
    }

    // 2. PROTEGER IMAGENS VIA CANVAS
    protectImagesViaCanvas() {
        const sensitiveImages = document.querySelectorAll('img[data-protected-src]');
        
        sensitiveImages.forEach(img => {
            const container = img.parentElement;
            const originalSrc = img.getAttribute('data-protected-src');
            
            if (!originalSrc) return;
            
            // Remove a imagem original
            img.style.display = 'none';
            
            // Cria canvas
            const canvas = document.createElement('canvas');
            canvas.className = 'protected-canvas';
            canvas.width = img.width || 400;
            canvas.height = img.height || 400;
            
            const ctx = canvas.getContext('2d');
            
            // Carrega e desenha imagem com blur
            const tempImg = new Image();
            tempImg.crossOrigin = 'anonymous';
            
            tempImg.onload = () => {
                // Aplica blur inicial
                ctx.filter = 'blur(15px) brightness(0.6)';
                ctx.drawImage(tempImg, 0, 0, canvas.width, canvas.height);
                
                // Adiciona overlay de proteção
                const overlay = document.createElement('div');
                overlay.className = 'canvas-overlay';
                overlay.innerHTML = '<span>🔒 CONTEÚDO EXCLUSIVO</span>';
                
                canvas.parentNode.insertBefore(overlay, canvas.nextSibling);
                
                // Remove blur após interação
                canvas.addEventListener('click', () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.filter = 'none';
                    ctx.drawImage(tempImg, 0, 0, canvas.width, canvas.height);
                    overlay.style.opacity = '0';
                    
                    setTimeout(() => {
                        overlay.style.display = 'none';
                    }, 300);
                });
            };
            
            tempImg.src = originalSrc;
            
            // Substitui imagem por canvas
            container.appendChild(canvas);
        });
    }

    // 3. OFUSCAR CONTEÚDO TEXTUAL
    obfuscateTextContent() {
        const sensitiveTexts = document.querySelectorAll('[data-obfuscated]');
        
        sensitiveTexts.forEach(element => {
            const originalText = element.textContent;
            
            // Ofuscação simples: inverte texto e codifica
            let obfuscated = '';
            for (let i = originalText.length - 1; i >= 0; i--) {
                obfuscated += String.fromCharCode(originalText.charCodeAt(i) + 1);
            }
            
            // Guarda original em atributo data
            element.setAttribute('data-original', btoa(originalText));
            element.textContent = obfuscated;
            
            // Decodifica após delay ou interação
            setTimeout(() => {
                try {
                    const decoded = atob(element.getAttribute('data-original'));
                    element.textContent = decoded;
                    element.classList.remove('obfuscated-text');
                } catch(e) {
                    console.warn('Erro ao decodificar texto:', e);
                }
            }, 1500);
        });
    }

    // 4. PROTEGER LINKS WHATSAPP
    protectWhatsAppLinks() {
        const whatsappButtons = document.querySelectorAll('[data-whatsapp-protected]');
        
        whatsappButtons.forEach(button => {
            // Remove href original se existir
            if (button.hasAttribute('href')) {
                button.removeAttribute('href');
            }
            
            // Adiciona evento de clique
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Construção dinâmica do link
                const phone = button.getAttribute('data-phone') || '56974783157';
                const message = encodeURIComponent(
                    button.getAttribute('data-message') || 
                    'Olá Luana! Quero conhecer seu conteúdo exclusivo! 😊'
                );
                
                // Efeito visual de carregamento
                const originalHTML = button.innerHTML;
                button.innerHTML = '🔒 GERANDO LINK SEGURO...';
                button.style.opacity = '0.7';
                
                // Abre WhatsApp após pequeno delay (simula processamento)
                setTimeout(() => {
                    const whatsappURL = `https://wa.me/${phone}?text=${message}`;
                    window.open(whatsappURL, '_blank');
                    
                    // Restaura botão
                    setTimeout(() => {
                        button.innerHTML = originalHTML;
                        button.style.opacity = '1';
                    }, 1000);
                }, 800);
            });
        });
    }

    // 5. VERIFICAÇÃO DE IDADE ROBUSTA
    initAgeVerification() {
        const ageVerified = localStorage.getItem('age_verified_v2');
        const verificationTime = localStorage.getItem('age_verification_time');
        
        if (ageVerified === 'true' && verificationTime) {
            const hoursPassed = (Date.now() - parseInt(verificationTime)) / (1000 * 60 * 60);
            
            // Revalida a cada 24 horas
            if (hoursPassed < 24) {
                this.hideAgeGate();
                return;
            }
        }
        
        this.showAgeGate();
    }

    showAgeGate() {
        // Cria overlay de verificação
        const ageGateHTML = `
            <div id="age-gate-overlay" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #000;
                z-index: 99999;
                display: flex;
                justify-content: center;
                align-items: center;
            ">
                <div style="
                    background: #111;
                    padding: 40px;
                    border-radius: 15px;
                    text-align: center;
                    max-width: 500px;
                    width: 90%;
                    border: 3px solid #ff9800;
                ">
                    <div style="font-size: 50px; margin-bottom: 20px;">🔞</div>
                    <h2 style="color: #fff; margin-bottom: 20px;">VERIFICAÇÃO DE IDADE</h2>
                    <p style="color: #ccc; margin-bottom: 30px; line-height: 1.6;">
                        Este conteúdo é restrito a maiores de 18 anos.<br>
                        Ao prosseguir, você confirma que tem idade legal.
                    </p>
                    <div style="display: flex; flex-direction: column; gap: 15px;">
                        <button id="confirm-age" style="
                            background: linear-gradient(135deg, #ff9800, #ff5722);
                            color: #000;
                            border: none;
                            padding: 16px;
                            border-radius: 10px;
                            font-size: 16px;
                            font-weight: bold;
                            cursor: pointer;
                        ">
                            TENHO 18+ ANOS E CONCORDO
                        </button>
                        <button id="decline-age" style="
                            background: #333;
                            color: #fff;
                            border: 2px solid #555;
                            padding: 16px;
                            border-radius: 10px;
                            font-size: 16px;
                            cursor: pointer;
                        ">
                            NÃO TENHO 18 ANOS
                        </button>
                    </div>
                    <p style="color: #666; font-size: 12px; margin-top: 20px;">
                        ⚠️ O acesso é monitorado e registrado.
                    </p>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('afterbegin', ageGateHTML);
        
        // Adiciona eventos
        document.getElementById('confirm-age').addEventListener('click', () => {
            localStorage.setItem('age_verified_v2', 'true');
            localStorage.setItem('age_verification_time', Date.now().toString());
            this.hideAgeGate();
        });
        
        document.getElementById('decline-age').addEventListener('click', () => {
            window.location.href = 'https://www.google.com';
        });
    }

    hideAgeGate() {
        const ageGate = document.getElementById('age-gate-overlay');
        if (ageGate) {
            ageGate.style.opacity = '0';
            setTimeout(() => ageGate.remove(), 300);
        }
        
        // Mostra conteúdo principal
        const mainContent = document.getElementById('protected-content');
        if (mainContent) {
            mainContent.classList.add('loaded');
        }
    }

    // 6. HONEYPOT PARA BOTS
    createHoneypot() {
        // Links invisíveis que só bots clicam
        const honeypotHTML = `
            <div style="display: none !important; position: absolute !important; left: -9999px !important;">
                <a href="honeypot.html" style="color: #000 !important; background: #000 !important;">
                    conteúdo adulto explícito onlyfans privacy
                </a>
                <div style="display: none !important;">
                    luana silva vídeos fotos nua masturbação gemidos real
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', honeypotHTML);
    }

    // 7. VERIFICAÇÃO DE COMPORTAMENTO HUMANO
    detectHumanBehavior() {
        let mouseMoves = 0;
        let scrolls = 0;
        let clicks = 0;
        
        document.addEventListener('mousemove', () => mouseMoves++);
        document.addEventListener('scroll', () => scrolls++);
        document.addEventListener('click', () => clicks++);
        
        // Se não houver interação em 10 segundos, pode ser bot
        setTimeout(() => {
            if (mouseMoves < 3 && scrolls === 0 && clicks === 0) {
                console.warn('🤖 Comportamento robótico detectado');
                // Redireciona para honeypot
                window.location.href = 'honeypot.html';
            }
        }, 10000);
    }

    // 8. BLOQUEAR METADADOS PARA ROBÔS
    blockBotMetadata() {
        // Adiciona meta tags dinamicamente
        const metaTags = [
            { name: 'robots', content: 'noindex, nofollow, noarchive' },
            { name: 'googlebot', content: 'noindex, nofollow' },
            { name: 'facebook-domain-verification', content: '' },
            { name: 'facebook-crawler', content: 'noindex, nofollow' },
            { property: 'og:type', content: 'website' }
        ];
        
        metaTags.forEach(tag => {
            const meta = document.createElement('meta');
            if (tag.name) meta.name = tag.name;
            if (tag.property) meta.setAttribute('property', tag.property);
            meta.content = tag.content;
            document.head.appendChild(meta);
        });
    }

    // 9. FUNÇÃO DE ALERTA
    showWarning(message) {
        const warning = document.createElement('div');
        warning.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(229, 57, 53, 0.95);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 10000;
            font-weight: bold;
            box-shadow: 0 5px 15px rgba(229, 57, 53, 0.4);
            border-left: 4px solid #ff9800;
            animation: slideInRight 0.3s ease;
        `;
        warning.textContent = message;
        document.body.appendChild(warning);
        
        setTimeout(() => {
            warning.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => warning.remove(), 300);
        }, 3000);
    }

    // 10. INICIALIZAÇÃO COMPLETA
    initProtection() {
        console.log('🛡️ Iniciando todas as proteções...');
        
        // Bloqueia ferramentas de desenvolvedor
        this.blockDevTools();
        
        // Bloqueia metadados
        this.blockBotMetadata();
        
        // Cria honeypot
        this.createHoneypot();
        
        // Verificação de idade
        this.initAgeVerification();
        
        // Aguarda DOM carregar para outras proteções
        document.addEventListener('DOMContentLoaded', () => {
            // Protege imagens
            setTimeout(() => this.protectImagesViaCanvas(), 500);
            
            // Ofusca texto
            setTimeout(() => this.obfuscateTextContent(), 800);
            
            // Protege links WhatsApp
            setTimeout(() => this.protectWhatsAppLinks(), 1000);
            
            // Detecta comportamento humano
            setTimeout(() => this.detectHumanBehavior(), 2000);
            
            console.log('✅ Sistema Anti-Robô totalmente carregado!');
        });
    }
}

// Inicializa sistema quando página carrega
window.addEventListener('load', () => {
    window.antiBotSystem = new AntiBotSystem();
});

// Exporta para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AntiBotSystem;
}
