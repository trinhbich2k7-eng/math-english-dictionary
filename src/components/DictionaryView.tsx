import React, { useState, useMemo } from 'react';
import { MathWord, TopicId, VoiceAccent } from '../types';
import { TOPICS, MATH_WORDS } from '../data/mathWords';
import { VocabularyCard } from './VocabularyCard';
import { searchMathWords } from '../utils/search';
import { 
  Search, 
  Filter, 
  Sparkles, 
  Layers, 
  RotateCcw, 
  HelpCircle,
  LayoutGrid,
  List,
  Volume2
} from 'lucide-react';

interface DictionaryViewProps {
  initialSearch?: string;
  initialTopic?: TopicId | 'all';
  initialGrade?: 1 | 2 | 'all';
  accent: VoiceAccent;
  isSlow: boolean;
  favorites: string[];
  learnedWords: string[];
  onToggleFavorite: (id: string) => void;
  onToggleLearned: (id: string) => void;
  onTrackListen: (id: string) => void;
}

export const DictionaryView: React.FC<DictionaryViewProps> = ({
  initialSearch = '',
  initialTopic = 'all',
  initialGrade = 'all',
  accent,
  isSlow,
  favorites,
  learnedWords,
  onToggleFavorite,
  onToggleLearned,
  onTrackListen
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedTopic, setSelectedTopic] = useState<TopicId | 'all'>(initialTopic);
  const [selectedGrade, setSelectedGrade] = useState<1 | 2 | 'all'>(initialGrade);
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [sortBy, setSortBy] = useState<'alphabetical' | 'grade' | 'topic'>('alphabetical');

  // Search & filter
  const { exactMatches, didYouMean } = useMemo(() => {
    return searchMathWords(searchQuery, MATH_WORDS);
  }, [searchQuery]);

  const filteredWords = useMemo(() => {
    return exactMatches.filter(word => {
      const matchTopic = selectedTopic === 'all' || word.topic === selectedTopic;
      const matchGrade =
        selectedGrade === 'all' ||
        word.grade === selectedGrade ||
        Boolean(word.grades?.includes(selectedGrade as 1 | 2));
      return matchTopic && matchGrade;
    }).sort((a, b) => {
      if (sortBy === 'alphabetical') {
        return a.word.localeCompare(b.word);
      }
      if (sortBy === 'grade') {
        return a.grade - b.grade;
      }
      return a.topic.localeCompare(b.topic);
    });
  }, [exactMatches, selectedTopic, selectedGrade, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedTopic('all');
    setSelectedGrade('all');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
          📖 Từ điển Toán học Trực quan
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-800">
          Tra cứu thuật ngữ Toán – Tiếng Anh
        </h1>
        <p className="text-sm text-slate-500">
          Hỗ trợ tra cứu 2 chiều Anh ↔ Việt, phát âm chuẩn bản ngữ và hình minh họa trực quan
        </p>
      </div>

      {/* Main Search Bar & Controls Box */}
      <div className="bg-white border-2 border-amber-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
        {/* Search Input */}
        <div className="relative">
          <input
            id="dict-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a math word... (e.g. addition, subtraction, hình tam giác, số chẵn)"
            className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 text-base sm:text-lg rounded-2xl pl-12 pr-12 py-3.5 border-2 border-slate-200 focus:bg-white focus:outline-hidden focus:ring-4 focus:ring-amber-200 focus:border-amber-400 transition-all"
          />
          <Search className="w-5 h-5 text-amber-500 absolute left-4 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-sm font-bold bg-slate-200 hover:bg-slate-300 w-6 h-6 rounded-full flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          )}
        </div>

        {/* Typo suggestion "Did you mean...?" */}
        {didYouMean && (
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 flex items-center gap-2 text-sm text-amber-900 animate-fadeIn">
            <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Có phải bạn muốn tìm: </span>
            <button
              onClick={() => setSearchQuery(didYouMean)}
              className="font-bold underline text-amber-700 hover:text-amber-900 cursor-pointer"
            >
              "{didYouMean}"?
            </button>
          </div>
        )}

        {/* Filter Pills */}
        <div className="space-y-3 pt-2">
          {/* Grade filter */}
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            <span className="font-bold text-slate-600 flex items-center gap-1">
              <Layers className="w-4 h-4 text-amber-500" />
              Khối lớp:
            </span>
            <button
              onClick={() => setSelectedGrade('all')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                selectedGrade === 'all'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-amber-100'
              }`}
            >
              Tất cả lớp
            </button>
            <button
              onClick={() => setSelectedGrade(1)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                selectedGrade === 1
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-amber-100'
              }`}
            >
              🌟 Lớp 1 (Grade 1)
            </button>
            <button
              onClick={() => setSelectedGrade(2)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                selectedGrade === 2
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-amber-100'
              }`}
            >
              🚀 Lớp 2 (Grade 2)
            </button>
          </div>

          {/* Topic filter chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="font-bold text-slate-600 text-xs sm:text-sm mr-1">Chủ đề:</span>
            <button
              onClick={() => setSelectedTopic('all')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                selectedTopic === 'all'
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tất cả ({MATH_WORDS.length})
            </button>
            {TOPICS.map((topic) => {
              const isSelected = selectedTopic === topic.id;
              const count = MATH_WORDS.filter(w => w.topic === topic.id).length;
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-amber-100'
                  }`}
                >
                  <span>{topic.icon}</span>
                  <span>{topic.nameEn}</span>
                  <span className="text-[10px] opacity-75">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Sort & View mode bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Sắp xếp:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-100 border border-slate-200 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-700 focus:outline-hidden"
              >
                <option value="alphabetical">Chữ cái (A - Z)</option>
                <option value="grade">Theo khối lớp (1 - 2)</option>
                <option value="topic">Theo nhóm chủ đề</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">
                Tìm thấy <strong className="text-amber-600">{filteredWords.length}</strong> từ
              </span>
              {(searchQuery || selectedTopic !== 'all' || selectedGrade !== 'all') && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Đặt lại</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Words Grid / List */}
      {filteredWords.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-amber-200 rounded-3xl p-12 text-center max-w-md mx-auto space-y-4">
          <div className="text-5xl">🔍</div>
          <h3 className="font-heading text-xl font-bold text-slate-800">
            Không tìm thấy từ vựng phù hợp
          </h3>
          <p className="text-sm text-slate-500">
            Bạn có thể thử tìm bằng tiếng Anh hoặc tiếng Việt, hoặc kiểm tra lại chính tả nhé!
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-sm rounded-xl transition-all shadow-xs"
          >
            Hiển thị tất cả từ vựng
          </button>
        </div>
      ) : (
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
              onSelectRelated={(relatedWord) => setSearchQuery(relatedWord)}
              onTrackListen={onTrackListen}
            />
          ))}
        </div>
      )}
    </div>
  );
};
