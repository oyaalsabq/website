import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Calendar, MapPin, Tag, ArrowRight, ArrowLeft, X, Eye } from 'lucide-react';

interface ProjectItem {
  id: string;
  slug: string;
  title_ar: string;
  title_en: string;
  category: string;
  location_ar: string;
  location_en: string;
  date: string;
  excerpt_ar: string;
  excerpt_en: string;
  description_ar: string;
  description_en: string;
  image: string;
  gallery?: string[];
  status: string;
  published: boolean;
}

export const ProjectsSection: React.FC = () => {
  const { lang, content, t } = useContent();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);

  const projects = (content.projects.projects || []).filter(
    (p: ProjectItem) => p.published !== false
  );

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p: ProjectItem) => p.category === activeCategory);

  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'sea_freight':
        return t('شحن بحري', 'Sea Freight');
      case 'land_freight':
        return t('شحن ونقل بري', 'Land Freight');
      case 'warehousing':
        return t('تخزين ولوجستيات', 'Warehousing');
      default:
        return t('عمليات لوجستية', 'Logistics Operation');
    }
  };

  return (
    <section id="projects" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#016CB6] mb-2 uppercase tracking-wider">
              <span>{t('سجل العمليات والشحنات', 'Operations & Project Record')}</span>
              <span aria-hidden="true">·</span>
              <span>{t('إنجازات موثقة', 'Documented Field Transit')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#012E64] tracking-tight">
              {t(
                'نماذج من الشحنات والعمليات اللوجستية المنفذة',
                'Featured Operations & International Shipments Executed'
              )}
            </h2>
          </div>

          {/* Category Filter Tabs (Zero-pill button controls) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg overflow-x-auto">
            {[
              { id: 'all', label: t('جميع العمليات', 'All Operations') },
              { id: 'sea_freight', label: t('شحن بحري', 'Ocean Freight') },
              { id: 'land_freight', label: t('نقل بري', 'Land Haulage') },
              { id: 'warehousing', label: t('تخزين ومناولة', 'Warehousing') },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  activeCategory === tab.id
                    ? 'bg-white text-[#012E64] shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProjects.map((project: ProjectItem) => {
            const title = lang === 'ar' ? project.title_ar : project.title_en;
            const excerpt = lang === 'ar' ? project.excerpt_ar : project.excerpt_en;
            const location = lang === 'ar' ? project.location_ar : project.location_en;

            return (
              <div
                key={project.id}
                className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-[#016CB6] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail Image */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                    <img
                      src={project.image}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    
                    {/* Unboxed Metadata overlay */}
                    <div className="absolute bottom-3 start-4 end-4 flex items-center justify-between text-xs text-white drop-shadow">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#FE7913]" />
                        <span className="font-medium text-[11px]">{location}</span>
                      </div>
                      <span className="font-mono text-[11px] text-slate-200 tabular-nums">
                        {project.date}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    {/* Quiet category metadata */}
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-[#016CB6] mb-2 uppercase">
                      <span>{getCategoryLabel(project.category)}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-500 font-normal">
                        {project.status === 'completed' ? t('مكتمل بنجاح', 'Completed') : t('قيد المتابعة', 'Active')}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#012E64] mb-2 group-hover:text-[#016CB6] transition-colors line-clamp-2">
                      {title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Action */}
                <div className="px-5 pb-5 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setSelectedProject(project);
                      setActiveGalleryIndex(0);
                    }}
                    className="w-full py-2 text-xs font-bold text-[#012E64] hover:text-[#016CB6] flex items-center justify-between transition-colors"
                  >
                    <span>{t('عرض تفاصيل الشحنة والمعرض', 'View Details & Gallery')}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            {/* Modal Image Carousel */}
            <div className="relative h-72 w-full bg-slate-900">
              <img
                src={
                  selectedProject.gallery && selectedProject.gallery.length > 0
                    ? selectedProject.gallery[activeGalleryIndex] || selectedProject.image
                    : selectedProject.image
                }
                alt={lang === 'ar' ? selectedProject.title_ar : selectedProject.title_en}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 end-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 start-6 end-6 text-white">
                <span className="text-xs font-bold text-[#FE7913] uppercase tracking-wider mb-1 block">
                  {getCategoryLabel(selectedProject.category)}
                </span>
                <h3 className="text-xl font-bold">
                  {lang === 'ar' ? selectedProject.title_ar : selectedProject.title_en}
                </h3>
              </div>
            </div>

            {/* Gallery Thumbnails (if multiple) */}
            {selectedProject.gallery && selectedProject.gallery.length > 1 && (
              <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center gap-3 overflow-x-auto">
                {selectedProject.gallery.map((img, gIdx) => (
                  <button
                    key={gIdx}
                    onClick={() => setActiveGalleryIndex(gIdx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      activeGalleryIndex === gIdx ? 'border-[#FE7913] shadow' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}

            {/* Project Full Description & Meta */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Unboxed Metadata row */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-4 border-b border-slate-200">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#016CB6]" />
                  <span>
                    <strong className="text-slate-700">{t('الموقع الجغرافي:', 'Location:')}</strong>{' '}
                    {lang === 'ar' ? selectedProject.location_ar : selectedProject.location_en}
                  </span>
                </div>
                <span aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#016CB6]" />
                  <span>
                    <strong className="text-slate-700">{t('تاريخ الإنجاز:', 'Date:')}</strong>{' '}
                    <span className="font-mono tabular-nums">{selectedProject.date}</span>
                  </span>
                </div>
                <span aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-[#016CB6]" />
                  <span>
                    <strong className="text-slate-700">{t('الحالة:', 'Status:')}</strong>{' '}
                    {selectedProject.status === 'completed' ? t('تم التسليم بالكامل', 'Delivered & Completed') : selectedProject.status}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#016CB6] uppercase mb-2">
                  {t('تفاصيل ومجريات العملية اللوجستية', 'Operational Narrative & Execution')}
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {lang === 'ar' ? selectedProject.description_ar : selectedProject.description_en}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <a
                  href="#quote-calculator"
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#012E64] hover:bg-[#016CB6] rounded-lg transition-colors"
                >
                  {t('طلب تسعير لعملية مماثلة', 'Request Quote for Similar Cargo')}
                </a>
                <button
                  onClick={() => setSelectedProject(null)}
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
