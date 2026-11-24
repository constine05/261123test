'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Bot,
  User,
  Send,
  KeyRound,
  Trash2,
  Copy,
  Check,
  Code2,
  Bug,
  HelpCircle,
  ShieldCheck,
  ExternalLink,
  RotateCcw,
  Zap,
  Cpu
} from 'lucide-react';
import {
  ChatMessage,
  sendGeminiPrompt,
  hasStoredApiKey,
  getSelectedModel,
  setSelectedModel,
  GeminiModelId,
  AVAILABLE_MODELS
} from '@/services/gemini';
import { ApiKeyModal } from '@/components/ApiKeyModal';

type AiMode = 'general' | 'blueprint-cpp' | 'error-fix';

const MODE_PRESETS: Record<
  AiMode,
  {
    title: string;
    description: string;
    icon: any;
    color: string;
    placeholder: string;
    examples: string[];
    promptPrefix?: string;
  }
> = {
  general: {
    title: '자유 질의응답 (Free Q&A)',
    description: 'UE5 인터페이스 조작, 나나이트/루멘 그래픽스, 프로젝트 세팅 등 모든 개념 질문',
    icon: HelpCircle,
    color: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
    placeholder: '언리얼 엔진 5에 대해 궁금한 점을 자유롭게 질문해 보세요...',
    examples: [
      '루멘(Lumen) 소프트웨어 레이트레이싱과 하드웨어 레이트레이싱의 장단점',
      'One File Per Actor(OFPA)가 협업에서 왜 중요한가요?',
      '스태틱 메쉬에 나나이트를 적용할 때 주의해야 할 머티리얼 한계는?'
    ]
  },
  'blueprint-cpp': {
    title: '블루프린트 & C++ 코드 생성기',
    description: '구현하고 싶은 게임 메커니즘을 설명하면 노드 순서와 C++ 코드를 자동 설계합니다',
    icon: Code2,
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    placeholder: '만들고 싶은 기능(예: 플레이어가 3초간 달리면 스태미나가 소모되는 로직)을 입력하세요...',
    examples: [
      '플레이어가 E키로 상호작용하면 90도 부드럽게 회전하는 문(Door) 로직',
      '라인트레이스로 피격 액터를 감지하고 50 데미지를 입히는 C++ 함수',
      '더블 점프 및 착지 시 충격 파티클 이펙트 재생 블루프린트 흐름'
    ],
    promptPrefix: '[UE5 코드/노드 생성 요청]: 구현하고자 하는 기능은 다음과 같습니다:\n'
  },
  'error-fix': {
    title: '에디터 오류 & 크래시 해결사',
    description: 'Visual Studio 컴파일 에러, 라이브 코딩 실패, 널 포인터 크래시 로그 분석',
    icon: Bug,
    color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    placeholder: '발생한 언리얼 엔진 컴파일 오류 메시지나 크래시 콜스택을 붙여넣으세요...',
    examples: [
      'Fatal error: Unhandled Exception: EXCEPTION_ACCESS_VIOLATION reading address 0x00000000',
      'Error: Cannot open include file: "MyActor.generated.h": No such file or directory',
      'Live Coding failed. A dynamic link library (DLL) initialization routine failed.'
    ],
    promptPrefix: '[UE5 에러 디버깅 요청]: 다음 오류의 원인과 해결 방법을 단계별로 분석해 주세요:\n'
  }
};

