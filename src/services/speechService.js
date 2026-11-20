// Web Speech Synthesis Engine with Sentence Chunking, Watchdog Timers & Pure Vernacular TTS

export class SpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.isPlaying = false;
    this.sentences = [];
    this.currentIndex = 0;
    this.currentLang = 'english';
    this.watchdogTimer = null;
    this.transitionTimer = null;
    this.keepAliveTimer = null;
    this.currentUtterance = null;
    this.onSentenceCallback = null;
    this.onEndCallback = null;

    // Attach to window to guarantee V8 garbage collector never collects active utterances
    if (typeof window !== 'undefined') {
      window.__activeSpeechUtterances = window.__activeSpeechUtterances || [];
    }
  }

  isSupported() {
    return !!this.synth;
  }

  // Sanitize text for regional TTS engines (strips English parentheses & translates system keywords)
  cleanTextForSpeech(text, lang) {
    if (!text) return '';
    let cleaned = text;

    // Replace English "Live Tracking (City)" with clean localized pronunciation
    if (lang === 'hindi') {
      cleaned = cleaned.replace(/Live Tracking \(([^)]+)\)/gi, '$1 लाइव ट्रैकिंग');
      cleaned = cleaned.replace(/Live Tracking/gi, 'लाइव ट्रैकिंग');
    } else if (lang === 'odia') {
      cleaned = cleaned.replace(/Live Tracking \(([^)]+)\)/gi, '$1 ଲାଇଭ୍ ଟ୍ରାକିଂ');
      cleaned = cleaned.replace(/Live Tracking/gi, 'ଲାଇଭ୍ ଟ୍ରାକିଂ');
    } else if (lang === 'bengali') {
      cleaned = cleaned.replace(/Live Tracking \(([^)]+)\)/gi, '$1 লাইভ ট্র্যাকিং');
      cleaned = cleaned.replace(/Live Tracking/gi, 'লাইভ ট্র্যাকিং');
    } else if (lang === 'gujarati') {
      cleaned = cleaned.replace(/Live Tracking \(([^)]+)\)/gi, '$1 લાઇવ ટ્રેકિંગ');
      cleaned = cleaned.replace(/Live Tracking/gi, 'લાઇવ ટ્રેકિંગ');
    } else if (lang === 'telugu') {
      cleaned = cleaned.replace(/Live Tracking \(([^)]+)\)/gi, '$1 లైవ్ ట్రాకింగ్');
      cleaned = cleaned.replace(/Live Tracking/gi, 'లైవ్ ట్రాకింగ్');
    }

    // Remove residual English parenthetical notes (e.g. "(Coat)", "(Heavy Jacket)", "(Jacket/Coat)")
    if (lang !== 'english') {
      cleaned = cleaned.replace(/\s*\([A-Za-z0-9\/\s\-]+\)/g, '');
    }

    // Clean symbols that cause TTS tokenizer halts
    cleaned = cleaned.replace(/[•\*#_~`]/g, ' ');
    cleaned = cleaned.replace(/\s+/g, ' ').trim();

    return cleaned;
  }

  // Split text into clean sentences without breaking on decimal numbers
  splitIntoSentences(text, lang) {
    if (!text) return [];
    const sanitized = this.cleanTextForSpeech(text, lang);

    // Normalize newlines to purna biram
    const normalized = sanitized.replace(/[\r\n]+/g, ' । ');
    // Split by purna biram (।), or punctuation followed by whitespace or end-of-string
    const rawParts = normalized.split(/(?:[।|]+|(?<=[^\d])[\.!\?]+(?:\s+|$))/g);
    const result = [];

    for (let part of rawParts) {
      const clean = part.replace(/[।|]+/g, '').trim();
      if (clean.length > 2) {
        result.push(clean);
      }
    }

    return result.length > 0 ? result : [sanitized];
  }

  speakFullMessage(briefing, lang = 'english', onSentenceChange, onComplete) {
    if (!this.synth) {
      console.warn('Speech synthesis not available in this browser.');
      return false;
    }

    this.stop();

    this.currentLang = lang;
    this.onSentenceCallback = onSentenceChange;
    this.onEndCallback = onComplete;
    this.isPlaying = true;

    // Check available voices
    const voices = this.synth.getVoices();
    const hasOdiaVoice = voices.some(v => v.lang.startsWith('or'));
    const hasBengaliVoice = voices.some(v => v.lang.startsWith('bn'));
    const hasGujaratiVoice = voices.some(v => v.lang.startsWith('gu'));
    const hasTeluguVoice = voices.some(v => v.lang.startsWith('te'));
    const hasTamilVoice = voices.some(v => v.lang.startsWith('ta'));
    const hasMalayalamVoice = voices.some(v => v.lang.startsWith('ml'));
    const hasKannadaVoice = voices.some(v => v.lang.startsWith('kn'));

    let textToSpeak = briefing.speech;

    // Phonetic fallback for devices lacking specific regional TTS fonts
    if (lang === 'odia' && !hasOdiaVoice && briefing.phoneticSpeech) {
      textToSpeak = briefing.phoneticSpeech;
    } else if (lang === 'bengali' && !hasBengaliVoice && briefing.phoneticSpeech) {
      textToSpeak = briefing.phoneticSpeech;
    } else if (lang === 'gujarati' && !hasGujaratiVoice && briefing.phoneticSpeech) {
      textToSpeak = briefing.phoneticSpeech;
    } else if (lang === 'telugu' && !hasTeluguVoice && briefing.phoneticSpeech) {
      textToSpeak = briefing.phoneticSpeech;
    } else if (lang === 'tamil' && !hasTamilVoice && briefing.phoneticSpeech) {
      textToSpeak = briefing.phoneticSpeech;
    } else if (lang === 'malayalam' && !hasMalayalamVoice && briefing.phoneticSpeech) {
      textToSpeak = briefing.phoneticSpeech;
    } else if (lang === 'kannada' && !hasKannadaVoice && briefing.phoneticSpeech) {
      textToSpeak = briefing.phoneticSpeech;
    }

    this.sentences = this.splitIntoSentences(textToSpeak, lang);
    this.currentIndex = 0;

    // Safe unpause monitor
    this.startSafeKeepAlive();

    this.playNextSentence();
    return true;
  }

  playNextSentence() {
    if (!this.isPlaying) return;

    this.clearWatchdog();

    if (this.currentIndex >= this.sentences.length) {
      this.stop();
      return;
    }

    const sentenceText = this.sentences[this.currentIndex];
    if (this.onSentenceCallback) {
      this.onSentenceCallback(this.currentIndex, this.sentences.length);
    }

    // Ensure synth is unpaused
    if (this.synth.paused) {
      this.synth.resume();
    }

    const utterance = new SpeechSynthesisUtterance(sentenceText);
    this.currentUtterance = utterance;

    // Retain global reference to completely prevent V8 garbage collection
    if (typeof window !== 'undefined' && window.__activeSpeechUtterances) {
      window.__activeSpeechUtterances.push(utterance);
    }

    // Map language tag
    let langCode = 'en-IN';
    if (this.currentLang === 'odia') langCode = 'or-IN';
    else if (this.currentLang === 'bengali') langCode = 'bn-IN';
    else if (this.currentLang === 'hindi') langCode = 'hi-IN';
    else if (this.currentLang === 'gujarati') langCode = 'gu-IN';
    else if (this.currentLang === 'telugu') langCode = 'te-IN';
    else if (this.currentLang === 'tamil') langCode = 'ta-IN';
    else if (this.currentLang === 'malayalam') langCode = 'ml-IN';
    else if (this.currentLang === 'kannada') langCode = 'kn-IN';
    else langCode = 'en-IN';

    utterance.lang = langCode;
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Select best available Indian voice
    const voices = this.synth.getVoices();
    let bestVoice = voices.find(v => v.lang === langCode);
    if (!bestVoice) {
      bestVoice = voices.find(v => v.lang.startsWith(langCode.substring(0, 2)));
    }
    if (!bestVoice) {
      bestVoice = voices.find(v => v.lang.includes('IN') || v.name.includes('India'));
    }
    if (bestVoice) {
      utterance.voice = bestVoice;
    }

    let isHandled = false;

    const advance = () => {
      if (isHandled) return;
      isHandled = true;
      this.clearWatchdog();

      // Clean up global reference
      if (typeof window !== 'undefined' && window.__activeSpeechUtterances) {
        window.__activeSpeechUtterances = window.__activeSpeechUtterances.filter(u => u !== utterance);
      }
      this.currentUtterance = null;

      if (!this.isPlaying) return;

      this.currentIndex++;
      if (this.currentIndex >= this.sentences.length) {
        this.stop();
        return;
      }

      // Small natural pause between sentences (60ms)
      this.transitionTimer = setTimeout(() => {
        if (this.isPlaying) {
          if (this.synth.paused) {
            this.synth.resume();
          }
          this.playNextSentence();
        }
      }, 60);
    };

    utterance.onend = () => {
      advance();
    };

    utterance.onerror = (err) => {
      console.warn('[SpeechService] Utterance error/event:', err);
      advance();
    };

    // Watchdog Timer: Guarantees progression if Android Chrome fails to fire onend
    const durationMs = Math.max(3500, Math.ceil((sentenceText.length / 6) * 1000) + 3000);
    this.watchdogTimer = setTimeout(() => {
      if (this.isPlaying && !isHandled) {
        console.warn(`[SpeechService] Watchdog advancing sentence ${this.currentIndex + 1}/${this.sentences.length}`);
        advance();
      }
    }, durationMs);

    try {
      this.synth.speak(utterance);
      if (this.synth.paused) {
        this.synth.resume();
      }
    } catch (e) {
      console.error('[SpeechService] speak invocation failed:', e);
      advance();
    }
  }

  startSafeKeepAlive() {
    this.stopSafeKeepAlive();
    // Non-destructive keep-alive: ONLY calls resume() if paused. Never calls pause()!
    this.keepAliveTimer = setInterval(() => {
      if (this.synth && this.isPlaying) {
        if (this.synth.paused) {
          this.synth.resume();
        }
      }
    }, 3000);
  }

  stopSafeKeepAlive() {
    if (this.keepAliveTimer) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }
  }

  clearWatchdog() {
    if (this.watchdogTimer) {
      clearTimeout(this.watchdogTimer);
      this.watchdogTimer = null;
    }
    if (this.transitionTimer) {
      clearTimeout(this.transitionTimer);
      this.transitionTimer = null;
    }
  }

  stop() {
    this.stopSafeKeepAlive();
    this.clearWatchdog();
    this.isPlaying = false;
    this.currentIndex = 0;
    this.sentences = [];
    this.currentUtterance = null;

    if (typeof window !== 'undefined') {
      window.__activeSpeechUtterances = [];
    }

    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {
        // ignore
      }
    }

    if (this.onEndCallback) {
      const cb = this.onEndCallback;
      this.onEndCallback = null;
      cb();
    }
  }
}

export const speechService = new SpeechService();
