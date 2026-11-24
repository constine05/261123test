'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  MessageSquare,
  X,
  Send,
  KeyRound,
  Maximize2,
  Trash2,
  Copy,
  Check,
  Bot,
  User,
  ArrowRight,
  Zap,
  Cpu
} from 'lucide-react';
import {
  ChatMessage,
  sendGeminiPrompt,
  hasStoredApiKey,
  getStoredApiKey,
  getSelectedModel,
  setSelectedModel,
  GeminiModelId,
  AVAILABLE_MODELS
} from '@/services/gemini';
import { ApiKeyModal } from './ApiKeyModal';

const QUICK_PROMPTS = [
  '⚡ E키 누르면 열리는 상호작용 문 블루프린트',
  '🎯 카메라 전방 라인트레이스 C++ 코드',
  '💡 루멘(Lumen) 실시간 라이팅 깜빡임 해결법',
  '🛡️ TObjectPtr과 가비지 컬렉션 주의점'
];

export const AiAssistantWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState<boolean>(false);
  const [hasKey, setHasKey] = useState<boolean>(false);
  const [currentModel, setCurrentModel] = useState<GeminiModelId>('gemini-3.8-flash');
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load API key state & model on mount
  useEffect(() => {
    setHasKey(hasStoredApiKey());
    setCurrentModel(getSelectedModel());
  }, [isOpen, isKeyModalOpen]);

  // Auto-scroll messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleToggleModel = () => {
    const nextModel: GeminiModelId =
      currentModel === 'gemini-3.8-flash' ? 'gemini-3.5-flash-lite' : 'gemini-3.8-flash';
    setSelectedModel(nextModel);
    setCurrentModel(nextModel);
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    if (!hasKey) {
      setIsKeyModalOpen(true);
      return;
    }

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const replyText = await sendGeminiPrompt(query, messages, undefined, currentModel);
      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: `⚠️ 오류: ${err.message}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    setMessages([]);
  };

  const isLite = currentModel === 'gemini-3.5-flash-lite';

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-blue-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-sky-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            <div className="relative">
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900" />
            </div>
            <span>UE5 AI 멘토 질문하기</span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-black/30 border border-white/20">
              {isLite ? '3.5 Lite' : '3.8 Flash'}
            </span>
          </button>
        ) : null}
      </div>

      {/* Floating Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-40 w-[94vw] sm:w-[460px] h-[610px] max-h-[85vh] bg-ue-card border border-ue-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="p-4 bg-slate-900/90 border-b border-ue-border flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-white">UE5 AI 어시스턴트</h4>
                  {/* Clickable Model Badge Switcher */}
                  <button
                    onClick={handleToggleModel}
                    title="클릭하여 모델 전환 (3.8 Flash ↔ 3.5 Flash Lite)"
                    className={`inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded font-mono font-bold border transition-colors ${isLite
                        ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 hover:bg-amber-500/25'
                        : 'bg-sky-500/15 text-sky-300 border-sky-500/40 hover:bg-sky-500/25'
                      }`}
                  >
                    {isLite ? <Zap className="w-2.5 h-2.5" /> : <Sparkles className="w-2.5 h-2.5" />}
                    <span>{currentModel}</span>
                  </button>
                </div>
                <p className="text-[10px] text-gray-400">블루프린트 & C++ 즉시 생성 및 디버깅</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsKeyModalOpen(true)}
                title="API 키 및 모델 설정"
                className={`p-1.5 rounded-lg transition-colors ${hasKey
                    ? 'text-emerald-400 hover:bg-emerald-500/10'
                    : 'text-amber-400 hover:bg-amber-500/10 animate-pulse'
                  }`}
              >
                <KeyRound className="w-4 h-4" />
              </button>

              <Link
                href="/ai"
                title="전체 화면 스튜디오로 열기"
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <Maximize2 className="w-4 h-4" />
              </Link>

              {messages.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  title="대화 지우기"
                  className="p-1.5 rounded-lg text-gray-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Missing API Key Alert */}
          {!hasKey && (
            <div className="p-3 bg-amber-500/10 border-b border-amber-500/20 flex items-center justify-between text-xs">
              <span className="text-amber-300 text-[11px]">
                Gemini API 키를 등록하면 즉시 답변을 받을 수 있습니다.
              </span>
              <button
                onClick={() => setIsKeyModalOpen(true)}
                className="px-2.5 py-1 rounded bg-amber-500 text-slate-950 font-bold text-[10px] hover:bg-amber-400 shrink-0 ml-2"
              >
                키 등록
              </button>
            </div>
          )}

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col justify-center items-center text-center space-y-4 py-8">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-sky-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h5 className="font-bold text-white text-sm">무엇이든 물어보세요!</h5>
                  <p className="text-[11px] text-gray-400 max-w-xs">
                    블루프린트 노드 설계, 언리얼 C++ 문법, 나나이트/루멘 세팅, 에디터 크래시 해결책을 알려드립니다.
                  </p>
                </div>

                {/* Quick Prompts */}
                <div className="w-full space-y-1.5 pt-2">
                  <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                    추천 질문 예시
                  </div>
                  {QUICK_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(prompt)}
                      className="w-full text-left p-2 rounded-xl bg-slate-900/60 hover:bg-slate-855 border border-slate-800 text-[11px] text-gray-300 hover:text-white transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 text-[10px] text-gray-500">
                    {msg.role === 'user' ? (
                      <>
                        <span>{msg.timestamp}</span>
                        <User className="w-3 h-3 text-sky-400" />
                        <span className="font-semibold text-gray-400">나</span>
                      </>
                    ) : (
                      <>
                        <Bot className="w-3 h-3 text-amber-400" />
                        <span className="font-semibold text-gray-400">UE5 멘토</span>
                        <span>{msg.timestamp}</span>
                      </>
                    )}
                  </div>

                  <div
                    className={`relative group max-w-[90%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap break-words ${msg.role === 'user'
                        ? 'bg-sky-600 text-white rounded-br-xs'
                        : msg.role === 'system'
                          ? 'bg-rose-950/60 border border-rose-500/40 text-rose-200'
                          : 'bg-slate-900 border border-slate-800 text-gray-200 rounded-bl-xs'
                      }`}
                  >
                    {msg.content}

                    {msg.role === 'model' && (
                      <button
                        onClick={() => handleCopy(msg.content, msg.id)}
                        className="absolute top-2 right-2 p-1 rounded bg-slate-800/80 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        title="답변 복사"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-sky-400 p-2">
                <div className="w-3.5 h-3.5 border-2 border-sky-400/30 border-t-sky-400 rounded-full animate-spin" />
                <span>[{currentModel}] 모델이 답변을 작성 중입니다...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-3 bg-slate-900/90 border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={hasKey ? `[${currentModel}]에 질문하기...` : "먼저 API 키를 등록해 주세요"}
                disabled={loading}
                className="flex-1 bg-slate-950 px-3.5 py-2.5 rounded-xl border border-slate-800 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-sky-500 transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white disabled:opacity-40 hover:from-sky-400 hover:to-blue-500 transition-all shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        onSaved={() => {
          setHasKey(hasStoredApiKey());
          setCurrentModel(getSelectedModel());
        }}
      />
    </>
  );
};
