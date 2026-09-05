import React, { useState } from 'react';
import { VoiceAccent } from '../types';
import { 
  BookOpen, 
  Home, 
  GraduationCap, 
  Gamepad2, 
  Star, 
  UserCheck, 
  BarChart2, 
  Menu, 
  X, 
  Volume2, 
  Sparkles,
  Layers
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  accent: VoiceAccent;
  setAccent: (accent: VoiceAccent) => void;
  isSlow: boolean;
  setIsSlow: (slow: boolean) => void;
  favoritesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  accent,
  setAccent,
  isSlow,
  setIsSlow,
  favoritesCount
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: Home, badge: null },
    { id: 'dictionary', label: 'Từ điển', icon: BookOpen, badge: null },
    { id: 'grades', label: 'Lớp 1 – 2', icon: Layers, badge: 'Mới' },
    { id: 'learn', label: 'Học từ', icon: GraduationCap, badge: null },
    { id: 'games', label: 'Trò chơi', icon: Gamepad2, badge: '3 Game' },
    { id: 'favorites', label: 'Yêu thích', icon: Star, badge: favoritesCount > 0 ? favoritesCount : null },
    { id: 'teacher', label: 'Giáo viên', icon: UserCheck, badge: 'Lên lớp' },
    { id: 'stats', label: 'Tiến trình', icon: BarChart2, badge: null },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-amber-200/80 shadow-xs">
      {/* Top micro-bar with Voice & Speed Controls */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white px-4 py-1 text-xs sm:text-sm font-medium flex items-center justify-between shadow-inner">
        <div className="flex items-center gap-1.5 truncate">
          <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-pulse hidden sm:inline" />
          <span className="truncate">🌟 Khám phá thế giới Toán học song ngữ qua hình ảnh & âm thanh sinh động!</span>
        </div>
        
        {/* Audio control pills */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center bg-black/20 rounded-full p-0.5 border border-white/20">
            <button
              id="accent-us-btn"
              onClick={() => setAccent('en-US')}
              className={`px-2 py-0.5 rounded-full text-xs font-semibold transition-all ${
                accent === 'en-US' ? 'bg-white text-orange-600 shadow-xs' : 'text-white/80 hover:text-white'
              }`}
              title="Phát âm tiếng Anh - Mỹ"
            >
              🇺🇸 US
            </button>
            <button
              id="accent-uk-btn"
              onClick={() => setAccent('en-GB')}
              className={`px-2 py-0.5 rounded-full text-xs font-semibold transition-all ${
                accent === 'en-GB' ? 'bg-white text-orange-600 shadow-xs' : 'text-white/80 hover:text-white'
              }`}
              title="Phát âm tiếng Anh - Anh"
            >
              🇬🇧 UK
            </button>
          </div>

          <button
            id="slow-speech-toggle"
            onClick={() => setIsSlow(!isSlow)}
            className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all ${
              isSlow
                ? 'bg-yellow-300 text-yellow-950 font-bold shadow-xs scale-105'
                : 'bg-black/20 text-white/90 hover:bg-black/30'
            }`}
            title="Bật/Tắt phát âm chậm cho trẻ nhỏ"
          >
            <span>🐢</span>
            <span className="hidden sm:inline">{isSlow ? 'Phát chậm: BẬT' : 'Phát chậm: TẮT'}</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <div 
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-2xl shadow-md group-hover:rotate-6 transition-transform">
              🔢
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-xl sm:text-2xl tracking-tight text-slate-800 group-hover:text-amber-600 transition-colors">
                  MATH ENGLISH
                </span>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                  KIDS
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Từ điển Toán – Tiếng Anh trực quan tiểu học
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => handleTabClick(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25 scale-102'
                      : 'text-slate-600 hover:text-amber-600 hover:bg-amber-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.badge !== null && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                        isActive
                          ? 'bg-white text-amber-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-amber-100 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center justify-between p-3 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-700 hover:bg-amber-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== null && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/25 text-inherit">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
