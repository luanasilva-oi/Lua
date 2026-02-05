// telegram-fix.js - CORREÇÃO PARA TELEGRAM
(function() {
    'use strict';
    
    // Detectar Telegram
    const isTelegram = /telegram|webview/i.test(navigator.userAgent.toLowerCase());
    
    if (!isTelegram) {
        return; // Não é Telegram, sair
    }
    
    console.log('Telegram detectado - aplicando correções...');
    
    // Adicionar classe ao body
    document.body.classList.add('telegram-fix');
    
    // Função principal para corrigir o modal
    function fixModalForTelegram() {
        const modal = document.getElementById('consent-modal');
        const yesBtn = document.getElementById('consent-yes');
        const mainContent = document.getElementById('main-content');
        
        if (!modal || !yesBtn || !mainContent) {
            return;
        }
        
        console.log('Corrigindo modal do Telegram...');
        
        // Clonar e substituir o botão para remover event listeners antigos
        const newYesBtn = yesBtn.cloneNode(true);
        yesBtn.parentNode.replaceChild(newYesBtn, yesBtn);
        
        // Configurar novo listener MUITO SIMPLES
        newYesBtn.onclick = function(e) {
            if (e.preventDefault) e.preventDefault();
            if (e.stopPropagation) e.stopPropagation();
            
            console.log('Botão clicado no Telegram');
            
            // Fechar modal IMEDIATAMENTE
            modal.style.display = 'none';
            mainContent.classList.remove('blurred');
            
            // Feedback visual
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Salvar que já consentiu
            sessionStorage.setItem('telegram_consent', 'true');
            
            return false;
        };
        
        // Configurar botão "Voltar" se existir
        const backBtn = document.querySelector('.modal-buttons .plan-btn.basic');
        if (backBtn) {
            const newBackBtn = backBtn.cloneNode(true);
            backBtn.parentNode.replaceChild(newBackBtn, backBtn);
            
            newBackBtn.onclick = function(e) {
                e.preventDefault();
                window.location.href = this.href;
                return false;
            };
        }
        
        // Auto-fechar após 5 segundos (segurança)
        setTimeout(function() {
            if (modal.style.display === 'flex' || modal.style.display === '') {
                modal.style.display = 'none';
                mainContent.classList.remove('blurred');
                sessionStorage.setItem('telegram_consent', 'true');
                console.log('Modal auto-fechado por segurança');
            }
        }, 5000);
        
        console.log('Modal corrigido com sucesso');
    }
    
    // Esperar DOM carregar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(fixModalForTelegram, 100);
        });
    } else {
        setTimeout(fixModalForTelegram, 100);
    }
    
})();
