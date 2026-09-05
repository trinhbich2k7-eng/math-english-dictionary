import React, { useState } from 'react';
import { MathWord, VoiceAccent, TopicId } from '../types';
import { TOPICS, MATH_WORDS } from '../data/mathWords';
import { MathIllustration } from './MathIllustration';
import { speechService } from '../utils/speech';
import { 
  Volume2, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  CheckCircle, 
  Shuffle,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface LearnFlashcardsProps {
  accent: VoiceAccent;
  isSlow: boolean;
  favorites: string[];
  learnedWords: string[];
  onToggleFavorite: (id: string) => void;
  onToggleLearned: (id: string) => void;
  onTrackListen: (id: string) => void;
}

export const LearnFlashcards: React.FC<LearnFlashcardsProps> = ({
  accent,
  isSlow,
  favorites,
  learnedWords,
  onToggleFavorite,
  onToggleLearned,
  onTrackListen
}) => {
  const [selectedTopic, setSelectedTopic] = useState<TopicId | 'all'>('all');
  const [selectedGrade, setSelectedGrade] = useState<1 | 2 | 'all'>('all');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Filter word deck
  const deck = MATH_WORDS.filter(w => {
    if (onlyFavorites && !favorites.includes(w.id)) return false;
    if (selectedTopic !== 'all' && w.topic !== selectedTopic) return false;
    if (
      selectedGrade !== 'all' &&
      w.grade !== selectedGrade &&
      !w.grades?.includes(selectedGrade as 1 | 2)
    )
      return false;
    return true;
  });

  const currentWord = deck[currentIndex] || deck[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1 < deck.length ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 >= 0 ? prev - 1 : deck.length - 1));
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const randomIndex = Math.floor(Math.random() * deck.length);
    setCurrentIndex(randomIndex);
  };

  const handleSpeak = (text: string) => {
    setIsSpeaking(true);
    if (currentWord) onTrackListen(currentWord.id);
    speechService.speak(text, {
      accent,
      slow: isSlow,
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false)
    });
  };

  if (!currentWord || deck.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <div className="text-6xl">⭐</div>
        <h3 className="font-heading text-xl font-bold text-slate-800">
          Chưa có thẻ từ vựng nào trong mục lọc này
        </h3>
        <p className="text-sm text-slate-500">
          Hãy bỏ chọn lọc hoặc thêm từ vào danh sách yêu thích trước nhé!
        </p>
        <button
          onClick={() => {
            setOnlyFavorites(false);
            setSelectedTopic('all');
            setSelectedGrade('all');
          }}
          className="px-5 py-2.5 bg-amber-400 font-bold rounded-xl text-amber-950"
        >
          Học tất cả từ vựng
        </button>
      </div>
    );
  }

  const isFav = favorites.includes(currentWord.id);
  const isLrn = learnedWords.includes(currentWord.id);

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="text-center space-y-1">
        <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
          🎓 Flashcards Học Thuộc
        </span>
        <h1 className="font-heading text-3xl font-bold text-slate-800">
          Thẻ Từ Vựng Thông Minh
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Chạm vào thẻ để lật xem nghĩa tiếng Việt & ví dụ Toán học
        </p>
      </div>

      {/* Filter bar */}
      <div className="bg-white border-2 border-amber-200/90 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs font-bold shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedTopic}
            onChange={(e) => {
              setSelectedTopic(e.target.value as any);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700"
          >
            <option value="all">Tất cả chủ đề</option>
            {TOPICS.map(t => (
              <option key={t.id} value={t.id}>{t.icon} {t.nameEn}</option>
            ))}
          </select>

          <select
            value={selectedGrade}
            onChange={(e) => {
              setSelectedGrade(e.target.value === 'all' ? 'all' : Number(e.target.value) as any);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700"
          >
            <option value="all">Tất cả lớp</option>
            <option value="1">Lớp 1</option>
            <option value="2">Lớp 2</option>
          </select>

          <button
            onClick={() => {
              setOnlyFavorites(!onlyFavorites);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
              onlyFavorites
                ? 'bg-amber-500 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-amber-50'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-white' : ''}`} />
            <span>Chỉ từ yêu thích</span>
          </button>
        </div>

        <button
          onClick={handleShuffle}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-xl transition-colors ml-auto"
          title="Xáo trộn ngẫu nhiên"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>Xáo trộn</span>
        </button>
      </div>

      {/* Progress & Deck counter */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-2">
        <span>Tiến độ học:</span>
        <span className="bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
          Thẻ {currentIndex + 1} / {deck.length}
        </span>
      </div>

      {/* Interactive 3D Flip Card */}
      <div className="relative min-h-[360px] perspective-1000">
        <div
          id="flashcard-interactive-box"
          onClick={() => setIsFlipped(!isFlipped)}
          className={`w-full min-h-[360px] bg-white border-3 rounded-3xl p-6 shadow-xl cursor-pointer transition-all duration-500 flex flex-col justify-between select-none ${
            isFlipped
              ? 'border-emerald-300 bg-gradient-to-b from-emerald-50/40 to-white'
              : 'border-amber-300 bg-gradient-to-b from-amber-50/40 to-white hover:border-amber-400'
          }`}
        >
          {/* Card Top Indicator */}
          <div className="flex items-center justify-between text-xs font-extrabold">
            <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full uppercase">
              {isFlipped ? '🇻🇳 Mặt sau (Ý nghĩa)' : '🇬🇧 Mặt trước (Từ tiếng Anh)'}
            </span>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 flex items-center gap-1">
                <RotateCw className="w-3 h-3" />
                Chạm để lật
              </span>
            </div>
          </div>

          {/* Card Main Body */}
          {!isFlipped ? (
            /* FRONT OF CARD */
            <div className="flex flex-col items-center justify-center text-center py-6 space-y-4">
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 shadow-2xs">
                <MathIllustration type={currentWord.illustrationType} size="md" />
              </div>

              <div>
                <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-slate-800 capitalize tracking-tight">
                  {currentWord.word}
                </h2>
                <p className="font-mono text-base text-slate-400 mt-1">
                  {currentWord.ipa}
                </p>
              </div>

              {/* Speaker Button on Front */}
              <button
                id="flashcard-front-listen-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSpeak(currentWord.word);
                }}
                disabled={isSpeaking}
                className={`px-5 py-2.5 rounded-2xl font-bold text-sm shadow-sm flex items-center gap-2 transition-all ${
                  isSpeaking
                    ? 'bg-orange-500 text-white animate-pulse'
                    : 'bg-amber-400 hover:bg-amber-500 text-amber-950 active:scale-95'
                }`}
              >
                <Volume2 className="w-5 h-5" />
                <span>Phát âm chuẩn</span>
              </button>
            </div>
          ) : (
            /* BACK OF CARD */
            <div className="flex flex-col items-center justify-center text-center py-4 space-y-4">
              <div>
                <span className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider">
                  Nghĩa Tiếng Việt
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-emerald-800 capitalize mt-1">
                  {currentWord.meaning}
                </h2>
              </div>

              <div className="max-w-md bg-white p-4 rounded-2xl border border-emerald-200 text-left space-y-2 text-xs sm:text-sm shadow-2xs">
                <div>
                  <strong className="text-slate-700">Định nghĩa: </strong>
                  <span className="text-slate-600">{currentWord.definitionEn}</span>
                  <p className="text-slate-500 italic mt-0.5">{currentWord.definitionVi}</p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <strong className="text-slate-700">Ví dụ Toán học: </strong>
                  <span className="font-mono font-bold text-emerald-700">{currentWord.example}</span>
                  <p className="text-slate-500">{currentWord.exampleVi}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeak(currentWord.example);
                  }}
                  className="px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Nghe câu ví dụ</span>
                </button>
              </div>
            </div>
          )}

          {/* Card Bottom Quick Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100" onClick={(e) => e.stopPropagation()}>
            <button
              id="flashcard-toggle-learned"
              onClick={() => onToggleLearned(currentWord.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isLrn
                  ? 'bg-emerald-100 text-emerald-800 font-extrabold'
                  : 'bg-slate-100 text-slate-600 hover:bg-emerald-50'
              }`}
            >
              <CheckCircle className={`w-4 h-4 ${isLrn ? 'text-emerald-600' : ''}`} />
              <span>{isLrn ? 'Đã ghi nhớ ✓' : 'Đánh dấu đã thuộc'}</span>
            </button>

            <button
              id="flashcard-toggle-fav"
              onClick={() => onToggleFavorite(currentWord.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isFav
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-slate-100 text-slate-600 hover:bg-amber-50'
              }`}
            >
              <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400 text-amber-500' : ''}`} />
              <span>{isFav ? 'Đã yêu thích' : 'Lưu vào Yêu thích'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons (Previous / Next) */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          id="flashcard-prev-btn"
          onClick={handlePrev}
          className="flex-1 py-3.5 bg-white border-2 border-amber-300 hover:bg-amber-50 text-slate-700 font-bold rounded-2xl shadow-sm flex items-center justify-center gap-2 text-sm sm:text-base transition-all active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>← Từ trước (Previous)</span>
        </button>

        <button
          id="flashcard-next-btn"
          onClick={handleNext}
          className="flex-1 py-3.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-extrabold rounded-2xl shadow-md flex items-center justify-center gap-2 text-sm sm:text-base transition-all active:scale-95"
        >
          <span>Từ tiếp theo (Next) →</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
