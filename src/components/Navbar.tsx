'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  BookOpen,
  HelpCircle,
  Bookmark,
  Layers,
  RotateCcw,
  Sparkles,
  KeyRound
} from 'lucide-react';
import { useLearningProgress } from '@/hooks/useLearningProgress';
import { hasStoredApiKey } from '@/services/gemini';
import { ApiKeyModal } from './ApiKeyModal';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { stats, isMounted, resetAllProgress } = useLearningProgress();
  const [isKeyModalOpen, setIsKeyModalOpen] = useState<boolean>(false);
  const [hasKey, setHasKey] = useState<boolean>(false);

  useEffect(() => {
    setHasKey(hasStoredApiKey());
  }, []);

  const navLinks = [
    { href: '/', label: '대시보드', icon: Compass },
    { href: '/roadmap', label: '학습 로드맵', icon: Layers },
    { href: '/glossary', label: 'UE5 핵심 사전', icon: BookOpen },
    { href: '/quiz', label: '복습 퀴즈', icon: HelpCircle },
    { href: '/ai', label: 'AI 멘토', icon: Sparkles, highlight: true },
    { href: '/notes', label: '내 노트·북마크', icon: Bookmark },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-ue-border bg-ue-bg/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand / Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ue-primary to-blue-700 flex items-center justify-center shadow-lg shadow-ue-primary/20 group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-xl tracking-tighter">U5</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base tracking-wide">
                  UE5 Starter Roadmap
                </span>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/30">
                  MVP
                </span>
              </div>
              <p className="text-xs text-ue-muted hidden sm:block">언리얼 엔진 5 게임 제작 입문 가이드</p>
            </div>
          </Link>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-ue-card text-sky-400 border border-sky-500/30 shadow-sm'
                      : link.highlight
                      ? 'text-amber-300 hover:text-white hover:bg-ue-card/60'
                      : 'text-gray-300 hover:text-white hover:bg-ue-card/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : link.highlight ? 'text-amber-400' : 'text-gray-400'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Info: Progress badge, API key button & Reset */}
          <div className="flex items-center gap-2.5">
            {/* API Key Quick Toggle Button */}
            <button
              onClick={() => setIsKeyModalOpen(true)}
              title={hasKey ? "Gemini API 키 등록됨" : "Gemini API 키 설정 필요"}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                hasKey
                  ? 'bg-slate-900 text-gray-300 border-slate-800 hover:border-slate-700'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20 animate-pulse'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">API Key</span>
              <span
                className={`w-2 h-2 rounded-full ${
                  hasKey ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
              />
            </button>

            {isMounted && (
              <div className="hidden lg:flex items-center gap-3 bg-ue-card px-3 py-1.5 rounded-lg border border-ue-border text-xs">
                <div className="flex items-center gap-1.5 text-sky-400 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{stats.progressPercentage}% 완료</span>
                </div>
                <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-500"
                    style={{ width: `${stats.progressPercentage}%` }}
                  />
                </div>
              </div>
            )}

            <button
              onClick={resetAllProgress}
              title="학습 데이터 초기화"
              className="p-2 rounded-lg text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Nav strip */}
        <div className="md:hidden flex items-center justify-around border-t border-ue-border bg-ue-card/60 px-2 py-1.5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 text-[11px] font-medium rounded ${
                  isActive ? 'text-sky-400 font-bold' : link.highlight ? 'text-amber-300' : 'text-gray-400'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </header>

      {/* Global API Key Modal */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        onSaved={() => setHasKey(hasStoredApiKey())}
      />
    </>
  );
};
