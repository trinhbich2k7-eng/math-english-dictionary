import React, { useState } from 'react';
import { MathWord, VoiceAccent } from '../types';
import { MATH_WORDS } from '../data/mathWords';
import { VocabularyCard } from './VocabularyCard';
import { speechService } from '../utils/speech';
import { BookOpen, Layers, Sparkles, CheckCircle2, ChevronRight, Volume2 } from 'lucide-react';

interface GradeCurriculumViewProps {
  initialGrade?: 1 | 2;
  accent: VoiceAccent;
  isSlow: boolean;
  favorites: string[];
  learnedWords: string[];
  onToggleFavorite: (id: string) => void;
  onToggleLearned: (id: string) => void;
  onTrackListen: (id: string) => void;
}

export const GradeCurriculumView: React.FC<GradeCurriculumViewProps> = ({
  initialGrade = 1,
  accent,
  isSlow,
  favorites,
  learnedWords,
  onToggleFavorite,
  onToggleLearned,
  onTrackListen
}) => {
  const [selectedGrade, setSelectedGrade] = useState<1 | 2>(initialGrade);
  const [activeSubtopic, setActiveSubtopic] = useState<string>('all');

  // Curriculum breakdown based on syllabus
  const grade1Subtopics = [
    { id: 'Counting', title: 'Counting (Đếm)', icon: '🔢', count: 5, desc: '5 từ: Count, Numbers, Digits, Sequence, Total' },
    { id: 'Addition and Subtraction', title: 'Addition and Subtraction (Phép cộng và Phép trừ)', icon: '➕', count: 13, desc: '13 từ: Add, Addition, Subtract, Subtraction, Sum, Difference, Equal to, Regroup...' },
    { id: 'Place Value', title: 'Place Value (Giá trị vị trí)', icon: '🧱', count: 6, desc: '6 từ: Place value, Tens, Ones, Hundreds, Units, Base-ten system' },
    { id: 'Measurement and Data', title: 'Measurement and Data (Đo lường và Dữ liệu)', icon: '📏', count: 16, desc: '16 từ: Length, Weight, Volume, Data, Chart, Graph, Measure, Measurement, Time...' },
    { id: 'Geometry', title: 'Geometry (Hình học)', icon: '📐', count: 14, desc: '14 từ: Geometry, Shape, Line, Perimeter, Area, Polygon, Circle, Square...' }
  ];

  const grade2Subtopics = [
    { id: 'Addition and Subtraction', title: 'Addition and Subtraction (Phép cộng và Phép trừ)', icon: '➕', count: 14, desc: '14 từ: Addition, Subtraction, Sum, Difference, Equal to, Regroup, Number line, Round...' },
    { id: 'Place Value', title: 'Place Value (Giá trị vị trí)', icon: '🧱', count: 16, desc: '16 từ: Place value, Tens, Ones, Hundreds, Units, Base-ten system, Digit, Pattern...' },
    { id: 'Measurement and Data', title: 'Measurement and Data (Đo lường và Dữ liệu)', icon: '📏', count: 18, desc: '18 từ: Length, Weight, Volume, Millimeter, Centimeter, Meter, Kilometer, Graphs...' },
    { id: 'Geometry', title: 'Geometry (Hình học)', icon: '📐', count: 16, desc: '16 từ: Geometry, Shape, Line, Angle, Perimeter, Area, Equal parts, Partition rectangles...' }
  ];

  const currentSubtopics = selectedGrade === 1 ? grade1Subtopics : grade2Subtopics;

  const wordsInGrade = MATH_WORDS.filter(w => w.grade === selectedGrade);
  const filteredWords = wordsInGrade.filter(w => {
    if (activeSubtopic === 'all') return true;
    return w.subtopic === activeSubtopic;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
          📚 LEARN BY GRADE
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-800">
          Chương trình Từ vựng theo Khối lớp
        </h1>
        <p className="text-sm text-slate-500">
          Hệ thống theo khung bài học Toán tiểu học song ngữ (KAV / Khan Academy)
        </p>
      </div>

      {/* Grade Selector Tabs */}
      <div className="flex justify-center">
        <div className="bg-white border-2 border-amber-200 rounded-3xl p-1.5 flex shadow-sm gap-2">
          <button
            id="grade-tab-1"
            onClick={() => {
              setSelectedGrade(1);
              setActiveSubtopic('all');
            }}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all ${
              selectedGrade === 1
                ? 'bg-amber-500 text-white shadow-md'
                : 'text-slate-600 hover:text-amber-600 hover:bg-amber-50'
            }`}
          >
            <span className="text-xl">🌟</span>
            <span>Grade 1 • Lớp 1</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/25 text-inherit">
              {MATH_WORDS.filter(w => w.grade === 1).length} từ
            </span>
          </button>

          <button
            id="grade-tab-2"
            onClick={() => {
              setSelectedGrade(2);
              setActiveSubtopic('all');
            }}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all ${
              selectedGrade === 2
                ? 'bg-sky-500 text-white shadow-md'
                : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50'
            }`}
          >
            <span className="text-xl">🚀</span>
            <span>Grade 2 • Lớp 2</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/25 text-inherit">
              {MATH_WORDS.filter(w => w.grade === 2).length} từ
            </span>
          </button>
        </div>
      </div>

      {/* Subtopics row */}
      <div className="bg-white border-2 border-amber-200/90 rounded-3xl p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
            Các chủ đề bài học theo sách lớp {selectedGrade}:
          </span>
          <span className="text-xs font-bold text-amber-700">
            {filteredWords.length} thuật ngữ
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          <button
            onClick={() => setActiveSubtopic('all')}
            className={`p-3 rounded-2xl border-2 text-left font-bold text-xs sm:text-sm transition-all flex items-center justify-between ${
              activeSubtopic === 'all'
                ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-amber-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <span>🌈</span>
              <span>Tất cả chủ đề Lớp {selectedGrade}</span>
            </div>
            <span className="text-xs opacity-75">({wordsInGrade.length})</span>
          </button>

          {currentSubtopics.map(sub => {
            const isSelected = activeSubtopic === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setActiveSubtopic(sub.id)}
                className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-amber-50 hover:border-amber-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-lg">{sub.icon}</span>
                    <span className="font-bold text-xs sm:text-sm truncate">{sub.title}</span>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    {sub.count} từ
                  </span>
                </div>
                <p className={`text-[11px] truncate ${isSelected ? 'text-amber-100' : 'text-slate-400'}`}>
                  {sub.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Vocabulary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredWords.map((word) => (
          <VocabularyCard
            key={word.id}
            word={word}
            accent={accent}
            isSlow={isSlow}
            isFavorite={favorites.includes(word.id)}
            isLearned={learnedWords.includes(word.id)}
            onToggleFavorite={onToggleFavorite}
            onToggleLearned={onToggleLearned}
            onTrackListen={onTrackListen}
          />
        ))}
      </div>
    </div>
  );
};
