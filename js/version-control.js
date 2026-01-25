// version-control.js
document.addEventListener('DOMContentLoaded', function() {
    const version = window.pageVersion || 'explicit';
    const isSafe = version === 'safe';
    
    // 1. CONFIGURA IMAGENS E VÍDEOS
    configureMedia(isSafe);
    
    // 2. CONFIGURA TEXTOS
    configureTexts(isSafe);
    
    // 3. CONFIGURA PRÉVIAS DE CONTEÚDO
    configurePreviews(isSafe);
});

function configureMedia(isSafe) {
    // Configura avatar
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        avatar.src = isSafe 
            ? avatar.dataset.safeSrc 
            : avatar.dataset.explicitSrc;
    }
    
    // Configura banner de vídeo
    const video = document.querySelector('.profile-banner source');
    if (video) {
        const safeSource = document.querySelector('source[data-version="safe"]');
        const explicitSource = document.querySelector('source[data-version="explicit"]');
        
        if (isSafe && safeSource) {
            video.src = safeSource.src;
        } else if (!isSafe && explicitSource) {
            video.src = explicitSource.src;
        }
        video.parentElement.load(); // Recarrega o vídeo
    }
}

function configureTexts(isSafe) {
    const bioText = document.getElementById('bio-text');
    const metaNote = document.getElementById('meta-note');
    
    if (isSafe) {
        // TEXTO META-SAFE
        bioText.innerHTML = `
            Bem-vindo ao meu espaço exclusivo. Aqui compartilho conteúdos pessoais 
            e momentos especiais que não publico em outras redes.<br>
            Este é um ambiente privado para conexões mais próximas e experiências 
            únicas. Prepare-se para um acesso diferenciado e conteúdo reservado.<br>
            Escolha seu plano e entre na minha área particular.
        `;
        
        metaNote.textContent = "A maioria dos membros escolhe o acesso completo.";
        
        // Títulos dos planos (SAFE)
        document.getElementById('plan-basic-title').textContent = "Acesso Essencial";
        document.getElementById('plan-complete-title').textContent = "Acesso Completo ⭐";
        
        // Descrições dos planos (SAFE)
        const basicDesc = document.getElementById('plan-basic-desc');
        basicDesc.innerHTML = `
            <li>Seleção exclusiva de conteúdos</li>
            <li>Atualizações frequentes</li>
            <li>Experiência personalizada</li>
            <li>Área reservada para membros</li>
        `;
        
        const completeDesc = document.getElementById('plan-complete-desc');
        completeDesc.innerHTML = `
            <li>Biblioteca completa</li>
            <li>Conteúdo ilimitado</li>
            <li>Acesso premium</li>
            <li>Novidades diárias</li>
        `;
        
    } else {
        // TEXTO EXPLÍCITO
        bioText.innerHTML = `
            Bem-vindo ao meu mundo. Aqui não há filtros, apenas eu, 100% real e 
            pronta para compartilhar meus momentos mais íntimos.<br>
            Este é o meu espaço para explorar o prazer sem julgamentos. Se prepare 
            para uma experiência autêntica.<br>
            Escolha seu plano e entre na minha vida particular.
        `;
        
        metaNote.textContent = "A maioria dos usuários escolhe o acesso completo.";
        
        // Títulos dos planos (EXPLÍCITO)
        document.getElementById('plan-basic-title').textContent = "Acesso Essencial";
        document.getElementById('plan-complete-title').textContent = "Acesso Completo ⭐";
        
        // Descrições dos planos (EXPLÍCITO)
        const basicDesc = document.getElementById('plan-basic-desc');
        basicDesc.innerHTML = `
            <li>Uma curadoria com meus 100 melhores momentos de autoexploração e sensualidade</li>
            <li>Vídeos íntimos com brinquedos</li>
            <li>Momentos puros de prazer e descoberta</li>
            <li>Uma introdução ao meu universo mais pessoal</li>
        `;
        
        const completeDesc = document.getElementById('plan-complete-desc');
        completeDesc.innerHTML = `
            <li>Acesso total à minha biblioteca com mais de 600 vídeos. Sem censura, sem limites</li>
            <li>Cenas explícitas de masturbação e êxtase</li>
            <li>Close-ups íntimos e sons de prazer autênticos</li>
            <li>Posando e me exibindo completamente nua para você</li>
            <li>Galeria com mais de 500 imagens privadas e exclusivas</li>
        `;
    }
}

function configurePreviews(isSafe) {
    const previewGrid = document.querySelector('.preview-grid');
    if (!previewGrid) return;
    
    // Limpa o grid
    previewGrid.innerHTML = '';
    
    // Define as thumbs baseadas na versão
    const previews = isSafe ? [
        { thumb: 'assets/preview1-safe.jpg', alt: 'Conteúdo exclusivo 1' },
        { thumb: 'assets/preview2-safe.jpg', alt: 'Conteúdo exclusivo 2' },
        { thumb: 'assets/preview3-safe.jpg', alt: 'Conteúdo exclusivo 3' },
        { thumb: 'assets/preview4-safe.jpg', alt: 'Conteúdo exclusivo 4' }
    ] : [
        { thumb: 'assets/preview1-explicit.jpg', alt: 'Prévia do conteúdo 1' },
        { thumb: 'assets/preview2-explicit.jpg', alt: 'Prévia do conteúdo 2' },
        { thumb: 'assets/preview3-explicit.jpg', alt: 'Prévia do conteúdo 3' },
        { thumb: 'assets/preview4-explicit.jpg', alt: 'Prévia do conteúdo 4' }
    ];
    
    // Adiciona as previews ao grid
    previews.forEach((preview, index) => {
        const card = document.createElement('div');
        card.className = 'preview-card locked';
        card.dataset.src = `assets/preview${index + 1}.mp4`;
        
        card.innerHTML = `
            <img src="${preview.thumb}" alt="${preview.alt}" class="preview-thumb">
            <span>👉 Ver prévia 👈</span>
        `;
        
        previewGrid.appendChild(card);
    });
}
