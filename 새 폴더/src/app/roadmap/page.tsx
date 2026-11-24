'use client';

import React, { useState } from 'react';
import {
  Compass,
  Workflow,
  Code2,
  Layers,
  Filter,
  CheckCircle2,
  Bookmark,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { LessonCard } from '@/components/LessonCard';
import { TRACKS } from '@/data/curriculum';
import { TrackId } from '@/types';
import { useLearningProgress } from '@/hooks/useLearningProgress';

const trackIcons = {
  Compass: Compass,
  Workflow: Workflow,
  Code2: Code2,
  Layers: Layers,
};

export default function RoadmapPage() {
  const { isLessonCompleted, isBookmarked, isMounted } = useLearningProgress();
  const [selectedTrack, setSelectedTrack] = useState<TrackId | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'incomplete' | 'completed'>('all');
  const [onlyBookmarked, setOnlyBookmarked] = useState<boolean>(false);

  // Filter tracks and lessons
  const filteredTracks = TRACKS.filter((track) => {
    if (selectedTrack !== 'all' && track.id !== selectedTrack) {
      return false;
    }
    return true;
  }).map((track) => {
    const lessons = track.lessons.filter((lesson) => {
      const isCompleted = isMounted ? isLessonCompleted(lesson.id) : false;
      const bookmarked = isMounted ? isBookmarked('lessons', lesson.id) : false;

      if (statusFilter === 'completed' && !isCompleted) return false;
      if (statusFilter === 'incomplete' && isCompleted) return false;
      if (onlyBookmarked && !bookmarked) return false;

      return true;
    });

    return {
      ...track,
      lessons
    };
  }).filter((track) => track.lessons.length > 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30">
          <Layers className="w-3.5 h-3.5" />
          <span>체계적인 단계별 커리큘럼</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          언리얼 엔진 5 학습 로드맵
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 max-w-2xl leading-relaxed">
          각 레슨의 핵심 개념을 학습하고 실습 미션을 완료한 후 체크박스를 클릭해 진도를 기록하세요.
        </p>
      </div>

      {/* Filter and Track Selectors */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-ue-card p-4 rounded-2xl border border-ue-border shadow-sm">
        {/* Track Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedTrack('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              selectedTrack === 'all'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'bg-slate-900/60 text-gray-400 hover:text-white border border-slate-800'
            }`}
          >
            전체 트랙
          </button>
          {TRACKS.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTrack(t.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedTrack === t.id
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'bg-slate-900/60 text-gray-400 hover:text-white border border-slate-800'
              }`}
            >
              {t.shortTitle}
            </button>
          ))}
        </div>

        {/* Status & Bookmark Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center rounded-xl bg-slate-900/80 border border-slate-800 p-1 text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                statusFilter === 'all' ? 'bg-slate-800 text-white' : 'text-gray-400'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setStatusFilter('incomplete')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                statusFilter === 'incomplete' ? 'bg-slate-800 text-sky-400' : 'text-gray-400'
              }`}
            >
              학습 필요
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                statusFilter === 'completed' ? 'bg-slate-800 text-emerald-400' : 'text-gray-400'
              }`}
            >
              완료됨
            </button>
          </div>

          <button
            onClick={() => setOnlyBookmarked(!onlyBookmarked)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
              onlyBookmarked
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-slate-900/80 text-gray-400 border-slate-800 hover:text-white'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${onlyBookmarked ? 'fill-amber-400' : ''}`} />
            <span>북마크만</span>
          </button>
        </div>
      </div>

      {/* Render Tracks and Lessons */}
      {filteredTracks.length === 0 ? (
        <div className="text-center py-16 bg-ue-card rounded-2xl border border-ue-border space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-gray-500">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">조건에 맞는 레슨이 없습니다</h3>
          <p className="text-xs text-gray-400">선택된 필터를 변경하거나 초기화해 보세요.</p>
          <button
            onClick={() => {
              setSelectedTrack('all');
              setStatusFilter('all');
              setOnlyBookmarked(false);
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30 hover:bg-sky-500/20"
          >
            모든 필터 초기화
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {filteredTracks.map((track) => {
            const Icon = trackIcons[track.iconName] || Layers;
            return (
              <div key={track.id} id={`track-${track.id}`} className="space-y-4">
                {/* Track Group Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl border ${track.badgeColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-white">
                        {track.title}
                      </h2>
                      <p className="text-xs text-gray-400">{track.description}</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">
                    {track.lessons.length}개 세부 레슨
                  </span>
                </div>

                {/* Lessons in this track */}
                <div className="space-y-3">
                  {track.lessons.map((lesson) => (
                    <LessonCard key={lesson.id} lesson={lesson} track={track} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
