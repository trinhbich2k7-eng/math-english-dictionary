import React, { useState } from 'react';
import { MathWord, VoiceAccent } from '../types';
import { MATH_WORDS } from '../data/mathWords';
import { VocabularyCard } from './VocabularyCard';
import { Star, Search, Trash2, Volume2, BookOpen } from 'lucide-react';

interface FavoritesViewProps {
  favorites: string[];
  learnedWords: string[];
  accent: VoiceAccent;
  isSlow: boolean;
  onToggleFavorite: (id: string) => void;
  onToggleLearned: (id: string) => void;
  onTrackListen: (id: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favorites,
  learnedWords,
  accent,
  isSlow,
  onToggleFavorite,
  onToggleLearned,
  onTrackListen,
  onNavigateTab
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  const favoriteWords = MATH_WORDS.filter(w => favorites.includes(w.id));
  const displayedWords = favoriteWords.filter(w => {
    if (!filterQuery.trim()) return true;
    const q = filterQuery.toLowerCase();
    return w.word.toLowerCase().includes(q) || w.meaning.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
          ⭐ MY WORDS
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-800">
          Từ Vựng Yêu Thích Của Em
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Nơi lưu giữ các từ vựng Toán tiếng Anh em muốn ghi nhớ và nghe lại thường xuyên
        </p>
      </div>

      {favoriteWords.length > 0 && (
        <div className="max-w-md mx-auto relative">
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Lọc từ trong danh sách yêu thích..."
            className="w-full bg-white text-slate-800 text-sm rounded-2xl pl-10 pr-4 py-3 border-2 border-amber-200 focus:outline-hidden focus:ring-2 focus:ring-amber-300"
          />
          <Search className="w-4 h-4 text-amber-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
      )}

      {favoriteWords.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-amber-300 rounded-3xl p-12 text-center max-w-md mx-auto space-y-4">
          <div className="text-6xl">⭐</div>
          <h3 className="font-heading text-xl font-bold text-slate-800">
            Chưa có từ nào trong danh sách yêu thích
          </h3>
          <p className="text-sm text-slate-500">
            Khi tra cứu từ điển, hãy bấm vào biểu tượng ngôi sao ⭐ trên thẻ từ để lưu lại và ôn tập bất cứ lúc nào!
          </p>
          <button
            onClick={() => onNavigateTab('dictionary')}
            className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-sm rounded-2xl transition-all shadow-md"
          >
            Khám phá từ điển ngay
          </button>
        </div>
      ) : displayedWords.length === 0 ? (
        <div className="text-center py-10 text-slate-500 text-sm">
          Không tìm thấy từ nào khớp với từ khóa tìm kiếm.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedWords.map(word => (
            <VocabularyCard
              key={word.id}
              word={word}
              accent={accent}
              isSlow={isSlow}
              isFavorite={true}
              isLearned={learnedWords.includes(word.id)}
              onToggleFavorite={onToggleFavorite}
              onToggleLearned={onToggleLearned}
              onTrackListen={onTrackListen}
            />
          ))}
        </div>
      )}
    </div>
  );
};
