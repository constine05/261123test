'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Award,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { TrackQuiz } from '@/types';
import { useLearningProgress } from '@/hooks/useLearningProgress';

interface QuizRunnerProps {
  quiz: TrackQuiz;
  onFinish?: () => void;
}

export const QuizRunner: React.FC<QuizRunnerProps> = ({ quiz, onFinish }) => {
  const { saveQuizScore, getQuizScore } = useLearningProgress();
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentQ = quiz.questions[currentIdx];
  const existingRecord = getQuizScore(quiz.trackId);

  // Handle selecting an option
  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
    setIsSubmitted(true);
    setAnswers((prev) => ({ ...prev, [currentIdx]: idx }));
  };

  // Move to next question or complete quiz
  const handleNext = () => {
    if (currentIdx < quiz.questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      // Calculate final score
      let correct = 0;
      quiz.questions.forEach((q, i) => {
        if (answers[i] === q.correctIndex) {
          correct++;
        }
      });
      // Include current question if not yet added to correct count
      if (selectedOption === currentQ.correctIndex && answers[currentIdx] === undefined) {
        correct++;
      }

      saveQuizScore(quiz.trackId, correct, quiz.questions.length);
      setIsCompleted(true);
      if (onFinish) onFinish();
    }
  };

  // Restart quiz
  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setAnswers({});
    setIsCompleted(false);
  };

  // Calculate final score if finished
  const correctCount = quiz.questions.reduce((acc, q, idx) => {
    return answers[idx] === q.correctIndex ? acc + 1 : acc;
  }, 0);
  const scorePercent = Math.round((correctCount / quiz.questions.length) * 100);
  const isPassed = scorePercent >= quiz.passingScore;

  // View: Finished Results Modal / Panel
  if (isCompleted) {
    return (
      <div className="bg-ue-card rounded-2xl border border-ue-border p-6 sm:p-8 text-center space-y-6 shadow-2xl animate-fadeIn">
        <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-sky-500/20 border border-indigo-500/30">
          {isPassed ? (
            <Award className="w-12 h-12 text-sky-400 drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]" />
          ) : (
            <HelpCircle className="w-12 h-12 text-amber-400" />
          )}
        </div>

        <div className="space-y-2">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              isPassed
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            }`}
          >
            {isPassed ? '역량 진단 통과 (Passed)' : '보충 학습 필요 (Review Recommended)'}
          </span>
          <h3 className="text-2xl font-black text-white">{quiz.title} 결과</h3>
          <p className="text-sm text-gray-300">
            총 {quiz.questions.length}문항 중 <strong className="text-white">{correctCount}문항</strong> 정답
          </p>
        </div>

        {/* Score Ring / Bar */}
        <div className="max-w-xs mx-auto p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-4xl font-black text-sky-400">{scorePercent}점</div>
          <div className="text-xs text-gray-400 mt-1">기준 합격 점수: {quiz.passingScore}점</div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={handleRestart}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-800 text-gray-200 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>퀴즈 다시 풀기</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ue-card rounded-2xl border border-ue-border p-6 sm:p-8 space-y-6 shadow-xl">
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
            {quiz.title}
          </span>
          <div className="text-xs text-gray-400 mt-0.5">
            문항 {currentIdx + 1} / {quiz.questions.length}
          </div>
        </div>

        {existingRecord && (
          <span className="text-xs text-gray-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
            이전 최고 점수: <strong className="text-sky-400">{Math.round((existingRecord.score / existingRecord.total) * 100)}점</strong>
          </span>
        )}
      </div>

      {/* Progress small bar */}
      <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
        <div
          className="h-full bg-sky-500 transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / quiz.questions.length) * 100}%` }}
        />
      </div>

      {/* Question text */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-amber-400">Q{currentIdx + 1}.</span>
        <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
          {currentQ.question}
        </h3>
      </div>

      {/* Options List */}
      <div className="space-y-3">
        {currentQ.options.map((option, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrect = currentQ.correctIndex === idx;

          let btnClass = 'bg-slate-900/60 border-slate-800 text-gray-300 hover:bg-slate-850 hover:border-slate-700';
          if (isSubmitted) {
            if (isCorrect) {
              btnClass = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-semibold shadow-sm shadow-emerald-500/20';
            } else if (isSelected && !isCorrect) {
              btnClass = 'bg-rose-950/40 border-rose-500 text-rose-200 font-semibold';
            } else {
              btnClass = 'bg-slate-900/30 border-slate-850 text-gray-500 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={isSubmitted}
              className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm flex items-start gap-3 transition-all ${btnClass}`}
            >
              <span className="w-6 h-6 rounded-lg bg-slate-800/80 border border-slate-700/80 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="flex-1 leading-relaxed">{option}</span>
              {isSubmitted && isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              )}
              {isSubmitted && isSelected && !isCorrect && (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Instant Explanation Box */}
      {isSubmitted && (
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 animate-fadeIn">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>즉시 해설 & 개념 정리</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            {currentQ.explanation}
          </p>
        </div>
      )}

      {/* Next Question Button */}
      {isSubmitted && (
        <div className="flex justify-end pt-2">
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/20 hover:from-sky-400 hover:to-blue-500 active:scale-95 transition-all"
          >
            <span>{currentIdx < quiz.questions.length - 1 ? '다음 문항으로' : '퀴즈 완료 및 결과 보기'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