export default function AiStudioPage() {
  const [activeMode, setActiveMode] = useState<AiMode>('general');
  const [currentModel, setCurrentModel] = useState<GeminiModelId>('gemini-3.8-flash');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [hasKey, setHasKey] = useState<boolean>(false);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasKey(hasStoredApiKey());
    setCurrentModel(getSelectedModel());
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleModelChange = (modelId: GeminiModelId) => {
    setSelectedModel(modelId);
    setCurrentModel(modelId);
  };

  const handleSend = async (queryText?: string) => {
    const rawQuery = (queryText || input).trim();
    if (!rawQuery || loading) return;

    if (!hasKey) {
      setIsKeyModalOpen(true);
      return;
    }

    const modeConfig = MODE_PRESETS[activeMode];
    const fullPrompt = modeConfig.promptPrefix
      ? `${modeConfig.promptPrefix}${rawQuery}`
      : rawQuery;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: rawQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await sendGeminiPrompt(fullPrompt, messages, undefined, currentModel);
      const modelMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (err: any) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: `⚠️ 요청 실패: ${err.message}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const currentModeInfo = MODE_PRESETS[activeMode];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-ue-border">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Google Gemini AI</span>
            </span>
            <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5 text-xs font-mono">
              <button
                onClick={() => handleModelChange('gemini-3.8-flash')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded font-bold transition-colors ${currentModel === 'gemini-3.8-flash'
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                  }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>3.8 Flash</span>
              </button>
              <button
                onClick={() => handleModelChange('gemini-3.5-flash-lite')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded font-bold transition-colors ${currentModel === 'gemini-3.5-flash-lite'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-gray-400 hover:text-white'
                  }`}
              >
                <Zap className="w-3 h-3" />
                <span>3.5 Flash Lite</span>
              </button>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            UE5 AI 멘토 스튜디오
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 max-w-2xl">
            언리얼 엔진 5 학습 도중 막히는 블루프린트 로직, C++ 코드 구현, 디버깅 에러를 실시간으로 질문하세요.
          </p>
        </div>

        {/* API Key Status Pill */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsKeyModalOpen(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${hasKey
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20 animate-pulse'
              }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>{hasKey ? 'API 키 등록됨' : 'API 키 설정 필요'}</span>
          </button>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {(Object.keys(MODE_PRESETS) as AiMode[]).map((mode) => {
          const config = MODE_PRESETS[mode];
          const Icon = config.icon;
          const isActive = activeMode === mode;

          return (
            <button
              key={mode}
              onClick={() => setActiveMode(mode)}
              className={`p-4 rounded-2xl border text-left transition-all ${isActive
                  ? 'bg-ue-card border-sky-500 shadow-lg shadow-sky-500/10 ring-1 ring-sky-500/40'
                  : 'bg-ue-card/60 border-ue-border hover:border-slate-700 hover:bg-ue-card'
                }`}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className={`p-2 rounded-xl border ${config.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className={`text-sm font-bold ${isActive ? 'text-sky-400' : 'text-white'}`}>
                  {config.title}
                </h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                {config.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Missing Key Warning */}
      {!hasKey && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <KeyRound className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="font-bold text-amber-300">Gemini API 키가 아직 등록되지 않았습니다.</span>
              <p className="text-gray-300 mt-0.5">
                Google AI Studio에서 무료 API 키를 발급받아 등록하시면 무제한 질의응답이 활성화됩니다.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsKeyModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors shrink-0"
          >
            API 키 입력하기
          </button>
        </div>
      )}

      {/* Main Studio Conversation Area */}
      <div className="bg-ue-card rounded-2xl border border-ue-border shadow-xl flex flex-col min-h-[500px] overflow-hidden">
        {/* Studio Subheader */}
        <div className="px-6 py-3.5 bg-slate-900/80 border-b border-ue-border flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-300">{currentModeInfo.title}</span>
            <span className="text-gray-500">•</span>
            <span className="font-mono text-sky-400">{currentModel}</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400">{messages.length}개의 대화</span>
          </div>
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="flex items-center gap-1.5 text-gray-400 hover:text-rose-400 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>대화 초기화</span>
            </button>
          )}
        </div>

        {/* Message Feed */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto max-h-[600px]">
          {messages.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500/10 to-indigo-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <Bot className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white">무엇을 도와드릴까요?</h4>
                <p className="text-xs text-gray-400 max-w-md">
                  아래 추천 예시를 클릭하거나 하단 입력창에 질문을 작성해 보세요.
                </p>
              </div>

              {/* Examples Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-4xl w-full pt-4">
                {currentModeInfo.examples.map((ex, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(ex)}
                    className="p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-850 border border-slate-800 text-left text-xs text-gray-300 hover:text-white transition-all hover:border-slate-700"
                  >
                    <span className="text-sky-400 font-bold block mb-1">예시 {idx + 1}</span>
                    <span className="line-clamp-2 leading-relaxed">{ex}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role !== 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500/20 to-sky-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`space-y-1 max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-2 text-[11px] text-gray-500 px-1">
                    <span className="font-semibold text-gray-400">
                      {msg.role === 'user' ? '나' : `UE5 AI 멘토 (${currentModel})`}
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div
                    className={`relative group p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words ${msg.role === 'user'
                        ? 'bg-sky-600 text-white rounded-br-xs'
                        : msg.role === 'system'
                          ? 'bg-rose-950/60 border border-rose-500/40 text-rose-200'
                          : 'bg-slate-900/90 border border-slate-800 text-gray-200 rounded-bl-xs'
                      }`}
                  >
                    {msg.content}

                    {msg.role === 'model' && (
                      <button
                        onClick={() => handleCopy(msg.content, msg.id)}
                        className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800/80 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        title="답변 전체 복사"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))
          )}

          {loading && (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-xs text-sky-400 animate-pulse">
              <div className="w-4 h-4 border-2 border-sky-400/30 border-t-sky-400 rounded-full animate-spin" />
              <span>[{currentModel}] 멘토가 답변 및 코드를 작성하고 있습니다...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 sm:p-5 bg-slate-900/90 border-t border-ue-border">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-end gap-3"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={hasKey ? `[${currentModel}] ${currentModeInfo.placeholder}` : '먼저 우측 상단에서 API 키를 등록해 주세요.'}
              disabled={loading}
              rows={2}
              className="flex-1 bg-slate-950 px-4 py-3 rounded-xl border border-slate-800 text-xs sm:text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-sky-500 transition-colors resize-none leading-relaxed"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25 hover:from-sky-400 hover:to-blue-500 disabled:opacity-40 transition-all shrink-0 flex items-center gap-2"
            >
              <span>전송</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between text-[11px] text-gray-500 mt-2 px-1">
            <span>Shift + Enter로 줄바꿈, Enter로 전송</span>
            <span className="font-mono text-sky-400">Active Model: {currentModel}</span>
          </div>
        </div>
      </div>

      {/* Key Modal */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        onSaved={() => {
          setHasKey(hasStoredApiKey());
          setCurrentModel(getSelectedModel());
        }}
      />
    </div>
  );
}
