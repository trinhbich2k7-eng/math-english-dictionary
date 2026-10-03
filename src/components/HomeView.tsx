import React, { useState } from 'react';
import { MathWord, TopicId, VoiceAccent } from '../types';
import { TOPICS, MATH_WORDS } from '../data/mathWords';
import { MathIllustration } from './MathIllustration';
import { speechService } from '../utils/speech';
import { 
  Search, 
  Sparkles, 
  Volume2, 
  Gamepad2, 
  GraduationCap, 
  Layers, 
  ArrowRight, 
  Star, 
  BookOpen,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

interface HomeViewProps {
  onSearchSelect: (query: string) => void;
  onTopicSelect: (topicId: TopicId) => void;
  onGradeSelect: (grade: 1 | 2) => void;
  onNavigateTab: (tab: string) => void;
  accent: VoiceAccent;
  isSlow: boolean;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onTrackListen: (id: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSearchSelect,
  onTopicSelect,
  onGradeSelect,
  onNavigateTab,
  accent,
  isSlow,
  favorites,
  onToggleFavorite,
  onTrackListen
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [speakingWordId, setSpeakingWordId] = useState<string | null>(null);

  // Daily spotlight word
  const spotlightWord = MATH_WORDS.find(w => w.id === 'g1-addition' || w.id === 'addition') || MATH_WORDS[0];

  const handleSpeakWord = (word: MathWord) => {
    setSpeakingWordId(word.id);
    onTrackListen(word.id);
    speechService.speak(word.word, {
      accent,
      slow: isSlow,
      onEnd: () => setSpeakingWordId(null),
      onError: () => setSpeakingWordId(null)
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchSelect(searchInput.trim());
    }
  };

  const quickTags = [
    { label: 'addition', vi: 'phép cộng' },
    { label: 'triangle', vi: 'hình tam giác' },
    { label: 'clock', vi: 'đồng hồ' },
    { label: 'half', vi: 'một nửa' },
    { label: 'length', vi: 'chiều dài' },
    { label: 'money', vi: 'tiền tệ' },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 text-white p-6 sm:p-10 md:p-12 shadow-lg">
        {/* Soft decorative background glows (no text or glyph overlap) */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -left-12 -top-12 w-64 h-64 rounded-full bg-yellow-300/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border border-white/30 shadow-xs">
            <Sparkles className="w-4 h-4 text-yellow-200" />
            <span>Trọn bộ 118 từ vựng Toán Tiếng Anh chuẩn (Lớp 1: 54 từ • Lớp 2: 64 từ)</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-sm">
            Learn Math in English!
          </h1>

          <p className="text-lg sm:text-xl font-medium text-amber-50 max-w-2xl mx-auto">
            Khám phá thế giới Toán học bằng tiếng Anh với hình ảnh minh họa dễ thương và phát âm chuẩn bản ngữ!
          </p>

          {/* Big Search Input */}
          <form onSubmit={handleSearchSubmit} className="pt-2">
            <div className="relative max-w-xl mx-auto group">
              <input
                id="hero-search-input"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search a math word... (e.g. addition, hình tam giác)"
                className="w-full bg-white text-slate-800 placeholder-slate-400 text-base sm:text-lg rounded-2xl pl-12 sm:pl-14 pr-32 py-4 shadow-xl border-2 border-white/60 focus:outline-hidden focus:ring-4 focus:ring-amber-300 transition-all"
              />
              <Search className="w-6 h-6 text-amber-500 absolute left-4 sm:left-5 top-1/2 -translate-y-1/2" />
              <button
                id="hero-search-btn"
                type="submit"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95 text-sm sm:text-base"
              >
                Tra cứu 🔍
              </button>
            </div>
          </form>

          {/* Quick Click Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs sm:text-sm">
            <span className="text-amber-100 font-medium">Gợi ý tìm nhanh:</span>
            {quickTags.map((tag) => (
              <button
                key={tag.label}
                onClick={() => onSearchSelect(tag.label)}
                className="bg-white/20 hover:bg-white text-white hover:text-orange-600 px-3 py-1 rounded-full font-bold transition-all border border-white/30 backdrop-blur-xs"
              >
                {tag.label} ({tag.vi})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Pillars: SEE -> HEAR -> READ -> PRACTICE */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
        <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-4 text-center hover:scale-102 transition-transform shadow-xs">
          <div className="w-12 h-12 mx-auto bg-sky-200 text-sky-700 rounded-2xl flex items-center justify-center text-2xl mb-2">
            🖼️
          </div>
          <h3 className="font-heading font-bold text-sky-900 text-base">1. SEE</h3>
          <p className="text-xs text-sky-700 mt-0.5">Nhìn hình ảnh toán học trực quan</p>
        </div>

        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 text-center hover:scale-102 transition-transform shadow-xs">
          <div className="w-12 h-12 mx-auto bg-amber-200 text-amber-700 rounded-2xl flex items-center justify-center text-2xl mb-2">
            🔊
          </div>
          <h3 className="font-heading font-bold text-amber-900 text-base">2. HEAR</h3>
          <p className="text-xs text-amber-700 mt-0.5">Nghe phát âm chuẩn US / UK</p>
        </div>

        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 text-center hover:scale-102 transition-transform shadow-xs">
          <div className="w-12 h-12 mx-auto bg-emerald-200 text-emerald-700 rounded-2xl flex items-center justify-center text-2xl mb-2">
            📖
          </div>
          <h3 className="font-heading font-bold text-emerald-900 text-base">3. READ</h3>
          <p className="text-xs text-emerald-700 mt-0.5">Đọc định nghĩa & ví dụ song ngữ</p>
        </div>

        <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-4 text-center hover:scale-102 transition-transform shadow-xs">
          <div className="w-12 h-12 mx-auto bg-purple-200 text-purple-700 rounded-2xl flex items-center justify-center text-2xl mb-2">
            🎮
          </div>
          <h3 className="font-heading font-bold text-purple-900 text-base">4. PRACTICE</h3>
          <p className="text-xs text-purple-700 mt-0.5">Luyện tập qua 3 trò chơi thú vị</p>
        </div>
      </section>

      {/* Spotlight Word of the Day */}
      <section className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="bg-white p-3 rounded-2xl border-2 border-amber-200 shadow-sm shrink-0">
              <MathIllustration type={spotlightWord.illustrationType} size="md" />
            </div>
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 bg-amber-500 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                ⭐ Từ vựng nổi bật trong ngày
              </div>
              <div className="flex items-center gap-3">
                <h2 className="font-heading text-3xl font-bold text-slate-800 capitalize">
                  {spotlightWord.word}
                </h2>
                <span className="font-mono text-sm text-slate-500">{spotlightWord.ipa}</span>
              </div>
              <p className="text-lg font-bold text-amber-700 capitalize">
                🇻🇳 {spotlightWord.meaning}
              </p>
              <p className="text-sm text-slate-600 max-w-xl">
                {spotlightWord.definitionVi} (Ví dụ: <span className="font-mono font-bold text-amber-800">{spotlightWord.example}</span>)
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0 w-full sm:w-auto">
            <button
              id="spotlight-listen-btn"
              onClick={() => handleSpeakWord(spotlightWord)}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm shadow-md transition-all ${
                speakingWordId === spotlightWord.id
                  ? 'bg-orange-500 text-white animate-pulse'
                  : 'bg-amber-400 hover:bg-amber-500 text-amber-950 hover:scale-102'
              }`}
            >
              <Volume2 className="w-5 h-5" />
              <span>Nghe phát âm</span>
            </button>
            <button
              id="spotlight-explore-btn"
              onClick={() => onSearchSelect(spotlightWord.word)}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm bg-white hover:bg-amber-50 text-slate-700 border-2 border-amber-200 transition-all hover:scale-102"
            >
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Xem chi tiết thẻ từ</span>
            </button>
          </div>
        </div>
      </section>

      {/* TOPICS SECTION */}
      <section className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-amber-200 pb-3">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600">
              Khám phá theo chủ đề
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-800">
              Các nhóm chủ đề Toán học
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('dictionary')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-600 hover:text-amber-700 group"
          >
            <span>Xem tất cả {MATH_WORDS.length} từ vựng</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {TOPICS.map((topic) => {
            const count = MATH_WORDS.filter(w => w.topic === topic.id).length;
            return (
              <button
                key={topic.id}
                id={`topic-card-${topic.id}`}
                onClick={() => onTopicSelect(topic.id)}
                className={`group p-4 rounded-3xl border-2 ${topic.borderColor} ${topic.bgColor} text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl p-2 rounded-2xl bg-white shadow-2xs group-hover:rotate-6 transition-transform">
                      {topic.icon}
                    </span>
                    <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-white/80 text-slate-600 shadow-2xs">
                      {count} từ
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-slate-800 group-hover:text-amber-600 transition-colors">
                    {topic.nameEn}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mb-2">
                    {topic.nameVi}
                  </p>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 mt-2 pt-2 border-t border-black/5">
                  {topic.description}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* LEARN BY GRADE SECTION */}
      <section className="max-w-6xl mx-auto space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600">
            📚 LEARN BY GRADE
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-800">
            Học theo khối lớp tiểu học
          </h2>
          <p className="text-sm text-slate-500">
            Chương trình chuẩn theo sách giáo khoa & giáo trình Toán song ngữ (Khan Academy)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Grade 1 Card */}
          <div
            id="grade-1-hero-card"
            onClick={() => onGradeSelect(1)}
            className="cursor-pointer group bg-gradient-to-br from-amber-50 to-orange-50/50 border-3 border-amber-300 rounded-3xl p-6 sm:p-8 hover:border-amber-400 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl sm:text-4xl p-3 bg-amber-400 text-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                🌟
              </span>
              <span className="bg-amber-100 text-amber-800 font-extrabold text-xs px-3 py-1 rounded-full uppercase">
                Lớp 1 • 54 từ vựng
              </span>
            </div>

            <h3 className="font-heading text-2xl font-bold text-slate-800 group-hover:text-amber-600 transition-colors mb-2">
              Toán Tiếng Anh Lớp 1 (54 từ)
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Khởi đầu hào hứng với 5 từ Đếm số, 13 từ Cộng trừ, 6 từ Giá trị vị trí, 16 từ Đo lường & Dữ liệu, và 14 từ Hình học.
            </p>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {['Đếm số (5)', 'Cộng trừ (13)', 'Giá trị vị trí (6)', 'Đo lường & Dữ liệu (16)', 'Hình học (14)'].map(t => (
                <span key={t} className="text-xs bg-white text-slate-700 px-2.5 py-1 rounded-lg border border-amber-200 font-medium">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm font-bold text-amber-700 group-hover:translate-x-1 transition-transform">
              <span>Học ngay 54 từ Lớp 1</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Grade 2 Card */}
          <div
            id="grade-2-hero-card"
            onClick={() => onGradeSelect(2)}
            className="cursor-pointer group bg-gradient-to-br from-sky-50 to-indigo-50/50 border-3 border-sky-300 rounded-3xl p-6 sm:p-8 hover:border-sky-400 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl sm:text-4xl p-3 bg-sky-400 text-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                🚀
              </span>
              <span className="bg-sky-100 text-sky-800 font-extrabold text-xs px-3 py-1 rounded-full uppercase">
                Lớp 2 • 64 từ vựng
              </span>
            </div>

            <h3 className="font-heading text-2xl font-bold text-slate-800 group-hover:text-sky-600 transition-colors mb-2">
              Toán Tiếng Anh Lớp 2 (64 từ)
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Mở rộng kiến thức với 14 từ Cộng trừ, 16 từ Giá trị vị trí, 18 từ Đo lường & Dữ liệu, và 16 từ Hình học.
            </p>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {['Cộng trừ (14)', 'Giá trị vị trí (16)', 'Đo lường & Dữ liệu (18)', 'Hình học (16)'].map(t => (
                <span key={t} className="text-xs bg-white text-slate-700 px-2.5 py-1 rounded-lg border border-sky-200 font-medium">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm font-bold text-sky-700 group-hover:translate-x-1 transition-transform">
              <span>Học ngay 64 từ Lớp 2</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* DUAL BANNER: TEACHER TOOLKIT & LEARNING MATERIALS */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Learning Materials Card */}
        <div 
          onClick={() => onNavigateTab('materials')}
          className="cursor-pointer group bg-gradient-to-br from-emerald-500 to-teal-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between hover:scale-[1.01] transition-transform"
        >
          <div className="space-y-2.5">
            <span className="inline-flex items-center gap-1.5 bg-white/20 text-xs font-extrabold px-3 py-1 rounded-full">
              📚 Học liệu Sư phạm
            </span>
            <h3 className="font-heading text-2xl font-bold">
              Học Liệu & Phiếu In A4
            </h3>
            <p className="text-emerald-100 text-xs sm:text-sm">
              Flashcard trực quan, phiếu in cắt kéo A4 và chế độ trình chiếu Smartboard / máy chiếu cho lớp học.
            </p>
          </div>
          <div className="pt-4 flex items-center gap-2 text-sm font-bold text-amber-300 group-hover:translate-x-1 transition-transform">
            <span>Khám phá kho học liệu</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Teacher Corner Card */}
        <div 
          onClick={() => onNavigateTab('teacher')}
          className="cursor-pointer group bg-gradient-to-br from-indigo-600 to-purple-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between hover:scale-[1.01] transition-transform"
        >
          <div className="space-y-2.5">
            <span className="inline-flex items-center gap-1.5 bg-white/20 text-xs font-extrabold px-3 py-1 rounded-full">
              👩‍🏫 Dành cho Giáo viên & Trợ giảng
            </span>
            <h3 className="font-heading text-2xl font-bold">
              Góc Giáo Viên Song Ngữ
            </h3>
            <p className="text-indigo-100 text-xs sm:text-sm">
              Ngân hàng trọn bộ 230 câu lệnh tiếng Anh chuẩn (115 câu Toán & 115 câu Lớp học) kèm phiên âm IPA & audio.
            </p>
          </div>
          <div className="pt-4 flex items-center gap-2 text-sm font-bold text-amber-300 group-hover:translate-x-1 transition-transform">
            <span>Vào góc giáo viên</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </section>

      {/* QUICK GAME PROMO */}
      <section className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl text-white p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 bg-white/20 text-xs font-extrabold px-3 py-1 rounded-full">
              🎮 Vừa học vừa chơi
            </span>
            <h2 className="font-heading text-3xl font-bold">
              3 Trò chơi Toán học vui nhộn!
            </h2>
            <p className="text-purple-100 text-sm max-w-lg">
              Thử sức với ghép từ (Match the Word), nghe và chọn đáp án (Listen & Choose), cùng bài trắc nghiệm tính điểm rực rỡ pháo hoa.
            </p>
          </div>

          <button
            id="play-games-btn"
            onClick={() => onNavigateTab('games')}
            className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-amber-950 font-extrabold text-base rounded-2xl shadow-lg hover:scale-105 transition-all shrink-0 flex items-center gap-2"
          >
            <Gamepad2 className="w-6 h-6" />
            <span>Chơi ngay nào!</span>
          </button>
        </div>
      </section>
    </div>
  );
};
