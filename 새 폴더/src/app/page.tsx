'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  Workflow,
  Code2,
  Layers,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Bookmark,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { ProgressBar } from '@/components/ProgressBar';
import { DashboardStats } from '@/components/DashboardStats';
import { TRACKS } from '@/data/curriculum';
import { useLearningProgress } from '@/hooks/useLearningProgress';

const trackIcons = {
  Compass: Compass,
  Workflow: Workflow,
  Code2: Code2,
  Layers: Layers,
};

export default function DashboardPage() {
  const { isLessonCompleted, isMounted } = useLearningProgress();

  return (
    <div className="space-y-10">
      {/* Hero Welcome Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>UE5 입문자를 위한 체계적인 가이드북</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          언리얼 엔진 5 게임 제작 <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">마스터 로드맵</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-400 max-w-3xl leading-relaxed">
          뷰포트 조작 기초부터 블루프린트 로직, 언리얼 C++ 메모리 아키텍처, 그리고 루멘/나나이트 기반 차세대 레벨 디자인까지. 실습 중심의 단계별 커리큘럼으로 학습하세요.
        </p>
      </div>

      {/* Progress Bar & Badges */}
      <ProgressBar />

      {/* Stats Cards & Continue Learning Hero */}
      <DashboardStats />

      {/* 4 Curriculum Tracks Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">4대 핵심 학습 트랙</h2>
            <p className="text-xs text-gray-400 mt-0.5">기초부터 실무 테크닉까지 순차적으로 진행하세요</p>
          </div>
          <Link
            href="/roadmap"
            className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1 group"
          >
            <span>전체 로드맵 보기</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TRACKS.map((track) => {
            const Icon = trackIcons[track.iconName] || Layers;
            const completedCount = isMounted
              ? track.lessons.filter((l) => isLessonCompleted(l.id)).length
              : 0;
            const trackProgress = Math.round((completedCount / track.lessons.length) * 100);

            return (
              <div
                key={track.id}
                className="bg-ue-card rounded-2xl border border-ue-border hover:border-slate-700 transition-all p-6 flex flex-col justify-between shadow-md group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl border ${track.badgeColor}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors">
                          {track.title}
                        </h3>
                        <span className="text-xs text-gray-400">총 {track.lessons.length}개 레슨</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-bold text-sky-400">{trackProgress}%</span>
                      <div className="text-[11px] text-gray-500">
                        {completedCount}/{track.lessons.length} 완료
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    {track.description}
                  </p>

                  {/* Track progress mini-bar */}
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-500"
                      style={{ width: `${trackProgress}%` }}
                    />
                  </div>

                  {/* Lessons Preview list */}
                  <div className="space-y-1.5 pt-1">
                    {track.lessons.map((lesson) => {
                      const done = isMounted && isLessonCompleted(lesson.id);
                      return (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-slate-900/40 text-gray-400 hover:text-gray-200"
                        >
                          <span className="truncate pr-2">
                            {lesson.order}. {lesson.title}
                          </span>
                          {done ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          ) : (
                            <span className="text-[11px] text-gray-500 shrink-0">
                              {lesson.estimatedMinutes}분
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <Link
                    href={`/quiz?track=${track.id}`}
                    className="text-xs font-semibold text-gray-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>트랙 퀴즈 풀기</span>
                  </Link>

                  <Link
                    href={`/roadmap#track-${track.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 group/btn"
                  >
                    <span>트랙 학습하기</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Access Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        <Link
          href="/glossary"
          className="p-5 rounded-2xl bg-gradient-to-br from-ue-card to-slate-900 border border-ue-border hover:border-sky-500/40 transition-all flex items-center gap-4 group"
        >
          <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/30 group-hover:scale-110 transition-transform">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white group-hover:text-sky-400 transition-colors">
              블루프린트 & 핵심 사전
            </h4>
            <p className="text-xs text-gray-400 mt-0.5">Actor, Pawn, Tick, LineTrace 빠른 검색</p>
          </div>
        </Link>

        <Link
          href="/quiz"
          className="p-5 rounded-2xl bg-gradient-to-br from-ue-card to-slate-900 border border-ue-border hover:border-amber-500/40 transition-all flex items-center gap-4 group"
        >
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 group-hover:scale-110 transition-transform">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
              복습 미니 퀴즈
            </h4>
            <p className="text-xs text-gray-400 mt-0.5">트랙별 실전 역량 테스트 및 즉시 해설</p>
          </div>
        </Link>

        <Link
          href="/notes"
          className="p-5 rounded-2xl bg-gradient-to-br from-ue-card to-slate-900 border border-ue-border hover:border-violet-500/40 transition-all flex items-center gap-4 group"
        >
          <div className="p-3 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/30 group-hover:scale-110 transition-transform">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white group-hover:text-violet-400 transition-colors">
              내 학습 노트 & 북마크
            </h4>
            <p className="text-xs text-gray-400 mt-0.5">직접 기록한 실습 팁과 즐겨찾기 모아보기</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
