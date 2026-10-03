import React, { useState } from 'react';
import { MathWord, VoiceAccent, TopicId } from '../types';
import { TOPICS, MATH_WORDS } from '../data/mathWords';
import { MathIllustration } from './MathIllustration';
import { speechService } from '../utils/speech';
import { 
  BookOpen, 
  Printer, 
  Presentation, 
  Volume2, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  X, 
  RotateCw, 
  FileText, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  Layers,
  Search,
  Maximize2
} from 'lucide-react';

interface LearningMaterialsViewProps {
  accent: VoiceAccent;
  isSlow: boolean;
  onTrackListen: (id: string) => void;
  initialSubTab?: 'flashcards' | 'printables' | 'presentation';
}

export const LearningMaterialsView: React.FC<LearningMaterialsViewProps> = ({
  accent,
  isSlow,
  onTrackListen,
  initialSubTab = 'flashcards'
}) => {
  const [subTab, setSubTab] = useState<'flashcards' | 'printables' | 'presentation'>(initialSubTab);
  
  // Shared topic & grade filters for materials
  const [selectedTopic, setSelectedTopic] = useState<TopicId | 'all'>('shapes');
  const [selectedGrade, setSelectedGrade] = useState<1 | 2 | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Flashcards state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Presentation modal state
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);
  const [presentationIndex, setPresentationIndex] = useState(0);

  // Filtered words for materials
  const filteredWords = MATH_WORDS.filter(w => {
    if (selectedTopic !== 'all' && w.topic !== selectedTopic) return false;
    if (selectedGrade !== 'all' && w.grade !== selectedGrade && !w.grades?.includes(selectedGrade as 1 | 2)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return w.word.toLowerCase().includes(q) || w.meaning.toLowerCase().includes(q);
    }
    return true;
  });

  const currentFlashcard = filteredWords[flashcardIndex] || filteredWords[0];
  const presentationWords = selectedTopic === 'all' 
    ? MATH_WORDS.slice(0, 15) 
    : MATH_WORDS.filter(w => w.topic === selectedTopic);
  const currentPresentationWord = presentationWords[presentationIndex] || presentationWords[0];

  const handleSpeak = (text: string, wordId?: string) => {
    if (wordId) onTrackListen(wordId);
    speechService.speak(text, { accent, slow: isSlow });
  };

  const handleNextFlashcard = () => {
    setIsCardFlipped(false);
    setFlashcardIndex(prev => (prev + 1 < filteredWords.length ? prev + 1 : 0));
  };

  const handlePrevFlashcard = () => {
    setIsCardFlipped(false);
    setFlashcardIndex(prev => (prev - 1 >= 0 ? prev - 1 : filteredWords.length - 1));
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" />
          <span>HỌC LIỆU TRỰC QUAN • LEARNING MATERIALS</span>
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-800">
          Kho Học Liệu Toán Song Ngữ
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Bộ tài liệu trực quan, thẻ flashcard điện tử, phiếu in A4 chuẩn sư phạm và công cụ trình chiếu trên lớp học.
        </p>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200 shadow-inner max-w-full overflow-x-auto">
          <button
            onClick={() => setSubTab('flashcards')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              subTab === 'flashcards'
                ? 'bg-white text-indigo-700 shadow-md scale-102'
                : 'text-slate-600 hover:text-indigo-600'
            }`}
          >
            <span>🃏</span>
            <span>Flashcards Trực Quan</span>
          </button>

          <button
            onClick={() => setSubTab('printables')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              subTab === 'printables'
                ? 'bg-white text-emerald-700 shadow-md scale-102'
                : 'text-slate-600 hover:text-emerald-600'
            }`}
          >
            <span>🖨️</span>
            <span>Phiếu In & Thẻ Cắt A4</span>
          </button>

          <button
            onClick={() => setSubTab('presentation')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              subTab === 'presentation'
                ? 'bg-white text-amber-700 shadow-md scale-102'
                : 'text-slate-600 hover:text-amber-600'
            }`}
          >
            <span>📽️</span>
            <span>Trình Chiếu Bài Học</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Topic selection */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            <button
              onClick={() => { setSelectedTopic('all'); setFlashcardIndex(0); setPresentationIndex(0); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                selectedTopic === 'all'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-amber-50'
              }`}
            >
              Tất cả ({MATH_WORDS.length})
            </button>
            {TOPICS.map(topic => (
              <button
                key={topic.id}
                onClick={() => { setSelectedTopic(topic.id); setFlashcardIndex(0); setPresentationIndex(0); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  selectedTopic === topic.id
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-amber-50'
                }`}
              >
                <span>{topic.icon}</span>
                <span>{topic.nameEn}</span>
              </button>
            ))}
          </div>

          {/* Grade filter & search */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200 text-xs font-bold">
              <button
                onClick={() => { setSelectedGrade('all'); setFlashcardIndex(0); }}
                className={`px-2.5 py-1 rounded-lg ${selectedGrade === 'all' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500'}`}
              >
                Tất cả lớp
              </button>
              <button
                onClick={() => { setSelectedGrade(1); setFlashcardIndex(0); }}
                className={`px-2.5 py-1 rounded-lg ${selectedGrade === 1 ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-500'}`}
              >
                Lớp 1
              </button>
              <button
                onClick={() => { setSelectedGrade(2); setFlashcardIndex(0); }}
                className={`px-2.5 py-1 rounded-lg ${selectedGrade === 2 ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-500'}`}
              >
                Lớp 2
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setFlashcardIndex(0); }}
                placeholder="Tìm từ vựng..."
                className="bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs w-36 sm:w-44 focus:outline-hidden focus:border-amber-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          SUB-TAB 1: INTERACTIVE FLASHCARDS
          ======================================================== */}
      {subTab === 'flashcards' && (
        <div className="space-y-6">
          {currentFlashcard ? (
            <div className="max-w-xl mx-auto space-y-4">
              {/* Card Container */}
              <div 
                onClick={() => setIsCardFlipped(!isCardFlipped)}
                className="relative h-96 w-full cursor-pointer perspective-1000 group"
              >
                <div 
                  className={`w-full h-full rounded-3xl transition-transform duration-500 preserve-3d shadow-xl border-4 ${
                    isCardFlipped ? 'rotate-y-180 border-indigo-400' : 'border-amber-400'
                  }`}
                >
                  {/* Front Side */}
                  <div className="absolute inset-0 bg-white rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-between backface-hidden">
                    <div className="w-full flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-full bg-amber-100 text-amber-800">
                        Lớp {currentFlashcard.grade} • {currentFlashcard.subtopic}
                      </span>
                      <span className="text-xs text-slate-400 font-bold">
                        {flashcardIndex + 1} / {filteredWords.length}
                      </span>
                    </div>

                    <div className="w-36 h-36 flex items-center justify-center p-2">
                      <MathIllustration type={currentFlashcard.illustrationType} size="md" />
                    </div>

                    <div className="text-center space-y-1">
                      <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-800 capitalize">
                        {currentFlashcard.word}
                      </h2>
                      <p className="font-mono text-sm sm:text-base text-slate-500">
                        {currentFlashcard.ipa}
                      </p>
                    </div>

                    <div className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Nhấn vào thẻ để lật xem nghĩa & ví dụ</span>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-between backface-hidden rotate-y-180">
                    <div className="w-full flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
                        Nghĩa tiếng Việt
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSpeak(currentFlashcard.word, currentFlashcard.id);
                        }}
                        className="p-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-center space-y-3">
                      <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-indigo-900">
                        {currentFlashcard.meaning}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 max-w-sm">
                        {currentFlashcard.definitionVi}
                      </p>

                      <div className="bg-white/80 p-3 rounded-2xl border border-indigo-200 text-left space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Ví dụ:</span>
                        <p className="font-mono text-xs sm:text-sm font-bold text-slate-800">
                          {currentFlashcard.example}
                        </p>
                        <p className="text-xs text-indigo-700 italic">
                          {currentFlashcard.exampleVi}
                        </p>
                      </div>
                    </div>

                    <div className="text-xs text-indigo-500 flex items-center gap-1.5 font-medium">
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Nhấn để quay lại mặt trước</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between gap-4 px-2">
                <button
                  onClick={handlePrevFlashcard}
                  className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 text-xs sm:text-sm shadow-xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Thẻ trước</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSpeak(currentFlashcard.word, currentFlashcard.id)}
                    className="p-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white shadow-md transition-transform active:scale-95"
                    title="Phát âm từ vựng"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsCardFlipped(!isCardFlipped)}
                    className="px-4 py-2.5 rounded-xl bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCw className="w-4 h-4" />
                    <span>Lật thẻ</span>
                  </button>
                </div>

                <button
                  onClick={handleNextFlashcard}
                  className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 text-xs sm:text-sm shadow-xs"
                >
                  <span>Thẻ tiếp</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200">
              <p className="text-slate-500 text-sm">Không tìm thấy từ vựng nào phù hợp với bộ lọc.</p>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          SUB-TAB 2: PRINTABLES (WORKSHEETS & FLASHCARD CUT-OUTS)
          ======================================================== */}
      {subTab === 'printables' && (
        <div className="space-y-6">
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                <Printer className="w-3.5 h-3.5" />
                <span>Phiếu in khổ A4 chuẩn sư phạm</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-emerald-950">
                Phiếu In Thẻ & Bài Tập Thực Hành
              </h2>
              <p className="text-xs sm:text-sm text-emerald-800 max-w-xl">
                Giáo viên có thể in trực tiếp ra giấy khổ A4 để học sinh cắt ghép làm thẻ flashcard cầm tay hoặc làm bài tập nối từ trong giờ học.
              </p>
            </div>

            <button
              onClick={() => window.print()}
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg hover:scale-105 transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Printer className="w-5 h-5" />
              <span>In trang này (Print A4)</span>
            </button>
          </div>

          {/* Printable Flashcards Grid */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
              <div>
                <h3 className="font-heading font-bold text-xl text-slate-800">
                  ✂️ Lưới Thẻ Flashcard Cắt Rời (Flashcard Cut-out Sheet)
                </h3>
                <p className="text-xs text-slate-500">
                  Các đường viền nét đứt được thiết kế sẵn để học sinh dùng kéo cắt thành các thẻ flashcard độc lập.
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full shrink-0">
                Đang hiển thị {filteredWords.length} thẻ
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 print:grid-cols-3 print:gap-3">
              {filteredWords.map((word) => (
                <div 
                  key={word.id} 
                  className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center space-y-2 bg-slate-50/60 hover:bg-white transition-colors"
                >
                  <div className="w-16 h-16 mx-auto flex items-center justify-center">
                    <MathIllustration type={word.illustrationType} size="sm" />
                  </div>
                  <h4 className="font-heading font-bold text-base text-slate-800 capitalize">{word.word}</h4>
                  <p className="text-xs font-mono text-slate-400">{word.ipa}</p>
                  <div className="bg-emerald-50 text-emerald-800 font-bold text-xs py-1 rounded-lg">
                    {word.meaning}
                  </div>
                  <div className="text-[10px] text-slate-500 border-t border-slate-200 pt-1 italic line-clamp-1">
                    {word.example}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-TAB 3: PRESENTATION MODE (SMARTBOARD / PROJECTOR)
          ======================================================== */}
      {subTab === 'presentation' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 bg-white/20 text-xs font-bold px-3 py-1 rounded-full">
                <Presentation className="w-3.5 h-3.5" />
                <span>Trình Chiếu Giảng Dạy Lớp Học (Projector / Smartboard)</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold">
                Trình chiếu: {TOPICS.find(t => t.id === selectedTopic)?.nameEn || 'Tất cả bài học'}
              </h2>
              <p className="text-indigo-100 text-xs sm:text-sm max-w-xl">
                Chế độ hiển thị khổ lớn toàn màn hình cho máy chiếu hoặc màn hình cảm ứng tương tác trong lớp học, có âm thanh to rõ và câu hỏi định hướng sư phạm.
              </p>
            </div>

            <button
              onClick={() => {
                setPresentationIndex(0);
                setIsPresentationOpen(true);
              }}
              className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-extrabold text-sm sm:text-base rounded-2xl shadow-lg hover:scale-105 transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Play className="w-5 h-5 fill-amber-950" />
              <span>Bật Trình Chiếu (Launch)</span>
            </button>
          </div>

          {/* Quick Preview Slide */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="font-heading font-bold text-xl text-slate-800 flex items-center gap-2">
              <Maximize2 className="w-5 h-5 text-indigo-600" />
              <span>Xem trước trình chiếu bài học ({presentationWords.length} từ)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {presentationWords.slice(0, 6).map((word, idx) => (
                <div 
                  key={word.id}
                  onClick={() => {
                    setPresentationIndex(idx);
                    setIsPresentationOpen(true);
                  }}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-400 bg-slate-50/50 hover:bg-indigo-50/30 transition-all cursor-pointer flex items-center gap-3"
                >
                  <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-xs shrink-0">
                    <MathIllustration type={word.illustrationType} size="sm" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-slate-800 capitalize">{word.word}</h4>
                    <p className="text-xs text-indigo-600 font-semibold">{word.meaning}</p>
                    <span className="text-[10px] text-slate-400">Slide #{idx + 1}</span>
                  </div>
                </div>
              ))}
            </div>

            {presentationWords.length > 6 && (
              <div className="text-center pt-2">
                <button
                  onClick={() => {
                    setPresentationIndex(0);
                    setIsPresentationOpen(true);
                  }}
                  className="text-xs font-bold text-indigo-600 hover:underline"
                >
                  Xem toàn bộ {presentationWords.length} slide trong chế độ trình chiếu →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FULLSCREEN / SMARTBOARD LESSON PRESENTATION MODAL */}
      {isPresentationOpen && currentPresentationWord && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col border-4 border-amber-400 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 sm:p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">📽️</span>
                <div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl">
                    Chế độ Giảng Dạy Lớp Học: {TOPICS.find(t => t.id === selectedTopic)?.nameEn || 'Tất cả bài học'}
                  </h3>
                  <span className="text-xs text-amber-100">
                    Từ vựng {presentationIndex + 1} / {presentationWords.length}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsPresentationOpen(false)}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body - Giant Vocabulary Display */}
            <div className="p-6 sm:p-10 space-y-8">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="w-48 h-48 bg-amber-50 rounded-3xl border-2 border-amber-200 flex items-center justify-center p-4 shadow-inner">
                  <MathIllustration type={currentPresentationWord.illustrationType} size="lg" />
                </div>

                <div className="text-center md:text-left space-y-2">
                  <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase">
                    Lớp {currentPresentationWord.grade} • {currentPresentationWord.subtopic}
                  </span>
                  <h1 className="font-heading text-5xl sm:text-6xl font-extrabold text-slate-800 capitalize tracking-tight">
                    {currentPresentationWord.word}
                  </h1>
                  <p className="font-mono text-xl text-slate-400">
                    {currentPresentationWord.ipa}
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-amber-600">
                    {currentPresentationWord.meaning}
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={() => handleSpeak(currentPresentationWord.word, currentPresentationWord.id)}
                      className="px-8 py-4 bg-amber-400 hover:bg-amber-500 text-amber-950 font-extrabold text-lg rounded-2xl shadow-lg flex items-center gap-3 active:scale-95 transition-transform cursor-pointer"
                    >
                      <Volume2 className="w-7 h-7 animate-pulse" />
                      <span>PHÁT ÂM TO CHO CẢ LỚP</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Pedagogy Prompt */}
              <div className="bg-amber-50/80 border-2 border-amber-200 rounded-2xl p-4 text-xs sm:text-sm text-slate-700 space-y-1.5">
                <div className="font-bold text-amber-900 flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Gợi ý sư phạm trong tiết dạy:</span>
                </div>
                <div>💡 Cho cả lớp nghe phát âm 2 lần, sau đó đồng thanh đọc to 3 lần.</div>
                <div>✏️ Mời 2 học sinh lên bảng vẽ hình hoặc chỉ vật tương ứng trong lớp học.</div>
                <div>🗣️ Hướng dẫn học sinh đọc câu ví dụ mẫu bằng tiếng Anh.</div>
              </div>

              {/* Example sentence */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Ví dụ thực tế:</span>
                  <div className="font-mono text-lg sm:text-xl font-extrabold text-slate-800 mt-0.5">
                    {currentPresentationWord.example}
                  </div>
                  <div className="text-sm text-slate-600">{currentPresentationWord.exampleVi}</div>
                </div>
                <button
                  onClick={() => handleSpeak(currentPresentationWord.example)}
                  className="p-3 bg-white hover:bg-amber-100 text-amber-800 rounded-xl border border-slate-200 cursor-pointer"
                  title="Nghe câu ví dụ"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="p-4 bg-slate-100 border-t flex items-center justify-between gap-4">
              <button
                disabled={presentationIndex === 0}
                onClick={() => setPresentationIndex(prev => prev - 1)}
                className="px-5 py-2.5 bg-white border border-slate-300 font-bold rounded-xl text-slate-700 disabled:opacity-40 flex items-center gap-2 text-sm cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Từ trước</span>
              </button>

              <span className="text-xs font-bold text-slate-500">
                {presentationIndex + 1} / {presentationWords.length}
              </span>

              <button
                disabled={presentationIndex + 1 >= presentationWords.length}
                onClick={() => setPresentationIndex(prev => prev + 1)}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl disabled:opacity-40 flex items-center gap-2 text-sm shadow-sm cursor-pointer"
              >
                <span>Từ tiếp theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
