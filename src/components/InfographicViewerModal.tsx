import React from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, ExternalLink, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { DriveResource, InfographicHotspot } from '../types';

interface InfographicViewerModalProps {
  resource: DriveResource;
  onClose: () => void;
}

export const InfographicViewerModal: React.FC<InfographicViewerModalProps> = ({ resource, onClose }) => {
  const [zoomLevel, setZoomLevel] = React.useState(100);
  const [selectedHotspot, setSelectedHotspot] = React.useState<InfographicHotspot | null>(
    resource.hotspots?.[0] || null
  );

  const zoomIn = () => setZoomLevel((prev) => Math.min(220, prev + 25));
  const zoomOut = () => setZoomLevel((prev) => Math.max(75, prev - 25));
  const resetZoom = () => setZoomLevel(100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-ink/70 backdrop-blur-md overflow-y-auto">
      <div className="bg-white border border-parchment text-ink rounded-2xl w-full max-w-6xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-parchment flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-parchment text-site-gold border border-parchment">
              Infographic Diagram
            </span>
            <h2 className="text-lg font-medium text-ink truncate max-w-md">
              {resource.title}
            </h2>
          </div>
          <div className="flex items-center gap-2">
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

        {/* Infographic Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          {/* Main Visual Image Canvas (Left) */}
          <div className="lg:col-span-8 bg-parchment/40 p-4 sm:p-6 flex flex-col justify-between space-y-4 border-r border-parchment min-h-[400px]">
            {/* Interactive Canvas Box */}
            <div className="relative flex-1 rounded-xl overflow-hidden bg-white border border-parchment flex items-center justify-center min-h-[350px]">
              <div
                style={{ transform: `scale(${zoomLevel / 100})` }}
                className="relative max-w-full max-h-[500px] transition-transform duration-200 cursor-grab active:cursor-grabbing"
              >
                <img
                  src={resource.thumbnailUrl}
                  alt={resource.title}
                  referrerPolicy="no-referrer"
                  className="rounded-lg object-contain shadow-2xl max-h-[450px]"
                />

                {/* Hotspot Markers Overlay */}
                {resource.hotspots?.map((hs) => {
                  const isSelected = selectedHotspot?.id === hs.id;
                  return (
                    <button
                      key={hs.id}
                      onClick={() => setSelectedHotspot(hs)}
                      style={{ top: `${hs.y}%`, left: `${hs.x}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full transition-transform duration-200 z-10 flex items-center justify-center ${
                        isSelected
                          ? 'bg-star-gold text-white scale-125 ring-4 ring-star-gold/30 shadow-xl'
                          : 'bg-white/90 hover:bg-star-gold text-site-gold hover:text-white border border-star-gold'
                      }`}
                      title={hs.title}
                    >
                      <MapPin className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>

              {/* Top Help Pill */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md border border-parchment px-3 py-1.5 rounded-full text-xs text-ink flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-star-gold" />
                <span>Click interactive pin markers to inspect diagram nodes</span>
              </div>
            </div>

            {/* Canvas Toolbar Controls */}
            <div className="flex items-center justify-between text-xs text-ink bg-white p-3 rounded-xl border border-parchment">
              <div className="flex items-center gap-2">
                <button
                  onClick={zoomOut}
                  className="p-1.5 rounded-lg bg-parchment hover:bg-ink/10 text-ink"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="font-mono text-mid-gray px-2">{zoomLevel}%</span>
                <button
                  onClick={zoomIn}
                  className="p-1.5 rounded-lg bg-parchment hover:bg-ink/10 text-ink"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={resetZoom}
                  className="p-1.5 rounded-lg bg-parchment hover:bg-ink/10 text-mid-gray hover:text-ink ml-1"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-xs text-mid-gray font-mono">
                Resolution: {resource.durationOrPages}
              </div>
            </div>
          </div>

          {/* Right Hotspot Detail & Takeaways Panel */}
          <div className="lg:col-span-4 bg-white p-5 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-medium uppercase tracking-wider text-site-gold">
                Diagram Callout Inspection
              </span>

              {selectedHotspot ? (
                <div className="p-4 rounded-xl bg-parchment border border-star-gold/30 space-y-2 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-white text-site-gold uppercase">
                      {selectedHotspot.badge || 'Node Step'}
                    </span>
                    <MapPin className="w-4 h-4 text-star-gold" />
                  </div>
                  <h3 className="text-base font-medium text-ink">
                    {selectedHotspot.title}
                  </h3>
                  <p className="text-xs text-ink leading-relaxed">
                    {selectedHotspot.description}
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-parchment border border-parchment text-xs text-mid-gray">
                  Select a marker pin on the image to view detailed step breakdown.
                </div>
              )}

              {/* Node Hotspots List */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-medium text-mid-gray uppercase tracking-wider">
                  Infographic Nodes ({resource.hotspots?.length || 0})
                </h4>
                <div className="space-y-2">
                  {resource.hotspots?.map((hs) => (
                    <div
                      key={hs.id}
                      onClick={() => setSelectedHotspot(hs)}
                      className={`p-2.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between text-xs ${
                        selectedHotspot?.id === hs.id
                          ? 'bg-parchment border-star-gold text-ink font-medium'
                          : 'bg-white border-parchment text-ink hover:bg-parchment'
                      }`}
                    >
                      <span className="truncate pr-2">{hs.title}</span>
                      <MapPin className={`w-3.5 h-3.5 shrink-0 ${selectedHotspot?.id === hs.id ? 'text-star-gold' : 'text-mid-gray'}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Takeaways */}
            <div className="pt-4 border-t border-parchment space-y-2">
              <h4 className="text-xs font-medium text-mid-gray uppercase tracking-wider">
                Infographic Benefits
              </h4>
              {resource.keyTakeaways.slice(0, 2).map((takeaway, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-ink">
                  <CheckCircle2 className="w-3.5 h-3.5 text-star-gold shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
