// Menu Mobile
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('active');
}

// Acessibilidade - Painel
function togglePanel() {
    const panel = document.getElementById("accessibility-options");
    panel.classList.toggle("hidden");
    
    // Fecha o menu mobile se estiver aberto
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
    }
}

// Alto Contraste
function toggleHighContrast() {
    document.body.classList.toggle("high-contrast");
    localStorage.setItem('highContrast', document.body.classList.contains("high-contrast"));
}

// Fonte Disléxica
function toggleDyslexicFont() {
    document.body.classList.toggle("dyslexic-font");
    localStorage.setItem('dyslexicFont', document.body.classList.contains("dyslexic-font"));
}

// Modo Daltonismo Melhorado
function toggleColorBlindMode() {
    const body = document.body;
    const typeElement = document.getElementById('colorblind-type');
    
    if (!body.classList.contains('colorblind-mode')) {
        // Ativa o modo padrão (Protanopia)
        body.classList.add('colorblind-mode', 'protanopia');
        typeElement.textContent = '(Protanopia)';
        localStorage.setItem('colorBlindMode', 'protanopia');
    } 
    else if (body.classList.contains('protanopia')) {
        // Muda para Deuteranopia
        body.classList.replace('protanopia', 'deuteranopia');
        typeElement.textContent = '(Deuteranopia)';
        localStorage.setItem('colorBlindMode', 'deuteranopia');
    }
    else if (body.classList.contains('deuteranopia')) {
        // Muda para Tritanopia
        body.classList.replace('deuteranopia', 'tritanopia');
        typeElement.textContent = '(Tritanopia)';
        localStorage.setItem('colorBlindMode', 'tritanopia');
    }
    else {
        // Desativa tudo
        body.classList.remove('colorblind-mode', 'tritanopia', 'deuteranopia', 'protanopia');
        typeElement.textContent = '';
        localStorage.removeItem('colorBlindMode');
    }
    
    // Atualiza o checkbox
    document.querySelector('#accessibility-options input[type="checkbox"]:nth-of-type(3)').checked = 
        body.classList.contains('colorblind-mode');
}

// Tamanho da Fonte
function adjustFontSize(size) {
    // Suavização do redimensionamento
    const baseSize = 16;
    const scaleFactor = 0.6;
    
    // Calcula o tamanho suavizado
    const smoothSize = baseSize + (size - baseSize) * scaleFactor;
    
    // Aplica com transição
    document.documentElement.style.fontSize = smoothSize + 'px';
    document.getElementById("font-size-value").textContent = size + "px";
    
    // Atualiza o slider
    const slider = document.querySelector('#accessibility-options input[type="range"]');
    if (slider) slider.value = size;
    
    // Salva preferência
    localStorage.setItem('fontSize', size);
}

// Carrega preferências ao iniciar
document.addEventListener('DOMContentLoaded', function() {
    // Tamanho da fonte
    const savedFontSize = localStorage.getItem('fontSize') || 16;
    adjustFontSize(savedFontSize);
    
    // Alto contraste
    if (localStorage.getItem('highContrast') === 'true') {
        document.body.classList.add("high-contrast");
        document.querySelector('#accessibility-options input[type="checkbox"]:nth-of-type(1)').checked = true;
    }
    
    // Fonte disléxica
    if (localStorage.getItem('dyslexicFont') === 'true') {
        document.body.classList.add("dyslexic-font");
        document.querySelector('#accessibility-options input[type="checkbox"]:nth-of-type(2)').checked = true;
    }
    
    // Modo daltônico
    const colorBlindMode = localStorage.getItem('colorBlindMode');
    if (colorBlindMode) {
        document.body.classList.add('colorblind-mode', colorBlindMode);
        document.querySelector('#accessibility-options input[type="checkbox"]:nth-of-type(3)').checked = true;
        document.getElementById('colorblind-type').textContent = `(${colorBlindMode})`;
    }
});

// Fecha o painel de acessibilidade ao clicar fora
document.addEventListener('click', function(event) {
    const accBtn = document.querySelector('#accessibility-btn > button');
    const accPanel = document.getElementById('accessibility-options');
    
    if (accPanel && !accPanel.classList.contains('hidden') && 
        !accBtn.contains(event.target) && 
        !accPanel.contains(event.target)) {
        accPanel.classList.add('hidden');
    }
});