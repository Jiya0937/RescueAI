// RescueAI Authentication Script

document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

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

  // Elements
  const backBtn = document.getElementById('auth-back-btn');
  const signInTab = document.getElementById('sign-in-tab');
  const createAccountTab = document.getElementById('create-account-tab');
  const linkToSignup = document.getElementById('link-to-signup');
  const linkToSignin = document.getElementById('link-to-signin');

  const signInForm = document.getElementById('sign-in-form');
  const signUpForm = document.getElementById('signup-form');

  const btnGoogleSignin = document.getElementById('btn-google-signin');

  const signinError = document.getElementById('signin-error');
  const signupError = document.getElementById('signup-error');

  // Back Button
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      window.location.href = '../index.html';
    });
  }

  // Tab Switching
  function showTab(tab) {
    if (tab === 'signup') {
      signInTab.classList.remove('active');
      createAccountTab.classList.add('active');
    } else {
      createAccountTab.classList.remove('active');
      signInTab.classList.add('active');
    }
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  if (linkToSignup) {
    linkToSignup.addEventListener('click', (e) => {
      e.preventDefault();
      showTab('signup');
    });
  }

  if (linkToSignin) {
    linkToSignin.addEventListener('click', (e) => {
      e.preventDefault();
      showTab('signin');
    });
  }

  // Password Visibility Toggles
  document.querySelectorAll('.auth-toggle-pwd').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (!input) return;

      if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = '<i data-lucide="eye"></i>';
      } else {
        input.type = 'password';
        btn.innerHTML = '<i data-lucide="eye-off"></i>';
      }
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    });
  });

  // Password Validation Feedback
  const pwdInput = document.getElementById('signup-password');
  if (pwdInput) {
    pwdInput.addEventListener('input', () => {
      const val = pwdInput.value;
      const ruleLength = document.getElementById('rule-length');
      const ruleNumber = document.getElementById('rule-number');
      const ruleSpecial = document.getElementById('rule-special');

      if (val.length >= 8) ruleLength.classList.add('valid');
      else ruleLength.classList.remove('valid');

      if (/\d/.test(val)) ruleNumber.classList.add('valid');
      else ruleNumber.classList.remove('valid');

      if (/[!@#$%^&*(),.?":{}|<>]/.test(val)) ruleSpecial.classList.add('valid');
      else ruleSpecial.classList.remove('valid');
    });
  }

  // Helper to handle Auth Success
  async function handleAuthSuccess(data) {
    // Save Token & User data
    localStorage.setItem('rescue_token', data.access_token);
    localStorage.setItem('rescue_user', JSON.stringify(data.user));

    // Automatically Migrate Guest Local Profile Data if exists
    const guestProfileRaw = localStorage.getItem('rescue_guest_profile');
    if (guestProfileRaw && data.user.email) {
      try {
        const guestProfile = JSON.parse(guestProfileRaw);
        await fetch(`${API_BASE}/auth/sync`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: data.user.email,
            local_profile: guestProfile
          })
        });
        localStorage.removeItem('rescue_guest_profile');
      } catch (err) {
        console.warn('Local profile sync deferred:', err);
      }
    }

    // Redirect to Profile Setup or Dashboard
    window.location.href = './profile-setup.html';
  }

  // Handle Sign In Submit
  if (signInForm) {
    signInForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      signinError.style.display = 'none';

      const email = document.getElementById('signin-email').value.trim();
      const password = document.getElementById('signin-password').value;

      try {
        const res = await fetch(`${API_BASE}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.detail || 'Sign in failed. Please check your credentials.');
        }

        handleAuthSuccess(data);
      } catch (err) {
        let msg = err.message;
        if (msg === 'Failed to fetch' || msg.includes('NetworkError') || msg.includes('fetch')) {
          msg = 'Unable to connect to RescueAI backend. Please ensure the backend server is running on http://127.0.0.1:8000.';
        }
        signinError.textContent = msg;
        signinError.style.display = 'block';
      }
    });
  }

  // Handle Create Account Submit
  if (signUpForm) {
    signUpForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      signupError.style.display = 'none';

      const fullName = document.getElementById('signup-name').value.trim();
      const email = document.getElementById('signup-email').value.trim();
      const password = document.getElementById('signup-password').value;
      const confirmPassword = document.getElementById('signup-confirm-password').value;

      if (password !== confirmPassword) {
        signupError.textContent = 'Passwords do not match.';
        signupError.style.display = 'block';
        return;
      }

      if (password.length < 6) {
        signupError.textContent = 'Password must be at least 6 characters long.';
        signupError.style.display = 'block';
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ full_name: fullName, email, password })
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.detail || 'Account creation failed.');
        }

        handleAuthSuccess(data);
      } catch (err) {
        let msg = err.message;
        if (msg === 'Failed to fetch' || msg.includes('NetworkError') || msg.includes('fetch')) {
          msg = 'Unable to connect to RescueAI backend. Please ensure the backend server is running on http://127.0.0.1:8000.';
        }
        signupError.textContent = msg;
        signupError.style.display = 'block';
      }
    });
  }

  // Handle Google Sign In
  if (btnGoogleSignin) {
    btnGoogleSignin.addEventListener('click', async () => {
      try {
        const res = await fetch(`${API_BASE}/auth/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'google_user@rescueai.org',
            full_name: 'Google User'
          })
        });
        const data = await res.json();
        handleAuthSuccess(data);
      } catch (err) {
        alert('Google Sign-In failed: ' + err.message);
      }
    });
  }
});
