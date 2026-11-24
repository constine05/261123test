'use client';

import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, Bookmark, Filter, Sparkles } from 'lucide-react';
import { GLOSSARY_ITEMS } from '@/data/glossary';
import { GlossaryCard } from '@/components/GlossaryCard';
import { GlossaryCategory } from '@/types';
import { useLearningProgress } from '@/hooks/useLearningProgress';

const CATEGORIES: ('all' | GlossaryCategory)[] = [
  'all',
  'Core Concept',
  'Actor & Component',
  'Blueprint Node',
  'C++ & Engine',
  'Rendering & Physics'
];

const categoryLabels: Record<'all' | GlossaryCategory, string> = {
  all: '전체 보기',
  'Core Concept': '핵심 아키텍처',
  'Actor & Component': '액터 & 컴포넌트',
  'Blueprint Node': '블루프린트 노드',
  'C++ & Engine': '언리얼 C++',
  'Rendering & Physics': '렌더링 & 피직스'
};

export default function GlossaryPage() {
  const { isBookmarked, isMounted } = useLearningProgress();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | GlossaryCategory>('all');
  const [onlyBookmarked, setOnlyBookmarked] = useState<boolean>(false);

  const filteredItems = useMemo(() => {
    return GLOSSARY_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Bookmark filter
      if (onlyBookmarked && isMounted && !isBookmarked('terms', item.id)) {
        return false;
      }

      // Search Query filter
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesSummary = item.summary.toLowerCase().includes(q);
        const matchesDescription = item.description.toLowerCase().includes(q);
        const matchesCpp = item.cppEquivalent?.toLowerCase().includes(q) || false;
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(q));

        if (!matchesName && !matchesSummary && !matchesDescription && !matchesCpp && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory, onlyBookmarked, isMounted, isBookmarked]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30">
          <BookOpen className="w-3.5 h-3.5" />
          <span>UE5 블루프린트 & 필수 용어 치트시트</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          언리얼 엔진 5 핵심 사전 (Cheat Sheet)
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 max-w-2xl leading-relaxed">
          Actor, Pawn, Tick, LineTrace부터 나나이트와 루멘까지. 주로 쓰는 상황과 C++ 대응 코드를 즉시 검색해 보세요.
        </p>
      </div>

      {/* Search Input Bar & Quick Filters */}
      <div className="space-y-4 bg-ue-card p-5 rounded-2xl border border-ue-border shadow-md">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="용어, 블루프린트 노드명, C++ 클래스 또는 키워드 검색 (예: Actor, Tick, LineTrace, Raycast)"
            className="w-full pl-11 pr-10 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-sky-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills & Bookmark Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'bg-slate-900/70 text-gray-400 hover:text-white border border-slate-800'
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>

          <button
            onClick={() => setOnlyBookmarked(!onlyBookmarked)}
            className={`self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors shrink-0 ${
              onlyBookmarked
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-slate-900/80 text-gray-400 border-slate-800 hover:text-white'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${onlyBookmarked ? 'fill-amber-400' : ''}`} />
            <span>북마크 항목만</span>
          </button>
        </div>
      </div>

      {/* Result Count and Grid */}
      <div>
        <div className="flex items-center justify-between text-xs text-gray-400 mb-4 px-1">
          <span>
            총 <strong className="text-white">{filteredItems.length}개</strong>의 개념 및 노드가 검색되었습니다.
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-sky-400 hover:underline"
            >
              검색어 초기화
            </button>
          )}
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-ue-card rounded-2xl border border-ue-border space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-gray-500">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">일치하는 용어가 없습니다</h3>
            <p className="text-xs text-gray-400">다른 검색어를 입력하거나 필터를 재설정해 보세요.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setOnlyBookmarked(false);
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30 hover:bg-sky-500/20"
            >
              전체 목록 보기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredItems.map((item) => (
              <GlossaryCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
