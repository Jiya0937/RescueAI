document.addEventListener('DOMContentLoaded', () => {
  // Global Active Language Tracking (Fallback to English)
  let currentLang = localStorage.getItem('rescue_lang') || 'en';
  let hasChatStarted = false;

  const searchPlaceholders = {
    en: [
      "CPR guide for adults...",
      "How to treat a snake bite...",
      "What to do for third-degree burns...",
      "Earthquake survival steps...",
      "Emergency kit checklist..."
    ],
    hi: [
      "वयस्कों के लिए सीपीआर गाइड...",
      "सांप के काटने का इलाज...",
      "तीसरी डिग्री के जलने पर क्या करें...",
      "भूकंप से बचने के कदम...",
      "आपातकालीन किट चेकलिस्ट..."
    ],
    mr: [
      "प्रौढांसाठी सीपीआर मार्गदर्शक...",
      "सर्पदंशावर उपचार कसे करावे...",
      "तिसऱ्या अंशाच्या भाजण्यावर काय करावे...",
      "भूकंप सुरक्षा उपाय...",
      "आपत्कालीन किट तपासणी यादी..."
    ],
    bn: [
      "সিপিআর নির্দেশিকা...",
      "সাপের কামড়ের চিকিৎসা...",
      "পোড়া ক্ষতের জন্য প্রাথমিক চিকিৎসা...",
      "ভূমিকম্পের সময় করণীয়...",
      "জরুরি কিট তালিকা..."
    ],
    gu: [
      "સીપીઆર માર્ગદર્શિકા...",
      "સાપ કરડવાની પ્રાથમિક સારવાર...",
      "દાઝી જવા માટેના ઉપાયો...",
      "ભૂકંપ સુરક્ષા પગલાં...",
      "કટોકટી કીટ ચેકલિસ્ટ..."
    ],
    pa: [
      "ਸੀਪੀਆਰ ਗਾਈਡ...",
      "ਸੱਪ ਦੇ ਕੱਟਣ ਦਾ ਇਲਾਜ...",
      "ਸੜਨ ਦਾ ਮੁਢਲਾ ਇਲਾਜ...",
      "ਭੂਚਾਲ ਸੁਰੱਖਿਆ ਨਿਯਮ...",
      "ਐਮਰਜੈਂਸੀ ਕਿੱਟ ਸੂਚੀ..."
    ],
    ta: [
      "சிபிআর முதலுதவி...",
      "பாம்பு கடி சிகிச்சை...",
      "தீக்காயங்களுக்கான வழிமுறைகள்...",
      "நிலநடுக்க பாதுகாப்பு...",
      "அவசர உதவி பெட்டி..."
    ],
    te: [
      "సీపీఆర్ ప్రథమ చికిత్స...",
      "పాము కాటుకు చికిత్స...",
      "காலిన గాయాలకు ఉపశమనం...",
      "భూకంప రక్షణ చర్యలు...",
      "అत्यవసర కిట్ జాబితా..."
    ],
    kn: [
      "ಸಿಪಿಆರ್ ಮಾರ್ಗದರ್ಶಿ...",
      "ಹಾವು ಕಡಿತಕ್ಕೆ ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ...",
      "ಸುಟ್ಟ ಗಾಯಗಳ ಆರೈಕೆ...",
      "ಭೂಕಂಪ ಸುರಕ್ಷತಾ ಕ್ರಮಗಳು...",
      "ತುರ್ತು ಕಿಟ್ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ..."
    ],
    ml: [
      "സിപിആർ നിർദ്ദേശങ്ങൾ...",
      "പാമ്പുകടിക്ക് പ്രഥമശുശ്രൂഷ...",
      "പൊള്ളലിനുള്ള വഴിപാടുകൾ...",
      "ഭൂകമ്പ സുരക്ഷാ നടപടികൾ...",
      "അടിയന്തിര കിറ്റ് ലിസ്റ്റ്..."
    ],
    ur: [
      "سی پی آر گائیڈ...",
      "سانپ کے کاٹنے کا علاج...",
      "جلنے کا ابتدائی علاج...",
      "زلزلہ سے بچاؤ کے اقدامات...",
      "ہنگامی کٹ کی فہرست..."
    ]
  };

  const replies = {
    en: {
      cpr: "<strong>CPR Emergency Instructions:</strong><br>1. Check if the scene is safe.<br>2. Tap shoulder & shout to check response.<br>3. Call emergency services (112 / 108).<br>4. Place hands in the center of the chest and push hard & fast (100-120 compressions per minute).",
      snake: "<strong>Snake Bite Treatment:</strong><br>1. Move away from the snake's striking distance.<br>2. Keep the victim calm and still.<br>3. Keep the bite area below heart level.<br>4. Clean the wound with soap/water. Do NOT cut the wound or try to suck out venom.<br><br>Would you like to upload an image of the snake for identification?",
      burns: "<strong>Burn Treatment:</strong><br>1. Cool the burn immediately under cool, running tap water for 10-20 minutes.<br>2. Remove tight items near burn area.<br>3. Apply sterile gauze or clean bandage. Do NOT apply ice or butter.",
      accident: "<strong>Car Accident Response:</strong><br>1. Ensure your safety first.<br>2. Turn hazard lights on and check for injuries.<br>3. Call emergency support (100 / 112).<br>4. Do NOT move seriously injured victims unless there is immediate danger (fire/explosion).",
      flood: "<strong>Flood Safety:</strong><br>1. Move to higher ground immediately.<br>2. Avoid walking or driving through flood waters.<br>3. Listen to local alerts for evacuation paths.",
      electric: "<strong>Electric Shock First Aid:</strong><br>1. Do NOT touch the victim if they are still in contact with current.<br>2. Switch off the power source immediately.<br>3. Use a non-conducting item to separate them.<br>4. Call emergency support and check breathing.",
      default: "I've received your query. Based on offline guides, please review first-aid procedures below."
    },
    hi: {
      cpr: "<strong>सीपीआर आपातकालीन निर्देश:</strong><br>1. जांचें कि क्या घटनास्थल सुरक्षित है।<br>2. प्रतिक्रिया जांचने के लिए कंधे पर थपथपाएं और चिल्लाएं।<br>3. आपातकालीन सेवाओं (112 / 108) को कॉल करें।<br>4. हाथों को छाती के बीच में रखें और जोर से व तेजी से दबाएं (100-120 प्रति मिनट)।",
      snake: "<strong>सांप के काटने का उपचार:</strong><br>1. सांप के हमला करने के दायरे से दूर हटें।<br>2. पीड़ित को शांत और स्थिर रखें।<br>3. काटने वाले स्थान को हृदय के स्तर से नीचे रखें।<br>4. घाव को साबुन/पानी से साफ करें। घाव को काटें नहीं और जहर चूसने की कोशिश न करें।<br><br>क्या आप पहचान के लिए सांप की तस्वीर अपलोड करना चाहते हैं?",
      burns: "<strong>जलने का उपचार:</strong><br>1. जलने वाले स्थान को तुरंत ठंडे, बहते पानी के नीचे 10-20 मिनट के लिए ठंडा करें।<br>2. प्रभावित क्षेत्र के पास की तंग वस्तुएं हटा दें।<br>3. जीवाणुरहित धुंध या साफ पट्टी लगाएं। बर्फ या मक्खन न लगाएं।",
      accident: "<strong>कार दुर्घटना प्रतिक्रिया:</strong><br>1. पहले अपनी सुरक्षा सुनिश्चित करें।<br>2. खतरे की लाइटें चालू करें और चोटों की जांच करें।<br>3. आपातकालीन सहायता (100 / 112) को कॉल करें।<br>4. गंभीर रूप से घायल पीड़ितों को तब तक न हिलाएं जब तक कि तत्काल खतरा न हो।",
      flood: "<strong>बाढ़ सुरक्षा:</strong><br>1. तुरंत ऊंचे स्थान पर जाएं।<br>2. बाढ़ के पानी में चलने या गाड़ी चलाने से बचें।<br>3. निकासी मार्गों के लिए स्थानीय चेतावनियों को सुनें।",
      electric: "<strong>बिजली का झटका प्राथमिक उपचार:</strong><br>1. यदि पीड़ित अभी भी बिजली के संपर्क में है, तो उसे न छुएं।<br>2. तुरंत बिजली का मुख्य स्विच बंद करें।<br>3. लकड़ी के डंडे जैसे गैर-प्रवाहकीय वस्तु से उन्हें अलग करें।<br>4. आपातकालीन सहायता को कॉल करें और सांस की जांच करें।",
      default: "मुझे आपकी पूछताछ प्राप्त हुई है। स्थानीय फाइलों के आधार पर, विवरण देखें।"
    },
    mr: {
      cpr: "<strong>सीपीआर आपत्कालीन सूचना:</strong><br>1. घटनास्थळ सुरक्षित असल्याची खात्री करा.<br>2. प्रतिसाद तपासण्यासाठी खांद्यावर थाप द्या आणि ओरडा.<br>3. आपत्कालीन सेवांना (112 / 108) कॉल करा.<br>4. हात छातीच्या मध्यभागी ठेवा आणि जोरात व वेगाने दाबा (100-120 प्रति मिनिट).",
      snake: "<strong>सर्पदंशावर उपचार:</strong><br>1. सापाच्या हल्ल्याच्या अंतरापासून दूर जा.<br>2. पीडित व्यक्तीला शांत आणि स्थिर ठेवा.<br>3. दंश झालेले ठिकाण हृदयाच्या पातळीपेक्षा खाली ठेवा.<br>4. जखम साबण/पाण्याने स्वच्छ करा. जखम कापू नका किंवा विष शोषण्याचा प्रयत्न करू नका.<br><br>ओळखण्यासाठी सापाचा फोटो अपलोड करू इच्छिता?",
      burns: "<strong>भाजण्यावर उपचार:</strong><br>1. भाजलेला भाग लगेच वाहत्या थंड पाण्याखाली 10-20 मिनिटे थंड करा.<br>2. घट्ट वस्तू काढून टाका.<br>3. जंतुविरहित पट्टी लावा. बर्फ किंवा लोणी लावू नका.",
      accident: "<strong>अपघात प्रतिसाद:</strong><br>1. आधी स्वतःची सुरक्षितता सुनिश्चित करा.<br>2. धोक्याचे दिवे चालू करा आणि जखमा तपासा.<br>3. आपत्कालीन मदतीला (100 / 112) कॉल करा.<br>4. गंभीर जखमींना तातडीचा धोका नसल्यास हलवू नका.",
      flood: "<strong>पूर सुरक्षा:</strong><br>1. लगेच उंच ठिकाणी जा.<br>2. पुराच्या पाण्यातून चालणे किंवा गाडी चालवणे टाळा.<br>3. सुरक्षित बाहेर पडण्याच्या मार्गांसाठी स्थानिक सूचना ऐका.",
      electric: "<strong>विजेचा धक्का प्रथमोपचार:</strong><br>1. पीडित व्यक्ती विजेच्या संपर्कात असल्यास त्याला स्पर्श करू नका.<br>2. विजेचा मुख्य स्विच ताबडतोब बंद करा.<br>3. लाकडी काठीसारख्या विद्युतरोधक वस्तूने त्यांना वेगळे करा.<br>4. आपत्कालीन मदतीला कॉल करा आणि श्वास तपासा.",
      default: "मला तुमची विचारणा मिळाली आहे. अधिक माहितीसाठी प्रथमोपचार तपासा।"
    },
    bn: {
      cpr: "<strong>সিপিআর জরুরি নির্দেশাবলী:</strong><br>১. ঘটনাস্থল নিরাপদ কিনা তা পরীক্ষা করুন।<br>২. সাড়া পরীক্ষা করতে কাঁধে চাপ দিন।<br>৩. জরুরি পরিষেবাগুলিতে কল করুন (১১২ / ১০৮)।<br>৪. বুকে হাত রেখে দ্রুত এবং জোরে চাপ দিন।",
      snake: "<strong>সাপের কামড়ের চিকিৎসা:</strong><br>১. সাপের রেঞ্জ থেকে দূরে সরুন।<br>২. রোগীকে শান্ত রাখুন।<br>৩. দংশনের স্থান হৃদযন্ত্রের নিচে রাখুন।<br>৪. ক্ষত পরিষ্কার করুন।<br><br>সাপের জাত চিহ্নিত করতে আপনি কি ছবি আপলোড করবেন?",
      burns: "<strong>পোড়া ক্ষতের চিকিৎসা:</strong><br>১. পোড়া অংশ অবিলম্বে ঠান্ডা জলের নিচে ১০-২০ মিনিট রাখুন।<br>২. ব্যান্ডেজ করুন। বরফ লাগাবেন না।",
      accident: "<strong>দুর্ঘটনায় করণীয়:</strong><br>১. হ্যাজার্ড লাইট জ্বালিয়ে চোট পরীক্ষা করুন।<br>২. জরুরি বিভাগে কল করুন।",
      flood: "<strong>বন্যা নিরাপত্তা:</strong><br>১. অবিলম্বে উঁচু স্থানে চলে যান।<br>২. বন্যার জলের মধ্যে হাঁটা এড়িয়ে চলুন।",
      electric: "<strong>বৈদ্যুতিক শক প্রাথমিক চিকিৎসা:</strong><br>১. বিদ্যুতের সংস্পর্শে থাকলে রোগীকে ছোঁবেন না।<br>২. অবিলম্বে মেইন সুইচ বন্ধ করুন।",
      default: "আমি আপনার প্রশ্ন পেয়েছি। তথ্যের জন্য প্রথমিক চিকিৎসা প্যানেলগুলি দেখুন।"
    },
    gu: {
      cpr: "<strong>સીપીઆર કટોકટી સૂચનાઓ:</strong><br>૧. દ્રશ્ય સુરક્ષિત છે કે નહીં તે તપાસો.<br>૨. પ્રતિક્રિયા જાણવા ખભા પર થપથપાવો.<br>૩. ઇમરજન્સી સેવાઓ (૧૧૨ / ૧૦૮) ને કૉલ કરો.<br>૪. છાતીની મધ્યમાં ઝડપી દબાણ આપો.",
      snake: "<strong>સાપ કરડવાની સારવાર:</strong><br>૧. સાપથી સુરક્ષિત અંતરે ખસી જાઓ.<br>૨. દર્દીને શાંત અને સ્થિર રાખો.<br>૩. ઘા સાબુ અને પાણીથી સાફ કરો.<br><br>ઓળખ માટે સાપની છબી અપલોડ કરવા માંગો છો?",
      burns: "<strong>દાઝી જવાની સારવાર:</strong><br>૧. દાઝેલા ભાગને ઠંડા પાણી નીચે ૧૦-૨૦ મિનિટ રાખો.<br>૨. જંતુરહિત પાટો બાંધો. બરફ ન લગાવો.",
      accident: "<strong>અકસ્માત પ્રતિભાવ:</strong><br>૧. હેઝાર્ડ લાઈટો ચાલુ કરો.<br>૨. ઇમરજન્સી સેવાનો સંપર્ક કરો.",
      flood: "<strong>પૂર સુરક્ષા:</strong><br>૧. તાત્કાલિક ઊંચા સ્થાને ખસી જાઓ.<br>૨. પૂરના પાણીથી બચો.",
      electric: "<strong>વીજળીના ઝટકાની પ્રાથમિક સારવાર:</strong><br>૧. દર્દી વીજળીના સંપર્કમાં હોય તો તેને અડશો નહીં.<br>૨. મુખ્ય સ્વીચ તરત જ બંધ કરો.",
      default: "તમારી પૂછપરછ મળી છે. વિગતો મેળવવા માટે નીચેના વિભાગો જુઓ."
    },
    pa: {
      cpr: "<strong>ਸੀਪੀਆਰ ਐਮਰਜੈਂਸੀ ਨਿਰਦੇਸ਼:</strong><br>1. ਚੈੱਕ ਕਰੋ ਕਿ ਕੀ ਜਗ੍ਹਾ ਸੁਰੱਖਿਅਤ ਹੈ।<br>2. ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ (112 / 108) ਨੂੰ ਕਾਲ ਕਰੋ।",
      snake: "<strong>ਸੱਪ ਦੇ ਕੱਟਣ ਦਾ ਇਲਾਜ:</strong><br>1. ਸੱਪ ਤੋਂ ਦੂਰ ਚਲੇ ਜਾਓ।<br>2. ਮਰੀਜ਼ ਨੂੰ ਸ਼ਾਂਤ ਰੱਖੋ।<br>3. ਸਾਬਣ ਪਾਣੀ ਨਾਲ ਸਾਫ਼ ਕਰੋ।<br><br>ਪਛਾਣ ਲਈ ਸੱਪ ਦੀ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?",
      burns: "<strong>ਸੜਨ ਦਾ ਇਲਾਜ:</strong><br>1. ਸੜੇ ਹੋਏ ਹਿੱਸੇ ਨੂੰ 10-20 ਮਿੰਟ ਠੰਡੇ ਪਾਣੀ ਹੇਠ ਰੱਖੋ।",
      accident: "<strong>ਹਾਦਸੇ ਦੇ ਸਮੇਂ ਸੁਰੱਖਿਆ:</strong><br>1. ਹੈਜ਼ਰਡ ਲਾਈਟਾਂ ਚਾਲੂ ਕਰੋ। 2. ਕਾਲ ਕਰੋ।",
      flood: "<strong>ਹੜ੍ਹ ਸੁਰੱਖਿਆ:</strong><br>1. ਉੱਚੀ ਜਗ੍ਹਾ 'ਤੇ ਜਾਓ।",
      electric: "<strong>ਬਿਜਲੀ ਦਾ ਝਟਕਾ ਪ੍ਰਾਇਮਰੀ ਟ੍ਰੀਟਮੈਂਟ:</strong><br>1. ਮੇਨ ਸਵਿੱਚ ਬੰਦ ਕਰੋ। 2. ਵੱਖ ਕਰੋ।",
      default: "ਸਾਨੂੰ ਤੁਹਾਡਾ ਸੁਨੇਹਾ ਮਿਲ ਗਿਆ ਹੈ। ਹੋਰ ਜਾਣਕਾਰੀ ਲਈ ਹੇਠਾਂ ਦੇਖੋ।"
    },
    ta: {
      cpr: "<strong>சிபிஆர் அவசர வழிமுறைகள்:</strong><br>1. இடம் பாதுகாப்பாக உள்ளதா என சரிபார்க்கவும்.<br>2. அவசர சேவைகளை அழைக்கவும் (112 / 108).",
      snake: "<strong>பாம்பு கடி சிகிச்சை:</strong><br>1. பாம்பின் தாக்குதல் எல்லையில் இருந்து விலகிச் செல்லவும்.<br>2. நோயாளி அமைதியாக இருக்கச் செய்யவும்.<br>3. சோப்பு தண்ணீரால் கழுவவும்.<br><br>பாம்பின் புகைப்படத்தை பதிவேற்ற விரும்புகிறீர்களா?",
      burns: "<strong>தீக்காய சிகிச்சை:</strong><br>1. உடனடியாக குளிர்ந்த ஓடும் நீரில் 10-20 நிமிடங்கள் வைக்கவும்.",
      accident: "<strong>விபத்து உதவி:</strong><br>1. அவசர விளக்குகளை ஆன் செய்யவும். 2. உதவிக்கு அழைக்கவும்.",
      flood: "<strong>வெள்ள பாதுகாப்பு:</strong><br>1. உடனடியாக உயரமான இடத்திற்கு செல்லவும்.",
      electric: "<strong>மின்சார அதிர்ச்சி முதலுதவி:</strong><br>1. மெயின் சுவிட்சை ஆஃப் செய்யவும். 2. பிரிக்கவும்.",
      default: "உங்கள் கேள்வி பெறப்பட்டது. தகவல்களுக்கு கீழே பார்க்கவும்."
    },
    te: {
      cpr: "<strong>సీపీఆర్ అత్యవసర సూచనలు:</strong><br>1. గుండెపై చేతులు ఉంచి గట్టిగా నొక్కండి.",
      snake: "<strong>పాము కాటు చికిత్స:</strong><br>1. పాముకు దూరంగా వెళ్ళండి.<br>2. బాధితుడిని ప్రశాంతంగా ఉంచండి.<br>3. గాయాన్ని కోయకండి.<br><br>గుర్తింపు కోసం పాము ఫోటోను అప్‌లోడ్ చేయాలనుకుంటున్నారా?",
      burns: "<strong>காலಿನ గాయాల చికిత్స:</strong><br>1. చల్లని నీటి ప్రవాహం కింద 10-20 నిమిషాలు ఉంచండి.",
      accident: "<strong>ప్రమాద సమయాలలో:</strong><br>1. హజార్డ్ లైట్లు వేయండి. 2. సహాయం కోసం కాల్ చేయండి.",
      flood: "<strong>వరద రక్షణ:</strong><br>1. ఎత్తైన ప్రదేశాలకు వెళ్ళండి.",
      electric: "<strong>విద్యుత్ ఘాతం ప్రథమ చికిత్స:</strong><br>1. మెయిన్ స్విచ్ ఆఫ్ చేయండి. 2. కర్రతో వేరు చేయండి.",
      default: "మీ అభ్యర్థన అందింది. మరిన్ని వివరాలకు క్రింది విభాగాలను చూడండి."
    },
    kn: {
      cpr: "<strong>ಸಿಪಿಆರ್ ತುರ್ತು ಸೂಚನೆಗಳು:</strong><br>1. ಎದೆಯ ಮಧ್ಯಭಾಗದಲ್ಲಿ ಗಟ್ಟಿಯಾಗಿ ಒತ್ತಿರಿ.",
      snake: "<strong>ಹಾವು ಕಡಿತಕ್ಕೆ ಚಿಕಿತ್ಸೆ:</strong><br>1. ಹಾವಿನಿಂದ ದೂರ ಸರಿಯಿರಿ.<br>2. ರೋಗಿಯನ್ನು ಶಾಂತವಾಗಿರಿಸಿ.<br>3. ಗಾಯವನ್ನು ಕತ್ತರಿಸಬೇಡಿ.<br><br>ಗುರುತಿಸಲು ಹಾವಿನ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಬಯಸುವಿರಾ?",
      burns: "<strong>ಸುಟ್ಟ ಗಾಯಗಳ ಚಿಕಿತ್ಸೆ:</strong><br>1. ತಣ್ಣನೆಯ ನೀರಿನಲ್ಲಿ 10-20 ನಿಮಿಷ ಇಡಿ.",
      accident: "<strong>ಅಪಘಾತ ಸಹಾಯ:</strong><br>1. ಹ್ಯಾಜಾರ್ಡ್ ದೀಪಗಳನ್ನು ಆನ್ ಮಾಡಿ. 2. ತುರ್ತು ಕರೆ ಮಾಡಿ.",
      flood: "<strong>ಪ್ರವಾಹ ಸುರಕ್ಷತೆ:</strong><br>1. ತಕ್ಷಣ ಎತ್ತರದ ಪ್ರದೇಶಕ್ಕೆ ಹೋಗಿ.",
      electric: "<strong>ವಿದ್ಯುತ್ ಆಘಾತ ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ:</strong><br>1. ಮೈನ್ ಸ್ವಿಚ್ ಆಫ್ ಮಾಡಿ. 2. ಕೋಲಿನಿಂದ ಬೇರ್ಪಡಿಸಿ.",
      default: "ನಿಮ್ಮ ಪ್ರಶ್ನೆ ತಲುಪಿದೆ. ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ ಮಾಹಿತಿ ಕೆಳಗೆ ನೋಡಿ."
    },
    ml: {
      cpr: "<strong>സിപിആർ അടിയന്തിര നിർദ്ദേശങ്ങൾ:</strong><br>1. നെഞ്ചിന്റെ മധ്യത്തിൽ അമർത്തുക.",
      snake: "<strong>പാമ്പുകടി ചികിത്സ:</strong><br>1. പാമ്പിൽ നിന്നും അകന്നു നിൽക്കുക.<br>2. കടികേറ്റ ഭാഗം ഹൃദയത്തിന് താഴെ വെക്കുക.<br>3. മുറിവ് കീറരുത്.<br><br>തിരിച്ചറിയാൻ പാമ്പിൻ്റെ ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യാൻ താല്പര്യമുണ്ടോ?",
      burns: "<strong>പൊള്ളൽ ചികിത്സ:</strong><br>1. തണുത്ത വെള്ളത്തിനടിയിൽ 10-20 മിനിറ്റ് വെക്കുക.",
      accident: "<strong>അപകടമുണ്ടായാൽ:</strong><br>1. ഹസാർഡ് ലൈറ്റുകൾ ഓൺ ചെയ്യുക. 2. സഹായം തേടുക.",
      flood: "<strong>വെള്ളപ്പൊക്ക സുരക്ഷ:</strong><br>1. ഉയർന്ന സ്ഥലങ്ങളിലേക്ക് മാറുക.",
      electric: "<strong>വൈദ്യുതാഘാതം പ്രഥമശുശ్రൂഷ:</strong><br>1. മെയിൻ സ്വിച്ച് ഓഫ് ചെയ്യുക. 2. വേർപെടുത്തുക.",
      default: "നിങ്ങളുടെ ചോദ്യം ലഭിച്ചിട്ടുണ്ട്. താഴെയുള്ള കാർഡുകൾ പരിശോധിക്കുക."
    },
    ur: {
      cpr: "<strong>سی پی آر ہنگامی ہدایات:</strong><br>1. چھاتی کے درمیان دونوں ہاتھ رکھ کر تیزی سے دبائیں۔",
      snake: "<strong>سانپ کے کاٹنے کا علاج:</strong><br>1. سانپ کی زد سے دور ہٹ جائیں۔<br>2. مریض کو پرسکون رکھیں۔<br>3. زخم پر کٹ نہ لگائیں۔<br><br>کیا آپ شناخت کے لیے سانپ کی تصویر اپ لوڈ کرنا چاہتے ہیں؟",
      burns: "<strong>جلنے کا علاج:</strong><br>1. متاثرہ حصے کو 10-20 منٹ ٹھنڈے پانی کے نیچے رکھیں۔",
      accident: "<strong>حادثے کے وقت ردعمل:</strong><br>1. ایمرجنسی لائٹس آن کریں۔ 2. ہنگامی مدد حاصل کریں۔",
      flood: "<strong>سیلاب سے بچاؤ:</strong><br>1. فوراً اونچی جگہ پر منتقل ہو جائیں۔",
      electric: "<strong>بجلی کا جھٹکا ابتدائی طبی امداد:</strong><br>1. مین سوئچ بند کریں۔ 2. لکڑی کی مدد سے الگ کریں۔",
      default: "ہمیں آپ کا پیغام مل گیا ہے۔ تفصیلات کے لیے نیچے دیکھیں۔"
    }
  };

  // 1. Search Bar Typing Placeholder Animation
  const searchInput = document.getElementById('ai-search-input');
  let placeholderIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingTimeout;

  function typePlaceholder() {
    if (!searchInput) return;
    const langArray = searchPlaceholders[currentLang] || searchPlaceholders['en'];
    const currentText = langArray[placeholderIndex];
    
    if (!currentText) {
      placeholderIndex = 0;
      typingTimeout = setTimeout(typePlaceholder, 100);
      return;
    }

    if (isDeleting) {
      searchInput.setAttribute('placeholder', currentText.substring(0, charIndex));
      charIndex--;
    } else {
      searchInput.setAttribute('placeholder', currentText.substring(0, charIndex));
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

    typingTimeout = setTimeout(typePlaceholder, typeSpeed);
  }

  if (searchInput) {
    typePlaceholder();
  }

  // 2. Microphone Active / Listening States
  const inputMicBtn = document.getElementById('input-mic-btn');
  const listeningOverlay = document.getElementById('chat-listening-overlay');
  const listeningStopBtn = document.getElementById('listening-stop-btn');
  const listeningLabel = listeningOverlay ? listeningOverlay.querySelector('.listening-label') : null;
  const chatConversation = document.getElementById('chat-conversation');
  const chatWelcomeContainer = document.getElementById('chat-welcome-container');
  let isListening = false;
  let listenTimeout;

  function startChatSession() {
    if (hasChatStarted) return;
    hasChatStarted = true;
    
    if (chatWelcomeContainer && chatConversation) {
      // Fade out welcome
      chatWelcomeContainer.style.opacity = '0';
      chatWelcomeContainer.style.transition = 'opacity 0.25s ease';
      
      setTimeout(() => {
        chatWelcomeContainer.style.display = 'none';
        
        // Fade in conversation
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

  function startListening() {
    if (!listeningOverlay) return;
    isListening = true;
    
    // Slide / show in-bar voice overlay
    listeningOverlay.style.display = 'flex';
    
    // Set dynamic text mapping
    const currentTranslation = RescueTranslations.data[currentLang] || RescueTranslations.data['en'];
    if (listeningLabel) {
      listeningLabel.textContent = currentTranslation['chat_listening'] || "Listening... Speak now";
    }

    // Set fallback timeout (simulate stop recording after 3 seconds)
    listenTimeout = setTimeout(() => {
      if (isListening) {
        let transcript = "How do I treat a snake bite?";
        if (currentLang === 'hi') transcript = "सांप के काटने का इलाज?";
        else if (currentLang === 'mr') transcript = "साप चावल्यास काय करावे?";
        else if (currentLang === 'bn') transcript = "সাপের কামড়ের চিকিৎসা?";
        else if (currentLang === 'gu') transcript = "સાપ કરડવાની સારવાર?";
        else if (currentLang === 'pa') transcript = "ਸੱਪ ਦੇ ਕੱਟਣ ਦਾ ਇਲਾਜ?";
        else if (currentLang === 'ta') transcript = "பாம்பு கடிக்கு என்ன செய்வது?";
        else if (currentLang === 'te') transcript = "పాము కాటు చికిత్స?";
        else if (currentLang === 'kn') transcript = "ಹಾವು ಕಡಿತಕ್ಕೆ ಏನು ಮಾಡಬೇಕು?";
        else if (currentLang === 'ml') transcript = "പാമ്പുകടിയേറ്റാൽ എന്ത് ചെയ്യണം?";
        else if (currentLang === 'ur') transcript = "سانپ کے کاٹنے کا علاج؟";
        
        stopListening(transcript);
      }
    }, 3000);
  }

  function stopListening(customTranscript = null) {
    if (!isListening) return;
    isListening = false;
    clearTimeout(listenTimeout);
    
    if (listeningOverlay) {
      listeningOverlay.style.display = 'none';
    }

    let defaultTranscript = "Emergency evacuation route for floods";
    if (currentLang === 'hi') defaultTranscript = "बाढ़ सुरक्षा नियम";
    else if (currentLang === 'mr') defaultTranscript = "पुरापासून सुरक्षा";
    else if (currentLang === 'bn') defaultTranscript = "বন্যা নিরাপত্তা";
    else if (currentLang === 'gu') defaultTranscript = "પૂર સુરક્ષા";
    else if (currentLang === 'pa') defaultTranscript = "ਹੜ੍ਹ ਸੁਰੱਖਿਆ";
    else if (currentLang === 'ta') defaultTranscript = "வெள்ள பாதுகாப்பு";
    else if (currentLang === 'te') defaultTranscript = "వరద రక్షణ";
    else if (currentLang === 'kn') defaultTranscript = "ಪ್ರವಾಹ ಸುರಕ್ಷತೆ";
    else if (currentLang === 'ml') defaultTranscript = "വെള്ളപ്പൊക്ക സുരക്ഷ";
    else if (currentLang === 'ur') defaultTranscript = "سیلاب سے بچاؤ";

    const transcript = customTranscript || defaultTranscript;
    
    // Begin conversation on voice prompt
    startChatSession();
    
    appendUserMessage(transcript);
    
    setTimeout(() => {
      showTypingAndReply(transcript);
    }, 800);
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

  // 3. Chat Messages Rendering & Interaction
  const chatInputField = document.getElementById('chat-input-field');
  const chatSendBtn = document.getElementById('chat-send-btn');

  function appendUserMessage(text) {
    if (!chatConversation) return;
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userBubble = document.createElement('div');
    userBubble.className = 'message-bubble user-msg fade-up';
    userBubble.innerHTML = `
      <div class="message-avatar">
        <i data-lucide="user" style="width: 18px; height: 18px;"></i>
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
    botBubble.className = 'message-bubble fade-up';
    botBubble.innerHTML = `
      <div class="message-avatar">
        <i data-lucide="bot" style="width: 18px; height: 18px;"></i>
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
    typingBubble.className = 'message-bubble fade-up typing-bubble-container';
    typingBubble.innerHTML = `
      <div class="message-avatar">
        <i data-lucide="bot" style="width: 18px; height: 18px;"></i>
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
    }, 1400);
  }

  function simulateBotReply(query) {
    const langObj = replies[currentLang] || replies['en'];
    let reply = langObj['default'];
    
    const lowerQuery = query.toLowerCase();
    
    const isCpr = lowerQuery.includes('cpr') || lowerQuery.includes('सीपीआर') || lowerQuery.includes('সিপিআর') || lowerQuery.includes('સીપીઆર');
    const isSnake = lowerQuery.includes('bite') || lowerQuery.includes('snake') || lowerQuery.includes('काट') || lowerQuery.includes('साप') || lowerQuery.includes('દં') || lowerQuery.includes('কামড়') || lowerQuery.includes('கடி') || lowerQuery.includes('కరి') || lowerQuery.includes('ಕಚ್ಚಿ') || lowerQuery.includes('കടി');
    const isBurns = lowerQuery.includes('burn') || lowerQuery.includes('जल') || lowerQuery.includes('भाज') || lowerQuery.includes('পোড়') || lowerQuery.includes('દાઝ') || lowerQuery.includes('ਸੜ') || lowerQuery.includes('தீக்') || lowerQuery.includes('కాలి') || lowerQuery.includes('ಸುಟ್ಟ') || lowerQuery.includes('പൊള്ള');
    const isAccident = lowerQuery.includes('accident') || lowerQuery.includes('दुर्घटना') || lowerQuery.includes('अपघात') || lowerQuery.includes('অকস্মাৎ') || lowerQuery.includes('અકસ્માત') || lowerQuery.includes('ਹਾਦਸਾ') || lowerQuery.includes('விபத்து') || lowerQuery.includes('ప్రమాదం') || lowerQuery.includes('ಅಪಘಾತ') || lowerQuery.includes('അപകടം');
    const isFlood = lowerQuery.includes('flood') || lowerQuery.includes('evacuate') || lowerQuery.includes('बाढ़') || lowerQuery.includes('पूर') || lowerQuery.includes('বন্যা') || lowerQuery.includes('પૂર') || lowerQuery.includes('ਹੜ੍ਹ') || lowerQuery.includes('வெள்ள') || lowerQuery.includes('వరద') || lowerQuery.includes('ಪ್ರವಾಹ') || lowerQuery.includes('വെള്ളപ്പൊക്കം');
    const isElectric = lowerQuery.includes('shock') || lowerQuery.includes('electric') || lowerQuery.includes('बिजلی') || lowerQuery.includes('वीज') || lowerQuery.includes('বৈদ্যুতিক') || lowerQuery.includes('વીજળી') || lowerQuery.includes('ਝਟਕਾ') || lowerQuery.includes('மின்சார') || lowerQuery.includes('విద్యుత్') || lowerQuery.includes('ವಿದ್ಯುತ್') || lowerQuery.includes('വൈദ്യുത');

    if (isCpr) reply = langObj['cpr'];
    else if (isSnake) reply = langObj['snake'];
    else if (isBurns) reply = langObj['burns'];
    else if (isAccident) reply = langObj['accident'];
    else if (isFlood) reply = langObj['flood'];
    else if (isElectric) reply = langObj['electric'];

    appendBotMessage(reply);
  }

  function handleSend() {
    if (!chatInputField) return;
    const text = chatInputField.value.trim();
    if (!text) return;
    
    // Trigger transition on send
    startChatSession();
    
    appendUserMessage(text);
    chatInputField.value = '';
    
    setTimeout(() => {
      showTypingAndReply(text);
    }, 600);
  }

  if (chatSendBtn && chatInputField) {
    chatSendBtn.addEventListener('click', handleSend);
    chatInputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleSend();
      }
    });
  }

  // 3b. Quick Action Chips click event listeners
  const bindChipsListeners = () => {
    const chips = document.querySelectorAll('.chip');
    chips.forEach(chip => {
      chip.replaceWith(chip.cloneNode(true));
    });

    document.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        // Trigger welcome screen fade transitions on chip click
        startChatSession();

        const query = chip.getAttribute('data-query');
        let textToSend = query;
        const activeTranslation = RescueTranslations.data[currentLang] || RescueTranslations.data['en'];
        
        if (query.includes('CPR') && activeTranslation['chip_cpr']) textToSend = activeTranslation['chip_cpr'];
        else if (query.includes('snake') && activeTranslation['chip_snake']) textToSend = activeTranslation['chip_snake'];
        else if (query.includes('burns') && activeTranslation['chip_burns']) textToSend = activeTranslation['chip_burns'];
        else if (query.includes('accident') && activeTranslation['chip_accident']) textToSend = activeTranslation['chip_accident'];
        else if (query.includes('flood') && activeTranslation['chip_flood']) textToSend = activeTranslation['chip_flood'];
        else if (query.includes('electric') && activeTranslation['chip_electric']) textToSend = activeTranslation['chip_electric'];
        
        appendUserMessage(textToSend);
        setTimeout(() => {
          showTypingAndReply(textToSend);
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

  // 4. Scroll Fade-in Observer
  const featuresSection = document.getElementById('features-section');
  if (featuresSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    observer.observe(featuresSection);
  }

  // 5. Intercept language changed event from main.js
  document.addEventListener('rescueLangChanged', (e) => {
    const nextLang = e.detail.lang;
    currentLang = nextLang;

    // Reset placeholder loops
    clearTimeout(typingTimeout);
    charIndex = 0;
    placeholderIndex = 0;
    isDeleting = false;
    typePlaceholder();

    // Re-bind chips listeners to pull translated labels
    bindChipsListeners();
  });
});
