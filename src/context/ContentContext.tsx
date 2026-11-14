import React, { createContext, useContext, useState, useEffect } from 'react';
import defaultSettings from '../../content/settings.json';
import defaultHome from '../../content/home.json';
import defaultServices from '../../content/services.json';
import defaultProjects from '../../content/projects.json';
import defaultNews from '../../content/news.json';
import defaultBranches from '../../content/branches.json';
import defaultSeo from '../../content/seo.json';

export type Language = 'ar' | 'en';

export interface SiteContent {
  settings: typeof defaultSettings;
  home: typeof defaultHome;
  services: typeof defaultServices;
  projects: typeof defaultProjects;
  news: typeof defaultNews;
  branches: typeof defaultBranches;
  seo: typeof defaultSeo;
}

interface ContentContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  content: SiteContent;
  updateSettings: (newSettings: typeof defaultSettings) => void;
  updateHome: (newHome: typeof defaultHome) => void;
  updateServices: (newServices: typeof defaultServices) => void;
  updateProjects: (newProjects: typeof defaultProjects) => void;
  updateNews: (newNews: typeof defaultNews) => void;
  updateBranches: (newBranches: typeof defaultBranches) => void;
  resetToDefaults: () => void;
  exportContentZip: () => void;
  t: (arText: string, enText: string) => string;
}

const defaultContent: SiteContent = {
  settings: defaultSettings,
  home: defaultHome,
  services: defaultServices,
  projects: defaultProjects,
  news: defaultNews,
  branches: defaultBranches,
  seo: defaultSeo,
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const STORAGE_KEY_CONTENT = 'oya_al_sabaq_content_v10';
const STORAGE_KEY_LANG = 'oya_al_sabaq_lang_v1';

// Helper to normalize image paths so images always resolve on production / GitHub Pages / Netlify
export const fixImagePath = (path: string | undefined): string => {
  if (!path) return '';
  if (path.startsWith('/src/assets/images/')) {
    return path.replace('/src/assets/images/', './images/');
  }
  if (path.startsWith('/images/')) {
    return path.replace('/images/', './images/');
  }
  return path;
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Determine initial language from localStorage or browser language
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LANG);
      if (saved === 'ar' || saved === 'en') return saved;
      // Auto detect user browser language
      const browserLang = navigator.language || (navigator as { userLanguage?: string }).userLanguage || '';
      return browserLang.toLowerCase().startsWith('ar') ? 'ar' : 'en';
    } catch {
      return 'ar';
    }
  });

  // Load content with fallback to default
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONTENT);
      if (saved) {
        // Deep sanitize / normalize any old /src/assets/ or root /images/ paths in cached storage
        const rawJson = saved
          .replace(/\/src\/assets\/images\//g, './images/')
          .replace(/"\/images\//g, '"./images/');
        const parsed = JSON.parse(rawJson);
        return {
          settings: { ...defaultContent.settings, ...(parsed.settings || {}) },
          home: { ...defaultContent.home, ...(parsed.home || {}) },
          services: { ...defaultContent.services, ...(parsed.services || {}) },
          projects: { ...defaultContent.projects, ...(parsed.projects || {}) },
          news: { ...defaultContent.news, ...(parsed.news || {}) },
          branches: { ...defaultContent.branches, ...(parsed.branches || {}) },
          seo: { ...defaultContent.seo, ...(parsed.seo || {}) },
        };
      }
    } catch (e) {
      console.warn('Failed to parse saved CMS content:', e);
    }
    return defaultContent;
  });

  // Sync document language and direction
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem(STORAGE_KEY_LANG, lang);
    } catch (e) {
      console.warn('LocalStorage unavailable', e);
    }
  }, [lang]);

  // Persist content updates to localStorage
  const saveContent = (newContent: SiteContent) => {
    setContent(newContent);
    try {
      localStorage.setItem(STORAGE_KEY_CONTENT, JSON.stringify(newContent));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  };

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const toggleLang = () => {
    setLangState((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const t = (arText: string, enText: string) => {
    return lang === 'ar' ? arText : enText;
  };

  const updateSettings = (newSettings: typeof defaultSettings) => {
    saveContent({ ...content, settings: newSettings });
  };

  const updateHome = (newHome: typeof defaultHome) => {
    saveContent({ ...content, home: newHome });
  };

  const updateServices = (newServices: typeof defaultServices) => {
    saveContent({ ...content, services: newServices });
  };

  const updateProjects = (newProjects: typeof defaultProjects) => {
    saveContent({ ...content, projects: newProjects });
  };

  const updateNews = (newNews: typeof defaultNews) => {
    saveContent({ ...content, news: newNews });
  };

  const updateBranches = (newBranches: typeof defaultBranches) => {
    saveContent({ ...content, branches: newBranches });
  };

  const resetToDefaults = () => {
    try {
      localStorage.removeItem(STORAGE_KEY_CONTENT);
    } catch (e) {
      console.warn(e);
    }
    setContent(defaultContent);
  };

  const exportContentZip = () => {
    // Generate JSON download for syncing with Git repository
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `oya-content-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <ContentContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        content,
        updateSettings,
        updateHome,
        updateServices,
        updateProjects,
        updateNews,
        updateBranches,
        resetToDefaults,
        exportContentZip,
        t,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
