import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Logo } from './Logo';
import { Menu, X, Globe } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { lang, toggleLang, t } = useContent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#about', label: t('عن الشركة', 'About Us') },
    { href: '#services', label: t('الخدمات', 'Services') },
    { href: '#projects', label: t('الأعمال والعمليات', 'Operations') },
    { href: '#branches', label: t('الفروع', 'Branches') },
    { href: '#news', label: t('الأخبار', 'News') },
    { href: '#contact', label: t('تواصل معنا', 'Contact') },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark (Official Vector Logo Lockup) */}
          <a
            href="#"
            className="flex items-center shrink-0 group focus:outline-none"
            aria-label="الصفحة الرئيسية لشركة أويا السبق للإستيراد والتصدير والشحن الدولي"
          >
            <Logo className="h-11 sm:h-12" />
          </a>

          {/* Zone 2: Single-line Text Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#016CB6] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#FE7913]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action + Language Selector */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">

            {/* Language Switcher - Single Toggle Button (shows EN in Arabic, AR in English) */}
            <button
              type="button"
              onClick={toggleLang}
              className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-[#012E64] bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 shadow-xs"
              aria-label={t('تبديل اللغة إلى EN', 'Switch language to AR')}
              title={lang === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
            >
              <Globe className="w-3.5 h-3.5 text-[#016CB6]" />
              <span className="font-bold tracking-wider">{lang === 'ar' ? 'EN' : 'AR'}</span>
            </button>

            {/* Primary Action Button */}
            <a
              href="#quote-calculator"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-white bg-[#012E64] hover:bg-[#016CB6] rounded-lg shadow-sm transition-all duration-200 whitespace-nowrap shrink-0 hover:shadow"
            >
              {t('طلب عرض سعر', 'Request Quote')}
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:text-[#016CB6] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-semibold text-slate-500">
                  {lang === 'ar' ? 'اللغة' : 'Language'}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    toggleLang();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Globe className="w-3.5 h-3.5 text-[#016CB6]" />
                  <span className="font-bold tracking-wider">{lang === 'ar' ? 'EN' : 'AR'}</span>
                </button>
              </div>
              <a
                href="#quote-calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm font-bold text-white bg-[#FE7913] hover:bg-[#e06509] rounded-lg transition-colors"
              >
                {t('طلب عرض سعر الشحنة', 'Request Freight Quote')}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
