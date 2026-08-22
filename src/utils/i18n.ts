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
    farmSubtitle: "Kongu Indigenous Cattle Farm",
    cattleIqSubtitle: "CattleIQ Herd Intelligence",

    // Home
    farmOverview: "Farm Overview",
    totalAnimals: "Total Animals",
    registeredCattle: "Registered Cattle",
    milkYield: "Milk Yield",
    literPerDay: "L / day",
    healthyStatus: "Healthy Herd",
    pregnantCattle: "Pregnant Cattle",
    vaccinationsDue: "Vaccinations Due",
    quickActions: "Quick Actions",
    addAnimal: "Add Animal",
    scanAnimal: "Scan Cattle",
    aiBiometricId: "AI & Biometric ID",
    scanCattleBtn: "Scan Cattle (AI & Biometric ID)",
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
    allDailyTasksCompleted: "All daily care tasks completed.",
    priorityBadge: "PRIORITY",
    govtSubsidy: "GOVT SUBSIDY",
    feedPlanningSubtitle: "Feed planning, A2 milk pricing & subsidies",
    emergencyHelplineSubtitle: "24x7 Animal Husbandry Government Helpline",
    marketQuickSubtitle: "Buy & sell cattle, green fodder & equipment",

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
    climateAdapt: "Climate",
    healthScore: "Health Score",
    vaccination: "Vaccination Status",
    noAnimalsFound: "No animals found",
    adjustFilterDesc: "Try adjusting your search query or registering a new cow.",
    details: "Details",
    edit: "Edit",
    delete: "Delete",
    dairy: "Dairy",
    draught: "Draught",
    dualPurpose: "Dual Purpose",
    stateTamilNadu: "Tamil Nadu",
    health: "Health",
    yield: "Yield",
    yieldPerDay: "L/d",
    genderFemale: "Female",
    genderMale: "Male",
    confirmDelete: "Are you sure you want to delete this cattle record?",
    deleteConfirmTitle: "Delete Cattle Record",
    deleteWarning: "This action will permanently delete this animal from your herd registry.",

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
    advisorSubtitle: "Livestock economics, feed recipes & veterinary guidance",
    askPlaceholder: "Ask about feed, ROI, or disease care...",
    suggestedFollowups: "Suggested questions:",
    listening: "Listening...",
    suggestA2Pricing: "A2 Milk Pricing",
    suggestHeatCare: "Summer Heat Care",
    suggestFeedPlanning: "Low Cost Feed Mix",
    suggestGovtSubsidy: "Govt Cattle Subsidies",
    clearChat: "Clear Chat History",

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
    gpsRadius: "GPS Radius",
    within15km: "Within 15 km",
    within50km: "Within 50 km",
    within100km: "Within 100 km",
    allTamilNadu: "All Tamil Nadu",
    sales: "Sales Orders",
    orderOnWhatsApp: "Order via WhatsApp",
    callSeller: "Call Seller",
    noListingsFound: "No Marketplace Listings Found",
    broadenRadiusDesc: "Try broadening your GPS distance radius or select All categories.",
    postFirstListing: "Post Listing",

    // Smart Tasks
    generateAiPlan: "Generate AI Care Plan",
    pendingFilter: "Pending",
    completedFilter: "Completed",
    createNewTask: "Add Care Task",
    farmShed: "Farm Shed",

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
    appPreferences: "App Preferences & Settings",
    darkModeTheme: "Dark OLED Theme",
    darkModeDesc: "True pitch-black OLED enabled",
    lightModeDesc: "Clean light mode",
    languageSetting: "Language",
    languageDesc: "Tamil, Hindi & English",
    registeredHerdCount: "Total Registered Herd",
    cattleUnit: "Cattle",
    phoneLabel: "Phone",
    emailLabel: "Email",
    locationLabel: "Location",
    editProfile: "Edit Profile",
    save: "Save",
    cancel: "Cancel",

    // Add & Edit Animal Forms
    tagIdLabel: "Tag / RFID ID",
    cowNameLabel: "Cattle Name",
    ageLabel: "Age",
    genderLabel: "Gender",
    dailyMilkYieldLabel: "Daily Milk Yield (Liters)",
    healthScoreLabel: "Health Score (%)",
    vaccinationStatusLabel: "Vaccination Status",
    pregnancyStatusLabel: "Pregnancy Status",
    purchasePriceLabel: "Estimated Value / Price (₹)",
    biometricVerification: "Biometric Muzzle Verification",
    verified: "Verified",
    uploadPhoto: "Upload Photo",
    saveCattleRecord: "Save Cattle Record",
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
    farmSubtitle: "கொங்கு பாரம்பரிய நாட்டு மாடுகள் பண்ணை",
    cattleIqSubtitle: "CattleIQ மந்தை நுண்ணறிவு",

    // Home
    farmOverview: "பண்ணை விவரம்",
    totalAnimals: "மொத்த மாடுகள்",
    registeredCattle: "பதிவு மாடுகள்",
    milkYield: "பால் உற்பத்தி",
    literPerDay: "லி / நாள்",
    healthyStatus: "ஆரோக்கியம்",
    pregnantCattle: "சினை மாடுகள்",
    vaccinationsDue: "தடுப்பூசி பாக்கி",
    quickActions: "முக்கிய சேவைகள்",
    addAnimal: "மாடு சேர்",
    scanAnimal: "மாடு ஸ்கேன்",
    aiBiometricId: "AI & பயோமெட்ரிக்",
    scanCattleBtn: "மாடு ஸ்கேன் (AI & பயோமெட்ரிக்)",
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
    allDailyTasksCompleted: "இன்றைய பணிகள் அனைத்தும் முடிக்கப்பட்டன.",
    priorityBadge: "முக்கியம்",
    govtSubsidy: "அரசு மானியம்",
    feedPlanningSubtitle: "தீவனம், A2 பால் விலை மற்றும் அரசு மானியங்கள்",
    emergencyHelplineSubtitle: "24x7 அவசர கால்நடை மருத்துவ உதவி",
    marketQuickSubtitle: "மாடுகள் மற்றும் தீவனம் வாங்க, விற்க",

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
    climateAdapt: "தட்பவெப்ப நிலை",
    healthScore: "சுகாதார நிலை",
    vaccination: "தடுப்பூசி நிலை",
    noAnimalsFound: "மாடுகள் எதுவும் இல்லை",
    adjustFilterDesc: "தேடல் வினவலை மாற்றி அல்லது புதிய மாட்டைப் பதிவு செய்யுங்கள்.",
    details: "விவரம்",
    edit: "திருத்து",
    delete: "நீக்கு",
    dairy: "பால் பண்ணை",
    draught: "உழவு மாடுகள்",
    dualPurpose: "இருநோக்க இனம்",
    stateTamilNadu: "தமிழ்நாடு",
    health: "சுகாதாரம்",
    yield: "உற்பத்தி",
    yieldPerDay: "லி/நாள்",
    genderFemale: "பெண்",
    genderMale: "ஆண்",
    confirmDelete: "இந்த மாட்டின் பதிவை நிச்சயம் நீக்க விரும்புகிறீர்களா?",
    deleteConfirmTitle: "மாடு பதிவு நீக்கம்",
    deleteWarning: "இந்த செயல் உங்கள் மந்தை பதிவேட்டில் இருந்து இந்த மாட்டை நிரந்தரமாக நீக்கும்.",

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
    advisorSubtitle: "கால்நடை பொருளாதாரம், தீவன முறை மற்றும் மருத்துவ வழிகாட்டல்",
    askPlaceholder: "தீவனம், மானியம், அல்லது நோய் பராமரிப்பு பற்றி கேளுங்கள்...",
    suggestedFollowups: "பரிந்துரைக்கப்பட்ட கேள்விகள்:",
    listening: "கேட்கிறது...",
    suggestA2Pricing: "A2 பால் விலை நிர்ணயம்",
    suggestHeatCare: "கோடை வெப்ப பராமரிப்பு",
    suggestFeedPlanning: "குறைந்த செலவு தீவன முறை",
    suggestGovtSubsidy: "அரசு கால்நடை மானியம்",
    clearChat: "உரையாடலை அழிக்க",

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
    gpsRadius: "இருப்பிட தூரம்",
    within15km: "15 கி.மீக்குள்",
    within50km: "50 கி.மீக்குள்",
    within100km: "100 கி.மீக்குள்",
    allTamilNadu: "முழு தமிழ்நாடு",
    sales: "விற்பனை ஆர்டர்கள்",
    orderOnWhatsApp: "வாட்ஸ்அப் மூலம் ஆர்டர்",
    callSeller: "அழைக்க",
    noListingsFound: "சந்தை பட்டியல்கள் எதுவும் இல்லை",
    broadenRadiusDesc: "உங்கள் தூர வரம்பை அதிகரிக்கவும் அல்லது அனைத்து பிரிவுகளையும் தேர்வு செய்யவும்.",
    postFirstListing: "விளம்பரம் பதிவிடு",

    // Smart Tasks
    generateAiPlan: "AI பராமரிப்பு திட்டம்",
    pendingFilter: "நிலுவையில்",
    completedFilter: "முடிந்தது",
    createNewTask: "புதிய பணி சேர்",
    farmShed: "பண்ணை தொழுவம்",

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
    appPreferences: "செயலி விருப்பங்கள் & அமைப்புகள்",
    darkModeTheme: "டார்க் தீம்",
    darkModeDesc: "டார்க் பயன்முறை இயக்கப்பட்டது",
    lightModeDesc: "லைட் பயன்முறை",
    languageSetting: "மொழி",
    languageDesc: "தமிழ், இந்தி & ஆங்கிலம்",
    registeredHerdCount: "மொத்த பதிவு மாடுகள்",
    cattleUnit: "மாடுகள்",
    phoneLabel: "கைபேசி",
    emailLabel: "மின்னஞ்சல்",
    locationLabel: "இருப்பிடம்",
    editProfile: "சுயவிவரம் திருத்து",
    save: "சேமி",
    cancel: "ரத்து செய்",

    // Add & Edit Animal Forms
    tagIdLabel: "டேக் / RFID எண்",
    cowNameLabel: "மாட்டின் பெயர்",
    ageLabel: "வயது",
    genderLabel: "பாலினம்",
    dailyMilkYieldLabel: "தினசரி பால் உற்பத்தி (லிட்டர்)",
    healthScoreLabel: "சுகாதார நிலை (%)",
    vaccinationStatusLabel: "தடுப்பூசி நிலை",
    pregnancyStatusLabel: "சினை நிலை",
    purchasePriceLabel: "மதிப்பு / விலை (₹)",
    biometricVerification: "மூக்கு ரேகை பயோமெட்ரிக் சரிபார்ப்பு",
    verified: "சரிபார்க்கப்பட்டது",
    uploadPhoto: "புகைப்படம் பதிவேற்று",
    saveCattleRecord: "பதிவை சேமிக்கவும்",
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
    farmSubtitle: "कोंगु देशी मवेशी फार्म",
    cattleIqSubtitle: "CattleIQ पशु बुद्धिमत्ता",

    // Home
    farmOverview: "फार्म विवरण",
    totalAnimals: "कुल पशु",
    registeredCattle: "पंजीकृत पशु",
    milkYield: "दूध उत्पादन",
    literPerDay: "ली / दिन",
    healthyStatus: "स्वस्थ पशु",
    pregnantCattle: "गर्भवती गायें",
    vaccinationsDue: "टीकाकरण बाकी",
    quickActions: "त्वरित सेवाएं",
    addAnimal: "पशु जोड़ें",
    scanAnimal: "पशु स्कैन",
    aiBiometricId: "एआई & बायोमेट्रिक",
    scanCattleBtn: "पशु स्कैन (एआई & बायोमेट्रिक)",
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
    allDailyTasksCompleted: "आज के सभी कार्य पूर्ण हो गए हैं।",
    priorityBadge: "प्राथमिकता",
    govtSubsidy: "सरकारी सब्सिडी",
    feedPlanningSubtitle: "चारा, A2 दूध मूल्य निर्धारण और सरकारी योजनाएं",
    emergencyHelplineSubtitle: "24x7 आपातकालीन पशु चिकित्सा हेल्पलाइन",
    marketQuickSubtitle: "पशु और चारा खरीदें व बेचें",

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
    climateAdapt: "जलवायु",
    healthScore: "स्वास्थ्य स्कोर",
    vaccination: "टीकाकरण स्थिति",
    noAnimalsFound: "कोई पशु नहीं मिला",
    adjustFilterDesc: "अपनी खोज बदलें या नया पशु पंजीकृत करें।",
    details: "विवरण",
    edit: "संपादित करें",
    delete: "हटाएं",
    dairy: "डेयरी",
    draught: "भारवाही",
    dualPurpose: "द्वि-उद्देश्यीय",
    stateTamilNadu: "तमिलनाडु",
    health: "स्वास्थ्य",
    yield: "उत्पादन",
    yieldPerDay: "ली/दिन",
    genderFemale: "मादा",
    genderMale: "नर",
    confirmDelete: "क्या आप वाकई इस पशु का रिकॉर्ड हटाना चाहते हैं?",
    deleteConfirmTitle: "पशु रिकॉर्ड हटाएं",
    deleteWarning: "यह क्रिया आपके मवेशी रजिस्टर से इस पशु को स्थायी रूप से हटा देगी।",

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
    advisorSubtitle: "पशुधन अर्थशास्त्र, चारा नुस्खे और पशु चिकित्सा सलाह",
    askPlaceholder: "चारा, सब्सिडी या बीमारी देखभाल के बारे में पूछें...",
    suggestedFollowups: "सुझाए गए प्रश्न:",
    listening: "सुन रहा हूँ...",
    suggestA2Pricing: "A2 दूध का मूल्य निर्धारण",
    suggestHeatCare: "गर्मी में देखभाल",
    suggestFeedPlanning: "कम लागत चारा मिश्रण",
    suggestGovtSubsidy: "सरकारी पशु सब्सिडी",
    clearChat: "चैट इतिहास हटाएं",

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
    gpsRadius: "जीपीएस दूरी",
    within15km: "15 किमी के भीतर",
    within50km: "50 किमी के भीतर",
    within100km: "100 किमी के भीतर",
    allTamilNadu: "पूरा तमिलनाडु",
    sales: "बिक्री ऑर्डर",
    orderOnWhatsApp: "व्हाट्सएप पर ऑर्डर करें",
    callSeller: "कॉल करें",
    noListingsFound: "कोई बाज़ार सूची नहीं मिली",
    broadenRadiusDesc: "दूरी का दायरा बढ़ाएं या सभी श्रेणियां चुनें।",
    postFirstListing: "विज्ञापन जोड़ें",

    // Smart Tasks
    generateAiPlan: "एआई देखभाल योजना बनाएं",
    pendingFilter: "लंबित",
    completedFilter: "पूर्ण",
    createNewTask: "नया कार्य जोड़ें",
    farmShed: "फार्म शेड",

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
    appPreferences: "ऐप प्राथमिकताएं और सेटिंग्स",
    darkModeTheme: "डार्क थीम",
    darkModeDesc: "डार्क मोड सक्रिय",
    lightModeDesc: "लाइट मोड",
    languageSetting: "भाषा",
    languageDesc: "तमिल, हिंदी और अंग्रेजी",
    registeredHerdCount: "कुल पंजीकृत पशु",
    cattleUnit: "पशु",
    phoneLabel: "फ़ोन",
    emailLabel: "ईमेल",
    locationLabel: "स्थान",
    editProfile: "प्रोफ़ाइल संपादित करें",
    save: "सहेजें",
    cancel: "रद्द करें",

    // Add & Edit Animal Forms
    tagIdLabel: "टैग / आरएफआईडी संख्या",
    cowNameLabel: "पशु का नाम",
    ageLabel: "आयु",
    genderLabel: "लिंग",
    dailyMilkYieldLabel: "दैनिक दूध उत्पादन (लीटर)",
    healthScoreLabel: "स्वास्थ्य स्कोर (%)",
    vaccinationStatusLabel: "टीकाकरण स्थिति",
    pregnancyStatusLabel: "गर्भावस्था स्थिति",
    purchasePriceLabel: "अनुमानित मूल्य (₹)",
    biometricVerification: "बायोमेट्रिक थूथन सत्यापन",
    verified: "सत्यापित",
    uploadPhoto: "फोटो अपलोड करें",
    saveCattleRecord: "रिकॉर्ड सहेजें",
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
    if (lower.includes("kangayam") || lower.includes("kangeyam")) return "காங்கேயம்";
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
    if (lower.includes("kangayam") || lower.includes("kangeyam")) return "कांगायम";
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
 * Translates gender
 */
