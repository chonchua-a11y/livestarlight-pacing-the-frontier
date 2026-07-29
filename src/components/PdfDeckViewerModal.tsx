import React from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink, FileText, CheckCircle2, BookOpen } from 'lucide-react';
import { DriveResource } from '../types';

interface PdfDeckViewerModalProps {
  resource: DriveResource;
  onClose: () => void;
}

export const PdfDeckViewerModal: React.FC<PdfDeckViewerModalProps> = ({ resource, onClose }) => {
  const slides = resource.slides || [];
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const [zoomLevel, setZoomLevel] = React.useState(100);

  const currentSlide = slides[currentSlideIndex] || {
    page: 1,
    title: 'Executive Slide Deck',
    summary: 'Executive presentation outline and key strategies.',
    keyPoints: ['Overview of strategic goals', 'Milestones and release scope'],
    image: resource.thumbnailUrl
  };

  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-ink/70 backdrop-blur-md overflow-y-auto">
      <div className="bg-white border border-parchment text-ink rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-parchment flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-parchment text-site-gold border border-parchment">
              PDF Slide Deck
            </span>
            <h2 className="text-lg font-medium text-ink truncate max-w-md">
              {resource.title}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {resource.downloadUrl && (
              <a
                href={resource.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-parchment hover:bg-ink/10 text-ink transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                View Full PDF
              </a>
            )}
            <a
              href={resource.driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-site-gold hover:bg-star-gold text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open in Drive
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-mid-gray hover:text-ink hover:bg-parchment transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Presentation Reader Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          {/* Main Slide Viewer Canvas (Left) */}
          <div className="lg:col-span-8 bg-parchment/40 p-4 sm:p-6 flex flex-col justify-between space-y-4 border-r border-parchment">
            {/* Slide Stage Container */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-white border border-parchment shadow-xl flex items-center justify-center group">
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                referrerPolicy="no-referrer"
                style={{ transform: `scale(${zoomLevel / 100})` }}
                className="w-full h-full object-cover transition-transform duration-200"
              />

              {/* Overlay Slide Number Indicator */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md border border-parchment px-3 py-1 rounded-full text-xs font-mono font-medium text-site-gold">
                Slide {currentSlideIndex + 1} of {slides.length}
              </div>

              {/* Navigation Arrow Overlays */}
              <button
                onClick={prevSlide}
                disabled={currentSlideIndex === 0}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-site-gold hover:text-white text-ink flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-all shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentSlideIndex === slides.length - 1}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-site-gold hover:text-white text-ink flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-all shadow-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Slide Navigation & Zoom Controls */}
            <div className="flex items-center justify-between text-xs text-ink bg-white p-3 rounded-xl border border-parchment">
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  disabled={currentSlideIndex === 0}
                  className="px-3 py-1.5 rounded-lg bg-parchment hover:bg-ink/10 disabled:opacity-40 text-xs font-medium"
                >
                  Previous Slide
                </button>
                <span className="font-mono text-mid-gray px-2">
                  {currentSlideIndex + 1} / {slides.length}
                </span>
                <button
                  onClick={nextSlide}
                  disabled={currentSlideIndex === slides.length - 1}
                  className="px-3 py-1.5 rounded-lg bg-site-gold hover:bg-star-gold text-white disabled:opacity-40 text-xs font-medium"
                >
                  Next Slide
                </button>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1.5">
                {[100, 125, 150].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setZoomLevel(lvl)}
                    className={`px-2 py-1 rounded text-[11px] font-medium ${
                      zoomLevel === lvl ? 'bg-site-gold text-white' : 'bg-parchment text-mid-gray hover:text-ink'
                    }`}
                  >
                    {lvl}%
                  </button>
                ))}
              </div>
            </div>

            {/* Slide Strip Thumbnails */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {slides.map((slide, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 cursor-pointer transition-all ${
                    currentSlideIndex === idx
                      ? 'border-star-gold scale-105 shadow-md shadow-star-gold/20'
                      : 'border-parchment opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={slide.image} alt={slide.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Slide Notes & Details */}
          <div className="lg:col-span-4 bg-white p-5 space-y-4">
            <div>
              <span className="text-[10px] font-medium uppercase tracking-wider text-site-gold">
                Slide Details • Page {currentSlide.page}
              </span>
              <h3 className="text-base font-medium text-ink mt-1">
                {currentSlide.title}
              </h3>
              <p className="text-xs text-ink mt-2 leading-relaxed bg-parchment p-3 rounded-xl border border-parchment">
                {currentSlide.summary}
              </p>
            </div>

            {/* Key Bullet Points */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-mid-gray uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-star-gold" />
                Slide Highlights
              </h4>
              <div className="space-y-2">
                {currentSlide.keyPoints?.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-ink p-2.5 rounded-lg bg-white border border-parchment">
                    <CheckCircle2 className="w-4 h-4 text-star-gold shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Slide Deck File Attributes */}
            <div className="pt-4 border-t border-parchment space-y-2">
              <div className="text-xs text-mid-gray flex justify-between">
                <span>File Format:</span>
                <span className="font-medium text-ink">{resource.fileFormat}</span>
              </div>
              <div className="text-xs text-mid-gray flex justify-between">
                <span>Document Size:</span>
                <span className="font-medium text-ink">{resource.fileSize}</span>
              </div>
              <div className="text-xs text-mid-gray flex justify-between">
                <span>Total Slides:</span>
                <span className="font-medium text-ink">{slides.length} Slides</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
