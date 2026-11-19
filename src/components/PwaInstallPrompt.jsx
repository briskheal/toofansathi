import React, { useState, useEffect } from 'react';
import { Download, Smartphone, X } from 'lucide-react';

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Also check if already installed in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowPrompt(false);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert("To install on Android/Chrome: Tap the 3 dots in your browser menu and select 'Add to Home screen' or 'Install App'.");
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  if (!showPrompt) {
    return (
      <div className="flex items-center justify-between p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-sky-400" />
          <span className="text-slate-300">Save for Offline Field Use</span>
        </div>
        <button
          onClick={handleInstallClick}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-bold text-[11px]"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Install App</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-sky-950/80 via-slate-900 to-sky-950/80 border border-sky-800/80 rounded-xl p-3 shadow-lg flex items-center justify-between gap-2">
      <div className="flex items-center gap-2.5">
        <div className="p-2 bg-sky-500/20 text-sky-400 rounded-lg">
          <Smartphone className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs font-bold text-white block">Install ToofanSathi App</span>
          <span className="text-[11px] text-slate-300 block">Works offline with zero signal in the field</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={handleInstallClick}
          className="px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black rounded-lg text-xs flex items-center gap-1 shadow-sm"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Install</span>
        </button>
        <button
          onClick={() => setShowPrompt(false)}
          className="p-1 text-slate-400 hover:text-white rounded"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
