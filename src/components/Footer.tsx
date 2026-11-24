import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-ue-border bg-ue-bg/80 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-bold text-white text-sm">UE5 Starter Roadmap</span>
            <span className="text-xs text-sky-400 font-semibold">MVP</span>
          </div>
          <p className="text-xs text-ue-muted">
            언리얼 엔진 5(UE5) 입문자를 위한 오픈소스 인터랙티브 학습 플랫폼
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
          <Link href="/roadmap" className="hover:text-sky-400 transition-colors">
            학습 로드맵
          </Link>
          <Link href="/glossary" className="hover:text-sky-400 transition-colors">
            핵심 용어 사전
          </Link>
          <Link href="/quiz" className="hover:text-sky-400 transition-colors">
            복습 퀴즈
          </Link>
          <Link href="/notes" className="hover:text-sky-400 transition-colors">
            내 노트 및 북마크
          </Link>
        </div>

        <div className="text-xs text-gray-400 text-center md:text-right">
          Unreal Engine® is a trademark or registered trademark of Epic Games, Inc.
        </div>
      </div>
    </footer>
  );
};
