import React, { useState, useEffect } from 'react';
import { Volume2, Square, Sparkles, Share2, Copy, Check, ShieldAlert, CheckCircle } from 'lucide-react';
import { speechService } from '../services/speechService';

export default function VoiceBriefingCard({ briefing, selectedLang }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [copied, setCopied] = useState(false);

  // Stop speech if language changes
  useEffect(() => {
    speechService.stop();
    setIsPlaying(false);
    setProgress({ current: 0, total: 0 });
  }, [selectedLang]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      speechService.stop();
      setIsPlaying(false);
      setProgress({ current: 0, total: 0 });
    } else {
      const started = speechService.speakFullMessage(
        briefing,
        selectedLang,
        (current, total) => {
          setProgress({ current: current + 1, total });
        },
        () => {
          setIsPlaying(false);
          setProgress({ current: 0, total: 0 });
        }
      );
      if (started) {
        setIsPlaying(true);
      }
    }
  };

  const handleCopy = () => {
    const textToCopy = `${briefing.headline}\n\n${briefing.speech}\n\nEmergency Steps:\n${(briefing.actionSteps || []).map(s => '• ' + s).join('\n')}\n\n- via ToofanSathi.in`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `🚨 *${briefing.headline}*\n\n${briefing.speech}\n\n*Action Steps:*\n${(briefing.actionSteps || []).map(s => '• ' + s).join('\n')}\n\n_Track Live Alert on ToofanSathi.in_`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const langLabel = {
    english: 'Listen Full Voice Briefing',
    hindi: 'पूरी चेतावनी सुनें (Play Hindi Audio)',
    odia: 'ସମ୍ପୂର୍ଣ୍ଣ ସୂଚନା ଶୁଣନ୍ତୁ (Play Odia Audio)',
    bengali: 'সম্পূর্ণ বার্তা শুনুন (Play Bengali Audio)',
    gujarati: 'સંપૂર્ણ ચેતવણી સાંભળો (Play Gujarati Audio)',
    telugu: 'పూర్తి వాయిస్ హెచ్చరిక వినండి (Play Telugu Audio)',
    tamil: 'முழு எச்சரிக்கையை கேட்க (Play Tamil Audio)',
    malayalam: 'പൂർണ്ണ മുന്നറിയിപ്പ് കേൾക്കുക (Play Malayalam Audio)',
    kannada: 'ಸಂಪೂರ್ಣ ಧ್ವನಿ ಎಚ್ಚರಿಕೆ ಕೇಳಿ (Play Kannada Audio)'
  }[selectedLang] || 'Listen Audio Alert';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
      {/* Top Banner Header */}
      <div className="p-3.5 sm:p-4 bg-slate-900/90 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-400/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
              <span>Complete Vernacular Field Briefing</span>
              {isPlaying && (
                <span className="text-[10px] font-mono text-amber-400 bg-amber-950 px-2 py-0.5 rounded-full border border-amber-800 animate-pulse">
                  Playing ({progress.current}/{progress.total})
                </span>
              )}
            </h2>
            <p className="text-[11px] text-slate-400">Audio playback designed for outdoor personnel</p>
          </div>
        </div>

        {/* Audio Action Button */}
        <button
          onClick={handleTogglePlay}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md flex-shrink-0 ${
            isPlaying
              ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 ring-2 ring-amber-400/50'
              : 'bg-sky-500 hover:bg-sky-400 text-slate-950 font-black'
          }`}
        >
          {isPlaying ? (
            <>
              <Square className="w-4 h-4 fill-current animate-pulse" />
              <span>Stop Voice</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4" />
              <span>{langLabel}</span>
            </>
          )}
        </button>
      </div>

      {/* Complete Message Transcript Box (NO TRUNCATION) */}
      <div className="p-4 sm:p-5 space-y-3 bg-slate-950/40">
        <div className="border-l-2 border-sky-500 pl-3">
          <h3 className="text-sm font-bold text-sky-300 mb-1">
            {briefing.headline}
          </h3>
          {/* Full complete message text */}
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal whitespace-pre-line">
            {briefing.speech}
          </p>
        </div>

        {/* Action Steps Checklist */}
        {briefing.actionSteps && briefing.actionSteps.length > 0 && (
          <div className="pt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Immediate Safety Steps:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {briefing.actionSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 text-xs text-slate-200"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span className="font-medium">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Share & Copy Utilities */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
        <span className="text-[11px] text-slate-400 hidden sm:inline">
          Share this complete text warning with field teams:
        </span>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={handleCopy}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Full Message'}</span>
          </button>

          <button
            onClick={handleWhatsAppShare}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Forward WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
