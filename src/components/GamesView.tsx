import React, { useState, useEffect } from 'react';
import { MathWord, VoiceAccent } from '../types';
import { MATH_WORDS } from '../data/mathWords';
import { MathIllustration } from './MathIllustration';
import { speechService } from '../utils/speech';
import confetti from 'canvas-confetti';
import { 
  Gamepad2, 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Trophy, 
  Sparkles, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';

interface GamesViewProps {
  accent: VoiceAccent;
  isSlow: boolean;
  onRecordQuizScore: (score: number, total: number) => void;
  onTrackListen: (id: string) => void;
}

export const GamesView: React.FC<GamesViewProps> = ({
  accent,
  isSlow,
  onRecordQuizScore,
  onTrackListen
}) => {
  const [activeGame, setActiveGame] = useState<'match' | 'listen-choose' | 'quiz'>('match');

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {
      // ignore in iframe if canvas fails
    }
  };

  // ==========================================
  // GAME 1: MATCH THE WORD
  // ==========================================
  const matchCandidates: { word: string; meaning: string; symbol: string; illustrationType: string }[] = [
    { word: 'triangle', meaning: 'hình tam giác', symbol: '🔺', illustrationType: 'shape-triangle' },
    { word: 'circle', meaning: 'hình tròn', symbol: '⚪', illustrationType: 'shape-circle' },
    { word: 'square', meaning: 'hình vuông', symbol: '🟦', illustrationType: 'shape-square' },
    { word: 'rectangle', meaning: 'hình chữ nhật', symbol: '🟨', illustrationType: 'shape-rectangle' },
    { word: 'star', meaning: 'hình ngôi sao', symbol: '⭐', illustrationType: 'shape-star' },
    { word: 'heart', meaning: 'hình trái tim', symbol: '❤️', illustrationType: 'shape-heart' },
    { word: 'addition', meaning: 'phép cộng', symbol: '➕', illustrationType: 'addition-calc' },
    { word: 'subtraction', meaning: 'phép trừ', symbol: '➖', illustrationType: 'subtraction-calc' },
    { word: 'clock', meaning: 'đồng hồ', symbol: '⏰', illustrationType: 'clock-face' },
    { word: 'coin', meaning: 'đồng xu', symbol: '🪙', illustrationType: 'coin-gold' }
  ];

  const [matchPairs, setMatchPairs] = useState<typeof matchCandidates>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [matchedWords, setMatchedWords] = useState<string[]>([]);
  const [matchFeedback, setMatchFeedback] = useState<string | null>(null);

  const initMatchGame = () => {
    // Pick 5 random items
    const shuffled = [...matchCandidates].sort(() => 0.5 - Math.random()).slice(0, 5);
    setMatchPairs(shuffled);
    setSelectedWord(null);
    setSelectedSymbol(null);
    setMatchedWords([]);
    setMatchFeedback(null);
  };

  useEffect(() => {
    if (activeGame === 'match') {
      initMatchGame();
    }
  }, [activeGame]);

  const handleMatchCheck = (word: string, symbol: string) => {
    const pair = matchPairs.find(p => p.word === word);
    if (pair && pair.symbol === symbol) {
      // Correct match!
      setMatchedWords(prev => {
        const next = [...prev, word];
        if (next.length === matchPairs.length) {
          triggerConfetti();
          setMatchFeedback('🎉 Great job! Bạn đã ghép đúng tất cả các từ!');
        } else {
          setMatchFeedback('✨ Đúng rồi! Tuyệt vời!');
        }
        return next;
      });
      setSelectedWord(null);
      setSelectedSymbol(null);
    } else {
      // Wrong match
      setMatchFeedback('❌ Chưa đúng rồi, thử lại nhé!');
      setTimeout(() => {
        setSelectedWord(null);
        setSelectedSymbol(null);
        setMatchFeedback(null);
      }, 900);
    }
  };

  // Shuffled symbols for the right column
  const shuffledSymbols = React.useMemo(() => {
    return [...matchPairs].sort((a, b) => a.symbol.localeCompare(b.symbol));
  }, [matchPairs]);

  // ==========================================
  // GAME 2: LISTEN & CHOOSE
  // ==========================================
  const listenPool = MATH_WORDS.slice(0, 30);
  const [listenRound, setListenRound] = useState(0);
  const [listenTarget, setListenTarget] = useState<MathWord>(listenPool[0]);
  const [listenOptions, setListenOptions] = useState<MathWord[]>([]);
  const [listenResult, setListenResult] = useState<'correct' | 'wrong' | null>(null);
  const [listenScore, setListenScore] = useState(0);

  const setupListenRound = () => {
    const target = listenPool[Math.floor(Math.random() * listenPool.length)];
    const otherPool = listenPool.filter(w => w.id !== target.id);
    const shuffledOthers = [...otherPool].sort(() => 0.5 - Math.random()).slice(0, 2);
    const options = [target, ...shuffledOthers].sort(() => 0.5 - Math.random());

    setListenTarget(target);
    setListenOptions(options);
    setListenResult(null);

    // Speak the target word after a brief delay
    setTimeout(() => {
      speechService.speak(target.word, { accent, slow: isSlow });
      onTrackListen(target.id);
    }, 300);
  };

  useEffect(() => {
    if (activeGame === 'listen-choose') {
      setListenScore(0);
      setListenRound(0);
      setupListenRound();
    }
  }, [activeGame]);

  const handleListenOptionClick = (option: MathWord) => {
    if (listenResult !== null) return;

    if (option.id === listenTarget.id) {
      setListenResult('correct');
      setListenScore(prev => prev + 1);
      triggerConfetti();
    } else {
      setListenResult('wrong');
    }
  };

  // ==========================================
  // GAME 3: MATH VOCABULARY QUIZ
  // ==========================================
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  // 5 Quiz questions
  const quizQuestions = [
    {
      question: "What is 'addition' in Vietnamese?",
      questionVi: "'addition' có nghĩa tiếng Việt là gì?",
      options: ['Phép cộng', 'Phép trừ', 'Phép nhân', 'Phép chia'],
      correctAnswer: 'Phép cộng',
      hint: '2 + 3 = 5'
    },
    {
      question: "Which English word means 'hình tam giác'?",
      questionVi: "Từ tiếng Anh nào có nghĩa là 'hình tam giác'?",
      options: ['Circle', 'Square', 'Triangle', 'Rectangle'],
      correctAnswer: 'Triangle',
      hint: 'A shape with 3 straight sides.'
    },
    {
      question: "What does 'difference' mean in subtraction?",
      questionVi: "'difference' trong phép tính trừ có nghĩa là gì?",
      options: ['Tổng số', 'Hiệu số', 'Phần bù', 'Số nhân'],
      correctAnswer: 'Hiệu số',
      hint: '5 - 2 = 3 (3 is the difference).'
    },
    {
      question: "Which word means 'đồng hồ' in English?",
      questionVi: "Từ nào có nghĩa là 'đồng hồ' trong tiếng Anh?",
      options: ['Ruler', 'Clock', 'Scale', 'Coin'],
      correctAnswer: 'Clock',
      hint: 'Shows hours and minutes.'
    },
    {
      question: "What is 'one half' written as a fraction?",
      questionVi: "'one half' (một nửa) được viết là phân số nào?",
      options: ['1/2', '1/4', '1/3', '2/1'],
      correctAnswer: '1/2',
      hint: 'One of two equal parts.'
    }
  ];

  const currentQuiz = quizQuestions[quizIndex];

  const handleQuizAnswer = (option: string) => {
    if (isAnswerRevealed) return;
    setSelectedQuizAnswer(option);
    setIsAnswerRevealed(true);

    if (option === currentQuiz.correctAnswer) {
      setQuizScore(prev => prev + 1);
      triggerConfetti();
    }
  };

  const handleNextQuiz = () => {
    if (quizIndex + 1 < quizQuestions.length) {
      setQuizIndex(prev => prev + 1);
      setSelectedQuizAnswer(null);
      setIsAnswerRevealed(false);
    } else {
      setQuizCompleted(true);
      onRecordQuizScore(quizScore + (selectedQuizAnswer === currentQuiz.correctAnswer ? 1 : 0), quizQuestions.length);
      triggerConfetti();
    }
  };

  const restartQuiz = () => {
    setQuizIndex(0);
    setQuizScore(0);
    setQuizCompleted(false);
    setSelectedQuizAnswer(null);
    setIsAnswerRevealed(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Games Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="bg-purple-100 text-purple-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
          🎮 MATH GAMES
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-800">
          Trò Chơi Học Từ Vựng Toán Học
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Chơi game tích điểm, nâng cao phản xạ tiếng Anh và nhận huy hiệu danh giá!
        </p>
      </div>

      {/* Game Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        <button
          id="tab-game-match"
          onClick={() => setActiveGame('match')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all ${
            activeGame === 'match'
              ? 'bg-amber-500 text-white shadow-md'
              : 'bg-white text-slate-600 border border-amber-200 hover:bg-amber-50'
          }`}
        >
          <span>🧩</span>
          <span>Game 1: Match the Word</span>
        </button>

        <button
          id="tab-game-listen"
          onClick={() => setActiveGame('listen-choose')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all ${
            activeGame === 'listen-choose'
              ? 'bg-sky-500 text-white shadow-md'
              : 'bg-white text-slate-600 border border-sky-200 hover:bg-sky-50'
          }`}
        >
          <span>🔊</span>
          <span>Game 2: Listen & Choose</span>
        </button>

        <button
          id="tab-game-quiz"
          onClick={() => setActiveGame('quiz')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all ${
            activeGame === 'quiz'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white text-slate-600 border border-purple-200 hover:bg-purple-50'
          }`}
        >
          <span>🎯</span>
          <span>Game 3: Vocabulary Quiz</span>
        </button>
      </div>

      {/* ==========================================
          GAME 1 CONTAINER: MATCH THE WORD
      ========================================== */}
      {activeGame === 'match' && (
        <div className="bg-white border-2 border-amber-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-100 pb-4">
            <div>
              <h2 className="font-heading text-2xl font-bold text-slate-800">
                🧩 Ghép từ tiếng Anh & Hình biểu tượng
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Nhấn chọn một từ ở cột trái, sau đó nhấn biểu tượng tương ứng ở cột phải.
              </p>
            </div>
            <button
              onClick={initMatchGame}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-bold transition-colors w-fit"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Đổi ván mới</span>
            </button>
          </div>

          {/* Feedback banner */}
          {matchFeedback && (
            <div className={`p-3 rounded-2xl text-center text-sm font-bold transition-all ${
              matchFeedback.includes('❌') ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
            }`}>
              {matchFeedback}
            </div>
          )}

          {/* Columns */}
          <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto">
            {/* Left: Words */}
            <div className="space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block text-center">
                Từ tiếng Anh
              </span>
              {matchPairs.map((pair) => {
                const isMatched = matchedWords.includes(pair.word);
                const isSelected = selectedWord === pair.word;
                return (
                  <button
                    key={pair.word}
                    disabled={isMatched}
                    onClick={() => {
                      setSelectedWord(pair.word);
                      speechService.speak(pair.word, { accent, slow: isSlow });
                      if (selectedSymbol) {
                        handleMatchCheck(pair.word, selectedSymbol);
                      }
                    }}
                    className={`w-full p-4 rounded-2xl font-bold text-sm sm:text-base border-2 transition-all text-left flex items-center justify-between ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700 opacity-60'
                        : isSelected
                        ? 'bg-amber-500 text-white border-amber-500 scale-102 shadow-md'
                        : 'bg-slate-50 hover:bg-amber-50 border-slate-200 text-slate-700 hover:border-amber-300'
                    }`}
                  >
                    <span className="capitalize">{pair.word}</span>
                    {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </button>
                );
              })}
            </div>

            {/* Right: Symbols */}
            <div className="space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block text-center">
                Biểu tượng
              </span>
              {shuffledSymbols.map((pair) => {
                const isMatched = matchedWords.includes(pair.word);
                const isSelected = selectedSymbol === pair.symbol;
                return (
                  <button
                    key={pair.symbol}
                    disabled={isMatched}
                    onClick={() => {
                      setSelectedSymbol(pair.symbol);
                      if (selectedWord) {
                        handleMatchCheck(selectedWord, pair.symbol);
                      }
                    }}
                    className={`w-full p-4 rounded-2xl font-bold text-2xl sm:text-3xl border-2 transition-all flex items-center justify-center ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-300 opacity-60'
                        : isSelected
                        ? 'bg-amber-500 text-white border-amber-500 scale-102 shadow-md'
                        : 'bg-slate-50 hover:bg-amber-50 border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    <span>{pair.symbol}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          GAME 2 CONTAINER: LISTEN & CHOOSE
      ========================================== */}
      {activeGame === 'listen-choose' && (
        <div className="bg-white border-2 border-sky-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 text-center">
          <div className="flex items-center justify-between border-b border-sky-100 pb-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-sky-700">
              🔊 Nghe & Chọn từ đúng
            </span>
            <span className="text-xs font-bold text-slate-500">
              Điểm số: <strong className="text-sky-600 font-extrabold">{listenScore}</strong>
            </span>
          </div>

          <div className="py-6 space-y-4">
            <p className="text-sm text-slate-500">
              Hãy bấm vào loa để nghe từ tiếng Anh, sau đó chọn đáp án chính xác bên dưới:
            </p>

            <button
              id="listen-game-replay-btn"
              onClick={() => speechService.speak(listenTarget.word, { accent, slow: isSlow })}
              className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 hover:from-sky-500 hover:to-indigo-600 text-white flex flex-col items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title="Nghe lại phát âm"
            >
              <Volume2 className="w-10 h-10 animate-bounce" />
              <span className="text-[11px] font-extrabold mt-1">Nghe lại</span>
            </button>
          </div>

          {/* Feedback */}
          {listenResult === 'correct' && (
            <div className="p-4 bg-emerald-100 text-emerald-800 rounded-2xl font-bold text-base flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>🎉 Great job! Bạn đã nghe chính xác: "{listenTarget.word}" ({listenTarget.meaning})!</span>
            </div>
          )}

          {listenResult === 'wrong' && (
            <div className="p-4 bg-rose-100 text-rose-800 rounded-2xl font-bold text-base flex items-center justify-center gap-2">
              <XCircle className="w-5 h-5 text-rose-600" />
              <span>Try again! Hãy bấm vào loa và nghe kỹ lại nhé!</span>
            </div>
          )}

          {/* Options A, B, C */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {listenOptions.map((opt, idx) => {
              const letter = ['A', 'B', 'C'][idx];
              const isCorrectOpt = opt.id === listenTarget.id;
              let btnStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-sky-50 hover:border-sky-300';
              if (listenResult === 'correct' && isCorrectOpt) {
                btnStyle = 'bg-emerald-500 text-white border-emerald-500 shadow-md';
              }

              return (
                <button
                  key={opt.id}
                  id={`listen-opt-${idx}`}
                  disabled={listenResult === 'correct'}
                  onClick={() => handleListenOptionClick(opt)}
                  className={`p-5 rounded-2xl border-2 font-bold transition-all flex flex-col items-center justify-center gap-2 text-base ${btnStyle}`}
                >
                  <span className="w-8 h-8 rounded-full bg-white/30 text-xs flex items-center justify-center font-extrabold">
                    {letter}
                  </span>
                  <span className="capitalize text-lg">{opt.word}</span>
                  <span className="text-xs opacity-75 font-normal">({opt.meaning})</span>
                </button>
              );
            })}
          </div>

          {listenResult === 'correct' && (
            <button
              id="listen-next-round-btn"
              onClick={setupListenRound}
              className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-extrabold rounded-2xl shadow-md transition-all inline-flex items-center gap-2 mt-4"
            >
              <span>Từ tiếp theo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* ==========================================
          GAME 3 CONTAINER: MATH VOCABULARY QUIZ
      ========================================== */}
      {activeGame === 'quiz' && (
        <div className="bg-white border-2 border-purple-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          {!quizCompleted ? (
            <>
              {/* Top Progress bar */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>Câu hỏi {quizIndex + 1} / {quizQuestions.length}</span>
                <span className="text-purple-600 font-extrabold">
                  Điểm hiện tại: {quizScore}
                </span>
              </div>

              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 transition-all duration-300"
                  style={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <div className="text-center py-4 space-y-1">
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-800">
                  {currentQuiz.question}
                </h2>
                <p className="text-sm text-slate-500">{currentQuiz.questionVi}</p>
                <span className="inline-block text-xs bg-purple-50 text-purple-700 px-3 py-1 rounded-full font-bold mt-2">
                  💡 Gợi ý: {currentQuiz.hint}
                </span>
              </div>

              {/* 4 Choices */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentQuiz.options.map((opt, idx) => {
                  const letter = ['A', 'B', 'C', 'D'][idx];
                  const isSelected = selectedQuizAnswer === opt;
                  const isCorrect = opt === currentQuiz.correctAnswer;

                  let cardStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-purple-50 hover:border-purple-300';
                  if (isAnswerRevealed) {
                    if (isCorrect) {
                      cardStyle = 'bg-emerald-500 text-white border-emerald-500 shadow-md';
                    } else if (isSelected && !isCorrect) {
                      cardStyle = 'bg-rose-500 text-white border-rose-500';
                    }
                  }

                  return (
                    <button
                      key={opt}
                      id={`quiz-option-${idx}`}
                      disabled={isAnswerRevealed}
                      onClick={() => handleQuizAnswer(opt)}
                      className={`p-4 rounded-2xl border-2 font-bold text-left transition-all flex items-center justify-between text-sm sm:text-base ${cardStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-white/40 flex items-center justify-center text-xs font-extrabold">
                          {letter}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isAnswerRevealed && isCorrect && <CheckCircle2 className="w-5 h-5 text-white" />}
                      {isAnswerRevealed && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-white" />}
                    </button>
                  );
                })}
              </div>

              {/* Next Question Button */}
              {isAnswerRevealed && (
                <div className="text-center pt-3">
                  <button
                    id="quiz-next-question-btn"
                    onClick={handleNextQuiz}
                    className="px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-md transition-all inline-flex items-center gap-2"
                  >
                    <span>{quizIndex + 1 < quizQuestions.length ? 'Câu tiếp theo →' : 'Xem kết quả tổng kết 🏆'}</span>
                  </button>
                </div>
              )}
            </>
          ) : (
            /* QUIZ SUMMARY CARD */
            <div className="text-center py-8 space-y-6">
              <div className="w-24 h-24 mx-auto rounded-3xl bg-amber-100 flex items-center justify-center text-5xl shadow-sm">
                🏆
              </div>

              <div className="space-y-2">
                <h2 className="font-heading text-3xl font-extrabold text-slate-800">
                  🎉 Chúc mừng bạn đã hoàn thành bài Quiz!
                </h2>
                <p className="text-base text-slate-600">
                  Bạn trả lời đúng <strong className="text-purple-600 text-xl">{quizScore}</strong> / {quizQuestions.length} câu hỏi.
                </p>
                {quizScore >= 4 ? (
                  <p className="text-sm font-bold text-emerald-600">
                    Xuất sắc! Bạn đã mở khóa huy hiệu: 🏅 Vocabulary Star!
                  </p>
                ) : (
                  <p className="text-sm text-slate-500">
                    Cố gắng thêm một chút nữa ở lượt chơi sau nhé!
                  </p>
                )}
              </div>

              <button
                id="quiz-restart-btn"
                onClick={restartQuiz}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl shadow-md transition-all inline-flex items-center gap-2 text-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Làm lại bài Quiz</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
