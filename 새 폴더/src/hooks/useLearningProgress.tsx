'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import {
  BookmarkState,
  LearningProgressState,
  ProgressStats,
  QuizRecord
} from '@/types';
import { TRACKS } from '@/data/curriculum';
import { TRACK_QUIZZES } from '@/data/quizzes';

const STORAGE_KEY = 'ue5_learning_progress_v1';

const INITIAL_STATE: LearningProgressState = {
  completedLessons: [],
  bookmarks: {
    lessons: [],
    terms: []
  },
  notes: {},
  quizScores: {},
  lastVisitedLessonId: 'editor-01'
};

interface LearningProgressContextType {
  state: LearningProgressState;
  stats: ProgressStats;
  isMounted: boolean;
  toggleLessonComplete: (lessonId: string) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  toggleBookmark: (type: 'lessons' | 'terms', id: string) => void;
  isBookmarked: (type: 'lessons' | 'terms', id: string) => boolean;
  saveNote: (lessonId: string, noteText: string) => void;
  getNote: (lessonId: string) => string;
  saveQuizScore: (trackId: string, score: number, total: number) => void;
  getQuizScore: (trackId: string) => QuizRecord | undefined;
  setLastVisited: (lessonId: string) => void;
  resetAllProgress: () => void;
}

const LearningProgressContext = createContext<LearningProgressContextType | null>(null);

export const LearningProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<LearningProgressState>(INITIAL_STATE);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // 1. 클라이언트 마운트 시 브라우저 localStorage에서 상태 로드 (Hydration 에러 방지)
  useEffect(() => {
    try {
      const rawData = localStorage.getItem(STORAGE_KEY);
      if (rawData) {
        const parsed = JSON.parse(rawData) as Partial<LearningProgressState>;
        setState({
          completedLessons: parsed.completedLessons || [],
          bookmarks: {
            lessons: parsed.bookmarks?.lessons || [],
            terms: parsed.bookmarks?.terms || []
          },
          notes: parsed.notes || {},
          quizScores: parsed.quizScores || {},
          lastVisitedLessonId: parsed.lastVisitedLessonId || 'editor-01'
        });
      }
    } catch (err) {
      console.error('[LearningProgress] Failed to load progress from localStorage:', err);
    } finally {
      setIsMounted(true);
    }
  }, []);

  // 2. 상태 변경 시 localStorage 동기화
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.error('[LearningProgress] Failed to save progress to localStorage:', err);
    }
  }, [state, isMounted]);

  // 레슨 완료 토글
  const toggleLessonComplete = useCallback((lessonId: string) => {
    setState((prev) => {
      const exists = prev.completedLessons.includes(lessonId);
      const updated = exists
        ? prev.completedLessons.filter((id) => id !== lessonId)
        : [...prev.completedLessons, lessonId];
      return {
        ...prev,
        completedLessons: updated,
        lastVisitedLessonId: lessonId
      };
    });
  }, []);

  const isLessonCompleted = useCallback(
    (lessonId: string) => state.completedLessons.includes(lessonId),
    [state.completedLessons]
  );

  // 북마크 토글
  const toggleBookmark = useCallback((type: 'lessons' | 'terms', id: string) => {
    setState((prev) => {
      const targetList = prev.bookmarks[type];
      const exists = targetList.includes(id);
      const updatedList = exists
        ? targetList.filter((item) => item !== id)
        : [...targetList, id];
      return {
        ...prev,
        bookmarks: {
          ...prev.bookmarks,
          [type]: updatedList
        }
      };
    });
  }, []);

  const isBookmarked = useCallback(
    (type: 'lessons' | 'terms', id: string) => state.bookmarks[type].includes(id),
    [state.bookmarks]
  );

  // 레슨 메모 저장
  const saveNote = useCallback((lessonId: string, noteText: string) => {
    setState((prev) => ({
      ...prev,
      notes: {
        ...prev.notes,
        [lessonId]: noteText
      }
    }));
  }, []);

  const getNote = useCallback(
    (lessonId: string) => state.notes[lessonId] || '',
    [state.notes]
  );

  // 퀴즈 결과 저장
  const saveQuizScore = useCallback((trackId: string, score: number, total: number) => {
    const passed = (score / total) >= 0.75;
    const record: QuizRecord = {
      score,
      total,
      passed,
      date: new Date().toISOString()
    };

    setState((prev) => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [trackId]: record
      }
    }));
  }, []);

  const getQuizScore = useCallback(
    (trackId: string) => state.quizScores[trackId],
    [state.quizScores]
  );

  // 최근 방문 레슨 기록
  const setLastVisited = useCallback((lessonId: string) => {
    setState((prev) => ({
      ...prev,
      lastVisitedLessonId: lessonId
    }));
  }, []);

  // 전체 진행도 초기화
  const resetAllProgress = useCallback(() => {
    if (typeof window !== 'undefined' && window.confirm('모든 학습 진도, 퀴즈 점수, 작성한 메모를 초기화하시겠습니까?')) {
      setState(INITIAL_STATE);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // 통계 집계
  const stats: ProgressStats = useMemo(() => {
    const totalLessons = TRACKS.reduce((acc, t) => acc + t.lessons.length, 0);
    const completedCount = state.completedLessons.length;
    const progressPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
    const totalQuizzes = TRACK_QUIZZES.length;
    const completedQuizzesCount = Object.keys(state.quizScores).length;
    const totalBookmarkedCount = state.bookmarks.lessons.length + state.bookmarks.terms.length;
    const totalNotesCount = Object.values(state.notes).filter((txt) => txt.trim().length > 0).length;

    let currentLevelTitle = '언리얼 노비스';
    if (progressPercentage >= 100) {
      currentLevelTitle = '언리얼 마스터 (Master Developer)';
    } else if (progressPercentage >= 75) {
      currentLevelTitle = '테크니컬 아티스트 (Senior Level)';
    } else if (progressPercentage >= 50) {
      currentLevelTitle = '주니어 언리얼 개발자 (Junior)';
    } else if (progressPercentage >= 25) {
      currentLevelTitle = '블루프린트 수습생 (Apprentice)';
    }

    return {
      totalLessons,
      completedCount,
      progressPercentage,
      totalQuizzes,
      completedQuizzesCount,
      totalBookmarkedCount,
      totalNotesCount,
      currentLevelTitle
    };
  }, [state]);

  const value = useMemo(
    () => ({
      state,
      stats,
      isMounted,
      toggleLessonComplete,
      isLessonCompleted,
      toggleBookmark,
      isBookmarked,
      saveNote,
      getNote,
      saveQuizScore,
      getQuizScore,
      setLastVisited,
      resetAllProgress
    }),
    [
      state,
      stats,
      isMounted,
      toggleLessonComplete,
      isLessonCompleted,
      toggleBookmark,
      isBookmarked,
      saveNote,
      getNote,
      saveQuizScore,
      getQuizScore,
      setLastVisited,
      resetAllProgress
    ]
  );

  return (
    <LearningProgressContext.Provider value={value}>
      {children}
    </LearningProgressContext.Provider>
  );
};

export const useLearningProgress = (): LearningProgressContextType => {
  const context = useContext(LearningProgressContext);
  if (!context) {
    throw new Error('useLearningProgress must be used within a LearningProgressProvider');
  }
  return context;
};
