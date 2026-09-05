export type TopicId =
  | 'numbers'
  | 'addition'
  | 'subtraction'
  | 'multiplication'
  | 'division'
  | 'shapes'
  | 'measurement'
  | 'time'
  | 'money'
  | 'data'
  | 'fractions';

export interface MathWord {
  id: string;
  word: string;
  meaning: string;
  ipa: string;
  topic: TopicId;
  grade: 1 | 2;
  grades?: (1 | 2)[];
  subtopic: string;
  definitionEn: string;
  definitionVi: string;
  example: string;
  exampleVi: string;
  relatedWords: string[];
  illustrationType: string;
  visualData?: Record<string, any>;
}

export interface TopicInfo {
  id: TopicId;
  nameEn: string;
  nameVi: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}

export type VoiceAccent = 'en-US' | 'en-GB';

export interface UserStats {
  wordsLearned: string[];
  wordsListened: string[];
  favorites: string[];
  quizScores: { date: string; score: number; total: number }[];
  gamesPlayed: number;
  badges: string[];
}

export interface Badge {
  id: string;
  title: string;
  titleVi: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  requirement: string;
}
