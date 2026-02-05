// PATCH DE EMERGÊNCIA PARA TELEGRAM
(function() {
    'use strict';
    
    // Detecta Telegram
    const isTelegram = /telegram|webview/i.test(navigator.userAgent);
    
    if (isTelegram) {
        console.log('Aplicando patch de emergência para Telegram');
        
        // 1. Remover todos os event listeners problemáticos
        const cleanEventListeners = function(element) {
            if (!element) return;
            const newElement = element.cloneNode(true);
            element.parentNode.replaceChild(newElement, element);
            return newElement;
        };
        
        // 2. Patch para o modal
        setTimeout(function() {
            const modal = document.getElementById('consent-modal');
            const yesBtn = document.getElementById('consent-yes');
            const mainContent = document.getElementById('main-content');
            
            if (modal && yesBtn && mainContent) {
                // Limpar botão
                const cleanBtn = cleanEventListeners(yesBtn);
                
                // Listener SUPER SIMPLES
                cleanBtn.onclick = function(e) {
                    e.preventDefault();
                    
                    // Ação IMEDIATA
                    modal.style.display = 'none';
                    mainContent.style.filter = 'none';
                    mainContent.style.pointerEvents = 'auto';
                    
                    // Forçar redraw
                    void modal.offsetHeight;
                    
                    // Feedback tátil
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 200);
                    
                    return false;
                };
                
                // Auto-fechamento de segurança
                setTimeout(function() {
                    if (modal.style.display === 'flex') {
                        modal.style.display = 'none';
                        if (mainContent) {
                            mainContent.style.filter = 'none';
                            mainContent.style.pointerEvents = 'auto';
                        }
                    }
                }, 5000);
            }
        }, 500);
        
        // 3. Desativar animações problemáticas
        const style = document.createElement('style');
        style.textContent = `
            /* Desativar animações no Telegram */
            body.telegram-webview * {
                animation: none !important;
                transition: none !important;
            }
            
            /* Simplificar modal */
            body.telegram-webview #consent-modal {
                background: rgba(0,0,0,0.98) !important;
            }
            
            /* Botões mais responsivos */
            body.telegram-webview .plan-btn,
            body.telegram-webview .age-btn,
            body.telegram-webview #consent-yes {
                min-height: 48px !important;
                -webkit-tap-highlight-color: rgba(255,152,0,0.5) !important;
            }
            
            /* Prevenir travamento de scroll */
            body.telegram-webview {
                overflow: auto !important;
                position: relative !important;
            }
            
            /* Desativar blur se causar problemas */
            body.telegram-webview #main-content.blurred {
                filter: blur(2px) !important;
            }
        `;
        document.head.appendChild(style);
    }
})();
