/* Common JavaScript for Emergency Detail Pages (CPR, Snake Bite, etc.) */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Hook up Navigation Back button translation if any
  const backLink = document.querySelector('.back-home-link span');
  if (backLink) {
    backLink.setAttribute('data-i18n', 'nav_back_to_guide');
  }

  // 2. Emergency Actions Button Handlers
  const call108Btn = document.getElementById('action-call-108');
  const call112Btn = document.getElementById('action-call-112');
  const shareLocationBtn = document.getElementById('action-share-location');
  const findHospitalBtn = document.getElementById('action-find-hospital');

  if (call108Btn) {
    call108Btn.addEventListener('click', () => {
      window.location.href = 'tel:108';
    });
  }

  if (call112Btn) {
    call112Btn.addEventListener('click', () => {
      window.location.href = 'tel:112';
    });
  }

  if (findHospitalBtn) {
    findHospitalBtn.addEventListener('click', () => {
      window.open('https://www.google.com/maps/search/hospitals+near+me', '_blank');
    });
  }

  if (shareLocationBtn) {
    shareLocationBtn.addEventListener('click', () => {
      if (navigator.geolocation) {
        // Show temporary UI state
        const originalText = shareLocationBtn.querySelector('.action-btn-text').textContent;
        const textSpan = shareLocationBtn.querySelector('.action-btn-text');
        textSpan.textContent = 'Locating...';
        
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const mapsUrl = `https://maps.google.com/?q=${lat},${lng}`;
            textSpan.textContent = 'Located!';
            
            setTimeout(() => {
              textSpan.textContent = originalText;
            }, 2000);

            if (navigator.share) {
              navigator.share({
                title: 'My Emergency Location - RescueAI',
                text: 'I am sharing my current emergency location:',
                url: mapsUrl
              }).catch(() => {
                copyTextToClipboard(mapsUrl);
              });
            } else {
              copyTextToClipboard(mapsUrl);
            }
          },
          (error) => {
            textSpan.textContent = originalText;
            alert('Unable to retrieve location. Please check your GPS permissions.');
          },
          { enableHighAccuracy: true, timeout: 5000 }
        );
      } else {
        alert('Geolocation is not supported by your browser.');
      }
    });
  }

  function copyTextToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Emergency location link copied to clipboard: ' + text);
    }).catch(() => {
      prompt('Copy emergency location link:', text);
    });
  }

  // 3. Keep current language active and run initial translation
  const savedLang = localStorage.getItem('rescue_lang') || 'en';
  if (window.RescueTranslations) {
    window.RescueTranslations.apply(savedLang);
  }
});
