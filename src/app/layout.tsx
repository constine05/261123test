import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { LearningProgressProvider } from '@/hooks/useLearningProgress';
import { AiAssistantWidget } from '@/components/AiAssistantWidget';

export const metadata: Metadata = {
  title: 'UE5 Starter Roadmap | 언리얼 엔진 5 입문자 가이드 & AI 멘토',
  description: '언리얼 엔진 5 게임 제작 입문자를 위한 단계별 학습 로드맵, 블루프린트/C++ 사전, 복습 퀴즈, 진도 관리 및 Gemini 3.8 Flash AI 어시스턴트',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark">
      <body className="min-h-screen flex flex-col bg-ue-bg text-slate-100 selection:bg-sky-500/30 selection:text-sky-200">
        <LearningProgressProvider>
          <Navbar />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
          <AiAssistantWidget />
        </LearningProgressProvider>
      </body>
    </html>
  );
}
