import React, { useState, useEffect } from 'react';
import { VoiceAccent, TopicId, UserStats } from './types';
import { 
  getUserStats, 
  toggleFavoriteWord, 
  toggleLearnedWord, 
  recordWordListened, 
  recordQuizResult, 
  getPreferredVoiceAccent, 
  setPreferredVoiceAccent, 
  getSpeechSpeed, 
  setSpeechSpeed 
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { DictionaryView } from './components/DictionaryView';
import { GradeCurriculumView } from './components/GradeCurriculumView';
import { LearnFlashcards } from './components/LearnFlashcards';
import { GamesView } from './components/GamesView';
import { FavoritesView } from './components/FavoritesView';
import { TeacherCorner } from './components/TeacherCorner';
import { LearningDashboard } from './components/LearningDashboard';
import { Footer } from './components/Footer';
import confetti from 'canvas-confetti';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [accent, setAccent] = useState<VoiceAccent>(getPreferredVoiceAccent());
  const [isSlow, setIsSlow] = useState<boolean>(getSpeechSpeed());
  const [stats, setStats] = useState<UserStats>(getUserStats());

  // Cross-page navigation filters
  const [dictSearch, setDictSearch] = useState<string>('');
  const [dictTopic, setDictTopic] = useState<TopicId | 'all'>('all');
  const [dictGrade, setDictGrade] = useState<1 | 2 | 'all'>('all');
  const [curriculumGrade, setCurriculumGrade] = useState<1 | 2>(1);

  // Badge notification banner
  const [unlockedBadgeToast, setUnlockedBadgeToast] = useState<string | null>(null);

  const handleAccentChange = (newAccent: VoiceAccent) => {
    setAccent(newAccent);
    setPreferredVoiceAccent(newAccent);
  };

  const handleSlowToggle = () => {
    const next = !isSlow;
    setIsSlow(next);
    setSpeechSpeed(next);
  };

  const handleToggleFavorite = (wordId: string) => {
    const { stats: newStats } = toggleFavoriteWord(wordId);
    setStats(newStats);
  };

  const handleToggleLearned = (wordId: string) => {
    const { stats: newStats } = toggleLearnedWord(wordId);
    setStats(newStats);
  };

  const handleTrackListen = (wordId: string) => {
    const { stats: newStats } = recordWordListened(wordId);
    setStats(newStats);
  };

  const handleRecordQuizScore = (score: number, total: number) => {
    const { stats: newStats } = recordQuizResult(score, total);
    setStats(newStats);
  };

  // Listen for badge unlock events dispatched by storage
  useEffect(() => {
    const handleBadgeUnlocked = (e: CustomEvent<any>) => {
      const badge = e.detail;
      setUnlockedBadgeToast(`🎉 Chúc mừng! Bạn vừa mở khóa huy hiệu mới: ${badge.title} (${badge.titleVi})!`);
      try {
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      } catch (err) {}
      setTimeout(() => {
        setUnlockedBadgeToast(null);
      }, 5000);
    };

    window.addEventListener('badgeUnlocked', handleBadgeUnlocked as EventListener);
    return () => {
      window.removeEventListener('badgeUnlocked', handleBadgeUnlocked as EventListener);
    };
  }, []);

  // Quick navigation handlers from Home view
  const handleHomeSearchSelect = (query: string) => {
    setDictSearch(query);
    setDictTopic('all');
    setDictGrade('all');
    setActiveTab('dictionary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeTopicSelect = (topicId: TopicId) => {
    setDictSearch('');
    setDictTopic(topicId);
    setDictGrade('all');
    setActiveTab('dictionary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeGradeSelect = (grade: 1 | 2) => {
    setCurriculumGrade(grade);
    setActiveTab('grades');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF7] text-slate-800 font-sans selection:bg-amber-300 selection:text-amber-950">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        accent={accent}
        setAccent={handleAccentChange}
        isSlow={isSlow}
        setIsSlow={handleSlowToggle}
        favoritesCount={stats.favorites.length}
      />

      {/* Badge Unlocked Notification Toast */}
      {unlockedBadgeToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-amber-500 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full shadow-2xl border-2 border-white animate-bounce flex items-center gap-2">
          <span>{unlockedBadgeToast}</span>
        </div>
      )}

      {/* Main Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'home' && (
          <HomeView
            onSearchSelect={handleHomeSearchSelect}
            onTopicSelect={handleHomeTopicSelect}
            onGradeSelect={handleHomeGradeSelect}
            onNavigateTab={setActiveTab}
            accent={accent}
            isSlow={isSlow}
            favorites={stats.favorites}
            onToggleFavorite={handleToggleFavorite}
            onTrackListen={handleTrackListen}
          />
        )}

        {activeTab === 'dictionary' && (
          <DictionaryView
            initialSearch={dictSearch}
            initialTopic={dictTopic}
            initialGrade={dictGrade}
            accent={accent}
            isSlow={isSlow}
            favorites={stats.favorites}
            learnedWords={stats.wordsLearned}
            onToggleFavorite={handleToggleFavorite}
            onToggleLearned={handleToggleLearned}
            onTrackListen={handleTrackListen}
          />
        )}

        {activeTab === 'grades' && (
          <GradeCurriculumView
            initialGrade={curriculumGrade}
            accent={accent}
            isSlow={isSlow}
            favorites={stats.favorites}
            learnedWords={stats.wordsLearned}
            onToggleFavorite={handleToggleFavorite}
            onToggleLearned={handleToggleLearned}
            onTrackListen={handleTrackListen}
          />
        )}

        {activeTab === 'learn' && (
          <LearnFlashcards
            accent={accent}
            isSlow={isSlow}
            favorites={stats.favorites}
            learnedWords={stats.wordsLearned}
            onToggleFavorite={handleToggleFavorite}
            onToggleLearned={handleToggleLearned}
            onTrackListen={handleTrackListen}
          />
        )}

        {activeTab === 'games' && (
          <GamesView
            accent={accent}
            isSlow={isSlow}
            onRecordQuizScore={handleRecordQuizScore}
            onTrackListen={handleTrackListen}
          />
        )}

        {activeTab === 'favorites' && (
          <FavoritesView
            favorites={stats.favorites}
            learnedWords={stats.wordsLearned}
            accent={accent}
            isSlow={isSlow}
            onToggleFavorite={handleToggleFavorite}
            onToggleLearned={handleToggleLearned}
            onTrackListen={handleTrackListen}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'teacher' && (
          <TeacherCorner
            accent={accent}
            isSlow={isSlow}
            onTrackListen={handleTrackListen}
          />
        )}

        {activeTab === 'stats' && (
          <LearningDashboard
            stats={stats}
            onNavigateTab={setActiveTab}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigateTab={setActiveTab} />
    </div>
  );
}
