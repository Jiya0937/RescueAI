document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') lucide.createIcons();

  // ===========================================================
  // Config
  // ===========================================================
  const API_BASE = "http://127.0.0.1:8000/api";

  // TEMPORARY user identification, until real auth (JWT/session) exists.
  // Your login page should do:
  //   localStorage.setItem('rescue_user_email', theEmailTheyLoggedInWith);
  // on successful login. Everything here reads that value.
  const USER_EMAIL_KEY = 'rescue_user_email';
  const currentEmail = localStorage.getItem(USER_EMAIL_KEY);

  // ===========================================================
  // Toast helper
  // ===========================================================
  const toastEl = document.getElementById('settings-toast');
  let toastTimer;
  function showToast(message, isError = false) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.toggle('error', isError);
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2800);
  }

  // ===========================================================
  // 1. Load current profile into the form
  // ===========================================================
  const profileForm = document.getElementById('profile-form');
  const nameInput = document.getElementById('profile-name');
  const emailInput = document.getElementById('profile-email');
  const phoneInput = document.getElementById('profile-phone');
  const profileMsg = document.getElementById('profile-msg');

  async function loadProfile() {
    if (!currentEmail) {
      if (profileMsg) {
        profileMsg.textContent = "Not logged in — showing an empty form.";
        profileMsg.className = 'form-msg error';
      }
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/settings/profile?email=${encodeURIComponent(currentEmail)}`);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      nameInput.value = data.name || '';
      emailInput.value = data.email || currentEmail;
      phoneInput.value = data.phone || '';
    } catch (err) {
      console.error("Failed to load profile:", err);
      emailInput.value = currentEmail;
      if (profileMsg) {
        profileMsg.textContent = "Couldn't load full profile from the server.";
        profileMsg.className = 'form-msg error';
      }
    }
  }
  loadProfile();

  profileForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    profileMsg.textContent = '';
    profileMsg.className = 'form-msg';

    const submitBtn = profileForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;

    try {
      const res = await fetch(`${API_BASE}/settings/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          current_email: currentEmail,
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          phone: phoneInput.value.trim()
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Could not save changes.");

      // Email may have changed — keep localStorage in sync so future
      // requests on this page (and others) still identify the right user.
      localStorage.setItem(USER_EMAIL_KEY, data.email);

      profileMsg.textContent = "Saved.";
      profileMsg.className = 'form-msg success';
      showToast("Profile updated.");
    } catch (err) {
      profileMsg.textContent = err.message;
      profileMsg.className = 'form-msg error';
    } finally {
      submitBtn.disabled = false;
    }
  });

  // ===========================================================
  // 2. Update password
  // ===========================================================
  const passwordForm = document.getElementById('password-form');
  const currentPasswordInput = document.getElementById('current-password');
  const newPasswordInput = document.getElementById('new-password');
  const confirmPasswordInput = document.getElementById('confirm-password');
  const passwordMsg = document.getElementById('password-msg');

  passwordForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    passwordMsg.textContent = '';
    passwordMsg.className = 'form-msg';

    if (newPasswordInput.value !== confirmPasswordInput.value) {
      passwordMsg.textContent = "New passwords don't match.";
      passwordMsg.className = 'form-msg error';
      return;
    }
    if (newPasswordInput.value.length < 8) {
      passwordMsg.textContent = "New password must be at least 8 characters.";
      passwordMsg.className = 'form-msg error';
      return;
    }
    if (!currentEmail) {
      passwordMsg.textContent = "You need to be logged in to change your password.";
      passwordMsg.className = 'form-msg error';
      return;
    }

    const submitBtn = passwordForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;

    try {
      const res = await fetch(`${API_BASE}/settings/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: currentEmail,
          current_password: currentPasswordInput.value,
          new_password: newPasswordInput.value
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Could not update password.");

      passwordForm.reset();
      passwordMsg.textContent = "Password updated.";
      passwordMsg.className = 'form-msg success';
      showToast("Password updated.");
    } catch (err) {
      passwordMsg.textContent = err.message;
      passwordMsg.className = 'form-msg error';
    } finally {
      submitBtn.disabled = false;
    }
  });

  // ===========================================================
  // 3. Preferences (stored locally for now — wire to backend
  //    later if you want these synced across devices)
  // ===========================================================
  const prefSound = document.getElementById('pref-sound');
  const prefLocation = document.getElementById('pref-location');
  const PREFS_KEY = 'rescue_prefs';

  function loadPrefs() {
    try {
      const saved = JSON.parse(localStorage.getItem(PREFS_KEY) || '{}');
      if (typeof saved.sound === 'boolean') prefSound.checked = saved.sound;
      if (typeof saved.location === 'boolean') prefLocation.checked = saved.location;
    } catch { /* ignore malformed saved prefs */ }
  }
  function savePrefs() {
    localStorage.setItem(PREFS_KEY, JSON.stringify({
      sound: prefSound.checked,
      location: prefLocation.checked
    }));
    showToast("Preference saved.");
  }
  loadPrefs();
  prefSound?.addEventListener('change', savePrefs);
  prefLocation?.addEventListener('change', savePrefs);

  // ===========================================================
  // 4. Shortcuts & navigation
  // ===========================================================
  document.getElementById('emergency-shortcut')?.addEventListener('click', () => {
    window.location.href = 'sos.html';
  });

  document.getElementById('back-btn')?.addEventListener('click', () => {
    if (window.history.length > 1) window.history.back();
    else window.location.href = '../index.html';
  });

  document.getElementById('home-btn')?.addEventListener('click', () => {
    window.location.href = '../index.html';
  });

  document.getElementById('logout-btn')?.addEventListener('click', () => {
    localStorage.removeItem(USER_EMAIL_KEY);
    // If you keep a JWT/token elsewhere, clear it here too, e.g.:
    // localStorage.removeItem('rescue_token');
    window.location.href = '../index.html';
  });
});
