import React, { useState } from 'react';
import { Crown, Sparkles, X, CheckCircle2, Shield, BellRing, Waves, FileText, ArrowRight, Compass } from 'lucide-react';

export default function ProComingSoonModal({ isOpen, onClose }) {
  const [contact, setContact] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [role, setRole] = useState('farmer_agronomist');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contact.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-amber-500/40 rounded-3xl p-5 sm:p-7 shadow-2xl shadow-amber-950/50 overflow-hidden text-slate-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-56 h-56 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
            <Crown className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-black tracking-widest text-amber-400 bg-amber-950/80 border border-amber-600/40 px-2 py-0.5 rounded-full">
                Coming Soon
              </span>
              <span className="text-xs text-slate-400 font-medium">Enterprise & Commercial Pilot</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight mt-0.5">
              ToofanSathi Pro
            </h2>
          </div>
        </div>

        {/* Core Message */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
          The high-precision commercial edition is currently in closed field trials with ICAR research stations, commercial marine trawlers, and coastal aquaculture federations.
        </p>

        {/* Pro Capability Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-2.5 flex items-start gap-2.5">
            <Compass className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-white block">1-Hour Forecast Models</span>
              <span className="text-[10px] text-slate-400 block">ECMWF & GFS multi-ensemble 48h harvest windows</span>
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-2.5 flex items-start gap-2.5">
            <Waves className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-white block">Aquaculture Defense</span>
              <span className="text-[10px] text-slate-400 block">Shrimp pond salinity drop & tidal surge alarms</span>
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-2.5 flex items-start gap-2.5">
            <FileText className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-white block">PMFBY Claim Dossiers</span>
              <span className="text-[10px] text-slate-400 block">Instant geo-tagged crop loss audit certificates</span>
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-2.5 flex items-start gap-2.5">
            <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-white block">Verified KYC Security</span>
              <span className="text-[10px] text-slate-400 block">Multi-tier role access & 15-day extended horizon</span>
            </div>
          </div>
        </div>

        {/* Priority Early Access Form */}
        <div className="bg-slate-950 border border-slate-800/90 rounded-2xl p-4">
          {submitted ? (
            <div className="text-center py-3 space-y-2">
              <div className="inline-flex p-2 bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/40">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">You're on the Priority Access List!</h4>
              <p className="text-xs text-slate-300">
                We will notify you via <strong className="text-amber-300">{contact}</strong> as soon as public enterprise onboarding opens.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex items-center gap-2">
                <BellRing className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-slate-200">
                  Join Priority Access List (Free Commercial Beta)
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Enter Mobile / WhatsApp or Email"
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs rounded-xl shadow-md active:scale-95 transition-all whitespace-nowrap"
                >
                  Notify Me
                </button>
              </div>

              <p className="text-[10px] text-slate-400">
                🔒 Strictly no spam. Only official launch notifications and early testing invites.
              </p>
            </form>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span>Current Public Site: <strong>Normal Edition (Free Forever)</strong></span>
          <button
            onClick={onClose}
            className="text-amber-400 hover:underline font-semibold"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
