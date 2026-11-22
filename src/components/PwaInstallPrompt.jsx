import React, { useState, useEffect } from 'react';
import {
  Download,
  Smartphone,
  CheckCircle,
  Share2,
  HelpCircle,
  X,
  Sparkles,
  WifiOff,
  Radio,
  Volume2,
  PhoneCall,
  ShieldCheck,
  Info,
  ChevronRight,
  Satellite
} from 'lucide-react';

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showOfflineModal, setShowOfflineModal] = useState(false);
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
      <>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-xs text-emerald-300 gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="font-semibold">ToofanSathi App Installed & Offline Ready</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowOfflineModal(true)}
              className="text-[11px] text-sky-400 hover:text-sky-300 underline font-medium cursor-pointer"
            >
              Why 100% Offline?
            </button>
            <span className="text-[10px] bg-emerald-900/60 text-emerald-200 px-2 py-0.5 rounded font-mono font-bold">
              Native App
            </span>
          </div>
        </div>

        {/* Layman-friendly 100% Offline Advantages Modal */}
        {showOfflineModal && renderOfflineModal()}
      </>
    );
  }

  function renderOfflineModal() {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Why 100% Offline Matters"
        className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      >
        <div className="bg-slate-900 border border-sky-500/40 rounded-2xl max-w-lg w-full p-4 sm:p-5 shadow-2xl relative my-auto">
          {/* Close button */}
          <button
            onClick={() => setShowOfflineModal(false)}
            className="absolute top-3.5 right-3.5 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 flex-shrink-0">
              <WifiOff className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">Why 100% Offline?</h3>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full font-bold">
                  Life Saver
                </span>
              </div>
              <p className="text-xs text-slate-300">
                How ToofanSathi keeps protecting you when mobile towers collapse
              </p>
            </div>
          </div>

          {/* Real-World Disaster Reality Context */}
          <div className="my-3.5 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
            <span className="text-base">⚠️</span>
            <span>
              During severe cyclones, mobile internet towers lose electricity or break within hours. Most weather apps show a blank screen or <strong>"No Connection"</strong> error. <strong>ToofanSathi works differently.</strong>
            </span>
          </div>

          {/* 5 Simple Layman Advantages */}
          <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
            {/* Advantage 1 */}
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-950 text-sky-400 border border-sky-800 flex items-center justify-center font-bold text-sm flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Zero Mobile Data or Internet Needed</span>
                </h4>
                <p className="text-[11px] text-slate-300 mt-0.5 leading-normal">
                  Once installed, you can open this app anytime—even with mobile data turned off, zero SIM balance, or in total network blackouts.
                </p>
              </div>
            </div>

            {/* Advantage 2 */}
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-950 text-sky-400 border border-sky-800 flex items-center justify-center font-bold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Direct Satellite Storm Distance</span>
                </h4>
                <p className="text-[11px] text-slate-300 mt-0.5 leading-normal">
                  Your phone connects directly to space satellites (GPS) with zero data. The app tells you in simple kilometers how far the cyclone center is from your exact village.
                </p>
              </div>
            </div>

            {/* Advantage 3 */}
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center font-bold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Speaks Aloud in Your Local Mother Tongue</span>
                </h4>
                <p className="text-[11px] text-slate-300 mt-0.5 leading-normal">
                  Press one button to hear clear voice warnings spoken aloud in <strong>Odia, Hindi, Bengali, Telugu, and Gujarati</strong> right from your phone speaker. No need to read complicated maps.
                </p>
              </div>
            </div>

            {/* Advantage 4 */}
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-950 text-red-400 border border-red-800 flex items-center justify-center font-bold text-sm flex-shrink-0">
                4
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  <span>1-Tap Direct Emergency Calling</span>
                </h4>
                <p className="text-[11px] text-slate-300 mt-0.5 leading-normal">
                  Direct phone numbers for your District Collector Control Room (DEOC), Police (112), and Disaster Relief Teams are permanently saved. One tap connects regular phone calls.
                </p>
              </div>
            </div>

            {/* Advantage 5 */}
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-950 text-amber-400 border border-amber-800 flex items-center justify-center font-bold text-sm flex-shrink-0">
                5
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Life & Crop Protection Checklists</span>
                </h4>
                <p className="text-[11px] text-slate-300 mt-0.5 leading-normal">
                  Practical guidelines on securing thatched roofs, harvesting standing crops, untying livestock, and finding the nearest cyclone shelter remain inside your phone.
                </p>
              </div>
            </div>
          </div>

          {/* Simple Comparison Footer */}
          <div className="mt-3.5 pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <span className="text-[11px] text-slate-400">
              💡 Always install before storms hit your coast.
            </span>
            <button
              onClick={() => {
                setShowOfflineModal(false);
                if (!isInstalled) {
                  handleDownloadApp();
                }
              }}
              className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer"
            >
              {isInstalled ? 'Understood (Close)' : 'Install ToofanSathi Now'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Primary Simplified Download / Install Banner with 100% Offline Link & Layman Highlights */}
      <div className="bg-gradient-to-r from-sky-950/90 via-slate-900 to-indigo-950/90 border border-sky-600/60 rounded-xl p-3.5 sm:p-4 shadow-md flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-sm flex-shrink-0 mt-0.5 sm:mt-0">
              <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-sm sm:text-base font-black text-white">Download ToofanSathi App</span>
                <span className="text-[10px] bg-sky-500/20 text-sky-300 border border-sky-400/30 px-1.5 py-0.2 rounded font-bold">
                  1-Click Mobile
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                Install directly to your mobile phone home screen. Works{' '}
                <button
                  type="button"
                  onClick={() => setShowOfflineModal(true)}
                  className="inline-flex items-center gap-0.5 font-bold text-sky-400 hover:text-sky-300 underline underline-offset-2 decoration-sky-400 hover:decoration-sky-300 cursor-pointer transition-colors"
                  title="Click to see what you can do in 100% offline mode"
                >
                  <span>100% offline</span>
                  <Info className="w-3 h-3 inline text-sky-400 flex-shrink-0" />
                </button>{' '}
                in remote field areas without any internet or tower signal.
              </p>
            </div>
          </div>

          <button
            onClick={handleDownloadApp}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 active:scale-95 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-sky-500/20 transition-all flex-shrink-0 cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-950" />
            <span>Download & Install App</span>
          </button>
        </div>

        {/* Layman Offline Advantage Badges */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-1.5 text-[11px]">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap text-slate-300">
            <span className="font-semibold text-slate-400">Offline Powers:</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/80 text-sky-300 flex items-center gap-1">
              📱 No Data Needed
            </span>
            <span className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/80 text-emerald-300 flex items-center gap-1">
              🗣️ Spoken Voice Alerts
            </span>
            <span className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/80 text-amber-300 flex items-center gap-1">
              🛰️ Satellite Storm Distance
            </span>
            <span className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/80 text-rose-300 flex items-center gap-1">
              📞 1-Tap Helplines
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowOfflineModal(true)}
            className="text-[11px] text-sky-400 hover:text-sky-300 font-bold flex items-center gap-0.5 cursor-pointer ml-auto"
          >
            <span>Learn More</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Layman-friendly 100% Offline Advantages Modal */}
      {showOfflineModal && renderOfflineModal()}

      {/* Simplified Mobile Installation Guide Modal (For iOS or browsers without direct prompt) */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-5 shadow-2xl relative">
            <button
              onClick={() => setShowGuideModal(false)}
              className="absolute top-3.5 right-3.5 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
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
