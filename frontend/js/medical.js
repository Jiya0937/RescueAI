document.addEventListener('DOMContentLoaded', () => {
  // Global Active Language Tracking (Fallback to English)
  let currentLang = localStorage.getItem('rescue_lang') || 'en';

  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Localized First Aid Guide Data
  const guideData = {
    en: {
      cpr: {
        title: "CPR (Cardiopulmonary Resuscitation)",
        alert: "If the victim is unconscious and not breathing, call 112/108 immediately and begin CPR.",
        steps: [
          "Check if the environment is safe for you and the victim.",
          "Tap the victim's shoulder and shout <strong>'Are you OK?'</strong> to check for responsiveness.",
          "If unresponsive, call emergency support (112 or 108) or ask a bystander to call.",
          "Place the heel of one hand in the center of the victim's chest, and interlock the other hand on top.",
          "Keep your elbows locked and push straight down hard & fast (100-120 compressions per minute, 2 inches deep).",
          "If trained, deliver 2 rescue breaths after every 30 chest compressions. Otherwise, perform continuous chest compressions."
        ]
      },
      snake: {
        title: "Snake Bite First Aid",
        alert: "Seek medical attention immediately. Keep the victim calm and still. Do NOT cut the wound or try to suck venom.",
        steps: [
          "Move away from the snake's striking distance immediately.",
          "Ensure the victim remains extremely calm and still to slow the spread of venom.",
          "Keep the bite area below the level of the heart if possible.",
          "Wash the wound gently with clean soap and water. Do NOT apply ice or tight tourniquets.",
          "Remove any tight jewelry or clothing near the bite area before swelling begins.",
          "Immobilize the bitten limb with a loose splint or bandage to restrict movement."
        ]
      },
      burns: {
        title: "Thermal & Chemical Burns",
        alert: "Do NOT apply ice, butter, or oil to the burn. Do NOT pop any blisters.",
        steps: [
          "Cool the burn immediately under cool, running tap water for at least 10 to 20 minutes.",
          "Remove any tight clothing, rings, or belts near the burned area before swelling starts.",
          "Apply a loose, sterile gauze or clean non-stick bandage. Do NOT wrap tightly.",
          "Take an over-the-counter pain reliever like Ibuprofen if needed to reduce discomfort.",
          "Seek medical assistance for major burns, burns on face, hands, joints, or chemical burns."
        ]
      },
      heart: {
        title: "Heart Attack Emergencies",
        alert: "Call emergency support (112 / 108) immediately at the first sign of a heart attack.",
        steps: [
          "Help the victim sit down in a comfortable position, leaning back, to reduce pressure on the heart.",
          "Loosen any tight clothing around the neck, chest, and waist.",
          "If they are not allergic, have them chew and swallow one adult Aspirin (325mg).",
          "Stay with the victim, keep them warm, and monitor their responsiveness continuously.",
          "Be prepared to perform CPR immediately if the victim becomes unconscious and stops breathing."
        ]
      },
      bleeding: {
        title: "Severe Bleeding Control",
        alert: "Wear gloves if available. Call emergency services if bleeding is severe or doesn't stop.",
        steps: [
          "Apply firm, direct pressure on the wound using a clean gauze, cloth, or bandage.",
          "If the gauze becomes soaked with blood, do NOT remove it. Add more gauze on top and keep pressing.",
          "Elevate the injured limb above the level of the heart to help slow blood flow.",
          "Once bleeding is controlled, bind the dressing tightly with a bandage. Check that pulse is still present.",
          "If bleeding is life-threatening on a limb and direct pressure fails, apply a tourniquet above the wound."
        ]
      },
      choking: {
        title: "Choking (Heimlich Maneuver)",
        alert: "Perform Heimlich maneuver only if the victim cannot breathe, speak, or cough.",
        steps: [
          "Stand behind the choking person, wrap your arms around their waist, and lean them forward slightly.",
          "Make a fist with one hand and place it slightly above the person's navel.",
          "Grasp your fist with your other hand and press hard into the abdomen with quick upward thrusts.",
          "Perform thrusts continuously until the blockage is dislodged or the victim becomes unconscious.",
          "If the victim becomes unresponsive, lower them to the floor, call emergency, and perform CPR check."
        ]
      }
    },
    hi: {
      cpr: {
        title: "सीपीआर (कार्डियोपल्मोनरी रिससिटेशन)",
        alert: "यदि पीड़ित बेहोश है और सांस नहीं ले रहा है, तो तुरंत 112/108 पर कॉल करें और सीपीआर शुरू करें।",
        steps: [
          "जांचें कि वातावरण आपके और पीड़ित के लिए सुरक्षित है या नहीं।",
          "पीड़ित के कंधे को थपथपाएं और चिल्लाएं <strong>'क्या आप ठीक हैं?'</strong> प्रतिक्रिया जांचने के लिए।",
          "यदि कोई प्रतिक्रिया न मिले, तो आपातकालीन सेवाओं (112 या 108) को कॉल करें।",
          "एक हाथ की हथेली को पीड़ित की छाती के केंद्र में रखें, और दूसरे हाथ को ऊपर से आपस में जोड़ लें।",
          "अपनी कोहनियों को सीधा रखें और जोर से व तेजी से दबाएं (100-120 प्रति मिनट, 2 इंच गहरा)।",
          "यदि प्रशिक्षित हैं, तो हर 30 छाती के दबाव के बाद 2 बार कृत्रिम सांस दें। अन्यथा, लगातार दबाव जारी रखें।"
        ]
      },
      snake: {
        title: "सांप के काटने का प्राथमिक उपचार",
        alert: "तुरंत चिकित्सा सहायता लें। पीड़ित को शांत और स्थिर रखें। घाव को न काटें और न ही जहर चूसने का प्रयास करें।",
        steps: [
          "तुरंत सांप के हमला करने के दायरे से दूर हटें।",
          "यह सुनिश्चित करें कि पीड़ित शांत रहे ताकि शरीर में जहर फैलने की गति धीमी हो सके।",
          "यदि संभव हो तो काटने वाले स्थान को हृदय के स्तर से नीचे रखें।",
          "घाव को साफ पानी और साबुन से धोएं। बर्फ या टाइट बैंड का प्रयोग न करें।",
          "सूजन शुरू होने से पहले प्रभावित क्षेत्र के पास के गहने या तंग कपड़े हटा दें।",
          "प्रभावित अंग को हिलने से बचाने के लिए एक ढीली खपच्ची या पट्टी बांधें।"
        ]
      },
      burns: {
        title: "जलने का प्राथमिक उपचार",
        alert: "जलन पर बर्फ, मक्खन या तेल न लगाएं। फफोले न फोड़ें।",
        steps: [
          "जलने वाले स्थान को तुरंत ठंडे, बहते पानी के नीचे 10 से 20 मिनट के लिए ठंडा करें।",
          "सूजन शुरू होने से पहले प्रभावित क्षेत्र के पास की तंग वस्तुएं हटा दें।",
          "एक ढीली, जीवाणुरहित धुंध या साफ पट्टी लगाएं। कसकर न बांधें।",
          "असहजता कम करने के लिए डॉक्टर की सलाह पर दर्द निवारक दवा लें।",
          "गंभीर रूप से जलने या चेहरे, जोड़ों पर जलन के मामले में तुरंत डॉक्टर से संपर्क करें।"
        ]
      },
      heart: {
        title: "दिल का दौरा आपातकाल",
        alert: "दिल के दौरे का पहला संकेत मिलने पर तुरंत आपातकालीन सहायता (112 / 108) को कॉल करें।",
        steps: [
          "पीड़ित को आरामदायक स्थिति में बैठने में मदद करें, थोड़ा पीछे झुकें ताकि दिल पर दबाव कम हो।",
          "गले, छाती और कमर के आसपास के तंग कपड़े ढीले करें।",
          "यदि वे संवेदनशील नहीं हैं, तो उन्हें एक वयस्क एस्पिरिन (325mg) चबाकर निगलने को कहें।",
          "पीड़ित के साथ रहें, उन्हें गर्म रखें और लगातार उनकी प्रतिक्रिया पर नज़र रखें।",
          "यदि पीड़ित बेहोश हो जाए और सांस रुक जाए, तो तुरंत सीपीआर देने के लिए तैयार रहें।"
        ]
      },
      bleeding: {
        title: "गंभीर रक्तस्राव नियंत्रण",
        alert: "यदि उपलब्ध हो तो दस्ताने पहनें। यदि रक्तस्राव गंभीर है या बंद नहीं होता है तो कॉल करें।",
        steps: [
          "साफ धुंध, कपड़े या पट्टी का उपयोग करके घाव पर सीधा, मजबूत दबाव डालें।",
          "यदि पट्टी खून से भीग जाए तो उसे हटाएं नहीं, उसके ऊपर और पट्टी रखकर दबाते रहें।",
          "रक्त प्रवाह को धीमा करने के लिए घायल अंग को हृदय के स्तर से ऊपर उठाएं।",
          "रक्तस्राव नियंत्रित होने पर पट्टी को कसकर बांधें। नाड़ी चल रही है इसकी जांच करें।",
          "यदि रक्तस्राव जीवन के लिए खतरनाक है और दबाव काम नहीं कर रहा है, तो घाव के ऊपर टूर्निकेट लगाएं।"
        ]
      },
      choking: {
        title: "दम घुटना (हेइमलिच प्रक्रिया)",
        alert: "हेइमलिच प्रक्रिया तभी करें जब पीड़ित सांस न ले सके, बोल न सके या खांस न सके।",
        steps: [
          "दम घुटने वाले व्यक्ति के पीछे खड़े हों, अपने हाथों को उनकी कमर के चारों ओर लपेटें और उन्हें थोड़ा आगे झुकाएं।",
          "एक हाथ की मुट्ठी बनाएं और उसे व्यक्ति की नाभि के ठीक ऊपर रखें।",
          "मुट्ठी को दूसरे हाथ से पकड़ें और त्वरित ऊपर की ओर झटके के साथ पेट में जोर से दबाएं।",
          "झटके तब तक देते रहें जब तक कि रुकावट दूर न हो जाए या पीड़ित बेहोश न हो जाए।",
          "यदि पीड़ित बेहोश हो जाए, तो उन्हें फर्श पर लिटाएं, आपातकालीन मदद लें और सीपीआर जांच करें।"
        ]
      }
    },
    mr: {
      cpr: {
        title: "सीपीआर (कार्डिओपल्मोनरी रिससिटेशन)",
        alert: "रुग्ण बेशुद्ध असल्यास आणि श्वास घेत नसल्यास, त्वरित 112/108 वर कॉल करा आणि सीपीआर सुरू करा.",
        steps: [
          "घटनास्थळ स्वतःसाठी आणि रुग्णासाठी सुरक्षित असल्याची खात्री करा.",
          "रुग्णाच्या खांद्यावर थाप द्या आणि प्रतिसाद तपासण्यासाठी ओरडा <strong>'तुम्ही ठीक आहात का?'</strong>.",
          "प्रतिसाद न मिळाल्यास, तात्काळ आपत्कालीन सेवांना (112 किंवा 108) कॉल करा.",
          "एका हाताची तळहात रुग्णाच्या छातीच्या मध्यभागी ठेवा आणि दुसरा हात त्यावर लॉक करा.",
          "कोपर सरळ ठेवून जोरात आणि वेगाने छाती दाबा (100-120 दाब प्रति मिनिट, 2 इंच खोल).",
          "प्रशिक्षित असल्यास, दर 30 दाबानंतर 2 कृत्रिम श्वास द्या. अन्यथा, सतत छाती दाबणे चालू ठेवा."
        ]
      },
      snake: {
        title: "सर्पदंश प्रथमोपचार",
        alert: "तातडीने वैद्यकीय मदत घ्या. रुग्णाला शांत आणि स्थिर ठेवा. जखम कापू नका आणि विष शोषण्याचा प्रयत्न करू नका.",
        steps: [
          "ताबडतोब सापाच्या हल्ल्याच्या अंतरापासून दूर जा.",
          "रुग्ण अत्यंत शांत आणि स्थिर राहील याची खात्री करा जेणेकरून विष पसरण्याचा वेग कमी होईल.",
          "शक्य असल्यास दंश झालेले ठिकाण हृदयाच्या पातळीपेक्षा खाली ठेवा.",
          "जखम स्वच्छ साबण आणि पाण्याने हळूवार धुवा. बर्फ किंवा घट्ट बँड लावू नका.",
          "सूज येण्यापूर्वी प्रभावित क्षेत्राजवळील दागिने किंवा घट्ट कपडे काढून टाका.",
          "बाधित अवयव स्थिर ठेवण्यासाठी सैल पट्टी किंवा लाकडाची फळी बांधा."
        ]
      },
      burns: {
        title: "भाजण्यावर प्रथमोपचार",
        alert: "भाजलेल्या जागी बर्फ, लोणी किंवा तेल लावू नका. फोड फोडू नका.",
        steps: [
          "भाजलेला भाग लगेच वाहत्या थंड पाण्याखाली किमान 10 ते 20 मिनिटे थंड करा.",
          "सूज सुरू होण्यापूर्वी भाजलेल्या भागाजवळील घट्ट कपडे किंवा अंगठी काढून टाका.",
          "सैल जंतुविरहित पट्टी लगावा. घट्ट बांधू नका.",
          "त्रास कमी करण्यासाठी डॉक्टरांच्या सल्ल्याने वेदनाशामक औषध घ्या.",
          "जास्त भाजल्यास किंवा चेहऱ्यावर भाजल्यास ताबडतोब डॉक्टरांशी संपर्क साधा."
        ]
      },
      heart: {
        title: "हृदयविकाराचा झटका",
        alert: "हृदयविकाराच्या झटक्याची लक्षणे दिसताच ताबडतोब आपत्कालीन सेवांना (112 / 108) कॉल करा.",
        steps: [
          "रुग्णाला पाठीचा टेकू देऊन बसण्यास मदत करा जेणेकरून हृदयावरील ताण कमी होईल.",
          "गळा, छाती आणि कंबरेभोवतीचे घट्ट कपडे सैल करा.",
          "ऍलर्जी नसल्यास, त्यांना एक प्रौढ अस्पिरीन (325mg) चघळण्यास आणि गिळण्यास सांगा.",
          "रुग्णासोबत राहा, त्यांना उबदार ठेवा आणि त्यांच्या प्रतिसादावर सतत लक्ष ठेवा.",
          "रुग्ण बेशुद्ध झाल्यास आणि श्वास थांबल्यास ताबडतोब सीपीआर देण्यास तयार राहा."
        ]
      },
      bleeding: {
        title: "तीव्र रक्तस्राव नियंत्रण",
        alert: "उपलब्ध असल्यास हातमोजे घाला. रक्तस्राव थांबत नसल्यास आपत्कालीन मदत बोलवा.",
        steps: [
          "स्वच्छ कापड किंवा पट्टीचा वापर करून जखमेवर थेट आणि जोराने दाब द्या.",
          "पट्टी रक्ताने माखली तरी ती काढू नका, त्यावर दुसरी पट्टी ठेवून दाबणे चालू ठेवा.",
          "रक्तप्रवाह कमी करण्यासाठी जखमी अवयव हृदयाच्या पातळीपेक्षा वर उंच करा.",
          "रक्तस्राव नियंत्रणात आल्यावर पट्टी घट्ट बांधा. नाडी व्यवस्थित चालू आहे ना याची खात्री करा.",
          "रक्तस्राव थांबत नसेल तर जखमेच्या वरच्या बाजूला टूर्निकेट बांधा."
        ]
      },
      choking: {
        title: "घसा अडकल्यास (हेइमलिच पद्धत)",
        alert: "रुग्णाला श्वास घेता येत नसेल किंवा बोलता येत नसेल तरच हेइमलिच पद्धत वापरावी.",
        steps: [
          "रुग्णाच्या पाठीማگے ಉಭೆ ರಾಹಿ, ಆಪ್ಲೆ ಹಾತ್ ತಾಂಚ್ಯ ಕಂಬರೆಭೋವತಿ ಗುಂಡಾಳಾ ಆನಿ ತಾಂನಾ ಥೋಡೆ ಪುಢೆ ಝುಕವಾ.",
          "एका हाताची मूठ करा आणि ती रुग्णाच्या बेंबीच्या थोडी वर ठेवा.",
          "दुसऱ्या हाताने ती मूठ पकडा आणि रुग्णाच्या पोटावर जोराने वरच्या बाजूने दाब द्या.",
          "श्वासमार्गातील अडथळा दूर होईपर्यंत किंवा रुग्ण बेशुद्ध होईपर्यंत दाब देणे सुरू ठेवा.",
          "रुग्ण बेशुद्ध झाल्यास, त्यांना जमिनीवर झोपवा, मदत बोलवा आणि सीपीआर सुरू करा."
        ]
      }
    }
  };

  // 3. Search and filter emergency cards
  const medSearchInput = document.getElementById('med-search-input');
  const medicalCards = document.querySelectorAll('.medical-card');

  if (medSearchInput) {
    medSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      medicalCards.forEach(card => {
        const title = card.querySelector('.med-card-title').textContent.toLowerCase();
        const desc = card.querySelector('.med-card-desc').textContent.toLowerCase();
        
        if (title.includes(query) || desc.includes(query)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // 4. Slide-in Details Drawer Controllers
  const drawerOverlay = document.getElementById('guide-drawer-overlay');
  const guideDrawer = document.getElementById('guide-drawer');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const drawerContent = document.getElementById('drawer-content');
  let activeGuideKey = null;

  function openDrawer(guideKey) {
    activeGuideKey = guideKey;
    renderDrawerContent(guideKey, currentLang);

    if (drawerOverlay && guideDrawer) {
      drawerOverlay.style.display = 'block';
      setTimeout(() => {
        drawerOverlay.classList.add('active');
        guideDrawer.classList.add('active');
      }, 10);
    }
  }

  function closeDrawer() {
    if (drawerOverlay && guideDrawer) {
      drawerOverlay.classList.remove('active');
      guideDrawer.classList.remove('active');
      setTimeout(() => {
        drawerOverlay.style.display = 'none';
      }, 300);
    }
    activeGuideKey = null;
  }

  function renderDrawerContent(guideKey, lang) {
    if (!drawerContent) return;

    // Resolve language block or fallback to English
    const langGuides = guideData[lang] || guideData['en'];
    const guide = langGuides[guideKey] || guideData['en'][guideKey];

    if (!guide) {
      drawerContent.innerHTML = `<p>Guide not found.</p>`;
      return;
    }

    let stepsHtml = '';
    guide.steps.forEach((step, idx) => {
      stepsHtml += `
        <li class="firstaid-step-item">
          <div class="step-number">${idx + 1}</div>
          <div class="step-text">${step}</div>
        </li>
      `;
    });

    drawerContent.innerHTML = `
      <h2 class="drawer-guide-title">${guide.title}</h2>
      
      <div class="drawer-alert">
        <i data-lucide="alert-triangle" style="width: 20px; height: 20px;"></i>
        <span>${guide.alert}</span>
      </div>
      
      <ol class="firstaid-steps-list">
        ${stepsHtml}
      </ol>
    `;

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // Bind click trigger for medical cards
  medicalCards.forEach(card => {
    card.addEventListener('click', () => {
      const guideKey = card.getAttribute('data-guide');
      if (guideKey) {
        openDrawer(guideKey);
      }
    });
  });

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeDrawer);
  }
  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeDrawer);
  }

  // 5. Dynamic Language Sync Interceptor
  document.addEventListener('rescueLangChanged', (e) => {
    const nextLang = e.detail.lang;
    currentLang = nextLang;

    // If detail drawer is open, re-render immediately
    if (activeGuideKey) {
      renderDrawerContent(activeGuideKey, nextLang);
    }
  });

  // Load language settings on page load
  const savedLang = localStorage.getItem('rescue_lang') || 'en';
  if (window.RescueTranslations) {
    window.RescueTranslations.apply(savedLang);
  }
});
