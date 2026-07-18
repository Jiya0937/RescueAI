document.addEventListener('DOMContentLoaded', () => {
  // Global Active Language Tracking (Fallback to English)
  let currentLang = localStorage.getItem('rescue_lang') || 'en';
  let hasChatStarted = false;
  let isListening = false;
  let listenTimeout;
  let typingTimeout;
  let placeholderIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let placeholderAnimTimeout;

  const searchPlaceholders = {
    en: [
      "CPR guide for adults...",
      "How to treat a snake bite...",
      "What to do for third-degree burns...",
      "How to stop severe bleeding...",
      "Heart attack symptoms..."
    ],
    hi: [
      "वयस्कों के लिए सीपीआर गाइड...",
      "सांप के काटने का इलाज...",
      "तीसरी डिग्री के जलने पर क्या करें...",
      "गंभीर रक्तस्राव कैसे रोकें...",
      "दिल के दौरे के लक्षण..."
    ],
    mr: [
      "प्रौढांसाठी सीपीआर मार्गदर्शक...",
      "सर्पदंशावर उपचार कसे करावे...",
      "तिसऱ्या अंशाच्या भाजण्यावर काय करावे...",
      "रक्तस्राव कसा थांबवायचा...",
      "हृदयविकाराच्या झटक्याची लक्षणे..."
    ]
  };

  const replies = {
    en: {
      cpr: "<strong>CPR Emergency Instructions:</strong><br>1. Check if the scene is safe.<br>2. Tap shoulder & shout to check response.<br>3. Call emergency services (112 / 108).<br>4. Place hands in the center of the chest and push hard & fast (100-120 compressions per minute).",
      snake: "<strong>Snake Bite Treatment:</strong><br>1. Move away from the snake's striking distance.<br>2. Keep the victim calm and still.<br>3. Keep the bite area below heart level.<br>4. Clean the wound with soap/water. Do NOT cut the wound or try to suck out venom.<br><br>Would you like to upload an image of the snake for identification?",
      burns: "<strong>Burn Treatment:</strong><br>1. Cool the burn immediately under cool, running tap water for 10-20 minutes.<br>2. Remove tight items near burn area.<br>3. Apply sterile gauze or clean bandage. Do NOT apply ice or butter.",
      accident: "<strong>Car Accident Response:</strong><br>1. Ensure your safety first.<br>2. Turn hazard lights on and check for injuries.<br>3. Call emergency support (100 / 112).<br>4. Do NOT move seriously injured victims unless there is immediate danger.",
      flood: "<strong>Flood Safety:</strong><br>1. Move to higher ground immediately.<br>2. Avoid walking or driving through flood waters.<br>3. Listen to local alerts for evacuation paths.",
      electric: "<strong>Electric Shock First Aid:</strong><br>1. Do NOT touch the victim if they are still in contact with current.<br>2. Switch off the power source immediately.<br>3. Use a non-conducting item to separate them.<br>4. Call emergency support and check breathing.",
      bleeding: "<strong>Severe Bleeding Control:</strong><br>1. Apply firm, direct pressure on the wound using clean gauze or cloth.<br>2. Do NOT remove blood-soaked cloth. Add more on top.<br>3. Elevate the injured limb above heart level.<br>4. Call emergency support if bleeding is heavy.",
      poisoning: "<strong>Poisoning First Aid:</strong><br>1. Call emergency services (112 / 108) immediately.<br>2. If inhaled, move the person to fresh air.<br>3. If on skin/eyes, flush with running water for 15-20 minutes.<br>4. Do NOT induce vomiting unless instructed by a medical professional.",
      default: "I've received your query. Based on offline guides, please review first-aid procedures below."
    },
    hi: {
      cpr: "<strong>सीपीआर आपातकालीन निर्देश:</strong><br>1. जांचें कि क्या घटनास्थल सुरक्षित है।<br>2. प्रतिक्रिया जांचने के लिए कंधे पर थपथपाएं और चिल्लाएं।<br>3. आपातकालीन सेवाओं (112 / 108) को कॉल करें।<br>4. हाथों को छाती के बीच में रखें और जोर से व तेजी से दबाएं (100-120 प्रति मिनट)।",
      snake: "<strong>सांप के काटने का उपचार:</strong><br>1. सांप के हमला करने के दायरे से दूर हटें।<br>2. पीड़ित को शांत और स्थिर रखें।<br>3. काटने वाले स्थान को हृदय के स्तर से नीचे रखें।<br>4. घाव को साबुन/पानी से साफ करें। घाव को काटें नहीं और जहर चूसने की कोशिश न करें।",
      burns: "<strong>जलने का उपचार:</strong><br>1. जलने वाले स्थान को तुरंत ठंडे, बहते पानी के नीचे 10-20 मिनट के लिए ठंडा करें।<br>2. प्रभावित क्षेत्र के पास की तंग वस्तुएं हटा दें।<br>3. जीवाणुरहित धुंध या साफ पट्टी लगाएं। बर्फ या मक्खन न लगाएं।",
      accident: "<strong>कार दुर्घटना प्रतिक्रिया:</strong><br>1. पहले अपनी सुरक्षा सुनिश्चित करें।<br>2. खतरे की लाइटें चालू करें और चोटों की जांच करें।<br>3. आपातकालीन सहायता (100 / 112) को कॉल करें।",
      flood: "<strong>बाढ़ सुरक्षा:</strong><br>1. तुरंत ऊंचे स्थान पर जाएं।<br>2. बाढ़ के पानी में चलने या गाड़ी चलाने से बचें।",
      electric: "<strong>बिजली का झटका प्राथमिक उपचार:</strong><br>1. यदि पीड़ित अभी भी बिजली के संपर्क में है, तो उसे न छुएं।<br>2. तुरंत बिजली का मुख्य स्विच बंद करें।<br>3. गैर-प्रवाहकीय वस्तु से उन्हें अलग करें।",
      bleeding: "<strong>गंभीर रक्तस्राव नियंत्रण:</strong><br>1. साफ कपड़े से घाव पर सीधा, मजबूत दबाव डालें।<br>2. भीगे हुए कपड़े को न हटाएं, ऊपर से और कपड़ा रखें।<br>3. घायल हिस्से को दिल के स्तर से ऊपर उठाएं।<br>4. आपातकालीन मदद के लिए कॉल करें।",
      poisoning: "<strong>विषाक्तता का प्राथमिक उपचार:</strong><br>1. तुरंत आपातकालीन सेवाओं (112 / 108) को कॉल करें।<br>2. यदि सांस के जरिए जहर गया है, तो ताजी हवा में ले जाएं।<br>3. त्वचा/आंखों पर लगने पर 15-20 मिनट पानी से धोएं।<br>4. डॉक्टर की सलाह के बिना उल्टी कराने की कोशिश न करें।",
      default: "मुझे आपकी पूछताछ प्राप्त हुई है। विवरण देखने के लिए कृपया संबंधित प्राथमिक उपचार गाइड पढ़ें।"
    },
    mr: {
      cpr: "<strong>सीपीआर आपत्कालीन सूचना:</strong><br>1. घटनास्थळ सुरक्षित असल्याची खात्री करा.<br>2. प्रतिसाद तपासण्यासाठी खांद्यावर थाप द्या आणि ओरडा.<br>3. आपत्कालीन सेवांना (112 / 108) कॉल करा.<br>4. हात छातीच्या मध्यभागी ठेवा आणि जोरात व वेगाने दाबा (100-120 प्रति मिनिट).",
      snake: "<strong>सर्पदंशावर उपचार:</strong><br>1. सापाच्या हल्ल्याच्या अंतरापासून दूर जा.<br>2. पीडित व्यक्तीला शांत आणि स्थिर ठेवा.<br>3. दंश झालेले ठिकाण हृदयाच्या पातळीपेक्षा खाली ठेवा.<br>4. जखम साबण/पाण्याने स्वच्छ करा. जखम कापू नका किंवा विष शोषण्याचा प्रयत्न करू नका.",
      burns: "<strong>भाजण्यावर उपचार:</strong><br>1. भाजलेला भाग लगेच वाहत्या थंड पाण्याखाली 10-20 मिनिटे थंड करा.<br>2. घट्ट वस्तू काढून टाका.<br>3. जंतुविरहित पट्टी लावा. बर्फ किंवा लोणी लावू नका.",
      accident: "<strong>अपघात प्रतिसाद:</strong><br>1. आधी स्वतःची सुरक्षितता सुनिश्चित करा.<br>2. धोक्याचे दिवे चालू करा आणि जखमा तपासा.<br>3. आपत्कालीन मदतीला कॉल करा.",
      flood: "<strong>पूर सुरक्षा:</strong><br>1. लगेच उंच ठिकाणी जा.<br>2. पुराच्या पाण्यातून चालणे किंवा गाडी चालवणे टाळा.",
      electric: "<strong>विजेचा धक्का प्रथमोपचार:</strong><br>1. पीडित व्यक्ती विजेच्या संपर्कात असल्यास स्पर्श करू नका.<br>2. विजेचा मुख्य स्विच बंद करा.<br>3. लाकडी काठीने वेगळे करा.",
      bleeding: "<strong>तीव्र रक्तस्राव नियंत्रण:</strong><br>1. जखमेवर स्वच्छ कापडाने थेट आणि जोराने दाब द्या.<br>2. भिजलेली पट्टी काढू नका, त्यावर दुसरी ठेवा.<br>3. जखमी अवयव हृदयाच्या पातळीपेक्षा उंच करा.<br>4. तात्काळ आपत्कालीन मदत बोलवा.",
      poisoning: "<strong>विषबाधा प्रथमोपचार:</strong><br>1. त्वरित आपत्कालीन सेवांना (112 / 108) कॉल करा.<br>2. श्वासोच्छवासाद्वारे विष गेल्यास ताजी हवेत न्या.<br>3. त्वचा/डोळ्यांवर विष पडल्यास 15-20 मिनिटे पाण्याने धुवा.<br>4. डॉक्टरांच्या सल्ल्याशिवाय उलट्या करू नका.",
      default: "मला तुमची विचारणा मिळाली आहे. अधिक माहितीसाठी प्रथमोपचार तपासा।"
    }
  };

  // 1. Inject Chatbot HTML to Body
  const injectChatbotHTML = () => {
    // Check if chatbot container already exists
    if (document.getElementById('chatbot-modal')) return;

    const chatbotHTML = `
      <!-- Floating trigger button -->
      <button class="chatbot-trigger" id="chatbot-trigger">
        <i data-lucide="bot" style="width: 22px; height: 22px;"></i>
        <span data-i18n="ai_assistant_btn">AI Assistant</span>
      </button>

      <!-- Chatbot modal overlay and container -->
      <div class="chatbot-modal" id="chatbot-modal">
        <div class="chatbot-modal-overlay" id="chatbot-modal-overlay"></div>
        <div class="chatbot-modal-container">
          <div class="chat-assistant-card" id="chat-assistant-card">
            <!-- Header -->
            <div class="chat-card-header">
              <div class="chat-bot-info">
                <i data-lucide="shield" style="width: 20px; height: 20px;"></i>
                <span data-i18n="chat_header">RescueAI Assistant</span>
              </div>
              <div class="chat-header-actions">
                <div class="chat-status">
                  <span class="status-dot"></span>
                  <span data-i18n="chat_status">AI Ready</span>
                </div>
                <button class="chat-close-btn" id="chat-close-btn" title="Close AI Assistant">
                  <i data-lucide="x" style="width: 18px; height: 18px;"></i>
                </button>
              </div>
            </div>

            <!-- Welcome Illustration -->
            <div class="chat-welcome-container" id="chat-welcome-container">
              <div class="welcome-shield-wrapper">
                <div class="welcome-glowing-ring"></div>
                <div class="welcome-shield-icon">
                  <i data-lucide="shield" class="pulse-shield"></i>
                </div>
              </div>
              <h2 class="welcome-title" data-i18n="chat_welcome_title">How can I help you today?</h2>
              <p class="welcome-subtitle" data-i18n="chat_welcome_subtitle">Describe your emergency or choose a quick action below.</p>
            </div>

            <!-- Conversation List -->
            <div class="chat-conversation" id="chat-conversation" style="display: none;"></div>

            <!-- Quick Chips Grid -->
            <div class="quick-action-chips">
              <button class="chip" data-query="CPR instructions" data-i18n="chip_cpr">
                ❤️ CPR
              </button>
              <button class="chip" data-query="snake bite first aid" data-i18n="chip_snake">
                🐍 Snake Bite
              </button>
              <button class="chip" data-query="burns treatment" data-i18n="chip_burns">
                🔥 Burns
              </button>
              <button class="chip" data-query="bleeding control" data-i18n="chip_bleeding">
                🩸 Bleeding
              </button>
              <button class="chip" data-query="heart attack rescue" data-i18n="chip_heart">
                🫀 Heart Attack
              </button>
              <button class="chip" data-query="poisoning first aid" data-i18n="chip_poisoning">
                🧪 Poisoning
              </button>
            </div>

            <!-- Inputs -->
            <div class="chat-card-input-wrapper">
              <div class="chat-card-input-area" id="chat-normal-input-bar">
                <div class="chat-input-actions-left">
                  <button class="chat-input-btn" id="chat-attach-btn" title="Upload Photo">
                    <i data-lucide="paperclip" style="width: 18px; height: 18px;"></i>
                  </button>
                  <button class="chat-input-btn" id="input-mic-btn" title="Voice Input">
                    <i data-lucide="mic" style="width: 18px; height: 18px;"></i>
                  </button>
                </div>
                <input type="text" class="chat-input" id="chat-input-field" placeholder="Type your emergency..." data-i18n="chat_placeholder">
                <button class="chat-send-btn" id="chat-send-btn" title="Send Message">
                  <i data-lucide="arrow-up" style="width: 18px; height: 18px;"></i>
                </button>
              </div>

              <!-- Listening Wave Overlay -->
              <div class="chat-input-listening-overlay" id="chat-listening-overlay" style="display: none;">
                <div class="listening-status">
                  <span class="listening-dot-pulse"></span>
                  <span data-i18n="chat_listening" class="listening-label">Listening... Speak now</span>
                </div>
                <div class="listening-wave">
                  <div class="wave-bar"></div>
                  <div class="wave-bar"></div>
                  <div class="wave-bar"></div>
                  <div class="wave-bar"></div>
                  <div class="wave-bar"></div>
                </div>
                <button class="listening-stop-btn" id="listening-stop-btn">
                  <i data-lucide="square" style="width: 12px; height: 12px; margin-right: 4px; vertical-align: middle;"></i>
                  <span data-i18n="chat_listening_tap_stop">Tap to Stop</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Append to body
    const div = document.createElement('div');
    div.innerHTML = chatbotHTML.trim();
    while (div.firstChild) {
      document.body.appendChild(div.firstChild);
    }

    // Refresh Lucide Icons for the newly added HTML
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  };

  injectChatbotHTML();

  // Elements
  const chatbotTrigger = document.getElementById('chatbot-trigger');
  const chatbotModal = document.getElementById('chatbot-modal');
  const chatbotOverlay = document.getElementById('chatbot-modal-overlay');
  const chatbotCloseBtn = document.getElementById('chat-close-btn');
  const chatInputField = document.getElementById('chat-input-field');
  const chatSendBtn = document.getElementById('chat-send-btn');
  const chatConversation = document.getElementById('chat-conversation');
  const chatWelcomeContainer = document.getElementById('chat-welcome-container');
  const inputMicBtn = document.getElementById('input-mic-btn');
  const listeningOverlay = document.getElementById('chat-listening-overlay');
  const listeningStopBtn = document.getElementById('listening-stop-btn');
  const listeningLabel = listeningOverlay ? listeningOverlay.querySelector('.listening-label') : null;

  // Toggle Modal Logic
  const openChatModal = () => {
    if (chatbotModal) {
      chatbotModal.style.display = 'flex';
      setTimeout(() => {
        chatbotModal.classList.add('active');
        if (chatInputField) chatInputField.focus();
      }, 10);
      
      // Update Translation keys inside chatbot on open
      if (window.RescueTranslations) {
        window.RescueTranslations.apply(currentLang);
      }
    }
  };

  const closeChatModal = () => {
    if (chatbotModal) {
      chatbotModal.classList.remove('active');
      setTimeout(() => {
        chatbotModal.style.display = 'none';
      }, 300);
    }
  };

  if (chatbotTrigger) chatbotTrigger.addEventListener('click', openChatModal);
  if (chatbotOverlay) chatbotOverlay.addEventListener('click', closeChatModal);
  if (chatbotCloseBtn) chatbotCloseBtn.addEventListener('click', closeChatModal);

  // Chat Session Start Logic
  function startChatSession() {
    if (hasChatStarted) return;
    hasChatStarted = true;
    
    if (chatWelcomeContainer && chatConversation) {
      chatWelcomeContainer.style.opacity = '0';
      chatWelcomeContainer.style.transition = 'opacity 0.25s ease';
      
      setTimeout(() => {
        chatWelcomeContainer.style.display = 'none';
        chatConversation.style.display = 'flex';
        chatConversation.style.opacity = '0';
        chatConversation.scrollTop = chatConversation.scrollHeight;
        
        setTimeout(() => {
          chatConversation.style.transition = 'opacity 0.25s ease';
          chatConversation.style.opacity = '1';
        }, 30);
      }, 250);
    }
  }

  // Type placeholder animation
  function typePlaceholder() {
    if (!chatInputField) return;
    const langArray = searchPlaceholders[currentLang] || searchPlaceholders['en'];
    const currentText = langArray[placeholderIndex];
    
    if (!currentText) {
      placeholderIndex = 0;
      placeholderAnimTimeout = setTimeout(typePlaceholder, 100);
      return;
    }

    if (isDeleting) {
      chatInputField.setAttribute('placeholder', currentText.substring(0, charIndex));
      charIndex--;
    } else {
      chatInputField.setAttribute('placeholder', currentText.substring(0, charIndex));
      charIndex++;
    }

    let typeSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === currentText.length + 1) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      placeholderIndex = (placeholderIndex + 1) % langArray.length;
      typeSpeed = 500;
    }

    placeholderAnimTimeout = setTimeout(typePlaceholder, typeSpeed);
  }

  if (chatInputField) {
    typePlaceholder();
  }

  // Send message
  function appendUserMessage(text) {
    if (!chatConversation) return;
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userBubble = document.createElement('div');
    userBubble.className = 'message-bubble user-msg';
    userBubble.innerHTML = `
      <div class="message-avatar">
        <i data-lucide="user" style="width: 16px; height: 16px;"></i>
      </div>
      <div class="message-content">
        <p>${escapeHtml(text)}</p>
        <span class="message-time">${timeString}</span>
      </div>
    `;
    chatConversation.appendChild(userBubble);
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
    chatConversation.scrollTop = chatConversation.scrollHeight;
  }

  function appendBotMessage(text) {
    if (!chatConversation) return;
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const botBubble = document.createElement('div');
    botBubble.className = 'message-bubble';
    botBubble.innerHTML = `
      <div class="message-avatar">
        <i data-lucide="bot" style="width: 16px; height: 16px;"></i>
      </div>
      <div class="message-content">
        <p>${text}</p>
        <span class="message-time">${timeString}</span>
      </div>
    `;
    chatConversation.appendChild(botBubble);
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
    chatConversation.scrollTop = chatConversation.scrollHeight;
  }

  function showTypingAndReply(query) {
    if (!chatConversation) return;

    const typingBubble = document.createElement('div');
    typingBubble.className = 'message-bubble typing-bubble-container';
    typingBubble.innerHTML = `
      <div class="message-avatar">
        <i data-lucide="bot" style="width: 16px; height: 16px;"></i>
      </div>
      <div class="message-content" style="background: transparent; border: none; box-shadow: none; padding: 0;">
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
    `;
    chatConversation.appendChild(typingBubble);
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
    chatConversation.scrollTop = chatConversation.scrollHeight;

    setTimeout(() => {
      const bubble = chatConversation.querySelector('.typing-bubble-container');
      if (bubble) {
        bubble.remove();
      }
      simulateBotReply(query);
    }, 1200);
  }

  function simulateBotReply(query) {
    const langObj = replies[currentLang] || replies['en'];
    let reply = langObj['default'];
    
    const lowerQuery = query.toLowerCase();
    
    const isCpr = lowerQuery.includes('cpr') || lowerQuery.includes('सीपीआर');
    const isSnake = lowerQuery.includes('bite') || lowerQuery.includes('snake') || lowerQuery.includes('काट') || lowerQuery.includes('साप');
    const isBurns = lowerQuery.includes('burn') || lowerQuery.includes('जल') || lowerQuery.includes('भाज');
    const isAccident = lowerQuery.includes('accident') || lowerQuery.includes('दुर्घटना') || lowerQuery.includes('अपघात');
    const isFlood = lowerQuery.includes('flood') || lowerQuery.includes('बाढ़') || lowerQuery.includes('पूर');
    const isElectric = lowerQuery.includes('shock') || lowerQuery.includes('electric') || lowerQuery.includes('बिजली') || lowerQuery.includes('वीज');
    const isBleeding = lowerQuery.includes('bleed') || lowerQuery.includes('blood') || lowerQuery.includes('रक्त') || lowerQuery.includes('खून');
    const isPoison = lowerQuery.includes('poison') || lowerQuery.includes('toxic') || lowerQuery.includes('विषा') || lowerQuery.includes('विष');

    if (isCpr) reply = langObj['cpr'];
    else if (isSnake) reply = langObj['snake'];
    else if (isBurns) reply = langObj['burns'];
    else if (isAccident) reply = langObj['accident'];
    else if (isFlood) reply = langObj['flood'];
    else if (isElectric) reply = langObj['electric'];
    else if (isBleeding) reply = langObj['bleeding'];
    else if (isPoison) reply = langObj['poisoning'];

    appendBotMessage(reply);
  }

  function handleSend() {
    if (!chatInputField) return;
    const text = chatInputField.value.trim();
    if (!text) return;
    
    startChatSession();
    appendUserMessage(text);
    chatInputField.value = '';
    
    setTimeout(() => {
      showTypingAndReply(text);
    }, 500);
  }

  if (chatSendBtn && chatInputField) {
    chatSendBtn.addEventListener('click', handleSend);
    chatInputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleSend();
      }
    });
  }

  // Voice Microphone simulation
  function startListening() {
    if (!listeningOverlay) return;
    isListening = true;
    listeningOverlay.style.display = 'flex';
    
    const currentTranslation = (window.RescueTranslations && window.RescueTranslations.data[currentLang]) || replies['en'];
    if (listeningLabel) {
      listeningLabel.textContent = currentTranslation['chat_listening'] || "Listening... Speak now";
    }

    listenTimeout = setTimeout(() => {
      if (isListening) {
        let transcript = "First aid for a snake bite";
        if (currentLang === 'hi') transcript = "सांप के काटने का इलाज?";
        else if (currentLang === 'mr') transcript = "साप चावल्यास काय करावे?";
        stopListening(transcript);
      }
    }, 2500);
  }

  function stopListening(customTranscript = null) {
    if (!isListening) return;
    isListening = false;
    clearTimeout(listenTimeout);
    
    if (listeningOverlay) {
      listeningOverlay.style.display = 'none';
    }

    const transcript = customTranscript || "Emergency CPR guide";
    startChatSession();
    appendUserMessage(transcript);
    
    setTimeout(() => {
      showTypingAndReply(transcript);
    }, 600);
  }

  if (inputMicBtn) {
    inputMicBtn.addEventListener('click', (e) => {
      e.preventDefault();
      startListening();
    });
  }

  if (listeningStopBtn) {
    listeningStopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      stopListening();
    });
  }

  // Quick Action Chips Listeners
  const bindChipsListeners = () => {
    const chips = document.querySelectorAll('.chatbot-modal-container .chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        startChatSession();
        const query = chip.getAttribute('data-query');
        let textToSend = chip.textContent.trim();
        appendUserMessage(textToSend);
        setTimeout(() => {
          showTypingAndReply(query);
        }, 500);
      });
    });
  };

  bindChipsListeners();

  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Sync Language Changes
  document.addEventListener('rescueLangChanged', (e) => {
    const nextLang = e.detail.lang;
    currentLang = nextLang;

    // Reset animations/placeholders
    clearTimeout(placeholderAnimTimeout);
    charIndex = 0;
    placeholderIndex = 0;
    isDeleting = false;
    typePlaceholder();
  });
});
