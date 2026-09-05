import { VoiceAccent } from '../types';

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private isLoaded = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
    if (this.voices.length > 0) {
      this.isLoaded = true;
    }
  }

  public getAvailableVoices(accent: VoiceAccent): SpeechSynthesisVoice[] {
    if (!this.voices.length && this.synth) {
      this.voices = this.synth.getVoices();
    }
    const targetLang = accent === 'en-GB' ? 'en-GB' : 'en-US';
    return this.voices.filter(v => v.lang.replace('_', '-').startsWith(targetLang) || v.lang.startsWith('en'));
  }

  public speak(
    text: string,
    options: {
      accent?: VoiceAccent;
      slow?: boolean;
      onStart?: () => void;
      onEnd?: () => void;
      onError?: () => void;
    } = {}
  ): void {
    if (!this.synth) {
      console.warn('Speech synthesis not supported in this browser.');
      options.onEnd?.();
      return;
    }

    // Cancel any ongoing speech
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const accent = options.accent || 'en-US';
    const isSlow = options.slow || false;

    utterance.lang = accent === 'en-GB' ? 'en-GB' : 'en-US';
    // Kids benefit from a clear, slightly measured pace
    utterance.rate = isSlow ? 0.6 : 0.9;
    utterance.pitch = 1.05; // Friendly, clear kid-friendly pitch

    const matchedVoices = this.getAvailableVoices(accent);
    if (matchedVoices.length > 0) {
      // Prefer Google or natural voices if present
      const preferredVoice = matchedVoices.find(
        v => (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Daniel')) &&
             (accent === 'en-GB' ? v.lang.includes('GB') : v.lang.includes('US'))
      ) || matchedVoices[0];
      
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      options.onStart?.();
    };

    utterance.onend = () => {
      options.onEnd?.();
    };

    utterance.onerror = (e) => {
      console.error('Speech error:', e);
      options.onError?.();
      options.onEnd?.();
    };

    this.synth.speak(utterance);
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

export const speechService = new SpeechService();
