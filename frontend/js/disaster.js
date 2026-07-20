// disaster.js - Disaster Safety Assessment and Recommendation Flow

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inject custom page-specific translation extensions
  const disasterTranslations = {
    en: {
      dis_dashboard_title: "Disaster Safety",
      dis_dashboard_subtitle: "Select a disaster to get smart guidance and stay safe",
      dis_common_title: "Common Disasters",
      dis_ai_banner_title: "Not sure what to do?",
      dis_ai_banner_text: "Ask our AI Assistant for help anytime.",
      dis_situation_question: "What is happening?",
      dis_situation_subtitle: "Select the situation that matches what happened.",
      step_situation: "Situation",
      step_help: "Help",
      step_disaster_selected: "Disaster Selected",
      step_situation_identified: "Situation Identified",
      step_guide_ready: "Guide Ready",
      recommended_action_pill: "Recommended Action",
      what_will_get_title: "What will you get?",
      get_item_1: "Immediate first aid steps",
      get_item_2: "What to do and what not to do",
      get_item_3: "When to seek medical help",
      get_item_4: "Find nearest hospital",
      btn_open_emergency_guide: "Open Emergency Guide",
      btn_open_emergency_guide_sub: "Step-by-step first aid instructions",
      find_hospital_sub: "Locate the nearest medical facilities",
      emergency_contacts_title: "Emergency Contacts",
      emergency_contacts_sub: "Call ambulance, police, fire & more",
      emergency_call_title: "In an emergency? Call 112",
      emergency_call_desc: "Share your location and get help fast.",
      btn_call_112: "Call 112"
    },
    hi: {
      dis_dashboard_title: "आपदा सुरक्षा",
      dis_dashboard_subtitle: "स्मार्ट मार्गदर्शन प्राप्त करने और सुरक्षित रहने के लिए एक आपदा चुनें",
      dis_common_title: "सामान्य आपदाएं",
      dis_ai_banner_title: "पता नहीं क्या करना है?",
      dis_ai_banner_text: "किसी भी समय सहायता के लिए हमारे एआई सहायक से पूछें।",
      dis_situation_question: "क्या हो रहा है?",
      dis_situation_subtitle: "उस स्थिति का चयन करें जो आपके साथ मेल खाती है।",
      step_situation: "स्थिति",
      step_help: "मदद",
      step_disaster_selected: "आपदा चयनित",
      step_situation_identified: "स्थिति पहचानी गई",
      step_guide_ready: "गाइड तैयार",
      recommended_action_pill: "अनुशंसित कार्रवाई",
      what_will_get_title: "आपको क्या मिलेगा?",
      get_item_1: "तत्काल प्राथमिक उपचार के चरण",
      get_item_2: "क्या करें और क्या न करें",
      get_item_3: "चिकित्सकीय सहायता कब लें",
      get_item_4: "नजदीकी अस्पताल खोजें",
      btn_open_emergency_guide: "आपातकालीन गाइड खोलें",
      btn_open_emergency_guide_sub: "चरण-दर-चरण प्राथमिक चिकित्सा निर्देश",
      find_hospital_sub: "नजदीकी चिकित्सा सुविधाओं का पता लगाएं",
      emergency_contacts_title: "आपातकालीन संपर्क",
      emergency_contacts_sub: "एम्बुलेंस, पुलिस, फायर आदि को कॉल करें",
      emergency_call_title: "आपातकाल में? 112 पर कॉल करें",
      emergency_call_desc: "अपना स्थान साझा करें और तेजी से मदद प्राप्त करें।",
      btn_call_112: "कॉल 112"
    },
    mr: {
      dis_dashboard_title: "आपत्ती सुरक्षा",
      dis_dashboard_subtitle: "स्मार्ट मार्गदर्शन मिळवण्यासाठी आणि सुरक्षित राहण्यासाठी आपत्ती निवडा",
      dis_common_title: "सामान्य आपत्ती",
      dis_ai_banner_title: "नक्की काय करावे सुचत नाही का?",
      dis_ai_banner_text: "मदतीसाठी आमच्या एआई सहाय्यकाला कधीही विचारा.",
      dis_situation_question: "काय घडत आहे?",
      dis_situation_subtitle: "तुमच्या परिस्थितीशी जुळणारा पर्याय निवडा.",
      step_situation: "परिस्थिती",
      step_help: "मदत",
      step_disaster_selected: "आपत्ती निवडली",
      step_situation_identified: "परिस्थिती ओळखली",
      step_guide_ready: "मार्गदर्शिका तयार",
      recommended_action_pill: "शिफारस केलेली कृती",
      what_will_get_title: "तुम्हाला काय मिळेल?",
      get_item_1: "त्वरित प्रथमोपचार पायऱ्या",
      get_item_2: "काय करावे आणि काय करू नये",
      get_item_3: "वैद्यकीय मदत केव्हा घ्यावी",
      get_item_4: "नजीकचे रुग्णालय शोधा",
      btn_open_emergency_guide: "आपत्कालीन मार्गदर्शिका उघडा",
      btn_open_emergency_guide_sub: "टप्प्याटप्प्याने प्रथमोपचार सूचना",
      find_hospital_sub: "नजीकच्या वैद्यकीय सुविधा शोधा",
      emergency_contacts_title: "आपत्कालीन संपर्क",
      emergency_contacts_sub: "अँब्युलन्स, पोलीस, अग्निशामक दल आणि अधिक संपर्क",
      emergency_call_title: "आपत्कालीन परिस्थितीत? ११२ वर कॉल करा",
      emergency_call_desc: "तुमचे स्थान सामायिक करा आणि जलद मदत मिळवा.",
      btn_call_112: "कॉल ११२"
    }
  };

  if (window.RescueTranslations && window.RescueTranslations.data) {
    for (const lang in disasterTranslations) {
      if (window.RescueTranslations.data[lang]) {
        Object.assign(window.RescueTranslations.data[lang], disasterTranslations[lang]);
      }
    }
  }

  // State Tracking
  let currentLang = localStorage.getItem('rescue_lang') || 'en';
  let activeDisasterId = null;
  let activeSituationId = null;

  // 2. Extensible decision flow configurations using Arrays / Objects
  const disastersConfig = {
    earthquake: {
      id: "earthquake",
      name: { en: "Earthquake", hi: "भूकंप", mr: "भूकंप" },
      desc: {
        en: "Sudden shaking of the ground caused by movement of tectonic plates.",
        hi: "टेक्टोनिक प्लेटों की गति के कारण जमीन का अचानक हिलना।",
        mr: "भूगर्भातील प्लेट्सच्या हालचालींमुळे जमिनीला बसणारे तीव्र धक्का."
      },
      bgImage: "../assets/images/disaster/earthquake.png",
      icon: "🏢",
      situations: [
        {
          id: "collapsed",
          title: { en: "Building Collapsed", hi: "इमारत ढहना", mr: "इमारत कोसळली" },
          subtitle: { en: "Structure damaged or collapsed", hi: "संरचना क्षतिग्रस्त या ढह गई है", mr: "इमारत कोसळली किंवा खचली आहे" },
          icon: "🏢",
          module: "rescue",
          moduleName: { en: "Rescue Guide", hi: "बचाव गाइड", mr: "बचाव मार्गदर्शिका" }
        },
        {
          id: "fire",
          title: { en: "Fire Started", hi: "आग लग गई", mr: "आग लागली" },
          subtitle: { en: "Fire or smoke after earthquake", hi: "भूकंप के बाद आग या धुआं", mr: "भूकंपानंतर आग किंवा धूर पसरला" },
          icon: "🔥",
          module: "fire",
          moduleName: { en: "Fire Safety Guide", hi: "अग्नि सुरक्षा गाइड", mr: "अग्नि सुरक्षा मार्गदर्शिका" }
        },
        {
          id: "gas",
          title: { en: "Gas Leak", hi: "गैस रिसाव", mr: "गॅस गळती" },
          subtitle: { en: "Smell of gas or leak suspected", hi: "गैस की गंध या रिसाव का संदेह", mr: "गॅसची दुर्गंधी किंवा गळतीचा संशय" },
          icon: "⚠️",
          module: "gas",
          moduleName: { en: "Gas Leak Guide", hi: "गैस रिसाव गाइड", mr: "गॅस गळती मार्गदर्शिका" }
        },
        {
          id: "unconscious",
          title: { en: "Someone Unconscious", hi: "कोई बेहोश है", mr: "कोणीतरी बेशुद्ध आहे" },
          subtitle: { en: "Person not responding", hi: "व्यक्ति प्रतिक्रिया नहीं दे रहा है", mr: "बेशुद्ध पडलेला माणूस प्रतिसाद देत नाही" },
          icon: "❤️",
          module: "cpr",
          moduleName: { en: "CPR Guide", hi: "सीपीआर गाइड", mr: "सीपीआर मार्गदर्शिका" }
        },
        {
          id: "bleeding",
          title: { en: "Heavy Bleeding", hi: "गंभीर रक्तस्राव", mr: "तीव्र रक्तस्राव" },
          subtitle: { en: "Severe bleeding or injury", hi: "गंभीर चोट या खून बहना", mr: "गंभीर दुखापत किंवा रक्त वाहणे" },
          icon: "🩸",
          module: "bleeding",
          moduleName: { en: "Bleeding Guide", hi: "रक्तस्राव गाइड", mr: "रक्तस्राव मार्गदर्शिका" }
        },
        {
          id: "fracture",
          title: { en: "Possible Fracture", hi: "संभावित फ्रैक्चर", mr: "संभाव्य फ्रॅक्चर" },
          subtitle: { en: "Suspected bone fracture", hi: "हड्डी टूटने का संदेह", mr: "हाड मोडल्याचा संशय" },
          icon: "🦴",
          module: "fracture",
          moduleName: { en: "Fracture Guide", hi: "फ्रैक्चर गाइड", mr: "फ्रॅक्चर मार्गदर्शिका" }
        },
        {
          id: "debris",
          title: { en: "Trapped Under Debris", hi: "मलबे के नीचे फंसा", mr: "मलब्याखाली अडकले" },
          subtitle: { en: "Someone trapped under rubble", hi: "कोई मलबे या ढहने के नीचे फंसा है", mr: "ढिगाऱ्याखाली अडकलेला माणूस" },
          icon: "🪨",
          module: "rescue",
          moduleName: { en: "Rescue Guide", hi: "बचाव गाइड", mr: "बचाव मार्गदर्शिका" }
        },
        {
          id: "outage",
          title: { en: "Power Outage / Darkness", hi: "बिजली गुल / अंधेरा", mr: "वीज पुरवठा खंडित / अंधार" },
          subtitle: { en: "Electricity gone or complete dark", hi: "पूरी तरह से बिजली चली गई है", mr: "पूर्णपणे अंधार किंवा वीज बंद" },
          icon: "🔦",
          module: "safety",
          moduleName: { en: "Safety Tips", hi: "सुरक्षा युक्तियाँ", mr: "सुरक्षा टिप्स" }
        }
      ]
    },
    flood: {
      id: "flood",
      name: { en: "Flood", hi: "बाढ़", mr: "पूर" },
      desc: {
        en: "Overflow of water that submerges land that is usually dry.",
        hi: "पानी का अत्यधिक प्रवाह जो आमतौर पर सूखी रहने वाली भूमि को जलमग्न कर देता है।",
        mr: "नद्या किंवा समुद्राच्या पाण्याची पातळी वाढून जमीन पाण्याखाली जाणे."
      },
      bgImage: "../assets/images/disaster/flood.png",
      icon: "🌊",
      situations: [
        {
          id: "trapped_water",
          title: { en: "Trapped in Rising Water", hi: "बढ़ते पानी में फंसे", mr: "वाढत्या पाण्यात अडकले" },
          subtitle: { en: "Water levels rising quickly", hi: "पानी का स्तर तेजी से बढ़ रहा है", mr: "पाण्याची पातळी झपाट्याने वाढत आहे" },
          icon: "🌊",
          module: "rescue",
          moduleName: { en: "Rescue Guide", hi: "बचाव गाइड", mr: "बचाव मार्गदर्शिका" }
        },
        {
          id: "snake",
          title: { en: "Snake Bite", hi: "सांप का काटना", mr: "सर्पदंश" },
          subtitle: { en: "Bitten by snake in water", hi: "पानी में तैरते सांप ने काटा", mr: "पाण्यातील सापाने चावा घेतला" },
          icon: "🐍",
          module: "snake",
          moduleName: { en: "Snake Bite Guide", hi: "सांप के काटने की गाइड", mr: "सर्पदंश मार्गदर्शिका" }
        },
        {
          id: "unconscious",
          title: { en: "Someone Unconscious", hi: "कोई बेहोश है", mr: "कोणीतरी बेशुद्ध आहे" },
          subtitle: { en: "Person swallowed water/drowning", hi: "पानी निगलने के बाद बेहोशी", mr: "पाण्यात बुडाल्यामुळे बेशुद्ध पडणे" },
          icon: "❤️",
          module: "cpr",
          moduleName: { en: "CPR Guide", hi: "सीपीआर गाइड", mr: "सीपीआर मार्गदर्शिका" }
        },
        {
          id: "bleeding",
          title: { en: "Heavy Bleeding", hi: "गंभीर रक्तस्राव", mr: "तीव्र रक्तस्राव" },
          subtitle: { en: "Cut from debris in flood water", hi: "बाढ़ के मलबे से कटना या चोट", mr: "पुरातील कचऱ्यामुळे खोल जखम होणे" },
          icon: "🩸",
          module: "bleeding",
          moduleName: { en: "Bleeding Guide", hi: "रक्तस्राव गाइड", mr: "रक्तस्राव मार्गदर्शिका" }
        }
      ]
    },
    fire: {
      id: "fire",
      name: { en: "Fire", hi: "आग", mr: "आग" },
      desc: {
        en: "Uncontrolled burning that causes damage to life, property and environment.",
        hi: "अनियंत्रित आग जो जीवन, संपत्ति और पर्यावरण को नुकसान पहुंचाती है।",
        mr: "आगीचा अनियंत्रित प्रसार ज्यामुळे जीवित व वित्तहानी होते."
      },
      bgImage: "../assets/images/disaster/fire.png",
      icon: "🔥",
      situations: [
        {
          id: "fire_spread",
          title: { en: "Fire Spreading", hi: "आग फैलना", mr: "आग वेगाने पसरत आहे" },
          subtitle: { en: "Flame spreading inside building", hi: "इमारत के अंदर आग की लपटें फैल रही हैं", mr: "इमारतीत ज्वाळा पसरल्या आहेत" },
          icon: "🔥",
          module: "fire_guide",
          moduleName: { en: "Fire Safety Guide", hi: "अग्नि सुरक्षा गाइड", mr: "अग्नि सुरक्षा मार्गदर्शिका" }
        },
        {
          id: "burns",
          title: { en: "Severe Burns", hi: "गंभीर रूप से जलना", mr: "गंभीर भाजले" },
          subtitle: { en: "Thermal burns on skin", hi: "त्वचा का आग से जलना", mr: "उष्णतेने त्वचा होरपळणे" },
          icon: "🏥",
          module: "burns",
          moduleName: { en: "Burns Guide", hi: "जलने का प्राथमिक उपचार", mr: "भाजल्यावरील मार्गदर्शिका" }
        },
        {
          id: "smoke",
          title: { en: "Smoke Inhalation", hi: "धुआं सांस में जाना", mr: "धूर श्वासात गेला" },
          subtitle: { en: "Trouble breathing, choking", hi: "दम घुटना, सांस लेने में तकलीफ", mr: "दम कोंडणे किंवा श्वास घेण्यास अडचण" },
          icon: "💨",
          module: "cpr",
          moduleName: { en: "CPR Guide", hi: "सीपीआर गाइड", mr: "सीपीआर मार्गदर्शिका" }
        }
      ]
    },
    cyclone: {
      id: "cyclone",
      name: { en: "Cyclone", hi: "चक्रवात", mr: "वादळ" },
      desc: {
        en: "Large scale air mass circulations causing severe storms and strong winds.",
        hi: "तेज हवाओं और मूसलाधार बारिश के साथ आने वाला भयंकर समुद्री तूफान।",
        mr: "तीव्र वाऱ्यासह येणारे प्रचंड चक्रीवादळ आणि मुसळधार पाऊस."
      },
      bgImage: "../assets/images/disaster/cyclone.png",
      icon: "🌪",
      situations: [
        {
          id: "debris_injury",
          title: { en: "Flying Debris Injury", hi: "उड़ते मलबे से चोट", mr: "उडून आलेल्या कचऱ्यामुळे दुखापत" },
          subtitle: { en: "Heavy bleeding from wind damage", hi: "तेज हवा से उड़े मलबे से रक्तस्राव", mr: "वादळी वाऱ्यामुळे उडालेल्या पत्र्यांनी जखम" },
          icon: "🌪️",
          module: "bleeding",
          moduleName: { en: "Bleeding Guide", hi: "रक्तस्राव गाइड", mr: "रक्तस्राव मार्गदर्शिका" }
        },
        {
          id: "unconscious",
          title: { en: "Someone Unconscious", hi: "कोई बेहोश है", mr: "कोणीतरी बेशुद्ध आहे" },
          subtitle: { en: "Struck by collapsing objects", hi: "किसी वस्तु के गिरने से बेहोशी", mr: "वस्तू अंगावर पडून बेशुद्ध पडणे" },
          icon: "❤️",
          module: "cpr",
          moduleName: { en: "CPR Guide", hi: "सीपीआर गाइड", mr: "सीपीआर मार्गदर्शिका" }
        },
        {
          id: "downed_wire",
          title: { en: "Downed Power Line", hi: "गिरा हुआ बिजली का तार", mr: "तुटलेली विजेची तार" },
          subtitle: { en: "Sparking wires or shock hazard", hi: "तार से करंट का खतरा", mr: "विजेचा धक्का लागण्याचा धोका" },
          icon: "⚡",
          module: "safety",
          moduleName: { en: "Safety Tips", hi: "सुरक्षा युक्तियाँ", mr: "सुरक्षा टिप्स" }
        }
      ]
    },
    landslide: {
      id: "landslide",
      name: { en: "Landslide", hi: "भूस्खलन", mr: "दरड कोसळणे" },
      desc: {
        en: "Downward movement of rocks, soil or debris on a sloped surface.",
        hi: "पहाड़ी ढलानों से चट्टानों, मिट्टी और मलबे का तेजी से नीचे खिसकना।",
        mr: "डोंगराचा कडा किंवा माती आणि दगड खाली कोसळणे."
      },
      bgImage: "../assets/images/disaster/landslide.png",
      icon: "⛰",
      situations: [
        {
          id: "trapped_rubble",
          title: { en: "Trapped Under Rubble", hi: "मलबे के नीचे दबे", mr: "ढिगाऱ्याखाली गाडले गेले" },
          subtitle: { en: "Rocks and mud covering person", hi: "मिट्टी और पत्थरों के नीचे दबना", mr: "माती आणि दगडांखाली अडकणे" },
          icon: "🪨",
          module: "rescue",
          moduleName: { en: "Rescue Guide", hi: "बचाव गाइड", mr: "बचाव मार्गदर्शिका" }
        },
        {
          id: "fracture",
          title: { en: "Possible Fracture", hi: "संभावित फ्रैक्चर", mr: "संभाव्य फ्रॅक्चर" },
          subtitle: { en: "Broken limb from rolling rocks", hi: "पत्थर गिरने से हड्डी टूटना", mr: "दगड कोसळल्यामुळे हाड मोडणे" },
          icon: "🦴",
          module: "fracture",
          moduleName: { en: "Fracture Guide", hi: "फ्रैक्चर गाइड", mr: "फ्रॅक्चर मार्गदर्शिका" }
        },
        {
          id: "bleeding",
          title: { en: "Heavy Bleeding", hi: "गंभीर रक्तस्राव", mr: "तीव्र रक्तस्राव" },
          subtitle: { en: "Cuts and open wounds from rocks", hi: "चट्टानों से लगी गंभीर चोट", mr: "खडकांमुळे झालेली जखम" },
          icon: "🩸",
          module: "bleeding",
          moduleName: { en: "Bleeding Guide", hi: "रक्तस्राव गाइड", mr: "रक्तस्राव मार्गदर्शिका" }
        }
      ]
    },
    thunderstorm: {
      id: "thunderstorm",
      name: { en: "Thunderstorm", hi: "बिजली कड़कना", mr: "वीज चमकणे" },
      desc: {
        en: "Storms with thunder, lightning and heavy rainfall or hail.",
        hi: "बिजली कड़कने, गरजने और भारी बारिश के साथ आने वाला तूफान।",
        mr: "वीज चमकणे, गारा पडणे आणि अतिवृष्टीसह येणारे वादळ."
      },
      bgImage: "../assets/images/disaster/thunderstorm.png",
      icon: "⚡",
      situations: [
        {
          id: "lightning",
          subtitle: { en: "Person struck directly, unresponsive", hi: "बिजلی गिरने से बेहोश व्यक्ति", mr: "वीज पडून बेशुद्ध पडलेला माणूस" },
          icon: "⚡",
          module: "cpr",
          moduleName: { en: "CPR Guide", hi: "सीपीआर गाइड", mr: "सीपीआर मार्गदर्शिका" }
        },
        {
          id: "power_outage",
          title: { en: "Power Outage / Darkness", hi: "बिजلی गुल / अंधेरा", mr: "वीज खंडित / अंधार" },
          subtitle: { en: "Lights out, emergency tips needed", hi: "बिजلی बंद, सुरक्षा उपायों की आवश्यकता", mr: "सर्व वीज गेली आहे, काय खबरदारी घ्यावी" },
          icon: "🔦",
          module: "safety",
          moduleName: { en: "Safety Tips", hi: "सुरक्षा युक्तियाँ", mr: "सुरक्षा टिप्स" }
        }
      ]
    },
    heatwave: {
      id: "heatwave",
      name: { en: "Heatwave", hi: "लू (Heatwave)", mr: "उष्णतेची लाट" },
      desc: {
        en: "Period of excessively hot weather that can be hazardous to health.",
        hi: "अत्यधिक गर्मी और लू की स्थिति जो स्वास्थ्य के लिए घातक हो सकती है।",
        mr: "प्रचंड उकाडा आणि आरोग्यास घातक ठरणारी उष्णतेची लाट."
      },
      bgImage: "../assets/images/disaster/heatwave.png",
      icon: "☀",
      situations: [
        {
          id: "heat_stroke",
          title: { en: "Heat Stroke", hi: "लू लगना (Heat Stroke)", mr: "उष्माघात" },
          subtitle: { en: "High body heat, unconsciousness", hi: "अत्यधिक शारीरिक तापमान, बेहोशी", mr: "शरीराचे वाढलेले तापमान, बेशुद्ध पडणे" },
          icon: "🥵",
          module: "cpr",
          moduleName: { en: "CPR Guide / प्राथमिक उपचार", mr: "सीपीआर / प्रथमोपचार" }
        }
      ]
    },
    coldwave: {
      id: "coldwave",
      name: { en: "Cold Wave", hi: "शीत लहर", mr: "थंडीची लाट" },
      desc: {
        en: "Prolonged cold weather conditions that can cause health risks.",
        hi: "अत्यधिक ठंड और शीतलहर जो शरीर के तापमान को बहुत कम कर देती है।",
        mr: "अतिशय तीव्र थंडी आणि तापमान कमालीचे घसरणे."
      },
      bgImage: "../assets/images/disaster/coldwave.png",
      icon: "❄",
      situations: [
        {
          id: "hypothermia",
          title: { en: "Hypothermia", hi: "हाइपोथर्मिया (ठंड लगना)", mr: "हायपोथर्मिया (अति थंडी)" },
          subtitle: { en: "Extreme shivering, confusion", hi: "शरीर अत्यधिक ठंडा होना, कांपना", mr: "थंडीने शरीर गोठणे, थरथरणे" },
          icon: "🥶",
          module: "cpr",
          moduleName: { en: "CPR / Warmup Guide", hi: "सीपीआर / वार्मअप गाइड", mr: "सीपीआर / प्रथमोपचार" }
        }
      ]
    },
    pandemic: {
      id: "pandemic",
      name: { en: "Pandemic", hi: "महामारी", mr: "साथीचा रोग" },
      desc: {
        en: "Widespread outbreak of a disease that affects a large population.",
        hi: "किसी संक्रामक बीमारी का बड़े पैमाने पर फैलना जो व्यापक आबादी को प्रभावित करता है।",
        mr: "मोठ्या लोकसंख्येमध्ये वेगाने पसरणारा संसर्गजन्य रोग."
      },
      bgImage: "../assets/images/disaster/pandemic.png",
      icon: "😷",
      situations: [
        {
          id: "infection_symptoms",
          title: { en: "Infection Symptoms", hi: "संक्रमण के लक्षण", mr: "संसर्गाची लक्षणे" },
          subtitle: { en: "Fever, cough, body ache", hi: "बुखार, खांसी, शरीर में दर्द", mr: "ताप, खोकला, अंगदुखी" },
          icon: "🤒",
          module: "pandemic",
          moduleName: { en: "Pandemic Guide", hi: "महामारी गाइड", mr: "साथीचा रोग मार्गदर्शिका" }
        },
        {
          id: "quarantine",
          title: { en: "Quarantine & Hygiene", hi: "क्वारंटाइन और स्वच्छता", mr: "विलगीकरण आणि स्वच्छता" },
          subtitle: { en: "Preventing spread of virus", hi: "वायरस फैलने से रोकना", mr: "व्हायरसचा प्रसार रोखणे" },
          icon: "🧴",
          module: "pandemic",
          moduleName: { en: "Pandemic Guide", hi: "महामारी गाइड", mr: "साथीचा रोग मार्गदर्शिका" }
        },
        {
          id: "breathing_difficulty",
          title: { en: "Severe Breathing Issue", hi: "सांस लेने में गंभीर समस्या", mr: "श्वास घेण्यास तीव्र त्रास" },
          subtitle: { en: "Choking or gasping for air", hi: "दम घुटना या सांस फूलना", mr: "श्वास कोंडणे किंवा धाप लागणे" },
          icon: "❤️",
          module: "cpr",
          moduleName: { en: "CPR Guide", hi: "सीपीआर गाइड", mr: "सीपीआर मार्गदर्शिका" }
        }
      ]
    }
  };

  // Simulated guide steps for modules that do not have their own physical HTML file
  const simulatedGuides = {
    rescue: {
      title: { en: "Rescue Emergency Guide", hi: "बचाव आपातकालीन गाइड", mr: "बचाव આપत्कालीन मार्गदर्शिका" },
      alert: {
        en: "Do NOT attempt to pull heavy, unstable rubble if it risks secondary collapse.",
        hi: "यदि मलबे के गिरने का खतरा हो, तो उसे खींचने का प्रयास न करें।",
        mr: "मलब्याखालील जड दगड काढण्याचा प्रयत्न करू नका जर त्यामुळे आणखी दरड कोसळण्याची भीती असेल."
      },
      steps: {
        en: [
          "Protect your face and airways with a clean cloth or mask to avoid dust inhalation.",
          "Ensure secondary collapses are not imminent before entering or helping.",
          "Establish contact: call out or tap rhythmically on metal pipes or rubble to signal.",
          "Clear loose debris from around the person's mouth and nose first.",
          "If trapped, stay calm, avoid shouting continuously (conserve oxygen), and wait for response."
        ],
        hi: [
          "धूल से बचने के लिए अपने चेहरे और सांस की नली को साफ कपड़े या मास्क से ढकें।",
          "मलबे में प्रवेश करने से पहले यह सुनिश्चित करें कि दोबारा मलबा गिरने का खतरा न हो।",
          "संपर्क स्थापित करें: आवाज लगाएं या लोहे के पाइप या मलबे पर ठक-ठक करें।",
          "फंसे व्यक्ति के मुंह और नाक के आसपास से पहले मलबा हटाएं।",
          "यदि आप खुद फंसा हैं, तो शांत रहें और ऑक्सीजन बचाने के लिए लगातार न चिल्लाएं।"
        ],
        mr: [
          "धुळीपासून वाचण्यासाठी नाक आणि तोंड स्वच्छ कापडाने झाकून घ्या.",
          "ढिगाऱ्यात प्रवेश करण्यापूर्वी आजूबाजूचा परिसर सुरक्षित असल्याची खात्री करा.",
          "संपर्क साधा: आवाज द्या किंवा लोखंडी पाईपवर अथवा दगडावर ठक-ठक करून आवाज करा.",
          "अडकलेल्या व्यक्तीच्या तोंड आणि नाकाभोवतीचा ढिगारा आधी काढा.",
          "तुम्ही स्वतः अडकले असल्यास शांत राहा आणि ऑक्सिजन वाचवण्यासाठी सतत ओरडू नका."
        ]
      }
    },
    fracture: {
      title: { en: "Fracture Emergency Guide", hi: "फ्रैक्चर आपातकालीन गाइड", mr: "फ्रॅक्चर प्रथमोपचार मार्गदर्शिका" },
      alert: {
        en: "Do NOT try to push a protruding bone back in or realign the joint.",
        hi: "बाहर निकली हुई हड्डी को अंदर धकेलने या जोड़ को सीधा करने का प्रयास न करें।",
        mr: "बाहेर आलेले हाड आत ढकलण्याचा किंवा सांधा सरळ करण्याचा प्रयत्न अजिबात करू नका."
      },
      steps: {
        en: [
          "Stop any bleeding first by applying pressure around the wound, not directly on the bone.",
          "Immobilize the injured area using splints, rolled newspapers, or boards.",
          "Secure splints loosely with bandages or cloth so blood circulation is not cut off.",
          "Apply an ice pack wrapped in a cloth to reduce swelling (do not put ice directly on skin).",
          "Elevate the broken limb if possible and comfort the patient until help arrives."
        ],
        hi: [
          "हड्डी पर सीधा दबाव डाले बिना, घाव के आसपास दबाव डालकर पहले खून बहना रोकें।",
          "खपच्ची, मुड़े हुए समाचार पत्रों या लकड़ी के तख्तों का उपयोग करके घायल हिस्से को स्थिर करें।",
          "खपच्ची को ढीला बांधें ताकि रक्त संचार प्रभावित न हो।",
          "सूजन कम करने के लिए कपड़े में लपेटकर बर्फ लगाएं (बर्फ सीधे त्वचा पर न लगाएं)।",
          "यदि संभव हो तो टूटे हुए अंग को थोड़ा ऊपर उठाएं और पीड़ित को शांत रखें।"
        ],
        mr: [
          "हाडावर थेट दाब न देता, आधी जखमेच्या आजूबाजूला दाब देऊन रक्तस्राव थांबवा.",
          "लाकुड किंवा गुंडाळलेल्या वर्तमानपत्राचा आधार (Splints) देऊन अवयव हलणार नाही याची काळजी घ्या.",
          "आधार सैल बांधा जेणेकरून रक्तप्रवाह खंडित होणार नाही.",
          "सूज कमी करण्यासाठी कापडात गुंडाळलेला बर्फ ठेवा (बर्फ थेट त्वचेवर लावू नका).",
          "शक्य असल्यास जखमी भाग उंच ठेवा आणि वैद्यकीय मदत येईपर्यंत धीर द्या."
        ]
      }
    },
    safety: {
      title: { en: "Survival Safety Tips", hi: "अस्तित्व और आपातकालीन सुरक्षा युक्तियाँ", mr: "आपत्कालीन सुरक्षा टिप्स" },
      alert: {
        en: "Always keep emergency power sources and clean water accessible.",
        hi: "आपातकालीन ऊर्जा स्रोतों और साफ पानी को हमेशा सुलभ रखें।",
        mr: "आपत्कालीन ऊर्जेचे स्त्रोत आणि पिण्याचे स्वच्छ पाणी नेहमी सोबत ठेवा."
      },
      steps: {
        en: [
          "Turn off or unplug sensitive electronic appliances to avoid surge damage when power returns.",
          "Use flashlights or battery-powered lanterns instead of candles to minimize fire risk.",
          "Keep refrigerator and freezer doors closed to prevent food spoilage.",
          "Stay clear of downed power lines or puddles near electricity poles.",
          "Conserve mobile battery: limit phone calls to emergency coordinate communications."
        ],
        hi: [
          "बिजली आने पर वोल्टेज के झटके से बचाने के लिए संवेदनशील उपकरणों को प्लग से निकाल दें।",
          "आग के खतरे को कम करने के लिए मोमबत्तियों के बजाय टॉर्च या लालटेन का उपयोग करें।",
          "भोजन को खराब होने से बचाने के लिए रेफ्रिजरेटर के दरवाजे बंद रखें।",
          "गिरे हुए बिजली के तारों या बिजली के खंभों के पास जमा पानी से दूर रहें।",
          "मोबाइल की बैटरी बचाएं: केवल आपातकालीन संपर्कों के लिए ही फोन का उपयोग करें।"
        ],
        mr: [
          "वीज आल्यावर होणारे नुकसान टाळण्यासाठी महत्त्वाचे इलेक्ट्रॉनिक उपकरण बंद करा.",
          "आगीचा धोका टाळण्यासाठी मेणबत्ती ऐवजी विजेरी (टॉर्च) किंवा बॅटरीचा वापर करा.",
          "अन्न खराब होऊ नये म्हणून रेफ्रिजरेटरचे दरवाजे वारंवार उघडू नका.",
          "तुटलेल्या विजेच्या तारा किंवा खांबाजवळील साठलेल्या पाण्यापासून दूर राहा.",
          "मोबाईलची बॅटरी वाचवा: फोनचा वापर फक्त अत्यंत गरजेच्या आपत्कालीन संपर्कासाठीच करा."
        ]
      }
    },
    pandemic: {
      title: { en: "Pandemic Safety Guide", hi: "महामारी सुरक्षा गाइड", mr: "साथीचा रोग सुरक्षा मार्गदर्शिका" },
      alert: {
        en: "Always wear a mask and maintain social distancing to prevent spreading infection.",
        hi: "संक्रमण फैलने से रोकने के लिए हमेशा मास्क पहनें और सामाजिक दूरी बनाए रखें।",
        mr: "संसर्ग पसरण्यापासून रोखण्यासाठी नेहमी मास्क वापरा आणि सामाजिक अंतर ठेवा."
      },
      steps: {
        en: [
          "Wear a high-filtration mask (like N95) in public or crowded areas.",
          "Wash hands frequently with soap and water for at least 20 seconds, or use hand sanitizer.",
          "Practice social distancing: keep at least 6 feet distance from others.",
          "Monitor yourself for symptoms like fever, cough, shortness of breath, or loss of taste/smell.",
          "Quarantine or isolate immediately if you test positive or exhibit key symptoms."
        ],
        hi: [
          "सार्वजनिक या भीड़भाड़ वाले क्षेत्रों में उच्च-फिल्ट्रेशन मास्क (जैसे N95) पहनें।",
          "हाथों को बार-बार कम से कम 20 सेकंड के लिए साबुन और पानी से धोएं, या सैनिटाइज़र का उपयोग करें।",
          "सामाजिक दूरी का पालन करें: दूसरों से कम से कम 6 फीट की दूरी बनाए रखें।",
          "बुखार, खांसी, सांस लेने में तकलीफ, या स्वाद/गंध चले जाने जैसे लक्षणों की निगरानी करें।",
          "यदि आप सकारात्मक (पॉजिटिव) पाए जाते हैं या लक्षण दिखाते हैं, तो तुरंत खुद को क्वारंटाइन करें।"
        ],
        mr: [
          "सार्वजनिक किंवा गर्दीच्या ठिकाणी उच्च दर्जाचा मास्क (उदा. N95) वापरा.",
          "हाथ वारंवार कमीत कमी २० सेकंद साबण आणि पाण्याने धुवा किंवा सॅनिटायझर वापरा.",
          "सामाजिक अंतराचे पालन करा: इतरांपासून किमान ६ फूट अंतर ठेवा.",
          "ताप, खोकला, श्वास घेण्यास त्रास होणे किंवा चव/वास न येणे या लक्षणांवर लक्ष ठेवा.",
          "चाचणी पॉझिटिव्ह आल्यास किंवा लक्षणे दिसल्यास ताबडतोब स्वतःला क्वारंटाईन (विलगीकरण) करा."
        ]
      }
    },
    fire_guide: {
      title: { en: "Fire Safety & Evacuation Guide", hi: "अग्नि सुरक्षा और निकासी गाइड", mr: "अग्नि सुरक्षा आणि निर्वासन मार्गदर्शिका" },
      alert: {
        en: "Do NOT use elevators during a fire. Always use the stairs.",
        hi: "आग के दौरान लिफ्ट का उपयोग न करें। हमेशा सीढ़ियों का उपयोग करें।",
        mr: "आगीच्या वेळी लिफ्टचा वापर करू नका. नेहमी पायऱ्यांचा वापर करा."
      },
      steps: {
        en: [
          "Stay low to the ground to avoid inhaling toxic smoke and gases.",
          "Feel doors with the back of your hand before opening; if hot, do not open.",
          "If your clothes catch fire: Stop, Drop, and Roll.",
          "Evacuate the building immediately following emergency exit signs.",
          "Once outside, stay out and call emergency services (101 / 112)."
        ],
        hi: [
          "जहरीले धुएं और गैसों को सांस में लेने से बचने के लिए फर्श के करीब (नीचे) रहें।",
          "दरवाजे खोलने से पहले अपने हाथ के पीछे के हिस्से से उन्हें छूकर महसूस करें; यदि गर्म हो, तो न खोलें।",
          "यदि आपके कपड़ों में आग लग जाती है: रुकें, नीचे गिरें, और लुढ़कें (Stop, Drop, and Roll)।",
          "आपातकालीन निकास संकेतों का पालन करते हुए तुरंत इमारत से बाहर निकलें।",
          "एक बार बाहर निकलने के बाद, बाहर ही रहें और आपातकालीन सेवाओं (101 / 112) को कॉल करें।"
        ],
        mr: [
          "विषारी धूर आणि वायू श्वासात जाणे टाळण्यासाठी जमिनीलगत खाली राहा.",
          "दरवाजे उघडण्यापूर्वी हाताच्या मागच्या भागाने ते गरम आहेत का ते तपासा; गरम असल्यास उघडू नका.",
          "कपड्यांना आग लागल्यास: थांबा, खाली पडा आणि जमिनीवर लोळा (Stop, Drop, and Roll).",
          "आणीबाणीच्या बाहेर पडण्याच्या मार्गांचे (Emergency Exit) मार्गदर्शक चिन्हांचे पालन करून त्वरित इमारतीबाहेर पडा.",
          "एकदा बाहेर पडल्यावर पुन्हा आत जाऊ नका आणि आपत्कालीन सेवांना (१०१ / ११२) कॉल करा."
        ]
      }
    }
  };

  // DOM Navigation & Rendering Logic
  const dashboardView = document.getElementById('dashboard-view');
  const situationView = document.getElementById('situation-view');
  const recommendationView = document.getElementById('recommendation-view');

  const disasterCardsGrid = document.getElementById('disaster-cards-grid');
  const situationCardsGrid = document.getElementById('situation-cards-grid');

  function showScreen(viewElement) {
    const allViews = [dashboardView, situationView, recommendationView];

    // Animate current active view out
    const activeNow = allViews.find(v => v.classList.contains('active'));
    if (activeNow) {
      activeNow.style.opacity = '0';
      activeNow.style.transform = 'translateY(-15px)';

      setTimeout(() => {
        allViews.forEach(v => v.classList.remove('active'));

        viewElement.classList.add('active');
        // Let browser repaint
        setTimeout(() => {
          viewElement.style.opacity = '1';
          viewElement.style.transform = 'translateY(0)';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 30);
      }, 300);
    } else {
      viewElement.classList.add('active');
      viewElement.style.opacity = '1';
      viewElement.style.transform = 'translateY(0)';
    }
  }

  // Render dashboard grid (Screen 1)
  function renderDisasterGrid() {
    if (!disasterCardsGrid) return;
    disasterCardsGrid.innerHTML = '';

    for (const key in disastersConfig) {
      const disaster = disastersConfig[key];
      const name = disaster.name[currentLang] || disaster.name['en'];
      const desc = (disaster.desc && disaster.desc[currentLang]) ? disaster.desc[currentLang] : (disaster.desc ? disaster.desc['en'] : '');
      const bgImg = disaster.bgImage || '../assets/images/disaster/earthquake.png';

      const card = document.createElement('div');
      card.className = `disaster-card ${disaster.theme || ''} disaster-card-${disaster.id}`;
      card.setAttribute('data-id', disaster.id);
      card.innerHTML = `
        <div class="disaster-card-bg" style="background-image: url('${bgImg}');"></div>
        <div class="disaster-card-overlay"></div>
        <div class="disaster-card-content">
          <div class="disaster-card-top">
            <div class="disaster-icon-box">
              <span class="disaster-emoji">${disaster.icon}</span>
            </div>
            <div class="disaster-text-group">
              <h3 class="disaster-card-name">${name}</h3>
              <p class="disaster-card-desc">${desc}</p>
            </div>
          </div>
          <div class="disaster-card-bottom">
            <button class="disaster-card-btn">
              <span>Learn More</span>
              <i data-lucide="arrow-right"></i>
            </button>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        activeDisasterId = disaster.id;
        handleDisasterSelect(disaster);
      });

      disasterCardsGrid.appendChild(card);
    }

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // Handle click on a disaster (transition to Screen 2)
  function handleDisasterSelect(disaster) {
    // 1. Update stepper label 1
    const stepLabel1 = document.getElementById('step-label-1');
    const stepCircle1 = document.getElementById('step-circle-1');
    const disasterName = disaster.name[currentLang] || disaster.name['en'];
    if (stepLabel1) stepLabel1.textContent = disasterName;
    if (stepCircle1) stepCircle1.innerHTML = `<span style="font-size:1.3rem;">${disaster.icon}</span>`;

    // 2. Load banner SVG illustration
    const bannerContainer = document.getElementById('situation-banner-container');
    if (bannerContainer) {
      bannerContainer.innerHTML = disaster.bannerSvg;
    }

    // 3. Render options matching situation list
    renderSituationGrid(disaster);

    // 4. Update back button mapping
    const backBtn = document.getElementById('nav-back-link');
    if (backBtn) {
      backBtn.href = '#';
      backBtn.onclick = (e) => {
        e.preventDefault();
        // Go back to dashboard view
        showScreen(dashboardView);
        resetBackBtnToHome();
      };
      backBtn.querySelector('span').setAttribute('data-i18n', 'nav_back_to_guide');
      if (window.RescueTranslations) window.RescueTranslations.apply(currentLang);
    }

    // 5. Transition view
    showScreen(situationView);
  }

  function resetBackBtnToHome() {
    const backBtn = document.getElementById('nav-back-link');
    if (backBtn) {
      backBtn.href = '../index.html';
      backBtn.onclick = null;
      backBtn.querySelector('span').setAttribute('data-i18n', 'nav_back_to_home');
      if (window.RescueTranslations) window.RescueTranslations.apply(currentLang);
    }
  }

  // Render situation grid (Screen 2)
  function renderSituationGrid(disaster) {
    if (!situationCardsGrid) return;
    situationCardsGrid.innerHTML = '';

    disaster.situations.forEach(sit => {
      const title = sit.title[currentLang] || sit.title['en'];
      const subtitle = sit.subtitle[currentLang] || sit.subtitle['en'];

      const option = document.createElement('div');
      option.className = 'situation-option-card';
      option.innerHTML = `
        <div class="situation-option-icon-wrapper">${sit.icon}</div>
        <div class="situation-option-info">
          <div class="situation-option-title">${title}</div>
          <div class="situation-option-subtitle">${subtitle}</div>
        </div>
      `;

      option.addEventListener('click', () => {
        activeSituationId = sit.id;
        handleSituationSelect(disaster, sit);
      });

      situationCardsGrid.appendChild(option);
    });
  }

  // Handle click on a situation (transition to Screen 3: Recommendation)
  function handleSituationSelect(disaster, situation) {
    const recIconContainer = document.getElementById('rec-icon-container');
    const recTitleText = document.getElementById('rec-title-text');
    const recDescText = document.getElementById('rec-desc-text');
    const btnOpenGuide = document.getElementById('btn-open-guide');

    const situationTitle = situation.title[currentLang] || situation.title['en'];
    const moduleLabel = situation.moduleName[currentLang] || situation.moduleName['en'];

    // 1. Setup details in Recommendation Card
    if (recTitleText) recTitleText.textContent = situationTitle;

    // Add custom descriptions depending on language
    let descTemplate = "Follow the Emergency Guide for step-by-step instructions.";
    if (currentLang === 'hi') descTemplate = "चरण-दर-चरण निर्देशों के लिए आपातकालीन गाइड का पालन करें।";
    else if (currentLang === 'mr') descTemplate = "टप्प्याटप्प्याने माहिती मिळवण्यासाठी आपत्कालीन मार्गदर्शिका फॉलो करा.";

    if (recDescText) recDescText.textContent = `${descTemplate}`;

    // Apply color theme dynamically on icon badge
    if (recIconContainer) {
      recIconContainer.className = `rec-icon-badge theme-${situation.module}`;
      recIconContainer.innerHTML = situation.icon;
    }

    // 2. Setup Open Guide action button
    if (btnOpenGuide) {
      // Modify button text
      const mainTextNode = btnOpenGuide.querySelector('.btn-main-text');
      const subTextNode = btnOpenGuide.querySelector('.btn-sub-text');
      if (mainTextNode) mainTextNode.textContent = `${moduleLabel}`;

      let btnSubTemplate = "Step-by-step instructions";
      if (currentLang === 'hi') btnSubTemplate = "चरण-दर-चरण प्राथमिक चिकित्सा निर्देश";
      else if (currentLang === 'mr') btnSubTemplate = "प्रथमोपचाराच्या टप्प्याटप्प्याने पायऱ्या";

      if (subTextNode) subTextNode.textContent = btnSubTemplate;

      // Handle click navigation
      btnOpenGuide.onclick = (e) => {
        e.preventDefault();
        navigateToModule(situation.module);
      };
    }

    // 3. Update back button to go back to situation view
    const backBtn = document.getElementById('nav-back-link');
    if (backBtn) {
      backBtn.onclick = (e) => {
        e.preventDefault();
        showScreen(situationView);
        // Reset back btn to point to dashboard next time
        backBtn.onclick = (e2) => {
          e2.preventDefault();
          showScreen(dashboardView);
          resetBackBtnToHome();
        };
      };
    }

    // 4. Transition view
    showScreen(recommendationView);
  }

  // Handle module routing (simulated or real redirection)
  function navigateToModule(moduleKey) {
    const localGuidesMap = {
      cpr: "cpr.html",
      snake: "snake_bite.html",
      burns: "burns.html",
      bleeding: "bleeding.html",
      poison: "poisoning.html",
      fire: "burns.html",       // redirect fire to burns guide
      gas: "poisoning.html"    // redirect gas leak to poisoning guide
    };

    if (localGuidesMap[moduleKey]) {
      // Redirect to actual physical emergency files
      window.location.href = localGuidesMap[moduleKey];
    } else {
      // Open clean slide-up drawer for simulated guides (rescue, fracture, safety)
      openSimulatedDrawer(moduleKey);
    }
  }

  // Handle Drawer logic for simulated guides
  function openSimulatedDrawer(moduleKey) {
    // Check if drawer exists
    let drawerOverlay = document.getElementById('sim-drawer-overlay');
    let drawer = document.getElementById('sim-drawer');

    if (!drawer) {
      // Create drawer elements dynamically
      drawerOverlay = document.createElement('div');
      drawerOverlay.id = 'sim-drawer-overlay';
      drawerOverlay.className = 'guide-drawer-overlay';
      document.body.appendChild(drawerOverlay);

      drawer = document.createElement('div');
      drawer.id = 'sim-drawer';
      drawer.className = 'guide-drawer';
      drawer.innerHTML = `
        <div class="drawer-header">
          <div class="drawer-bot-info">
            <i data-lucide="shield" style="width: 20px; height: 20px; color: var(--color-primary);"></i>
            <span style="font-family: var(--font-heading); font-weight: 800; color: var(--text-primary);" data-i18n="chat_header">RescueAI Assistant</span>
          </div>
          <button class="drawer-close-btn" id="sim-drawer-close-btn" title="Close Panel">
            <i data-lucide="x"></i>
          </button>
        </div>
        <div class="drawer-content" id="sim-drawer-content"></div>
      `;
      document.body.appendChild(drawer);

      // Bind close events
      document.getElementById('sim-drawer-close-btn').addEventListener('click', closeSimDrawer);
      drawerOverlay.addEventListener('click', closeSimDrawer);
    }

    // Load content
    const guide = simulatedGuides[moduleKey] || simulatedGuides['safety'];
    const title = guide.title[currentLang] || guide.title['en'];
    const alertText = guide.alert[currentLang] || guide.alert['en'];
    const steps = guide.steps[currentLang] || guide.steps['en'];

    const contentDiv = document.getElementById('sim-drawer-content');
    if (contentDiv) {
      let stepsHtml = '';
      steps.forEach((step, idx) => {
        stepsHtml += `
          <li class="firstaid-step-item">
            <div class="step-number" style="background-color: var(--color-primary); color: white;">${idx + 1}</div>
            <div class="step-text">${step}</div>
          </li>
        `;
      });

      contentDiv.innerHTML = `
        <h2 class="drawer-guide-title">${title}</h2>
        <div class="drawer-alert" style="background-color: #FEF2F2; color: #991B1B; border: 1px solid #FEE2E2;">
          <i data-lucide="alert-triangle" style="width: 20px; height: 20px; color: #EF4444; margin-right: 8px;"></i>
          <span>${alertText}</span>
        </div>
        <ol class="firstaid-steps-list">
          ${stepsHtml}
        </ol>
      `;
    }

    // Open drawer
    drawerOverlay.style.display = 'block';
    setTimeout(() => {
      drawerOverlay.classList.add('active');
      drawer.classList.add('active');
    }, 10);

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  function closeSimDrawer() {
    const drawerOverlay = document.getElementById('sim-drawer-overlay');
    const drawer = document.getElementById('sim-drawer');
    if (drawerOverlay && drawer) {
      drawerOverlay.classList.remove('active');
      drawer.classList.remove('active');
      setTimeout(() => {
        drawerOverlay.style.display = 'none';
      }, 300);
    }
  }

  // Secondary actions links
  const btnHospital = document.getElementById('btn-rec-hospital');
  const btnContacts = document.getElementById('btn-rec-contacts');

  if (btnHospital) {
    btnHospital.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'maps.html';
    });
  }

  if (btnContacts) {
    btnContacts.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'contacts.html';
    });
  }

  // 3. Bind AI Banner trigger button to launch chatbot
  const bindAIBannerTriggers = () => {
    const triggers = document.querySelectorAll('.ai-banner-trigger-btn, .ai-banner');
    triggers.forEach(t => {
      t.addEventListener('click', (e) => {
        e.stopPropagation();
        // Look for the floating chatbot button created by chatbot.js
        const chatbotTrigger = document.getElementById('chatbot-trigger');
        if (chatbotTrigger) {
          chatbotTrigger.click();
        }
      });
    });
  };

  // Initialize view
  renderDisasterGrid();
  bindAIBannerTriggers();

  // 4. Language sync interceptor to update active view immediately
  document.addEventListener('rescueLangChanged', (e) => {
    const nextLang = e.detail.lang;
    currentLang = nextLang;

    // Update language badge pill button text
    const badgeText = document.querySelector('#nav-lang span');
    if (badgeText) {
      badgeText.textContent = nextLang === 'hi' ? 'हिन्दी | EN' : 'EN | हिन्दी';
    }

    // Re-render grids to update names
    renderDisasterGrid();

    // Update labels of current views if we are halfway in a flow
    if (activeDisasterId) {
      const disaster = disastersConfig[activeDisasterId];
      if (disaster) {
        const stepLabel1 = document.getElementById('step-label-1');
        if (stepLabel1) stepLabel1.textContent = disaster.name[currentLang] || disaster.name['en'];
        renderSituationGrid(disaster);

        if (activeSituationId) {
          const situation = disaster.situations.find(s => s.id === activeSituationId);
          if (situation) {
            handleSituationSelect(disaster, situation);
          }
        }
      }
    }
  });

  // Load language settings on page load
  const savedLang = localStorage.getItem('rescue_lang') || 'en';
  if (window.RescueTranslations) {
    window.RescueTranslations.apply(savedLang);
    // Trigger local update once
    const event = new CustomEvent('rescueLangChanged', { detail: { lang: savedLang } });
    document.dispatchEvent(event);
  }
});
