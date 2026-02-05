// Sistema de Internacionalização para Luana Silva
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('selectedLanguage') || 'pt';
        this.translations = {};
        this.isInitialized = false;
    }

    async init() {
        if (this.isInitialized) return;
        
        try {
            // Carregar traduções do idioma atual
            await this.loadLanguage(this.currentLang);
            this.isInitialized = true;
            
            // Aplicar traduções imediatamente
            this.applyTranslations();
            
            // Configurar evento para traduções dinâmicas
            this.setupDynamicTranslation();
            
            console.log(`Idioma inicializado: ${this.currentLang}`);
        } catch (error) {
            console.error('Erro ao carregar idioma:', error);
        }
    }

    async loadLanguage(langCode) {
        try {
            const response = await fetch(`translations/${langCode}.json`);
            if (!response.ok) throw new Error(`Idioma ${langCode} não encontrado`);
            
            this.translations = await response.json();
            this.currentLang = langCode;
            localStorage.setItem('selectedLanguage', langCode);
            
            return this.translations;
        } catch (error) {
            console.error(`Erro ao carregar idioma ${langCode}:`, error);
            
            // Tentar carregar português como fallback
            if (langCode !== 'pt') {
                console.log('Tentando carregar português como fallback...');
                return this.loadLanguage('pt');
            }
            
            throw error;
        }
    }

    get(key, params = {}) {
        let text = this.translations[key] || key;
        
        // Substituir parâmetros
        Object.keys(params).forEach(param => {
            text = text.replace(`{${param}}`, params[param]);
        });
        
        return text;
    }

    applyTranslations() {
        // Função para aplicar tradução a um elemento
        const translateElement = (element) => {
            const key = element.getAttribute('data-i18n');
            if (!key) return;
            
            const params = JSON.parse(element.getAttribute('data-i18n-params') || '{}');
            const text = this.get(key, params);
            
            // Preservar HTML se necessário
            if (element.hasAttribute('data-i18n-html')) {
                element.innerHTML = text;
            } else {
                element.textContent = text;
            }
        };
        
        // Aplicar a todos os elementos com data-i18n
        document.querySelectorAll('[data-i18n]').forEach(translateElement);
        
        // Aplicar título da página
        const pageTitle = this.get('profileTitle');
        if (pageTitle && pageTitle !== 'profileTitle') {
            document.title = pageTitle;
        }
        
        // Aplicar traduções específicas
        this.applySpecificTranslations();
    }

    applySpecificTranslations() {
        // Traduzir elementos específicos que não usam data-i18n
        const elements = {
            // Age gate
            '[data-i18n-age-title]': 'ageTitle',
            '[data-i18n-age-text]': 'ageText',
            '[data-i18n-age-button]': 'ageButton',
            '[data-i18n-age-note]': 'ageNote',
            
            // Modal de consentimento
            '[data-i18n-consent-title]': 'consentTitle',
            '[data-i18n-consent-text]': 'consentText',
            '[data-i18n-consent-yes]': 'consentYes',
            '[data-i18n-consent-no]': 'consentNo',
            
            // Bio e descrições
            '[data-i18n-bio]': 'bioText',
            '[data-i18n-projects]': 'projectsTitle',
            '[data-i18n-locked]': 'lockedContent',
            
            // Ofertas e promoções
            '[data-i18n-offer-title]': 'offerTitle',
            '[data-i18n-offer-text]': 'offerText',
            '[data-i18n-offer-ends]': 'offerEnds',
            
            // Planos
            '[data-i18n-choose-access]': 'chooseAccess',
            '[data-i18n-basic-title]': 'basicTitle',
            '[data-i18n-basic-price]': 'basicPrice',
            '[data-i18n-basic-button]': 'basicButton',
            '[data-i18n-complete-title]': 'completeTitle',
            '[data-i18n-complete-price]': 'completePrice',
            '[data-i18n-complete-button]': 'completeButton',
            '[data-i18n-popular]': 'popularChoice',
            '[data-i18n-most-users]': 'mostUsers',
            
            // Urgência
            '[data-i18n-urgency]': 'urgencyText',
            
            // Depoimentos
            '[data-i18n-testimonials]': 'whatTheySay',
            
            // Entrega
            '[data-i18n-delivery-title]': 'deliveryTitle',
            '[data-i18n-delivery-subtitle]': 'deliverySubtitle',
            
            // FAQ
            '[data-i18n-faq-title]': 'faqTitle',
            
            // Botões aprimorados
            '[data-i18n-basic-enhanced]': 'basicPlanEnhanced',
            '[data-i18n-complete-enhanced]': 'completePlanEnhanced'
        };
        
        Object.keys(elements).forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                const key = elements[selector];
                const text = this.get(key);
                if (selector.includes('html')) {
                    element.innerHTML = text;
                } else {
                    element.textContent = text;
                }
            }
        });
        
        // Traduzir listas de características
        this.translateFeatureLists();
        
        // Traduzir FAQ
        this.translateFAQ();
    }

    translateFeatureLists() {
        // Lista de características básicas
        const basicFeatures = this.get('basicFeatures');
        if (Array.isArray(basicFeatures)) {
            const basicList = document.querySelector('.plan-card.basic .plan-desc');
            if (basicList) {
                basicList.innerHTML = basicFeatures.map(feature => 
                    `<li>${feature}</li>`
                ).join('');
            }
        }
        
        // Lista de características completas
        const completeFeatures = this.get('completeFeatures');
        if (Array.isArray(completeFeatures)) {
            const completeList = document.querySelector('.plan-card.complete .plan-desc');
            if (completeList) {
                completeList.innerHTML = completeFeatures.map(feature => 
                    `<li>${feature}</li>`
                ).join('');
            }
        }
        
        // Lista de características aprimoradas (página bio)
        const enhancedBasic = document.querySelector('.plan-card.basic .plan-desc:nth-of-type(2)');
        const enhancedComplete = document.querySelector('.plan-card.complete .plan-desc:nth-of-type(2)');
        
        if (enhancedBasic) {
            const basicFeaturesEnhanced = [
                this.get('basicFeatures')[0] || "Meu Conteúdo adulto explícito com foco em te fazer G0Z4R!!",
                "Vídeos reais de masturbação intensa",
                "Usando brinquedos íntimos bem gostoso",
                "Corpo à mostra, sem censura ou cortes",
                "Sensualidade direta, sem enrolação",
                "Prazer real / Vem ver minha BUC3TlNH4 Amor."
            ];
            enhancedBasic.innerHTML = basicFeaturesEnhanced.map(feature => 
                `<li><strong>${feature.split(' ')[0]}</strong> ${feature.substring(feature.indexOf(' ') + 1)}</li>`
            ).join('');
        }
        
        if (enhancedComplete) {
            const completeFeaturesEnhanced = [
                "Acesso TOTAL ao meu conteúdo adulto mais explícito",
                "Mais de 600 VÍDEOS sem censura",
                "Transando Gostoso, ATÉ G0Z4R!!!",
                "Masturbação intensa e prazer real",
                "Close íntimo do corpo e dos detalhes",
                "Sons reais, gemidos e entrega total",
                "Conteúdo totalmente nua, sem cortes",
                "Conteúdo direto ao ponto, sem enrolação",
                "Galeria exclusiva com 500+ FOTOS privadas"
            ];
            enhancedComplete.innerHTML = completeFeaturesEnhanced.map(feature => 
                `<li><strong>${feature.split(' ')[0]}</strong> ${feature.substring(feature.indexOf(' ') + 1)}</li>`
            ).join('');
        }
    }

    translateFAQ() {
        const faqQuestions = this.get('faqQuestions');
        const faqAnswers = this.get('faqAnswers');
        
        if (Array.isArray(faqQuestions) && Array.isArray(faqAnswers)) {
            const faqButtons = document.querySelectorAll('.faq-question');
            const faqAnswersDivs = document.querySelectorAll('.faq-answer p');
            
            faqQuestions.forEach((question, index) => {
                if (faqButtons[index]) {
                    faqButtons[index].textContent = question;
                }
                if (faqAnswersDivs[index]) {
                    faqAnswersDivs[index].textContent = faqAnswers[index];
                }
            });
        }
    }

    setupDynamicTranslation() {
        // Observar mudanças dinâmicas no DOM
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) { // Element node
                            this.applyTranslations();
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    async changeLanguage(langCode) {
        try {
            await this.loadLanguage(langCode);
            this.applyTranslations();
            
            // Atualizar o seletor de idiomas
            this.updateLanguageSelector();
            
            // Disparar evento de mudança de idioma
            window.dispatchEvent(new CustomEvent('languageChanged', {
                detail: { language: langCode }
            }));
            
            console.log(`Idioma alterado para: ${langCode}`);
        } catch (error) {
            console.error('Erro ao alterar idioma:', error);
        }
    }

    updateLanguageSelector() {
        const currentFlag = document.querySelector('.current-language .flag img');
        const currentText = document.querySelector('.current-language span');
        
        if (currentFlag && currentText) {
            const flags = {
                'pt': '🇧🇷',
                'en': '🇺🇸',
                'es': '🇪🇸'
            };
            
            const names = {
                'pt': 'PT',
                'en': 'EN',
                'es': 'ES'
            };
            
            // Criar bandeira via emoji (mais simples)
            currentFlag.parentElement.innerHTML = `<span style="font-size: 20px">${flags[this.currentLang] || '🇧🇷'}</span>`;
            currentText.textContent = names[this.currentLang] || 'PT';
        }
    }
}

// Instância global
const languageManager = new LanguageManager();

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    languageManager.init();
});

// Exportar para uso global
window.languageManager = languageManager;
