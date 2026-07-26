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

document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Pre-fill user data if logged in
  const userRaw = localStorage.getItem('rescue_user');
  if (userRaw) {
    try {
      const user = JSON.parse(userRaw);
      const name = user.full_name || (user.profile ? user.profile.full_name : '');
      console.log('Setup for user:', name);
    } catch (e) {
      console.warn(e);
    }
  }

  const btnSkipAll = document.getElementById('btn-skip-all');
  if (btnSkipAll) {
    btnSkipAll.addEventListener('click', () => {
      window.location.href = './profile.html';
    });
  }
});

// Step navigation
function nextStep(stepNum) {
  // Hide all steps
  document.querySelectorAll('.setup-step-view').forEach(s => s.classList.remove('active'));

  // Show target step
  const targetStep = document.getElementById(`setup-step-${stepNum}`);
  if (targetStep) {
    targetStep.classList.add('active');
  }

  // Update dots & progress bar
  const stepLabels = {
    1: 'Step 1: Personal Details',
    2: 'Step 2: Medical Profile',
    3: 'Step 3: Emergency Contacts',
    4: 'Step 4: Hospital & Preferences'
  };

  const pcts = { 1: '20%', 2: '40%', 3: '70%', 4: '90%' };

  document.getElementById('step-name-label').textContent = stepLabels[stepNum] || 'Profile Setup';
  document.getElementById('progress-pct-text').textContent = `${pcts[stepNum] || '50%'} Complete`;
  document.getElementById('progress-bar-fill').style.width = pcts[stepNum] || '50%';

  for (let i = 1; i <= 4; i++) {
    const dot = document.getElementById(`dot-${i}`);
    if (!dot) continue;
    if (i === stepNum) {
      dot.className = 'step-dot active';
    } else if (i < stepNum) {
      dot.className = 'step-dot completed';
    } else {
      dot.className = 'step-dot';
    }
  }

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

async function saveAndNext(currentStep, nextStepNum) {
  const userRaw = localStorage.getItem('rescue_user');
  let userEmail = null;
  if (userRaw) {
    try { userEmail = JSON.parse(userRaw).email; } catch (e) {}
  }

  const payload = {};

  if (currentStep === 1) {
    payload.phone = document.getElementById('setup-phone').value.trim();
    payload.dob = document.getElementById('setup-dob').value;
    payload.gender = document.getElementById('setup-gender').value;
    payload.city = document.getElementById('setup-city').value.trim();
  } else if (currentStep === 2) {
    payload.blood_group = document.getElementById('setup-blood-group').value;
    const hw = document.getElementById('setup-height-weight').value.trim();
    if (hw) payload.height = hw;
    payload.allergies = document.getElementById('setup-allergies').value.trim();
    payload.known_diseases = document.getElementById('setup-diseases').value.trim();
  } else if (currentStep === 3) {
    payload.emergency_contact_1_name = document.getElementById('setup-contact1-name').value.trim();
    payload.emergency_contact_1_relationship = document.getElementById('setup-contact1-rel').value.trim();
    payload.emergency_contact_1_phone = document.getElementById('setup-contact1-phone').value.trim();
  }

  if (userEmail && Object.keys(payload).length > 0) {
    try {
      const res = await fetch(`${API_BASE}/auth/profile?user_email=${encodeURIComponent(userEmail)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.user) {
        localStorage.setItem('rescue_user', JSON.stringify(data.user));
      }
    } catch (err) {
      console.warn('API sync warning:', err);
    }
  }

  nextStep(nextStepNum);
}

async function finishSetup() {
  const userRaw = localStorage.getItem('rescue_user');
  let userEmail = null;
  if (userRaw) {
    try { userEmail = JSON.parse(userRaw).email; } catch (e) {}
  }

  const payload = {
    preferred_hospital: document.getElementById('setup-hospital').value.trim(),
    preferred_language: document.getElementById('setup-language').value
  };

  if (userEmail && Object.keys(payload).length > 0) {
    try {
      const res = await fetch(`${API_BASE}/auth/profile?user_email=${encodeURIComponent(userEmail)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.user) {
        localStorage.setItem('rescue_user', JSON.stringify(data.user));
      }
    } catch (err) {
      console.warn('API sync warning:', err);
    }
  }

  window.location.href = './profile.html';
}