export function translateGender(gender?: string, lang?: Language | string): string {
  if (!gender) return "";
  const selectedLang = (lang as Language) || "English";
  const lower = gender.toLowerCase();
  if (selectedLang === "Tamil") {
    return lower.startsWith("f") ? "பெண்" : "ஆண்";
  }
  if (selectedLang === "Hindi") {
    return lower.startsWith("f") ? "मादा" : "नर";
  }
  return gender;
}

/**
 * Translates farm subtitle
 */
export function translateFarmName(farmName?: string, lang?: Language | string): string {
  if (!farmName) return "";
  const selectedLang = (lang as Language) || "English";
  if (farmName.includes("Kongu Indigenous Cattle Farm")) {
    if (selectedLang === "Tamil") return "கொங்கு நாட்டு மாடுகள் பண்ணை";
    if (selectedLang === "Hindi") return "कोंगु देशी मवेशी फार्म";
  }
  return farmName;
}

/**
 * Translates age strings like '4 Years', '3.5 Years', '6 Months'
 */
export function translateAge(age?: string, lang?: Language | string): string {
  if (!age) return "";
  const selectedLang = (lang as Language) || "English";
  if (selectedLang === "English") return age;

  const numMatch = age.match(/^([\d.]+)\s*(\w+)/);
  if (!numMatch) return age;
  const num = numMatch[1];
  const unit = numMatch[2].toLowerCase();

  if (selectedLang === "Tamil") {
    if (unit.startsWith("year") || unit.startsWith("yr")) {
      return num === "1" ? "1 ஆண்டு" : `${num} ஆண்டுகள்`;
    }
    if (unit.startsWith("month") || unit.startsWith("mo")) {
      return num === "1" ? "1 மாதம்" : `${num} மாதங்கள்`;
    }
  } else if (selectedLang === "Hindi") {
    if (unit.startsWith("year") || unit.startsWith("yr")) {
      return `${num} वर्ष`;
    }
    if (unit.startsWith("month") || unit.startsWith("mo")) {
      return `${num} महीने`;
    }
  }
  return age;
}

