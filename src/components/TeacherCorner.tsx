import React, { useState, useMemo } from 'react';
import { VoiceAccent } from '../types';
import { 
  TEACHER_PHRASES, 
  HIGH_LEVEL_GROUPS, 
  MATH_TOPIC_LIST, 
  CLASSROOM_ENGLISH_LIST, 
  TeacherPhrase 
} from '../data/teacherPhrases';
import { speechService } from '../utils/speech';
import { 
  UserCheck, 
  Volume2, 
  Search, 
  Copy, 
  Check, 
  Bookmark, 
  BookmarkCheck, 
  Sparkles, 
  Printer, 
  Play, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  BookOpen,
  Filter,
  CheckCircle2,
  GraduationCap,
  Layers,
  HelpCircle
} from 'lucide-react';

interface TeacherCornerProps {
  accent: VoiceAccent;
  isSlow: boolean;
  onTrackListen: (id: string) => void;
}

export const TeacherCorner: React.FC<TeacherCornerProps> = ({
  accent,
  isSlow,
  onTrackListen
}) => {
  // Main group: 'all' | 'math_topic' | 'classroom_english'
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  
  // Subtopic filter: 'all' or subtopic id
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>('all');
  
  // Search query (English, Vietnamese, STT, Subtopic)
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // CEFR level filter
  const [levelFilter, setLevelFilter] = useState<'all' | 'A1' | 'A2'>('all');
  
  // Bookmarked phrases for lesson planning
  const [savedPhraseIds, setSavedPhraseIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('teacher_saved_phrases_230');
      return saved ? JSON.parse(saved) : ['tp-001', 'tp-026', 'tp-051', 'tp-121', 'tp-148'];
    } catch {
      return ['tp-001', 'tp-026', 'tp-051', 'tp-121', 'tp-148'];
    }
  });
  const [viewSavedOnly, setViewSavedOnly] = useState<boolean>(false);

  // Copy feedback tracking
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Active audio speech feedback
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Practice / Drill modal mode for teachers
  const [isPracticeModalOpen, setIsPracticeModalOpen] = useState<boolean>(false);
  const [practiceIndex, setPracticeIndex] = useState<number>(0);
  const [isPracticeRevealed, setIsPracticeRevealed] = useState<boolean>(false);

  // Printable Cheat-Sheet Mode
  const [isPrintCheatSheetOpen, setIsPrintCheatSheetOpen] = useState<boolean>(false);

  const toggleSavePhrase = (id: string) => {
    setSavedPhraseIds(prev => {
      const updated = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try {
        localStorage.setItem('teacher_saved_phrases_230', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleSpeak = (phrase: TeacherPhrase) => {
    setSpeakingId(phrase.id);
    onTrackListen(phrase.id);
    speechService.speak(phrase.english, {
      accent,
      slow: isSlow,
      onEnd: () => setSpeakingId(null),
      onError: () => setSpeakingId(null)
    });
  };

  // Determine available subtopics based on selected main group
  const currentSubtopics = useMemo(() => {
    if (selectedGroup === 'math_topic') {
      return MATH_TOPIC_LIST;
    }
    if (selectedGroup === 'classroom_english') {
      return CLASSROOM_ENGLISH_LIST;
    }
    // 'all': combine both subtopic lists (excluding 'all_math' and 'all_classroom')
    return [
      { id: 'all', labelVi: 'Tất cả 15 chủ đề (230 câu)', labelEn: 'All Subtopics', icon: '✨', group: 'all' as const },
      ...MATH_TOPIC_LIST.filter(t => t.id !== 'all_math'),
      ...CLASSROOM_ENGLISH_LIST.filter(t => t.id !== 'all_classroom')
    ];
  }, [selectedGroup]);

  // Main filter logic
  const filteredPhrases = useMemo(() => {
    return TEACHER_PHRASES.filter(p => {
      // Saved only toggle
      if (viewSavedOnly && !savedPhraseIds.includes(p.id)) return false;

      // High-level group filter
      if (selectedGroup !== 'all' && p.group !== selectedGroup) return false;

      // Subtopic filter
      if (selectedSubtopic !== 'all' && selectedSubtopic !== 'all_math' && selectedSubtopic !== 'all_classroom') {
        if (p.subtopic !== selectedSubtopic) return false;
      }

      // Level filter
      if (levelFilter !== 'all' && p.level !== levelFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        // Check for STT search e.g. "45" or "#45"
        const sttMatch = q.replace('#', '') === String(p.stt);
        const matchEn = p.english.toLowerCase().includes(q);
        const matchVi = p.vietnamese.toLowerCase().includes(q);
        const matchSubtopic = p.subtopicVi.toLowerCase().includes(q) || p.subtopicEn.toLowerCase().includes(q);
        const matchContext = p.contextUsage.toLowerCase().includes(q);
        if (!sttMatch && !matchEn && !matchVi && !matchSubtopic && !matchContext) return false;
      }

      return true;
    });
  }, [selectedGroup, selectedSubtopic, searchQuery, levelFilter, viewSavedOnly, savedPhraseIds]);

  const currentPracticePhrase = filteredPhrases[practiceIndex] || filteredPhrases[0];

  return (
    <div className="space-y-8 pb-16">
      {/* Main Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="bg-indigo-100 text-indigo-800 text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 shadow-xs">
          <UserCheck className="w-4 h-4" />
          <span>TEACHER & TA TOOLKIT • NCKH TOÁN TIỂU HỌC SONG NGỮ</span>
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight">
          Góc Giáo Viên & Trợ Giảng Song Ngữ
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-medium max-w-2xl mx-auto">
          Các mẫu câu tiếng Anh giúp giáo viên tổ chức, hướng dẫn và tương tác trong giờ Toán song ngữ.
        </p>
      </div>

      {/* Feature & Quick Action Hero Banner */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2.5 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/20 text-xs font-bold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Trọn bộ 230 câu lệnh tiếng Anh chuẩn (115 câu Toán • 115 câu Lớp học)</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold">
            Bộ Câu Lệnh Sư Phạm Chuẩn Quốc Tế
          </h2>
          <p className="text-indigo-100 text-xs sm:text-sm max-w-xl">
            Được phân loại khoa học thành 2 nhóm lớn và 15 chuyên đề sư phạm: từ đếm số, phép tính, hình học, đo lường, biểu đồ đến khẩu lệnh điều hành lớp, hỏi đáp, khen ngợi, sửa lỗi và nội quy.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <button
            onClick={() => {
              setPracticeIndex(0);
              setIsPracticeRevealed(false);
              setIsPracticeModalOpen(true);
            }}
            className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-amber-950 font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-amber-950" />
            <span>Luyện Phản Xạ Nhanh</span>
          </button>

          <button
            onClick={() => setIsPrintCheatSheetOpen(true)}
            className="px-5 py-3 bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm rounded-2xl border border-white/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>In Sổ Tay A4 (230 câu)</span>
          </button>
        </div>
      </div>

      {/* 2 MAIN GROUPS SELECTOR */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {HIGH_LEVEL_GROUPS.map(group => {
          const isSelected = selectedGroup === group.id;
          return (
            <button
              key={group.id}
              onClick={() => {
                setSelectedGroup(group.id);
                setSelectedSubtopic('all');
                setViewSavedOnly(false);
              }}
              className={`p-4 sm:p-5 rounded-3xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between h-32 ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-lg scale-102 ring-4 ring-indigo-200'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl p-1 bg-white/20 rounded-xl">{group.icon}</span>
                <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                  isSelected ? 'bg-white text-indigo-900 shadow-xs' : 'bg-slate-100 text-slate-700'
                }`}>
                  {group.count} câu
                </span>
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-base sm:text-lg leading-tight">
                  {group.labelVi}
                </h3>
                <p className={`text-xs font-medium truncate mt-0.5 ${
                  isSelected ? 'text-indigo-200' : 'text-slate-400'
                }`}>
                  {group.labelEn}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* SUBTOPIC FILTER PILLS */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <Filter className="w-4 h-4 text-indigo-600" />
            <span>
              Lọc theo chuyên đề ({currentSubtopics.length - 1} chuyên đề {selectedGroup === 'math_topic' ? 'Toán' : selectedGroup === 'classroom_english' ? 'Lớp học' : 'chi tiết'}):
            </span>
          </span>
          <span className="text-xs font-bold text-indigo-600">
            {filteredPhrases.length} / 230 câu
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {currentSubtopics.map(t => {
            const isSelected = selectedSubtopic === t.id;
            const count = t.id === 'all' || t.id === 'all_math' || t.id === 'all_classroom'
              ? (selectedGroup === 'all' ? 230 : 115)
              : TEACHER_PHRASES.filter(p => p.subtopic === t.id).length;

            return (
              <button
                key={t.id}
                onClick={() => setSelectedSubtopic(t.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs scale-105'
                    : 'bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700'
                }`}
              >
                <span>{t.icon}</span>
                <span>{t.labelVi}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SEARCH & SECONDARY CONTROLS BAR */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="🔎 Tra cứu câu lệnh (#STT, tiếng Anh, tiếng Việt, chủ đề, ngữ cảnh...)"
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium focus:outline-hidden focus:border-indigo-500 focus:bg-white transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Right filters: Saved Lesson button & CEFR Level */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          {/* Saved phrases filter */}
          <button
            onClick={() => setViewSavedOnly(!viewSavedOnly)}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewSavedOnly
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-amber-50'
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>Bài giảng của tôi ({savedPhraseIds.length})</span>
          </button>

          {/* Level filter */}
          <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setLevelFilter('all')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                levelFilter === 'all' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setLevelFilter('A1')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                levelFilter === 'A1' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-500'
              }`}
            >
              A1 Cơ bản
            </button>
            <button
              onClick={() => setLevelFilter('A2')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                levelFilter === 'A2' ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-500'
              }`}
            >
              A2 Mở rộng
            </button>
          </div>
        </div>
      </div>

      {/* PHRASE COUNT & FILTER SUMMARY */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-2">
        <span>
          Đang hiển thị <strong className="text-slate-800 font-bold">{filteredPhrases.length}</strong> / 230 câu lệnh
        </span>
        {viewSavedOnly && (
          <span className="text-amber-600 font-bold">
            ★ Đang lọc các câu được lưu vào bài giảng hôm nay
          </span>
        )}
      </div>

      {/* PHRASES GRID (CARDS DESIGN) */}
      {filteredPhrases.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPhrases.map((phrase) => {
            const isSaved = savedPhraseIds.includes(phrase.id);
            const isCopied = copiedId === phrase.id;
            const isSpeaking = speakingId === phrase.id;

            return (
              <div
                key={phrase.id}
                className="bg-white border-2 border-slate-200 hover:border-indigo-400 rounded-3xl p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between gap-4 group relative overflow-hidden"
              >
                {/* Top bar: STT number, Category Icon & Subtopic Badge */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-extrabold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                      #{String(phrase.stt).padStart(3, '0')}
                    </span>
                    <span className="text-xl p-1 bg-indigo-50/50 rounded-lg group-hover:scale-110 transition-transform">
                      {phrase.icon}
                    </span>
                    <div className="truncate max-w-[150px] sm:max-w-[180px]">
                      <span className="text-xs font-bold text-slate-800 block truncate" title={phrase.subtopicVi}>
                        {phrase.subtopicVi}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium truncate block">
                        {phrase.groupVi}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {phrase.level}
                    </span>
                    <button
                      onClick={() => toggleSavePhrase(phrase.id)}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isSaved
                          ? 'text-amber-500 hover:text-amber-600 bg-amber-50'
                          : 'text-slate-300 hover:text-slate-500 hover:bg-slate-100'
                      }`}
                      title={isSaved ? 'Bỏ lưu khỏi bài giảng' : 'Lưu vào bài giảng của tôi'}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4 fill-amber-500" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Card Body: English, IPA, Vietnamese, Usage Tip */}
                <div className="space-y-3 flex-1">
                  {/* English Sentence */}
                  <div>
                    <h3 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 group-hover:text-indigo-700 transition-colors leading-snug">
                      “{phrase.english}”
                    </h3>
                    <p className="font-mono text-xs sm:text-sm text-indigo-600/90 font-medium mt-1">
                      {phrase.ipa}
                    </p>
                  </div>

                  {/* Vietnamese Meaning */}
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-start gap-2">
                    <span className="text-sm shrink-0">🇻🇳</span>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                      {phrase.vietnamese}
                    </p>
                  </div>

                  {/* Pedagogical Usage Context Tip */}
                  <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/60 text-xs text-amber-950 flex items-start gap-2">
                    <span className="text-sm shrink-0">💡</span>
                    <p className="leading-relaxed">
                      {phrase.contextUsage}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Action Buttons (Listen, Copy) */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleSpeak(phrase)}
                    className={`flex-1 py-2.5 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isSpeaking
                        ? 'bg-indigo-600 text-white shadow-md animate-pulse'
                        : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-800'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{isSpeaking ? 'Đang phát...' : 'Nghe phát âm'}</span>
                  </button>

                  <button
                    onClick={() => handleCopy(phrase.english, phrase.id)}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Sao chép câu tiếng Anh"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-600">Đã chép</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Chép</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border-2 border-slate-200 space-y-3">
          <div className="text-4xl">🔍</div>
          <h3 className="font-heading font-bold text-lg text-slate-800">
            Không tìm thấy câu lệnh phù hợp
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Vui lòng thử tìm với từ khóa khác hoặc nhấn vào nút bên dưới để xem lại toàn bộ 230 câu lệnh.
          </p>
          <button
            onClick={() => {
              setSelectedGroup('all');
              setSelectedSubtopic('all');
              setSearchQuery('');
              setLevelFilter('all');
              setViewSavedOnly(false);
            }}
            className="px-5 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
          >
            Đặt lại bộ lọc (Xem đủ 230 câu)
          </button>
        </div>
      )}

      {/* ========================================================
          MODAL 1: TEACHER PRACTICE & DRILL FLASHCARDS
          ======================================================== */}
      {isPracticeModalOpen && currentPracticePhrase && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col border-4 border-amber-400 animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 sm:p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">⚡</span>
                <div>
                  <h3 className="font-heading font-bold text-lg">
                    Luyện Phản Xạ Câu Lệnh Giảng Dạy
                  </h3>
                  <p className="text-xs text-amber-100">
                    Câu #{currentPracticePhrase.stt} / {filteredPhrases.length} • {currentPracticePhrase.subtopicVi}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsPracticeModalOpen(false)}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8 space-y-6 text-center">
              <div className="space-y-2">
                <span className="text-4xl">{currentPracticePhrase.icon}</span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  {currentPracticePhrase.groupVi} • Cấp độ {currentPracticePhrase.level}
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-800 leading-snug">
                  “{currentPracticePhrase.english}”
                </h2>
                <p className="font-mono text-base sm:text-lg text-indigo-600 font-bold">
                  {currentPracticePhrase.ipa}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleSpeak(currentPracticePhrase)}
                  className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-amber-950 font-extrabold rounded-2xl shadow-md inline-flex items-center gap-2 cursor-pointer active:scale-95 transition-transform"
                >
                  <Volume2 className="w-5 h-5" />
                  <span>Nghe Phát Âm Tiếng Anh</span>
                </button>
              </div>

              {/* Revealable Vietnamese meaning & usage */}
              <div className="pt-4 border-t border-slate-100">
                {isPracticeRevealed ? (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2 animate-fadeIn">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🇻🇳</span>
                      <p className="font-bold text-slate-800 text-base">{currentPracticePhrase.vietnamese}</p>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-100">
                      <span className="text-amber-500">💡</span>
                      <p>{currentPracticePhrase.contextUsage}</p>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsPracticeRevealed(true)}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
                  >
                    <span>👁️ Nhấn để xem nghĩa tiếng Việt và gợi ý sư phạm</span>
                  </button>
                )}
              </div>
            </div>

            {/* Footer controls */}
            <div className="p-4 bg-slate-100 border-t flex items-center justify-between gap-3">
              <button
                disabled={practiceIndex === 0}
                onClick={() => {
                  setPracticeIndex(prev => prev - 1);
                  setIsPracticeRevealed(false);
                }}
                className="px-4 py-2 bg-white border border-slate-300 font-bold rounded-xl text-slate-700 text-xs sm:text-sm disabled:opacity-40 flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Câu trước</span>
              </button>

              <button
                onClick={() => {
                  const randomIdx = Math.floor(Math.random() * filteredPhrases.length);
                  setPracticeIndex(randomIdx);
                  setIsPracticeRevealed(false);
                }}
                className="px-3 py-2 bg-slate-200 hover:bg-slate-300 rounded-xl text-xs font-bold text-slate-700 cursor-pointer"
              >
                <span>Xáo ngẫu nhiên</span>
              </button>

              <button
                disabled={practiceIndex + 1 >= filteredPhrases.length}
                onClick={() => {
                  setPracticeIndex(prev => prev + 1);
                  setIsPracticeRevealed(false);
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs sm:text-sm disabled:opacity-40 flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>Câu tiếp theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 2: PRINTABLE POCKET CHEAT SHEET A4
          ======================================================== */}
      {isPrintCheatSheetOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-y-auto border-4 border-indigo-400 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-heading font-extrabold text-xl text-slate-800">
                  📄 Sổ Tay Câu Lệnh Sư Phạm A4 ({filteredPhrases.length} câu)
                </h3>
                <p className="text-xs text-slate-500">
                  Bản in 2 cột trang nhã sẵn sàng in ra giấy A4 để giáo viên kẹp vào giáo án khi lên lớp.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>In bản này (A4)</span>
                </button>
                <button
                  onClick={() => setIsPrintCheatSheetOpen(false)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {filteredPhrases.map((phrase) => (
                <div key={phrase.id} className="border border-slate-200 rounded-xl p-3 bg-slate-50/50 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-indigo-700">#{phrase.stt} {phrase.icon}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800">
                      {phrase.subtopicVi}
                    </span>
                  </div>
                  <p className="font-bold text-slate-900 text-sm leading-snug">“{phrase.english}”</p>
                  <p className="font-mono text-indigo-700 text-[11px]">{phrase.ipa}</p>
                  <p className="text-slate-700 font-semibold italic">🇻🇳 {phrase.vietnamese}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
