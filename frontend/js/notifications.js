// ==========================================================================
// Notification Center JavaScript
// Renders category-based notification cards, handles filtering, mark-as-read,
// dismiss, clear-all, and the empty state. Data below is sample/demo data —
// wire `fetchNotifications()` up to your backend when ready.
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initIcons();

  let notifications = getSampleNotifications();
  let activeFilter = 'all';

  const listEl = document.getElementById('notif-list');
  const emptyStateEl = document.getElementById('notif-empty-state');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const markAllReadBtn = document.getElementById('mark-all-read-btn');
  const clearAllBtn = document.getElementById('clear-all-btn');

  render();
  initScrollReveal();

  /* ---------------- Sample Data ---------------- */
  function getSampleNotifications() {
    return [
      {
        id: 'n1',
        category: 'emergency',
        priority: 'critical',
        icon: '🚨',
        title: 'Emergency SOS Activated',
        desc: 'Your emergency SOS was triggered and nearby contacts have been alerted.',
        time: '2 min ago',
        actionText: 'View Details',
        unread: true
      },
      {
        id: 'n2',
        category: 'ai',
        priority: 'high',
        icon: '🤖',
        title: 'AI Recommendation',
        desc: 'Apply pressure to the wound immediately to control bleeding.',
        time: '5 min ago',
        actionText: 'Read Guidance',
        unread: true
      },
      {
        id: 'n3',
        category: 'disaster',
        priority: 'medium',
        icon: '🌍',
        title: 'Earthquake Safety Checklist Available',
        desc: 'A new preparedness checklist has been added to your offline guides.',
        time: '10 min ago',
        actionText: 'Open',
        unread: true
      },
      {
        id: 'n4',
        category: 'health',
        priority: 'medium',
        icon: '💊',
        title: 'Paracetamol Identified Successfully',
        desc: 'Dosage information and safety precautions are now available.',
        time: '15 min ago',
        actionText: 'View Report',
        unread: false
      },
      {
        id: 'n5',
        category: 'navigation',
        priority: 'low',
        icon: '📍',
        title: 'Offline Emergency Map Downloaded',
        desc: 'Your offline map is ready and includes nearby safe zones.',
        time: '20 min ago',
        actionText: 'Open Map',
        unread: false
      },
      {
        id: 'n6',
        category: 'emergency',
        priority: 'critical',
        icon: '🚨',
        title: 'Critical Safety Warning',
        desc: 'Severe weather detected in your area. Move to a safe location immediately.',
        time: '32 min ago',
        actionText: 'View Details',
        unread: false
      },
      {
        id: 'n7',
        category: 'ai',
        priority: 'medium',
        icon: '🤖',
        title: 'AI Emergency Assessment Completed',
        desc: 'Based on your inputs, a safety checklist and next steps are ready.',
        time: '1 hr ago',
        actionText: 'View Checklist',
        unread: false
      },
      {
        id: 'n8',
        category: 'disaster',
        priority: 'low',
        icon: '🌍',
        title: 'Flood Preparedness Tips',
        desc: 'New offline guidance on flood preparedness has been added.',
        time: '2 hr ago',
        actionText: 'Read More',
        unread: false
      },
      {
        id: 'n9',
        category: 'system',
        priority: 'low',
        icon: '⚙️',
        title: 'Application Updated Successfully',
        desc: 'RescueAI has been updated with new offline emergency modules.',
        time: '4 hr ago',
        actionText: 'See What\u2019s New',
        unread: false
      },
      {
        id: 'n10',
        category: 'general',
        priority: 'low',
        icon: '🔔',
        title: 'Language Updated',
        desc: 'Your interface language preference has been saved successfully.',
        time: '6 hr ago',
        actionText: 'Open Settings',
        unread: false
      },
      {
        id: 'n11',
        category: 'health',
        priority: 'high',
        icon: '💊',
        title: 'Emergency Medical Advice Available',
        desc: 'New guidance on medication interactions has been added for review.',
        time: 'Yesterday',
        actionText: 'View Advice',
        unread: false
      },
      {
        id: 'n12',
        category: 'navigation',
        priority: 'medium',
        icon: '📍',
        title: 'Nearby Safe Zone Identified',
        desc: 'A designated safe zone has been located 1.2 km from your position.',
        time: 'Yesterday',
        actionText: 'View on Map',
        unread: false
      },
      {
        id: 'n13',
        category: 'emergency',
        priority: 'high',
        icon: '🚨',
        title: 'Emergency Contact Successfully Notified',
        desc: 'Your primary emergency contact has confirmed receipt of your alert.',
        time: 'Yesterday',
        actionText: 'View Details',
        unread: false
      },
      {
        id: 'n14',
        category: 'disaster',
        priority: 'medium',
        icon: '🌍',
        title: 'Cyclone Preparedness Guide',
        desc: 'A new offline guide covering before, during, and after a cyclone is ready.',
        time: '2 days ago',
        actionText: 'Open Guide',
        unread: false
      },
      {
        id: 'n15',
        category: 'ai',
        priority: 'low',
        icon: '🤖',
        title: 'Next Steps Suggested',
        desc: 'The AI Assistant has suggested follow-up actions for your recent report.',
        time: '2 days ago',
        actionText: 'View Suggestions',
        unread: false
      },
      {
        id: 'n16',
        category: 'system',
        priority: 'low',
        icon: '⚙️',
        title: 'New Emergency Module Added',
        desc: 'A new offline module for heatwave safety is now available.',
        time: '3 days ago',
        actionText: 'Explore Module',
        unread: false
      },
      {
        id: 'n17',
        category: 'general',
        priority: 'low',
        icon: '🔔',
        title: 'Settings Saved Successfully',
        desc: 'Your recent changes to notification preferences have been saved.',
        time: '3 days ago',
        actionText: 'Open Settings',
        unread: false
      }
    ];
  }

  const categoryMeta = {
    emergency: { label: 'Emergency' },
    ai: { label: 'AI Guidance' },
    disaster: { label: 'Disaster Alerts' },
    health: { label: 'Health' },
    navigation: { label: 'Navigation' },
    system: { label: 'System' },
    general: { label: 'General' }
  };

  /* ---------------- Rendering ---------------- */
  function render() {
    if (!listEl) return;

    const visible = activeFilter === 'all'
      ? notifications
      : notifications.filter((n) => n.category === activeFilter);

    listEl.innerHTML = '';

    if (visible.length === 0) {
      listEl.style.display = 'none';
      if (emptyStateEl) emptyStateEl.style.display = 'block';
      initIcons();
      return;
    }

    listEl.style.display = 'flex';
    if (emptyStateEl) emptyStateEl.style.display = 'none';

    visible.forEach((n) => {
      listEl.appendChild(buildCard(n));
    });

    initIcons();
  }

  function buildCard(n) {
    const card = document.createElement('div');
    card.className = `notif-card priority-${n.priority}${n.unread ? ' unread' : ''}`;
    card.dataset.id = n.id;

    const meta = categoryMeta[n.category] || { label: 'General' };

    card.innerHTML = `
      <div class="notif-icon cat-${n.category}">${n.icon}</div>
      <div class="notif-body">
        <div class="notif-top-row">
          <span class="notif-category-label">${meta.label}</span>
          <span class="priority-pill priority-${n.priority}">${capitalize(n.priority)}</span>
        </div>
        <h4 class="notif-card-title">${escapeHtml(n.title)}</h4>
        <p class="notif-card-desc">${escapeHtml(n.desc)}</p>
        <div class="notif-bottom-row">
          <span class="notif-time"><i data-lucide="clock"></i>${escapeHtml(n.time)}</span>
          <button class="notif-action-link" data-id="${n.id}">
            <span>${escapeHtml(n.actionText)}</span>
            <i data-lucide="arrow-right"></i>
          </button>
        </div>
      </div>
      <button class="notif-dismiss-btn" title="Dismiss" data-id="${n.id}">
        <i data-lucide="x"></i>
      </button>
    `;

    // Clicking the card (outside the action/dismiss buttons) marks it read
    card.addEventListener('click', (e) => {
      if (e.target.closest('.notif-dismiss-btn') || e.target.closest('.notif-action-link')) return;
      markAsRead(n.id);
    });

    card.querySelector('.notif-action-link').addEventListener('click', () => {
      markAsRead(n.id);
      // Hook up real navigation per category here, e.g.:
      // window.location.href = `../pages/${n.category}.html`;
    });

    card.querySelector('.notif-dismiss-btn').addEventListener('click', () => {
      dismiss(n.id);
    });

    return card;
  }

  /* ---------------- Actions ---------------- */
  function markAsRead(id) {
    const n = notifications.find((item) => item.id === id);
    if (n && n.unread) {
      n.unread = false;
      render();
    }
  }

  function dismiss(id) {
    notifications = notifications.filter((item) => item.id !== id);
    render();
  }

  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', () => {
      notifications.forEach((n) => { n.unread = false; });
      render();
    });
  }

  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      notifications = [];
      render();
    });
  }

  /* ---------------- Filtering ---------------- */
  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      activeFilter = tab.getAttribute('data-filter');
      render();
    });
  });

  /* ---------------- Helpers ---------------- */
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function escapeHtml(unsafe) {
    return String(unsafe)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});

function initIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

function initScrollReveal() {
  const targets = document.querySelectorAll('.scroll-fade');
  if (!('IntersectionObserver' in window) || targets.length === 0) {
    targets.forEach((el) => el.classList.add('in-view'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  targets.forEach((el) => observer.observe(el));
}