/**
 * Translates farm locations and geographic places
 */
export function translateLocation(location?: string, lang?: Language | string): string {
  if (!location) return "";
  const selectedLang = (lang as Language) || "English";
  if (selectedLang === "English") return location;
  const lower = location.toLowerCase();

  if (selectedLang === "Tamil") {
    if (lower.includes("main dairy shed") || lower.includes("main farm shed")) return "முதன்மை பண்ணை தொழுவம்";
    if (lower.includes("high yield dairy shed")) return "உயர் உற்பத்தி பால் தொழுவம்";
    if (lower.includes("pasture shed") || lower.includes("pasture b")) return "மேய்ச்சல் கொட்டகை";
    if (lower.includes("dairy shed") || lower.includes("milking shed")) return "பால் தொழுவம்";
    if (lower.includes("training ground")) return "பயிற்சி மைதானம்";
    if (lower.includes("maternity pen")) return "பிரசவ கொட்டகை";
    if (lower.includes("calf pen")) return "கன்று கொட்டகை";
    if (lower.includes("farm shed") || lower.includes("shed")) return "பண்ணை தொழுவம்";
    if (lower.includes("dharapuram")) return "தாராபுரம், திருப்பூர்";
    if (lower.includes("kangeyam") || lower.includes("kangayam")) return "காங்கேயம், திருப்பூர்";
    if (lower.includes("avinashi")) return "அவிநாசி, திருப்பூர்";
    if (lower.includes("pollachi")) return "பொள்ளாச்சி, கோயம்புத்தூர்";
    if (lower.includes("perundurai")) return "பெருந்துறை, ஈரோடு";
    if (lower.includes("coimbatore")) return "கோயம்புத்தூர்";
    if (lower.includes("tiruppur")) return "திருப்பூர்";
    if (lower.includes("erode")) return "ஈரோடு";
  } else if (selectedLang === "Hindi") {
    if (lower.includes("main dairy shed") || lower.includes("main farm shed")) return "मुख्य डेयरी शेड";
    if (lower.includes("high yield dairy shed")) return "उच्च उपज डेयरी शेड";
    if (lower.includes("pasture shed") || lower.includes("pasture b")) return "चारागाह शेड";
    if (lower.includes("dairy shed") || lower.includes("milking shed")) return "डेयरी शेड";
    if (lower.includes("training ground")) return "प्रशिक्षण मैदान";
    if (lower.includes("maternity pen")) return "प्रसूति बाड़ा";
    if (lower.includes("calf pen")) return "बछड़ा बाड़ा";
    if (lower.includes("farm shed") || lower.includes("shed")) return "फार्म शेड";
    if (lower.includes("dharapuram")) return "धारापुरम, तिरुपुर";
    if (lower.includes("kangeyam") || lower.includes("kangayam")) return "कांगायम, तिरुपुर";
    if (lower.includes("avinashi")) return "अविनाशी, तिरुपुर";
    if (lower.includes("pollachi")) return "पोलाची, कोयंबटूर";
    if (lower.includes("perundurai")) return "पेरुंदुरई, इरोड";
    if (lower.includes("coimbatore")) return "कोयंबटूर";
    if (lower.includes("tiruppur")) return "तिरुपुर";
    if (lower.includes("erode")) return "इरोड";
  }

  return location;
}

/**
 * Translates pregnancy & lactation status
 */
