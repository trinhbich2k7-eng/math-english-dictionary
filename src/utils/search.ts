import { MathWord } from '../types';

// Levenshtein distance for fuzzy matching typos
export const getLevenshteinDistance = (a: string, b: string): number => {
  const an = a ? a.length : 0;
  const bn = b ? b.length : 0;
  if (an === 0) return bn;
  if (bn === 0) return an;
  const matrix: number[][] = [];

  for (let i = 0; i <= bn; ++i) {
    matrix[i] = [i];
  }
  for (let i = 0; i <= an; ++i) {
    matrix[0][i] = i;
  }

  for (let i = 1; i <= bn; ++i) {
    for (let j = 1; j <= an; ++j) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[bn][an];
};

// Normalize string removing Vietnamese tone marks for accent-insensitive search
export const removeVietnameseTones = (str: string): string => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();
};

export interface SearchResult {
  exactMatches: MathWord[];
  didYouMean: string | null;
}

export const searchMathWords = (query: string, allWords: MathWord[]): SearchResult => {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    return { exactMatches: allWords, didYouMean: null };
  }

  const normalizedQuery = removeVietnameseTones(trimmed);

  // 1. Direct and substring matches
  const matches = allWords.filter(item => {
    const wordEn = item.word.toLowerCase();
    const wordVi = item.meaning.toLowerCase();
    const normalizedVi = removeVietnameseTones(item.meaning);
    const defEn = item.definitionEn.toLowerCase();
    const defVi = removeVietnameseTones(item.definitionVi);

    return (
      wordEn.includes(trimmed) ||
      wordVi.includes(trimmed) ||
      normalizedVi.includes(normalizedQuery) ||
      defEn.includes(trimmed) ||
      defVi.includes(normalizedQuery) ||
      item.relatedWords.some(r => r.toLowerCase().includes(trimmed))
    );
  });

  // Sort exact start matches first
  matches.sort((a, b) => {
    const aEnStart = a.word.toLowerCase().startsWith(trimmed);
    const bEnStart = b.word.toLowerCase().startsWith(trimmed);
    if (aEnStart && !bEnStart) return -1;
    if (!aEnStart && bEnStart) return 1;
    return 0;
  });

  // 2. If no direct match or few matches, check for typos with Levenshtein distance
  let didYouMean: string | null = null;
  if (matches.length === 0 && trimmed.length >= 3) {
    let closestWord: string | null = null;
    let minDistance = 99;

    for (const item of allWords) {
      const enDist = getLevenshteinDistance(trimmed, item.word.toLowerCase());
      if (enDist <= 2 && enDist < minDistance) {
        minDistance = enDist;
        closestWord = item.word;
      }

      const viNorm = removeVietnameseTones(item.meaning);
      const viDist = getLevenshteinDistance(normalizedQuery, viNorm);
      if (viDist <= 2 && viDist < minDistance) {
        minDistance = viDist;
        closestWord = item.word;
      }
    }

    if (closestWord && minDistance <= 2) {
      didYouMean = closestWord;
    }
  }

  return { exactMatches: matches, didYouMean };
};
