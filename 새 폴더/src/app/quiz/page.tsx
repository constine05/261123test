'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  HelpCircle,
  Award,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { TRACK_QUIZZES } from '@/data/quizzes';
import { QuizRunner } from '@/components/QuizRunner';
import { TrackId } from '@/types';
import { useLearningProgress } from '@/hooks/useLearningProgress';

function QuizContent() {
  const searchParams = useSearchParams();
  const initialTrack = (searchParams?.get('track') as TrackId) || 'editor-basics';
  const [selectedTrackId, setSelectedTrackId] = useState<TrackId>(initialTrack);
  const { getQuizScore, isMounted } = useLearningProgress();

  useEffect(() => {
    const trackFromQuery = searchParams?.get('track') as TrackId;
    if (trackFromQuery && TRACK_QUIZZES.some((q) => q.trackId === trackFromQuery)) {
      setSelectedTrackId(trackFromQuery);
    }
  }, [searchParams]);

  const currentQuiz =
    TRACK_QUIZZES.find((q) => q.trackId === selectedTrackId) || TRACK_QUIZZES[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>개념 확인 & 실전 역량 테스트</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          트랙별 복습 미니 퀴즈
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 max-w-2xl leading-relaxed">
          실제 언리얼 엔진 5 핵심 메커니즘을 점검하는 객관식 퀴즈입니다. 정답 제출 즉시 상세 해설이 표시되며 점수가 브라우저에 저장됩니다.
        </p>
      </div>

      {/* Track Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {TRACK_QUIZZES.map((quiz) => {
          const isSelected = selectedTrackId === quiz.trackId;
          const record = isMounted ? getQuizScore(quiz.trackId) : undefined;
          const scorePercent = record ? Math.round((record.score / record.total) * 100) : null;

          return (
            <button
              key={quiz.trackId}
              onClick={() => setSelectedTrackId(quiz.trackId)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-ue-card border-sky-500 shadow-lg shadow-sky-500/10 ring-1 ring-sky-500/50'
                  : 'bg-ue-card/70 border-ue-border hover:border-slate-700 hover:bg-ue-card'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-gray-400">
                  {quiz.questions.length}문항
                </span>
                {record && (
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      record.passed
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    {scorePercent}점
                  </span>
                )}
              </div>

              <h3
                className={`text-sm font-bold truncate ${
                  isSelected ? 'text-sky-400' : 'text-white'
                }`}
              >
                {quiz.title}
              </h3>

              <div className="text-[11px] text-gray-400 mt-1">
                기준 점수: {quiz.passingScore}점
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Quiz Runner Component */}
      <div className="max-w-3xl mx-auto">
        <QuizRunner key={currentQuiz.trackId} quiz={currentQuiz} />
      </div>

      {/* Overall Score Status Board */}
      <div className="mt-12 bg-ue-card p-6 rounded-2xl border border-ue-border">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Award className="w-4 h-4 text-sky-400" />
          <span>전체 트랙 퀴즈 응시 현황</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TRACK_QUIZZES.map((quiz) => {
            const record = isMounted ? getQuizScore(quiz.trackId) : undefined;
            const scorePercent = record ? Math.round((record.score / record.total) * 100) : null;

            return (
              <div
                key={quiz.trackId}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs"
              >
                <div className="font-bold text-white truncate">{quiz.title}</div>
                {record ? (
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-gray-400">최근 점수:</span>
                    <span
                      className={`font-black ${
                        record.passed ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      {scorePercent}점 ({record.score}/{record.total})
                    </span>
                  </div>
                ) : (
                  <div className="text-gray-400 pt-1">아직 응시하지 않음</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense
      fallback={
        <div className="py-12 text-center text-gray-400 animate-pulse">
          퀴즈를 로딩하고 있습니다...
        </div>
      }
    >
      <QuizContent />
    </Suspense>
  );
}
