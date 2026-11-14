import React from 'react';
import { useContent } from '../context/ContentContext';
import { ArrowLeft, ArrowRight, ShieldCheck, Clock, Navigation } from 'lucide-react';

export const Hero: React.FC = () => {
  const { lang, content, t } = useContent();
  const { home } = content;

  const title = lang === 'ar' ? home.hero_title_ar : home.hero_title_en;
  const subtitle = lang === 'ar' ? home.hero_subtitle_ar : home.hero_subtitle_en;
  const cta = lang === 'ar' ? home.hero_cta_ar : home.hero_cta_en;
  const secondaryCta = lang === 'ar' ? home.hero_secondary_cta_ar : home.hero_secondary_cta_en;

  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section className="relative bg-[#012E64] text-white overflow-hidden">
      {/* Background Photography with High Contrast Dark Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={home.hero_image || '/images/hero_shipping_port_1793264761301.jpg'}
          alt="International Commercial Shipping Port"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Measured Scrim for WCAG AA Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#012E64]/95 via-[#012E64]/85 to-[#012E64]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#012E64] via-transparent to-transparent opacity-80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-20 sm:pb-28">
        <div className="max-w-3xl">
          {/* Unboxed Brand Sub-Kicker (Zero-pill discipline) */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#FE7913] mb-4">
            <span className="tracking-wide uppercase font-bold">
              {t('شركة أويا السبق للشحن والنقل الدولي', 'Oya Al Sabaq Logistics & Freight')}
            </span>
            <span aria-hidden="true" className="text-white/40">·</span>
            <span className="text-white/80">
              {t('موثوقية الشحن البحري والبري والجوي', 'Reliable Sea, Land & Air Freight')}
            </span>
          </div>

          {/* Hero Headline with generous Arabic line-height */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-normal sm:leading-relaxed lg:leading-[1.45] text-balance">
            {title}
          </h1>

          {/* Value Proposition */}
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal mb-8 max-w-2xl">
            {subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="#quote-calculator"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#FE7913] hover:bg-[#e06509] rounded-lg shadow-lg hover:shadow-orange-500/20 transition-all duration-200 whitespace-nowrap shrink-0 group"
            >
              <span>{cta}</span>
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </a>

            <a
              href="#services"
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              {secondaryCta}
            </a>
          </div>
        </div>
      </div>

      {/* Full-width 3-Metric Proof Strip Below Hero */}
      {home.show_hero_stats && (
        <div className="relative z-10 border-t border-white/10 bg-[#01224a]/90 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#016CB6]/30 border border-[#016CB6]/40 flex items-center justify-center shrink-0 text-[#FE7913]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-bold font-mono text-white tabular-nums">24/7</div>
                  <div className="text-xs text-slate-300">
                    {t('متابعة دورية للشحنات والتنسيق الملاحي المستمر', 'Continuous tracking & real-time cargo coordination')}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#016CB6]/30 border border-[#016CB6]/40 flex items-center justify-center shrink-0 text-[#FE7913]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-bold font-mono text-white tabular-nums">100%</div>
                  <div className="text-xs text-slate-300">
                    {t('التزام صارم بسلامة الحمولات وتوثيق الأختام', 'Strict cargo integrity & container seal verification')}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#016CB6]/30 border border-[#016CB6]/40 flex items-center justify-center shrink-0 text-[#FE7913]">
                  <Navigation className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-bold text-white">
                    {t('شبكة مباشرة', 'Direct Routes')}
                  </div>
                  <div className="text-xs text-slate-300">
                    {t('ربط موانئ البحر المتوسط والممرات البرية الحيوية', 'Connecting key Mediterranean ports & inland freight corridors')}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};
