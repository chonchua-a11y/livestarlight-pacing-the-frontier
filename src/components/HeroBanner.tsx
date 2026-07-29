import React from 'react';
import { HardDrive } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

export const HeroBanner: React.FC = () => {
  return (
    <div className="bg-white border-b border-parchment py-10 md:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Minimal Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-parchment text-site-gold text-xs font-medium border border-parchment">
          <HardDrive className="w-3.5 h-3.5 text-star-gold" />
          <span>{SITE_CONFIG.heroPillLabel}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink leading-tight">
          {SITE_CONFIG.title}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-ink font-normal leading-relaxed max-w-2xl">
          {SITE_CONFIG.heroDescription}
        </p>
      </div>
    </div>
  );
};
