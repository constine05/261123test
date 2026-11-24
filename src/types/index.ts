/**
 * 언리얼 엔진 5(UE5) 스타터 로드맵 핵심 타입 정의
 */

export type TrackId =
  | 'editor-basics'
  | 'blueprint-core'
  | 'unreal-cpp'
  | 'level-design';

export type DifficultyLevel = '입문' | '기초' | '중급' | '심화';

/** 세부 레슨 인터페이스 */
export interface Lesson {
  id: string;
  trackId: TrackId;
  title: string;
  summary: string;
  estimatedMinutes: number;
  difficulty: DifficultyLevel;
  coreConcepts: string[];
  content: {
    overview: string;
    keyPoints: {
      subtitle: string;
      body: string;
      codeOrVisual?: string;
    }[];
  };
  tipsAndShortcuts: {
    shortcut?: string;
    description: string;
  }[];
  practiceGuide: string;
  order: number;
}

/** 학습 트랙 인터페이스 */
export interface Track {
  id: TrackId;
  title: string;
  shortTitle: string;
  description: string;
  iconName: 'Compass' | 'Workflow' | 'Code2' | 'Layers';
  accentColor: string; // Tailwind color class or hex
  badgeColor: string;
  lessons: Lesson[];
}

/** 용어 사전 카테고리 */
export type GlossaryCategory =
  | 'Core Concept'
  | 'Actor & Component'
  | 'Blueprint Node'
  | 'C++ & Engine'
  | 'Rendering & Physics';

/** 블루프린트 & 용어 사전 아이템 */
export interface GlossaryItem {
  id: string;
  name: string;
  category: GlossaryCategory;
  summary: string;
  description: string;
  commonUsage: string;
  codeSnippet?: string;
  blueprintNodeFlow?: string;
  cppEquivalent?: string;
  relatedTerms: string[];
  tags: string[];
}

/** 퀴즈 문항 인터페이스 */
export interface QuizQuestion {
  id: string;
  trackId: TrackId;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  referenceLessonId?: string;
}

/** 트랙별 퀴즈 모음 */
export interface TrackQuiz {
  trackId: TrackId;
  title: string;
  description: string;
  passingScore: number;
  questions: QuizQuestion[];
}

/** 퀴즈 풀이 결과 기록 */
export interface QuizRecord {
  score: number;
  total: number;
  passed: boolean;
  date: string;
}

/** 북마크 데이터 구조 */
export interface BookmarkState {
  lessons: string[];
  terms: string[];
}

/** 전체 학습 진도 저장 상태 (localStorage 동기화용) */
export interface LearningProgressState {
  completedLessons: string[];
  bookmarks: BookmarkState;
  notes: Record<string, string>; // lessonId -> personal note
  quizScores: Record<string, QuizRecord>; // trackId -> QuizRecord
  lastVisitedLessonId: string | null;
}

/** 통계 요약 인터페이스 */
export interface ProgressStats {
  totalLessons: number;
  completedCount: number;
  progressPercentage: number;
  totalQuizzes: number;
  completedQuizzesCount: number;
  totalBookmarkedCount: number;
  totalNotesCount: number;
  currentLevelTitle: string;
}
