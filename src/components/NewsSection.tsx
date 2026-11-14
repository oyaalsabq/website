import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Calendar, User, ArrowRight, ArrowLeft, X } from 'lucide-react';

interface ArticleItem {
  id: string;
  slug: string;
  title_ar: string;
  title_en: string;
  date: string;
  author_ar: string;
  author_en: string;
  excerpt_ar: string;
  excerpt_en: string;
  content_ar: string;
  content_en: string;
  image: string;
  published: boolean;
}

export const NewsSection: React.FC = () => {
  const { lang, content, t } = useContent();
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);

  const articles = (content.news.articles || []).filter((a: ArticleItem) => a.published !== false);

  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section id="news" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-bold text-[#016CB6] mb-2 uppercase tracking-wider">
            <span>{t('المستجدات والفعاليات', 'News & Announcements')}</span>
            <span aria-hidden="true">·</span>
            <span>{t('تحديثات العمليات', 'Operations Updates')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#012E64] tracking-tight">
            {t(
              'آخر أخبار شركة أويا السبق وتطورات النقل والشحن',
              'Latest Company News & Logistics Industry Developments'
            )}
          </h2>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article: ArticleItem) => {
            const title = lang === 'ar' ? article.title_ar : article.title_en;
            const excerpt = lang === 'ar' ? article.excerpt_ar : article.excerpt_en;
            const author = lang === 'ar' ? article.author_ar : article.author_en;

            return (
              <div
                key={article.id}
                className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-[#016CB6] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                    <img
                      src={article.image}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>

                  <div className="p-6">
                    {/* Unboxed Metadata (Zero pill discipline) */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#016CB6]" />
                        <span className="font-mono tabular-nums">{article.date}</span>
                      </div>
                      <span aria-hidden="true">·</span>
                      <div className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-[#016CB6]" />
                        <span>{author}</span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-[#012E64] mb-2 group-hover:text-[#016CB6] transition-colors leading-snug">
                      {title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="text-xs font-bold text-[#012E64] hover:text-[#FE7913] flex items-center gap-1.5 transition-colors"
                  >
                    <span>{t('قراءة التقرير بالكامل', 'Read Full Article')}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="relative h-60 w-full">
              <img
                src={selectedArticle.image}
                alt={lang === 'ar' ? selectedArticle.title_ar : selectedArticle.title_en}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 end-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-mono tabular-nums">{selectedArticle.date}</span>
                <span aria-hidden="true">·</span>
                <span>{lang === 'ar' ? selectedArticle.author_ar : selectedArticle.author_en}</span>
              </div>

              <h3 className="text-xl font-bold text-[#012E64] leading-tight">
                {lang === 'ar' ? selectedArticle.title_ar : selectedArticle.title_en}
              </h3>

              <div className="pt-3 border-t border-slate-100 text-sm text-slate-700 leading-relaxed space-y-3">
                <p>{lang === 'ar' ? selectedArticle.content_ar : selectedArticle.content_en}</p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
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
