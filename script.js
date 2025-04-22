function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('active');
  }


  /*Acessibilidade*/
  
  function togglePanel() {
    const panel = document.getElementById("accessibility-options");
    panel.classList.toggle("hidden");
  }
  
  function toggleHighContrast() {
    document.body.classList.toggle("high-contrast");
  }
  
  function toggleDyslexicFont() {
    document.body.classList.toggle("dyslexic-font");
  }
  
  function toggleColorBlindMode() {
    document.body.classList.toggle("colorblind-mode");
  }
  
  function adjustFontSize(size) {
    document.documentElement.style.fontSize = size + "px";
  }
  




  function lerTexto() {
    
    let texto = document.getElementById('texto').textContent;
     
    let voz = new SpeechSynthesisUtterance();
     
    voz.text = texto;
    voz.lang = 'pt-BR';

    window.speechSynthesis.speak(voz);
  }