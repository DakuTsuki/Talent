import React, { useState } from 'react';
import { Globe, X, Sparkles, Languages } from 'lucide-react';

export default function GoogleTranslateBanner({ currentLanguage, onLanguageChange }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const supportedLanguages = [
    { code: 'en', name: 'English (Original)', flag: '🇬🇧' },
    { code: 'hu', name: 'Hungarian (Magyar)', flag: '🇭🇺' },
    { code: 'de', name: 'German (Deutsch)', flag: '🇩🇪' },
    { code: 'uk', name: 'Ukrainian (Українська)', flag: '🇺🇦' },
    { code: 'fr', name: 'French (Français)', flag: '🇫🇷' },
    { code: 'es', name: 'Spanish (Español)', flag: '🇪🇸' },
  ];

  return (
    <div className="bg-gradient-to-r from-slate-900 via-[#0E3D6E] to-slate-900 text-white text-xs py-2 px-4 border-b border-white/10 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#E5A812] text-slate-900 font-bold">
            <Languages className="w-3 h-3" />
          </span>
          <span className="font-medium text-slate-200">
            <strong className="text-white">Multilingual Ready:</strong> Platform built in English with instant Google Translate integration for international & domestic students.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white/10 rounded-lg p-0.5 border border-white/10">
            {supportedLanguages.slice(0, 4).map((lang) => (
              <button
                key={lang.code}
                onClick={() => onLanguageChange(lang.code)}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition flex items-center gap-1 ${
                  currentLanguage === lang.code
                    ? 'bg-[#E5A812] text-slate-900 shadow-2xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>{lang.flag}</span>
                <span className="hidden sm:inline uppercase">{lang.code}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="p-1 text-slate-400 hover:text-white transition"
            title="Dismiss notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
