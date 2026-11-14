import React from 'react';
import { useContent } from '../context/ContentContext';
import { Logo } from './Logo';
import { Phone, Mail, Inbox, MapPin, MessageSquare, ArrowUp, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { lang, content, t } = useContent();
  const { settings } = content;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-[#01224a] text-white border-t border-slate-800">
      {/* Top Pre-Footer Bar: Quick Contact & Direct WhatsApp */}
      <div className="bg-[#012E64] border-b border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-start">
            <div className="w-12 h-12 rounded-xl bg-[#FE7913] text-white flex items-center justify-center shrink-0 shadow">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {t('هل لديك شحنة بحرية أو برية ترغب في نقلها؟', 'Do you have ocean or overland freight to move?')}
              </h3>
              <p className="text-xs text-slate-300">
                {t('تواصل مباشرة مع مسؤولي الحجوزات والشحن عبر واتساب للاستجابة الفورية.', 'Direct real-time WhatsApp coordination with our shipping desk.')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${(settings.whatsapp_number || '218915022516').replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t('مراسلة واتساب الفورية', 'Chat on Official WhatsApp')}</span>
            </a>

            <a
              href={`tel:${settings.phone_primary}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
            >
              <Phone className="w-4 h-4 text-[#FE7913]" />
              <span className="font-mono">{settings.phone_primary}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <Logo isLight className="h-12 sm:h-14" />
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              {lang === 'ar' ? settings.slogan_ar : settings.slogan_en}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {t(
                'شركة متخصصة في خدمات الشحن الدولي البحري والبري، وإدارة الحاويات والتخزين والمسارات اللوجستية التجارية باحترافية وأمان.',
                'Specialized enterprise delivering international maritime container freight, overland transport, and supply chain logistics.'
              )}
            </p>
            
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-[#FE7913]" />
              <span>{t('شركة شحن ونقل دولي مسجلة ومعتمدة', 'Registered & Verified Shipping Entity')}</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
              {t('روابط الوصول السريع', 'Quick Navigation')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="#about" className="hover:text-[#FE7913] transition-colors">{t('عن أويا السبق', 'About Company')}</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#FE7913] transition-colors">{t('خدمات الشحن', 'Logistics Services')}</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#FE7913] transition-colors">{t('سجل العمليات', 'Operations Record')}</a>
              </li>
              <li>
                <a href="#branches" className="hover:text-[#FE7913] transition-colors">{t('الفروع والمكاتب', 'Branch Offices')}</a>
              </li>
              <li>
                <a href="#quote-calculator" className="hover:text-[#FE7913] transition-colors">{t('طلب تسعير الشحنة', 'Request Quotation')}</a>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
              {t('بيانات الاتصال بالمقر', 'Headquarters Contact')}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <a
                href={settings.google_maps_url || 'https://maps.app.goo.gl/jiFvBPdnigx3EvFH9'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-[#FE7913] transition-colors group"
                title={t('عرض الموقع على خرائط Google Maps', 'View on Google Maps')}
              >
                <MapPin className="w-4 h-4 text-[#FE7913] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="leading-relaxed">
                  {lang === 'ar' ? settings.headquarter_address_ar : settings.headquarter_address_en}
                </span>
              </a>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#016CB6] shrink-0" />
                <span className="text-slate-400 text-xs">{t('هاتف المقر:', 'Phone:')}</span>
                <a
                  href={`tel:${(settings.phone_primary || '+218 92 788 4774').replace(/\s/g, '')}`}
                  dir="ltr"
                  className="font-mono font-bold text-white hover:text-[#FE7913] transition-colors"
                >
                  {settings.phone_primary}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-400 text-xs">{t('واتساب المباشر:', 'WhatsApp:')}</span>
                <a
                  href={`https://wa.me/${(settings.whatsapp_number || '218915022516').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="font-mono font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
                  title={t('فتح محادثة واتساب فورية', 'Open WhatsApp Chat')}
                >
                  <span>{settings.phone_secondary || '+218 91 502 2516'}</span>
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#016CB6] shrink-0" />
                <span className="text-slate-400 text-xs">{t('البريد الإلكتروني:', 'Email:')}</span>
                <a
                  href={`mailto:${settings.email || 'oia_company@yahoo.com'}`}
                  dir="ltr"
                  className="font-mono font-semibold text-white hover:text-[#FE7913] transition-colors"
                >
                  {settings.email || 'oia_company@yahoo.com'}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Inbox className="w-4 h-4 text-[#FE7913] shrink-0" />
                <span className="text-slate-400 text-xs">{t('صندوق البريد:', 'P.O. Box:')}</span>
                <span className="font-semibold text-slate-200">
                  {lang === 'ar'
                    ? settings.po_box_ar || 'ص.ب 81910 طرابلس'
                    : settings.po_box_en || 'P.O. Box 81910, Tripoli'}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {currentYear} {lang === 'ar' ? settings.company_name_ar : settings.company_name_en}. {t('جميع الحقوق محفوظة.', 'All Rights Reserved.')}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <span>{t('العودة للأعلى', 'Back to Top')}</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
