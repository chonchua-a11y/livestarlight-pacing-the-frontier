import React from 'react';
import { SITE_CONFIG } from '../data/siteConfig';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-parchment text-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Minimalist Branding */}
        <a href={SITE_CONFIG.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 group">
          <img
            src="/assets/lsl-v4.jpeg"
            alt="LiveStarLight"
            className="w-12 h-12 rounded-lg object-cover shadow-xs"
          />
          <div>
            <h1 className="text-base font-medium tracking-tight text-ink leading-none group-hover:text-site-gold transition-colors">
              {SITE_CONFIG.title}
            </h1>
            <p className="text-[11px] text-mid-gray font-normal">{SITE_CONFIG.byline}</p>
          </div>
        </a>
      </div>
    </header>
  );
};
