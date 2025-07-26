"use client";
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import { Globe, ChevronDown } from "lucide-react";
import { useLanguage, Language } from "@/context/languageContext";


// switch language  (Fr, Eng , Arb )
const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'fr' as Language, name: 'language.french', flag: '🇫🇷' },
    { code: 'en' as Language, name: 'language.english', flag: '🇺🇸' },
    { code: 'ar' as Language, name: 'language.arabic', flag: '🇸🇦' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2 min-w-[120px]"
        >
          <Globe size={16} />
          <span className="flex items-center gap-1">
            <span>{currentLanguage?.flag}</span>
            <span className="hidden sm:inline">{t(currentLanguage?.name || 'language.french')}</span>
          </span>
          <ChevronDown size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center gap-2 cursor-pointer ${
              language === lang.code ? 'bg-accent' : ''
            }`}
          >
            <span>{lang.flag}</span>
            <span>{t(lang.name)}</span>
            {language === lang.code && (
              <span className="ml-auto text-xs">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
