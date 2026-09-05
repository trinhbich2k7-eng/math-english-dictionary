import React, { useState } from 'react';
import { MathWord, VoiceAccent, TopicId } from '../types';
import { TOPICS, MATH_WORDS } from '../data/mathWords';
import { MathIllustration } from './MathIllustration';
import { speechService } from '../utils/speech';
import { 
  UserCheck, 
  Presentation, 
  Printer, 
  BookOpen, 
  Volume2, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Search,
  CheckCircle2,
  X,
  Play
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
  const [activeTopic, setActiveTopic] = useState<TopicId>('shapes');
  const [searchFilter, setSearchFilter] = useState('');
  const [isLessonActive, setIsLessonActive] = useState(false);
  const [lessonIndex, setLessonIndex] = useState(0);
  const [isPrintMode, setIsPrintMode] = useState(false);

  const lessonWords = MATH_WORDS.filter(w => w.topic === activeTopic);
  const currentLessonWord = lessonWords[lessonIndex] || lessonWords[0];

  const handleSpeak = (text: string) => {
    if (currentLessonWord) onTrackListen(currentLessonWord.id);
    speechService.speak(text, { accent, slow: isSlow });
  };

  const teachingPrompts = [
    '💡 Hướng dẫn lớp: Cho cả lớp nghe 2 lần, sau đó đồng thanh phát âm to 3 lần.',
    '✏️ Thực hành: Mời 2 học sinh lên bảng vẽ hình hoặc viết phép tính tương ứng.',
    '🗣️ Đặt câu: Hướng dẫn học sinh đọc câu ví dụ mẫu bằng tiếng Anh.',
    '🤝 Trò chơi nhanh: Hỏi học sinh tìm đồ vật trong lớp học có đặc điểm tương tự.'
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="bg-indigo-100 text-indigo-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
          👩‍🏫 TEACHER CORNER
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-800">
          Góc Giáo Viên & Trợ Giảng Song Ngữ
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Công cụ trình chiếu trực tiếp trên lớp học, giáo án từ vựng theo tiết dạy và phiếu in flashcard
        </p>
      </div>

      {/* Action Banner: "Start a Lesson" & Print */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 bg-white/20 text-xs font-bold px-3 py-1 rounded-full">
            <Presentation className="w-4 h-4" />
            <span>Chế độ Trình Chiếu Giảng Dạy (Smartboard / Máy chiếu)</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold">
            Bắt đầu tiết học: {TOPICS.find(t => t.id === activeTopic)?.nameEn}
          </h2>
          <p className="text-indigo-100 text-sm max-w-xl">
            Hiển thị thẻ từ vựng khổ lớn với âm thanh cực rõ, hình vẽ trực quan và gợi ý hoạt động tương tác cho học sinh.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            id="start-lesson-btn"
            onClick={() => {
              setLessonIndex(0);
              setIsLessonActive(true);
            }}
            className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-extrabold text-sm sm:text-base rounded-2xl shadow-lg hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-amber-950" />
            <span>Start a Lesson (Bắt đầu)</span>
          </button>

          <button
            onClick={() => setIsPrintMode(!isPrintMode)}
            className="px-5 py-3.5 bg-white/20 hover:bg-white/30 text-white font-bold text-sm rounded-2xl border border-white/30 transition-all flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>{isPrintMode ? 'Đóng bản in' : 'Phiếu in Flashcard'}</span>
          </button>
        </div>
      </div>

      {/* TOPIC SELECTOR FOR LESSON PLAN */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Chọn bài học / Chủ đề giảng dạy:
          </span>
          <span className="text-xs font-bold text-indigo-600">
            {lessonWords.length} từ trong bài học này
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {TOPICS.map(topic => {
            const isSelected = activeTopic === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => {
                  setActiveTopic(topic.id);
                  setLessonIndex(0);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-indigo-50'
                }`}
              >
                <span>{topic.icon}</span>
                <span>{topic.nameEn} ({topic.nameVi})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* PRINTABLE FLASHCARDS MODE */}
      {isPrintMode && (
        <div className="bg-white border-2 border-indigo-200 rounded-3xl p-6 sm:p-8 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="font-heading font-bold text-xl text-slate-800">
                📄 Phiếu in thẻ từ vựng (Printable Worksheets) - Chủ đề {TOPICS.find(t => t.id === activeTopic)?.nameEn}
              </h3>
              <p className="text-xs text-slate-500">Giáo viên có thể in ra giấy khổ A4 để cắt làm thẻ flashcard cho học sinh hoạt động nhóm.</p>
            </div>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>In trang này (Print)</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {lessonWords.map(word => (
              <div key={word.id} className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center space-y-2 bg-slate-50/50">
                <div className="w-16 h-16 mx-auto flex items-center justify-center">
                  <MathIllustration type={word.illustrationType} size="sm" />
                </div>
                <h4 className="font-heading font-bold text-lg text-slate-800 capitalize">{word.word}</h4>
                <p className="text-xs font-mono text-slate-400">{word.ipa}</p>
                <p className="text-xs font-bold text-indigo-700">{word.meaning}</p>
                <div className="text-[10px] text-slate-500 border-t pt-1 italic">{word.example}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VOCABULARY LIST TABLE FOR TEACHERS */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div>
            <h3 className="font-heading font-bold text-lg text-slate-800">
              Danh sách từ vựng chi tiết của bài học
            </h3>
            <p className="text-xs text-slate-500">Nhấn nút phát âm để mở mẫu phát thanh chuẩn trên lớp</p>
          </div>

          <div className="relative">
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Tìm nhanh trong bài học..."
              className="bg-white border border-slate-200 text-xs rounded-xl pl-8 pr-3 py-2 w-56 focus:outline-hidden"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {lessonWords
            .filter(w => !searchFilter || w.word.toLowerCase().includes(searchFilter.toLowerCase()) || w.meaning.toLowerCase().includes(searchFilter.toLowerCase()))
            .map((word, idx) => (
              <div key={word.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-indigo-50/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                    <MathIllustration type={word.illustrationType} size="sm" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-lg text-slate-800 capitalize">
                        {word.word}
                      </span>
                      <span className="font-mono text-xs text-slate-400">{word.ipa}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        Lớp {word.grade}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-indigo-700">
                      {word.meaning}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Ví dụ: <span className="font-mono font-bold text-slate-700">{word.example}</span> ({word.exampleVi})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleSpeak(word.word)}
                    className="p-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Phát âm</span>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* FULLSCREEN / SMARTBOARD LESSON PRESENTATION MODAL */}
      {isLessonActive && currentLessonWord && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col border-4 border-amber-400 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 sm:p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">👩‍🏫</span>
                <div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl">
                    Chế độ Giảng Dạy Lớp Học: {TOPICS.find(t => t.id === activeTopic)?.nameEn}
                  </h3>
                  <span className="text-xs text-amber-100">
                    Từ vựng {lessonIndex + 1} / {lessonWords.length}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsLessonActive(false)}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body - Giant Vocabulary Display */}
            <div className="p-6 sm:p-10 space-y-8">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="w-48 h-48 bg-amber-50 rounded-3xl border-2 border-amber-200 flex items-center justify-center p-4 shadow-inner">
                  <MathIllustration type={currentLessonWord.illustrationType} size="lg" />
                </div>

                <div className="text-center md:text-left space-y-2">
                  <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase">
                    Lớp {currentLessonWord.grade} • {currentLessonWord.subtopic}
                  </span>
                  <h1 className="font-heading text-5xl sm:text-6xl font-extrabold text-slate-800 capitalize tracking-tight">
                    {currentLessonWord.word}
                  </h1>
                  <p className="font-mono text-xl text-slate-400">
                    {currentLessonWord.ipa}
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-amber-600">
                    {currentLessonWord.meaning}
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={() => handleSpeak(currentLessonWord.word)}
                      className="px-8 py-4 bg-amber-400 hover:bg-amber-500 text-amber-950 font-extrabold text-lg rounded-2xl shadow-lg flex items-center gap-3 active:scale-95 transition-transform"
                    >
                      <Volume2 className="w-7 h-7 animate-pulse" />
                      <span>PHÁT ÂM TO CHO CẢ LỚP</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Teaching Prompts Box */}
              <div className="bg-amber-50/80 border-2 border-amber-200 rounded-2xl p-4 text-xs sm:text-sm text-slate-700 space-y-1.5">
                <div className="font-bold text-amber-900 flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Gợi ý sư phạm cho giáo viên trong tiết dạy:</span>
                </div>
                {teachingPrompts.map((p, i) => (
                  <div key={i}>{p}</div>
                ))}
              </div>

              {/* Example math equation */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Ví dụ thực tế:</span>
                  <div className="font-mono text-xl font-extrabold text-slate-800 mt-0.5">
                    {currentLessonWord.example}
                  </div>
                  <div className="text-sm text-slate-600">{currentLessonWord.exampleVi}</div>
                </div>
                <button
                  onClick={() => handleSpeak(currentLessonWord.example)}
                  className="p-3 bg-white hover:bg-amber-100 text-amber-800 rounded-xl border border-slate-200"
                  title="Nghe câu ví dụ"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="p-4 bg-slate-100 border-t flex items-center justify-between gap-4">
              <button
                disabled={lessonIndex === 0}
                onClick={() => setLessonIndex(prev => prev - 1)}
                className="px-5 py-2.5 bg-white border border-slate-300 font-bold rounded-xl text-slate-700 disabled:opacity-40 flex items-center gap-2 text-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Từ trước</span>
              </button>

              <span className="text-xs font-bold text-slate-500">
                {lessonIndex + 1} / {lessonWords.length}
              </span>

              <button
                disabled={lessonIndex + 1 >= lessonWords.length}
                onClick={() => setLessonIndex(prev => prev + 1)}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl disabled:opacity-40 flex items-center gap-2 text-sm shadow-sm"
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
