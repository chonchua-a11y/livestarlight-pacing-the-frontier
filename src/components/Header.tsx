import React from 'react';
import { ExternalLink, Copy, Check } from 'lucide-react';
import { DriveFolderInfo } from '../types';

interface HeaderProps {
  folderInfo: DriveFolderInfo;
}

export const Header: React.FC<HeaderProps> = ({ folderInfo }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(folderInfo.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-parchment text-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Minimalist Branding */}
        <a href="https://livestarlight.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 group">
          <img
            src="/assets/lsl-v4.jpeg"
            alt="LiveStarLight"
            className="w-12 h-12 rounded-lg object-cover shadow-xs"
          />
          <div>
            <h1 className="text-base font-medium tracking-tight text-ink leading-none group-hover:text-site-gold transition-colors">
              Pacing the Frontier
            </h1>
            <p className="text-[11px] text-mid-gray font-normal">By Chon "Choon" Chua · LiveStarLight</p>
          </div>
        </a>

        {/* Minimal Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-mid-gray hover:text-ink hover:bg-parchment transition-colors"
            title="Copy Drive Link"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-mid-gray" />
                <span>Share Link</span>
              </>
            )}
          </button>

          <a
            href={folderInfo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium bg-site-gold hover:bg-star-gold text-white transition-all shadow-xs"
          >
            <span>Open Drive</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
};
