import React from 'react';
import { Video, FileText, Music, Image as ImageIcon, ExternalLink, Play, Eye } from 'lucide-react';
import { DriveResource } from '../types';

interface ResourceCardProps {
  resource: DriveResource;
  onPreview: (resource: DriveResource) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onPreview }) => {
  const getTypeBadge = (type: DriveResource['type']) => {
    switch (type) {
      case 'video':
        return { label: 'Explainer Video', icon: <Video className="w-4 h-4 text-site-gold" /> };
      case 'pdf':
        return { label: 'PDF Presentation Deck', icon: <FileText className="w-4 h-4 text-site-gold" /> };
      case 'audio':
        return { label: 'Audio Track', icon: <Music className="w-4 h-4 text-site-gold" /> };
      case 'infographic':
        return { label: 'Infographic Guide', icon: <ImageIcon className="w-4 h-4 text-site-gold" /> };
    }
  };

  const badge = getTypeBadge(resource.type);

  return (
    <div className="group bg-white rounded-2xl border border-parchment hover:border-site-gold/50 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden p-6">
      {/* Top Meta Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-parchment text-site-gold border-parchment">
            {badge.icon}
            {badge.label}
          </span>
          <span className="text-xs font-mono text-mid-gray bg-parchment px-2.5 py-1 rounded-full">
            {resource.durationOrPages}
          </span>
        </div>

        {/* Thumbnail Preview Banner */}
        <div
          onClick={() => onPreview(resource)}
          className="relative h-44 rounded-xl overflow-hidden bg-ink cursor-pointer group-hover:opacity-95 transition-opacity"
        >
          <img
            src={resource.thumbnailUrl}
            alt={resource.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-ink/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-white text-ink flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
              {resource.type === 'video' || resource.type === 'audio' ? (
                <Play className="w-5 h-5 fill-ink ml-0.5" />
              ) : (
                <Eye className="w-5 h-5 text-ink" />
              )}
            </div>
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5">
          <h3
            onClick={() => onPreview(resource)}
            className="text-lg font-medium text-ink group-hover:text-site-gold transition-colors cursor-pointer leading-snug"
          >
            {resource.title}
          </h3>
          <p className="text-xs sm:text-sm text-ink/80 leading-relaxed line-clamp-2">
            {resource.description}
          </p>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="pt-6 mt-4 border-t border-parchment flex items-center justify-between gap-3">
        <span className="text-[11px] font-mono text-mid-gray">
          {resource.fileSize} • {resource.fileFormat.split(' ')[0]}
        </span>

        <div className="flex items-center gap-2">
          <a
            href={resource.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-mid-gray hover:text-ink hover:bg-parchment transition-colors"
            title="Open raw file in Google Drive"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={() => onPreview(resource)}
            className="px-4 py-2 rounded-xl bg-site-gold hover:bg-star-gold text-white text-xs font-medium transition-colors flex items-center gap-1.5 shadow-xs"
          >
            {resource.type === 'video' || resource.type === 'audio' ? (
              <>
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Play Media</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>View File</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
