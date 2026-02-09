// ============================================
// SCRIPT PRINCIPAL - VERSÃO HUMANA
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Site carregado para humano');
    
    // VERIFICA SE É HUMANO
    const isHuman = () => {
        // Testes simples de humanidade
        if (navigator.userAgent.includes('bot')) return false;
        if (navigator.userAgent.includes('crawler')) return false;
        if (navigator.userAgent.includes('spider')) return false;
        
        // Verifica interação básica
        if (typeof document.addEventListener !== 'function') return false;
        
        return true;
    };
    
    if (!isHuman()) {
        console.log('🤖 Robô detectado - Redirecionando...');
        window.location.href = 'honeypot.html';
        return;
    }
    
    // SE FOR HUMANO, INICIA TUDO
    initForHumans();
});

function initForHumans() {
    console.log('👤 Iniciando sistema para humano');
    
    // 1. CARREGA MÍDIAS
    loadMedia();
    
    // 2. INICIA CONTADORES
    startCounters();
    
    // 3. INICIA INTERAÇÕES
    setupInteractions();
    
    // 4. MOSTRA CONTEÚDO
    showContent();
}

function loadMedia() {
    // Carrega imagens com data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.getAttribute('data-src');
    });
    
    // Carrega vídeos
    document.querySelectorAll('video source[data-src]').forEach(source => {
        source.src = source.getAttribute('data-src');
        source.parentElement.load();
    });
}

function startCounters() {
    // Contador de acessos
    const accessEl = document.getElementById('access-count');
    if (accessEl) {
        let count = 45;
        setInterval(() => {
            count += Math.random() > 0.4 ? 1 : 0;
            if (count > 85) count = 45;
            accessEl.textContent = count;
        }, 45000);
    }
    
    // Contador online
    const onlineEl = document.getElementById('online-count');
    if (onlineEl) {
        let count = 28;
        setInterval(() => {
            count += Math.random() > 0.5 ? 1 : -1;
            if (count < 20) count = 25;
            if (count > 40) count = 35;
            onlineEl.textContent = count;
        }, 30000);
    }
}

function setupInteractions() {
    // WhatsApp
    document.querySelectorAll('[data-whatsapp]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const phone = this.getAttribute('data-phone') || '56974783157';
            const message = this.getAttribute('data-message') || 'Olá!';
            
            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
        });
    });
    
    // Previews
    document.querySelectorAll('.preview-card').forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => this.style.transform = '', 200);
        });
    });
}

function showContent() {
    // Remove proteções visuais
    document.body.classList.add('content-visible');
    
    // Animação suave
    const main = document.querySelector('main');
    if (main) {
        main.style.opacity = '0';
        setTimeout(() => {
            main.style.transition = 'opacity 0.5s ease';
            main.style.opacity = '1';
        }, 300);
    }
}

// Função global para WhatsApp
function contactWhatsApp(plan) {
    const message = plan ? 
        `Olá! Quero o plano ${plan}` : 
        'Olá! Quero conhecer seu conteúdo';
    
    window.open(`https://wa.me/56974783157?text=${encodeURIComponent(message)}`, '_blank');
}
