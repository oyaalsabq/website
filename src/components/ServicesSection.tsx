import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Ship, Truck, Warehouse, PackageCheck, Plane, CheckCircle2, ArrowRight, ArrowLeft, X } from 'lucide-react';

interface ServiceItem {
  id: string;
  slug: string;
  title_ar: string;
  title_en: string;
  excerpt_ar: string;
  excerpt_en: string;
  description_ar: string;
  description_en: string;
  icon: string;
  image: string;
  features_ar: string[];
  features_en: string[];
  active: boolean;
}

export const ServicesSection: React.FC = () => {
  const { lang, content, t } = useContent();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const services = (content.services.services || []).filter((s: ServiceItem) => s.active !== false);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Ship':
        return Ship;
      case 'Truck':
        return Truck;
      case 'Warehouse':
        return Warehouse;
      case 'Plane':
        return Plane;
      case 'PackageCheck':
      default:
        return PackageCheck;
    }
  };

  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#016CB6] mb-2 uppercase tracking-wider">
              <span>{t('حلول وخدمات الشحن', 'Logistics & Shipping Services')}</span>
              <span aria-hidden="true">·</span>
              <span>{t('خدمات موثوقة معتمدة', 'Verified Operational Scope')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#012E64] tracking-tight">
              {t(
                'خدمات شحن بحري وبري متخصصة تلائم حجم أعمالك',
                'Comprehensive Ocean & Overland Freight Tailored to Your Scale'
              )}
            </h2>
          </div>

          <a
            href="#quote-calculator"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#016CB6] hover:text-[#012E64] transition-colors"
          >
            <span>{t('طلب استشارة أو تسعير للشحنة', 'Consult our logistics team')}</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service: ServiceItem, index: number) => {
            const Icon = getServiceIcon(service.icon);
            const title = lang === 'ar' ? service.title_ar : service.title_en;
            const excerpt = lang === 'ar' ? service.excerpt_ar : service.excerpt_en;
            const features = lang === 'ar' ? service.features_ar : service.features_en;

            return (
              <div
                key={service.id || index}
                className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-[#016CB6] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Service Image */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                    <img
                      src={service.image}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Editorial Numbering & Icon */}
                    <div className="absolute bottom-4 start-4 end-4 flex items-center justify-between text-white">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-lg bg-[#FE7913] text-white flex items-center justify-center shadow">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-sm drop-shadow">{title}</span>
                      </div>
                      <span className="font-mono text-xs text-white/90 tabular-nums">
                        0{index + 1}.
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                      {excerpt}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2 mb-4">
                      {features?.slice(0, 3).map((feat: string, fIdx: number) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-[#016CB6] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-xs font-bold text-[#012E64] hover:text-[#FE7913] flex items-center gap-1.5 transition-colors"
                  >
                    <span>{t('تفاصيل الخدمة الكاملة', 'Full Service Details')}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`#quote-calculator`}
                    className="text-xs font-semibold px-3 py-1.5 rounded bg-slate-100 hover:bg-[#016CB6] hover:text-white text-slate-700 transition-colors"
                  >
                    {t('طلب تسعير', 'Quote')}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            {/* Modal Image Header */}
            <div className="relative h-64 w-full">
              <img
                src={selectedService.image}
                alt={lang === 'ar' ? selectedService.title_ar : selectedService.title_en}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 end-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
                aria-label="إغلاق النافذة"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 start-6 end-6 text-white">
                <h3 className="text-xl font-bold">
                  {lang === 'ar' ? selectedService.title_ar : selectedService.title_en}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-xs font-bold text-[#016CB6] uppercase mb-2">
                  {t('نظرة عامة على الخدمة', 'Service Overview')}
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {lang === 'ar' ? selectedService.description_ar : selectedService.description_en}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#016CB6] uppercase mb-3">
                  {t('أهم المزايا والإجراءات التشغيلية', 'Key Features & Operational Safeguards')}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(lang === 'ar' ? selectedService.features_ar : selectedService.features_en)?.map(
                    (feature: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-800"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#FE7913] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href="#quote-calculator"
                  onClick={() => setSelectedService(null)}
                  className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-white bg-[#FE7913] hover:bg-[#e06509] rounded-lg transition-colors text-center"
                >
                  {t('طلب عرض سعر لهذه الخدمة', 'Request Quote for this Service')}
                </a>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  {t('إغلاق', 'Close')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