export function translatePregnancy(status?: string, lang?: Language | string): string {
  if (!status) return "";
  const selectedLang = (lang as Language) || "English";
  if (selectedLang === "English") return status;
  const lower = status.toLowerCase();

  if (selectedLang === "Tamil") {
    if (lower.includes("none") || lower === "no") return "இல்லை";
    if (lower.includes("lactating")) return "பால் கறவை";
    if (lower.includes("inseminated")) return "சினை ஊசி போடப்பட்டது";
    if (lower.includes("pregnant")) {
      const match = status.match(/(\d+)\s*month/i);
      if (match) return `சினை (${match[1]} மாதங்கள்)`;
      return "சினை";
    }
  } else if (selectedLang === "Hindi") {
    if (lower.includes("none") || lower === "no") return "कोई नहीं";
    if (lower.includes("lactating")) return "दूध देने वाली";
    if (lower.includes("inseminated")) return "गर्भाधान किया गया";
    if (lower.includes("pregnant")) {
      const match = status.match(/(\d+)\s*month/i);
      if (match) return `गर्भवती (${match[1]} महीने)`;
      return "गर्भवती";
    }
  }

  return status;
}

/**
 * Translates lactation stages
 */
export function translateLactationStage(stage?: string, lang?: Language | string): string {
  if (!stage) return "";
  const selectedLang = (lang as Language) || "English";
  if (selectedLang === "Tamil") {
    if (stage.toLowerCase().includes("early")) return "துவக்க நிலை";
    if (stage.toLowerCase().includes("mid")) return "நடுத்தர நிலை";
    if (stage.toLowerCase().includes("late")) return "இறுதி நிலை";
  } else if (selectedLang === "Hindi") {
    if (stage.toLowerCase().includes("early")) return "प्रारंभिक";
    if (stage.toLowerCase().includes("mid")) return "मध्यम";
    if (stage.toLowerCase().includes("late")) return "अंतिम";
  }
  return stage;
}

/**
 * Translates smart task titles into practical farmer instructions
 */
export function translateTaskTitle(title?: string, lang?: Language | string): string {
  if (!title) return "";
  const selectedLang = (lang as Language) || "English";
  if (selectedLang === "English") return title;
  const lower = title.toLowerCase();

  if (selectedLang === "Tamil") {
    if (lower.includes("feed") && lower.includes("concentrate")) {
      const kgMatch = title.match(/([\d.]+)\s*kg/i);
      const kg = kgMatch ? `${kgMatch[1]} கிலோ` : "";
      if (lower.includes("lakshmi")) return `லட்சுமிக்கு ${kg} சமச்சீர் அடர்தீவனம் அளிக்கவும்`;
      return `மாடுகளுக்கு ${kg} சமச்சீர் அடர்தீவனம் அளிக்கவும்`;
    }
    if (lower.includes("water misting") || lower.includes("shade cooling")) {
      if (lower.includes("sundari")) return "சுந்தரிக்கு தண்ணீர் தெளித்தல் & நிழல் குளிர்விப்பு";
      return "மாடுகளுக்கு தண்ணீர் தெளித்தல் & நிழல் குளிர்விப்பு";
    }
    if (lower.includes("calcium tonic")) {
      if (lower.includes("kamadhenu")) return "காமதேனுவிற்கு மாலை நேர கால்சியம் டானிக் (50மி.லி)";
      return "கறவை மாடுகளுக்கு கால்சியம் டானிக் வழங்கவும்";
    }
    if (lower.includes("inspect hoof") || lower.includes("muscle tone")) {
      if (lower.includes("veeran")) return "வீரனின் குளம்பு & உடல்திறன் பரிசோதனை";
      return "காளைகளுக்கு குளம்பு & உடல்திறன் பரிசோதனை";
    }
    if (lower.includes("summer heat stress") || lower.includes("heat stress")) {
      return "கோடை வெப்ப தணிப்பு & குளிர்ந்த நீர் தெளித்தல்";
    }
    if (lower.includes("pre-calving") || lower.includes("mineral bolus")) {
      return "பிரசவத்திற்கு முந்தைய தாது மாத்திரை & வைக்கோல் படுக்கை";
    }
    if (lower.includes("deworming")) {
      return "கன்றுக்கு குடற்புழு நீக்க மருந்து கொடுக்கவும்";
    }
    if (lower.includes("kollu") || lower.includes("horsegram")) {
      return "வீரனுக்கு குளம்பு பரிசோதனை & கொள்ளு தீவனம்";
    }
    if (lower.includes("foot & mouth") || lower.includes("fmd")) {
      return "கோமாரி நோய் (FMD) தடுப்பூசி திட்டமிடவும்";
    }
  } else if (selectedLang === "Hindi") {
    if (lower.includes("feed") && lower.includes("concentrate")) {
      const kgMatch = title.match(/([\d.]+)\s*kg/i);
      const kg = kgMatch ? `${kgMatch[1]} किलो` : "";
      if (lower.includes("lakshmi")) return `लक्ष्मी को ${kg} संतुलित दाना दें`;
      return `मवेशियों को ${kg} संतुलित दाना दें`;
    }
    if (lower.includes("water misting") || lower.includes("shade cooling")) {
      if (lower.includes("sundari")) return "सुंदरी के लिए पानी का छिड़काव और छाया";
      return "मवेशियों के लिए पानी का छिड़काव और छाया प्रबंधन";
    }
    if (lower.includes("calcium tonic")) {
      if (lower.includes("kamadhenu")) return "कामधेनु के लिए शाम का कैल्शियम टॉनिक (50 मिली)";
      return "दुधारू गायों के लिए कैल्शियम टॉनिक दें";
    }
    if (lower.includes("inspect hoof") || lower.includes("muscle tone")) {
      if (lower.includes("veeran")) return "वीरन के खुर और मांसपेशियों की जांच";
      return "सांडों के खुर और मांसपेशियों की जांच";
    }
    if (lower.includes("summer heat stress") || lower.includes("heat stress")) {
      return "गर्मी का तनाव प्रबंधन और ठंडा पानी छिड़काव";
    }
    if (lower.includes("pre-calving") || lower.includes("mineral bolus")) {
      return "प्रसव पूर्व खनिज गोली और सूखी पुआल बिस्तर";
    }
    if (lower.includes("deworming")) {
      return "बछड़े को पेट के कीड़े की दवा दें";
    }
    if (lower.includes("kollu") || lower.includes("horsegram")) {
      return "वीरन के लिए खुर की जांच और कुलथी चारा दें";
    }
    if (lower.includes("foot & mouth") || lower.includes("fmd")) {
      return "खुरपका-मुंहपका (FMD) टीका निर्धारित करें";
    }
  }

  return title;
}

/**
 * Translates smart task descriptions
 */
