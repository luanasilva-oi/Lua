// telegram-fix.js - CORREÇÃO PARA TRAVAMENTO NO TELEGRAM
(function() {
    'use strict';
    
    console.log('=== TELEGRAM FIX INICIADO ===');
    
    // Detecta se está no Telegram WebView
    const userAgent = navigator.userAgent.toLowerCase();
    const isTelegram = userAgent.includes('telegram') || 
                      userAgent.includes('webview') ||
                      window.TelegramWebviewProxy;
    
    if (!isTelegram) {
        console.log('Navegador normal detectado - patch não necessário');
        return;
    }
    
    console.log('Telegram WebView detectado - aplicando correções...');
    
    // 1. Adicionar classe ao body para CSS específico
    document.body.classList.add('telegram-webview');
    
    // 2. Remover event listeners problemáticos do modal
    function fixModalForTelegram() {
        console.log('Corrigindo modal para Telegram...');
        
        const modal = document.getElementById('consent-modal');
        const yesBtn = document.getElementById('consent-yes');
        const mainContent = document.getElementById('main-content');
        
        if (!modal || !yesBtn || !mainContent) {
            console.log('Elementos do modal não encontrados');
            return;
        }
        
        // Limpar botão antigo
        const cleanBtn = yesBtn.cloneNode(true);
        yesBtn.parentNode.replaceChild(cleanBtn, yesBtn);
        
        // Listener SUPER SIMPLES E DIRETO
        cleanBtn.onclick = function(event) {
            console.log('Botão clicado no Telegram');
            
            // Prevenir comportamento padrão
            if (event.preventDefault) event.preventDefault();
            if (event.stopPropagation) event.stopPropagation();
            
            // Fechar modal IMEDIATAMENTE
            modal.style.display = 'none';
            mainContent.style.filter = 'none';
            mainContent.style.pointerEvents = 'auto';
            
            // Feedback visual simples
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Marcar como consentido
            sessionStorage.setItem('consentGiven', 'true');
            
            console.log('Modal fechado com sucesso');
            
            return false;
        };
        
        // Configurar botão "Voltar"
        const backBtn = document.querySelector('.modal-buttons .plan-btn.basic');
        if (backBtn) {
            const cleanBackBtn = backBtn.cloneNode(true);
            backBtn.parentNode.replaceChild(cleanBackBtn, backBtn);
            
            cleanBackBtn.onclick = function(e) {
                e.preventDefault();
                window.location.href = this.href;
                return false;
            };
        }
        
        // Auto-fechamento de segurança (5 segundos)
        setTimeout(() => {
            if (modal.style.display === 'flex') {
                console.log('Auto-fechando modal por segurança');
                modal.style.display = 'none';
                mainContent.style.filter = 'none';
                mainContent.style.pointerEvents = 'auto';
                sessionStorage.setItem('consentGiven', 'true');
            }
        }, 5000);
        
        console.log('Modal corrigido com sucesso');
    }
    
    // 3. Otimizar toque em botões
    function optimizeTouchButtons() {
        console.log('Otimizando botões para touch...');
        
        const buttons = document.querySelectorAll('button, .plan-btn, .age-btn, a[href]');
        buttons.forEach(btn => {
            // Adicionar estilo para melhor toque
            btn.style.minHeight = '44px';
            btn.style.webkitTapHighlightColor = 'rgba(255, 152, 0, 0.3)';
            btn.style.userSelect = 'none';
            
            // Remover event listeners problemáticos
            const cleanBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(cleanBtn, btn);
        });
    }
    
    // 4. Adicionar estilos CSS específicos para Telegram
    function addTelegramStyles() {
        const style = document.createElement('style');
        style.id = 'telegram-fix-styles';
        style.textContent = `
            /* =================================================== */
            /* ESTILOS ESPECÍFICOS PARA TELEGRAM */
            /* =================================================== */
            
            body.telegram-webview {
                /* Garantir scroll suave */
                -webkit-overflow-scrolling: touch;
                overflow-anchor: none;
            }
            
            body.telegram-webview #consent-modal {
                /* Fundo mais opaco para performance */
                background: rgba(0, 0, 0, 0.98) !important;
                animation: none !important;
            }
            
            body.telegram-webview .modal-content {
                /* Remover animações problemáticas */
                animation: none !important;
                transition: none !important;
                transform: none !important;
            }
            
            body.telegram-webview #main-content.blurred {
                /* Blur reduzido para performance */
                filter: blur(3px) !important;
                -webkit-filter: blur(3px) !important;
            }
            
            body.telegram-webview button,
            body.telegram-webview .plan-btn,
            body.telegram-webview .age-btn {
                /* Melhorar responsividade ao toque */
                min-height: 44px !important;
                -webkit-tap-highlight-color: rgba(255, 152, 0, 0.3) !important;
                touch-action: manipulation !important;
            }
            
            body.telegram-webview * {
                /* Reduzir animações para performance */
                animation-duration: 0.1s !important;
                transition-duration: 0.1s !important;
            }
            
            /* Prevenir zoom em inputs */
            body.telegram-webview input,
            body.telegram-webview select,
            body.telegram-webview textarea {
                font-size: 16px !important;
            }
            
            /* Melhorar performance de vídeos */
            body.telegram-webview video {
                preload: 'metadata';
                playsinline: true;
            }
            
            /* Desativar hover effects */
            @media (hover: none) {
                body.telegram-webview .plan-btn:hover,
                body.telegram-webview .preview-card:hover,
                body.telegram-webview .plan-card:hover {
                    transform: none !important;
                }
            }
        `;
        
        document.head.appendChild(style);
        console.log('Estilos para Telegram adicionados');
    }
    
    // 5. Inicializar tudo quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM carregado - aplicando correções...');
            setTimeout(() => {
                fixModalForTelegram();
                optimizeTouchButtons();
                addTelegramStyles();
                console.log('=== TODAS CORREÇÕES APLICADAS ===');
            }, 100);
        });
    } else {
        // DOM já está carregado
        setTimeout(() => {
            fixModalForTelegram();
            optimizeTouchButtons();
            addTelegramStyles();
            console.log('=== TODAS CORREÇÕES APLICADAS (DOM já carregado) ===');
        }, 100);
    }
    
    // 6. Limpar cache periodicamente (apenas para Telegram)
    if (isTelegram && 'caches' in window) {
        setTimeout(() => {
            caches.keys().then(cacheNames => {
                cacheNames.forEach(cacheName => {
                    caches.delete(cacheName);
                });
                console.log('Cache limpo para Telegram');
            });
        }, 30000); // A cada 30 segundos
    }
    
})();
