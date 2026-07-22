const getApiBase = () => {
  if (window.location.protocol === 'file:') {
    return 'http://127.0.0.1:8000/api';
  }
  const host = window.location.hostname || '127.0.0.1';
  const port = window.location.port;
  if (port === '8000') {
    return '/api';
  }
  return `${window.location.protocol}//${host}:8000/api`;
};
const API_BASE = getApiBase();
let currentUserData = null;
let currentActiveModalSection = null;

document.addEventListener('DOMContentLoaded', async () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Load User Data
  await loadUserProfile();

  // Setup Avatar Listeners
  setupAvatarHandlers();

  // Setup Logout & Delete Listeners
  setupAccountHandlers();

  // Setup Edit Modal Save
  const btnSave = document.getElementById('btn-modal-save');
  if (btnSave) {
    btnSave.addEventListener('click', saveModalChanges);
  }
});

// Load Profile
async function loadUserProfile() {
  const userRaw = localStorage.getItem('rescue_user');
  let userEmail = 'user@example.com';
  if (userRaw) {
    try {
      const parsed = JSON.parse(userRaw);
      userEmail = parsed.email || userEmail;
    } catch (e) {}
  }

  try {
    const res = await fetch(`${API_BASE}/auth/me?email=${encodeURIComponent(userEmail)}`);
    if (res.ok) {
      currentUserData = await res.json();
      localStorage.setItem('rescue_user', JSON.stringify(currentUserData));
    } else {
      throw new Error('Fallback to local storage user');
    }
  } catch (err) {
    if (userRaw) {
      try { currentUserData = JSON.parse(userRaw); } catch (e) {}
    }
  }

  if (!currentUserData) {
    // Guest fallback
    currentUserData = {
      full_name: 'Guest User',
      email: 'guest@rescueai.org',
      profile: {
        full_name: 'Guest User',
        completion_percentage: 20,
        emergency_offline_status: 'Active (Guest Mode)'
      }
    };
  }

  renderProfileUI(currentUserData);
}

