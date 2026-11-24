'use client';

import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';
import { useLearningProgress } from '@/hooks/useLearningProgress';

interface ProgressBarProps {
  showRankBadge?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ showRankBadge = true }) => {
  const { stats, isMounted } = useLearningProgress();

  if (!isMounted) {
    return (
      <div className="w-full bg-ue-card rounded-2xl p-6 border border-ue-border animate-pulse">
        <div className="h-6 bg-slate-800 rounded w-1/3 mb-4" />
        <div className="h-4 bg-slate-800 rounded w-full" />
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-br from-ue-card to-[#151b27] rounded-2xl p-6 border border-ue-border shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white">전체 학습 로드맵 진행률</h2>
            {showRankBadge && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                <Award className="w-3.5 h-3.5" />
                {stats.currentLevelTitle}
              </span>
            )}
          </div>
          <p className="text-sm text-ue-muted mt-1">
            총 {stats.totalLessons}개 레슨 중 <strong className="text-white">{stats.completedCount}개</strong> 완료
          </p>
        </div>

        <div className="flex items-baseline gap-1 text-right">
          <span className="text-3xl font-black text-sky-400 tracking-tight">
            {stats.progressPercentage}
          </span>
          <span className="text-lg font-bold text-sky-400/80">%</span>
        </div>
      </div>

      {/* Bar container */}
      <div className="relative w-full h-3.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
        <div
          className="h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-400 rounded-full transition-all duration-700 ease-out shadow-lg shadow-sky-500/20"
          style={{ width: `${stats.progressPercentage}%` }}
        />
      </div>

      {/* Milestones */}
      <div className="flex justify-between items-center text-xs text-slate-400 mt-3 pt-2 border-t border-slate-800/60">
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
          에디터 기초
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
          블루프린트
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" />
          언리얼 C++
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          루멘 & 나나이트
        </span>
      </div>
    </div>
  );
};
