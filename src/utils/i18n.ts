export type Language = "English" | "Tamil" | "Hindi";

export const translations = {
  English: {
    // Header & Nav
    goodMorning: "Good morning",
    home: "Home",
    animals: "My Herd",
    aiAdvisor: "Advisor",
    market: "Market",
    profile: "Profile",
    smartTasks: "Tasks",
    newTask: "New Task",
    alertsNotifications: "Alerts & Notifications",

    // Home
    farmOverview: "Farm Overview",
    totalAnimals: "Total Animals",
    healthyStatus: "Healthy Herd",
    pregnantCattle: "Pregnant Cattle",
    vaccinationsDue: "Vaccinations Due",
    quickActions: "Quick Actions",
    addAnimal: "Add Animal",
    scanAnimal: "Scan Cattle",
    aiBreedDetection: "AI Breed Scanner",
    digitalPassport: "Digital Passport",
    marketplace: "Marketplace",
    businessAdvisor: "AI Farm Advisor",
    latestAlerts: "Latest Alerts",
    manageTasks: "Manage Tasks",
    growthTrend: "Growth Trend",
    emergencyVet: "Emergency Vet",
    callDoctor: "Call Doctor",
    weatherAlert: "Summer Heat Alert",
    viewAll: "View All",
    todayTasks: "Today's Tasks",
    seeAll: "See all",
    transactions: "Recent Marketplace Activity",
    yourCattle: "Your Cattle",
    newAnimal: "New Cattle",

    // Animals & Breeds
    indigenousGenetics: "Indigenous Cattle Breeds",
    nativeBreedsTitle: "Native Cattle Breeds",
    nativeBreedsDesc: "Verified indigenous genetics, digital passports, lactation metrics, and pedigree registries.",
    nativeBreedsTab: "Indigenous Breeds",
    myHerdTab: "My Herd",
    searchBreedsPlaceholder: "Search indigenous breeds (Kangayam, Gir, Pulikulam)...",
    searchHerdPlaceholder: "Search herd by tag, name, breed...",
    viewDetails: "View Details",
    registerBreed: "Register Cattle",
    milkYield: "Milk Yield",
    climateAdapt: "Climate",
    healthScore: "Health Score",
    vaccination: "Vaccination Status",
    noAnimalsFound: "No animals found",
    adjustFilterDesc: "Try adjusting your search query or registering a new cow.",
    details: "Details",
    edit: "Edit",
    delete: "Delete",

    // AI Breed Detection & Scanner
    aiBreedDetectionTitle: "AI Breed Scanner",
    pointCamera: "Point camera at cow's head or muzzle",
    readyToScan: "Ready to Scan",
    scanning: "Scanning Cattle Biometrics...",
    detectBreedNow: "Detect Breed",
    scanNoseprint: "Scan Noseprint ID",
    issueDigitalPassport: "Issue Digital Passport",
    primaryUse: "Primary Purpose",

    // Digital Passport Modal
    officialDigitalPassport: "Official Bovine Digital Passport",
    breed: "Breed",
    ageGender: "Age / Gender",
    weight: "Weight",
    healthStatusLabel: "Health Score",
    upToDate: "Up to Date",
    medicalVaccinationHistory: "Medical & Vaccination Timeline",
    addRecord: "Add Record",
    print: "Print",
    share: "Share",
    today: "Today",
    initialPassportIssued: "Official biometric digital passport issued in National Herd Registry.",

    // Advisor
    aiAdvisorTitle: "AI Farm Advisor",
    advisorDesc: "Ask questions about feed management, A2 milk pricing, heat stress care, and government subsidies.",
    askPlaceholder: "Ask about feed, ROI, or disease care...",
    suggestedFollowups: "Suggested questions:",
    listening: "Listening...",

    // Market
    verifiedAgriServices: "Verified Livestock & Fodder Market",
    marketplaceTitle: "Marketplace",
    marketplaceDesc: "Buy and sell cattle, green fodder, semen straws, and connect with certified veterinarians.",
    searchMarket: "Search cattle, fodder, doctors...",
    all: "All",
    veterinarians: "Veterinarians",
    breeders: "Breeders",
    feedSuppliers: "Feed Suppliers",
    cattleForSale: "Cattle for Sale",
    bookConsult: "Book Consult",
    orderFeed: "Order Feed",
    buyNow: "Place Order",
    contactSeller: "Contact Seller",
    confirmOrder: "Confirm Order",
    myOrders: "My Purchases",
    salesInbox: "Incoming Orders",
    postListing: "Post Listing",
    nearMe: "Near Me",
    allIndia: "All India",

    // Profile
    personalInfo: "Personal Info",
    accountInfo: "Farm & App Info",
    farmName: "Farm Name",
    email: "Email Address",
    phone: "Phone Number",
    location: "Location",
    appLanguage: "App Language",
    logout: "Log Out",
    saveChanges: "Save Changes",
    close: "Close",
  },

  Tamil: {
    // Header & Nav
    goodMorning: "காலை வணக்கம்",
    home: "முகப்பு",
    animals: "என் மந்தை",
    aiAdvisor: "ஆலோசகர்",
    market: "சந்தை",
    profile: "சுயவிவரம்",
    smartTasks: "பணிகள்",
    newTask: "புதிய பணி",
    alertsNotifications: "எச்சரிக்கைகள் & அறிவிப்புகள்",

    // Home
    farmOverview: "பண்ணை விவரம்",
    totalAnimals: "மொத்த மாடுகள்",
    healthyStatus: "ஆரோக்கியமானவை",
    pregnantCattle: "சினை மாடுகள்",
    vaccinationsDue: "தடுப்பூசி பாக்கி",
    quickActions: "முக்கிய சேவைகள்",
    addAnimal: "மாடு சேர்",
    scanAnimal: "மாடு ஸ்கேன்",
    aiBreedDetection: "இனம் ஸ்கேனர்",
    digitalPassport: "டிஜிட்டல் பாஸ்போர்ட்",
    marketplace: "கால்நடை சந்தை",
    businessAdvisor: "AI பண்ணை ஆலோசகர்",
    latestAlerts: "முக்கிய எச்சரிக்கை",
    manageTasks: "பணிகளை நிர்வகி",
    growthTrend: "வளர்ச்சி விகிதம்",
    emergencyVet: "அவசர மருத்துவர்",
    callDoctor: "மருத்துவர் உதவி",
    weatherAlert: "கோடை வெப்ப எச்சரிக்கை",
    viewAll: "அனைத்தும்",
    todayTasks: "இன்றைய பணிகள்",
    seeAll: "அனைத்தும் பார்",
    transactions: "சந்தை நடவடிக்கைகள்",
    yourCattle: "உங்கள் மாடுகள்",
    newAnimal: "புதிய மாடு",

    // Animals & Breeds
    indigenousGenetics: "நாட்டு மாடுகள் இனம்",
    nativeBreedsTitle: "நாட்டு மாடுகள் அட்டவணை",
    nativeBreedsDesc: "பாரம்பரிய நாட்டு மாடுகளின் விவரங்கள், பால் உற்பத்தி, மற்றும் அரசு மானிய வழிகாட்டல்.",
    nativeBreedsTab: "பாரம்பரிய இனங்கள்",
    myHerdTab: "என் மந்தை",
    searchBreedsPlaceholder: "இனங்களைத் தேடுங்கள் (காங்கேயம், கிர், புலிகுளம்)...",
    searchHerdPlaceholder: "டேக், பெயர் அல்லது இனம் மூலம் தேடுங்கள்...",
    viewDetails: "விவரம் பார்க்க",
    registerBreed: "மாடு பதிவு செய்",
    milkYield: "பால் உற்பத்தி",
    climateAdapt: "தட்பவெப்ப நிலை",
    healthScore: "சுகாதார நிலை",
    vaccination: "தடுப்பூசி நிலை",
    noAnimalsFound: "மாடுகள் எதுவும் இல்லை",
    adjustFilterDesc: "தேடல் வினவலை மாற்றி அல்லது புதிய மாட்டைப் பதிவு செய்யுங்கள்.",
    details: "விவரம்",
    edit: "திருத்து",
    delete: "நீக்கு",

    // AI Breed Detection & Scanner
    aiBreedDetectionTitle: "AI இனம் ஸ்கேனர்",
    pointCamera: "கேமராவை மாட்டின் தலை அல்லது மூக்கில் வைக்கவும்",
    readyToScan: "ஸ்கேன் செய்ய தயார்",
    scanning: "பயோமெட்ரிக் ஸ்கேன் நடக்கிறது...",
    detectBreedNow: "இனத்தைக் கண்டுபிடி",
    scanNoseprint: "மூக்கு ரேகை ஸ்கேன்",
    issueDigitalPassport: "பாஸ்போர்ட் உருவாக்கு",
    primaryUse: "பயன்பாடு",

    // Digital Passport Modal
    officialDigitalPassport: "அதிகாரப்பூர்வ டிஜிட்டல் பாஸ்போர்ட்",
    breed: "இனம்",
    ageGender: "வயது / பாலினம்",
    weight: "எடை",
    healthStatusLabel: "சுகாதார நிலை",
    upToDate: "முடிக்கப்பட்டது",
    medicalVaccinationHistory: "மருத்துவ & தடுப்பூசி வரலாறு",
    addRecord: "பதிவு சேர்",
    print: "அச்சிடுக",
    share: "பகிர்",
    today: "இன்று",
    initialPassportIssued: "அதிகாரப்பூர்வ டிஜிட்டல் பாஸ்போர்ட் தேசிய பதிவேட்டில் பதிவு செய்யப்பட்டது.",

    // Advisor
    aiAdvisorTitle: "AI பண்ணை ஆலோசகர்",
    advisorDesc: "தீவன மேலாண்மை, A2 பால் விலை, வெப்ப தணிப்பு மற்றும் அரசு மானியம் பற்றி கேளுங்கள்.",
    askPlaceholder: "தீவனம், மானியம், அல்லது நோய் பராமரிப்பு பற்றி கேளுங்கள்...",
    suggestedFollowups: "பரிந்துரைக்கப்பட்ட கேள்விகள்:",
    listening: "கேட்கிறது...",

    // Market
    verifiedAgriServices: "கால்நடை & தீவன சந்தை",
    marketplaceTitle: "சந்தை",
    marketplaceDesc: "மாடுகள், பச்சை புல் மற்றும் பண்ணை உபகரணங்கள் வாங்க, விற்க நேரடி சந்தை.",
    searchMarket: "மாடுகள், தீவனம், மருத்துவர்களைத் தேடுங்கள்...",
    all: "அனைத்தும்",
    veterinarians: "மருத்துவர்கள்",
    breeders: "இனப்பெருக்கப் பண்ணை",
    feedSuppliers: "தீவன விற்பனை",
    cattleForSale: "மாடுகள் விற்பனை",
    bookConsult: "மருத்துவ ஆலோசனை",
    orderFeed: "தீவனம் ஆர்டர் செய்",
    buyNow: "ஆர்டர் செய்",
    contactSeller: "விற்பனையாளர் தொடர்பு",
    confirmOrder: "ஆர்டர் உறுதி செய்",
    myOrders: "என் ஆர்டர்கள்",
    salesInbox: "விற்பனை பெட்டி",
    postListing: "விளம்பரம் இடுக",
    nearMe: "அருகில்",
    allIndia: "முழு இந்தியா",

    // Profile
    personalInfo: "தனிப்பட்ட விவரங்கள்",
    accountInfo: "பண்ணை & கணக்கு விவரங்கள்",
    farmName: "பண்ணை பெயர்",
    email: "மின்னஞ்சல்",
    phone: "கைபேசி எண்",
    location: "முகவரி / இருப்பிடம்",
    appLanguage: "பயன்பாட்டு மொழி",
    logout: "வெளியேறு",
    saveChanges: "சேமி",
    close: "மூடு",
  },

  Hindi: {
    // Header & Nav
    goodMorning: "शुभ प्रभात",
    home: "होम",
    animals: "पशु सूची",
    aiAdvisor: "सलाहकार",
    market: "बाज़ार",
    profile: "प्रोफ़ाइल",
    smartTasks: "कार्य",
    newTask: "नया कार्य",
    alertsNotifications: "अलर्ट और सूचनाएं",

    // Home
    farmOverview: "फार्म विवरण",
    totalAnimals: "कुल पशु",
    healthyStatus: "स्वस्थ पशु",
    pregnantCattle: "गर्भवती गायें",
    vaccinationsDue: "टीकाकरण बाकी",
    quickActions: "त्वरित सेवाएं",
    addAnimal: "पशु जोड़ें",
    scanAnimal: "पशु स्कैन",
    aiBreedDetection: "नस्ल स्कैनर",
    digitalPassport: "डिजिटल पासपोर्ट",
    marketplace: "पशु बाज़ार",
    businessAdvisor: "एआई कृषि सलाहकार",
    latestAlerts: "महत्वपूर्ण अलर्ट",
    manageTasks: "कार्य प्रबंधन",
    growthTrend: "विकास दर",
    emergencyVet: "आपातकालीन डॉक्टर",
    callDoctor: "डॉक्टर को कॉल करें",
    weatherAlert: "गर्मी का अलर्ट",
    viewAll: "सभी देखें",
    todayTasks: "आज के कार्य",
    seeAll: "सभी देखें",
    transactions: "हाल की बाज़ार गतिविधि",
    yourCattle: "आपके पशु",
    newAnimal: "नया पशु",

    // Animals & Breeds
    indigenousGenetics: "देशी नस्लें",
    nativeBreedsTitle: "देशी पशु नस्ल सूची",
    nativeBreedsDesc: "प्रमाणित देशी नस्लें, डिजिटल पासपोर्ट, दूध उत्पादन और सरकारी सब्सिडी जानकारी।",
    nativeBreedsTab: "देशी नस्लें",
    myHerdTab: "मेरी पशु सूची",
    searchBreedsPlaceholder: "नस्लें खोजें (गीर, साहीवाल, कांगायम)...",
    searchHerdPlaceholder: "टैग, नाम या नस्ल से खोजें...",
    viewDetails: "विवरण देखें",
    registerBreed: "पशु पंजीकृत करें",
    milkYield: "दूध उत्पादन",
    climateAdapt: "जलवायु",
    healthScore: "स्वास्थ्य स्कोर",
    vaccination: "टीकाकरण स्थिति",
    noAnimalsFound: "कोई पशु नहीं मिला",
    adjustFilterDesc: "अपनी खोज बदलें या नया पशु पंजीकृत करें।",
    details: "विवरण",
    edit: "संपादित करें",
    delete: "हटाएं",

    // AI Breed Detection & Scanner
    aiBreedDetectionTitle: "एआई नस्ल स्कैनर",
    pointCamera: "कैमरे को पशु के चेहरे या थूथन पर रखें",
    readyToScan: "स्कैन के लिए तैयार",
    scanning: "बायोमेट्रिक स्कैन हो रहा है...",
    detectBreedNow: "नस्ल पहचानें",
    scanNoseprint: "थूथन निशान स्कैन",
    issueDigitalPassport: "पासपोर्ट जारी करें",
    primaryUse: "मुख्य उपयोग",

    // Digital Passport Modal
    officialDigitalPassport: "आधिकारिक डिजिटल पासपोर्ट",
    breed: "नस्ल",
    ageGender: "आयु / लिंग",
    weight: "वज़न",
    healthStatusLabel: "स्वास्थ्य स्कोर",
    upToDate: "अद्यतित",
    medicalVaccinationHistory: "चिकित्सा और टीकाकरण इतिहास",
    addRecord: "रिकॉर्ड जोड़ें",
    print: "प्रिंट",
    share: "साझा करें",
    today: "आज",
    initialPassportIssued: "राष्ट्रीय पशु रजिस्ट्री में आधिकारिक डिजिटल पासपोर्ट पंजीकृत किया गया।",

    // Advisor
    aiAdvisorTitle: "एआई कृषि सलाहकार",
    advisorDesc: "चारा प्रबंधन, A2 दूध मूल्य, गर्मी प्रबंधन और सरकारी सब्सिडी के बारे में पूछें।",
    askPlaceholder: "चारा, सब्सिडी या बीमारी देखभाल के बारे में पूछें...",
    suggestedFollowups: "सुझाए गए प्रश्न:",
    listening: "सुन रहा हूँ...",

    // Market
    verifiedAgriServices: "पशुधन एवं चारा बाज़ार",
    marketplaceTitle: "बाज़ार",
    marketplaceDesc: "पशु, हरा चारा और उपकरण खरीदने और बेचने के लिए सीधा किसान बाज़ार।",
    searchMarket: "पशु, चारा, डॉक्टर खोजें...",
    all: "सभी",
    veterinarians: "पशु चिकित्सक",
    breeders: "प्रजनक",
    feedSuppliers: "चारा आपूर्तिकर्ता",
    cattleForSale: "बिक्री के लिए पशु",
    bookConsult: "परामर्श बुक करें",
    orderFeed: "चारा ऑर्डर करें",
    buyNow: "ऑर्डर करें",
    contactSeller: "विक्रेता से संपर्क",
    confirmOrder: "ऑर्डर पुष्टि करें",
    myOrders: "मेरे ऑर्डर",
    salesInbox: "बिक्री इनबॉक्स",
    postListing: "विज्ञापन डालें",
    nearMe: "मेरे पास",
    allIndia: "पूरा भारत",

    // Profile
    personalInfo: "व्यक्तिगत जानकारी",
    accountInfo: "फार्म एवं खाता जानकारी",
    farmName: "फार्म का नाम",
    email: "ईमेल",
    phone: "फ़ोन नंबर",
    location: "स्थान",
    appLanguage: "ऐप की भाषा",
    logout: "लॉग आउट",
    saveChanges: "सहेजें",
    close: "बंद करें",
  },
};

