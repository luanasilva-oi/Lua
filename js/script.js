// ============================================
// SCRIPT PRINCIPAL - INTEGRAÇÃO ANTI-BOT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Site Luana Silva - Inicializando com proteção...');
    
    // Espera sistema anti-bot carregar
    const waitForAntiBot = setInterval(() => {
        if (window.antiBotSystem && window.antiBotSystem.initProtection) {
            clearInterval(waitForAntiBot);
            initSiteFunctions();
        }
    }, 100);
    
    function initSiteFunctions() {
        console.log('✅ Sistema anti-bot detectado, iniciando funções...');
        
        // 1. CONTADORES DINÂMICOS (com proteção)
        function initCounters() {
            const accessEl = document.getElementById('access-count');
            const onlineEl = document.getElementById('online-count');
            
            if (!accessEl || !onlineEl) return;
            
            // Valores iniciais aleatórios
            let accessCount = Math.floor(Math.random() * (80 - 40 + 1)) + 40;
            let onlineCount = Math.floor(Math.random() * (40 - 20 + 1)) + 20;
            
            accessEl.textContent = accessCount;
            onlineEl.textContent = onlineCount;
            
            // Atualiza periódicamente
            setInterval(() => {
                // Variação suave
                accessCount += Math.random() > 0.5 ? 1 : -1;
                onlineCount += Math.random() > 0.5 ? 1 : -1;
                
                // Mantém limites
                if (accessCount < 30) accessCount = 30;
                if (accessCount > 120) accessCount = 120;
                if (onlineCount < 15) onlineCount = 15;
                if (onlineCount > 45) onlineCount = 45;
                
                accessEl.textContent = accessCount;
                onlineEl.textContent = onlineCount;
                
                // Atualiza barra de urgência
                const urgencyEl = document.getElementById('urgency-text');
                if (urgencyEl) {
                    urgencyEl.innerHTML = `⚡ <strong>${onlineCount} PESSOAS ONLINE!</strong> Vagas limitadas!`;
                }
            }, 30000);
        }
        
        // 2. VENDAS FAKE (protegidas)
        function initFakeSales() {
            // Aguarda 20 segundos para iniciar
            setTimeout(() => {
                const salesCounter = document.getElementById('sales-counter');
                const salesNotification = document.getElementById('sales-notification');
                
                if (!salesCounter || !salesNotification) return;
                
                let totalSales = Math.floor(Math.random() * 15) + 8;
                
                // Atualiza contador
                const updateSales = () => {
                    totalSales += Math.random() > 0.6 ? 1 : 0;
                    document.getElementById('total-sales').textContent = totalSales;
                    
                    // Mostra notificação ocasionalmente
                    if (Math.random() > 0.7) {
                        showSaleNotification();
                    }
                    
                    // Próxima atualização
                    setTimeout(updateSales, Math.random() * (60000 - 30000) + 30000);
                };
                
                function showSaleNotification() {
                    const names = ['Pedro', 'João', 'Lucas', 'Mateus'];
                    const cities = ['SP', 'RJ', 'MG', 'RS'];
                    
                    const name = names[Math.floor(Math.random() * names.length)];
                    const city = cities[Math.floor(Math.random() * cities.length)];
                    const plan = Math.random() > 0.5 ? 'Completo ⭐' : 'Básico 🔓';
                    
                    salesNotification.innerHTML = `
                        <div class="sales-content">
                            <div class="sales-icon">${plan.includes('Completo') ? '⭐' : '🔓'}</div>
                            <div class="sales-text">
                                <div class="sales-name">${name} • ${city}</div>
                                <div class="sales-plan">Comprou: ${plan}</div>
                                <div class="sales-time">agora mesmo</div>
                            </div>
                        </div>
                    `;
                    
                    salesNotification.style.display = 'block';
                    
                    setTimeout(() => {
                        salesNotification.style.display = 'none';
                    }, 5000);
                }
                
                // Inicia
                updateSales();
            }, 20000);
        }
        
        // 3. FUNÇÕES DE INTERAÇÃO
        function initInteractions() {
            // Previews
            document.querySelectorAll('.preview-card').forEach(card => {
                card.addEventListener('click', function() {
                    const overlay = this.querySelector('.canvas-overlay span');
                    if (overlay) {
                        const original = overlay.textContent;
                        overlay.textContent = '🔓 ABRINDO...';
                        overlay.style.background = 'rgba(37, 211, 102, 0.95)';
                        
                        setTimeout(() => {
                            overlay.textContent = original;
                            overlay.style.background = '';
                        }, 1500);
                    }
                });
            });
            
            // FAQ
            document.querySelectorAll('.faq-question').forEach(button => {
                button.addEventListener('click', () => {
                    button.classList.toggle('active');
                    const answer = button.nextElementSibling;
                    answer.classList.toggle('show');
                });
            });
        }
        
        // 4. INICIALIZA TUDO
        function initializeAll() {
            console.log('🔄 Inicializando funções do site...');
            
            initCounters();
            initInteractions();
            
            // Vendas fake com delay
            setTimeout(initFakeSales, 5000);
            
            console.log('✅ Site completamente inicializado!');
        }
        
        // Inicia
        initializeAll();
    }
});

// Função global para WhatsApp (com proteção)
function contactWhatsApp(plan = 'exclusivo') {
    // Se sistema anti-bot estiver ativo, usa método protegido
    if (window.antiBotSystem && window.antiBotSystem.protectWhatsAppLinks) {
        // Cria botão temporário para usar a proteção
        const tempBtn = document.createElement('button');
        tempBtn.setAttribute('data-whatsapp-protected', 'true');
        tempBtn.setAttribute('data-phone', '56974783157');
        tempBtn.setAttribute('data-message', `Olá Luana! Quero o conteúdo ${plan.toUpperCase()}! Me envie as informações por favor 😊`);
        
        window.antiBotSystem.protectWhatsAppLinks.call({
            showWarning: (msg) => console.log(msg)
        }, [tempBtn]);
        
        tempBtn.click();
        return;
    }
    
    // Fallback (sem proteção)
    const message = `Olá Luana! Quero conhecer seu conteúdo ${plan.toUpperCase()}! Me envie as informações por favor 😊`;
    const url = `https://wa.me/56974783157?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    return true;
}
