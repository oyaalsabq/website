import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import {
  Ship,
  Truck,
  Plane,
  Anchor,
  Box,
  Boxes,
  Package,
  Warehouse,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  MessageSquare,
  Copy,
  Check,
  Calculator,
  HelpCircle,
  MapPin,
  CheckSquare,
  Square,
  Layers,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export type MainFreightMode = 'sea' | 'land' | 'air';

export const QuoteSection: React.FC = () => {
  const { lang, content, t } = useContent();
  const { settings } = content;

  // 1. Main Freight Mode (بحري / بري / جوي)
  const [mainMode, setMainMode] = useState<MainFreightMode>('sea');

  // 2. Sub-Type (سعة ونوع وسيلة الشحن)
  const [subType, setSubType] = useState<string>('sea_fcl');

  // 3. Delivery Scope (نطاق التسليم: Door to Door, Port to Port, etc.)
  const [deliveryScope, setDeliveryScope] = useState<string>('door_to_door');

  // 4. Value-Added Logistics Services (خدمات التجهيز، التغليف، النقل من المخزن للميناء، التخليص، التأمين)
  const [additionalServices, setAdditionalServices] = useState<string[]>([
    'customs',
    'warehouse_pickup'
  ]);

  // 5. Cargo & Contact Information
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    cargoDetails: '',
    estimatedWeight: '',
    unitCount: '1',
    clientName: '',
    companyName: '',
    phone: '',
    email: '',
    notes: '',
  });

  const [copied, setCopied] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  // Switch Main Mode and auto-set appropriate default sub-type
  const handleModeChange = (mode: MainFreightMode) => {
    setMainMode(mode);
    if (mode === 'sea') {
      setSubType('sea_fcl');
    } else if (mode === 'land') {
      setSubType('land_ftl');
    } else if (mode === 'air') {
      setSubType('air_express');
    }
  };

  const toggleAdditionalService = (serviceId: string) => {
    setAdditionalServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  // Sub-type definitions per main mode
  const getSubTypeOptions = () => {
    if (mainMode === 'sea') {
      return [
        {
          id: 'sea_lcl',
          title: t('طرود وبضائع مجزأة (LCL)', 'Consolidated Parcels & LCL'),
          desc: t('شحن طرود أو طبالي مشتركة داخل حاوية اقتصادية', 'Shared container space for smaller cargo batches'),
          icon: Boxes,
        },
        {
          id: 'sea_fcl',
          title: t('حاوية كاملة (FCL 20ft / 40ft)', 'Full Container Load (FCL)'),
          desc: t('حاوية قياسية مخصصة بالكامل لبضاعتك ومقفلة برقم ختم رسمي', 'Dedicated 20ft/40ft sealed shipping container'),
          icon: Box,
        },
        {
          id: 'sea_vessel',
          title: t('استئجار سفينة / بابور كامل (Vessel Charter)', 'Full Vessel Chartering (Baboor)'),
          desc: t('عقود شحن بحري كبرى واستئجار سفن كاملة للمشاريع الضخمة', 'Full vessel chartering for large-scale enterprise projects'),
          icon: Anchor,
          featured: true,
        },
        {
          id: 'sea_breakbulk',
          title: t('معدات ثقيلة وبضائع مشاريع (Breakbulk)', 'Breakbulk & Heavy Machinery'),
          desc: t('شحن الآلات والرافعات والمعدات غير القابلة للتعبئة في حاويات', 'Oversized machinery and industrial infrastructure cargo'),
          icon: Layers,
        },
      ];
    }

    if (mainMode === 'land') {
      return [
        {
          id: 'land_ftl',
          title: t('شاحنة كاملة مخصصة (FTL)', 'Dedicated Full Truck (FTL)'),
          desc: t('تخصيص شاحنة نقل بري كاملة لنقل بضائعك مباشرة للوجهة', 'Direct point-to-point dedicated overland trailer'),
          icon: Truck,
        },
        {
          id: 'land_ltl',
          title: t('حمولة برية جزئية (LTL)', 'Consolidated Haulage (LTL)'),
          desc: t('نقل بري مشترك اقتصادي للطرود والحمولات متوسطة الحجم', 'Economical shared overland cargo transport'),
          icon: Boxes,
        },
        {
          id: 'land_heavy',
          title: t('مقطورات نقل ثقيل ومعدات (Lowboy / Flatbed)', 'Heavy Lowboy & Flatbed Trailers'),
          desc: t('شاحنات متخصصة لنقل معدات البناء وآلات الحفر والمولدات', 'Specialized carriers for industrial machinery & equipment'),
          icon: Layers,
        },
        {
          id: 'land_port_shuttle',
          title: t('نقل وسحب الحاويات من الميناء للمستودعات', 'Port-to-Warehouse Container Haulage'),
          desc: t('سحب وتفريغ الحاويات من رصيف الميناء لمخازن العميل والمصانع', 'Direct wharf dispatch to client warehousing hubs'),
          icon: Warehouse,
        },
      ];
    }

    // Air mode
    return [
      {
        id: 'air_express',
        title: t('شحن جوي سريع للطرود العاجلة (Express Air)', 'Expedited Express Air Courier'),
        desc: t('للعينات والمستندات والطرود ذات الأولوية الزمنية القصوى', 'Time-critical parcels, urgent samples, and documents'),
        icon: Plane,
      },
      {
        id: 'air_commercial',
        title: t('شحن جوي تجاري قياسي (Commercial Cargo)', 'Standard Commercial Air Freight'),
        desc: t('حجوزات منتظمة للشحنات التجارية عبر رحلات الطيران الدولية', 'Scheduled belly cargo for regular trade consignments'),
        icon: Box,
      },
      {
        id: 'air_charter',
        title: t('استئجار طائرة شحن خاصة (Air Cargo Charter)', 'Full Air Cargo Aircraft Charter'),
        desc: t('تأجير طائرة شحن كاملة لحالات الطوارئ والمشاريع المستعجلة', 'Dedicated air transport chartering for massive urgent supply'),
        icon: Anchor,
      },
    ];
  };

  // Delivery scope options (Incoterms & Handover)
  const deliveryScopeOptions = [
    {
      id: 'door_to_door',
      title: t('من الباب إلى الباب (Door to Door)', 'Door to Door'),
      badge: t('الخدمة الأكثر طلباً', 'Most Popular'),
      desc: t(
        'استلام الشحنة من مقر أو مصنع المورد وتسليمها حتى مستودع أو باب العميل بالكامل',
        'End-to-end receipt at supplier origin and final delivery at client premises'
      ),
    },
    {
      id: 'port_to_port',
      title: t('من الميناء إلى الميناء (Port to Port)', 'Port to Port'),
      desc: t(
        'الشحن عبر الخط الملاحي أو مسار النقل بين الموانئ ومحطات العبور فقط',
        'Direct freight between port of origin and port of discharge only'
      ),
    },
    {
      id: 'port_to_door',
      title: t('من الميناء إلى الباب (Port to Door)', 'Port to Door'),
      desc: t(
        'استلام الشحنة فور وصولها الميناء، وإنهاء الإجراءات والتخليص ونقلها لموقعك',
        'Handling from arrival port, clearance execution, and trucking to site'
      ),
    },
    {
      id: 'door_to_port',
      title: t('من الباب إلى الميناء (Door to Port)', 'Door to Port'),
      desc: t(
        'الاستلام من المصنع أو المخزن الداخلي ونقلها وتجهيزها حتى رصيف ميناء الشحن',
        'Pickup from inland factory/warehouse and dispatch to port of loading'
      ),
    },
  ];

  // Additional Value-Added Services
  const valueAddedServices = [
    {
      id: 'warehouse_pickup',
      title: t('النقل من المخزن / المصنع إلى الميناء', 'Warehouse / Factory Pickup to Port'),
      desc: t('توفير شاحنات لنقل الشحنة من موقع المورد إلى رصيف الميناء', 'Internal haulage from source origin to port terminal'),
    },
    {
      id: 'packing',
      title: t('خدمات التجهيز والتغليف الصناعي والتستيف', 'Industrial Packing, Crating & Palletizing'),
      desc: t('تثبيت البضاعة في طبالي خشبية وتغليف واقٍ ضد عوامل الرطوبة والصدمات', 'Protective strapping, palletizing, and shrink-wrap cargo securing'),
    },
    {
      id: 'customs',
      title: t('التخليص الجمركي واستخراج الأذونات', 'Customs Clearance & Documentation'),
      desc: t('متابعة البيان الجمركي وإنهاء إجراءات المعاينة واستلام الإفراجات', 'Handling customs declarations, inspection, and port clearance'),
    },
    {
      id: 'insurance',
      title: t('التأمين على البضائع والإجراءات الاحترازية', 'Cargo Insurance & Risk Coverage'),
      desc: t('تغطية تأمينية للشحنة ضد مخاطر النقل البحري والبري ومراقبة الأختام', 'Full transit cargo insurance, seal tracking, and safety protocols'),
    },
    {
      id: 'warehousing',
      title: t('التخزين المؤقت في المستودعات', 'Interim Warehousing & Staging'),
      desc: t('مساحات تخزين مؤمنة ومراقبة قبل الشحن أو قبل التوزيع النهائي', 'Secured warehouse staging prior to loading or final dispatch'),
    },
    {
      id: 'seal_inspection',
      title: t('الفحص الميداني ومعاينة سلامة الأختام والحاوية', 'Seal Verification & Container Integrity Inspection'),
      desc: t('فحص دقيق ومطابقة أرقام الأختام والتحقق من عدم وجود أي عبث بالشحنة', 'Physical integrity check and documented seal serial inspection'),
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = `OYA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRef(refCode);
  };

  // Generate structured WhatsApp message
  const generateWhatsAppMessage = () => {
    const modeLabel =
      mainMode === 'sea'
        ? t('الشحن البحري الدولي (Sea Freight)', 'International Sea Freight')
        : mainMode === 'land'
        ? t('الشحن والنقل البري (Land Freight)', 'Commercial Land Freight')
        : t('الشحن الجوي (Air Freight)', 'Commercial Air Freight');

    const subOption = getSubTypeOptions().find((s) => s.id === subType);
    const subTypeLabel = subOption ? subOption.title : subType;

    const scopeOption = deliveryScopeOptions.find((d) => d.id === deliveryScope);
    const scopeLabel = scopeOption ? scopeOption.title : deliveryScope;

    const selectedAddonLabels = additionalServices
      .map((id) => valueAddedServices.find((v) => v.id === id)?.title)
      .filter(Boolean);

    const msg =
      lang === 'ar'
        ? `*طلب عرض سعر شحنة - شركة أويا السبق للشحن والنقل الدولي*\n` +
          `-----------------------------------\n` +
          `• *الاسم / الشركة:* ${formData.clientName || 'عميل محترم'} ${formData.companyName ? `(${formData.companyName})` : ''}\n` +
          `• *رقم الهاتف للتواصل:* ${formData.phone || 'غير محدد'}\n` +
          `-----------------------------------\n` +
          `• *المسار اللوجستي الأساسي:* ${modeLabel}\n` +
          `• *سعة / وسيلة الشحن:* ${subTypeLabel}\n` +
          `• *نطاق الاستلام والتسليم:* ${scopeLabel}\n` +
          (selectedAddonLabels.length > 0
            ? `• *الخدمات الإضافية المطلوبة:*\n` + selectedAddonLabels.map((s) => `  - ${s}`).join('\n') + `\n`
            : '') +
          `-----------------------------------\n` +
          `• *نقطة الانطلاق (المصدر):* ${formData.origin || 'غير محدد'}\n` +
          `• *الوجهة النهائية (المقصد):* ${formData.destination || 'غير محدد'}\n` +
          `• *عدد الحاويات / الشاحنات / الوحدات:* ${formData.unitCount}\n` +
          `• *الوزن التقريبي:* ${formData.estimatedWeight || 'حسب الكشف'}\n` +
          `• *وصف وطبيعة البضاعة:* ${formData.cargoDetails || 'بضائع تجارية عامة'}\n` +
          (formData.notes ? `• *ملاحظات واشتراطات خاصة:* ${formData.notes}\n` : '') +
          `-----------------------------------\n` +
          `أرجو تزويدي بأفضل تسعيرة متاحة وأقرب موعد تحرك/إبحار متاح. شكراً لكم.`
        : `*Freight Quotation Request - Oya Al Sabaq Logistics*\n` +
          `-----------------------------------\n` +
          `• *Client / Company:* ${formData.clientName || 'Valued Client'} ${formData.companyName ? `(${formData.companyName})` : ''}\n` +
          `• *Contact Phone:* ${formData.phone || 'N/A'}\n` +
          `-----------------------------------\n` +
          `• *Primary Mode:* ${modeLabel}\n` +
          `• *Freight Capacity:* ${subTypeLabel}\n` +
          `• *Handover Scope:* ${scopeLabel}\n` +
          (selectedAddonLabels.length > 0
            ? `• *Value-Added Services:*\n` + selectedAddonLabels.map((s) => `  - ${s}`).join('\n') + `\n`
            : '') +
          `-----------------------------------\n` +
          `• *Origin (Port/City):* ${formData.origin || 'N/A'}\n` +
          `• *Destination (Port/City):* ${formData.destination || 'N/A'}\n` +
          `• *Units / Containers / Volume:* ${formData.unitCount}\n` +
          `• *Estimated Weight:* ${formData.estimatedWeight || 'TBD'}\n` +
          `• *Cargo Description:* ${formData.cargoDetails || 'General Merchandise'}\n` +
          (formData.notes ? `• *Special Notes:* ${formData.notes}\n` : '') +
          `-----------------------------------\n` +
          `Please provide your rate estimate and earliest transit schedule. Thank you.`;

    return encodeURIComponent(msg);
  };

  const handleOpenWhatsApp = () => {
    const rawNumber = settings.whatsapp_number
      ? settings.whatsapp_number.replace(/[^0-9]/g, '')
      : '218915022516';
    const encoded = generateWhatsAppMessage();
    const url = `https://wa.me/${rawNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopySummary = () => {
    const text = decodeURIComponent(generateWhatsAppMessage());
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="quote-calculator" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-bold text-[#016CB6] mb-2 uppercase tracking-wider">
            <span>{t('حاسبة وتسعير الشحنات المباشر', 'Cargo Quotation & Dispatch Builder')}</span>
            <span aria-hidden="true">·</span>
            <span>{t('تواصل فوري مع العمليات عبر واتساب', 'Direct WhatsApp Operations Dispatch')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#012E64] tracking-tight">
            {t(
              'طلب عرض سعر لشحنتك (بحري - بري - جوي)',
              'Request a Quotation for Your Cargo (Sea - Land - Air)'
            )}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            {t(
              'اختر المسار الأساسي للشحنة، ثم حدد سعة الشحن (حاوية، طرود، أو بابور كامل)، واختر نطاق التسليم (مثل Door to Door) والخدمات التكميلية كالتغليف والتخليص والنقل الداخلي والتأمين، ليتم تجهيز بيانات شحنتك وإرسالها فوراً إلى قسم العمليات.',
              'Select your core transport mode, specify freight capacity (parcels, full containers, or vessel chartering), choose delivery scope (e.g. Door-to-Door), and configure value-added logistics services for instant WhatsApp dispatch.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Form Container */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* STEP 1: Main Mode Selection (البحري - البري - الجوي) */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-xs font-bold text-[#012E64] uppercase tracking-wider">
                    {t('1. المسار اللوجستي الأساسي للشحنة', '1. Primary Transport Mode')}
                  </label>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {t('اختر وسيلة النقل الرئيسية', 'Select main freight mode')}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Sea Freight */}
                  <button
                    type="button"
                    onClick={() => handleModeChange('sea')}
                    className={`p-4 rounded-xl border text-start transition-all flex items-center gap-3.5 ${
                      mainMode === 'sea'
                        ? 'border-[#016CB6] bg-[#016CB6]/5 text-[#012E64] ring-2 ring-[#016CB6]/20 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        mainMode === 'sea' ? 'bg-[#016CB6] text-white shadow' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Ship className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-bold leading-tight">
                        {t('الشحن البحري الدولي', 'International Sea Freight')}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                        {t('حاويات، طرود، وبابور كامل', 'FCL, LCL & Full Vessel')}
                      </div>
                    </div>
                  </button>

                  {/* Land Freight */}
                  <button
                    type="button"
                    onClick={() => handleModeChange('land')}
                    className={`p-4 rounded-xl border text-start transition-all flex items-center gap-3.5 ${
                      mainMode === 'land'
                        ? 'border-[#FE7913] bg-[#FE7913]/5 text-[#012E64] ring-2 ring-[#FE7913]/20 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        mainMode === 'land' ? 'bg-[#FE7913] text-white shadow' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Truck className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-bold leading-tight">
                        {t('الشحن والنقل البري', 'Commercial Land Freight')}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                        {t('شاحنات ومقطورات ثقيلة', 'FTL, LTL & Heavy Fleet')}
                      </div>
                    </div>
                  </button>

                  {/* Air Freight */}
                  <button
                    type="button"
                    onClick={() => handleModeChange('air')}
                    className={`p-4 rounded-xl border text-start transition-all flex items-center gap-3.5 ${
                      mainMode === 'air'
                        ? 'border-[#012E64] bg-[#012E64]/5 text-[#012E64] ring-2 ring-[#012E64]/20 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        mainMode === 'air' ? 'bg-[#012E64] text-white shadow' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Plane className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-bold leading-tight">
                        {t('الشحن الجوي السريع', 'Air Cargo Freight')}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                        {t('طرود عاجلة وشحنات طارئة', 'Express & Air Charter')}
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* STEP 2: Sub-Type & Capacity Selection (تفاصيل سعة الشحن) */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-xs font-bold text-[#012E64] uppercase tracking-wider">
                    {t('2. سعة الشحن وطبيعة الوسيلة المطلوبة', '2. Freight Capacity & Shipment Scale')}
                  </label>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {mainMode === 'sea'
                      ? t('خيارات الحاويات والطرود والسفن', 'Container, LCL or Vessel Charter')
                      : mainMode === 'land'
                      ? t('خيارات أسطول الشاحنات', 'Trucking & Trailer Configurations')
                      : t('خيارات الشحن الجوي', 'Air Freight Capacity')}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {getSubTypeOptions().map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = subType === opt.id;
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setSubType(opt.id)}
                        className={`p-3.5 rounded-xl border text-start transition-all relative ${
                          isSelected
                            ? 'border-[#016CB6] bg-blue-50/50 text-[#012E64] shadow-sm ring-1 ring-[#016CB6]'
                            : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                              isSelected ? 'bg-[#016CB6] text-white' : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs sm:text-sm font-bold text-[#012E64]">
                                {opt.title}
                              </span>
                              {opt.featured && (
                                <span className="text-[10px] font-bold bg-[#FE7913] text-white px-1.5 py-0.5 rounded">
                                  {t('مشاريع كبرى', 'Enterprise')}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-600 leading-relaxed mt-1">
                              {opt.desc}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 3: Delivery Scope (نطاق التسليم - Door to Door / Port to Port) */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-xs font-bold text-[#012E64] uppercase tracking-wider">
                    {t('3. نطاق الاستلام والتسليم (Handover & Delivery Scope)', '3. Incoterm & Delivery Scope')}
                  </label>
                  <span className="text-[11px] text-[#FE7913] font-bold">
                    {t('اختر حدود ومكان استلام بضاعتك', 'Specify delivery boundary')}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {deliveryScopeOptions.map((scope) => {
                    const isSelected = deliveryScope === scope.id;
                    return (
                      <button
                        type="button"
                        key={scope.id}
                        onClick={() => setDeliveryScope(scope.id)}
                        className={`p-3.5 rounded-xl border text-start transition-all relative ${
                          isSelected
                            ? 'border-[#FE7913] bg-orange-50/50 text-[#012E64] shadow-sm ring-1 ring-[#FE7913]'
                            : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="font-bold text-xs sm:text-sm text-[#012E64]">
                            {scope.title}
                          </div>
                          {scope.badge && (
                            <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full shrink-0">
                              {scope.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed mt-1">
                          {scope.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 4: Value-Added Logistics Services (خدمات التجهيز والتغليف والتخليص والتأمين) */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-xs font-bold text-[#012E64] uppercase tracking-wider">
                    {t('4. الخدمات الميدانية والإجراءات التكميلية', '4. Value-Added Logistics Services')}
                  </label>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {t('يمكنك اختيار أكثر من خدمة', 'Select all that apply')}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {valueAddedServices.map((service) => {
                    const isChecked = additionalServices.includes(service.id);
                    return (
                      <div
                        key={service.id}
                        onClick={() => toggleAdditionalService(service.id)}
                        className={`p-3 rounded-lg border cursor-pointer select-none transition-all flex items-start gap-3 ${
                          isChecked
                            ? 'border-[#016CB6] bg-blue-50/40 text-[#012E64]'
                            : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0 text-[#016CB6]">
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-[#016CB6]" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-bold leading-tight text-[#012E64]">
                            {service.title}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                            {service.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* STEP 5: Origin, Destination & Cargo Details */}
              <div className="pt-2 border-t border-slate-100 space-y-4">
                <label className="block text-xs font-bold text-[#012E64] uppercase tracking-wider">
                  {t('5. مسار الشحنة والكميات والبيانات الفنية', '5. Route, Cargo Metrics & Quantities')}
                </label>

                {/* Route: Origin & Destination */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t('بلد / ميناء / مدينة الانطلاق (Origin)', 'Origin (Port or City)')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.origin}
                      onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                      placeholder={t('مثال: ميناء نينغبو (الصين) أو إسطنبول (تركيا)', 'e.g. Ningbo Port (China) or Istanbul (Turkey)')}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#016CB6] focus:ring-1 focus:ring-[#016CB6]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t('بلد / ميناء / مدينة الوصول (Destination)', 'Destination (Port or City)')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      placeholder={t('مثال: ميناء طرابلس البحري أو مصراتة (ليبيا)', 'e.g. Tripoli Port or Misrata (Libya)')}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#016CB6] focus:ring-1 focus:ring-[#016CB6]"
                    />
                  </div>
                </div>

                {/* Units, Weight & Commodity */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t('عدد الوحدات / الحاويات / الشاحنات', 'Unit / Container / Truck Count')}
                    </label>
                    <input
                      type="text"
                      value={formData.unitCount}
                      onChange={(e) => setFormData({ ...formData, unitCount: e.target.value })}
                      placeholder={t('1 حاوية 40 قدم أو بابور كامل', '1x 40ft or Full Vessel')}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#016CB6]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t('الوزن التقريبي (طن / كجم)', 'Approximate Weight (Tons/Kg)')}
                    </label>
                    <input
                      type="text"
                      value={formData.estimatedWeight}
                      onChange={(e) => setFormData({ ...formData, estimatedWeight: e.target.value })}
                      placeholder={t('مثال: 22 طن أو 400 كجم', 'e.g. 22 tons or 400 kg')}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#016CB6]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t('طبيعة البضاعة ونوعها', 'Commodity / Cargo Type')}
                    </label>
                    <input
                      type="text"
                      value={formData.cargoDetails}
                      onChange={(e) => setFormData({ ...formData, cargoDetails: e.target.value })}
                      placeholder={t('قطع غيار، مواد غذائية، معدات', 'Spare parts, FMCG, machinery')}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#016CB6]"
                    />
                  </div>
                </div>
              </div>

              {/* STEP 6: Client Contact Information */}
              <div className="pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-[#012E64] uppercase tracking-wider mb-3">
                  {t('6. بيانات التواصل مع مقدم الطلب', '6. Contact & Company Details')}
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t('اسم المسؤول أو العميل', 'Contact Name')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder={t('الاسم الكريم', 'Your Full Name')}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#016CB6]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t('اسم الشركة أو المؤسسة', 'Company Name')}
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder={t('اختياري', 'Optional')}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#016CB6]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t('رقم الهاتف للتواصل', 'Phone / Mobile')} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t('+218 91 000 0000', '+218 91 000 0000')}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#016CB6]"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('ملاحظات خاصة بالشحنة أو اشتراطات التفريغ', 'Special Cargo Notes or Handling Instructions')}
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={t('أي اشتراطات خاصة كالتبريد، تاريخ محدد، أو تفريغ بموقع المصنع', 'Any special requirements such as refrigeration, strict ETA, or onsite discharge')}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#016CB6]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
                {/* Primary: Real WhatsApp Dispatch */}
                <button
                  type="button"
                  onClick={handleOpenWhatsApp}
                  className="w-full sm:flex-1 py-3.5 px-5 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <MessageSquare className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>{t('إرسال التفاصيل مباشرة عبر واتساب', 'Send Directly via Official WhatsApp')}</span>
                </button>

                {/* Secondary: Copy Brief */}
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="w-full sm:w-auto py-3.5 px-4 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? t('تم نسخ ملخص الطلب!', 'Brief Copied!') : t('نسخ ملخص الطلب', 'Copy Brief')}</span>
                </button>

                {/* Generate Internal Reference */}
                <button
                  type="submit"
                  className="w-full sm:w-auto py-3.5 px-4 text-xs font-bold text-white bg-[#012E64] hover:bg-[#016CB6] rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Calculator className="w-4 h-4" />
                  <span>{t('توليد رقم المرجع', 'Generate Reference')}</span>
                </button>
              </div>
            </form>

            {/* Generated Reference Box */}
            {submittedRef && (
              <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-[#016CB6] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold">
                    {t('رقم مرجع طلب التسعير الميداني:', 'Internal Quotation Inquiry Ref:')}{' '}
                    <span className="font-mono text-sm text-[#012E64] font-extrabold">{submittedRef}</span>
                  </div>
                  <div className="text-blue-800">
                    {t(
                      'يرجى استخدام زر "إرسال التفاصيل مباشرة عبر واتساب" للتواصل الفوري مع مسؤولي الحجوزات مع إرفاق هذا الرقم لتسهيل المتابعة.',
                      'Please use the "Send via WhatsApp" button to communicate directly with our operations desk with this reference.'
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Info & Support Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Direct Operations Support Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-sm hover:border-[#016CB6] transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#012E64]/5 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-5 h-5 text-[#FE7913]" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#012E64]">
                    {t('تواصل مباشر مع قسم العمليات', 'Direct Operations Support')}
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {t('حجوزات الشحن البحري والبري والجوي', 'Ocean, Overland & Air Cargo Coordination')}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-5">
                {t(
                  'فريقنا الميداني جاهز لمساعدتكم في تحديد أبعاد الحاويات وتنسيق الحجوزات البحرية واستئجار السفن والمسارات البرية بدقة تامة.',
                  'Our operations team is available to assist with container dimensions, vessel charters, ocean bookings, and inland transit coordination.'
                )}
              </p>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                {/* Primary Phone */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                  <span className="text-xs font-semibold text-slate-600">
                    {t('هاتف المقر:', 'Headquarters Phone:')}
                  </span>
                  <a
                    href={`tel:${settings.phone_primary}`}
                    dir="ltr"
                    className="font-mono text-xs font-bold text-[#012E64] hover:text-[#016CB6] transition-colors"
                  >
                    {settings.phone_primary}
                  </a>
                </div>

                {/* Official WhatsApp */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100 hover:border-emerald-200 transition-colors">
                  <span className="text-xs font-semibold text-emerald-900">
                    {t('واتساب الاستفسارات:', 'Inquiries WhatsApp:')}
                  </span>
                  <a
                    href={`https://wa.me/${(settings.whatsapp_number || '218915022516').replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    className="font-mono text-xs font-bold text-emerald-700 hover:text-emerald-900 transition-colors flex items-center gap-1.5"
                  >
                    <span>{settings.phone_secondary || '+218 91 502 2516'}</span>
                  </a>
                </div>

                {/* Official Email */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                  <span className="text-xs font-semibold text-slate-600">
                    {t('البريد الإلكتروني:', 'Official Email:')}
                  </span>
                  <a
                    href={`mailto:${settings.email || 'oia_company@yahoo.com'}`}
                    dir="ltr"
                    className="font-mono text-xs font-semibold text-[#012E64] hover:text-[#016CB6] transition-colors"
                  >
                    {settings.email || 'oia_company@yahoo.com'}
                  </a>
                </div>

                {/* P.O. Box */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                  <span className="text-xs font-semibold text-slate-600">
                    {t('صندوق البريد:', 'P.O. Box:')}
                  </span>
                  <span className="text-xs font-bold text-[#012E64]">
                    {lang === 'ar'
                      ? settings.po_box_ar || 'ص.ب 81910 طرابلس'
                      : settings.po_box_en || 'P.O. Box 81910, Tripoli'}
                  </span>
                </div>
              </div>
            </div>

            {/* Freight Standards Card */}
            <div className="bg-white border border-slate-200 p-6 sm:p-7 rounded-xl shadow-sm hover:border-[#016CB6] transition-colors">
              <div className="flex items-center gap-2 text-xs font-bold text-[#016CB6] uppercase tracking-wider mb-3">
                <ShieldCheck className="w-4 h-4 text-[#FE7913]" />
                <span>{t('ضوابط الشحن والإجراءات الاحترازية', 'Freight & Safety Standards')}</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-2.5">
                <li className="flex items-start gap-2">
                  <span className="text-[#016CB6] font-bold text-sm leading-none mt-0.5">·</span>
                  <span>{t('توفير خدمات الشحن من الباب إلى الباب (Door to Door) المتكاملة.', 'Complete Door-to-Door multi-modal freight execution.')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#016CB6] font-bold text-sm leading-none mt-0.5">·</span>
                  <span>{t('فحص سلامة الأختام والتحقق من أرقام الحاويات في جميع نقاط العبور.', 'Seal integrity and container serial check at every transfer node.')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#016CB6] font-bold text-sm leading-none mt-0.5">·</span>
                  <span>{t('تنسيق إجراءات التخليص الجمركي والتأمين وإصدار البوالص المعتمدة.', 'Customs clearance, bill of lading issuance & insurance safeguards.')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#016CB6] font-bold text-sm leading-none mt-0.5">·</span>
                  <span>{t('تجهيز الشحنات الكبرى وحجوزات السفن الكاملة للمشاريع الضخمة.', 'Vessel chartering and project cargo handling for industrial firms.')}</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
