import React, { useState } from 'react';
import { MathWord, VoiceAccent } from '../types';
import { MathIllustration } from './MathIllustration';
import { speechService } from '../utils/speech';
import { Volume2, Star, CheckCircle, ArrowRight, BookOpen, Layers, Sparkles } from 'lucide-react';

interface VocabularyCardProps {
  word: MathWord;
  accent: VoiceAccent;
  isSlow: boolean;
  isFavorite: boolean;
  isLearned: boolean;
  onToggleFavorite: (id: string) => void;
  onToggleLearned: (id: string) => void;
  onSelectRelated?: (wordName: string) => void;
  onTrackListen?: (id: string) => void;
  featured?: boolean;
}

export const VocabularyCard: React.FC<VocabularyCardProps> = ({
  word,
  accent,
  isSlow,
  isFavorite,
  isLearned,
  onToggleFavorite,
  onToggleLearned,
  onSelectRelated,
  onTrackListen,
  featured = false
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSpeakingExample, setIsSpeakingExample] = useState(false);

  const handleSpeak = (text: string, isExample = false) => {
    if (isExample) {
      setIsSpeakingExample(true);
    } else {
      setIsSpeaking(true);
      if (onTrackListen) onTrackListen(word.id);
    }

    speechService.speak(text, {
      accent,
      slow: isSlow,
      onStart: () => {},
      onEnd: () => {
        setIsSpeaking(false);
        setIsSpeakingExample(false);
      },
      onError: () => {
        setIsSpeaking(false);
        setIsSpeakingExample(false);
      }
    });
  };

  return (
    <div
      id={`vocab-card-${word.id}`}
      className={`group relative bg-white rounded-3xl border-2 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 overflow-hidden flex flex-col justify-between ${
        featured
          ? 'border-amber-400 ring-4 ring-amber-100'
          : isLearned
          ? 'border-emerald-300 bg-emerald-50/10'
          : 'border-amber-200/90 hover:border-amber-400'
      }`}
    >
      {/* Top badges & actions */}
      <div className="p-5 pb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {word.grades && word.grades.length > 1
              ? `Lớp ${word.grades.join(', ')}`
              : `Lớp ${word.grade}`}
          </span>
          <span className="bg-sky-100 text-sky-800 text-xs font-bold px-2.5 py-1 rounded-full">
            {word.subtopic}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Learned toggle button */}
          <button
            id={`toggle-learned-${word.id}`}
            onClick={() => onToggleLearned(word.id)}
            className={`p-2 rounded-xl transition-colors ${
              isLearned
                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                : 'bg-slate-100 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
            }`}
            title={isLearned ? 'Đã thuộc từ này' : 'Đánh dấu đã thuộc'}
          >
            <CheckCircle className="w-5 h-5" />
          </button>

          {/* Favorite button */}
          <button
            id={`toggle-fav-${word.id}`}
            onClick={() => onToggleFavorite(word.id)}
            className={`p-2 rounded-xl transition-colors ${
              isFavorite
                ? 'bg-amber-100 text-amber-500 hover:bg-amber-200 fill-amber-500'
                : 'bg-slate-100 text-slate-400 hover:text-amber-500 hover:bg-amber-50'
            }`}
            title={isFavorite ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
          >
            <Star className={`w-5 h-5 ${isFavorite ? 'fill-amber-400 text-amber-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main content body */}
      <div className="px-5 pb-4 flex flex-col md:flex-row items-center gap-5">
        {/* Visual illustration box */}
        <div className="w-full md:w-36 h-36 bg-gradient-to-b from-amber-50 to-orange-50/50 rounded-2xl flex items-center justify-center border border-amber-100 p-2 shrink-0 group-hover:scale-105 transition-transform">
          <MathIllustration type={word.illustrationType} size="md" />
        </div>

        {/* Word, audio & phonetic */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-1.5">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight capitalize">
              {word.word}
            </h3>
            <span className="text-slate-400 font-mono text-sm tracking-wide">
              {word.ipa}
            </span>
          </div>

          <p className="text-lg font-bold text-amber-600 mb-3 capitalize">
            🇻🇳 {word.meaning}
          </p>

          {/* Big audio button (Listen) */}
          <button
            id={`speak-btn-${word.id}`}
            onClick={() => handleSpeak(word.word)}
            disabled={isSpeaking}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-sm shadow-sm transition-all transform active:scale-95 ${
              isSpeaking
                ? 'bg-orange-500 text-white animate-pulse'
                : 'bg-amber-400 hover:bg-amber-500 text-amber-950 hover:shadow-md'
            }`}
          >
            <Volume2 className={`w-5 h-5 ${isSpeaking ? 'animate-bounce' : ''}`} />
            <span>{isSpeaking ? 'Đang phát...' : 'Nghe phát âm'}</span>
            <span className="text-xs bg-amber-600/30 text-amber-900 px-1.5 py-0.5 rounded-full font-extrabold">
              {accent === 'en-US' ? 'US' : 'UK'}
            </span>
          </button>
        </div>
      </div>

      {/* Definitions & Math example */}
      <div className="px-5 py-3.5 bg-slate-50/90 border-t border-slate-100 text-xs sm:text-sm space-y-2.5">
        <div>
          <span className="font-bold text-slate-700">📖 Định nghĩa: </span>
          <span className="text-slate-600">{word.definitionEn}</span>
          <p className="text-slate-500 italic mt-0.5">{word.definitionVi}</p>
        </div>

        <div className="bg-white p-3 rounded-xl border border-amber-200/80 flex items-center justify-between gap-2 shadow-2xs">
          <div className="space-y-0.5">
            <div className="font-bold text-slate-800 text-sm">
              ✏️ Ví dụ: <span className="font-mono text-amber-700 font-extrabold">{word.example}</span>
            </div>
            <div className="text-xs text-slate-500">{word.exampleVi}</div>
          </div>
          
          <button
            id={`speak-example-${word.id}`}
            onClick={() => handleSpeak(word.example, true)}
            className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 transition-colors shrink-0"
            title="Nghe câu ví dụ mẫu"
          >
            <Volume2 className={`w-4 h-4 ${isSpeakingExample ? 'text-orange-600 animate-pulse' : ''}`} />
          </button>
        </div>

        {/* Related words */}
        {word.relatedWords && word.relatedWords.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-xs font-semibold text-slate-400">Từ liên quan:</span>
            {word.relatedWords.map((rel, idx) => (
              <button
                key={idx}
                onClick={() => onSelectRelated && onSelectRelated(rel)}
                className="text-xs bg-slate-200/80 hover:bg-amber-100 text-slate-700 hover:text-amber-800 px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer"
              >
                {rel}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
