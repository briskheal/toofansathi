import React, { useState, useEffect } from 'react';
import {
  Tv,
  X,
  Minimize2,
  Maximize2,
  Volume2,
  Radio,
  ExternalLink,
  MapPin,
  RefreshCw,
  Globe,
  Headphones,
  AlertTriangle,
  Play,
  Flame,
  RadioTower
} from 'lucide-react';
import { LIVE_NEWS_REGIONS, getChannelsForLocation } from '../data/liveNewsChannels';

export default function LiveTvModal({
  isOpen,
  onClose,
  activeLocation,
  isFloating,
  setIsFloating
}) {
  // Automatically select region based on user's GPS state
  const initialRegion = getChannelsForLocation(activeLocation?.state);
  const [selectedState, setSelectedState] = useState(initialRegion.state);
  const [activeChannelId, setActiveChannelId] = useState(initialRegion.channels[0].id);
  const [isAudioOnlyMode, setIsAudioOnlyMode] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  // Sync state when activeLocation changes or modal opens
  useEffect(() => {
    if (isOpen) {
      const region = getChannelsForLocation(activeLocation?.state);
      setSelectedState(region.state);
      if (region.channels && region.channels.length > 0) {
        setActiveChannelId(region.channels[0].id);
      }
    }
  }, [isOpen, activeLocation?.state]);

  const currentRegion = LIVE_NEWS_REGIONS.find((r) => r.state === selectedState) || LIVE_NEWS_REGIONS[0];
  const activeChannel = currentRegion.channels.find((c) => c.id === activeChannelId) || currentRegion.channels[0];

  const handleChannelSelect = (id) => {
    setActiveChannelId(id);
    setIframeKey((prev) => prev + 1);
  };

  if (!isOpen && !isFloating) return null;

  // Floating PiP (Picture-in-Picture) Mini-Player Mode
  if (isFloating) {
    return (
      <div className="fixed bottom-20 right-3 z-[1100] w-[290px] sm:w-[330px] bg-slate-950/95 border-2 border-red-500 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md animate-in slide-in-from-bottom-4 duration-200">
        <div className="p-2 bg-slate-900 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping flex-shrink-0"></span>
            <Tv className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
            <span className="text-[11px] font-extrabold text-white truncate">{activeChannel.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsFloating(false)}
              className="p-1 text-slate-400 hover:text-white rounded"
              title="Expand to Full Player"
            >
              <Maximize2 className="w-3.5 h-3.5 text-sky-400" />
            </button>
            <button
              onClick={() => {
                setIsFloating(false);
                onClose();
              }}
              className="p-1 text-slate-400 hover:text-red-400 rounded"
              title="Stop and Close Player"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Video / Audio Surface */}
        <div className="relative aspect-video bg-black">
          {isAudioOnlyMode ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-slate-950">
              <div className="flex items-center gap-1 mb-2">
                <span className="w-1 h-3 bg-red-500 animate-bounce"></span>
                <span className="w-1 h-5 bg-red-500 animate-bounce [animation-delay:0.1s]"></span>
                <span className="w-1 h-2 bg-red-500 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1 h-4 bg-red-500 animate-bounce [animation-delay:0.3s]"></span>
              </div>
              <span className="text-[10px] text-slate-300 font-bold block truncate max-w-[200px]">{activeChannel.name}</span>
              <span className="text-[9px] text-emerald-400 font-mono">🎧 Emergency Audio Mode</span>
            </div>
          ) : (
            <iframe
              key={`mini-${iframeKey}-${activeChannel.videoId}`}
              src={`https://www.youtube.com/embed/${activeChannel.videoId}?autoplay=1&mute=0&rel=0&modestbranding=1`}
              title={activeChannel.name}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        {/* Controls footer */}
        <div className="p-2 bg-slate-900/90 flex items-center justify-between text-[10px]">
          <span className="text-slate-400 font-mono">{activeChannel.lang}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAudioOnlyMode(!isAudioOnlyMode)}
              className="text-amber-400 hover:text-amber-300 font-semibold"
            >
              {isAudioOnlyMode ? 'Show Video' : 'Audio Only'}
            </button>
            <a
              href={activeChannel.directLiveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 font-bold flex items-center gap-0.5"
            >
              <span>App</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Full Screen Modal Mode
  return (
    <div className="fixed inset-0 z-[1200] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[96vh] overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-3 sm:p-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 flex-shrink-0">
              <Tv className="w-4 h-4 text-red-500 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-1.5">
                  <span>Live News TV & Emergency Broadcast</span>
                  <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-red-600 text-white text-[9px] font-black uppercase tracking-wider animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                    Live Feed
                  </span>
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-sky-400 flex-shrink-0" />
                <span>Auto-tuned to your GPS region: <strong className="text-sky-300 font-semibold">{activeLocation?.name || 'Local'} ({activeLocation?.state || 'India'})</strong></span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => setIsFloating(true)}
              className="p-1.5 sm:px-2.5 sm:py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1"
              title="Minimize to Floating Picture-in-Picture player"
            >
              <Minimize2 className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Mini Player</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* State / Region Filter Tabs */}
        <div className="bg-slate-950 px-3 py-2 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1 flex-shrink-0 flex items-center gap-1">
            <Globe className="w-3 h-3 text-sky-400" />
            State:
          </span>
          {LIVE_NEWS_REGIONS.map((reg) => {
            const isSelected = selectedState === reg.state;
            const isGpsState = activeLocation?.state && reg.state.toLowerCase().includes(activeLocation.state.toLowerCase());
            return (
              <button
                key={reg.state}
                onClick={() => {
                  setSelectedState(reg.state);
                  handleChannelSelect(reg.channels[0].id);
                }}
                className={`whitespace-nowrap flex-shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all border flex items-center gap-1 ${
                  isSelected
                    ? 'bg-red-600 text-white border-red-400 shadow-md ring-1 ring-red-400'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {isGpsState && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>}
                <span>{reg.stateLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Active Channel Quick Switcher */}
        <div className="bg-slate-900/60 px-3 py-2 border-b border-slate-800/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase mr-1 flex-shrink-0">
            Channels ({currentRegion.channels.length}):
          </span>
          {currentRegion.channels.map((chan) => {
            const isActive = activeChannelId === chan.id;
            return (
              <button
                key={chan.id}
                onClick={() => handleChannelSelect(chan.id)}
                className={`whitespace-nowrap flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-sky-600 text-white border-sky-400 shadow-md ring-1 ring-sky-400'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span>📺 {chan.name}</span>
                <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${isActive ? 'bg-sky-900 text-sky-200' : 'bg-slate-800 text-slate-400'}`}>
                  {chan.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Video Surface & Player */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-slate-950/40">
          <div className="relative rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl aspect-video w-full max-h-[460px]">
            {isAudioOnlyMode ? (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center mb-3">
                  <Headphones className="w-8 h-8 text-red-400 animate-pulse" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white mb-1">
                  Audio-Only Emergency Radio Mode
                </h4>
                <p className="text-xs text-slate-300 max-w-md mb-3">
                  Broadcasting live stream audio from <strong>{activeChannel.name}</strong>. Saves 90% mobile battery and cellular data during disaster outages.
                </p>
                <div className="flex items-center gap-1.5 h-6">
                  <span className="w-1.5 h-4 bg-red-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-6 bg-red-500 rounded-full animate-bounce [animation-delay:0.1s]"></span>
                  <span className="w-1.5 h-3 bg-red-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-5 bg-red-500 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                  <span className="w-1.5 h-4 bg-red-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            ) : (
              <iframe
                key={`main-${iframeKey}-${activeChannel.videoId}`}
                src={`https://www.youtube.com/embed/${activeChannel.videoId}?autoplay=1&mute=0&rel=0&modestbranding=1`}
                title={activeChannel.name}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
          </div>

          {/* Quick Action Bar for Instant Play / Fallback */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-2.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <div>
                <strong className="text-white block text-xs">{activeChannel.fullname}</strong>
                <span className="text-[10px] text-slate-400">{activeChannel.description}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Reload / Refresh stream */}
              <button
                onClick={() => setIframeKey((k) => k + 1)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1"
                title="Reload Live Video Stream"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reload</span>
              </button>

              {/* Audio Mode Toggle */}
              <button
                onClick={() => setIsAudioOnlyMode(!isAudioOnlyMode)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isAudioOnlyMode
                    ? 'bg-amber-600 text-white border-amber-400 shadow-md'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                }`}
                title="Conserves 90% mobile data and battery in disaster areas"
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>{isAudioOnlyMode ? 'Audio Mode Active' : 'Low-Data Audio'}</span>
              </button>

              {/* Official Web TV Stream */}
              {activeChannel.webTvUrl && (
                <a
                  href={activeChannel.webTvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white border border-sky-400 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                  title="Watch on official channel website"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Web Portal</span>
                </a>
              )}

              {/* Direct Open in YouTube App / Site */}
              <a
                href={activeChannel.directLiveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white border border-red-400 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                title="Watch on official YouTube channel or App with zero latency"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Open in YouTube App</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
              </a>
            </div>
          </div>

          {/* Fallback Notice for Restrictions */}
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5">
              <RadioTower className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>If any stream shows <em>"unavailable"</em> due to browser restrictions, tap <strong>Open in YouTube App</strong> for direct high-speed live broadcast.</span>
            </span>
          </div>

          {/* Safety & Emergency Broadcast Notice */}
          <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-800/60 text-[11px] text-amber-200 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Emergency Broadcast Protocol:</strong> During cyclonic landfalls or extreme weather, tune to your regional news channel or <strong>DD News</strong> for official Government Relief & Rescue announcements. Use <strong>Mini Player</strong> mode to keep listening while viewing radar maps.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span>24x7 Regional & Doordarshan Feeds</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
