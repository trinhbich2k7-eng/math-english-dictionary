import React from 'react';
import { UserStats } from '../types';
import { BADGES, MATH_WORDS } from '../data/mathWords';
import { Trophy, Star, Volume2, Target, CheckCircle2, Award, Sparkles, BookOpen, Gamepad2 } from 'lucide-react';

interface LearningDashboardProps {
  stats: UserStats;
  onNavigateTab: (tab: string) => void;
}

export const LearningDashboard: React.FC<LearningDashboardProps> = ({
  stats,
  onNavigateTab
}) => {
  const totalWords = MATH_WORDS.length;
  const learnedCount = stats.wordsLearned.length;
  const listenedCount = stats.wordsListened.length;

  // Calculate average quiz score
  const totalQuizQuestions = stats.quizScores.reduce((acc, curr) => acc + curr.total, 0);
  const totalQuizCorrect = stats.quizScores.reduce((acc, curr) => acc + curr.score, 0);
  const quizPercentage = totalQuizQuestions > 0 ? Math.round((totalQuizCorrect / totalQuizQuestions) * 100) : 85;

  // Overall progress
  const progressPercent = Math.min(100, Math.round(((learnedCount + (listenedCount * 0.5)) / totalWords) * 100));

  // Determine learner title
  let rankTitle = 'Tập sự Toán học (Math Novice)';
  if (stats.badges.length >= 4) {
    rankTitle = 'Đại hiệp Toán Tiếng Anh (Math Champion)';
  } else if (stats.badges.length >= 2) {
    rankTitle = 'Nhà thám hiểm Toán học (Math Explorer)';
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
          📊 MY LEARNING
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-800">
          Tiến Trình Học Tập Của Em
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Theo dõi số từ đã học, điểm số trò chơi và bộ sưu tập huy hiệu vinh danh!
        </p>
      </div>

      {/* Hero Achievement Rank Card */}
      <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5 text-center sm:text-left">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center text-4xl shadow-inner shrink-0 border border-white/30">
            🏆
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-100">
              Danh hiệu hiện tại
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold">
              {rankTitle}
            </h2>
            <p className="text-xs sm:text-sm text-amber-100">
              Đã mở khóa <strong className="text-white font-extrabold">{stats.badges.length}</strong> / {BADGES.length} huy hiệu danh giá!
            </p>
          </div>
        </div>

        {/* Big Circular/Bar Progress */}
        <div className="w-full sm:w-60 bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center space-y-2">
          <div className="flex items-center justify-between text-xs font-extrabold">
            <span>Tiến trình hoàn thành:</span>
            <span className="text-yellow-200 text-sm">{progressPercent}%</span>
          </div>
          <div className="w-full h-3.5 bg-black/20 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-yellow-300 to-amber-200 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[11px] text-amber-100">Your progress: {progressPercent}%</p>
        </div>
      </div>

      {/* 4 Core Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric 1: Words Learned */}
        <div className="bg-white border-2 border-emerald-200 rounded-3xl p-5 text-center shadow-xs space-y-1">
          <div className="w-12 h-12 mx-auto bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-2">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase">Words learned</span>
          <div className="font-heading text-3xl sm:text-4xl font-extrabold text-emerald-700">
            {learnedCount}
          </div>
          <p className="text-xs text-slate-500">Từ đã ghi nhớ</p>
        </div>

        {/* Metric 2: Words Listened */}
        <div className="bg-white border-2 border-sky-200 rounded-3xl p-5 text-center shadow-xs space-y-1">
          <div className="w-12 h-12 mx-auto bg-sky-100 text-sky-700 rounded-2xl flex items-center justify-center mb-2">
            <Volume2 className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase">Words listened</span>
          <div className="font-heading text-3xl sm:text-4xl font-extrabold text-sky-700">
            {listenedCount}
          </div>
          <p className="text-xs text-slate-500">Lượt nghe phát âm</p>
        </div>

        {/* Metric 3: Quiz Score */}
        <div className="bg-white border-2 border-purple-200 rounded-3xl p-5 text-center shadow-xs space-y-1">
          <div className="w-12 h-12 mx-auto bg-purple-100 text-purple-700 rounded-2xl flex items-center justify-center mb-2">
            <Target className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase">Quiz score</span>
          <div className="font-heading text-3xl sm:text-4xl font-extrabold text-purple-700">
            {quizPercentage}%
          </div>
          <p className="text-xs text-slate-500">Độ chính xác Quiz</p>
        </div>

        {/* Metric 4: Favorites */}
        <div className="bg-white border-2 border-amber-200 rounded-3xl p-5 text-center shadow-xs space-y-1">
          <div className="w-12 h-12 mx-auto bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mb-2">
            <Star className="w-6 h-6 fill-amber-500 text-amber-500" />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase">My Favorites</span>
          <div className="font-heading text-3xl sm:text-4xl font-extrabold text-amber-700">
            {stats.favorites.length}
          </div>
          <p className="text-xs text-slate-500">Từ yêu thích</p>
        </div>
      </div>

      {/* BADGES COLLECTION */}
      <div className="bg-white border-2 border-amber-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="font-heading text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-500" />
              <span>Hệ thống Huy Hiệu Thành Tích</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Hoàn thành các mốc học tập để mở khóa huy hiệu lấp lánh!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BADGES.map((badge) => {
            const isUnlocked = stats.badges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-5 rounded-3xl border-2 transition-all flex items-start gap-4 ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-amber-50 to-orange-50/40 border-amber-300 shadow-sm'
                    : 'bg-slate-50/80 border-slate-200 opacity-50 grayscale'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${
                  isUnlocked ? 'bg-amber-100 shadow-xs' : 'bg-slate-200'
                }`}>
                  {badge.icon}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-base text-slate-800">
                      {badge.title}
                    </h3>
                    {isUnlocked && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.5 rounded-md">
                        ĐÃ ĐẠT ✓
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-amber-800">
                    {badge.titleVi}
                  </p>
                  <p className="text-xs text-slate-500">
                    {badge.description}
                  </p>
                  <p className="text-[11px] font-bold text-slate-400 mt-1">
                    Mục tiêu: {badge.requirement}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Action Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <button
          onClick={() => onNavigateTab('learn')}
          className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold rounded-2xl shadow-sm text-sm flex items-center gap-2"
        >
          <BookOpen className="w-4 h-4" />
          <span>Tiếp tục học với Flashcards</span>
        </button>

        <button
          onClick={() => onNavigateTab('games')}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl shadow-sm text-sm flex items-center gap-2"
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Chơi Game thử thách mới</span>
        </button>
      </div>
    </div>
  );
};