/**
 * Universal dynamic string translator
 */
export function t(key: keyof typeof translations.English | string, lang?: Language | string): string {
  const selectedLang = (lang as Language) || "English";
  const table = translations[selectedLang] || translations.English;
  return (table as any)[key] || (translations.English as any)[key] || String(key);
}

/**
 * Translates arbitrary animal or breed names dynamically
 */
export function translateAnimalName(name?: string, lang?: Language | string): string {
  if (!name) return "";
  const selectedLang = (lang as Language) || "English";
  const lower = name.toLowerCase().trim();

  if (selectedLang === "Tamil") {
    if (lower.includes("lakshmi")) return "லட்சுமி";
    if (lower.includes("veeran")) return "வீரன்";
    if (lower.includes("kamadhenu")) return "காமதேனு";
    if (lower.includes("sundari")) return "சுந்தரி";
    if (lower.includes("manikandan")) return "மணிகண்டன்";
    if (lower.includes("murugan")) return "முருகன்";
    if (lower.includes("gomathi")) return "கோமதி";
    if (lower.includes("selvi")) return "செல்வி";
  } else if (selectedLang === "Hindi") {
    if (lower.includes("lakshmi")) return "लक्ष्मी";
    if (lower.includes("veeran")) return "वीरन";
    if (lower.includes("kamadhenu")) return "कामधेनु";
    if (lower.includes("sundari")) return "सुंदरी";
    if (lower.includes("manikandan")) return "मणिकंदन";
    if (lower.includes("murugan")) return "मुरुगन";
    if (lower.includes("gomathi")) return "गोमती";
    if (lower.includes("selvi")) return "सेल्वी";
  }

  // English: return clean base name (strip any parenthetical Tamil/Hindi)
  return name.replace(/\s*\([^)]*\)/g, "").trim();
}

