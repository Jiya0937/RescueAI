/**
 * RescueAI - Offline Maps & Live Location Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Fetch and render real locations from backend
  loadNearbyPlaces();

  // Element References
  const categoryChips = document.querySelectorAll('.category-chip');
  let placeCards = document.querySelectorAll('.place-item-card');
  const searchInput = document.getElementById('maps-search-input');
  const triggerSearchBtn = document.getElementById('trigger-search-btn');
  const voiceSearchBtn = document.getElementById('voice-search-btn');
  const locateMeBtn = document.getElementById('locate-me-btn');
  const valLat = document.getElementById('val-lat');
  const valLng = document.getElementById('val-lng');
  const mapBgImg = document.getElementById('map-bg-img');
  const mapZoomIn = document.getElementById('map-zoom-in');
  const mapZoomOut = document.getElementById('map-zoom-out');
  const mapRecenter = document.getElementById('map-recenter');
  const userLocationMarker = document.getElementById('user-location-marker');
  const actFindHospital = document.getElementById('act-find-hospital');
  const actStartNav = document.getElementById('act-start-nav');
  const actShareLoc = document.getElementById('act-share-loc');

  let currentZoomLevel = 1.0;

  // ==========================================================================
  // Category Chip Filtering
  // ==========================================================================
  categoryChips.forEach(chip => {
    chip.addEventListener('click', () => {
      categoryChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const selectedCategory = chip.getAttribute('data-category');
      filterPlaces(selectedCategory, searchInput.value.trim().toLowerCase());
    });
  });

  // ==========================================================================
  // Search Bar Filtering
  // ==========================================================================
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.trim().toLowerCase();
      const activeChip = document.querySelector('.category-chip.active');
      const activeCategory = activeChip ? activeChip.getAttribute('data-category') : 'all';
      filterPlaces(activeCategory, searchTerm);
    });
  }

  if (triggerSearchBtn) {
    triggerSearchBtn.addEventListener('click', () => {
      const searchTerm = searchInput.value.trim().toLowerCase();
      const activeChip = document.querySelector('.category-chip.active');
      const activeCategory = activeChip ? activeChip.getAttribute('data-category') : 'all';
      filterPlaces(activeCategory, searchTerm);
      showToast(`Searching for "${searchInput.value || 'places'}"...`);
    });
  }

  function filterPlaces(category, query) {
    let matchCount = 0;
    placeCards.forEach(card => {
      const cardCat = card.getAttribute('data-category');
      const cardTitle = card.querySelector('.place-name').textContent.toLowerCase();

      const catMatches = (category === 'all' || category === 'more' || cardCat === category);
      const queryMatches = !query || cardTitle.includes(query);

      if (catMatches && queryMatches) {
        card.style.display = 'flex';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (matchCount === 0) {
      showToast('No matching places found nearby.');
    }
  }

  // ==========================================================================
  // Voice Search Simulation
  // ==========================================================================
  if (voiceSearchBtn) {
    voiceSearchBtn.addEventListener('click', () => {
      showToast('🎤 Listening for voice search...', 'info');
      voiceSearchBtn.style.transform = 'scale(1.15)';
      setTimeout(() => {
        voiceSearchBtn.style.transform = 'scale(1)';
        searchInput.value = 'City Hospital';
        filterPlaces('all', 'city hospital');
        showToast('Voice Search Result: "City Hospital"');
      }, 1800);
    });
  }

  // ==========================================================================
  // "Locate Me" GPS Refresh Simulation
  // ==========================================================================
  if (locateMeBtn) {
    locateMeBtn.addEventListener('click', () => {
      const originalText = locateMeBtn.innerHTML;
      locateMeBtn.innerHTML = `<i data-lucide="loader-2" class="spin-icon"></i> <span>Locating...</span>`;
      if (window.lucide) lucide.createIcons();

      setTimeout(() => {
        const newLat = (22.7196 + (Math.random() * 0.002 - 0.001)).toFixed(4);
        const newLng = (75.8577 + (Math.random() * 0.002 - 0.001)).toFixed(4);

        if (valLat) valLat.textContent = `${newLat}° N`;
        if (valLng) valLng.textContent = `${newLng}° E`;

        locateMeBtn.innerHTML = originalText;
        if (window.lucide) lucide.createIcons();

        if (userLocationMarker) {
          userLocationMarker.style.transform = 'translate(-50%, -50%) scale(1.3)';
          setTimeout(() => {
            userLocationMarker.style.transform = 'translate(-50%, -50%) scale(1)';
          }, 300);
        }

        showToast('GPS position updated with high precision (±5m)');
      }, 1000);
    });
  }

  // ==========================================================================
  // Map Canvas Zoom & Recenter Controls
  // ==========================================================================
  if (mapZoomIn && mapBgImg) {
    mapZoomIn.addEventListener('click', () => {
      if (currentZoomLevel < 1.4) {
        currentZoomLevel += 0.15;
        mapBgImg.style.transform = `scale(${currentZoomLevel})`;
        showToast(`Map Zoom: ${Math.round(currentZoomLevel * 100)}%`);
      }
    });
  }

  if (mapZoomOut && mapBgImg) {
    mapZoomOut.addEventListener('click', () => {
      if (currentZoomLevel > 0.8) {
        currentZoomLevel -= 0.15;
        mapBgImg.style.transform = `scale(${currentZoomLevel})`;
        showToast(`Map Zoom: ${Math.round(currentZoomLevel * 100)}%`);
      }
    });
  }

  if (mapRecenter && mapBgImg) {
    mapRecenter.addEventListener('click', () => {
      currentZoomLevel = 1.0;
      mapBgImg.style.transform = `scale(1.0)`;
      showToast('Map re-centered to your location');
    });
  }

  // ==========================================================================
  // Navigation Buttons on Place Items
  // ==========================================================================
  function attachNavigateListeners() {
    document.querySelectorAll('.btn-navigate-sm').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.place-item-card');
        const placeName = card ? card.querySelector('.place-name').textContent : 'Destination';
        showToast(`Starting navigation to ${placeName}...`);
      });
    });
  }
  attachNavigateListeners();

  // ==========================================================================
  // Emergency Quick Actions
  // ==========================================================================
  if (actFindHospital) {
    actFindHospital.addEventListener('click', () => {
      const hospChip = document.querySelector('.category-chip[data-category="hospital"]');
      if (hospChip) hospChip.click();
      const nearbySection = document.querySelector('.nearby-places-card');
      if (nearbySection) {
        nearbySection.scrollIntoView({ behavior: 'smooth' });
      }
      showToast('Filtered nearby emergency hospitals');
    });
  }

  if (actStartNav) {
    actStartNav.addEventListener('click', () => {
      showToast('Starting turn-by-turn navigation to City Hospital (1.2 km)');
    });
  }

  if (actShareLoc) {
    actShareLoc.addEventListener('click', () => {
      const shareUrl = `https://rescueai.app/loc?lat=${valLat ? valLat.textContent : '22.7196'}&lng=${valLng ? valLng.textContent : '75.8577'}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        showToast('Live Location copied to clipboard!');
      }).catch(() => {
        showToast(`Location URL: ${shareUrl}`);
      });
    });
  }

  // Manage Maps button
  const manageMapsBtn = document.getElementById('manage-maps-btn');
  if (manageMapsBtn) {
    manageMapsBtn.addEventListener('click', () => {
      showToast('India Map Package (12.4 GB) is up to date and ready offline.');
    });
  }

  // ==========================================================================
  // Toast Helper Notification
  // ==========================================================================
  function showToast(message) {
    let toast = document.getElementById('maps-toast-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'maps-toast-notice';
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: #0F172A;
        color: #FFFFFF;
        padding: 12px 24px;
        border-radius: 9999px;
        font-size: 0.9rem;
        font-weight: 600;
        box-shadow: 0 10px 25px rgba(0,0,0,0.25);
        z-index: 9999;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        gap: 10px;
      `;
      document.body.appendChild(toast);
    }

    toast.innerHTML = `<i data-lucide="info" style="width: 18px; height: 18px; color: #6D5EF7;"></i> <span>${message}</span>`;
    if (window.lucide) lucide.createIcons();

    toast.style.transform = 'translateX(-50%) translateY(0)';

    clearTimeout(toast.timeoutId);
    toast.timeoutId = setTimeout(() => {
      toast.style.transform = 'translateX(-50%) translateY(100px)';
    }, 3200);
  }

  // ==========================================================================
  // Fetch Real Locations from Backend
  // ==========================================================================
  async function loadNearbyPlaces() {
    const placesListContainer = document.getElementById('nearby-places-list');
    if (!placesListContainer) return;

    try {
      const response = await fetch('http://localhost:8000/api/maps/');
      if (!response.ok) throw new Error("Maps API failed");

      const data = await response.json();
      if (data.success && Array.isArray(data.locations) && data.locations.length > 0) {
        renderPlaceCards(data.locations);
      }
    } catch (err) {
      console.warn("Could not load live locations, using default list", err);
    }
  }

  function renderPlaceCards(locations) {
    const placesListContainer = document.getElementById('nearby-places-list');
    placesListContainer.innerHTML = '';

    const categoryIconMap = {
      hospital: { icon: 'heart-pulse', color: 'red' },
      police: { icon: 'shield', color: 'blue' },
      pharmacy: { icon: 'pill', color: 'green' },
      petrol: { icon: 'fuel', color: 'orange' },
      atm: { icon: 'credit-card', color: 'purple' },
      school: { icon: 'graduation-cap', color: 'indigo' },
      railway: { icon: 'train', color: 'cyan' },
      restaurant: { icon: 'utensils', color: 'amber' },
      park: { icon: 'trees', color: 'teal' }
    };

    locations.forEach(place => {
      const meta = categoryIconMap[place.category] || { icon: 'map-pin', color: 'slate' };

      const card = document.createElement('div');
      card.className = 'place-item-card';
      card.setAttribute('data-category', place.category);
      card.innerHTML = `
        <div class="place-left">
          <div class="place-icon-wrapper bg-${meta.color}-light">
            <i data-lucide="${meta.icon}" class="icon-${meta.color}"></i>
          </div>
          <div class="place-info">
            <h4 class="place-name">${place.name}</h4>
            <div class="place-meta">
              <span class="place-distance">${place.distance_km ? place.distance_km + ' km' : ''}</span>
              <span class="place-badge badge-open">${place.status || 'Open'}</span>
            </div>
          </div>
        </div>
        <button class="btn-navigate-sm" title="Navigate">
          <i data-lucide="navigation"></i>
        </button>
      `;
      placesListContainer.appendChild(card);
    });

    if (window.lucide) lucide.createIcons();

    attachNavigateListeners();

    placeCards = document.querySelectorAll('.place-item-card');
  }

});