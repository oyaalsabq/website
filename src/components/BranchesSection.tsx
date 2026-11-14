import React from 'react';
import { useContent } from '../context/ContentContext';
import { MapPin, Phone, MessageSquare, Mail, Inbox, ExternalLink, Navigation, Compass } from 'lucide-react';

interface BranchItem {
  id: string;
  name_ar: string;
  name_en: string;
  city_ar: string;
  city_en: string;
  country_ar: string;
  country_en: string;
  address_ar: string;
  address_en: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  po_box_ar?: string;
  po_box_en?: string;
  hours_ar?: string;
  hours_en?: string;
  map_url: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  active: boolean;
}

export const BranchesSection: React.FC = () => {
  const { lang, content, t } = useContent();

  const branches = (content.branches.branches || []).filter(
    (b: BranchItem) => b.active !== false
  );

  return (
    <section id="branches" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-bold text-[#016CB6] mb-2 uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-[#FE7913]" />
            <span>{t('المقر الرسمي وشبكة المكاتب', 'Official Headquarters & Offices')}</span>
            <span aria-hidden="true">·</span>
            <span>{t('موقع معتمد على الخريطة', 'Verified Map Coordinates')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#012E64] tracking-tight">
            {t(
              'مقر شركة أويا السبق للشحن والنقل الدولي',
              'Oya Al Sabaq Official Headquarters & Branch Locations'
            )}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            {t(
              'يسعدنا استقبالكم في مقرنا الرئيسي بطرابلس لمتابعة شحناتكم وإتمام إجراءات الحجز والشحن والنقل البري والبحري.',
              'We welcome clients at our main headquarters in Tripoli to coordinate cargo bookings, customs documentation, and freight transit.'
            )}
          </p>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {branches.map((branch: BranchItem) => {
            const name = lang === 'ar' ? branch.name_ar : branch.name_en;
            const city = lang === 'ar' ? branch.city_ar : branch.city_en;
            const country = lang === 'ar' ? branch.country_ar : branch.country_en;
            const address = lang === 'ar' ? branch.address_ar : branch.address_en;
            const isHq = branch.id === 'branch-tripoli-hq';

            return (
              <div
                key={branch.id}
                className={`rounded-xl border p-6 sm:p-7 flex flex-col justify-between transition-all ${
                  isHq
                    ? 'bg-slate-50 border-[#016CB6]/40 shadow-sm ring-1 ring-[#016CB6]/10'
                    : 'bg-slate-50 border-slate-200 hover:border-[#016CB6]'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-[#016CB6] uppercase">
                        <MapPin className="w-3.5 h-3.5 text-[#FE7913]" />
                        <span>{city}، {country}</span>
                        {isHq && (
                          <span className="text-[10px] bg-[#012E64] text-white px-2 py-0.5 rounded font-bold">
                            {t('المقر الرئيسي', 'HQ')}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-[#012E64] mt-1.5">{name}</h3>
                    </div>

                    <a
                      href={branch.map_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-500 hover:text-[#016CB6] hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200 shrink-0"
                      title={t('عرض الموقع المعتمد على خرائط Google', 'View on Google Maps')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="p-3 rounded-lg bg-white border border-slate-200/80 mb-5">
                    <span className="block text-[11px] font-bold text-[#016CB6] uppercase mb-1">
                      {t('العنوان الرسمي المعتمد:', 'Official Registered Address:')}
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                      {address}
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-3 border-t border-slate-200/80 text-xs">
                    <div className="flex items-center justify-between py-1">
                      <span className="text-slate-600 flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#016CB6]" />
                        <span className="font-medium">{t('الهاتف الرسمي:', 'Phone:')}</span>
                      </span>
                      <a
                        href={`tel:${branch.phone.replace(/\s/g, '')}`}
                        dir="ltr"
                        className="font-mono font-bold text-[#012E64] hover:text-[#016CB6] hover:underline"
                      >
                        {branch.phone}
                      </a>
                    </div>

                    <div className="flex items-center justify-between py-1">
                      <span className="text-slate-600 flex items-center gap-2">
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="font-medium">{t('واتساب المباشر:', 'WhatsApp:')}</span>
                      </span>
                      <a
                        href={`https://wa.me/${(branch.whatsapp || '218915022516').replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        dir="ltr"
                        className="font-mono font-bold text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1"
                      >
                        <span>{branch.whatsapp || '+218 91 502 2516'}</span>
                      </a>
                    </div>

                    {branch.email && (
                      <div className="flex items-center justify-between py-1">
                        <span className="text-slate-600 flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-[#016CB6]" />
                          <span className="font-medium">{t('البريد الإلكتروني:', 'Email:')}</span>
                        </span>
                        <a
                          href={`mailto:${branch.email}`}
                          dir="ltr"
                          className="font-mono font-semibold text-slate-700 hover:text-[#016CB6] hover:underline"
                        >
                          {branch.email}
                        </a>
                      </div>
                    )}

                    {(branch.po_box_ar || branch.po_box_en) && (
                      <div className="flex items-center justify-between py-1">
                        <span className="text-slate-600 flex items-center gap-2">
                          <Inbox className="w-3.5 h-3.5 text-[#FE7913]" />
                          <span className="font-medium">{t('صندوق البريد:', 'P.O. Box:')}</span>
                        </span>
                        <span className="font-semibold text-[#012E64]">
                          {lang === 'ar' ? branch.po_box_ar : branch.po_box_en}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80">
                  <a
                    href={branch.map_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-bold text-[#012E64] hover:text-white bg-white hover:bg-[#016CB6] border border-slate-200 rounded-lg transition-colors shadow-sm"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#FE7913]" />
                    <span>{t('فتح اتجاهات الوصول في Google Maps', 'Open Navigation in Google Maps')}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Embedded Interactive Google Map for the Tripoli Headquarters */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-4 sm:p-6 bg-white border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#016CB6] uppercase">
                <MapPin className="w-4 h-4 text-[#FE7913]" />
                <span>{t('الموقع الجغرافي للمقر الرئيسي (طرابلس)', 'Headquarters Geographic Pin (Tripoli)')}</span>
              </div>
              <h3 className="text-base font-bold text-[#012E64] mt-0.5">
                {t(
                  'عين زارة - مجمع زارة سنتر، الدور الأرضي، مكتب رقم 44، طرابلس، ليبيا',
                  'Zara Center Complex, Ground Floor, Office No. 44, Ain Zara, Tripoli, Libya'
                )}
              </h3>
            </div>

            <a
              href="https://maps.app.goo.gl/jiFvBPdnigx3EvFH9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#012E64] hover:bg-[#016CB6] text-white text-xs font-bold transition-colors whitespace-nowrap shadow-sm shrink-0"
            >
              <span>{t('فتح في تطبيق خرائط Google', 'Open in Google Maps')}</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#FE7913]" />
            </a>
          </div>

          {/* Interactive Map Iframe centered on the exact official GPS coordinates */}
          <div className="relative w-full h-80 sm:h-96 bg-slate-200">
            <iframe
              title="موقع شركة أويا السبق للشحن والنقل الدولي على الخريطة"
              src="https://maps.google.com/maps?q=32.8024571,13.2828347&hl=ar&z=17&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
