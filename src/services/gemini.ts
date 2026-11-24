/**
 * Google Gemini API 클라이언트 서비스
 * 지원 모델: gemini-3.8-flash, gemini-3.5-flash-lite
 * 사용자가 입력한 API 키는 오직 브라우저의 localStorage에만 저장되며 외부 서버를 거치지 않습니다.
 */

const STORAGE_KEY_API_KEY = 'ue5_gemini_api_key';
const STORAGE_KEY_MODEL = 'ue5_gemini_selected_model';

export type GeminiModelId = 'gemini-3.8-flash' | 'gemini-3.5-flash-lite';

export interface GeminiModelInfo {
  id: GeminiModelId;
  name: string;
  tag: string;
  description: string;
}

export const AVAILABLE_MODELS: GeminiModelInfo[] = [
  {
    id: 'gemini-3.8-flash',
    name: 'Gemini 3.8 Flash',
    tag: '기본 모델 (추천)',
    description: 'UE5 블루프린트 설계 및 복잡한 C++ 코드 생성, 디버깅에 최적화된 고지능 플래그십 모델'
  },
  {
    id: 'gemini-3.5-flash-lite',
    name: 'Gemini 3.5 Flash Lite',
    tag: '초고속 경량',
    description: '빠른 응답 속도와 저지연으로 간단한 개념 질문, 단축키 및 용어 조회에 특화된 라이트 모델'
  }
];

export const DEFAULT_MODEL: GeminiModelId = 'gemini-3.8-flash';
const FALLBACK_MODEL = 'gemini-2.5-flash';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  timestamp: string;
}

const SYSTEM_INSTRUCTION = `당신은 언리얼 엔진 5(UE5) 전문 수석 테크니컬 아티스트이자 친절하고 명쾌한 AI 멘토입니다.
학습자의 질문에 대해 아래 원칙을 반드시 준수하여 답변하세요:

1. [최신 UE5 기준]: UE4 구버전 방식이 아닌, UE5의 최신 시스템(Enhanced Input, Nanite, Lumen, World Partition, TObjectPtr, Chaos Physics 등)을 기준으로 설명합니다.
2. [이해하기 쉬운 구조]: 
   - 핵심 요약 (1~2줄)
   - 블루프린트 노드 구성 방법 (노드 이름 및 핀 연결 순서)
   - 언리얼 C++ 대응 코드 (필요한 경우 UPROPERTY/UFUNCTION 매크로 포함)
   - 실무 주의사항 및 팁 (성능, 가비지 컬렉션, 크래시 방지 등)
3. [가독성 높은 포맷]: 코드는 마크다운 코드 블록(\`\`\`cpp 또는 \`\`\`text)으로 감싸고, 주요 단축키와 노드명은 볼드체 또는 백틱으로 강조합니다.
4. [정중하고 격려하는 어조]: 학습자가 게임 개발에 자신감을 가질 수 있도록 친절하게 안내합니다.`;

/** 브라우저에 저장된 API Key 조회 (환경변수 fallback 지원) */
export const getStoredApiKey = (): string => {
  if (typeof window === 'undefined') return process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
  return localStorage.getItem(STORAGE_KEY_API_KEY) || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
};

/** API Key 로컬 저장 */
export const setStoredApiKey = (apiKey: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_API_KEY, apiKey.trim());
};

/** API Key 삭제 */
export const clearStoredApiKey = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY_API_KEY);
};

/** API Key 등록 여부 확인 */
export const hasStoredApiKey = (): boolean => {
  return Boolean(getStoredApiKey());
};

/** 선택된 AI 모델 조회 */
export const getSelectedModel = (): GeminiModelId => {
  if (typeof window === 'undefined') return DEFAULT_MODEL;
  const saved = localStorage.getItem(STORAGE_KEY_MODEL) as GeminiModelId;
  if (saved && AVAILABLE_MODELS.some((m) => m.id === saved)) {
    return saved;
  }
  return DEFAULT_MODEL;
};

/** AI 모델 변경 및 로컬 저장 */
export const setSelectedModel = (modelId: GeminiModelId): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_MODEL, modelId);
};

/** API Key 유효성 사전 테스트 */
export const validateApiKey = async (
  apiKey: string,
  modelId: GeminiModelId = DEFAULT_MODEL
): Promise<{ valid: boolean; error?: string }> => {
  if (!apiKey || apiKey.trim().length < 15) {
    return { valid: false, error: '유효한 API 키 형식(최소 20자 이상)을 입력해 주세요.' };
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey.trim()}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: 'Ping test' }] }],
        generationConfig: { maxOutputTokens: 5 }
      })
    });

    if (res.ok) {
      return { valid: true };
    }

    // 지정 모델 미지원 시 fallback 모델로 재시도
    if (res.status === 404) {
      const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/${FALLBACK_MODEL}:generateContent?key=${apiKey.trim()}`;
      const fallbackRes = await fetch(fallbackUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: 'Ping test' }] }],
          generationConfig: { maxOutputTokens: 5 }
        })
      });
      if (fallbackRes.ok) {
        return { valid: true };
      }
    }

    const errorData = await res.json().catch(() => ({}));
    const message = errorData?.error?.message || `인증 실패 (HTTP ${res.status})`;
    return { valid: false, error: message };
  } catch (err: any) {
    return { valid: false, error: err.message || '네트워크 연결 오류가 발생했습니다.' };
  }
};

/** Gemini API에 메시지 전송 및 답변 수신 */
export const sendGeminiPrompt = async (
  prompt: string,
  history: ChatMessage[] = [],
  customApiKey?: string,
  targetModel?: GeminiModelId
): Promise<string> => {
  const apiKey = customApiKey || getStoredApiKey();

  if (!apiKey) {
    throw new Error('Gemini API 키가 등록되지 않았습니다. 상단 API 키 설정에서 키를 먼저 등록해 주세요.');
  }

  const model = targetModel || getSelectedModel();

  // 이전 대화 내역 포맷팅 (최근 6개 대화 유지)
  const recentHistory = history.slice(-6).map((msg) => ({
    role: msg.role === 'model' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));

  const contents = [
    ...recentHistory,
    {
      role: 'user',
      parts: [{ text: prompt }]
    }
  ];

  const payload = {
    contents,
    systemInstruction: {
      parts: [{ text: SYSTEM_INSTRUCTION }]
    },
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      maxOutputTokens: 3072
    }
  };

  // 1차 시도: 요청된 모델 (gemini-3.8-flash 또는 gemini-3.5-flash-lite)
  let activeModel = model;
  let url = `https://generativelanguage.googleapis.com/v1beta/models/${activeModel}:generateContent?key=${apiKey.trim()}`;

  let response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  // 404 모델 미지원 시 2차 시도: fallback 모델
  if (response.status === 404) {
    activeModel = FALLBACK_MODEL as GeminiModelId;
    url = `https://generativelanguage.googleapis.com/v1beta/models/${activeModel}:generateContent?key=${apiKey.trim()}`;
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData?.error?.message || `API 요청 실패 (HTTP ${response.status})`;
    throw new Error(errorMessage);
  }

  const data = await response.json();
  const candidate = data?.candidates?.[0];
  const replyText = candidate?.content?.parts?.[0]?.text;

  if (!replyText) {
    throw new Error('응답을 생성하지 못했습니다. 질문 내용을 조금 더 구체적으로 변경해 보세요.');
  }

  return replyText;
};
