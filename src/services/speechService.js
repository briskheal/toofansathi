// Web Speech Synthesis Engine with Sentence Chunking & Chrome Keep-Alive

export class SpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.isPlaying = false;
    this.sentences = [];
    this.currentIndex = 0;
    this.currentLang = 'english';
    this.keepAliveTimer = null;
    this.onSentenceCallback = null;
    this.onEndCallback = null;
  }

  isSupported() {
    return !!this.synth;
  }

  // Split text into clean, manageable sentences
  splitIntoSentences(text) {
    if (!text) return [];
    // Split by Odia/Bengali/Hindi purna biram (।), periods, question marks, or exclamation marks
    const raw = text.split(/([।\.!\?]+)/g);
    const result = [];
    for (let i = 0; i < raw.length; i += 2) {
      const sentence = (raw[i] || '').trim();
      const punct = (raw[i + 1] || '').trim();
      const combined = `${sentence} ${punct}`.trim();
      if (combined.length > 2) {
        result.push(combined);
      }
    }
    return result.length > 0 ? result : [text];
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

    // Check if browser has native Odia or Bengali voices
    const voices = this.synth.getVoices();
    const hasOdiaVoice = voices.some(v => v.lang.startsWith('or'));
    const hasBengaliVoice = voices.some(v => v.lang.startsWith('bn'));

    let textToSpeak = briefing.speech;

    // If device has no native Odia voice (standard on 90% of Windows/Android),
    // use phonetic transliteration so Indian English/Hindi TTS voice pronounces it clearly without stopping!
    if (lang === 'odia' && !hasOdiaVoice && briefing.phoneticSpeech) {
      textToSpeak = briefing.phoneticSpeech;
    } else if (lang === 'bengali' && !hasBengaliVoice && briefing.phoneticSpeech) {
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

    if (this.currentIndex >= this.sentences.length) {
      this.stop();
      if (this.onEndCallback) this.onEndCallback();
      return;
    }

    const sentenceText = this.sentences[this.currentIndex];
    if (this.onSentenceCallback) {
      this.onSentenceCallback(this.currentIndex, this.sentences.length);
    }

    const utterance = new SpeechSynthesisUtterance(sentenceText);

    // Map language tag
    let langCode = 'en-IN';
    if (this.currentLang === 'odia') langCode = 'or-IN';
    else if (this.currentLang === 'bengali') langCode = 'bn-IN';
    else if (this.currentLang === 'hindi') langCode = 'hi-IN';

    utterance.lang = langCode;
    utterance.rate = 0.92; // Clear speed for field workers
    utterance.pitch = 1.0;

    // Select best available Indian voice
    const voices = this.synth.getVoices();
    let bestVoice = voices.find(v => v.lang === langCode);
    if (!bestVoice) {
      bestVoice = voices.find(v => v.lang.startsWith(langCode.substring(0, 2)));
    }
    if (!bestVoice) {
      // Fallback to Indian English or Hindi voice
      bestVoice = voices.find(v => v.lang.includes('IN') || v.name.includes('India'));
    }
    if (bestVoice) {
      utterance.voice = bestVoice;
    }

    utterance.onend = () => {
      this.currentIndex++;
      // Small natural pause between sentences
      setTimeout(() => {
        this.playNextSentence();
      }, 150);
    };

    utterance.onerror = (err) => {
      console.warn('Utterance error or interrupt:', err);
      this.currentIndex++;
      this.playNextSentence();
    };

    this.synth.speak(utterance);
  }

  startKeepAlive() {
    this.stopKeepAlive();
    // Chrome stops long speeches after ~12s. Calling pause & resume resets the timer.
    this.keepAliveTimer = setInterval(() => {
      if (this.synth && this.isPlaying) {
        this.synth.pause();
        this.synth.resume();
      }
    }, 8000);
  }

  stopKeepAlive() {
    if (this.keepAliveTimer) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }
  }

  stop() {
    this.stopKeepAlive();
    this.isPlaying = false;
    this.currentIndex = 0;
    this.sentences = [];
    if (this.synth) {
      this.synth.cancel();
    }
    if (this.onEndCallback) {
      this.onEndCallback();
    }
  }
}

export const speechService = new SpeechService();
