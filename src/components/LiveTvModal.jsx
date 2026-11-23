import React, { useState, useEffect } from 'react';
import {
  Tv,
  X,
  Minimize2,
  Maximize2,
  Volume2,
  VolumeX,
  Radio,
  ExternalLink,
  MapPin,
  RefreshCw,
  Globe,
  Headphones,
  AlertTriangle,
  Play,
  Flame,
  RadioTower,
  Sparkles,
  Zap,
  Radio as RadioIcon
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
  const [playerMode, setPlayerMode] = useState('youtube'); // 'youtube' | 'webtv' | 'audio'
  const [iframeKey, setIframeKey] = useState(0);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [liveVideoMap, setLiveVideoMap] = useState({});
  const [isResolvingLive, setIsResolvingLive] = useState(false);
  const [isLiveSynced, setIsLiveSynced] = useState(false);

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

  // Dynamically resolve real-time live video ID from Cloudflare Edge API
  // This prevents playing past archived bulletins when broadcasters switch sessions
  useEffect(() => {
    if (!activeChannelId) return;
    let isCancelled = false;
    setIsResolvingLive(true);
    setIsLiveSynced(false);

    fetch(`/api/live?channel=${activeChannelId}&t=${Date.now()}`)
      .then((res) => {
        if (!res.ok) throw new Error('Live edge API offline');
        return res.json();
      })
      .then((data) => {
        if (!isCancelled && data && data.success && data.videoId) {
          setLiveVideoMap((prev) => ({
            ...prev,
            [activeChannelId]: data.videoId
          }));
          setIsLiveSynced(true);
        }
      })
      .catch((err) => {
        // Fallback gracefully to predefined high-availability broadcast ID
        console.debug('Dynamic live edge sync fallback:', err.message);
      })
      .finally(() => {
        if (!isCancelled) setIsResolvingLive(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [activeChannelId, iframeKey]);

  const currentVideoId = liveVideoMap[activeChannelId] || activeChannel.videoId;

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

        {/* Video / Audio Surface with persistent audio stream and 3D left-to-right spin on switch */}
        <div
          key={`mini-surface-${iframeKey}-${currentVideoId}`}
          className="relative aspect-video bg-black overflow-hidden animate-spin-flip"
        >
          {/* Real Audio & Video stream (kept alive in background so voice plays) */}
          <iframe
            key={`mini-${iframeKey}-${currentVideoId}`}
            src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&mute=${isAudioMuted ? 1 : 0}&rel=0&live=1&modestbranding=1`}
            title={activeChannel.name}
            className={`w-full h-full border-0 transition-opacity duration-300 ${
              playerMode === 'audio' ? 'opacity-15 blur-sm scale-110 pointer-events-none' : 'opacity-100'
            }`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

          {/* Audio Visualizer Overlay (Audio continues playing from iframe behind) */}
          {playerMode === 'audio' && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-3 text-center bg-slate-950/85 backdrop-blur-sm pointer-events-auto">
              <div className="flex items-center gap-1 mb-2">
                <span className="w-1.5 h-3 bg-red-500 animate-bounce"></span>
                <span className="w-1.5 h-5 bg-red-500 animate-bounce [animation-delay:0.1s]"></span>
                <span className="w-1.5 h-2 bg-red-500 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-4 bg-red-500 animate-bounce [animation-delay:0.3s]"></span>
              </div>
              <span className="text-[10px] text-slate-200 font-bold block truncate max-w-[220px]">
                {activeChannel.name}
              </span>
              <span className="text-[9px] text-emerald-400 font-mono mt-0.5 flex items-center gap-1">
                <Volume2 className="w-3 h-3 animate-pulse" />
                Live Audio Streaming
              </span>
            </div>
          )}
        </div>

        {/* Controls footer */}
        <div className="p-2 bg-slate-900/90 flex items-center justify-between text-[10px]">
          <span className="text-slate-400 font-mono">{activeChannel.lang}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPlayerMode(playerMode === 'audio' ? 'youtube' : 'audio')}
              className="text-amber-400 hover:text-amber-300 font-semibold"
            >
              {playerMode === 'audio' ? 'Show Video' : 'Audio Only'}
            </button>
            <a
              href={activeChannel.directLiveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 font-bold flex items-center gap-0.5"
            >
              <span>Live Edge</span>
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
                    24x7 Live
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
                className={`whitespace-nowrap flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-1.5 active:scale-95 group ${
                  isActive
                    ? 'bg-sky-600 text-white border-sky-400 shadow-md ring-1 ring-sky-400 scale-[1.02]'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="inline-block transition-transform duration-500 group-hover:rotate-12">📺</span>
                <span>{chan.name}</span>
                <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${isActive ? 'bg-sky-900 text-sky-200' : 'bg-slate-800 text-slate-400'}`}>
                  {chan.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bulletin Airing Status Badge */}
        <div className="bg-slate-950/80 px-3 py-1.5 border-b border-slate-800/60 flex items-center justify-between gap-2 text-xs flex-wrap">
          <div className="flex items-center gap-2 min-w-0 flex-wrap">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping flex-shrink-0"></span>
            <span className="text-[11px] text-slate-300 font-semibold truncate">
              <strong className="text-white">{activeChannel.name}:</strong> {activeChannel.bulletinTitle || 'Live Transmission'}
            </span>
            {isResolvingLive ? (
              <span className="flex items-center gap-1 text-[10px] text-sky-400 font-mono font-bold bg-sky-950/70 border border-sky-600/40 px-2 py-0.5 rounded-full">
                <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                <span>Syncing Edge...</span>
              </span>
            ) : isLiveSynced ? (
              <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950/70 border border-emerald-600/40 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active Live Broadcast</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] text-slate-400 font-mono bg-slate-800/60 border border-slate-700/50 px-2 py-0.5 rounded-full">
                <span>Direct Feed</span>
              </span>
            )}
          </div>

          {/* Stream Mode Selector Tabs */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => setPlayerMode('youtube')}
              className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                playerMode === 'youtube'
                  ? 'bg-red-600 text-white border-red-500 shadow-sm'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              Live Video
            </button>
            {activeChannel.webTvUrl && (
              <button
                onClick={() => setPlayerMode('webtv')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                  playerMode === 'webtv'
                    ? 'bg-sky-600 text-white border-sky-500 shadow-sm'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                Master Web TV
              </button>
            )}
            <button
              onClick={() => setPlayerMode('audio')}
              className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                playerMode === 'audio'
                  ? 'bg-amber-600 text-white border-amber-500 shadow-sm'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              🎧 Audio Radio
            </button>
          </div>
        </div>

        {/* Main Video Surface & Player with 3D Left-to-Right Spin Animation on Open & Channel Switch */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-slate-950/40">
          <div
            key={`player-surface-${iframeKey}-${currentVideoId}`}
            className="relative rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl aspect-video w-full max-h-[460px] animate-spin-flip"
          >
            {/* The Live Video & Audio Stream (ALWAYS active in the background so audio never cuts out) */}
            <iframe
              key={`main-${iframeKey}-${currentVideoId}`}
              src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&mute=${isAudioMuted ? 1 : 0}&rel=0&live=1&modestbranding=1`}
              title={activeChannel.name}
              className={`w-full h-full border-0 transition-opacity duration-300 ${
                playerMode === 'audio' ? 'opacity-20 blur-sm scale-105' : (playerMode === 'webtv' ? 'hidden' : 'opacity-100')
              }`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />

            {/* Audio-Only Emergency Radio Visualizer Overlay (Audio plays directly from the live stream behind) */}
            {playerMode === 'audio' && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center bg-slate-950/85 backdrop-blur-md">
                <div className="relative mb-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600/30 to-red-600/30 border-2 border-amber-500/60 flex items-center justify-center shadow-lg shadow-amber-950/50">
                    <Headphones className="w-8 h-8 text-amber-400 animate-pulse" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-slate-950 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-extrabold text-white mb-1 flex items-center gap-1.5">
                  <span>Audio-Only Emergency Radio Mode</span>
                </h4>
                
                <p className="text-xs text-amber-200/90 font-medium max-w-md mb-2">
                  Broadcasting live emergency audio commentary from <strong className="text-white underline">{activeChannel.fullname}</strong>.
                </p>

                <div className="flex items-center gap-1.5 h-7 mb-3 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800">
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 animate-pulse" />
                  <span className="text-[11px] text-emerald-300 font-mono font-bold mr-1">Live Voice Active</span>
                  <span className="w-1.5 h-3 bg-red-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-6 bg-red-500 rounded-full animate-bounce [animation-delay:0.1s]"></span>
                  <span className="w-1.5 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-5 bg-red-500 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                  <span className="w-1.5 h-4 bg-red-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>

                <div className="flex items-center gap-2 flex-wrap justify-center">
                  <button
                    onClick={() => setIsAudioMuted(!isAudioMuted)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
                    title="Toggle Audio Mute"
                  >
                    {isAudioMuted ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5 text-red-400" />
                        <span>Unmute Audio</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Mute Audio</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setPlayerMode('youtube')}
                    className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-all shadow-sm flex items-center gap-1"
                  >
                    <Tv className="w-3.5 h-3.5" />
                    <span>Switch to Full Video</span>
                  </button>
                </div>
              </div>
            )}

            {/* Master Web TV Launch Surface */}
            {playerMode === 'webtv' && (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-950 border border-sky-800/40">
                <Globe className="w-12 h-12 text-sky-400 mb-3 animate-pulse" />
                <h4 className="text-base sm:text-lg font-bold text-white mb-1">
                  Official Broadcaster Master Web TV
                </h4>
                <p className="text-xs text-slate-300 max-w-md mb-4">
                  Continuous 24x7 satellite transmission from <strong>{activeChannel.fullname}</strong>. Never breaks into separated bulletin archives.
                </p>
                <a
                  href={activeChannel.webTvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-sky-950/60"
                >
                  <Globe className="w-4 h-4" />
                  <span>Launch 24x7 Master Web Stream</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
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
              {/* Resync Stream button */}
              <button
                onClick={() => setIframeKey((k) => k + 1)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1"
                title="Resync Live Stream Edge"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Resync</span>
              </button>

              {/* 1-Tap Real-Time Live Edge Transmission (Never Repeats Old News) */}
              <a
                href={activeChannel.directLiveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white border border-red-400 text-xs font-bold transition-all shadow-md shadow-red-950/40 flex items-center gap-1.5"
                title="Opens YouTube's direct live redirect to the exact current second"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Watch Real-Time Live Edge</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
              </a>
            </div>
          </div>

          {/* Live Edge Explanation Note */}
          <div className="p-2.5 rounded-xl bg-sky-950/40 border border-sky-800/60 text-[11px] text-sky-200 flex items-start gap-2">
            <Zap className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Real-Time Live Guarantee:</strong> News channels create fresh live sessions for each bulletin. Tapping <strong>Watch Real-Time Live Edge</strong> opens the channel's permanent live link, which Google servers automatically synchronize to the active current broadcast with zero delay or repeat archives.
            </span>
          </div>

          {/* Safety & Emergency Broadcast Notice */}
          <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-800/60 text-[11px] text-amber-200 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Emergency Broadcast Protocol:</strong> During extreme weather, tune to your regional news channel or <strong>DD News</strong> for official Government Relief & Rescue announcements. Use <strong>Mini Player</strong> mode to keep listening while viewing radar maps.
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
