'use client';

import React, { useState } from 'react';
import { Bookmark, Code2, Workflow, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { GlossaryItem } from '@/types';
import { useLearningProgress } from '@/hooks/useLearningProgress';

interface GlossaryCardProps {
  item: GlossaryItem;
}

export const GlossaryCard: React.FC<GlossaryCardProps> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const { isBookmarked, toggleBookmark } = useLearningProgress();

  const bookmarked = isBookmarked('terms', item.id);

  const categoryBadgeColors = {
    'Core Concept': 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    'Actor & Component': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    'Blueprint Node': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    'C++ & Engine': 'bg-violet-500/10 text-violet-400 border-violet-500/30',
    'Rendering & Physics': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl bg-ue-card border border-ue-border hover:border-slate-700 transition-all shadow-md overflow-hidden flex flex-col justify-between">
      <div className="p-5 sm:p-6 space-y-3">
        {/* Top meta */}
        <div className="flex items-center justify-between gap-2">
          <span
            className={`px-2.5 py-0.5 rounded-md text-xs font-semibold border ${
              categoryBadgeColors[item.category]
            }`}
          >
            {item.category}
          </span>

          <button
            onClick={() => toggleBookmark('terms', item.id)}
            title={bookmarked ? '북마크 해제' : '북마크 추가'}
            className={`p-1.5 rounded-lg transition-colors ${
              bookmarked
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                : 'text-gray-500 hover:text-gray-300 hover:bg-slate-800'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-400' : ''}`} />
          </button>
        </div>

        {/* Name and Summary */}
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">{item.name}</h3>
          <p className="text-xs text-sky-400 font-medium mt-0.5">{item.cppEquivalent}</p>
          <p className="text-sm text-gray-300 mt-2 leading-relaxed">{item.summary}</p>
        </div>

        {/* Common Usage */}
        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-xs">
          <span className="font-semibold text-amber-400 block mb-1">💡 주로 쓰는 상황:</span>
          <span className="text-gray-300 leading-relaxed">{item.commonUsage}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {item.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-800/80 text-gray-400 border border-slate-700/60"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Expanded Code & Details Area */}
      {isExpanded && (
        <div className="px-5 pb-5 pt-2 border-t border-slate-800 bg-slate-950/60 space-y-4">
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{item.description}</p>

          {item.blueprintNodeFlow && (
            <div>
              <div className="text-xs font-semibold text-amber-400 mb-1.5 flex items-center gap-1">
                <Workflow className="w-3.5 h-3.5" />
                <span>블루프린트 노드 흐름</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-xs font-mono text-amber-200">
                {item.blueprintNodeFlow}
              </div>
            </div>
          )}

          {item.codeSnippet && (
            <div className="relative">
              <div className="flex items-center justify-between text-xs font-semibold text-violet-400 mb-1.5">
                <div className="flex items-center gap-1">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>C++ 코드 구현 예시</span>
                </div>
                <button
                  onClick={() => handleCopyCode(item.codeSnippet!)}
                  className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-white"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copied ? '복사됨' : '코드 복사'}
                </button>
              </div>
              <pre className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-gray-300 overflow-x-auto leading-relaxed">
                <code>{item.codeSnippet}</code>
              </pre>
            </div>
          )}

          {item.relatedTerms.length > 0 && (
            <div className="text-xs text-gray-400 flex items-center gap-1.5">
              <span className="font-semibold text-gray-300">연관 개념:</span>
              {item.relatedTerms.map((term, idx) => (
                <span key={idx} className="text-sky-400 underline underline-offset-2">
                  {term}
                  {idx < item.relatedTerms.length - 1 ? ',' : ''}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Expand toggle footer */}
      <div className="border-t border-slate-800/80 bg-slate-900/40 p-2 text-center">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-xs font-semibold text-slate-400 hover:text-white flex items-center justify-center gap-1 py-1 transition-colors"
        >
          <span>{isExpanded ? '상세 코드 접기' : 'C++ 코드 및 상세 원리 보기'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
