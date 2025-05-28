"use client";

import { Button } from "@/components/ui/button";
import { useLanguageStore, type Language } from "@/lib/translations";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguageStore();

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="font-medium"
    >
      {language.toUpperCase()}
    </Button>
  );
}