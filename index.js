// Mostra il loader
function showLoader() {
  document.getElementById('loader').style.display = 'block';
}

// Nascondi il loader
function hideLoader() {
  document.getElementById('loader').style.display = 'none';
}

// Funzione per mostrare la pagina selezionata
function showPage(pageId, updateHistory = true) {
  // Mostra il loader solo durante la navigazione tra le sezioni (non al caricamento iniziale)
  if (updateHistory) {
    showLoader();
  }

  setTimeout(() => {
    // Nasconde tutte le sezioni
    const sections = document.querySelectorAll('.content');
    sections.forEach(section => {
      section.classList.remove('active');
    });

    // Mostra la sezione selezionata
    const sectionToShow = document.getElementById(pageId);
    if (sectionToShow) {
      sectionToShow.classList.add('active');
    }

    // Aggiorna la cronologia del browser solo se specificato
    if (updateHistory) {
      history.pushState({ page: pageId }, null, `#${pageId}`);
    }

    // Nasconde il loader dopo aver mostrato la pagina
    hideLoader();
  }, updateHistory ? 1000 : 0); // Imposta il timeout solo se si sta navigando
}

// Gestisce la navigazione indietro/avanti
window.onpopstate = function(event) {
  if (event.state && event.state.page) {
    showPage(event.state.page, false); // Non aggiornare di nuovo la cronologia
  }
};

// Carica la pagina corretta in base all'URL o default a 'home'
window.onload = function() {
  let initialPage = window.location.hash ? window.location.hash.substring(1) : 'home';
  hideLoader();
  showPage(initialPage, false);
};

// Gestisce i clic sui link senza ricaricare la pagina
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault(); // Evita il comportamento predefinito dei link
    const pageId = this.getAttribute('href').substring(1);
    showPage(pageId); // Mostra la sezione corrispondente al link
  });
});