export function translateTaskDesc(desc?: string, lang?: Language | string): string {
  if (!desc) return "";
  const selectedLang = (lang as Language) || "English";
  if (selectedLang === "English") return desc;
  const lower = desc.toLowerCase();

  if (selectedLang === "Tamil") {
    if (lower.includes("morning milking concentrate ration") || (lower.includes("balanced ration") && lower.includes("cottonseed"))) {
      return "காலை பால் கறவை அடர்தீவனக் கலவை (பருத்தி கொட்டை புண்ணாக்கு + கோதுமை தவிடு) மற்றும் 50 கிராம் தாது உப்பு வழங்கி பால் உற்பத்தியைப் பெருக்கவும்.";
    }
    if (lower.includes("afternoon heat index") || lower.includes("heat surge")) {
      return "பிற்பகல் வெப்பம் 35°C தாண்டும் என எதிர்பார்க்கப்படுகிறது. கொட்டகையில் தண்ணீர் தெளிப்பான்களை இயக்கி குளிர்ந்த குடிநீர் வழங்கவும்.";
    }
    if (lower.includes("calcium gel") || lower.includes("calcium bolus")) {
      return "பால் காய்ச்சல் வராமல் தடுக்க மற்றும் அதிக பால் உற்பத்தியை பராமரிக்க வாய்வழியாக கால்சியம் மருந்து வழங்கவும்.";
    }
    if (lower.includes("sand track walking") || lower.includes("herbal oil")) {
      return "தினசரி மணல் நடை பயிற்சி மற்றும் மூலிகை தைலத்தால் கால் மசாஜ் செய்து காளையின் சுறுசுறுப்பை உறுதி செய்யவும்.";
    }
    if (lower.includes("routine 3-month calf deworming")) {
      return "3 மாத கன்றுக்கான வழக்கமான குடற்புழு நீக்க மருந்து கொடுத்த பின் கன்று வளர்ச்சி தீவனம் (500 கிராம்) வழங்கவும்.";
    }
    if (lower.includes("boiled horsegram") || lower.includes("finger millet")) {
      return "அதிக உடல்திறன் மற்றும் தசை வலிமைக்காக வேகவைத்த கொள்ளு (1.5 கிலோ) மற்றும் கேழ்வரகு கூழ் வழங்கவும்.";
    }
    if (lower.includes("vaccination overdue") || lower.includes("veterinary dispensary")) {
      return "தடுப்பூசி பாக்கி உள்ளது. இலவச அரையாண்டு FMD தடுப்பூசிக்கு அரசு கால்நடை மருந்தகத்தைத் தொடர்பு கொள்ளவும்.";
    }
  } else if (selectedLang === "Hindi") {
    if (lower.includes("morning milking concentrate ration") || (lower.includes("balanced ration") && lower.includes("cottonseed"))) {
      return "दूध उत्पादन बढ़ाने के लिए संतुलित दाना (कपास बीज खल + गेहूं का चोकर) और 50 ग्राम खनिज मिश्रण दें।";
    }
    if (lower.includes("afternoon heat index") || lower.includes("heat surge")) {
      return "दोपहर में तापमान 35°C पार होने की संभावना है। शेड में फव्वारे चालू करें और ठंडा पानी दें।";
    }
    if (lower.includes("calcium gel") || lower.includes("calcium bolus")) {
      return "मिल्क फीवर से बचाव और उच्च दुग्ध उत्पादन बनाए रखने के लिए ओरल कैल्शियम टॉनिक दें।";
    }
    if (lower.includes("sand track walking") || lower.includes("herbal oil")) {
      return "दैनिक रेत ट्रैक चलने का अभ्यास और हर्बल तेल से मालिश करें।";
    }
    if (lower.includes("routine 3-month calf deworming")) {
      return "3 महीने के बछड़े के लिए नियमित कृमिनाशक दवा दें और 500 ग्राम बछड़ा आहार प्रदान करें।";
    }
    if (lower.includes("boiled horsegram") || lower.includes("finger millet")) {
      return "शारीरिक सहनशक्ति और मांसपेशियों के विकास के लिए उबली हुई कुलथी और रागी दलिया दें।";
    }
    if (lower.includes("vaccination overdue") || lower.includes("veterinary dispensary")) {
      return "टीकाकरण बाकी है। मुफ्त एफएमडी बूस्टर के लिए स्थानीय पशु चिकित्सालय से संपर्क करें।";
    }
  }

  return desc;
}

/**
 * Translates task category tags
 */
export function translateTaskCategory(cat?: string, lang?: Language | string): string {
  if (!cat) return "";
  const selectedLang = (lang as Language) || "English";
  if (selectedLang === "Tamil") {
    if (cat === "Feeding") return "தீவனம்";
    if (cat === "Weather") return "வானிலை";
    if (cat === "Vaccination") return "தடுப்பூசி";
    if (cat === "Deworming") return "குடற்புழு நீக்கம்";
    if (cat === "Gestation") return "சினை பராமரிப்பு";
    if (cat === "General") return "பொது";
  } else if (selectedLang === "Hindi") {
    if (cat === "Feeding") return "चारा";
    if (cat === "Weather") return "मौसम";
    if (cat === "Vaccination") return "टीकाकरण";
    if (cat === "Deworming") return "कृमिनाशक";
    if (cat === "Gestation") return "गर्भावस्था";
    if (cat === "General") return "सामान्य";
  }
  return cat;
}

/**
 * Translates Marketplace listings titles
 */
export function translateMarketTitle(title?: string, lang?: Language | string): string {
  if (!title) return "";
  const selectedLang = (lang as Language) || "English";
  if (selectedLang === "English") return title;
  const lower = title.toLowerCase();

  if (selectedLang === "Tamil") {
    if (lower.includes("purebred kangayam")) return "பாரம்பரிய காங்கேயம் கறவை மாடு";
    if (lower.includes("gir elite")) return "கிர் உயர்ரக பால் மாடு";
    if (lower.includes("senior bovine surgeon")) return "மூத்த கால்நடை மருத்துவர் & அறுவை சிகிச்சை நிபுணர்";
    if (lower.includes("super napier co-5")) return "சூப்பர் நேப்பியர் CO-5 பசுந்தீவனம்";
    if (lower.includes("sahiwal")) return "உயர் உற்பத்தி சாகிவால் மாடு";
    if (lower.includes("hallikar")) return "ஹள்ளிகார் பொலி காளை";
  } else if (selectedLang === "Hindi") {
    if (lower.includes("purebred kangayam")) return "शुद्ध कांगायम डेयरी गाय";
    if (lower.includes("gir elite")) return "गीर उत्कृष्ट डेयरी गाय";
    if (lower.includes("senior bovine surgeon")) return "वरिष्ठ पशु चिकित्सक और सर्जन";
    if (lower.includes("super napier co-5")) return "सुपर नेपियर CO-5 हरा चारा";
    if (lower.includes("sahiwal")) return "उच्च उपज साहीवाल गाय";
    if (lower.includes("hallikar")) return "हल्लीकर प्रजनन सांड";
  }

  return title;
}

/**
 * Translates Marketplace listings descriptions
 */
export function translateMarketDesc(desc?: string, lang?: Language | string): string {
  if (!desc) return "";
  const selectedLang = (lang as Language) || "English";
  if (selectedLang === "English") return desc;
  const lower = desc.toLowerCase();

  if (selectedLang === "Tamil") {
    if (lower.includes("authentic kangayam milch cow")) {
      return "உண்மையான காங்கேயம் கறவை மாடு, 2வது ஈத்து, நாள் ஒன்றுக்கு 6 லிட்டர் தூய A2 பால் தரும்.";
    }
    if (lower.includes("high-yielding gir a2 dairy cow")) {
      return "உயர் உற்பத்தி கிர் A2 பால் மாடு, சாந்தமான குணம், சரிபார்க்கப்பட்ட பரம்பரை மற்றும் நல்வாழ்வு.";
    }
    if (lower.includes("indigenous bovine gynecology")) {
      return "நாட்டு மாடுகளின் சினை பரிசோதனை, சிகிச்சை மற்றும் தடுப்பூசி பணிகளில் 18+ ஆண்டுகள் அனுபவம் வாய்ந்தவர்.";
    }
    if (lower.includes("super napier co-5 green fodder")) {
      return "தரமான சூப்பர் நேப்பியர் CO-5 பசுந்தீவனக் கட்டுகள் நேரடியாக உங்கள் பண்ணைக்கே கொண்டு வரப்படும்.";
    }
  } else if (selectedLang === "Hindi") {
    if (lower.includes("authentic kangayam milch cow")) {
      return "प्रामाणिक कांगायम दुधारू गाय, 2री ब्यात, प्रतिदिन 6 लीटर शुद्ध A2 दूध देती है।";
    }
    if (lower.includes("high-yielding gir a2 dairy cow")) {
      return "उच्च उपज वाली गीर A2 डेयरी गाय, शांत स्वभाव, प्रमाणित स्वास्थ्य रिकॉर्ड।";
    }
    if (lower.includes("indigenous bovine gynecology")) {
      return "देशी मवेशी स्त्री रोग, गर्भावस्था निदान और टीकाकरण में 18+ वर्षों का अनुभव।";
    }
    if (lower.includes("super napier co-5 green fodder")) {
      return "प्रमाणित सुपर नेपियर CO-5 हरे चारे की गांठें सीधे आपके फार्म पर पहुंचाई जाएंगी।";
    }
  }

  return desc;
}

