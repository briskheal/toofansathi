import React, { useState, useEffect } from 'react';
import { Download, Smartphone, CheckCircle, Share2, HelpCircle, X, Sparkles } from 'lucide-react';

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    // Check if already running as installed standalone PWA
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setIsInstalled(true);
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    const promptHandler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const installedHandler = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowGuideModal(false);
    };

    window.addEventListener('beforeinstallprompt', promptHandler);
    window.addEventListener('appinstalled', installedHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', promptHandler);
      window.removeEventListener('appinstalled', installedHandler);
    };
  }, []);

  const handleDownloadApp = async () => {
    // If Android Chrome has the native prompt ready, trigger 1-tap installation directly
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          setIsInstalled(true);
        }
        setDeferredPrompt(null);
      } catch (err) {
        console.warn('Install error:', err);
        setShowGuideModal(true);
      }
    } else {
      // If prompt not triggered by browser (e.g. iOS Safari or desktop), show simple 1-step guide
      setShowGuideModal(true);
    }
  };

  if (isInstalled) {
    return (
      <div className="flex items-center justify-between p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-xs text-emerald-300">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span className="font-semibold">ToofanSathi App Installed & Offline Ready</span>
        </div>
        <span className="text-[10px] bg-emerald-900/60 text-emerald-200 px-2 py-0.5 rounded font-mono font-bold">
          Native PWA
        </span>
      </div>
    );
  }

  return (
    <>
      {/* Primary Simplified Download / Install Banner */}
      <div className="bg-gradient-to-r from-sky-950/90 via-slate-900 to-indigo-950/90 border border-sky-600/60 rounded-xl p-3.5 shadow-md flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black text-white">Download ToofanSathi App</span>
              <span className="text-[10px] bg-sky-500/20 text-sky-300 border border-sky-400/30 px-1.5 py-0.2 rounded font-bold">
                1-Click Mobile
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Install directly to your mobile phone home screen. Works 100% offline in remote field areas.
            </p>
          </div>
        </div>

        <button
          onClick={handleDownloadApp}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 active:scale-95 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-sky-500/20 transition-all flex-shrink-0"
        >
          <Download className="w-4 h-4 text-slate-950" />
          <span>Download & Install App</span>
        </button>
      </div>

      {/* Simplified Mobile Installation Guide Modal (For iOS or browsers without direct prompt) */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-5 shadow-2xl relative">
            <button
              onClick={() => setShowGuideModal(false)}
              className="absolute top-3.5 right-3.5 p-1 text-slate-400 hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-3.5">
              <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Install on Your Mobile</h3>
                <p className="text-[11px] text-slate-400">Takes only 5 seconds</p>
              </div>
            </div>

            {isIos ? (
              <div className="space-y-3 text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-[11px] flex-shrink-0">1</span>
                  <span>Tap the <strong>Share</strong> button <Share2 className="w-3.5 h-3.5 inline text-sky-400 mx-1" /> at the bottom of Safari.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-[11px] flex-shrink-0">2</span>
                  <span>Scroll down and tap <strong>"Add to Home Screen"</strong> (+).</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-[11px] flex-shrink-0">3</span>
                  <span>Tap <strong>Add</strong> in the top right corner. Done!</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-[11px] flex-shrink-0">1</span>
                  <span>Tap the <strong>three dots menu (⋮)</strong> at top right of Chrome.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-[11px] flex-shrink-0">2</span>
                  <span>Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-[11px] flex-shrink-0">3</span>
                  <span>Confirm by tapping <strong>Install</strong>. ToofanSathi will appear on your phone home screen!</span>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowGuideModal(false)}
              className="mt-4 w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
