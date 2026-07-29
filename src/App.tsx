import React from 'react';
import { DriveResource, DriveFolderInfo } from './types';
import { INITIAL_FOLDER_INFO, DRIVE_RESOURCES } from './data/driveResources';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ResourceCard } from './components/ResourceCard';
import { VideoViewerModal } from './components/VideoViewerModal';
import { PdfDeckViewerModal } from './components/PdfDeckViewerModal';
import { AudioPlayerViewerModal } from './components/AudioPlayerViewerModal';
import { InfographicViewerModal } from './components/InfographicViewerModal';

export default function App() {
  const [folderInfo] = React.useState<DriveFolderInfo>(INITIAL_FOLDER_INFO);
  const [resources] = React.useState<DriveResource[]>(DRIVE_RESOURCES);

  // Active Preview Modal
  const [activePreviewResource, setActivePreviewResource] = React.useState<DriveResource | null>(null);

  return (
    <div className="min-h-screen bg-white text-ink font-sans flex flex-col selection:bg-star-gold selection:text-white">
      {/* Top Header */}
      <Header folderInfo={folderInfo} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Minimal Hero Title Section */}
        <HeroBanner folderInfo={folderInfo} />

        {/* 4 Files Minimalist Grid */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onPreview={(res) => setActivePreviewResource(res)}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Minimalist Footer */}
      <footer className="bg-white border-t border-parchment py-6 text-center text-xs text-mid-gray">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href="https://livestarlight.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group"
          >
            <img
              src="/assets/lsl-v4.jpeg"
              alt="LiveStarLight"
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex flex-col items-start gap-0.5">
              <p className="font-medium text-ink">Pacing the Frontier</p>
              <span className="text-star-gold group-hover:text-site-gold font-medium group-hover:underline">
                A LiveStarLight Research Brief
              </span>
            </div>
          </a>
          <div className="flex flex-col items-center sm:items-end gap-1.5">
            <div className="flex items-center gap-3 text-mid-gray">
              <a href="https://livestarlight.com" target="_blank" rel="noopener noreferrer" className="hover:text-site-gold hover:underline">
                livestarlight.com
              </a>
              <span>•</span>
              <a href="https://www.linkedin.com/company/livestarlight/" target="_blank" rel="noopener noreferrer" className="hover:text-site-gold hover:underline">
                LiveStarLight on LinkedIn
              </a>
            </div>
            <a href="https://www.linkedin.com/in/chonchua" target="_blank" rel="noopener noreferrer" className="text-mid-gray hover:text-site-gold hover:underline">
              Connect with Choon on LinkedIn
            </a>
          </div>
        </div>
      </footer>

      {/* Interactive Media Modals */}
      {activePreviewResource?.type === 'video' && (
        <VideoViewerModal
          resource={activePreviewResource}
          onClose={() => setActivePreviewResource(null)}
        />
      )}

      {activePreviewResource?.type === 'pdf' && (
        <PdfDeckViewerModal
          resource={activePreviewResource}
          onClose={() => setActivePreviewResource(null)}
        />
      )}

      {activePreviewResource?.type === 'audio' && (
        <AudioPlayerViewerModal
          resource={activePreviewResource}
          onClose={() => setActivePreviewResource(null)}
        />
      )}

      {activePreviewResource?.type === 'infographic' && (
        <InfographicViewerModal
          resource={activePreviewResource}
          onClose={() => setActivePreviewResource(null)}
        />
      )}
    </div>
  );
}

