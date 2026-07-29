import React from 'react';
import { X, Play, Pause, ExternalLink, Music, FastForward, Rewind, CheckCircle2 } from 'lucide-react';
import { DriveResource } from '../types';

interface AudioPlayerViewerModalProps {
  resource: DriveResource;
  onClose: () => void;
}

export const AudioPlayerViewerModal: React.FC<AudioPlayerViewerModalProps> = ({ resource, onClose }) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [playbackSpeed, setPlaybackSpeed] = React.useState(1.0);
  const [activeTab, setActiveTab] = React.useState<'chapters' | 'takeaways'>('chapters');

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const skipTime = (delta: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(Math.max(0, audio.currentTime + delta), duration || audio.duration || 0);
  };

  const seekTo = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
      audioRef.current.play();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-ink/70 backdrop-blur-md overflow-y-auto">
      <div className="bg-white border border-parchment text-ink rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-parchment flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-parchment text-site-gold border border-parchment">
              Audio Track
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

        {/* Real Audio Element (hidden, controls rendered below) */}
        <audio
          ref={audioRef}
          src={resource.mediaUrl}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        />

        {/* Player Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-y-auto">
          {/* Audio Console (Left) */}
          <div className="md:col-span-7 bg-parchment/40 p-6 flex flex-col justify-between space-y-6 border-r border-parchment">
            {/* Visual Album / Podcast Card */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-parchment shadow-sm">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-parchment shrink-0 border border-parchment relative">
                <img src={resource.thumbnailUrl} alt={resource.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-ink/10 flex items-center justify-center">
                  <Music className="w-8 h-8 text-site-gold" />
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-medium text-site-gold tracking-wider">
                  Audio Stream • {resource.fileFormat}
                </span>
                <h3 className="text-base font-medium text-ink leading-snug">
                  {resource.title}
                </h3>
                <p className="text-xs text-mid-gray">{resource.subtitle}</p>
              </div>
            </div>

            {/* Waveform Visualizer (from the real audio track) */}
            <div className="bg-white border border-parchment rounded-2xl p-5 space-y-4">
              <div className="h-20 flex items-center justify-center gap-1 px-4">
                {Array.from({ length: 36 }).map((_, i) => {
                  const height = isPlaying
                    ? Math.sin(i * 0.4 + currentTime * 2) * 28 + 36
                    : Math.sin(i * 0.5) * 12 + 20;
                  const isActive = duration > 0 && (i / 36) * duration <= currentTime;
                  return (
                    <div
                      key={i}
                      style={{ height: `${Math.max(8, height)}px` }}
                      className={`w-1.5 rounded-full transition-all duration-150 ${
                        isActive ? 'bg-star-gold shadow-xs shadow-star-gold/40' : 'bg-parchment'
                      }`}
                    />
                  );
                })}
              </div>

              {/* Scrubber */}
              <div className="space-y-1">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full accent-site-gold h-2 bg-parchment rounded-lg cursor-pointer"
                />
                <div className="flex items-center justify-between text-xs font-mono text-mid-gray">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Audio Controls Bar */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1">
                  {[0.75, 1.0, 1.25, 1.5].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setPlaybackSpeed(speed)}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                        playbackSpeed === speed
                          ? 'bg-site-gold text-white'
                          : 'bg-parchment text-mid-gray hover:text-ink'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>

                {/* Primary Playback Triggers */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => skipTime(-10)}
                    className="p-2 rounded-full text-mid-gray hover:text-ink hover:bg-parchment"
                    title="Rewind 10s"
                  >
                    <Rewind className="w-4 h-4" />
                  </button>
                  <button
                    onClick={togglePlay}
                    className="w-12 h-12 rounded-full bg-site-gold hover:bg-star-gold text-white flex items-center justify-center shadow-lg shadow-site-gold/30 transform hover:scale-105 transition-all"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
                  </button>
                  <button
                    onClick={() => skipTime(10)}
                    className="p-2 rounded-full text-mid-gray hover:text-ink hover:bg-parchment"
                    title="Forward 10s"
                  >
                    <FastForward className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs text-mid-gray font-mono">
                  {resource.fileSize}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Chapters & Takeaways */}
          <div className="md:col-span-5 bg-white p-5 space-y-4 flex flex-col">
            {/* Tabs */}
            <div className="flex items-center bg-parchment p-1 rounded-xl text-xs font-medium">
              <button
                onClick={() => setActiveTab('chapters')}
                className={`flex-1 py-2 rounded-lg text-center transition-colors ${
                  activeTab === 'chapters'
                    ? 'bg-site-gold text-white shadow-xs'
                    : 'text-mid-gray hover:text-ink'
                }`}
              >
                Chapters ({resource.chapters?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab('takeaways')}
                className={`flex-1 py-2 rounded-lg text-center transition-colors ${
                  activeTab === 'takeaways'
                    ? 'bg-site-gold text-white shadow-xs'
                    : 'text-mid-gray hover:text-ink'
                }`}
              >
                Key Notes
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto space-y-3 max-h-[380px] pr-1">
              {activeTab === 'chapters' && (
                <div className="space-y-2">
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

              {activeTab === 'takeaways' && (
                <div className="space-y-2.5">
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
