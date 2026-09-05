import { UserStats, VoiceAccent } from '../types';
import { BADGES } from '../data/mathWords';

const STORAGE_KEY = 'math_english_dict_user_stats';
const ACCENT_STORAGE_KEY = 'math_english_dict_accent';
const SPEED_STORAGE_KEY = 'math_english_dict_slow_speed';

const defaultStats: UserStats = {
  wordsLearned: ['triangle', 'addition', 'circle'],
  wordsListened: ['triangle', 'circle', 'addition', 'square', 'numbers'],
  favorites: ['triangle', 'addition'],
  quizScores: [
    { date: new Date().toISOString(), score: 4, total: 5 }
  ],
  gamesPlayed: 3,
  badges: ['first-word', 'math-explorer']
};

export const getStoredStats = (): UserStats => {
  if (typeof window === 'undefined') return defaultStats;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultStats));
      return defaultStats;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading localStorage:', e);
    return defaultStats;
  }
};

export const getUserStats = getStoredStats;

export const saveStats = (stats: UserStats): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Error writing to localStorage:', e);
  }
};

export const checkAndUpdateBadges = (stats: UserStats): { updatedStats: UserStats; newlyUnlocked: string[] } => {
  const currentBadges = new Set(stats.badges);
  const newlyUnlocked: string[] = [];

  // 1. First Word
  if (stats.wordsListened.length >= 1 || stats.wordsLearned.length >= 1) {
    if (!currentBadges.has('first-word')) {
      currentBadges.add('first-word');
      newlyUnlocked.push('first-word');
    }
  }

  // 2. Math Explorer (Listened to 5+ words)
  if (stats.wordsListened.length >= 5) {
    if (!currentBadges.has('math-explorer')) {
      currentBadges.add('math-explorer');
      newlyUnlocked.push('math-explorer');
    }
  }

  // 3. Shape Master (Learned 4+ shape words)
  const shapeWords = ['triangle', 'circle', 'square', 'rectangle', 'oval', 'diamond', 'star', 'heart', 'cube', 'sphere'];
  const learnedShapes = stats.wordsLearned.filter(w => shapeWords.includes(w));
  if (learnedShapes.length >= 4) {
    if (!currentBadges.has('shape-master')) {
      currentBadges.add('shape-master');
      newlyUnlocked.push('shape-master');
    }
  }

  // 4. Number Master (Learned 5+ number/addition/subtraction words)
  const numberWords = ['count', 'numbers', 'digits', 'addition', 'add', 'subtraction', 'sum', 'difference', 'tens', 'ones'];
  const learnedNumbers = stats.wordsLearned.filter(w => numberWords.includes(w));
  if (learnedNumbers.length >= 5) {
    if (!currentBadges.has('number-master')) {
      currentBadges.add('number-master');
      newlyUnlocked.push('number-master');
    }
  }

  // 5. Vocabulary Star (High quiz score > 80%)
  const hasHighScore = stats.quizScores.some(q => q.total > 0 && (q.score / q.total) >= 0.8);
  if (hasHighScore) {
    if (!currentBadges.has('vocabulary-star')) {
      currentBadges.add('vocabulary-star');
      newlyUnlocked.push('vocabulary-star');
    }
  }

  const updatedStats: UserStats = {
    ...stats,
    badges: Array.from(currentBadges)
  };

  saveStats(updatedStats);

  // Notify UI of new badges
  if (newlyUnlocked.length > 0 && typeof window !== 'undefined') {
    newlyUnlocked.forEach(badgeId => {
      const badgeInfo = BADGES.find(b => b.id === badgeId);
      if (badgeInfo) {
        window.dispatchEvent(new CustomEvent('badgeUnlocked', { detail: badgeInfo }));
      }
    });
  }

  return { updatedStats, newlyUnlocked };
};

export const toggleFavoriteWord = (wordId: string): { stats: UserStats; isFavorite: boolean } => {
  const current = getStoredStats();
  const exists = current.favorites.includes(wordId);
  const nextFavorites = exists
    ? current.favorites.filter(id => id !== wordId)
    : [...current.favorites, wordId];

  const updated: UserStats = { ...current, favorites: nextFavorites };
  saveStats(updated);
  return { stats: updated, isFavorite: !exists };
};

export const toggleLearnedWord = (wordId: string): { stats: UserStats; isLearned: boolean } => {
  const current = getStoredStats();
  const exists = current.wordsLearned.includes(wordId);
  const nextLearned = exists
    ? current.wordsLearned.filter(id => id !== wordId)
    : [...current.wordsLearned, wordId];

  const updated: UserStats = { ...current, wordsLearned: nextLearned };
  const { updatedStats } = checkAndUpdateBadges(updated);
  return { stats: updatedStats, isLearned: !exists };
};

export const recordWordListened = (wordId: string): { stats: UserStats } => {
  const current = getStoredStats();
  if (!current.wordsListened.includes(wordId)) {
    const updated: UserStats = {
      ...current,
      wordsListened: [...current.wordsListened, wordId]
    };
    const { updatedStats } = checkAndUpdateBadges(updated);
    return { stats: updatedStats };
  }
  return { stats: current };
};

export const recordQuizResult = (score: number, total: number): { stats: UserStats } => {
  const current = getStoredStats();
  const updated: UserStats = {
    ...current,
    gamesPlayed: current.gamesPlayed + 1,
    quizScores: [
      ...current.quizScores,
      { date: new Date().toISOString(), score, total }
    ]
  };
  const { updatedStats } = checkAndUpdateBadges(updated);
  return { stats: updatedStats };
};

export const getPreferredVoiceAccent = (): VoiceAccent => {
  if (typeof window === 'undefined') return 'en-US';
  const val = localStorage.getItem(ACCENT_STORAGE_KEY);
  if (val === 'en-GB' || val === 'en-US') return val;
  return 'en-US';
};

export const setPreferredVoiceAccent = (accent: VoiceAccent): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACCENT_STORAGE_KEY, accent);
};

export const getSpeechSpeed = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(SPEED_STORAGE_KEY) === 'true';
};

export const setSpeechSpeed = (isSlow: boolean): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SPEED_STORAGE_KEY, String(isSlow));
};