/**
 * Translates breed names dynamically
 */
export function translateBreedName(breedName?: string, lang?: Language | string): string {
  if (!breedName) return "";
  const selectedLang = (lang as Language) || "English";
  const clean = breedName.replace(/\s*\([^)]*\)/g, "").trim();
  const lower = clean.toLowerCase();

  if (selectedLang === "Tamil") {
    if (lower.includes("kangayam")) return "காங்கேயம்";
    if (lower.includes("pulikulam")) return "புலிகுளம்";
    if (lower.includes("bargur")) return "பர்கூர்";
    if (lower.includes("umbalachery")) return "உம்பளச்சேரி";
    if (lower.includes("alambadi")) return "ஆலம்பாடி";
    if (lower.includes("malai")) return "மலை மாடு";
    if (lower.includes("thanjavur")) return "தஞ்சாவூர்";
    if (lower.includes("manapparai")) return "மணப்பாறை";
    if (lower.includes("punganur")) return "புங்கனூர்";
    if (lower.includes("hallikar")) return "ஹள்ளிகார்";
    if (lower.includes("ongole")) return "ஓங்கோல்";
    if (lower.includes("gir")) return "கிர்";
    if (lower.includes("sahiwal")) return "சாகிவால்";
    if (lower.includes("sindhi")) return "ரெட் சிந்தி";
    if (lower.includes("deoni")) return "தியோனி";
    if (lower.includes("kankrej")) return "கான்க்ரெஜ்";
    if (lower.includes("krishna")) return "கிருஷ்ணா வேலி";
    if (lower.includes("hariana")) return "ஹரியானா";
    if (lower.includes("vechur")) return "வெச்சூர்";
    if (lower.includes("dangi")) return "டாங்கி";
    if (lower.includes("rathi")) return "ராத்தி";
    if (lower.includes("tharparkar")) return "தார்பார்க்கர்";
  } else if (selectedLang === "Hindi") {
    if (lower.includes("kangayam")) return "कांगायम";
    if (lower.includes("pulikulam")) return "पुलिकुलम";
    if (lower.includes("bargur")) return "बरगूर";
    if (lower.includes("umbalachery")) return "उम्बलाचेरी";
    if (lower.includes("alambadi")) return "आलमबाडी";
    if (lower.includes("malai")) return "मलाई माडू";
    if (lower.includes("thanjavur")) return "तंजावुर";
    if (lower.includes("manapparai")) return "मनाप्पारै";
    if (lower.includes("punganur")) return "पुंगनूर";
    if (lower.includes("hallikar")) return "हल्लीकर";
    if (lower.includes("ongole")) return "ओंगोल";
    if (lower.includes("gir")) return "गीर";
    if (lower.includes("sahiwal")) return "साहीवाल";
    if (lower.includes("sindhi")) return "लाल सिंधी";
    if (lower.includes("deoni")) return "देवनी";
    if (lower.includes("kankrej")) return "कांकरेज";
    if (lower.includes("krishna")) return "कृष्णा वैली";
    if (lower.includes("hariana")) return "हरियाना";
    if (lower.includes("vechur")) return "वेचूर";
    if (lower.includes("dangi")) return "डांगी";
    if (lower.includes("rathi")) return "राठी";
    if (lower.includes("tharparkar")) return "थारपारकर";
  }

  return clean;
}

