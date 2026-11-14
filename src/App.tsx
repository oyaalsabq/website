/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ContentProvider, useContent } from './context/ContentContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { QuoteSection } from './components/QuoteSection';
import { ProjectsSection } from './components/ProjectsSection';
import { NewsSection } from './components/NewsSection';
import { BranchesSection } from './components/BranchesSection';
import { Footer } from './components/Footer';

const MainLayout: React.FC = () => {
  const { content } = useContent();
  const { home } = content;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Navbar adhering to 3-zone contract */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* About Company & Core Values */}
        <AboutSection />

        {/* Services Section */}
        {home.show_services !== false && <ServicesSection />}

        {/* Interactive Quote Estimator & WhatsApp Dispatch */}
        {home.show_quote_calculator !== false && <QuoteSection />}

        {/* Operations & Projects Record */}
        {home.show_projects !== false && <ProjectsSection />}

        {/* News & Operational Advancements */}
        {home.show_news !== false && <NewsSection />}

        {/* Active Branches & Office Locations */}
        {home.show_branches !== false && <BranchesSection />}
      </main>

      {/* Footer & Direct Contact Channels */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ContentProvider>
      <MainLayout />
    </ContentProvider>
  );
}
