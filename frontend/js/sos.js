document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') lucide.createIcons();

  // ===========================================================
  // Config
  // ===========================================================
  // Backend base URL — same host your other pages (e.g. home.js) call.
  const API_BASE = "http://127.0.0.1:8000/api";
  const CONTACTS_ENDPOINT = `${API_BASE}/emergency-contacts`;

  // India defaults — edit numbers/labels for your region.
  // "forest" numbers vary a lot by state; verify the right one for your area.
  const EMERGENCY_SERVICES = [
    { id: 'police',    name: 'Police',            number: '100',  icon: 'shield',        css: 'svc-police' },
    { id: 'ambulance', name: 'Ambulance',         number: '108',  icon: 'siren',         css: 'svc-ambulance' },
    { id: 'fire',      name: 'Fire Brigade',      number: '101',  icon: 'flame',         css: 'svc-fire' },
    { id: 'hospital',  name: 'Hospital Helpline', number: '102',  icon: 'cross',         css: 'svc-hospital' },
    { id: 'forest',    name: 'Forest Fire Help',  number: '1926', icon: 'trees',         css: 'svc-forest' },
    { id: 'national',  name: 'National Emergency',number: '112',  icon: 'phone-call',    css: 'svc-police' },
  ];

  // ===========================================================
  // Toast helper
  // ===========================================================
  const toastEl = document.getElementById('sos-toast');
  let toastTimer;
  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2600);
  }

  // ===========================================================
  // 1. Render "Call Emergency Services" grid
  // ===========================================================
  const serviceGrid = document.getElementById('service-grid');
  function renderServices() {
    if (!serviceGrid) return;
    serviceGrid.innerHTML = EMERGENCY_SERVICES.map(svc => `
      <a class="service-card ${svc.css}" href="tel:${svc.number}" data-service="${svc.id}">
        <span class="service-icon"><i data-lucide="${svc.icon}"></i></span>
        <span class="service-name">${svc.name}</span>
        <span class="service-number">${svc.number}</span>
        <span class="service-call"><i data-lucide="phone"></i> Tap to call</span>
      </a>
    `).join('');
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
  renderServices();

  serviceGrid?.addEventListener('click', (e) => {
    const card = e.target.closest('.service-card');
    if (card) showToast(`Calling ${card.querySelector('.service-name').textContent}…`);
  });

  // ===========================================================
  // 2. Geolocation for the location card
  // ===========================================================
  const locationValue = document.getElementById('location-value');
  const locationAccuracy = document.getElementById('location-accuracy');
  let lastKnownLocation = null;

  function updateLocation() {
    if (!navigator.geolocation) {
      if (locationValue) locationValue.textContent = "Location not supported on this device.";
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        lastKnownLocation = { latitude, longitude, accuracy };
        if (locationValue) {
          locationValue.textContent = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
        }
        if (locationAccuracy) {
          locationAccuracy.textContent = `Accuracy: ${Math.round(accuracy)} m`;
        }
        // Optional: reverse-geocode via your existing /api/maps route here
        // to show a human-readable address instead of raw coordinates.
      },
      (err) => {
        if (locationValue) locationValue.textContent = "Couldn't access location. Enable location permission.";
        console.warn("Geolocation error:", err);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }
  updateLocation();

  // ===========================================================
  // 3. Hold-for-3-seconds SOS button
  // ===========================================================
  const sosButton = document.getElementById('sos-button');
  const ringProgress = document.getElementById('sos-ring-progress');
  const HOLD_MS = 3000;
  const RING_LENGTH = 578; // 2 * PI * r(92), matches stroke-dasharray in CSS

  let holdStart = null;
  let holdRAF = null;
  let triggered = false;

  function setRing(fraction) {
    if (!ringProgress) return;
    const offset = RING_LENGTH - RING_LENGTH * fraction;
    ringProgress.style.strokeDashoffset = String(offset);
  }

  function tickHold() {
    const elapsed = performance.now() - holdStart;
    const fraction = Math.min(elapsed / HOLD_MS, 1);
    setRing(fraction);

    if (fraction >= 1) {
      completeSOS();
      return;
    }
    holdRAF = requestAnimationFrame(tickHold);
  }

  function startHold() {
    if (triggered) return;
    holdStart = performance.now();
    sosButton.classList.add('charging');
    holdRAF = requestAnimationFrame(tickHold);
  }

  function cancelHold() {
    cancelAnimationFrame(holdRAF);
    sosButton.classList.remove('charging');
    if (!triggered) setRing(0);
  }

  function completeSOS() {
    triggered = true;
    cancelAnimationFrame(holdRAF);
    sosButton.classList.remove('charging');
    sosButton.classList.add('triggered');
    setRing(1);
    showToast("SOS activated — notifying your emergency contacts and sharing location.");

    // Wire this up to your backend, e.g.:
    // fetch(`${API_BASE}/sos/trigger`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ location: lastKnownLocation })
    // });

    setTimeout(() => {
      triggered = false;
      sosButton.classList.remove('triggered');
      setRing(0);
    }, 4000);
  }

  if (sosButton) {
    sosButton.addEventListener('pointerdown', startHold);
    sosButton.addEventListener('pointerup', cancelHold);
    sosButton.addEventListener('pointerleave', cancelHold);
    sosButton.addEventListener('pointercancel', cancelHold);
  }

  // ===========================================================
  // 4. My Emergency Contacts — CRUD against the backend
  // ===========================================================
  const contactForm = document.getElementById('contact-form');
  const contactNameInput = document.getElementById('contact-name');
  const contactPhoneInput = document.getElementById('contact-phone');
  const contactRelationInput = document.getElementById('contact-relation');
  const contactPrimaryInput = document.getElementById('contact-primary');
  const contactFormError = document.getElementById('contact-form-error');
  const contactsList = document.getElementById('contacts-list');
  const contactsEmpty = document.getElementById('contacts-empty');

  function initials(name) {
    return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() || '').join('');
  }

  function renderContacts(contacts) {
    if (!contactsList) return;

    if (!contacts || contacts.length === 0) {
      contactsList.innerHTML = '';
      if (contactsEmpty) contactsEmpty.hidden = false;
      return;
    }
    if (contactsEmpty) contactsEmpty.hidden = true;

    contactsList.innerHTML = contacts.map(c => `
      <div class="contact-card" data-id="${c.id}">
        <span class="contact-avatar">${initials(c.name)}</span>
        <div class="contact-info">
          <div class="contact-name-row">
            <span class="contact-name">${escapeHtml(c.name)}</span>
            ${c.is_primary ? '<span class="contact-badge">NOTIFY FIRST</span>' : ''}
          </div>
          <div class="contact-meta">${escapeHtml(c.relation || 'Contact')} · ${escapeHtml(c.phone)}</div>
        </div>
        <div class="contact-actions">
          <button class="call-action" data-action="call" data-phone="${c.phone}" aria-label="Call ${escapeHtml(c.name)}">
            <i data-lucide="phone"></i>
          </button>
          <button class="delete-action" data-action="delete" data-id="${c.id}" aria-label="Remove ${escapeHtml(c.name)}">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      </div>
    `).join('');
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  async function loadContacts() {
    try {
      const res = await fetch(CONTACTS_ENDPOINT);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      renderContacts(data);
    } catch (err) {
      console.error("Failed to load contacts:", err);
      if (contactsList) {
        contactsList.innerHTML = '';
      }
      if (contactsEmpty) {
        contactsEmpty.hidden = false;
        contactsEmpty.innerHTML = `<i data-lucide="wifi-off"></i> Couldn't reach the server. Is the backend running?`;
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }
    }
  }

  async function addContact(payload) {
    const res = await fetch(CONTACTS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.detail || "Could not save contact.");
    }
    return data;
  }

  async function deleteContact(id) {
    const res = await fetch(`${CONTACTS_ENDPOINT}/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.detail || "Could not delete contact.");
    }
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (contactFormError) contactFormError.textContent = '';

      const payload = {
        name: contactNameInput.value.trim(),
        phone: contactPhoneInput.value.trim(),
        relation: contactRelationInput.value,
        is_primary: contactPrimaryInput.checked
      };

      if (!payload.name || !payload.phone) {
        if (contactFormError) contactFormError.textContent = "Name and phone number are required.";
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;

      try {
        await addContact(payload);
        contactForm.reset();
        showToast("Contact saved.");
        await loadContacts();
      } catch (err) {
        if (contactFormError) contactFormError.textContent = err.message;
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  contactsList?.addEventListener('click', async (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;

    if (btn.dataset.action === 'call') {
      window.location.href = `tel:${btn.dataset.phone}`;
      return;
    }

    if (btn.dataset.action === 'delete') {
      const card = btn.closest('.contact-card');
      const name = card?.querySelector('.contact-name')?.textContent || 'this contact';
      if (!confirm(`Remove ${name} from your emergency contacts?`)) return;

      try {
        await deleteContact(btn.dataset.id);
        showToast("Contact removed.");
        await loadContacts();
      } catch (err) {
        showToast(err.message || "Could not remove contact.");
      }
    }
  });

  loadContacts();

  // ===========================================================
  // 5. Top bar buttons
  // ===========================================================
  document.getElementById('back-btn')?.addEventListener('click', () => {
    document.getElementById('home-btn')?.addEventListener('click', () => {
  window.location.href = '../index.html';
});
    if (window.history.length > 1) window.history.back();
    else window.location.href = '../index.html';
  });
});
