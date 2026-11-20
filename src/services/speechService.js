// Web Speech Synthesis Engine with Sentence Chunking, Watchdog Timers & Anti-Stall Guard

export class SpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.isPlaying = false;
    this.sentences = [];
    this.currentIndex = 0;
    this.currentLang = 'english';
    this.keepAliveTimer = null;
    this.watchdogTimer = null;
    this.transitionTimer = null;
    this.currentUtterance = null;
    this.onSentenceCallback = null;
    this.onEndCallback = null;
  }

  isSupported() {
    return !!this.synth;
  }

  // Split text into clean, manageable sentences without breaking on decimal numbers (e.g. 18.10 or 1.5)
  splitIntoSentences(text) {
    if (!text) return [];
    // Normalize newlines to purna biram
    const normalized = text.replace(/[\r\n]+/g, ' । ');
    // Split by purna biram (।), or punctuation followed by whitespace or end-of-string
    const rawParts = normalized.split(/(?:[।|]+|(?<=[^\d])[\.!\?]+(?:\s+|$))/g);
    const result = [];

    for (let part of rawParts) {
      const clean = part.replace(/[।|]+/g, '').trim();
      // Only keep sentences with meaningful characters
      if (clean.length > 2) {
        result.push(clean);
      }
    }

    return result.length > 0 ? result : [text.trim()];
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

    // Check if browser has native regional voices
    const voices = this.synth.getVoices();
    const hasOdiaVoice = voices.some(v => v.lang.startsWith('or'));
    const hasBengaliVoice = voices.some(v => v.lang.startsWith('bn'));
    const hasGujaratiVoice = voices.some(v => v.lang.startsWith('gu'));
    const hasTeluguVoice = voices.some(v => v.lang.startsWith('te'));
    const hasTamilVoice = voices.some(v => v.lang.startsWith('ta'));
    const hasMalayalamVoice = voices.some(v => v.lang.startsWith('ml'));
    const hasKannadaVoice = voices.some(v => v.lang.startsWith('kn'));

    let textToSpeak = briefing.speech;

    // Fallback to phonetic speech for devices lacking regional Indian TTS synthesis
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

    this.sentences = this.splitIntoSentences(textToSpeak);
    this.currentIndex = 0;

    // Start keep-alive loop to prevent Chrome's 15-second silent pause bug
    this.startKeepAlive();

    this.playNextSentence();
    return true;
  }

  playNextSentence() {
    if (!this.isPlaying) return;

    // Clear previous sentence watchdog
    this.clearWatchdog();

    if (this.currentIndex >= this.sentences.length) {
      this.stop();
      return;
    }

    const sentenceText = this.sentences[this.currentIndex];
    if (this.onSentenceCallback) {
      this.onSentenceCallback(this.currentIndex, this.sentences.length);
    }

    // Ensure synth is unpaused before starting next utterance
    if (this.synth.paused) {
      this.synth.resume();
    }

    const utterance = new SpeechSynthesisUtterance(sentenceText);
    // CRITICAL: Retain reference on this instance to prevent V8 garbage collection mid-speech
    this.currentUtterance = utterance;

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
    utterance.rate = 0.95; // Clear speed for field workers
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

    const handleNext = () => {
      if (isHandled) return;
      isHandled = true;
      this.clearWatchdog();
      this.currentUtterance = null;

      if (!this.isPlaying) return;

      this.currentIndex++;
      if (this.currentIndex >= this.sentences.length) {
        this.stop();
        return;
      }

      // Small natural pause between sentences, ensuring clean unpaused transition
      this.transitionTimer = setTimeout(() => {
        if (this.isPlaying) {
          if (this.synth.paused) {
            this.synth.resume();
          }
          this.playNextSentence();
        }
      }, 100);
    };

    utterance.onend = () => {
      handleNext();
    };

    utterance.onerror = (err) => {
      console.warn('Utterance error or interrupt:', err);
      // If user stopped playback intentionally, do not advance
      if (!this.isPlaying || err?.error === 'canceled' || err?.error === 'interrupted') {
        if (!this.isPlaying) return;
      }
      handleNext();
    };

    // Watchdog Timer: If browser fails to fire onend (common Chrome/Android bug), auto-advance
    // Compute expected duration: ~8 chars per sec at rate 0.95 + 4 sec safety buffer
    const expectedDurationMs = Math.max(4500, Math.ceil((sentenceText.length / 7) * 1000) + 4000);
    this.watchdogTimer = setTimeout(() => {
      if (this.isPlaying && !isHandled) {
        console.warn(`[SpeechService] Watchdog triggered for sentence ${this.currentIndex + 1}/${this.sentences.length}. Advancing.`);
        handleNext();
      }
    }, expectedDurationMs);

    // Speak the utterance
    try {
      this.synth.speak(utterance);
      // Android Chrome bugfix: immediately trigger resume if stuck in pending
      if (this.synth.paused) {
        this.synth.resume();
      }
    } catch (e) {
      console.error('[SpeechService] speak failed:', e);
      handleNext();
    }
  }

  startKeepAlive() {
    this.stopKeepAlive();
    // Chrome bug: long speech sessions freeze after ~12s.
    // SAFE keep-alive: only nudge pause/resume if synthesis is ACTIVELY speaking, never between lines!
    this.keepAliveTimer = setInterval(() => {
      if (this.synth && this.isPlaying) {
        if (this.synth.paused) {
          this.synth.resume();
        } else if (this.synth.speaking && this.currentUtterance) {
          this.synth.pause();
          this.synth.resume();
        }
      }
    }, 9000);
  }

  stopKeepAlive() {
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
    this.stopKeepAlive();
    this.clearWatchdog();
    this.isPlaying = false;
    this.currentIndex = 0;
    this.sentences = [];
    this.currentUtterance = null;

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