/**
 * Translates health & vaccination status
 */
export function translateStatus(status?: string, lang?: Language | string): string {
  if (!status) return "";
  const selectedLang = (lang as Language) || "English";
  const lower = status.toLowerCase();

  if (selectedLang === "Tamil") {
    if (lower.includes("healthy")) return "ஆரோக்கியமானது";
    if (lower.includes("pregnant")) return "சினை";
    if (lower.includes("attention")) return "கவனம் தேவை";
    if (lower.includes("treatment")) return "சிகிச்சையில்";
    if (lower.includes("up to date")) return "முடிக்கப்பட்டது";
    if (lower.includes("action")) return "தேவை";
    if (lower.includes("overdue")) return "காலாவதியானது";
  } else if (selectedLang === "Hindi") {
    if (lower.includes("healthy")) return "स्वस्थ";
    if (lower.includes("pregnant")) return "गर्भवती";
    if (lower.includes("attention")) return "देखभाल आवश्यक";
    if (lower.includes("treatment")) return "उपचाराधीन";
    if (lower.includes("up to date")) return "अद्यतित";
    if (lower.includes("action")) return "आवश्यक";
    if (lower.includes("overdue")) return "अतिदेय";
  }

  return status;
}

/**
 * General text translator
 */
export function translateText(text?: string, lang?: Language | string): string {
  if (!text) return "";
  const selectedLang = (lang as Language) || "English";
  if (selectedLang === "English") return text.replace(/\s*\([^)]*\)/g, "").trim();
  if (selectedLang === "Tamil") return translateBreedName(text, "Tamil");
  if (selectedLang === "Hindi") return translateBreedName(text, "Hindi");
  return text;
}
