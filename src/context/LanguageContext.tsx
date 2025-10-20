import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'te' | 'ta' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

const translations: Record<Language, any> = {
  en: {
    app: {
      title: 'CropAdvisor',
      subtitle: 'AI-powered crop recommendations based on your soil, climate, and market trends',
      tagline: 'Smart farming decisions for maximum yield and profit',
    },
    form: {
      soilType: 'Soil Type',
      selectSoil: 'Select soil type',
      climate: 'Climate Type',
      selectClimate: 'Select climate type',
      rainfall: 'Annual Rainfall (mm)',
      rainfallPlaceholder: 'e.g., 800',
      temperature: 'Average Temperature (°C)',
      tempPlaceholder: 'e.g., 25',
      farmSize: 'Farm Size (acres)',
      farmSizePlaceholder: 'e.g., 5',
      submit: 'Get Crop Recommendations',
      analyzing: 'Analyzing...',
    },
    soilTypes: {
      'Loamy': 'Loamy',
      'Clay': 'Clay',
      'Sandy': 'Sandy',
      'Sandy Loam': 'Sandy Loam',
      'Clay Loam': 'Clay Loam',
      'Black': 'Black',
      'Red': 'Red',
    },
    climateTypes: {
      'Tropical': 'Tropical',
      'Sub-tropical': 'Sub-tropical',
      'Temperate': 'Temperate',
      'Arid': 'Arid',
      'Semi-arid': 'Semi-arid',
    },
    insights: {
      title: 'Market Insights',
      highDemand: 'High Demand Crops',
      highDemandText: 'Pulses and oilseeds are seeing increased demand due to growing health awareness. Chickpea prices are up 15% this quarter.',
      seasonal: 'Seasonal Trends',
      seasonalText: 'Cotton and rice show strong seasonal demand patterns. Plan planting to align with peak market prices for maximum returns.',
      export: 'Export Opportunities',
      exportText: 'International demand for organic produce and specialty crops continues to grow. Consider certification for premium markets.',
    },
    recommendations: {
      title: 'Recommended Crops for Your Farm',
      match: 'Match',
      marketPrice: 'Market Price',
      marketDemand: 'Market Demand',
      season: 'Season',
      compatibility: 'Compatibility',
      excellent: 'Excellent',
      whyThisCrop: 'Why This Crop?',
      demand: {
        high: 'High',
        medium: 'Medium',
        low: 'Low',
      },
    },
    empty: {
      title: 'Get Started with Smart Crop Planning',
      description: 'Enter your farm details above to receive personalized crop recommendations. Our AI analyzes soil type, climate conditions, rainfall patterns, and current market trends to suggest the most profitable crops for your land.',
    },
    footer: {
      powered: 'Powered by advanced agricultural data and market analytics',
      helping: 'Helping farmers make data-driven decisions',
    },
    error: 'Error',
  },
  hi: {
    app: {
      title: 'फसल सलाहकार',
      subtitle: 'आपकी मिट्टी, जलवायु और बाजार के रुझान के आधार पर एआई-संचालित फसल सिफारिशें',
      tagline: 'अधिकतम उपज और लाभ के लिए स्मार्ट खेती निर्णय',
    },
    form: {
      soilType: 'मिट्टी का प्रकार',
      selectSoil: 'मिट्टी का प्रकार चुनें',
      climate: 'जलवायु प्रकार',
      selectClimate: 'जलवायु प्रकार चुनें',
      rainfall: 'वार्षिक वर्षा (मिमी)',
      rainfallPlaceholder: 'उदा., 800',
      temperature: 'औसत तापमान (°C)',
      tempPlaceholder: 'उदा., 25',
      farmSize: 'खेत का आकार (एकड़)',
      farmSizePlaceholder: 'उदा., 5',
      submit: 'फसल सिफारिशें प्राप्त करें',
      analyzing: 'विश्लेषण कर रहे हैं...',
    },
    soilTypes: {
      'Loamy': 'दोमट',
      'Clay': 'चिकनी',
      'Sandy': 'बलुई',
      'Sandy Loam': 'बलुई दोमट',
      'Clay Loam': 'चिकनी दोमट',
      'Black': 'काली',
      'Red': 'लाल',
    },
    climateTypes: {
      'Tropical': 'उष्णकटिबंधीय',
      'Sub-tropical': 'उपोष्णकटिबंधीय',
      'Temperate': 'समशीतोष्ण',
      'Arid': 'शुष्क',
      'Semi-arid': 'अर्ध-शुष्क',
    },
    insights: {
      title: 'बाजार अंतर्दृष्टि',
      highDemand: 'उच्च मांग वाली फसलें',
      highDemandText: 'स्वास्थ्य जागरूकता बढ़ने के कारण दालों और तिलहन की मांग बढ़ रही है। चने की कीमतें इस तिमाही में 15% बढ़ गई हैं।',
      seasonal: 'मौसमी रुझान',
      seasonalText: 'कपास और चावल मजबूत मौसमी मांग पैटर्न दिखाते हैं। अधिकतम रिटर्न के लिए चरम बाजार कीमतों के साथ रोपण की योजना बनाएं।',
      export: 'निर्यात के अवसर',
      exportText: 'जैविक उत्पादों और विशेष फसलों की अंतर्राष्ट्रीय मांग बढ़ती जा रही है। प्रीमियम बाजारों के लिए प्रमाणन पर विचार करें।',
    },
    recommendations: {
      title: 'आपके खेत के लिए अनुशंसित फसलें',
      match: 'मेल',
      marketPrice: 'बाजार मूल्य',
      marketDemand: 'बाजार मांग',
      season: 'मौसम',
      compatibility: 'अनुकूलता',
      excellent: 'उत्कृष्ट',
      whyThisCrop: 'यह फसल क्यों?',
      demand: {
        high: 'उच्च',
        medium: 'मध्यम',
        low: 'कम',
      },
    },
    empty: {
      title: 'स्मार्ट फसल योजना के साथ शुरुआत करें',
      description: 'व्यक्तिगत फसल सिफारिशें प्राप्त करने के लिए ऊपर अपने खेत का विवरण दर्ज करें। हमारा एआई मिट्टी के प्रकार, जलवायु स्थितियों, वर्षा पैटर्न और वर्तमान बाजार रुझानों का विश्लेषण करता है ताकि आपकी जमीन के लिए सबसे लाभदायक फसलों का सुझाव दिया जा सके।',
    },
    footer: {
      powered: 'उन्नत कृषि डेटा और बाजार विश्लेषण द्वारा संचालित',
      helping: 'किसानों को डेटा-संचालित निर्णय लेने में मदद करना',
    },
    error: 'त्रुटि',
  },
  te: {
    app: {
      title: 'పంట సలహాదారు',
      subtitle: 'మీ నేల, వాతావరణం మరియు మార్కెట్ ట్రెండ్‌ల ఆధారంగా AI-ఆధారిత పంట సిఫార్సులు',
      tagline: 'గరిష్ట దిగుబడి మరియు లాభం కోసం స్మార్ట్ వ్యవసాయ నిర్ణయాలు',
    },
    form: {
      soilType: 'నేల రకం',
      selectSoil: 'నేల రకాన్ని ఎంచుకోండి',
      climate: 'వాతావరణ రకం',
      selectClimate: 'వాతావరణ రకాన్ని ఎంచుకోండి',
      rainfall: 'వార్షిక వర్షపాతం (మిమీ)',
      rainfallPlaceholder: 'ఉదా., 800',
      temperature: 'సగటు ఉష్ణోగ్రత (°C)',
      tempPlaceholder: 'ఉదా., 25',
      farmSize: 'పొలం పరిమాణం (ఎకరాలు)',
      farmSizePlaceholder: 'ఉదా., 5',
      submit: 'పంట సిఫార్సులను పొందండి',
      analyzing: 'విశ్లేషిస్తోంది...',
    },
    soilTypes: {
      'Loamy': 'మట్టి',
      'Clay': 'బంకమట్టి',
      'Sandy': 'ఇసుక',
      'Sandy Loam': 'ఇసుక మట్టి',
      'Clay Loam': 'బంకమట్టి మట్టి',
      'Black': 'నల్ల',
      'Red': 'ఎరుపు',
    },
    climateTypes: {
      'Tropical': 'ఉష్ణమండల',
      'Sub-tropical': 'ఉపఉష్ణమండల',
      'Temperate': 'సమశీతోష్ణ',
      'Arid': 'శుష్క',
      'Semi-arid': 'అర్ధ-శుష్క',
    },
    insights: {
      title: 'మార్కెట్ అంతర్దృష్టులు',
      highDemand: 'అధిక డిమాండ్ పంటలు',
      highDemandText: 'ఆరోగ్య అవగాహన పెరగడం వల్ల పప్పు మరియు నూనెగింజల డిమాండ్ పెరుగుతోంది. సెనగ ధరలు ఈ త్రైమాసికంలో 15% పెరిగాయి.',
      seasonal: 'కాలానుగుణ ట్రెండ్‌లు',
      seasonalText: 'పత్తి మరియు వరి బలమైన కాలానుగుణ డిమాండ్ నమూనాలను చూపుతాయి. గరిష్ట రాబడుల కోసం గరిష్ట మార్కెట్ ధరలతో నాటడం ప్లాన్ చేయండి.',
      export: 'ఎగుమతి అవకాశాలు',
      exportText: 'సేంద్రీయ ఉత్పత్తులు మరియు ప్రత్యేక పంటల కోసం అంతర్జాతీయ డిమాండ్ పెరుగుతూనే ఉంది. ప్రీమియం మార్కెట్ల కోసం ధృవీకరణను పరిగణించండి.',
    },
    recommendations: {
      title: 'మీ పొలం కోసం సిఫార్సు చేసిన పంటలు',
      match: 'సరిపోలిక',
      marketPrice: 'మార్కెట్ ధర',
      marketDemand: 'మార్కెట్ డిమాండ్',
      season: 'కాలం',
      compatibility: 'అనుకూలత',
      excellent: 'అద్భుతమైన',
      whyThisCrop: 'ఈ పంట ఎందుకు?',
      demand: {
        high: 'అధిక',
        medium: 'మధ్యస్థ',
        low: 'తక్కువ',
      },
    },
    empty: {
      title: 'స్మార్ట్ పంట ప్రణాళికతో ప్రారంభించండి',
      description: 'వ్యక్తిగత పంట సిఫార్సులను పొందడానికి పైన మీ పొలం వివరాలను నమోదు చేయండి. మా AI నేల రకం, వాతావరణ పరిస్థితులు, వర్షపాతం నమూనాలు మరియు ప్రస్తుత మార్కెట్ ట్రెండ్‌లను విశ్లేషిస్తుంది మరియు మీ భూమికి అత్యంత లాభదాయకమైన పంటలను సూచిస్తుంది.',
    },
    footer: {
      powered: 'అధునాతన వ్యవసాయ డేటా మరియు మార్కెట్ విశ్లేషణల ద్వారా శక్తివంతం',
      helping: 'రైతులకు డేటా-ఆధారిత నిర్ణయాలు తీసుకోవడంలో సహాయపడుతోంది',
    },
    error: 'లోపం',
  },
  ta: {
    app: {
      title: 'பயிர் ஆலோசகர்',
      subtitle: 'உங்கள் மண், காலநிலை மற்றும் சந்தை போக்குகளின் அடிப்படையில் AI-இயங்கும் பயிர் பரிந்துரைகள்',
      tagline: 'அதிகபட்ச விளைச்சல் மற்றும் லாபத்திற்கான ஸ்மார்ட் விவசாய முடிவுகள்',
    },
    form: {
      soilType: 'மண் வகை',
      selectSoil: 'மண் வகையைத் தேர்ந்தெடுக்கவும்',
      climate: 'காலநிலை வகை',
      selectClimate: 'காலநிலை வகையைத் தேர்ந்தெடுக்கவும்',
      rainfall: 'ஆண்டு மழைப்பொழிவு (மிமீ)',
      rainfallPlaceholder: 'உதா., 800',
      temperature: 'சராசரி வெப்பநிலை (°C)',
      tempPlaceholder: 'உதா., 25',
      farmSize: 'பண்ணை அளவு (ஏக்கர்)',
      farmSizePlaceholder: 'உதா., 5',
      submit: 'பயிர் பரிந்துரைகளைப் பெறுக',
      analyzing: 'பகுப்பாய்வு செய்கிறது...',
    },
    soilTypes: {
      'Loamy': 'களிமண்',
      'Clay': 'களிமண்',
      'Sandy': 'மணல்',
      'Sandy Loam': 'மணல் களிமண்',
      'Clay Loam': 'களிமண் களிமண்',
      'Black': 'கருப்பு',
      'Red': 'சிவப்பு',
    },
    climateTypes: {
      'Tropical': 'வெப்பமண்டல',
      'Sub-tropical': 'துணை-வெப்பமண்டல',
      'Temperate': 'மிதமான',
      'Arid': 'வறண்ட',
      'Semi-arid': 'அரை-வறண்ட',
    },
    insights: {
      title: 'சந்தை நுண்ணறிவுகள்',
      highDemand: 'அதிக தேவை பயிர்கள்',
      highDemandText: 'சுகாதார விழிப்புணர்வு அதிகரிப்பதால் பருப்பு மற்றும் எண்ணெய் விதைகளின் தேவை அதிகரித்து வருகிறது. கொண்டைக்கடலை விலைகள் இந்த காலாண்டில் 15% உயர்ந்துள்ளன.',
      seasonal: 'பருவகால போக்குகள்',
      seasonalText: 'பருத்தி மற்றும் நெல் வலுவான பருவகால தேவை வடிவங்களைக் காட்டுகின்றன. அதிகபட்ச வருமானத்திற்கான உச்ச சந்தை விலைகளுடன் நடவு செய்ய திட்டமிடுங்கள்.',
      export: 'ஏற்றுமதி வாய்ப்புகள்',
      exportText: 'கரிம பொருட்கள் மற்றும் சிறப்பு பயிர்களுக்கான சர்வதேச தேவை தொடர்ந்து வளர்ந்து வருகிறது. பிரீமியம் சந்தைகளுக்கான சான்றிதழைக் கருத்தில் கொள்ளுங்கள்.',
    },
    recommendations: {
      title: 'உங்கள் பண்ணைக்கான பரிந்துரைக்கப்பட்ட பயிர்கள்',
      match: 'பொருத்தம்',
      marketPrice: 'சந்தை விலை',
      marketDemand: 'சந்தை தேவை',
      season: 'பருவம்',
      compatibility: 'இணக்கம்',
      excellent: 'சிறந்த',
      whyThisCrop: 'இந்த பயிர் ஏன்?',
      demand: {
        high: 'அதிக',
        medium: 'நடுத்தர',
        low: 'குறைவான',
      },
    },
    empty: {
      title: 'ஸ்மார்ட் பயிர் திட்டமிடலுடன் தொடங்குங்கள்',
      description: 'தனிப்பயனாக்கப்பட்ட பயிர் பரிந்துரைகளைப் பெற மேலே உங்கள் பண்ணை விவரங்களை உள்ளிடவும். எங்கள் AI மண் வகை, காலநிலை நிலைமைகள், மழைப்பொழிவு வடிவங்கள் மற்றும் தற்போதைய சந்தை போக்குகளை பகுப்பாய்வு செய்து உங்கள் நிலத்திற்கு மிகவும் லாபகரமான பயிர்களை பரிந்துரைக்கிறது.',
    },
    footer: {
      powered: 'மேம்பட்ட விவசாய தரவு மற்றும் சந்தை பகுப்பாய்வுகளால் இயக்கப்படுகிறது',
      helping: 'விவசாயிகள் தரவு-சார் முடிவுகளை எடுக்க உதவுகிறது',
    },
    error: 'பிழை',
  },
  mr: {
    app: {
      title: 'पीक सल्लागार',
      subtitle: 'तुमच्या माती, हवामान आणि बाजार ट्रेंडवर आधारित AI-चालित पीक शिफारसी',
      tagline: 'जास्तीत जास्त उत्पादन आणि नफ्यासाठी स्मार्ट शेती निर्णय',
    },
    form: {
      soilType: 'माती प्रकार',
      selectSoil: 'माती प्रकार निवडा',
      climate: 'हवामान प्रकार',
      selectClimate: 'हवामान प्रकार निवडा',
      rainfall: 'वार्षिक पाऊस (मिमी)',
      rainfallPlaceholder: 'उदा., 800',
      temperature: 'सरासरी तापमान (°C)',
      tempPlaceholder: 'उदा., 25',
      farmSize: 'शेत आकार (एकर)',
      farmSizePlaceholder: 'उदा., 5',
      submit: 'पीक शिफारसी मिळवा',
      analyzing: 'विश्लेषण करत आहे...',
    },
    soilTypes: {
      'Loamy': 'दुमट',
      'Clay': 'चिकणमाती',
      'Sandy': 'वाळूमय',
      'Sandy Loam': 'वाळूमय दुमट',
      'Clay Loam': 'चिकणमाती दुमट',
      'Black': 'काळी',
      'Red': 'लाल',
    },
    climateTypes: {
      'Tropical': 'उष्णकटिबंधीय',
      'Sub-tropical': 'उपउष्णकटिबंधीय',
      'Temperate': 'समशीतोष्ण',
      'Arid': 'कोरडा',
      'Semi-arid': 'अर्ध-कोरडा',
    },
    insights: {
      title: 'बाजार अंतर्दृष्टी',
      highDemand: 'उच्च मागणी पिके',
      highDemandText: 'आरोग्य जागरूकता वाढल्याने डाळी आणि तेलबियांची मागणी वाढत आहे. या तिमाहीत हरभऱ्याच्या किमती 15% वाढल्या आहेत.',
      seasonal: 'हंगामी ट्रेंड',
      seasonalText: 'कापूस आणि तांदूळ मजबूत हंगामी मागणी नमुने दाखवतात. जास्तीत जास्त परताव्यासाठी शिखर बाजार किमतींसह लागवड करण्याची योजना करा.',
      export: 'निर्यात संधी',
      exportText: 'सेंद्रिय उत्पादने आणि विशेष पिकांची आंतरराष्ट्रीय मागणी सतत वाढत आहे. प्रीमियम बाजारांसाठी प्रमाणपत्राचा विचार करा.',
    },
    recommendations: {
      title: 'तुमच्या शेतासाठी शिफारस केलेली पिके',
      match: 'जुळणी',
      marketPrice: 'बाजार किंमत',
      marketDemand: 'बाजार मागणी',
      season: 'हंगाम',
      compatibility: 'सुसंगतता',
      excellent: 'उत्कृष्ट',
      whyThisCrop: 'हे पीक का?',
      demand: {
        high: 'उच्च',
        medium: 'मध्यम',
        low: 'कमी',
      },
    },
    empty: {
      title: 'स्मार्ट पीक नियोजनासह प्रारंभ करा',
      description: 'वैयक्तिक पीक शिफारसी प्राप्त करण्यासाठी वर तुमचे शेत तपशील प्रविष्ट करा. आमचा AI माती प्रकार, हवामान परिस्थिती, पाऊस नमुने आणि वर्तमान बाजार ट्रेंडचे विश्लेषण करतो आणि तुमच्या जमिनीसाठी सर्वात फायदेशीर पिकांची सूचना करतो.',
    },
    footer: {
      powered: 'प्रगत कृषी डेटा आणि बाजार विश्लेषणाद्वारे चालविले',
      helping: 'शेतकऱ्यांना डेटा-चालित निर्णय घेण्यास मदत करणे',
    },
    error: 'त्रुटी',
  },
};
