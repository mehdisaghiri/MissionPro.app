"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

// Language types
export type Language = 'fr' | 'en' | 'ar';

// Translation interface
interface Translations {
  [key: string]: {
    fr: string;
    en: string;
    ar: string;
  };
}

// Language context interface
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations: Translations = {
  // Navigation
  'nav.findWork': {
    fr: 'Trouver un Emploi',
    en: 'Find Work',
    ar: 'البحث عن عمل'
  },
  'nav.myJobs': {
    fr: 'Mes Emplois',
    en: 'My Jobs',
    ar: 'وظائفي'
  },
  'nav.postJob': {
    fr: 'Publier un Emploi',
    en: 'Post a Job',
    ar: 'نشر وظيفة'
  },
  'nav.login': {
    fr: 'Connexion',
    en: 'Login',
    ar: 'تسجيل الدخول'
  },
  'nav.register': {
    fr: 'S\'inscrire',
    en: 'Register',
    ar: 'التسجيل'
  },
  'nav.settings': {
    fr: 'Paramètres',
    en: 'Settings',
    ar: 'الإعدادات'
  },
  'nav.logout': {
    fr: 'Déconnexion',
    en: 'Logout',
    ar: 'تسجيل الخروج'
  },

  // Homepage
  'home.hero.title': {
    fr: 'Trouvez l\'Emploi de Vos Rêves ou le Candidat Parfait',
    en: 'Find Your Dream Job or Perfect Candidate',
    ar: 'اعثر على وظيفة أحلامك أو المرشح المثالي'
  },
  'home.hero.subtitle': {
    fr: 'Connectez-vous avec des milliers d\'employeurs et de chercheurs d\'emploi sur notre plateforme',
    en: 'Connect with thousands of employers and job seekers on our platform',
    ar: 'تواصل مع آلاف أصحاب العمل والباحثين عن عمل على منصتنا'
  },
  'home.search.placeholder': {
    fr: 'Titre d\'emploi ou mot-clé',
    en: 'Job title or keyword',
    ar: 'المسمى الوظيفي أو الكلمة المفتاحية'
  },
  'home.search.button': {
    fr: 'Rechercher des Emplois',
    en: 'Search Jobs',
    ar: 'البحث عن وظائف'
  },
  'home.whyChoose': {
    fr: 'Pourquoi Choisir',
    en: 'Why Choose',
    ar: 'لماذا تختار'
  },
  'home.readyToStart': {
    fr: 'Prêt à Commencer ?',
    en: 'Ready to Get Started?',
    ar: 'مستعد للبدء؟'
  },
  'home.findWork': {
    fr: 'Trouver un Emploi',
    en: 'Find Work',
    ar: 'البحث عن عمل'
  },
  'home.postJob': {
    fr: 'Publier un Emploi',
    en: 'Post a Job',
    ar: 'نشر وظيفة'
  },

  // Common
  'common.back': {
    fr: 'Retour',
    en: 'Back',
    ar: 'رجوع'
  },
  'common.next': {
    fr: 'Suivant',
    en: 'Next',
    ar: 'التالي'
  },
  'common.save': {
    fr: 'Sauvegarder',
    en: 'Save',
    ar: 'حفظ'
  },
  'common.cancel': {
    fr: 'Annuler',
    en: 'Cancel',
    ar: 'إلغاء'
  },
  'common.loading': {
    fr: 'Chargement...',
    en: 'Loading...',
    ar: 'جاري التحميل...'
  },
  'common.search': {
    fr: 'Rechercher',
    en: 'Search',
    ar: 'بحث'
  },

  // Job related
  'job.salary': {
    fr: 'Salaire',
    en: 'Salary',
    ar: 'الراتب'
  },
  'job.posted': {
    fr: 'Publié',
    en: 'Posted',
    ar: 'تم النشر'
  },
  'job.applicants': {
    fr: 'Candidats',
    en: 'Applicants',
    ar: 'المتقدمين'
  },
  'job.jobType': {
    fr: 'Type d\'Emploi',
    en: 'Job Type',
    ar: 'نوع الوظيفة'
  },
  'job.apply': {
    fr: 'Postuler Maintenant',
    en: 'Apply Now',
    ar: 'تقدم الآن'
  },
  'job.applied': {
    fr: 'Candidature Envoyée',
    en: 'Applied',
    ar: 'تم التقديم'
  },

  // Features
  'features.diverse.title': {
    fr: 'Opportunités Diverses',
    en: 'Diverse Opportunities',
    ar: 'فرص متنوعة'
  },
  'features.diverse.description': {
    fr: 'Accédez à des milliers d\'offres d\'emploi dans diverses industries et niveaux d\'expérience.',
    en: 'Access thousands of job listings across various industries and experience levels.',
    ar: 'الوصول إلى آلاف الوظائف عبر مختلف الصناعات ومستويات الخبرة.'
  },
  'features.diverse.cta': {
    fr: 'Explorer les Emplois',
    en: 'Explore Jobs',
    ar: 'استكشاف الوظائف'
  },
  'features.companies.title': {
    fr: 'Entreprises de Premier Plan',
    en: 'Top Companies',
    ar: 'أفضل الشركات'
  },
  'features.companies.description': {
    fr: 'Connectez-vous avec des entreprises leaders, des startups innovantes aux corporations Fortune 500.',
    en: 'Connect with leading companies, from innovative startups to Fortune 500 corporations.',
    ar: 'تواصل مع الشركات الرائدة، من الشركات الناشئة المبتكرة إلى شركات فورتشن 500.'
  },
  'features.companies.cta': {
    fr: 'Voir les Entreprises',
    en: 'View Companies',
    ar: 'عرض الشركات'
  },
  'features.talent.title': {
    fr: 'Bassin de Talents',
    en: 'Talent Pool',
    ar: 'مجموعة المواهب'
  },
  'features.talent.description': {
    fr: 'Les employeurs peuvent accéder à un bassin diversifié de candidats qualifiés pour leurs postes ouverts.',
    en: 'Employers can access a diverse pool of qualified candidates for their open positions.',
    ar: 'يمكن لأصحاب العمل الوصول إلى مجموعة متنوعة من المرشحين المؤهلين للمناصب المفتوحة.'
  },
  'features.talent.cta': {
    fr: 'Publier un Emploi',
    en: 'Post a Job',
    ar: 'نشر وظيفة'
  },

  // Trust badge
  'home.trusted': {
    fr: 'Approuvé par plus de 10 000 entreprises dans le monde',
    en: 'Trusted by 10,000+ companies worldwide',
    ar: 'موثوق به من قبل أكثر من 10,000 شركة حول العالم'
  },

  // Footer
  'footer.rights': {
    fr: 'Tous droits réservés',
    en: 'All rights reserved',
    ar: 'جميع الحقوق محفوظة'
  },

  // Languages
  'language.french': {
    fr: 'Français',
    en: 'French',
    ar: 'الفرنسية'
  },
  'language.english': {
    fr: 'Anglais',
    en: 'English',
    ar: 'الإنجليزية'
  },
  'language.arabic': {
    fr: 'Arabe',
    en: 'Arabic',
    ar: 'العربية'
  }
};

// Language provider component
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('MissionPro-language') as Language;
    if (savedLanguage && ['fr', 'en', 'ar'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('MissionPro-language', language);
    
    // Update document direction for RTL languages
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language] || translation.en || key;
  };

  // Check if current language is RTL
  const isRTL = language === 'ar';

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    isRTL
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook to use language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
