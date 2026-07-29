import React from 'react';
import { ExternalLink, HardDrive } from 'lucide-react';
import { DriveFolderInfo } from '../types';

interface HeroBannerProps {
  folderInfo: DriveFolderInfo;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ folderInfo }) => {
  return (
    <div className="bg-white border-b border-parchment py-10 md:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Minimal Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-parchment text-site-gold text-xs font-medium border border-parchment">
          <HardDrive className="w-3.5 h-3.5 text-star-gold" />
          <span>Google Drive Package • 4 Core Files</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink leading-tight">
          Pacing the Frontier
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-ink font-normal leading-relaxed max-w-2xl">
          Over 1,200 employees from major artificial intelligence labs have issued a collective warning titled "Pacing the Frontier" regarding the dangerous speed of AI development. These industry experts argue that the race to automate AI research could lead to capabilities that outpace our ability to maintain human control or ensure safety. Because individual companies face competitive pressures that prevent them from slowing down independently, the group is calling for international governance and government-supported tools to manage this growth. The signatories, including high-level leaders from OpenAI, Anthropic, and Meta, emphasize that while the technology offers immense potential, it also presents unprecedented social and existential risks. They ultimately advocate for a more intentional and coordinated approach to innovation to prevent a catastrophic lack of oversight.
        </p>

        {/* Action Link & Folder ID */}
        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-mid-gray font-mono">
          <span>Folder ID: <span className="text-ink font-medium">{folderInfo.id}</span></span>
          <span>•</span>
          <a
            href={folderInfo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-star-gold hover:text-site-gold font-medium hover:underline font-sans text-xs"
          >
            <span>View source files in Google Drive</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

