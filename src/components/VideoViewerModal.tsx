import React from 'react';
import { X, Play, Pause, RotateCcw, Volume2, VolumeX, ExternalLink, CheckCircle2, Clock } from 'lucide-react';
import { DriveResource } from '../types';

interface VideoViewerModalProps {
  resource: DriveResource;
  onClose: () => void;
}

export const VideoViewerModal: React.FC<VideoViewerModalProps> = ({ resource, onClose }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [playbackSpeed, setPlaybackSpeed] = React.useState(1.0);
  const [isMuted, setIsMuted] = React.useState(false);
  const hasTranscript = !!resource.transcript?.length;
  const [activeTab, setActiveTab] = React.useState<'chapters' | 'transcript' | 'takeaways'>('chapters');

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const restart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const seekTo = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-ink/70 backdrop-blur-md overflow-y-auto">
      <div className="bg-white border border-parchment text-ink rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-parchment flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-parchment text-site-gold border border-parchment">
              Explainer Video
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

        {/* Main Grid: Video Screen + Right Interactive Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          {/* Video Player Canvas (Left) */}
          <div className="lg:col-span-7 bg-parchment/40 p-4 flex flex-col justify-center space-y-3 border-r border-parchment">
            {/* Real Video Element */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-parchment">
              <video
                ref={videoRef}
                src={resource.mediaUrl}
                poster={resource.thumbnailUrl}
                className="absolute inset-0 w-full h-full object-contain bg-black"
                onClick={togglePlay}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              />

              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-ink/60 via-transparent to-ink/20"
                >
                  <span className="w-16 h-16 rounded-full bg-site-gold/90 hover:bg-star-gold text-white flex items-center justify-center shadow-xl shadow-ink/30 transform hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 fill-white ml-1" />
                  </span>
                </button>
              )}
            </div>

            {/* Player Scrubber & Time Bar */}
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full accent-site-gold h-1.5 bg-parchment rounded-lg cursor-pointer"
              />
              <div className="flex items-center justify-between text-xs text-ink font-mono">
                <div className="flex items-center gap-3">
                  <button onClick={togglePlay} className="hover:text-site-gold">
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button onClick={restart} className="hover:text-site-gold" title="Restart">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button onClick={() => setIsMuted(!isMuted)} className="hover:text-site-gold">
                    {isMuted ? <VolumeX className="w-4 h-4 text-mid-gray" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <span>
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                {/* Playback Speed Switcher */}
                <div className="flex items-center gap-1">
                  {[0.75, 1.0, 1.25, 1.5].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setPlaybackSpeed(speed)}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                        playbackSpeed === speed
                          ? 'bg-site-gold text-white'
                          : 'bg-parchment text-mid-gray hover:text-ink'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Meta Stats */}
            <div className="p-3 rounded-xl bg-white border border-parchment text-xs text-ink flex items-center justify-between">
              <div>
                <span className="text-mid-gray">File:</span> {resource.fileFormat} ({resource.fileSize})
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-star-gold" />
                <span>{resource.durationOrPages}</span>
              </div>
            </div>
          </div>

          {/* Right Tabbed Panel (Chapters, Transcript, Takeaways) */}
          <div className="lg:col-span-5 flex flex-col bg-white p-4 space-y-4">
            {/* Nav Tabs */}
            <div className="flex items-center bg-parchment p-1 rounded-xl text-xs font-medium">
              <button
                onClick={() => setActiveTab('chapters')}
                className={`flex-1 py-2 rounded-lg text-center transition-colors ${
                  activeTab === 'chapters'
                    ? 'bg-site-gold text-white shadow-xs'
                    : 'text-mid-gray hover:text-ink'
                }`}
              >
                Chapters
              </button>
              {hasTranscript && (
                <button
                  onClick={() => setActiveTab('transcript')}
                  className={`flex-1 py-2 rounded-lg text-center transition-colors ${
                    activeTab === 'transcript'
                      ? 'bg-site-gold text-white shadow-xs'
                      : 'text-mid-gray hover:text-ink'
                  }`}
                >
                  Transcript
                </button>
              )}
              <button
                onClick={() => setActiveTab('takeaways')}
                className={`flex-1 py-2 rounded-lg text-center transition-colors ${
                  activeTab === 'takeaways'
                    ? 'bg-site-gold text-white shadow-xs'
                    : 'text-mid-gray hover:text-ink'
                }`}
              >
                Takeaways
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[400px]">
              {activeTab === 'chapters' && (
                <div className="space-y-2">
                  <h3 className="text-xs font-medium text-mid-gray uppercase tracking-wider mb-2">
                    Video Timestamps
                  </h3>
                  {resource.chapters?.map((chap, idx) => (
                    <div
                      key={idx}
                      onClick={() => seekTo(chap.seconds)}
                      className="p-3 rounded-xl bg-white hover:bg-parchment border border-parchment hover:border-star-gold/40 cursor-pointer transition-all flex items-start gap-3 group"
                    >
                      <span className="px-2 py-1 rounded bg-parchment text-site-gold font-mono text-xs font-medium shrink-0">
                        {chap.time}
                      </span>
                      <div>
                        <h4 className="text-xs font-medium text-ink group-hover:text-site-gold transition-colors">
                          {chap.title}
                        </h4>
                        <p className="text-[11px] text-mid-gray mt-0.5">{chap.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'transcript' && hasTranscript && (
                <div className="space-y-2">
                  <h3 className="text-xs font-medium text-mid-gray uppercase tracking-wider mb-2">
                    Synchronized Speech Transcript
                  </h3>
                  {resource.transcript?.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => seekTo(item.seconds)}
                      className="p-2.5 rounded-lg bg-white hover:bg-parchment border border-parchment cursor-pointer transition-colors space-y-1"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-medium text-site-gold">{item.speaker}</span>
                        <span className="font-mono text-mid-gray">{item.time}</span>
                      </div>
                      <p className="text-xs text-ink">{item.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'takeaways' && (
                <div className="space-y-2.5">
                  <h3 className="text-xs font-medium text-mid-gray uppercase tracking-wider mb-2">
                    Key Video Learnings
                  </h3>
                  {resource.keyTakeaways.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-parchment text-xs text-ink">
                      <CheckCircle2 className="w-4 h-4 text-star-gold shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