/**
 * Translates Marketplace status badges
 */
export function translateMarketBadge(badge?: string, lang?: Language | string): string {
  if (!badge) return "";
  const selectedLang = (lang as Language) || "English";
  if (selectedLang === "English") return badge;
  const lower = badge.toLowerCase();

  if (selectedLang === "Tamil") {
    if (lower.includes("1st calver") || lower.includes("6l")) return "1வது ஈத்து • 6லி / நாள்";
    if (lower.includes("14l") || lower.includes("2nd calver")) return "14லி / நாள் • 2வது ஈத்து";
    if (lower.includes("24x7 emergency")) return "24x7 அவசர சிகிச்சை தயார்";
    if (lower.includes("high protein") || lower.includes("fresh cut")) return "அதிக புரதம் • புதிய அறுவடை";
  } else if (selectedLang === "Hindi") {
    if (lower.includes("1st calver") || lower.includes("6l")) return "1ली ब्यात • 6ली / दिन";
    if (lower.includes("14l") || lower.includes("2nd calver")) return "14ली / दिन • 2री ब्यात";
    if (lower.includes("24x7 emergency")) return "24x7 आपातकालीन उपलब्ध";
    if (lower.includes("high protein") || lower.includes("fresh cut")) return "उच्च प्रोटीन • ताजा कट";
  }

  return badge;
}

/**
 * Translates Marketplace categories
 */
export function translateMarketCategory(cat?: string, lang?: Language | string): string {
  if (!cat) return "";
  const selectedLang = (lang as Language) || "English";
  if (selectedLang === "Tamil") {
    if (cat.includes("Cattle")) return "மாடுகள் விற்பனைக்கு";
    if (cat.includes("Veterinarians") || cat.includes("Vet")) return "கால்நடை மருத்துவர்கள்";
    if (cat.includes("Feed")) return "பசுந்தீவன விநியோகம்";
    if (cat.includes("Equipment")) return "பண்ணைக் கருவிகள்";
  } else if (selectedLang === "Hindi") {
    if (cat.includes("Cattle")) return "मवेशी बिक्री के लिए";
    if (cat.includes("Veterinarians") || cat.includes("Vet")) return "पशु चिकित्सक";
    if (cat.includes("Feed")) return "चारा आपूर्तिकर्ता";
    if (cat.includes("Equipment")) return "फार्म उपकरण";
  }
  return cat;
}

/**
 * Translates Indian States
 */
export function translateBreedState(state?: string, lang?: Language | string): string {
  if (!state) return "";
  const selectedLang = (lang as Language) || "English";
  if (selectedLang === "Tamil") {
    if (state.includes("Tamil Nadu")) return "தமிழ்நாடு";
    if (state.includes("Gujarat")) return "குஜராத்";
    if (state.includes("Karnataka")) return "கர்நாடகா";
    if (state.includes("Andhra")) return "ஆந்திரப் பிரதேசம்";
    if (state.includes("Kerala")) return "கேரளா";
    if (state.includes("Maharashtra")) return "மகாராஷ்டிரா";
    if (state.includes("Punjab")) return "பஞ்சாப் / ராஜஸ்தான்";
    if (state.includes("Rajasthan")) return "ராஜஸ்தான்";
    if (state.includes("Haryana")) return "ஹரியானா";
  } else if (selectedLang === "Hindi") {
    if (state.includes("Tamil Nadu")) return "तमिलनाडु";
    if (state.includes("Gujarat")) return "गुजरात";
    if (state.includes("Karnataka")) return "कर्नाटक";
    if (state.includes("Andhra")) return "आंध्र प्रदेश";
    if (state.includes("Kerala")) return "केरल";
    if (state.includes("Maharashtra")) return "महाराष्ट्र";
    if (state.includes("Punjab")) return "पंजाब / राजस्थान";
    if (state.includes("Rajasthan")) return "राजस्थान";
    if (state.includes("Haryana")) return "हरियाणा";
  }
  return state;
}

/**
 * Translates Breed Population Status
 */
export function translateBreedStatus(status?: string, lang?: Language | string): string {
  if (!status) return "";
  const selectedLang = (lang as Language) || "English";
  if (selectedLang === "Tamil") {
    if (status.includes("Stable")) return "நிலையான எண்ணிக்கை";
    if (status.includes("Conservation")) return "பாதுகாப்பு முன்னுரிமை";
    if (status.includes("Rare")) return "அரிய இனம்";
  } else if (selectedLang === "Hindi") {
    if (status.includes("Stable")) return "स्थिर जनसंख्या";
    if (status.includes("Conservation")) return "संरक्षण प्राथमिकता";
    if (status.includes("Rare")) return "दुर्लभ नस्ल";
  }
  return status;
}

/**
 * Translates Breed Climate Adaptation text
 */
export function translateBreedClimate(climate?: string, lang?: Language | string): string {
  if (!climate) return "";
  const selectedLang = (lang as Language) || "English";
  if (selectedLang === "English") return climate;
  const lower = climate.toLowerCase();

  if (selectedLang === "Tamil") {
    if (lower.includes("semi-arid") || lower.includes("gravelly")) return "வறண்ட, சிவப்பு சரளை மண் பூமி";
    if (lower.includes("scrub forest") || lower.includes("pasture")) return "வறண்ட முட்புதர் காடு & மேய்ச்சல்";
    if (lower.includes("forested hilly") || lower.includes("elevation")) return "மலைப்பகுதி காடு நிலப்பரப்பு (3000 அடி)";
    if (lower.includes("marshy") || lower.includes("delta mud")) return "காவிரி டெல்டா சதுப்பு நிலம் & களிமண்";
    if (lower.includes("black cotton soil")) return "கரிசல் மண் ஆற்றுப் படுகை";
    if (lower.includes("coastal wetlands")) return "கடலோர சதுப்பு நில வெப்ப மண்டலம்";
    if (lower.includes("heavy rainfall")) return "அதிக மழைப்பொழிவு மலைப்பகுதி";
    if (lower.includes("arid") || lower.includes("desert")) return "அதிவெப்ப பாலைவன வறண்ட பகுதி";
    if (lower.includes("river plains") || lower.includes("plains")) return "ஆற்றுச் சமவெளி வெப்பமண்டலம்";
  } else if (selectedLang === "Hindi") {
    if (lower.includes("semi-arid") || lower.includes("gravelly")) return "अर्ध-शुष्क, लाल बजरी वाली भूमि";
    if (lower.includes("scrub forest") || lower.includes("pasture")) return "शुष्क झाड़ीदार जंगल और चारागाह";
    if (lower.includes("forested hilly") || lower.includes("elevation")) return "पहाड़ी वन क्षेत्र (3000 फीट)";
    if (lower.includes("marshy") || lower.includes("delta mud")) return "कावेरी डेल्टा दलदली भूमि और कीचड़";
    if (lower.includes("black cotton soil")) return "काली कपासी मिट्टी नदी बेसिन";
    if (lower.includes("coastal wetlands")) return "तटीय आर्द्रभूमि उष्णकटिबंधीय";
    if (lower.includes("heavy rainfall")) return "भारी वर्षा पहाड़ी क्षेत्र";
    if (lower.includes("arid") || lower.includes("desert")) return "अत्यधिक थार रेगिस्तानी गर्मी";
    if (lower.includes("river plains") || lower.includes("plains")) return "मैदानी उष्णकटिबंधीय क्षेत्र";
  }

  return climate;
}

