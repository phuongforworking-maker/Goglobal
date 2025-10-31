// Complete list of Azure Translator supported languages
// Updated as of 2024 - Azure supports 100+ languages for translation
// Some languages may have limited TTS support depending on browser capabilities

export const AZURE_SUPPORTED_LANGUAGES = [
  // Major World Languages
  { code: 'en', name: 'English', spokenCode: 'en-US' },
  { code: 'es', name: 'Spanish', spokenCode: 'es-ES' },
  { code: 'fr', name: 'French', spokenCode: 'fr-FR' },
  { code: 'de', name: 'German', spokenCode: 'de-DE' },
  { code: 'zh', name: 'Chinese (Simplified)', spokenCode: 'zh-CN' },
  { code: 'zh-Hant', name: 'Chinese (Traditional)', spokenCode: 'zh-TW' },
  { code: 'ja', name: 'Japanese', spokenCode: 'ja-JP' },
  { code: 'ko', name: 'Korean', spokenCode: 'ko-KR' },
  { code: 'ru', name: 'Russian', spokenCode: 'ru-RU' },
  { code: 'ar', name: 'Arabic', spokenCode: 'ar-SA' },
  { code: 'hi', name: 'Hindi', spokenCode: 'hi-IN' },
  { code: 'pt', name: 'Portuguese', spokenCode: 'pt-BR' },
  { code: 'it', name: 'Italian', spokenCode: 'it-IT' },
  { code: 'nl', name: 'Dutch', spokenCode: 'nl-NL' },
  { code: 'pl', name: 'Polish', spokenCode: 'pl-PL' },
  { code: 'tr', name: 'Turkish', spokenCode: 'tr-TR' },
  { code: 'sv', name: 'Swedish', spokenCode: 'sv-SE' },
  { code: 'no', name: 'Norwegian', spokenCode: 'no-NO' },
  { code: 'da', name: 'Danish', spokenCode: 'da-DK' },
  { code: 'fi', name: 'Finnish', spokenCode: 'fi-FI' },
  
  // Southeast Asian Languages
  { code: 'vi', name: 'Vietnamese', spokenCode: 'vi-VN' },
  { code: 'th', name: 'Thai', spokenCode: 'th-TH' },
  { code: 'id', name: 'Indonesian', spokenCode: 'id-ID' },
  { code: 'ms', name: 'Malay', spokenCode: 'ms-MY' },
  { code: 'tl', name: 'Filipino', spokenCode: 'tl-PH' },
  { code: 'my', name: 'Myanmar (Burmese)', spokenCode: 'my-MM' },
  { code: 'km', name: 'Khmer', spokenCode: 'km-KH' },
  { code: 'lo', name: 'Lao', spokenCode: 'lo-LA' },
  
  // Indian Subcontinent Languages
  { code: 'bn', name: 'Bengali', spokenCode: 'bn-BD' },
  { code: 'ta', name: 'Tamil', spokenCode: 'ta-IN' },
  { code: 'te', name: 'Telugu', spokenCode: 'te-IN' },
  { code: 'mr', name: 'Marathi', spokenCode: 'mr-IN' },
  { code: 'gu', name: 'Gujarati', spokenCode: 'gu-IN' },
  { code: 'kn', name: 'Kannada', spokenCode: 'kn-IN' },
  { code: 'ml', name: 'Malayalam', spokenCode: 'ml-IN' },
  { code: 'pa', name: 'Punjabi', spokenCode: 'pa-IN' },
  { code: 'ur', name: 'Urdu', spokenCode: 'ur-PK' },
  { code: 'ne', name: 'Nepali', spokenCode: 'ne-NP' },
  { code: 'si', name: 'Sinhala', spokenCode: 'si-LK' },
  
  // European Languages
  { code: 'cs', name: 'Czech', spokenCode: 'cs-CZ' },
  { code: 'sk', name: 'Slovak', spokenCode: 'sk-SK' },
  { code: 'hu', name: 'Hungarian', spokenCode: 'hu-HU' },
  { code: 'ro', name: 'Romanian', spokenCode: 'ro-RO' },
  { code: 'bg', name: 'Bulgarian', spokenCode: 'bg-BG' },
  { code: 'hr', name: 'Croatian', spokenCode: 'hr-HR' },
  { code: 'sr', name: 'Serbian', spokenCode: 'sr-RS' },
  { code: 'sl', name: 'Slovenian', spokenCode: 'sl-SI' },
  { code: 'et', name: 'Estonian', spokenCode: 'et-EE' },
  { code: 'lv', name: 'Latvian', spokenCode: 'lv-LV' },
  { code: 'lt', name: 'Lithuanian', spokenCode: 'lt-LT' },
  { code: 'uk', name: 'Ukrainian', spokenCode: 'uk-UA' },
  { code: 'be', name: 'Belarusian', spokenCode: 'be-BY' },
  { code: 'mk', name: 'Macedonian', spokenCode: 'mk-MK' },
  { code: 'sq', name: 'Albanian', spokenCode: 'sq-AL' },
  { code: 'bs', name: 'Bosnian', spokenCode: 'bs-BA' },
  { code: 'mt', name: 'Maltese', spokenCode: 'mt-MT' },
  { code: 'is', name: 'Icelandic', spokenCode: 'is-IS' },
  { code: 'ga', name: 'Irish', spokenCode: 'ga-IE' },
  { code: 'cy', name: 'Welsh', spokenCode: 'cy-GB' },
  { code: 'eu', name: 'Basque', spokenCode: 'eu-ES' },
  { code: 'ca', name: 'Catalan', spokenCode: 'ca-ES' },
  { code: 'gl', name: 'Galician', spokenCode: 'gl-ES' },
  
  // Middle Eastern & African Languages
  { code: 'he', name: 'Hebrew', spokenCode: 'he-IL' },
  { code: 'fa', name: 'Persian', spokenCode: 'fa-IR' },
  { code: 'az', name: 'Azerbaijani', spokenCode: 'az-AZ' },
  { code: 'ka', name: 'Georgian', spokenCode: 'ka-GE' },
  { code: 'hy', name: 'Armenian', spokenCode: 'hy-AM' },
  { code: 'ku', name: 'Kurdish', spokenCode: 'ku-TR' },
  { code: 'sw', name: 'Swahili', spokenCode: 'sw-KE' },
  { code: 'am', name: 'Amharic', spokenCode: 'am-ET' },
  { code: 'af', name: 'Afrikaans', spokenCode: 'af-ZA' },
  { code: 'zu', name: 'Zulu', spokenCode: 'zu-ZA' },
  { code: 'xh', name: 'Xhosa', spokenCode: 'xh-ZA' },
  
  // Additional Asian Languages
  { code: 'uz', name: 'Uzbek', spokenCode: 'uz-UZ' },
  { code: 'kk', name: 'Kazakh', spokenCode: 'kk-KZ' },
  { code: 'ky', name: 'Kyrgyz', spokenCode: 'ky-KG' },
  { code: 'tg', name: 'Tajik', spokenCode: 'tg-TJ' },
  { code: 'tk', name: 'Turkmen', spokenCode: 'tk-TM' },
  { code: 'mn', name: 'Mongolian', spokenCode: 'mn-MN' },
  
  // Additional European Languages
  { code: 'el', name: 'Greek', spokenCode: 'el-GR' },
  
  // Additional World Languages
  { code: 'so', name: 'Somali', spokenCode: 'so-SO' },
  { code: 'ig', name: 'Igbo', spokenCode: 'ig-NG' },
  { code: 'yo', name: 'Yoruba', spokenCode: 'yo-NG' },
  { code: 'ha', name: 'Hausa', spokenCode: 'ha-NG' },
  
  // Pacific Languages
  { code: 'mi', name: 'Maori', spokenCode: 'mi-NZ' },
  { code: 'sm', name: 'Samoan', spokenCode: 'sm-WS' },
  { code: 'to', name: 'Tongan', spokenCode: 'to-TO' },
  { code: 'fj', name: 'Fijian', spokenCode: 'fj-FJ' },
  
  // Indigenous and Regional Languages
  { code: 'iu', name: 'Inuktitut', spokenCode: 'iu-CA' },
  { code: 'ikt', name: 'Inuinnaqtun', spokenCode: 'ikt-CA' },
  
  // Additional Languages
  { code: 'lv', name: 'Latvian', spokenCode: 'lv-LV' },
  { code: 'mhr', name: 'Eastern Mari', spokenCode: 'mhr-RU' },
  { code: 'mrj', name: 'Western Mari', spokenCode: 'mrj-RU' },
  { code: 'udm', name: 'Udmurt', spokenCode: 'udm-RU' },
  { code: 'chv', name: 'Chuvash', spokenCode: 'chv-RU' },
  { code: 'sah', name: 'Sakha', spokenCode: 'sah-RU' },
  { code: 'tt', name: 'Tatar', spokenCode: 'tt-RU' },
  { code: 'ba', name: 'Bashkir', spokenCode: 'ba-RU' },
  
  // Additional African Languages
  { code: 'lg', name: 'Luganda', spokenCode: 'lg-UG' },
  { code: 'nso', name: 'Northern Sotho', spokenCode: 'nso-ZA' },
  { code: 'tn', name: 'Tswana', spokenCode: 'tn-BW' },
  { code: 'st', name: 'Southern Sotho', spokenCode: 'st-ZA' },
  { code: 'ts', name: 'Tsonga', spokenCode: 'ts-ZA' },
  { code: 've', name: 'Venda', spokenCode: 've-ZA' },
  { code: 'nr', name: 'South Ndebele', spokenCode: 'nr-ZA' },
  { code: 'ss', name: 'Swati', spokenCode: 'ss-SZ' },
  
  // Additional American Languages  
  { code: 'qu', name: 'Quechua', spokenCode: 'qu-PE' },
  { code: 'gn', name: 'Guarani', spokenCode: 'gn-PY' },
  { code: 'ay', name: 'Aymara', spokenCode: 'ay-BO' },
  
  // Sign Languages (limited support)
  { code: 'ase', name: 'American Sign Language', spokenCode: 'en-US' }
];

