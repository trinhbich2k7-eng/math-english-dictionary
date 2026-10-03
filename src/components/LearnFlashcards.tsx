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
  Printer, 
  Layers, 
  Search, 
  X,
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
  // View mode: 'interactive' (lật thẻ học) or 'print' (phiếu in thẻ A4)
  const [viewMode, setViewMode] = useState<'interactive' | 'print'>('interactive');

  // Filter states
  const [selectedTopic, setSelectedTopic] = useState<TopicId | 'all'>('all');
  const [selectedGrade, setSelectedGrade] = useState<1 | 2 | 'all'>('all');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  // Interactive flashcard deck state
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
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase().trim();
      return w.word.toLowerCase().includes(q) || w.meaning.toLowerCase().includes(q);
    }
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

  const handleSpeak = (text: string, wordId?: string) => {
    setIsSpeaking(true);
    if (wordId) onTrackListen(wordId);
    speechService.speak(text, {
      accent,
      slow: isSlow,
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false)
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 shadow-2xs">
          <BookOpen className="w-3.5 h-3.5" />
          <span>HỌC TỪ & IN FLASHCARD</span>
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-800">
          Thẻ Từ Vựng Toán Học
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
          Học trực quan qua thẻ lật 3D hai mặt có âm thanh bản ngữ, hoặc in ra giấy khổ A4 để làm bộ flashcard cầm tay.
        </p>
      </div>

      {/* Mode Switcher Tabs: Interactive vs Printable */}
      <div className="flex justify-center print:hidden">
        <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200 shadow-inner">
          <button
            onClick={() => setViewMode('interactive')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              viewMode === 'interactive'
                ? 'bg-white text-indigo-700 shadow-md scale-102'
                : 'text-slate-600 hover:text-indigo-600'
            }`}
          >
            <span>🃏</span>
            <span>Thẻ Học Tương Tác</span>
          </button>

          <button
            onClick={() => setViewMode('print')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              viewMode === 'print'
                ? 'bg-white text-emerald-700 shadow-md scale-102'
                : 'text-slate-600 hover:text-emerald-600'
            }`}
          >
            <Printer className="w-4 h-4 text-emerald-600" />
            <span>Phiếu In Thẻ A4</span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.2 rounded-full font-extrabold">
              {deck.length} thẻ
            </span>
          </button>
        </div>
      </div>

      {/* Shared Filter Bar */}
      <div className="bg-white border-2 border-amber-200/90 rounded-3xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 text-xs font-bold shadow-xs print:hidden">
        <div className="flex flex-wrap items-center gap-2">
          {/* Topic Select */}
          <select
            value={selectedTopic}
            onChange={(e) => {
              setSelectedTopic(e.target.value as any);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className="bg-slate-100 px-3 py-2 rounded-xl border border-slate-200 text-slate-700 focus:outline-hidden cursor-pointer"
          >
            <option value="all">Tất cả chủ đề ({MATH_WORDS.length} từ)</option>
            {TOPICS.map(t => (
              <option key={t.id} value={t.id}>{t.icon} {t.nameEn} ({t.nameVi})</option>
            ))}
          </select>

          {/* Grade Select */}
          <select
            value={selectedGrade}
            onChange={(e) => {
              setSelectedGrade(e.target.value === 'all' ? 'all' : Number(e.target.value) as any);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className="bg-slate-100 px-3 py-2 rounded-xl border border-slate-200 text-slate-700 focus:outline-hidden cursor-pointer"
          >
            <option value="all">Tất cả khối lớp</option>
            <option value="1">Lớp 1 (54 từ)</option>
            <option value="2">Lớp 2 (64 từ)</option>
          </select>

          {/* Only Favorites */}
          <button
            onClick={() => {
              setOnlyFavorites(!onlyFavorites);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
              onlyFavorites
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-amber-50'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-white' : ''}`} />
            <span>Từ yêu thích ({favorites.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {/* Quick search input in print mode or general */}
          <div className="relative">
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => {
                setSearchFilter(e.target.value);
                setCurrentIndex(0);
              }}
              placeholder="Tìm từ vựng..."
              className="bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs w-36 sm:w-44 focus:outline-hidden focus:border-amber-400"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            {searchFilter && (
              <button
                onClick={() => setSearchFilter('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {viewMode === 'interactive' && (
            <button
              onClick={handleShuffle}
              className="flex items-center gap-1.5 px-3 py-2 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-xl transition-colors cursor-pointer"
              title="Xáo trộn thứ tự các thẻ"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Xáo trộn</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================
          MODE 1: INTERACTIVE 3D FLIP FLASHCARDS
          ======================================================== */}
      {viewMode === 'interactive' && (
        <div className="max-w-2xl mx-auto space-y-6">
          {deck.length > 0 && currentWord ? (
            <>
              {/* Progress & Deck counter */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-2">
                <span>Tiến độ học thẻ:</span>
                <span className="bg-amber-100 text-amber-900 px-3 py-0.5 rounded-full">
                  Thẻ {currentIndex + 1} / {deck.length}
                </span>
              </div>

              {/* Interactive 3D Flip Card */}
              <div className="relative min-h-[380px] perspective-1000">
                <div
                  id="flashcard-interactive-box"
                  onClick={() => setIsFlipped(!isFlipped)}
                  className={`w-full min-h-[380px] bg-white border-3 rounded-3xl p-6 sm:p-8 shadow-xl cursor-pointer transition-all duration-500 flex flex-col justify-between select-none ${
                    isFlipped
                      ? 'border-emerald-300 bg-gradient-to-b from-emerald-50/40 to-white'
                      : 'border-amber-300 bg-gradient-to-b from-amber-50/40 to-white hover:border-amber-400'
                  }`}
                >
                  {/* Card Top Indicator */}
                  <div className="flex items-center justify-between text-xs font-extrabold">
                    <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full uppercase">
                      Lớp {currentWord.grade} • {currentWord.subtopic}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 flex items-center gap-1 font-bold">
                        <RotateCw className="w-3 h-3" />
                        Chạm để lật xem {isFlipped ? 'từ tiếng Anh' : 'nghĩa & ví dụ'}
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
                          handleSpeak(currentWord.word, currentWord.id);
                        }}
                        disabled={isSpeaking}
                        className={`px-6 py-3 rounded-2xl font-extrabold text-sm shadow-md flex items-center gap-2 transition-all cursor-pointer ${
                          isSpeaking
                            ? 'bg-orange-500 text-white animate-pulse'
                            : 'bg-amber-400 hover:bg-amber-500 text-amber-950 active:scale-95'
                        }`}
                      >
                        <Volume2 className="w-5 h-5" />
                        <span>Phát âm chuẩn bản ngữ</span>
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
                          className="px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                        >
                          <Volume2 className="w-4 h-4" />
                          <span>Nghe câu ví dụ mẫu</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Card Bottom Quick Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100" onClick={(e) => e.stopPropagation()}>
                    <button
                      id="flashcard-toggle-learned"
                      onClick={() => onToggleLearned(currentWord.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        learnedWords.includes(currentWord.id)
                          ? 'bg-emerald-100 text-emerald-800 font-extrabold'
                          : 'bg-slate-100 text-slate-600 hover:bg-emerald-50'
                      }`}
                    >
                      <CheckCircle className={`w-4 h-4 ${learnedWords.includes(currentWord.id) ? 'text-emerald-600' : ''}`} />
                      <span>{learnedWords.includes(currentWord.id) ? 'Đã ghi nhớ ✓' : 'Đánh dấu đã thuộc'}</span>
                    </button>

                    <button
                      id="flashcard-toggle-fav"
                      onClick={() => onToggleFavorite(currentWord.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        favorites.includes(currentWord.id)
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-100 text-slate-600 hover:bg-amber-50'
                      }`}
                    >
                      <Star className={`w-4 h-4 ${favorites.includes(currentWord.id) ? 'fill-amber-400 text-amber-500' : ''}`} />
                      <span>{favorites.includes(currentWord.id) ? 'Đã yêu thích' : 'Lưu vào Yêu thích'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons (Previous / Next) */}
              <div className="flex items-center justify-between gap-4 pt-2">
                <button
                  id="flashcard-prev-btn"
                  onClick={handlePrev}
                  className="flex-1 py-3.5 bg-white border-2 border-amber-300 hover:bg-amber-50 text-slate-700 font-bold rounded-2xl shadow-sm flex items-center justify-center gap-2 text-sm sm:text-base transition-all active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>← Từ trước (Previous)</span>
                </button>

                <button
                  id="flashcard-next-btn"
                  onClick={handleNext}
                  className="flex-1 py-3.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-extrabold rounded-2xl shadow-md flex items-center justify-center gap-2 text-sm sm:text-base transition-all active:scale-95 cursor-pointer"
                >
                  <span>Từ tiếp theo (Next) →</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Quick switch to print banner */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between gap-4">
                <div className="text-xs text-amber-900">
                  <span className="font-bold block sm:inline">💡 Cần thẻ giấy để cầm tay hoặc dán bảng? </span>
                  <span>Chuyển sang chế độ In để xuất lưới thẻ khổ A4 có đường cắt kéo.</span>
                </div>
                <button
                  onClick={() => setViewMode('print')}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>In thẻ ngay</span>
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border-2 border-slate-200 space-y-4">
              <div className="text-5xl">⭐</div>
              <h3 className="font-heading text-xl font-bold text-slate-800">
                Chưa có thẻ từ vựng nào trong mục lọc này
              </h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                Hãy bỏ bớt điều kiện lọc hoặc nhấn vào nút bên dưới để học tất cả từ vựng nhé!
              </p>
              <button
                onClick={() => {
                  setOnlyFavorites(false);
                  setSelectedTopic('all');
                  setSelectedGrade('all');
                  setSearchFilter('');
                }}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 font-bold rounded-xl text-amber-950 cursor-pointer shadow-sm"
              >
                Học tất cả 118 từ vựng
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          MODE 2: PRINTABLE FLASHCARDS A4 (PHIẾU IN THẺ A4)
          ======================================================== */}
      {viewMode === 'print' && (
        <div className="space-y-6">
          {/* Print Action Hero */}
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 print:hidden">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                <Printer className="w-3.5 h-3.5" />
                <span>Phiếu in khổ A4 chuẩn sư phạm</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-emerald-950">
                In Thẻ Flashcard Từ Vựng (A4 Cut-out Sheet)
              </h2>
              <p className="text-xs sm:text-sm text-emerald-800 max-w-xl">
                Lưới thẻ được thiết kế đường viền nét đứt cắt kéo chuẩn xác, kèm hình minh họa trực quan, phiên âm IPA, nghĩa tiếng Việt và ví dụ toán học.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => window.print()}
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-5 h-5" />
                <span>In trang này (Print A4)</span>
              </button>

              <button
                onClick={() => setViewMode('interactive')}
                className="px-4 py-3.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs sm:text-sm rounded-2xl cursor-pointer"
              >
                Đóng bản in
              </button>
            </div>
          </div>

          {/* Printable Cards Grid */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 print:border-0 print:p-0 print:shadow-none">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 print:hidden">
              <div>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-800">
                  ✂️ Lưới Thẻ Flashcard Cắt Rời
                </h3>
                <p className="text-xs text-slate-500">
                  Đang hiển thị <strong className="text-emerald-700">{deck.length}</strong> thẻ từ vựng sẵn sàng để in
                </p>
              </div>

              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                {selectedTopic === 'all' ? 'Tất cả chủ đề' : TOPICS.find(t => t.id === selectedTopic)?.nameEn}
              </span>
            </div>

            {deck.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 print:grid-cols-3 print:gap-4 print:m-0">
                {deck.map((word) => (
                  <div
                    key={word.id}
                    className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center space-y-2 bg-slate-50/60 hover:bg-white transition-colors relative flex flex-col justify-between print:border-slate-400 print:bg-white print:break-inside-avoid"
                  >
                    {/* Grade indicator */}
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold border-b border-slate-100 pb-1">
                      <span>✂️ Cắt viền</span>
                      <span>Lớp {word.grade}</span>
                    </div>

                    {/* Illustration */}
                    <div className="w-16 h-16 mx-auto flex items-center justify-center my-1">
                      <MathIllustration type={word.illustrationType} size="sm" />
                    </div>

                    {/* Word and IPA */}
                    <div>
                      <h4 className="font-heading font-bold text-base text-slate-800 capitalize leading-snug">
                        {word.word}
                      </h4>
                      <p className="text-xs font-mono text-slate-400">
                        {word.ipa}
                      </p>
                    </div>

                    {/* Meaning */}
                    <div className="bg-emerald-50 text-emerald-800 font-bold text-xs py-1 rounded-lg">
                      {word.meaning}
                    </div>

                    {/* Example */}
                    <div className="text-[10px] text-slate-500 border-t border-slate-200 pt-1 italic line-clamp-2">
                      {word.example}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 text-sm">
                Không tìm thấy từ vựng nào để in theo bộ lọc hiện tại.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
