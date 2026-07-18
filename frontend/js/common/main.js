document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Language Selector Modal Toggle
  const langBtn = document.getElementById('nav-lang');
  const langModal = document.getElementById('lang-modal-container');
  const langOverlay = document.getElementById('lang-modal-overlay');

  function openLangModal() {
    if (langModal && langOverlay) {
      langModal.classList.add('active');
      langOverlay.classList.add('active');
      const searchInput = document.getElementById('lang-search-input');
      if (searchInput) searchInput.focus();
    }
  }

  function closeLangModal() {
    if (langModal && langOverlay) {
      langModal.classList.remove('active');
      langOverlay.classList.remove('active');
    }
  }

  if (langBtn) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = langModal.classList.contains('active');
      if (isActive) {
        closeLangModal();
      } else {
        openLangModal();
      }
    });
  }

  if (langOverlay) {
    langOverlay.addEventListener('click', closeLangModal);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLangModal();
    }
  });

  // 3. Search and Filter Languages
  const searchInput = document.getElementById('lang-search-input');
  const langCards = document.querySelectorAll('.lang-card');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      langCards.forEach(card => {
        const engName = card.querySelector('.lang-eng-name').textContent.toLowerCase();
        const nativeName = card.querySelector('.lang-native-name').textContent.toLowerCase();
        if (engName.includes(query) || nativeName.includes(query)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // 4. Language Selection Logic
  langCards.forEach(card => {
    card.addEventListener('click', () => {
      const selectedLang = card.getAttribute('data-lang');
      
      // Update selected class in list
      langCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      
      // Trigger translation
      if (window.RescueTranslations) {
        window.RescueTranslations.apply(selectedLang);
      }
      
      // Dispatch custom event for home.js to update placeholders/bot replies
      const event = new CustomEvent('rescueLangChanged', { detail: { lang: selectedLang } });
      document.dispatchEvent(event);

      // Close modal with minor delay for smooth feedback
      setTimeout(closeLangModal, 300);
    });
  });

  // 5. Settings Checkboxes (Sync Voice & Auto Detect)
  const syncVoiceCheckbox = document.getElementById('sync-voice-checkbox');
  const autoDetectCheckbox = document.getElementById('auto-detect-checkbox');

  // Load settings from localStorage
  if (syncVoiceCheckbox) {
    const savedSync = localStorage.getItem('rescue_sync_voice');
    syncVoiceCheckbox.checked = savedSync === null ? true : (savedSync === 'true');
    syncVoiceCheckbox.addEventListener('change', (e) => {
      localStorage.setItem('rescue_sync_voice', e.target.checked);
    });
  }

  if (autoDetectCheckbox) {
    const savedAuto = localStorage.getItem('rescue_auto_detect');
    autoDetectCheckbox.checked = savedAuto === 'true';
    autoDetectCheckbox.addEventListener('change', (e) => {
      localStorage.setItem('rescue_auto_detect', e.target.checked);
      if (e.target.checked) {
        runAutoDetect();
      }
    });
  }

  // Auto-detect function
  function runAutoDetect() {
    const detected = navigator.language || navigator.userLanguage || 'en';
    const primaryCode = detected.split('-')[0].toLowerCase();
    
    // Check if we support this language in translations
    if (window.RescueTranslations && window.RescueTranslations.data[primaryCode]) {
      applySelectedLang(primaryCode);
    }
  }

  function applySelectedLang(langCode) {
    langCards.forEach(c => {
      if (c.getAttribute('data-lang') === langCode) {
        c.classList.add('selected');
      } else {
        c.classList.remove('selected');
      }
    });
    if (window.RescueTranslations) {
      window.RescueTranslations.apply(langCode);
    }
  }

  // 6. Page Initialization
  const savedLang = localStorage.getItem('rescue_lang');
  const isAutoDetectOn = localStorage.getItem('rescue_auto_detect') === 'true';

  if (savedLang) {
    applySelectedLang(savedLang);
  } else if (isAutoDetectOn) {
    runAutoDetect();
  } else {
    // Default to English
    applySelectedLang('en');
  }
});