// Popular languages for quick access (most commonly used)
export const POPULAR_LANGUAGES = [
  { code: 'en', name: 'English', spokenCode: 'en-US' },
  { code: 'es', name: 'Spanish', spokenCode: 'es-ES' },
  { code: 'fr', name: 'French', spokenCode: 'fr-FR' },
  { code: 'de', name: 'German', spokenCode: 'de-DE' },
  { code: 'zh', name: 'Chinese (Simplified)', spokenCode: 'zh-CN' },
  { code: 'ja', name: 'Japanese', spokenCode: 'ja-JP' },
  { code: 'ko', name: 'Korean', spokenCode: 'ko-KR' },
  { code: 'ru', name: 'Russian', spokenCode: 'ru-RU' },
  { code: 'ar', name: 'Arabic', spokenCode: 'ar-SA' },
  { code: 'hi', name: 'Hindi', spokenCode: 'hi-IN' },
  { code: 'pt', name: 'Portuguese', spokenCode: 'pt-BR' },
  { code: 'it', name: 'Italian', spokenCode: 'it-IT' },
  { code: 'nl', name: 'Dutch', spokenCode: 'nl-NL' },
  { code: 'vi', name: 'Vietnamese', spokenCode: 'vi-VN' },
  { code: 'th', name: 'Thai', spokenCode: 'th-TH' },
  { code: 'tr', name: 'Turkish', spokenCode: 'tr-TR' }
];

