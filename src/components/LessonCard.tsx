'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Clock,
  Zap,
  Target,
  Keyboard,
  Share2
} from 'lucide-react';
import { Lesson, Track } from '@/types';
import { useLearningProgress } from '@/hooks/useLearningProgress';
import { NoteEditor } from './NoteEditor';

interface LessonCardProps {
  lesson: Lesson;
  track: Track;
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, track }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { isLessonCompleted, toggleLessonComplete, isBookmarked, toggleBookmark, setLastVisited } =
    useLearningProgress();

  const completed = isLessonCompleted(lesson.id);
  const bookmarked = isBookmarked('lessons', lesson.id);

  const handleToggleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLessonComplete(lesson.id);
  };

  const handleToggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark('lessons', lesson.id);
  };

  const handleCardClick = () => {
    setLastVisited(lesson.id);
    setIsExpanded((prev) => !prev);
  };

  const difficultyColors = {
    입문: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    기초: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
    중급: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    심화: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
  };

  return (
    <div
      id={`lesson-${lesson.id}`}
      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
        completed
          ? 'bg-ue-card/90 border-slate-700/80 shadow-sm'
          : 'bg-ue-card border-ue-border hover:border-slate-600 shadow-md'
      }`}
    >
      {/* Header Bar */}
      <div
        onClick={handleCardClick}
        className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="flex items-start gap-4 flex-1">
          {/* Complete Checkbox */}
          <button
            onClick={handleToggleComplete}
            title={completed ? '완료 취소' : '학습 완료 체크'}
            className="mt-1 transition-transform active:scale-90 p-0.5 rounded-lg text-slate-500 hover:text-sky-400"
          >
            {completed ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
            ) : (
              <Circle className="w-6 h-6 hover:text-sky-400 transition-colors" />
            )}
          </button>

          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className={`px-2 py-0.5 rounded-md font-semibold border ${track.badgeColor}`}>
                {track.shortTitle}
              </span>
              <span
                className={`px-2 py-0.5 rounded-md font-semibold border ${
                  difficultyColors[lesson.difficulty]
                }`}
              >
                {lesson.difficulty}
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                {lesson.estimatedMinutes}분
              </span>
            </div>

            <h3
              className={`text-base sm:text-lg font-bold transition-colors ${
                completed ? 'text-gray-300 line-through decoration-emerald-500/50' : 'text-white'
              }`}
            >
              {lesson.order}. {lesson.title}
            </h3>

            <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 leading-relaxed">
              {lesson.summary}
            </p>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center justify-end sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
          <button
            onClick={handleToggleBookmark}
            title={bookmarked ? '북마크 해제' : '북마크 추가'}
            className={`p-2 rounded-lg transition-colors ${
              bookmarked
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                : 'text-gray-500 hover:text-gray-300 hover:bg-slate-800'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-400' : ''}`} />
          </button>

          <button
            className="flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-lg bg-slate-800/80 text-gray-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <span>{isExpanded ? '접기' : '상세보기'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Details Body */}
      {isExpanded && (
        <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-800/80 bg-slate-950/40 space-y-6 animate-fadeIn">
          {/* Core Concept Pills */}
          <div>
            <div className="text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-sky-400" />
              <span>핵심 학습 목표</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {lesson.coreConcepts.map((concept, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800/80 text-sky-300 border border-slate-700"
                >
                  #{concept}
                </span>
              ))}
            </div>
          </div>

          {/* Detailed Content Key Points */}
          <div className="space-y-4">
            <p className="text-sm text-gray-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              {lesson.content.overview}
            </p>

            <div className="grid grid-cols-1 gap-3">
              {lesson.content.keyPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/70 hover:border-slate-700 transition-colors"
                >
                  <h4 className="text-sm font-bold text-white mb-1.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sky-400" />
                    {point.subtitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {point.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Shortcuts & Practical Tips */}
          {lesson.tipsAndShortcuts.length > 0 && (
            <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-4">
              <div className="text-xs font-semibold text-gray-300 mb-3 flex items-center gap-1.5">
                <Keyboard className="w-4 h-4 text-amber-400" />
                <span>필수 단축키 & 실전 팁</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {lesson.tipsAndShortcuts.map((tip, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs"
                  >
                    {tip.shortcut && (
                      <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-sky-300 font-mono text-[11px] font-bold shrink-0">
                        {tip.shortcut}
                      </kbd>
                    )}
                    <span className="text-gray-300 leading-relaxed">{tip.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Practice Mission Guide */}
          <div className="rounded-xl bg-gradient-to-r from-emerald-950/30 to-slate-900 border border-emerald-500/20 p-4">
            <div className="text-xs font-semibold text-emerald-400 mb-1 flex items-center gap-1.5">
              <Zap className="w-4 h-4" />
              <span>직접 해보는 실습 미션</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
              {lesson.practiceGuide}
            </p>
          </div>

          {/* Personal Note Editor */}
          <NoteEditor lessonId={lesson.id} />
        </div>
      )}
    </div>
  );
};
