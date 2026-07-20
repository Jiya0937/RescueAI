// chatbot.js - RescueAI Desktop-First Chatbot & API Integration

document.addEventListener('DOMContentLoaded', () => {
  const isDesktopChat = document.body.classList.contains('desktop-chat-layout') || window.location.pathname.includes('chatbot.html');

  if (!isDesktopChat) {
    // 1. NON-DESKTOP CHAT PAGE: Render floating button that redirects to chatbot.html when clicked
    injectFloatingButton();
    return;
  }

  // 2. DESKTOP CHAT PAGE: Initialize full-screen assistant
  initDesktopAssistant();
});

/* ==========================================================================
   A. Floating Button (For Non-Assistant Pages)
   ========================================================================== */
function injectFloatingButton() {
  if (document.getElementById('chatbot-trigger')) return;

  const trigger = document.createElement('button');
  trigger.id = 'chatbot-trigger';
  trigger.className = 'chatbot-trigger';
  trigger.innerHTML = `
    <i data-lucide="bot" style="width: 22px; height: 22px;"></i>
    <span data-i18n="ai_assistant_btn">AI Assistant</span>
  `;

  // Determine path structure (check if we are in /pages/ or / root)
  const isInsidePages = window.location.pathname.includes('/pages/');
  const targetUrl = isInsidePages ? 'chatbot.html' : 'pages/chatbot.html';

  trigger.addEventListener('click', () => {
    window.location.href = targetUrl;
  });

  document.body.appendChild(trigger);

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

/* ==========================================================================
   B. Desktop Assistant Page Workspace
   ========================================================================== */
function initDesktopAssistant() {
  // Elements
  const chatConversation = document.getElementById('chat-conversation');
  const chatWelcomeContainer = document.getElementById('chat-welcome-container');
  const chatInputField = document.getElementById('chat-input-field');
  const btnSendMsg = document.getElementById('btn-send-msg');
  const btnMic = document.getElementById('btn-mic');
  const btnAttach = document.getElementById('btn-attach');
  const btnCamera = document.getElementById('btn-camera');
  const btnQuickSos = document.getElementById('btn-quick-sos');
  const mediaFileInput = document.getElementById('media-file-input');
  const cameraFileInput = document.getElementById('camera-file-input');
  
  // Voice Overlay Elements
  const voiceOverlay = document.getElementById('voice-overlay-container');
  const btnCloseVoice = document.getElementById('btn-close-voice');
  const voiceStateText = document.getElementById('voice-state-text');
  const voiceSubText = document.getElementById('voice-sub-text');
  const speakingWaveform = document.getElementById('speaking-waveform-visualizer');
  
  // State
  let currentLang = localStorage.getItem('rescue_lang') || 'en';
  let hasChatStarted = false;
  let activeAudio = null;
  
  // Local emergency responses for offline resilience fallback
  const localRescueGuides = {
    en: {
      cpr: "<strong>CPR Guide:</strong><br>1. Confirm environment safety.<br>2. Tap shoulder to check response.<br>3. Call emergency line (112).<br>4. Begin chest compressions: push hard & fast in the center of the chest (100-120 beats/min).",
      snake: "<strong>Snake Bite First Aid:</strong><br>1. Stay calm & move away from the snake.<br>2. Immobilize the bitten limb below the heart.<br>3. Wash with clean water. Do NOT cut the skin or suck venom.<br>4. Reach hospital immediately.",
      burns: "<strong>Burns Treatment:</strong><br>1. Run cool water over the burn for 10-20 minutes.<br>2. Remove tight items gently.<br>3. Cover with sterile wrap. Do NOT use ice, butter, or oil.",
      heart: "<strong>Heart Attack Alert:</strong><br>1. Keep the person sitting down & calm.<br>2. Loosen tight clothing.<br>3. Give 300mg Aspirin if they can swallow and aren't allergic.<br>4. Prepare CPR if they become unresponsive. Call 112 immediately.",
      bleeding: "<strong>Bleeding Control:</strong><br>1. Apply firm, direct pressure with clean cloth.<br>2. Elevate the wound above heart level.<br>3. Secure with clean bandage. Do NOT remove soaked cloth.",
      poisoning: "<strong>Poisoning First Aid:</strong><br>1. Call emergency support immediately.<br>2. Move to fresh air if gas inhaled.<br>3. If on skin, flush with water for 15 minutes.<br>4. Do NOT induce vomiting."
    },
    hi: {
      cpr: "<strong>सीपीआर निर्देश:</strong><br>1. पहले सुनिश्चित करें कि स्थान सुरक्षित है।<br>2. पीड़ित के कंधे थपथपाकर उसकी प्रतिक्रिया जांचें।<br>3. आपातकालीन नंबर 112 पर कॉल करें।<br>4. छाती के केंद्र में ज़ोर से और तेज़ी से दबाएं (100-120 प्रति मिनट)।",
      snake: "<strong>सांप के काटने पर प्राथमिक उपचार:</strong><br>1. शांत रहें और सांप के हमले की दूरी से दूर रहें।<br>2. काटे हुए अंग को हृदय के स्तर से नीचे स्थिर रखें।<br>3. घाव को साफ पानी से धोएं। कट न लगाएं या जहर चूसने का प्रयास न करें।",
      burns: "<strong>जलने का उपचार:</strong><br>1. घाव पर 10-20 मिनट के लिए ठंडा पानी डालें।<br>2. तंग कपड़े या गहने निकालें।<br>3. साफ पट्टी से ढकें। बर्फ या तेल का उपयोग न करें।",
      heart: "<strong>दिल का दौरा:</strong><br>1. रोगी को सीधे शांत बैठने दें।<br>2. कपड़ों को ढीला करें।<br>3. यदि रोगी को एलर्जी न हो, तो एस्पिरिन (300mg) चबाने को कहें।<br>4. तुरंत आपातकालीन संपर्क 112 पर कॉल करें।",
      bleeding: "<strong>रक्तस्राव नियंत्रण:</strong><br>1. साफ कपड़े से सीधे घाव पर मजबूत दबाव डालें।<br>2. घायल अंग को दिल के स्तर से ऊपर उठाएं।<br>3. पट्टी बांधें, खून से भीगे कपड़े को न हटाएं।"
    },
    mr: {
      cpr: "<strong>सीपीआर मार्गदर्शक:</strong><br>1. आजूबाजूचा परिसर सुरक्षित असल्याची खात्री करा.<br>2. प्रतिसाद तपासण्यासाठी खांद्यावर थाप द्या.<br>3. आपत्कालीन क्रमांक ११२ ला कॉल करा.<br>4. छातीवर जोरात व वेगाने दाब द्या (१००-१२० प्रति मिनिट).",
      snake: "<strong>सर्पदंश प्रथमोपचार:</strong><br>1. शांत राहा आणि सापापासून दूर जा.<br>2. जखमी अवयव हृदयाच्या पातळी खाली हलणार नाही असा ठेवा.<br>3. स्वच्छ पाण्याने धुवा. जखम कापू नका किंवा विष तोंडातून ओढू नका.",
      burns: "<strong>भाजल्यावरील उपचार:</strong><br>1. वाहत्या थंड पाण्याखाली १०-२० मिनिटे ठेवा.<br>2. घट्ट दागिने किंवा कपडे अलगद काढा.<br>3. जंतुविरहित कापडाने झाका. बर्फ लावू नका."
    }
  };

  // Inject Custom Translations
  const assistantTranslations = {
    en: {
      sidebar_logo_title: "RescueAI",
      sidebar_logo_subtitle: "Offline Emergency Assistant",
      menu_assistant: "AI Assistant",
      menu_dashboard: "Dashboard",
      menu_medical: "Medical Emergency",
      menu_disaster: "Disaster Safety",
      menu_hospitals: "Hospital Finder",
      menu_contacts: "Emergency Contacts",
      menu_maps: "Offline Maps",
      menu_settings: "Settings",
      sidebar_version: "RescueAI v1.0.0",
      sidebar_status: "All Systems Ready",
      topbar_title: "RescueAI Intelligence",
      topbar_subtitle: "Offline Emergency AI Assistant",
      topbar_badge: "🟢 Offline Mode",
      capabilities_title: "AI Capabilities (All Offline)",
      quick_questions_title: "Example Questions",
      quick_access_title: "Emergency Quick Access",
      qa_call: "Call 112",
      qa_hospitals: "Find Hospital",
      qa_guides: "First Aid Guides"
    },
    hi: {
      sidebar_logo_title: "रस्क्यूएआई",
      sidebar_logo_subtitle: "ऑफलाइन आपातकालीन सहायक",
      menu_assistant: "एआई सहायक",
      menu_dashboard: "डैशबोर्ड",
      menu_medical: "चिकित्सा आपातकाल",
      menu_disaster: "आपदा सुरक्षा",
      menu_hospitals: "अस्पताल खोजें",
      menu_contacts: "आपातकालीन संपर्क",
      menu_maps: "ऑफलाइन नक्शे",
      menu_settings: "सेटिंग्स",
      sidebar_version: "रस्क्यूएआई v1.0.0",
      sidebar_status: "सभी प्रणालियां तैयार हैं",
      topbar_title: "रस्क्यूएआई इंटेलिजेंस",
      topbar_subtitle: "ऑफलाइन आपातकालीन एआई सहायक",
      topbar_badge: "🟢 ऑफलाइन मोड",
      capabilities_title: "एआई क्षमताएं (सभी ऑफलाइन)",
      quick_questions_title: "उदाहरण प्रश्न",
      quick_access_title: "आपातकालीन त्वरित पहुंच",
      qa_call: "कॉल 112",
      qa_hospitals: "अस्पताल खोजें",
      qa_guides: "प्राथमिक चिकित्सा गाइड"
    },
    mr: {
      sidebar_logo_title: "रस्क्यूएआई",
      sidebar_logo_subtitle: "ऑफलाईन आपत्कालीन सहाय्यक",
      menu_assistant: "एआय सहाय्यक",
      menu_dashboard: "डॅशबोर्ड",
      menu_medical: "वैद्यकीय आणीबाणी",
      menu_disaster: "आपत्ती सुरक्षा",
      menu_hospitals: "रुग्णालय शोधा",
      menu_contacts: "आपत्कालीन संपर्क",
      menu_maps: "ऑफलाईन नकाशे",
      menu_settings: "सेटिंग्ज",
      sidebar_version: "रस्क्यूएआई v1.0.0",
      sidebar_status: "सर्व प्रणाल्या सज्ज आहेत",
      topbar_title: "रस्क्यूएआई इंटेलिजन्स",
      topbar_subtitle: "ऑफलाईन आपत्कालीन एआय सहाय्यक",
      topbar_badge: "🟢 ऑफलाईन मोड",
      capabilities_title: "एआय क्षमता (सर्व ऑफलाईन)",
      quick_questions_title: "उदाहरण प्रश्न",
      quick_access_title: "आपत्कालीन जलद प्रवेश",
      qa_call: "कॉल ११२",
      qa_hospitals: "रुग्णालय शोधा",
      qa_guides: "प्रथमोपचार मार्गदर्शक"
    }
  };

  if (window.RescueTranslations && window.RescueTranslations.data) {
    for (const lang in assistantTranslations) {
      if (window.RescueTranslations.data[lang]) {
        Object.assign(window.RescueTranslations.data[lang], assistantTranslations[lang]);
      }
    }
    window.RescueTranslations.apply(currentLang);
  }

  // Handle Chat Init Animation
  function startChatWorkspace() {
    if (hasChatStarted) return;
    hasChatStarted = true;

    if (chatWelcomeContainer) {
      chatWelcomeContainer.style.opacity = '0';
      chatWelcomeContainer.style.transition = 'opacity 0.25s ease';
      setTimeout(() => {
        chatWelcomeContainer.style.display = 'none';
      }, 250);
    }
  }

  // Append user message bubble to view
  function appendUserMessage(text) {
    startChatWorkspace();
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble user-msg';
    bubble.innerHTML = `
      <div class="message-avatar">
        <i data-lucide="user" style="width: 18px; height: 18px;"></i>
      </div>
      <div class="message-content">
        <p>${escapeHtml(text)}</p>
        <span class="message-time">${timeString}</span>
      </div>
    `;
    chatConversation.appendChild(bubble);
    chatConversation.scrollTop = chatConversation.scrollHeight;
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  // Append AI message card (handles lists, warnings, audio players, etc.)
  function appendBotMessage(htmlContent, rawText = "") {
    startChatWorkspace();
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    
    // Add unique ID to reference audio playback control if applicable
    const speechId = 'speech-' + Math.random().toString(36).substring(2, 9);
    
    // Create text snippet clean from html tags to feed TTS
    const speechText = rawText || htmlContent.replace(/<[^>]*>/g, '').trim();

    bubble.innerHTML = `
      <div class="message-avatar">
        <i data-lucide="bot" style="width: 18px; height: 18px;"></i>
      </div>
      <div class="message-content">
        <div>${htmlContent}</div>
        
        <!-- Audio TTS Controls -->
        <div class="voice-response-controls">
          <button class="btn-voice-control" id="play-${speechId}" title="Listen to instruction">
            <i data-lucide="volume-2" style="width: 16px; height: 16px;"></i>
          </button>
          <div class="voice-wave-min" id="wave-${speechId}">
            <span></span><span></span><span></span><span></span>
          </div>
        </div>
        <span class="message-time">${timeString}</span>
      </div>
    `;
    
    chatConversation.appendChild(bubble);
    chatConversation.scrollTop = chatConversation.scrollHeight;
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Bind TTS Button Click
    const playBtn = document.getElementById(`play-${speechId}`);
    const waveVisual = document.getElementById(`wave-${speechId}`);
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        playSpeechAudio(speechText, playBtn, waveVisual);
      });
    }
  }

  // Play audio from TTS route
  async function playSpeechAudio(text, buttonEl, waveEl) {
    if (activeAudio) {
      activeAudio.pause();
      activeAudio = null;
      document.querySelectorAll('.voice-wave-min').forEach(w => w.classList.remove('speaking'));
      document.querySelectorAll('.btn-voice-control i').forEach(i => {
        if (typeof lucide !== 'undefined') {
          buttonEl.innerHTML = `<i data-lucide="volume-2" style="width:16px; height:16px;"></i>`;
          lucide.createIcons();
        }
      });
      return;
    }

    try {
      buttonEl.innerHTML = `<span class="step-marker spinner" style="width:14px; height:14px;"></span>`;
      
      const response = await fetch('http://localhost:8000/api/tts/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text })
      });

      if (!response.ok) throw new Error("TTS failed");
      
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      activeAudio = new Audio(audioUrl);
      waveEl.classList.add('speaking');
      
      buttonEl.innerHTML = `<i data-lucide="square" style="width:14px; height:14px; color:var(--color-emergency);"></i>`;
      if (typeof lucide !== 'undefined') lucide.createIcons();

      activeAudio.play();

      activeAudio.onended = () => {
        waveEl.classList.remove('speaking');
        buttonEl.innerHTML = `<i data-lucide="volume-2" style="width: 16px; height: 16px;"></i>`;
        if (typeof lucide !== 'undefined') lucide.createIcons();
        activeAudio = null;
      };
    } catch (e) {
      console.warn("TTS fallback: API failed", e);
      buttonEl.innerHTML = `<i data-lucide="volume-x" style="width: 16px; height: 16px; color:var(--color-emergency);"></i>`;
      if (typeof lucide !== 'undefined') lucide.createIcons();
      setTimeout(() => {
        buttonEl.innerHTML = `<i data-lucide="volume-2" style="width: 16px; height: 16px;"></i>`;
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }, 2000);
    }
  }

  // Renders a loading bubble
  function showChatTypingIndicator() {
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble typing-indicator-wrapper';
    bubble.innerHTML = `
      <div class="message-avatar">
        <i data-lucide="bot" style="width: 18px; height: 18px;"></i>
      </div>
      <div class="message-content" style="background:transparent; border:none; box-shadow:none;">
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
    `;
    chatConversation.appendChild(bubble);
    chatConversation.scrollTop = chatConversation.scrollHeight;
    return bubble;
  }

  // Query Chat API endpoint
  async function queryChatbot(queryText) {
    const loader = showChatTypingIndicator();

    try {
      const response = await fetch('http://localhost:8000/api/chatbot/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: queryText, language: currentLang })
      });

      if (loader) loader.remove();

      if (!response.ok) {
        throw new Error("Chat api failed");
      }

      const data = await response.json();
      renderChatbotResponse(data.response);
    } catch (e) {
      console.warn("Chatbot local fallback triggered:", e);
      if (loader) loader.remove();
      queryLocalFallback(queryText);
    }
  }

  // Parse response strings and add custom warnings + templates dynamically
  function renderChatbotResponse(responseContent) {
    let formattedText = responseContent
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Scan for emergency tags and inject custom urgent alerts
    const lower = responseContent.toLowerCase();
    const isHeartAttack = lower.includes('heart attack') || lower.includes('दिल का दौरा') || lower.includes('हृदयविकार');
    const isCpr = lower.includes('cpr') || lower.includes('सीपीआर');
    const isSnakeBite = lower.includes('snake') || lower.includes('सांप') || lower.includes('साप');
    const isBleeding = lower.includes('bleed') || lower.includes('रक्त') || lower.includes('खून');
    const isBurns = lower.includes('burn') || lower.includes('जल') || lower.includes('भाज');

    let emergencyAlertHtml = "";

    if (isHeartAttack) {
      emergencyAlertHtml = `
        <div class="emergency-alert-card">
          <div class="alert-icon-wrapper"><i data-lucide="activity"></i></div>
          <div class="alert-text-content">
            <h4 class="alert-card-title">⚠️ Possible Heart Attack Emergency</h4>
            <p class="alert-card-desc">Call emergency response line immediately. Give Aspirin if conscious and not allergic.</p>
            <div class="alert-actions-grid">
              <a href="tel:112" class="btn-alert-action"><i data-lucide="phone"></i> Call 112</a>
              <a href="medical.html" class="btn-alert-action secondary-action">Open Guide</a>
            </div>
          </div>
        </div>
      `;
    } else if (isCpr) {
      emergencyAlertHtml = `
        <div class="emergency-alert-card">
          <div class="alert-icon-wrapper"><i data-lucide="heart"></i></div>
          <div class="alert-text-content">
            <h4 class="alert-card-title">❤️ CPR Guide Checklist</h4>
            <p class="alert-card-desc">If person is unresponsive, start hands-only CPR immediately.</p>
            <div class="alert-actions-grid">
              <a href="medical.html" class="btn-alert-action"><i data-lucide="book-open"></i> CPR Steps</a>
              <a href="maps.html" class="btn-alert-action secondary-action">Find Hospital</a>
            </div>
          </div>
        </div>
      `;
    } else if (isSnakeBite) {
      emergencyAlertHtml = `
        <div class="emergency-alert-card">
          <div class="alert-icon-wrapper"><i data-lucide="shield-alert"></i></div>
          <div class="alert-text-content">
            <h4 class="alert-card-title">🐍 Snake Bite First Aid</h4>
            <p class="alert-card-desc">Keep patient calm. Immobilize bitten limb below heart level. Seek hospital instantly.</p>
            <div class="alert-actions-grid">
              <a href="medical.html" class="btn-alert-action">Open Snake Guide</a>
              <a href="maps.html" class="btn-alert-action secondary-action">Nearest Anti-Venom</a>
            </div>
          </div>
        </div>
      `;
    }

    appendBotMessage(`${emergencyAlertHtml}<div class="bot-text-paragraph">${formattedText}</div>`, responseContent);
  }

  // Local fallback response generator for offline execution resilience
  function queryLocalFallback(query) {
    const langGuides = localRescueGuides[currentLang] || localRescueGuides['en'];
    const lowerQuery = query.toLowerCase();

    let guideText = "";
    if (lowerQuery.includes('cpr') || lowerQuery.includes('सीपीआर')) {
      guideText = langGuides.cpr;
    } else if (lowerQuery.includes('snake') || lowerQuery.includes('सांप') || lowerQuery.includes('साप')) {
      guideText = langGuides.snake;
    } else if (lowerQuery.includes('burn') || lowerQuery.includes('जल') || lowerQuery.includes('भाज')) {
      guideText = langGuides.burns;
    } else if (lowerQuery.includes('heart') || lowerQuery.includes('दिल') || lowerQuery.includes('हृदय')) {
      guideText = langGuides.heart;
    } else if (lowerQuery.includes('bleed') || lowerQuery.includes('रक्त') || lowerQuery.includes('खून')) {
      guideText = langGuides.bleeding;
    } else if (lowerQuery.includes('poison') || lowerQuery.includes('विष') || lowerQuery.includes('विषा')) {
      guideText = langGuides.poisoning;
    } else {
      guideText = currentLang === 'hi' 
        ? "आपातकालीन निर्देशों के लिए कृपया साइडबार से चिकित्सा आपातकाल या आपदा सुरक्षा पर जाएं।" 
        : "For offline safety instructions, please check the Medical Emergency or Disaster Safety panels from the sidebar menu.";
    }

    appendBotMessage(guideText);
  }

  // Send Action Trigger
  function handleSendMessage() {
    const text = chatInputField.value.trim();
    if (!text) return;
    appendUserMessage(text);
    chatInputField.value = '';
    queryChatbot(text);
  }

  if (btnSendMsg && chatInputField) {
    btnSendMsg.addEventListener('click', handleSendMessage);
    chatInputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSendMessage();
    });
  }

  // Seed question triggers
  document.querySelectorAll('.welcome-chip, .question-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.getAttribute('data-query');
      if (q) {
        appendUserMessage(q);
        queryChatbot(q);
      }
    });
  });

  /* ==========================================================================
     C. Intelligent Media upload flow (OCR / Object Detection)
     ========================================================================== */
  function openFileChooser(inputEl) {
    if (inputEl) inputEl.click();
  }

  if (btnAttach) btnAttach.addEventListener('click', () => openFileChooser(mediaFileInput));
  if (btnCamera) btnCamera.addEventListener('click', () => openFileChooser(cameraFileInput));

  if (mediaFileInput) mediaFileInput.addEventListener('change', (e) => handleImageUpload(e.target.files[0]));
  if (cameraFileInput) cameraFileInput.addEventListener('change', (e) => handleImageUpload(e.target.files[0]));

  async function handleImageUpload(file) {
    if (!file) return;

    startChatWorkspace();
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const imgUrl = URL.createObjectURL(file);

    // 1. Render uploading card in User Stream
    const userBubble = document.createElement('div');
    userBubble.className = 'message-bubble user-msg';
    userBubble.innerHTML = `
      <div class="message-avatar"><i data-lucide="user" style="width:18px; height:18px;"></i></div>
      <div class="message-content">
        <img src="${imgUrl}" style="max-width:200px; border-radius:12px; border:1px solid rgba(255,255,255,0.2);" />
        <span class="message-time">${timeString}</span>
      </div>
    `;
    chatConversation.appendChild(userBubble);
    chatConversation.scrollTop = chatConversation.scrollHeight;
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // 2. Render Check-progress Card in Bot Stream
    const progressCard = document.createElement('div');
    progressCard.className = 'message-bubble';
    
    // Unique ID to update steps dynamically
    const procId = 'proc-' + Math.random().toString(36).substring(2, 9);
    progressCard.innerHTML = `
      <div class="message-avatar"><i data-lucide="bot" style="width:18px; height:18px;"></i></div>
      <div class="message-content" style="max-width: 480px; width: 100%;">
        <div class="upload-processing-card">
          <img src="${imgUrl}" class="processing-thumb" />
          <div class="processing-steps-list">
            <div class="processing-step-item active" id="${procId}-step-1">
              <span class="step-marker spinner" id="${procId}-mark-1"></span>
              <span data-i18n="p_upload">Uploading Image...</span>
            </div>
            <div class="processing-step-item" id="${procId}-step-2">
              <span class="step-marker" id="${procId}-mark-2">•</span>
              <span data-i18n="p_detect">Detecting Objects...</span>
            </div>
            <div class="processing-step-item" id="${procId}-step-3">
              <span class="step-marker" id="${procId}-mark-3">•</span>
              <span data-i18n="p_read">Reading Text (OCR)...</span>
            </div>
            <div class="processing-step-item" id="${procId}-step-4">
              <span class="step-marker" id="${procId}-mark-4">•</span>
              <span data-i18n="p_think">Analyzing & Thinking...</span>
            </div>
          </div>
        </div>
        <span class="message-time">${timeString}</span>
      </div>
    `;
    chatConversation.appendChild(progressCard);
    chatConversation.scrollTop = chatConversation.scrollHeight;

    // Helper functions to update loading UI
    const setStepComplete = (stepNum) => {
      const step = document.getElementById(`${procId}-step-${stepNum}`);
      const mark = document.getElementById(`${procId}-mark-${stepNum}`);
      if (step && mark) {
        step.classList.remove('active');
        step.classList.add('complete');
        mark.className = 'step-marker';
        mark.innerHTML = '✓';
      }
    };
    const setStepActive = (stepNum) => {
      const step = document.getElementById(`${procId}-step-${stepNum}`);
      const mark = document.getElementById(`${procId}-mark-${stepNum}`);
      if (step && mark) {
        step.classList.add('active');
        mark.className = 'step-marker spinner';
        mark.innerHTML = '';
      }
    };

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Step 1: Upload
      await new Promise(r => setTimeout(r, 600));
      setStepComplete(1);
      setStepActive(2);

      // Step 2: Object Detection API
      let detectedObjects = [];
      try {
        const detResponse = await fetch('http://localhost:8000/api/vision/', {
          method: 'POST',
          body: formData
        });
        if (detResponse.ok) {
          const detData = await detResponse.json();
          detectedObjects = detData.objects || [];
        }
      } catch (err) {
        console.warn("Vision API failed, skipping detection", err);
      }
      setStepComplete(2);
      setStepActive(3);

      // Step 3: OCR API
      let extractedText = "";
      try {
        const ocrResponse = await fetch('http://localhost:8000/api/ocr/', {
          method: 'POST',
          body: formData
        });
        if (ocrResponse.ok) {
          const ocrData = await ocrResponse.json();
          extractedText = ocrData.text || "";
        }
      } catch (err) {
        console.warn("OCR API failed, skipping text extraction", err);
      }
      setStepComplete(3);
      setStepActive(4);

      // Step 4: LLM Chatbot Context formulation
      let modelContext = `User uploaded an image. `;
      if (detectedObjects.length > 0) {
        modelContext += `Detected objects: ${detectedObjects.join(', ')}. `;
      }
      if (extractedText.trim().length > 0) {
        modelContext += `Extracted OCR Text from image: "${extractedText.trim()}". `;
      }
      modelContext += `Identify the items/situation in the image and provide critical emergency instructions.`;

      let chatbotResponse = "";
      try {
        const chatResponse = await fetch('http://localhost:8000/api/chatbot/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: modelContext, language: currentLang })
        });
        if (chatResponse.ok) {
          const chatData = await chatResponse.json();
          chatbotResponse = chatData.response;
        }
      } catch (err) {
        console.warn("Chatbot API failed, utilizing local replies for image");
        // Fallback analysis based on tags
        const combined = (detectedObjects.join(' ') + ' ' + extractedText).toLowerCase();
        if (combined.includes('aspirin') || combined.includes('medicine') || combined.includes('tablet')) {
          chatbotResponse = "This appears to be medicine. **Aspirin** is recommended for heart attacks (300mg), but do not give to patients with allergy/bleeding disorders. Seek professional medical evaluation before taking offline drugs.";
        } else if (combined.includes('snake') || combined.includes('cobra') || combined.includes('viper')) {
          chatbotResponse = "Identified **Venomous Snake**. Move away immediately. Seek medical anti-venom treatment. Keep patient calm, limb below heart level. Do not cut or suck.";
        } else {
          chatbotResponse = "Image uploaded successfully. Extracted text: \"" + extractedText + "\". Please seek immediate professional guidance for emergency evaluation.";
        }
      }

      setStepComplete(4);
      progressCard.remove(); // remove tracker card and show the real bot result card

      // Render response card with image meta info
      let metaPanel = `<div style="font-size:0.8rem; background-color:var(--bg-primary); border-radius:10px; padding:10px; margin-bottom:12px; border:1px solid var(--border-color);">`;
      if (detectedObjects.length > 0) {
        metaPanel += `👁️ <strong>Detected Objects:</strong> ${detectedObjects.join(', ')}<br>`;
      }
      if (extractedText.trim().length > 0) {
        metaPanel += `📄 <strong>Extracted Text:</strong> "${extractedText.trim()}"`;
      }
      metaPanel += `</div>`;

      let formattedText = chatbotResponse
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

      appendBotMessage(`${metaPanel}<div class="bot-text-paragraph">${formattedText}</div>`, chatbotResponse);
    } catch (e) {
      console.error(e);
      setStepComplete(4);
      progressCard.remove();
      appendBotMessage("An error occurred during local image analysis. Please try again.");
    }
  }

  // Quick SOS Action (lightning button)
  if (btnQuickSos) {
    btnQuickSos.addEventListener('click', () => {
      appendUserMessage("EMERGENCY HELP");
      queryChatbot("EMERGENCY HELP: Requesting immediate offline guide overview.");
    });
  }

  /* ==========================================================================
     D. Voice Mode Overlay (STT & TTS Dialogs)
     ========================================================================== */
  let voiceRecorder = null;
  let voiceChunks = [];
  let isRecording = false;

  if (btnMic) {
    btnMic.addEventListener('click', (e) => {
      e.preventDefault();
      openVoiceOverlay();
    });
  }

  if (btnCloseVoice) {
    btnCloseVoice.addEventListener('click', (e) => {
      e.preventDefault();
      closeVoiceOverlay();
    });
  }

  function openVoiceOverlay() {
    voiceOverlay.style.display = 'flex';
    voiceStateText.textContent = "Connecting microphone...";
    speakingWaveform.style.display = 'none';
    startVoiceRecording();
  }

  function closeVoiceOverlay() {
    stopVoiceRecording(true); // abort recording
    voiceOverlay.style.display = 'none';
    if (activeAudio) {
      activeAudio.pause();
      activeAudio = null;
    }
  }

  // Simple script to convert float PCM audio buffer into standard 16-bit PCM WAV Blob
  function encodeWav(samples, sampleRate) {
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);

    /* RIFF identifier */
    writeString(view, 0, 'RIFF');
    /* file length */
    view.setUint32(4, 36 + samples.length * 2, true);
    /* RIFF type */
    writeString(view, 8, 'WAVE');
    /* format chunk identifier */
    writeString(view, 12, 'fmt ');
    /* format chunk length */
    view.setUint32(16, 16, true);
    /* sample format (raw PCM) */
    view.setUint16(20, 1, true);
    /* channel count (mono) */
    view.setUint16(22, 1, true);
    /* sample rate */
    view.setUint32(24, sampleRate, true);
    /* byte rate (sample rate * block align) */
    view.setUint32(28, sampleRate * 2, true);
    /* block align (channel count * bytes per sample) */
    view.setUint16(32, 2, true);
    /* bits per sample */
    view.setUint16(34, 16, true);
    /* data chunk identifier */
    writeString(view, 36, 'data');
    /* data chunk length */
    view.setUint32(40, samples.length * 2, true);

    // Write PCM audio samples
    let offset = 44;
    for (let i = 0; i < samples.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, samples[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }

    return new Blob([view], { type: 'audio/wav' });
  }

  function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  let audioContext = null;
  let mediaStream = null;
  let processorNode = null;
  let recordedSamples = [];

  async function startVoiceRecording() {
    if (isRecording) return;
    isRecording = true;
    recordedSamples = [];

    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, sampleRate: 16000 } });
      
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioCtx({ sampleRate: 16000 });
      const sourceNode = audioContext.createMediaStreamSource(mediaStream);
      
      processorNode = audioContext.createScriptProcessor(4096, 1, 1);
      
      processorNode.onaudioprocess = (e) => {
        if (!isRecording) return;
        const inputData = e.inputBuffer.getChannelData(0);
        for (let i = 0; i < inputData.length; i++) {
          recordedSamples.push(inputData[i]);
        }
      };

      sourceNode.connect(processorNode);
      processorNode.connect(audioContext.destination);

      voiceStateText.textContent = "Listening...";
      voiceSubText.textContent = "Speak now. Tap Close or click screen to finish.";

      // Clicking overlay main screen stops recording and triggers process
      voiceOverlay.onclick = (e) => {
        if (e.target === voiceOverlay || e.target.classList.contains('voice-status-box') || e.target.closest('.voice-shield-wrapper')) {
          e.stopPropagation();
          stopVoiceRecording(false);
        }
      };

    } catch (err) {
      console.warn("Microphone access denied or failed, running simulation fallback", err);
      // Run fallback simulation
      voiceStateText.textContent = "Listening (Simulated)...";
      setTimeout(() => {
        if (isRecording) {
          stopVoiceRecording(false, true); // trigger mock voice query
        }
      }, 3000);
    }
  }

  async function stopVoiceRecording(abort = false, runSim = false) {
    if (!isRecording) return;
    isRecording = false;

    // Disconnect Web Audio nodes
    if (processorNode) {
      processorNode.onaudioprocess = null;
      processorNode.disconnect();
      processorNode = null;
    }
    if (audioContext) {
      audioContext.close();
      audioContext = null;
    }
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      mediaStream = null;
    }

    if (abort) return;

    voiceStateText.textContent = "Processing speech...";
    voiceSubText.textContent = "Converting your voice to text...";

    let queryText = "CPR first aid instructions"; // default mock query if no audio is successfully recorded

    if (runSim) {
      if (currentLang === 'hi') queryText = "सांप के काटने का इलाज?";
      else if (currentLang === 'mr') queryText = "भाजल्यावरील प्रथमोपचार";
      processVoiceConversation(queryText);
      return;
    }

    if (recordedSamples.length === 0) {
      processVoiceConversation(queryText);
      return;
    }

    // 1. Encode floats to 16-bit PCM WAV Blob
    const wavBlob = encodeWav(recordedSamples, 16000);
    
    // 2. Upload to Speech route /api/speech/
    try {
      const formData = new FormData();
      formData.append('file', wavBlob, 'recording.wav');

      const response = await fetch('http://localhost:8000/api/speech/', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error("STT Failed");

      const data = await response.json();
      if (data.success && data.text && data.text.trim().length > 0) {
        queryText = data.text;
      }
      processVoiceConversation(queryText);
    } catch (e) {
      console.warn("Speech API failed, utilizing fallback", e);
      processVoiceConversation(queryText);
    }
  }

  // Handle the text transcript -> Ollama -> TTS playback chain in Voice Mode
  async function processVoiceConversation(transcriptText) {
    appendUserMessage(transcriptText);

    voiceStateText.textContent = "Thinking...";
    voiceSubText.textContent = "Formulating response...";

    let aiResponse = "";
    
    // 1. Get Chatbot response
    try {
      const chatResponse = await fetch('http://localhost:8000/api/chatbot/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: transcriptText, language: currentLang })
      });
      if (chatResponse.ok) {
        const chatData = await chatResponse.json();
        aiResponse = chatData.response;
      } else {
        throw new Error();
      }
    } catch (e) {
      // Local fallback text
      const langGuides = localRescueGuides[currentLang] || localRescueGuides['en'];
      const lower = transcriptText.toLowerCase();
      if (lower.includes('cpr') || lower.includes('सीपीआर')) aiResponse = langGuides.cpr;
      else if (lower.includes('snake') || lower.includes('सांप')) aiResponse = langGuides.snake;
      else aiResponse = "Please check emergency first aid instructions.";
    }

    // 2. Append reply to chat bubble list
    renderChatbotResponse(aiResponse);

    // 3. Play audio via TTS response and show speaking overlay
    try {
      voiceStateText.textContent = "Speaking...";
      voiceSubText.textContent = "Listen to AI Emergency response instructions.";
      speakingWaveform.style.display = 'flex';

      const cleanText = aiResponse.replace(/<[^>]*>/g, '').trim();

      const response = await fetch('http://localhost:8000/api/tts/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText })
      });

      if (!response.ok) throw new Error("TTS failed");
      
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      activeAudio = new Audio(audioUrl);
      activeAudio.play();

      activeAudio.onended = () => {
        closeVoiceOverlay();
      };
    } catch (err) {
      console.warn("TTS Voice screen playback failed", err);
      // Wait 3 seconds and close overlay
      setTimeout(closeVoiceOverlay, 3000);
    }
  }

  // Escape HTML helper
  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Intercept lang changes to update locale
  document.addEventListener('rescueLangChanged', (e) => {
    currentLang = e.detail.lang;
    
    // Refresh static labels
    if (window.RescueTranslations) {
      window.RescueTranslations.apply(currentLang);
    }
  });
}
