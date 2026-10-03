import React from 'react';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  return (
    <footer className="bg-white border-t-2 border-amber-200 mt-20 pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-amber-100 text-center md:text-left">
          {/* Brand info */}
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <span className="text-3xl">🔢</span>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-slate-800">
                MATH ENGLISH DICTIONARY
              </span>
            </div>
            <p className="text-sm font-bold text-amber-600">
              “Learn Math. Learn English. Have Fun!”
            </p>
            <p className="text-xs text-slate-500 max-w-md">
              Từ điển Toán – Tiếng Anh trực quan chuẩn ngữ âm và hình ảnh dành cho học sinh tiểu học, giáo viên và phụ huynh.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-bold text-slate-600">
            <button
              onClick={() => { onNavigateTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-amber-600 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => { onNavigateTab('dictionary'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-amber-600 transition-colors"
            >
              Dictionary
            </button>
            <button
              onClick={() => { onNavigateTab('grades'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-amber-600 transition-colors"
            >
              Grades (Lớp 1 – 2)
            </button>
            <button
              onClick={() => { onNavigateTab('learn'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-amber-600 transition-colors"
            >
              Learn (Flashcards)
            </button>
            <button
              onClick={() => { onNavigateTab('games'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-amber-600 transition-colors"
            >
              Games
            </button>
            <button
              onClick={() => { onNavigateTab('favorites'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-amber-600 transition-colors"
            >
              Favorites
            </button>
            <button
              onClick={() => { onNavigateTab('teacher'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-amber-600 transition-colors"
            >
              Góc Giáo viên
            </button>
            <button
              onClick={() => { onNavigateTab('stats'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-amber-600 transition-colors"
            >
              My Learning
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Math English Dictionary. Thiết kế thân thiện cho học sinh tiểu học.</p>
          <div className="flex items-center gap-4">
            <span>🇺🇸 American & 🇬🇧 British Speech</span>
            <span>•</span>
            <span>Dựa trên khung bài học Khan Academy KAV</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
