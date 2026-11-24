'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bookmark,
  FileEdit,
  ArrowRight,
  BookOpen,
  Layers,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { useLearningProgress } from '@/hooks/useLearningProgress';
import { TRACKS } from '@/data/curriculum';
import { GLOSSARY_ITEMS } from '@/data/glossary';

export default function NotesPage() {
  const { state, isMounted, saveNote, toggleBookmark } = useLearningProgress();
  const [activeTab, setActiveTab] = useState<'notes' | 'bookmarked-lessons' | 'bookmarked-terms'>('notes');

  if (!isMounted) {
    return (
      <div className="py-12 text-center text-gray-500 animate-pulse">
        데이터를 불러오는 중입니다...
      </div>
    );
  }

  // Collect all notes with lesson info
  const userNotes = Object.entries(state.notes)
    .filter(([_, text]) => text.trim().length > 0)
    .map(([lessonId, text]) => {
      let lessonTitle = lessonId;
      let trackTitle = '';
      for (const track of TRACKS) {
        const found = track.lessons.find((l) => l.id === lessonId);
        if (found) {
          lessonTitle = found.title;
          trackTitle = track.title;
          break;
        }
      }
      return { lessonId, lessonTitle, trackTitle, text };
    });

  // Bookmarked lessons
  const bookmarkedLessons = state.bookmarks.lessons.map((id) => {
    for (const track of TRACKS) {
      const found = track.lessons.find((l) => l.id === id);
      if (found) {
        return { ...found, trackTitle: track.title };
      }
    }
    return null;
  }).filter(Boolean);

  // Bookmarked terms
  const bookmarkedTerms = state.bookmarks.terms.map((id) => {
    return GLOSSARY_ITEMS.find((item) => item.id === id);
  }).filter(Boolean);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/30">
          <Bookmark className="w-3.5 h-3.5" />
          <span>개인화 학습 아카이브</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          내 학습 메모 & 즐겨찾기
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 max-w-2xl leading-relaxed">
          레슨을 학습하며 작성한 나만의 실습 팁과 중요한 언리얼 용어들을 모아보고 복습하세요.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-2">
        <button
          onClick={() => setActiveTab('notes')}
          className={`flex items-center gap-2 pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'notes'
              ? 'border-sky-500 text-sky-400'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <FileEdit className="w-4 h-4" />
          <span>학습 메모 ({userNotes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bookmarked-lessons')}
          className={`flex items-center gap-2 pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'bookmarked-lessons'
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>북마크 레슨 ({bookmarkedLessons.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bookmarked-terms')}
          className={`flex items-center gap-2 pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'bookmarked-terms'
              ? 'border-violet-500 text-violet-400'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>북마크 용어 ({bookmarkedTerms.length})</span>
        </button>
      </div>

      {/* Tab 1: Notes */}
      {activeTab === 'notes' && (
        <div>
          {userNotes.length === 0 ? (
            <div className="text-center py-16 bg-ue-card rounded-2xl border border-ue-border space-y-3">
              <FileEdit className="w-10 h-10 text-gray-600 mx-auto" />
              <h3 className="text-base font-bold text-white">작성된 메모가 없습니다</h3>
              <p className="text-xs text-gray-400">
                학습 로드맵의 각 레슨 상세 페이지 하단에서 메모를 작성할 수 있습니다.
              </p>
              <Link
                href="/roadmap"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-sky-500 text-white"
              >
                <span>로드맵 둘러보기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userNotes.map((note) => (
                <div
                  key={note.lessonId}
                  className="bg-ue-card rounded-2xl p-5 border border-ue-border space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded border border-sky-500/30">
                        {note.trackTitle}
                      </span>
                      <button
                        onClick={() => saveNote(note.lessonId, '')}
                        title="메모 삭제"
                        className="text-gray-500 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="text-base font-bold text-white">{note.lessonTitle}</h3>
                    <p className="text-xs sm:text-sm text-gray-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800 whitespace-pre-wrap leading-relaxed">
                      {note.text}
                    </p>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <Link
                      href={`/roadmap#lesson-${note.lessonId}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-sky-400 hover:underline"
                    >
                      <span>해당 레슨으로 이동</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Bookmarked Lessons */}
      {activeTab === 'bookmarked-lessons' && (
        <div>
          {bookmarkedLessons.length === 0 ? (
            <div className="text-center py-16 bg-ue-card rounded-2xl border border-ue-border space-y-3">
              <Bookmark className="w-10 h-10 text-gray-600 mx-auto" />
              <h3 className="text-base font-bold text-white">북마크한 레슨이 없습니다</h3>
              <p className="text-xs text-gray-400">
                로드맵에서 자주 다시 보고 싶은 레슨 우측의 북마크 아이콘을 눌러보세요.
              </p>
              <Link
                href="/roadmap"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 text-slate-950 font-bold"
              >
                <span>로드맵 보러 가기</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookmarkedLessons.map((lesson: any) => (
                <div
                  key={lesson.id}
                  className="bg-ue-card rounded-2xl p-5 border border-ue-border space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                        {lesson.trackTitle}
                      </span>
                      <button
                        onClick={() => toggleBookmark('lessons', lesson.id)}
                        className="text-amber-400 hover:text-gray-400"
                      >
                        <Bookmark className="w-4 h-4 fill-amber-400" />
                      </button>
                    </div>
                    <h3 className="text-base font-bold text-white">{lesson.title}</h3>
                    <p className="text-xs text-gray-400 line-clamp-2">{lesson.summary}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex justify-end">
                    <Link
                      href={`/roadmap#lesson-${lesson.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-sky-400 hover:underline"
                    >
                      <span>레슨 펼쳐보기</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Bookmarked Terms */}
      {activeTab === 'bookmarked-terms' && (
        <div>
          {bookmarkedTerms.length === 0 ? (
            <div className="text-center py-16 bg-ue-card rounded-2xl border border-ue-border space-y-3">
              <BookOpen className="w-10 h-10 text-gray-600 mx-auto" />
              <h3 className="text-base font-bold text-white">북마크한 용어가 없습니다</h3>
              <p className="text-xs text-gray-400">
                핵심 사전에서 복습하고 싶은 C++ 클래스나 블루프린트 노드를 즐겨찾기해 보세요.
              </p>
              <Link
                href="/glossary"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-violet-500 text-white font-bold"
              >
                <span>용어 사전 검색하기</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookmarkedTerms.map((term: any) => (
                <div
                  key={term.id}
                  className="bg-ue-card rounded-2xl p-5 border border-ue-border space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/30">
                        {term.category}
                      </span>
                      <button
                        onClick={() => toggleBookmark('terms', term.id)}
                        className="text-amber-400 hover:text-gray-400"
                      >
                        <Bookmark className="w-4 h-4 fill-amber-400" />
                      </button>
                    </div>
                    <h3 className="text-base font-bold text-white">{term.name}</h3>
                    <p className="text-xs text-sky-400 font-mono">{term.cppEquivalent}</p>
                    <p className="text-xs text-gray-300 line-clamp-2">{term.summary}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex justify-end">
                    <Link
                      href="/glossary"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-sky-400 hover:underline"
                    >
                      <span>사전에서 전체 확인</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
