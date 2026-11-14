import React from 'react';
import { useContent } from '../context/ContentContext';
import { Anchor, Shield, Target, Compass, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { lang, t } = useContent();

  const values = [
    {
      icon: Shield,
      title: t('السلامة والأمان', 'Cargo Safety & Security'),
      desc: t(
        'نضع سلامة الشحنات والبضائع في صدارة أولوياتنا، مع اتباع بروتوكولات مناولة وتثبيت معتمدة دولياً.',
        'Protecting freight through accredited international handling, securing, and container sealing standards.'
      ),
    },
    {
      icon: Target,
      title: t('الالتزام بالمواعيد', 'Schedule Punctuality'),
      desc: t(
        'ندرك أهمية الوقت في سلاسل الإمداد، لذا نخطط المسارات وننسق الموانئ لتفادي أي تأخير غير مبرر.',
        'Precision timing is vital to supply chains; we schedule routes to prevent bottlenecks and demurrage.'
      ),
    },
    {
      icon: Compass,
      title: t('الشفافية والتواصل', 'Transparency & Integrity'),
      desc: t(
        'تواصل مباشر وتحديثات فورية لحالة الشحنات من نقطة الشحن الأولى وحتى استلامها في الوجهة النهائية.',
        'Unambiguous operational updates and direct customer milestone reporting from origin to delivery.'
      ),
    },
  ];

  return (
    <section id="about" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-2 text-xs font-bold text-[#016CB6] mb-2 uppercase tracking-wider">
            <span>{t('عن شركة أويا السبق', 'About Oya Al Sabaq')}</span>
            <span aria-hidden="true">·</span>
            <span>{t('ريادة الشحن الدولي', 'International Freight Leadership')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#012E64] tracking-tight">
            {t(
              'شريككم الموثوق في الشحن البحري والبري وسلاسل الإمداد التجارية',
              'Your Trusted Partner in Ocean Freight, Land Transport & Supply Chain'
            )}
          </h2>
        </div>

        {/* Narrative Split: Company Story & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-5 text-slate-700 leading-relaxed text-base">
            <p>
              {t(
                'تأسست شركة أويا السبق للشحن والنقل الدولي لتكون ركيزة لوجستية متخصصة تلبي تطلعات الشركات الصناعية والتجارية والمستوردين. نوفر حلولاً لوجستية متكاملة تشمل الشحن البحري للحاويات، النقل البري بالأسطول الحديث، وخدمات التخزين والمناولة الدقيقة.',
                'Oya Al Sabaq International Shipping & Transport was established to provide dedicated logistics infrastructure for industrial and commercial enterprises. We deliver end-to-end solutions spanning ocean container freight, modern overland fleet haulage, and meticulous port and warehouse handling.'
              )}
            </p>
            <p>
              {t(
                'نعتمد في منهجيتنا التشغيلية على إدارة احترافية تجمع بين المعرفة العميقة بحركة الموانئ والمسارات البرية الإقليمية، وبين التنسيق المباشر مع شبكات النقل العالمية، مما يضمن لعملائنا سرعة الإنجاز والحفاظ على سلامة البضائع طوال فترة النقل.',
                'Our operational methodology combines deep expertise in regional ports and transport corridors with established maritime carrier connections, guaranteeing rapid transit times and rigorous freight protection at every milestone.'
              )}
            </p>

            <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-[#012E64] mb-1 text-sm">
                  <Anchor className="w-4 h-4 text-[#FE7913]" />
                  <span>{t('رؤيتنا', 'Our Vision')}</span>
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  {t(
                    'أن نكون الخيار الأول والأكثر موثوقية في المنطقة لخدمات الشحن الدولي والنقل المتخصص.',
                    'To stand as the most trusted premier freight forwarding and transport partner across regional corridors.'
                  )}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-[#012E64] mb-1 text-sm">
                  <Award className="w-4 h-4 text-[#016CB6]" />
                  <span>{t('رسالتنا', 'Our Mission')}</span>
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  {t(
                    'تقديم خدمات شحن آمنة وفعالة تدعم استقرار وتوسع أعمال عملائنا بأعلى معايير الجودة والشفافية.',
                    'Empowering customer trade through safe, agile, and transparent logistics execution.'
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Media Feature Box */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-md">
              <img
                src="./images/sea_freight_vessel_1793264761184.jpg"
                alt="Oya Al Sabaq Marine Logistics"
                className="w-full h-80 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 bg-white border-t border-slate-200">
                <div className="text-xs font-bold text-[#012E64]">
                  {t('الملاحة البحرية وإدارة الحاويات', 'Maritime Logistics & Container Fleet')}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {t('تنسيق الشحن البحري عبر موانئ البحر المتوسط والمراكز الدولية', 'Coordinating container freight across Mediterranean and international port terminals')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Operational Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-[#016CB6] transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#012E64]/5 text-[#012E64] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#FE7913]" />
                </div>
                <h3 className="text-base font-bold text-[#012E64] mb-2">{val.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{val.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