/**
 * Translates rich breed fields (descriptions, traits, immunity, productivity, subsidies)
 */
export function translateBreedField(text?: string, lang?: Language | string): string {
  if (!text) return "";
  const selectedLang = (lang as Language) || "English";
  if (selectedLang === "English") return text;
  const lower = text.toLowerCase();

  if (selectedLang === "Tamil") {
    // Descriptions & traits
    if (lower.includes("pride of kongu nadu") || lower.includes("hardiest draught breeds")) {
      return "கொங்கு நாட்டின் பெருமையான காங்கேயம், கடும் வெயிலிலும் அதிக எடையுள்ள விவசாய பாரங்களை இழுக்கும் உலகின் மிக வலிமையான நாட்டு மாட்டினமாகும்.";
    }
    if (lower.includes("iconic tamil nadu indigenous cattle breed") || lower.includes("pulikulam is an iconic")) {
      return "புலிகுளம் என்பது மதுரை, சிவகங்கை பகுதிகளில் புகழ்பெற்ற வேகமான ஓட்டம், சுறுசுறுப்பு மற்றும் மந்தை பற்று கொண்ட தமிழரின் பாரம்பரிய மாட்டினமாகும்.";
    }
    if (lower.includes("bargur cattle are renowned for trotting speed")) {
      return "பர்கூர் மாடுகள் மலைப்பகுதியில் விரைவாக நடக்கும் திறனுக்கும், காடுகளில் மேய்ந்து மூலிகை சத்து நிறைந்த பால் தருவதற்கும் புகழ்பெற்றவை.";
    }
    if (lower.includes("undisputed master of wet paddy puddling")) {
      return "காவிரி டெல்டாவில் நனைந்த வயல்களில் உழவு செய்வதில் இணையற்ற உம்பளச்சேரி மாடுகள், நீரில் நீண்ட நேரம் நின்றாலும் குளம்பு அழுகல் நோயை எதிர்க்கும் திறன் கொண்டவை.";
    }
    if (lower.includes("star of indian a2 dairy breeds") || (lower.includes("gir is famous") && lower.includes("dome forehead"))) {
      return "இந்திய A2 பால் மாடுகளின் மணிமகுடமான கிர் மாடு, உயர்ந்த பால் உற்பத்தி, குவிந்த நெற்றி மற்றும் அமைதியான குணத்திற்கு உலகளவில் புகழ்பெற்றது.";
    }
    if (lower.includes("sahiwal is the heaviest milking")) {
      return "சாகிவால் இந்தியாவின் மிக அதிக பால் தரும் நாட்டு மாட்டினமாகும், இது சுவையான இனிப்பான A2 பாலுக்கும் சாந்தமான நடத்தைக்கும் பெயர் பெற்றது.";
    }
    if (lower.includes("premier dairy buffalo breed of india") || lower.includes("black gold")) {
      return "முர்ரா எருமை இந்தியாவின் முதன்மையான பால் எருமை இனமாகும், இது அதிக கொழுப்பு சத்து கொண்ட பாலுக்காக 'கருப்பு தங்கம்' என அழைக்கப்படுகிறது.";
    }
    if (lower.includes("miniature miracle cow of kerala")) {
      return "வெச்சூர் மாடு கேரளாவின் குள்ள அதிசய பசுவாகும், இது எளிதில் செரிமானமாகும் அதிக மருத்துவக் குணம் கொண்ட A2 பாலைத் தருகிறது.";
    }
    if (lower.includes("rathi cattle are the resilient lifeline")) {
      return "ராத்தி மாடுகள் தார் பாலைவனத்தின் கடுமையான வெப்பத்திலும் நிலையான பால் உற்பத்தியை வழங்கும் வறட்சியைத் தாங்கும் மாடுகளாகும்.";
    }
    if (lower.includes("tharparkar is a white-coated desert breed")) {
      return "தார்பார்க்கர் வெள்ளை நிற ரோமங்களைக் கொண்ட மாடு, இது கடுமையான வெயிலைப் பிரதிபலித்து 48°C வெப்பத்திலும் தொடர்ந்து பால் தரும்.";
    }
    // Subsidies description
    if (lower.includes("rashtriya gokul mission") || lower.includes("gokul mission") || lower.includes("conservation subsidy")) {
      return "தேசிய கோகுல் திட்டத்தின் கீழ் சான்றளிக்கப்பட்ட நாட்டு பொலி காளை வளர்ப்பிற்கு 50% வரை நேரடி அரசு மானியம் வழங்கப்படுகிறது.";
    }
    if (lower.includes("tamil nadu state indigenous livestock award") || lower.includes("grant")) {
      return "தமிழ்நாடு அரசு பாரம்பரிய கால்நடை வளர்ப்போர் விருது மற்றும் பதிவு செய்த வளர்ப்போருக்கு சிறப்பு ஊட்டச்சத்து மானியம்.";
    }
    // Physical traits
    if (lower.includes("compact body, short thick outward horns") || lower.includes("dark grey or black head")) {
      return "கச்சிதமான கட்டுக்கோப்பான உடல், தடிமனான கூர்மையான கொம்புகள், காளைகளுக்கு அடர் சாம்பல்/கருப்பு தலை, திமில் மற்றும் உறுதியான கால்கள்.";
    }
    if (lower.includes("distinct convex dome forehead") || lower.includes("long pendulous drooping ears")) {
      return "குவிந்த நெற்றி திட்டு, இலை போல் மடிந்து தொங்கும் நீண்ட காதுகள், சிவப்பு அல்லது புள்ளிகள் நிறைந்த ரோமம், அமைதியான சுபாவம்.";
    }
    if (lower.includes("jet black body, tightly coiled spiral horns")) {
      return "அடர் கருப்பு நிற உடல், சுருள் வடிவ கொம்புகள், பெரிய பால் மடி மற்றும் தெளிவான பால் நரம்புகள்.";
    }
    // Immunity & productivity
    if (lower.includes("high immunity against foot and mouth disease") || lower.includes("tick-borne")) {
      return "கோமாரி நோய் மற்றும் உண்ணி ஒட்டுண்ணி காய்ச்சலை இயற்கையாகவே எதிர்க்கும் மிக உயர்ந்த நோய் எதிர்ப்பு சக்தி.";
    }
    if (lower.includes("draft power up to 2.5 times") || lower.includes("working lifespan")) {
      return "தன் உடல் எடையை விட 2.5 மடங்கு பாரத்தை இழுக்கும் திறன்; 15-18 ஆண்டுகளுக்கு மேல் உழைக்கும் நீண்ட ஆயுட்காலம்.";
    }
    if (lower.includes("top-tier a2 milk producer") || lower.includes("peak yielders exceed 22")) {
      return "முதல் தரமான A2 பால் உற்பத்தி; உச்ச பருவத்தில் நாள் ஒன்றுக்கு 16-22 லிட்டர் வரை பால் தரும் திறன்.";
    }
  } else if (selectedLang === "Hindi") {
    if (lower.includes("pride of kongu nadu") || lower.includes("hardiest draught breeds")) {
      return "कोंगु नाडु का गौरव, कांगायम दुनिया की सबसे मजबूत भारवाही नस्लों में से एक है, जो अत्यधिक गर्मी में भी भारी कृषि कार्य करती है।";
    }
    if (lower.includes("star of indian a2 dairy breeds") || lower.includes("gir is famous")) {
      return "भारतीय A2 डेयरी नस्लों का सितारा, गीर गाय अपनी उच्च दुग्ध उत्पादकता, विशिष्ट उभरे हुए माथे और शांत स्वभाव के लिए प्रसिद्ध है।";
    }
    if (lower.includes("sahiwal is the heaviest milking")) {
      return "साहीवाल भारत में सबसे अधिक दूध देने वाली देशी गाय की नस्ल है, जो मीठे A2 दूध के लिए जानी जाती है।";
    }
    if (lower.includes("premier dairy buffalo breed of india") || lower.includes("black gold")) {
      return "मुर्रा भारत की प्रमुख दुग्ध भैंस नस्ल है, जिसे उच्च वसा वाले दूध के कारण 'काला सोना' कहा जाता है।";
    }
    if (lower.includes("rashtriya gokul mission") || lower.includes("gokul mission") || lower.includes("subsidy")) {
      return "राष्ट्रीय गोकुल मिशन के तहत देशी सांड प्रजनन और डेयरी फार्म स्थापना के लिए 50% तक सब्सिडी उपलब्ध है।";
    }
    if (lower.includes("high immunity against foot and mouth disease") || lower.includes("tick-borne")) {
      return "खुरपका-मुंहपका (FMD) और परजीवी संक्रमण के खिलाफ प्राकृतिक रोग प्रतिरोधक क्षमता।";
    }
  }

  return text;
}