// Regional language groups for better organization in UI
export const LANGUAGE_REGIONS = {
  'Popular': POPULAR_LANGUAGES,
  'European': AZURE_SUPPORTED_LANGUAGES.filter(lang => 
    ['en', 'es', 'fr', 'de', 'it', 'nl', 'pl', 'tr', 'sv', 'no', 'da', 'fi', 'cs', 'sk', 'hu', 'ro', 'bg', 'hr', 'sr', 'sl', 'et', 'lv', 'lt', 'uk', 'be', 'mk', 'sq', 'bs', 'mt', 'is', 'ga', 'cy', 'eu', 'ca', 'gl', 'el'].includes(lang.code)
  ),
  'Asian': AZURE_SUPPORTED_LANGUAGES.filter(lang => 
    ['zh', 'zh-Hant', 'ja', 'ko', 'hi', 'vi', 'th', 'id', 'ms', 'tl', 'my', 'km', 'lo', 'bn', 'ta', 'te', 'mr', 'gu', 'kn', 'ml', 'pa', 'ur', 'ne', 'si', 'uz', 'kk', 'ky', 'tg', 'tk', 'mn'].includes(lang.code)
  ),
  'Middle Eastern & African': AZURE_SUPPORTED_LANGUAGES.filter(lang => 
    ['ar', 'he', 'fa', 'az', 'ka', 'hy', 'ku', 'sw', 'am', 'af', 'zu', 'xh', 'so', 'ig', 'yo', 'ha', 'lg', 'nso', 'tn', 'st', 'ts', 've', 'nr', 'ss'].includes(lang.code)
  ),
  'Americas': AZURE_SUPPORTED_LANGUAGES.filter(lang => 
    ['pt', 'qu', 'gn', 'ay'].includes(lang.code)
  ),
  'Other': AZURE_SUPPORTED_LANGUAGES.filter(lang => 
    ['ru', 'mi', 'sm', 'to', 'fj', 'iu', 'ikt', 'mhr', 'mrj', 'udm', 'chv', 'sah', 'tt', 'ba', 'ase'].includes(lang.code)
  )
};

export default AZURE_SUPPORTED_LANGUAGES;