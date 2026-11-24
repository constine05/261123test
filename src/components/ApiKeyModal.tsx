'use client';

import React, { useState, useEffect } from 'react';
import {
  KeyRound,
  X,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Sparkles,
  Lock,
  Cpu,
  Zap
} from 'lucide-react';
import {
  getStoredApiKey,
  setStoredApiKey,
  clearStoredApiKey,
  validateApiKey,
  AVAILABLE_MODELS,
  getSelectedModel,
  setSelectedModel,
  GeminiModelId
} from '@/services/gemini';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved?: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onSaved }) => {
  const [inputKey, setInputKey] = useState<string>('');
  const [existingKey, setExistingKey] = useState<string>('');
  const [selectedModelId, setSelectedModelId] = useState<GeminiModelId>('gemini-3.8-flash');
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      const current = getStoredApiKey();
      const currentModel = getSelectedModel();
      setExistingKey(current);
      setInputKey(current);
      setSelectedModelId(currentModel);
      setStatus('idle');
      setErrorMessage('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveAndTest = async () => {
    if (!inputKey.trim()) {
      setStatus('error');
      setErrorMessage('API 키를 입력해 주세요.');
      return;
    }

    setStatus('testing');
    setErrorMessage('');

    const result = await validateApiKey(inputKey.trim(), selectedModelId);
    if (result.valid) {
      setStoredApiKey(inputKey.trim());
      setSelectedModel(selectedModelId);
      setExistingKey(inputKey.trim());
      setStatus('success');
      if (onSaved) onSaved();
      setTimeout(() => {
        onClose();
      }, 1200);
    } else {
      setStatus('error');
      setErrorMessage(result.error || '유효하지 않은 API 키입니다. 다시 확인해 주세요.');
    }
  };

  const handleClearKey = () => {
    clearStoredApiKey();
    setExistingKey('');
    setInputKey('');
    setStatus('idle');
    setErrorMessage('');
    if (onSaved) onSaved();
  };

  const maskedKey = existingKey
    ? `${existingKey.slice(0, 6)}••••••••••••••••${existingKey.slice(-4)}`
    : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-ue-card border border-ue-border rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500/20 to-sky-500/20 border border-amber-500/30 text-amber-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Gemini AI 설정</span>
              </h3>
              <p className="text-xs text-gray-400">UE5 AI 멘토 및 실시간 질의응답 활성화</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Existing key indicator */}
        {existingKey && (
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-gray-300 font-mono">{maskedKey}</span>
            </div>
            <button
              onClick={handleClearKey}
              className="inline-flex items-center gap-1 text-[11px] text-rose-400 hover:text-rose-300 font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>삭제</span>
            </button>
          </div>
        )}

        {/* AI Model Selection */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-gray-300 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-sky-400" />
            <span>사용할 Gemini 모델 선택</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {AVAILABLE_MODELS.map((model) => {
              const isSelected = selectedModelId === model.id;
              const isLite = model.id === 'gemini-3.5-flash-lite';

              return (
                <button
                  key={model.id}
                  type="button"
                  onClick={() => setSelectedModelId(model.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${isSelected
                      ? 'bg-slate-850 border-sky-500 shadow-md ring-1 ring-sky-500/50'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-white flex items-center gap-1.5">
                      {isLite ? <Zap className="w-3 h-3 text-amber-400" /> : <Sparkles className="w-3 h-3 text-sky-400" />}
                      {model.name}
                    </span>
                    <span
                      className={`text-[9px] font-semibold px-1.5 py-0.5 rounded border ${isSelected
                          ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                          : 'bg-slate-800 text-gray-400 border-slate-700'
                        }`}
                    >
                      {model.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    {model.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input Form */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-gray-300">
            Google AI Studio API Key
          </label>
          <div className="relative">
            <input
              type="password"
              value={inputKey}
              onChange={(e) => {
                setInputKey(e.target.value);
                setStatus('idle');
                setErrorMessage('');
              }}
              placeholder="AIzaSy... 형식의 API 키를 입력하세요"
              className="w-full px-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-sky-500 transition-colors font-mono"
            />
          </div>

          {/* Feedback states */}
          {status === 'error' && (
            <div className="flex items-center gap-2 text-xs text-rose-400 pt-1">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {status === 'success' && (
            <div className="flex items-center gap-2 text-xs text-emerald-400 pt-1">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>API 키 및 모델({selectedModelId}) 설정이 성공적으로 저장되었습니다!</span>
            </div>
          )}
        </div>

        {/* Security & Free Key Guide */}
        <div className="space-y-2 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-gray-300">
          <div className="flex items-center gap-1.5 text-sky-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>100% 클라이언트 보안 보장</span>
          </div>
          <p className="text-[11px] text-gray-400 leading-relaxed">
            입력하신 API 키는 브라우저의 localStorage에만 안전하게 보관되며 외부 서버를 거치지 않습니다.
          </p>
          <div className="pt-1">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2"
            >
              <span>Google AI Studio에서 무료 API 키 발급받기</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSaveAndTest}
            disabled={status === 'testing'}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25 hover:from-sky-400 hover:to-blue-500 disabled:opacity-50 transition-all"
          >
            {status === 'testing' ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>키 유효성 검증 중...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>설정 저장 및 활성화</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