/**
 * Translates Medical History log types
 */
export function translateMedicalType(type?: string, lang?: Language | string): string {
  if (!type) return "";
  const selectedLang = (lang as Language) || "English";
  if (selectedLang === "Tamil") {
    if (type.includes("Vaccination")) return "தடுப்பூசி";
    if (type.includes("Health Audit") || type.includes("Audit")) return "உடல்நல தணிக்கை";
    if (type.includes("Treatment")) return "மருத்துவ சிகிச்சை";
    if (type.includes("Deworming")) return "குடற்புழு நீக்கம்";
    if (type.includes("Pregnancy")) return "சினை பரிசோதனை";
    if (type.includes("Insemination")) return "சினை ஊசி";
  } else if (selectedLang === "Hindi") {
    if (type.includes("Vaccination")) return "टीकाकरण";
    if (type.includes("Health Audit") || type.includes("Audit")) return "स्वास्थ्य जांच";
    if (type.includes("Treatment")) return "उपचार";
    if (type.includes("Deworming")) return "कृमिनाशक";
    if (type.includes("Pregnancy")) return "गर्भावस्था जांच";
    if (type.includes("Insemination")) return "गर्भाधान";
  }
  return type;
}

/**
 * Translates Medical History log descriptions
 */
export function translateMedicalDesc(desc?: string, lang?: Language | string): string {
  if (!desc) return "";
  const selectedLang = (lang as Language) || "English";
  if (selectedLang === "English") return desc;
  const lower = desc.toLowerCase();

  if (selectedLang === "Tamil") {
    if (lower.includes("administered 6-month fmd booster") || lower.includes("fmd booster vaccine")) {
      return "6 மாத கோமாரி நோய் (FMD) பூஸ்டர் தடுப்பூசி வெற்றிகரமாக போடப்பட்டது.";
    }
    if (lower.includes("pre-event physical stamina") || lower.includes("bone fitness passed")) {
      return "உடல்திறன், மூட்டு உறுதி மற்றும் எலும்பு ஆரோக்கிய பரிசோதனை தேர்ச்சி பெற்றது.";
    }
    if (lower.includes("post-calving mineral bolus supplement")) {
      return "ஈன்றெடுத்த பிறகு தாது சத்து மற்றும் கால்சியம் மாத்திரை வழங்கப்பட்டது.";
    }
    if (lower.includes("mild heat stress observed") || lower.includes("scheduled deworming")) {
      return "லேசான வெப்ப அழுத்தம் காணப்பட்டது. வழக்கமான குடற்புழு நீக்கம் பரிந்துரைக்கப்பட்டது.";
    }
  } else if (selectedLang === "Hindi") {
    if (lower.includes("administered 6-month fmd booster") || lower.includes("fmd booster vaccine")) {
      return "6 महीने का खुरपका-मुंहपका (FMD) बूस्टर टीका लगाया गया।";
    }
    if (lower.includes("pre-event physical stamina") || lower.includes("bone fitness passed")) {
      return "शारीरिक सहनशक्ति और हड्डियों की फिटनेस जांच में सफल।";
    }
    if (lower.includes("post-calving mineral bolus supplement")) {
      return "प्रसव के बाद खनिज गोली पूरक दिया गया।";
    }
    if (lower.includes("mild heat stress observed") || lower.includes("scheduled deworming")) {
      return "हल्का गर्मी का तनाव देखा गया। कृमिनाशक दवा दी गई।";
    }
  }

  return desc;
}

/**
 * Translates Doctor names
 */
export function translateDoctorName(doctor?: string, lang?: Language | string): string {
  if (!doctor) return "";
  const selectedLang = (lang as Language) || "English";
  if (selectedLang === "Tamil") {
    if (doctor.includes("Senthil Kumar")) return "டாக்டர் கே. செந்தில்குமார், B.V.Sc";
    if (doctor.includes("Arumugam")) return "டாக்டர் பி. ஆறுமுகம், B.V.Sc";
    if (doctor.includes("Manoharan")) return "டாக்டர் ஆர். மனோகரன், M.V.Sc";
    if (doctor.includes("Ramesh")) return "டாக்டர் ஏ. ரமேஷ், B.V.Sc";
  } else if (selectedLang === "Hindi") {
    if (doctor.includes("Senthil Kumar")) return "डॉ. के. सेंथिल कुमार";
    if (doctor.includes("Arumugam")) return "डॉ. पी. अरुमुगम";
    if (doctor.includes("Manoharan")) return "डॉ. आर. मनोहरन";
    if (doctor.includes("Ramesh")) return "डॉ. ए. रमेश";
  }
  return doctor;
}

/**
 * Translates Time of Day (e.g. 06:30 AM -> காலை 06:30)
 */
export function translateTime(time?: string, lang?: Language | string): string {
  if (!time) return "";
  const selectedLang = (lang as Language) || "English";
  if (selectedLang === "English") return time;

  const match = time.match(/^(\d{1,2}:\d{2})\s*(AM|PM)/i);
  if (!match) return time;
  const clock = match[1];
  const period = match[2].toUpperCase();
  const hour = parseInt(clock.split(":")[0], 10);

  if (selectedLang === "Tamil") {
    if (period === "AM") {
      if (hour >= 4 && hour < 12) return `காலை ${clock}`;
      return `இரவு ${clock}`;
    } else {
      if (hour === 12 || hour < 4) return `மதியம் ${clock}`;
      if (hour >= 4 && hour < 8) return `மாலை ${clock}`;
      return `இரவு ${clock}`;
    }
  } else if (selectedLang === "Hindi") {
    if (period === "AM") {
      if (hour >= 4 && hour < 12) return `सुबह ${clock}`;
      return `रात ${clock}`;
    } else {
      if (hour === 12 || hour < 4) return `दोपहर ${clock}`;
      if (hour >= 4 && hour < 8) return `शाम ${clock}`;
      return `रात ${clock}`;
    }
  }

  return time;
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