function renderProfileUI(data) {
  const p = data.profile || {};

  // Header Info
  document.getElementById('user-display-name').textContent = data.full_name || p.full_name || 'User Name';
  document.getElementById('user-display-email').textContent = data.email || 'user@rescueai.org';

  const pct = p.completion_percentage || 20;
  document.getElementById('completion-pct-value').textContent = `${pct}%`;
  document.getElementById('completion-bar-fill').style.width = `${pct}%`;

  if (data.profile_image || p.profile_photo) {
    document.getElementById('profile-avatar-img').src = data.profile_image || p.profile_photo;
  }

  // Personal Info
  document.getElementById('val-gender').textContent = p.gender || 'Not specified';
  document.getElementById('val-dob').textContent = p.dob ? `${p.dob} (${p.age || 'N/A'} yrs)` : 'Not specified';
  document.getElementById('val-phone').textContent = p.phone || 'Not specified';
  document.getElementById('val-alt-phone').textContent = p.alt_phone || 'Not specified';
  document.getElementById('val-address').textContent = p.address || 'Not specified';
  document.getElementById('val-city-state').textContent = (p.city || p.state) ? `${p.city || ''}, ${p.state || ''}` : 'Not specified';
  document.getElementById('val-country').textContent = (p.country || p.postal_code) ? `${p.country || ''} ${p.postal_code || ''}` : 'Not specified';

  // Medical Info
  document.getElementById('val-blood-group').textContent = p.blood_group || 'Unknown';
  document.getElementById('val-hwb').textContent = `${p.height || 'N/A'} / ${p.weight || 'N/A'}`;
  document.getElementById('val-allergies').textContent = p.allergies || 'None reported';
  document.getElementById('val-diseases').textContent = p.known_diseases || 'None reported';
  document.getElementById('val-organ-donor').textContent = p.organ_donor ? 'Yes (Donor)' : 'No';
  document.getElementById('val-hospital').textContent = p.preferred_hospital || 'Any Emergency Facility';

  // Emergency Contacts
  renderEmergencyContacts(p);

  // Biometrics
  document.getElementById('switch-fingerprint').checked = !!p.fingerprint_enabled;
  document.getElementById('switch-face').checked = !!p.face_auth_enabled;
  document.getElementById('switch-voice').checked = !!p.voice_auth_enabled;

  // Preferences
  document.getElementById('val-pref-lang').textContent = (p.preferred_language === 'hi') ? 'Hindi (हिंदी)' : ((p.preferred_language === 'mr') ? 'Marathi (मराठी)' : 'English');
  document.getElementById('val-last-sync').textContent = p.last_sync_time || 'Just now';

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// Emergency Contacts List (Up to 5)
function renderEmergencyContacts(p) {
  const container = document.getElementById('contacts-display-grid');
  container.innerHTML = '';

  const contacts = [];
  for (let i = 1; i <= 5; i++) {
    const name = p[`emergency_contact_${i}_name`];
    const rel = p[`emergency_contact_${i}_relationship`];
    const phone = p[`emergency_contact_${i}_phone`];
    if (name || phone) {
      contacts.push({ index: i, name: name || 'Contact', rel: rel || 'Emergency', phone: phone || '' });
    }
  }

  if (contacts.length === 0) {
    container.innerHTML = '<p style="color: #64748B; font-size: 0.9rem;">No emergency contacts added yet. Click "Manage Contacts" to add up to 5 contacts.</p>';
    return;
  }

  contacts.forEach(c => {
    const div = document.createElement('div');
    div.className = 'contact-card-item';
    div.innerHTML = `
      <div class="contact-info">
        <h4>${c.name} <span style="font-size:0.75rem; color:#8B5CF6; font-weight:600;">(#${c.index})</span></h4>
        <p>${c.rel}</p>
        <div class="contact-phone">${c.phone}</div>
      </div>
      <i data-lucide="phone" style="width:18px; height:18px; color:#6C63FF;"></i>
    `;
    container.appendChild(div);
  });
}

// Avatar Photo Handlers
function setupAvatarHandlers() {
  const fileInput = document.getElementById('avatar-file-input');
  const btnRemove = document.getElementById('btn-remove-avatar');

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (evt) => {
        const base64Img = evt.target.result;
        document.getElementById('profile-avatar-img').src = base64Img;
        let userEmail = currentUserData ? currentUserData.email : 'user@example.com';
        try {
          const res = await fetch(`${API_BASE}/auth/avatar?user_email=${encodeURIComponent(userEmail)}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ avatar_url: base64Img })
          });
          const data = await res.json();
          if (res.ok && data.user) {
            currentUserData = data.user;
            localStorage.setItem('rescue_user', JSON.stringify(currentUserData));
            renderProfileUI(currentUserData);
          }
        } catch (err) {
          await updateProfileAPI({ profile_photo: base64Img });
        }
      };
      reader.readAsDataURL(file);
    });
  }

  if (btnRemove) {
    btnRemove.addEventListener('click', async () => {
      document.getElementById('profile-avatar-img').src = '../assets/images/disaster/pandemic.png';
      await updateProfileAPI({ profile_photo: '' });
    });
  }
}

// Account Handlers
function setupAccountHandlers() {
  const btnLogout = document.getElementById('btn-danger-logout');
  const navLogout = document.getElementById('nav-btn-logout');
  const btnDelete = document.getElementById('btn-danger-delete');

  const doLogout = () => {
    localStorage.removeItem('rescue_token');
    localStorage.removeItem('rescue_user');
    window.location.href = '../index.html';
  };

  if (btnLogout) btnLogout.addEventListener('click', doLogout);
  if (navLogout) navLogout.addEventListener('click', doLogout);

  if (btnDelete) {
    btnDelete.addEventListener('click', async () => {
      if (confirm('Are you sure you want to delete your cloud account? Local emergency data will be preserved.')) {
        const userRaw = localStorage.getItem('rescue_user');
        if (userRaw) {
          try {
            const email = JSON.parse(userRaw).email;
            await fetch(`${API_BASE}/auth/account?user_email=${encodeURIComponent(email)}`, { method: 'DELETE' });
          } catch (e) {}
        }
        doLogout();
      }
    });
  }
}

// Section Edit Modals
function openSectionModal(section) {
  currentActiveModalSection = section;
  const modal = document.getElementById('edit-modal-backdrop');
  const title = document.getElementById('modal-title-text');
  const body = document.getElementById('modal-body-content');

  const p = currentUserData ? (currentUserData.profile || {}) : {};

  if (section === 'personal') {
    title.textContent = 'Edit Personal Information';
    body.innerHTML = `
      <div class="setup-field" style="margin-bottom:12px;">
        <label>Full Name</label>
        <input type="text" id="m-name" value="${currentUserData.full_name || p.full_name || ''}">
      </div>
      <div class="setup-field" style="margin-bottom:12px;">
        <label>Phone Number</label>
        <input type="text" id="m-phone" value="${p.phone || ''}">
      </div>
      <div class="setup-field" style="margin-bottom:12px;">
        <label>Gender</label>
        <select id="m-gender">
          <option value="Male" ${p.gender === 'Male' ? 'selected' : ''}>Male</option>
          <option value="Female" ${p.gender === 'Female' ? 'selected' : ''}>Female</option>
          <option value="Other" ${p.gender === 'Other' ? 'selected' : ''}>Other</option>
        </select>
      </div>
      <div class="setup-field" style="margin-bottom:12px;">
        <label>Address</label>
        <input type="text" id="m-address" value="${p.address || ''}">
      </div>
    `;
  } else if (section === 'medical') {
    title.textContent = 'Edit Medical Information';
    body.innerHTML = `
      <div class="setup-field" style="margin-bottom:12px;">
        <label>Blood Group</label>
        <input type="text" id="m-blood" value="${p.blood_group || ''}">
      </div>
      <div class="setup-field" style="margin-bottom:12px;">
        <label>Height & Weight</label>
        <input type="text" id="m-height" value="${p.height || ''}" placeholder="e.g. 175cm / 70kg">
      </div>
      <div class="setup-field" style="margin-bottom:12px;">
        <label>Known Allergies</label>
        <input type="text" id="m-allergies" value="${p.allergies || ''}">
      </div>
      <div class="setup-field" style="margin-bottom:12px;">
        <label>Known Diseases</label>
        <input type="text" id="m-diseases" value="${p.known_diseases || ''}">
      </div>
    `;
  } else if (section === 'contacts') {
    title.textContent = 'Manage Emergency Contacts (Up to 5)';
    body.innerHTML = `
      <div style="font-size:0.82rem; color:#64748B; margin-bottom:12px;">Emergency contact 1:</div>
      <input type="text" id="m-c1-name" placeholder="Contact 1 Name" value="${p.emergency_contact_1_name || ''}" style="margin-bottom:8px; width:100%; padding:10px; border-radius:10px; border:1px solid #CBD5E1;">
      <input type="tel" id="m-c1-phone" placeholder="Contact 1 Phone" value="${p.emergency_contact_1_phone || ''}" style="margin-bottom:16px; width:100%; padding:10px; border-radius:10px; border:1px solid #CBD5E1;">

      <div style="font-size:0.82rem; color:#64748B; margin-bottom:12px;">Emergency contact 2:</div>
      <input type="text" id="m-c2-name" placeholder="Contact 2 Name" value="${p.emergency_contact_2_name || ''}" style="margin-bottom:8px; width:100%; padding:10px; border-radius:10px; border:1px solid #CBD5E1;">
      <input type="tel" id="m-c2-phone" placeholder="Contact 2 Phone" value="${p.emergency_contact_2_phone || ''}" style="margin-bottom:16px; width:100%; padding:10px; border-radius:10px; border:1px solid #CBD5E1;">
    `;
  }

  modal.classList.add('active');
}

function closeEditModal() {
  document.getElementById('edit-modal-backdrop').classList.remove('active');
}

async function saveModalChanges() {
  const payload = {};

  if (currentActiveModalSection === 'personal') {
    payload.full_name = document.getElementById('m-name').value.trim();
    payload.phone = document.getElementById('m-phone').value.trim();
    payload.gender = document.getElementById('m-gender').value;
    payload.address = document.getElementById('m-address').value.trim();
  } else if (currentActiveModalSection === 'medical') {
    payload.blood_group = document.getElementById('m-blood').value.trim();
    payload.height = document.getElementById('m-height').value.trim();
    payload.allergies = document.getElementById('m-allergies').value.trim();
    payload.known_diseases = document.getElementById('m-diseases').value.trim();
  } else if (currentActiveModalSection === 'contacts') {
    payload.emergency_contact_1_name = document.getElementById('m-c1-name').value.trim();
    payload.emergency_contact_1_phone = document.getElementById('m-c1-phone').value.trim();
    payload.emergency_contact_2_name = document.getElementById('m-c2-name').value.trim();
    payload.emergency_contact_2_phone = document.getElementById('m-c2-phone').value.trim();
  }

  closeEditModal();
  await updateProfileAPI(payload);
}

async function updateProfileAPI(payload) {
  let userEmail = currentUserData ? currentUserData.email : 'user@example.com';

  try {
    const res = await fetch(`${API_BASE}/auth/profile?user_email=${encodeURIComponent(userEmail)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (res.ok && data.user) {
      currentUserData = data.user;
      localStorage.setItem('rescue_user', JSON.stringify(currentUserData));
      renderProfileUI(currentUserData);
    }
  } catch (err) {
    console.warn('Profile API update failed, updating local state:', err);
  }
}
