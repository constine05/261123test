'use client';

import React from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  CheckCircle,
  HelpCircle,
  Bookmark,
  ArrowRight,
  PlayCircle,
  Sparkles
} from 'lucide-react';
import { useLearningProgress } from '@/hooks/useLearningProgress';
import { TRACKS } from '@/data/curriculum';

export const DashboardStats: React.FC = () => {
  const { stats, state, isMounted } = useLearningProgress();

  if (!isMounted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 bg-ue-card rounded-xl border border-ue-border" />
        ))}
      </div>
    );
  }

  // Find last visited or next incomplete lesson
  let targetLesson = TRACKS[0].lessons[0];
  let targetTrack = TRACKS[0];

  if (state.lastVisitedLessonId) {
    for (const track of TRACKS) {
      const found = track.lessons.find((l) => l.id === state.lastVisitedLessonId);
      if (found) {
        targetLesson = found;
        targetTrack = track;
        break;
      }
    }
  }

  // If the last visited lesson is already completed, find the first incomplete lesson
  if (state.completedLessons.includes(targetLesson.id)) {
    for (const track of TRACKS) {
      const incomplete = track.lessons.find((l) => !state.completedLessons.includes(l.id));
      if (incomplete) {
        targetLesson = incomplete;
        targetTrack = track;
        break;
      }
    }
  }

  const statCards = [
    {
      title: '전체 완료율',
      value: `${stats.progressPercentage}%`,
      sub: stats.currentLevelTitle,
      icon: TrendingUp,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/20'
    },
    {
      title: '완료한 레슨',
      value: `${stats.completedCount} / ${stats.totalLessons}`,
      sub: `${stats.totalLessons - stats.completedCount}개 남음`,
      icon: CheckCircle,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      title: '퀴즈 합격',
      value: `${stats.completedQuizzesCount} / ${stats.totalQuizzes}`,
      sub: '트랙별 역량 진단',
      icon: HelpCircle,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20'
    },
    {
      title: '북마크 & 메모',
      value: `${stats.totalBookmarkedCount + stats.totalNotesCount}`,
      sub: `북마크 ${stats.totalBookmarkedCount}개 · 메모 ${stats.totalNotesCount}개`,
      icon: Bookmark,
      color: 'text-violet-400',
      bg: 'bg-violet-500/10 border-violet-500/20'
    }
  ];

  return (
    <div className="space-y-6">
      {/* 4 Quick Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-ue-card rounded-xl p-5 border border-ue-border hover:border-slate-700 transition-all hover:translate-y-[-2px] shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {card.title}
                </span>
                <div className={`p-2 rounded-lg border ${card.bg}`}>
                  <Icon className={`w-4 h-4 ${card.color}`} />
                </div>
              </div>
              <div className="text-2xl font-black text-white">{card.value}</div>
              <div className="text-xs text-ue-muted mt-1 truncate">{card.sub}</div>
            </div>
          );
        })}
      </div>

      {/* '이어서 학습하기' Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-sky-500/30 p-6 md:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>이어서 학습하기 (Resume Learning)</span>
            </div>
            <div className="text-xs text-gray-400 font-medium">
              [{targetTrack.title}] 트랙 레슨 {targetLesson.order}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {targetLesson.title}
            </h3>
            <p className="text-sm text-gray-300 max-w-2xl line-clamp-2">
              {targetLesson.summary}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href={`/roadmap#lesson-${targetLesson.id}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25 hover:from-sky-400 hover:to-blue-500 hover:scale-105 active:scale-95 transition-all"
            >
              <PlayCircle className="w-5 h-5" />
              <span>지금 학습 시작</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
