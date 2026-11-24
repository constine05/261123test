# UE5 Starter Roadmap (언리얼 엔진 5 입문자 로드맵 & AI 멘토)

언리얼 엔진 5(UE5) 게임 제작 입문자를 위한 반응형 웹 애플리케이션(MVP)입니다.  
별도의 백엔드 데이터베이스 없이 클라이언트 브라우저 환경에서 즉시 실행되며, 학습 진도·퀴즈 점수·북마크·개인 메모 및 **Gemini 3.8 Flash AI 멘토** 질의응답을 제공합니다.

---

## 🎮 주요 기능

1. **대시보드 & 학습 진도 트래커**
   - 전체 커리큘럼(16개 레슨) 진행률(%) 실시간 계산 및 시각화 프로그레스 바
   - 달성도에 따른 동적 등급 부여 (노비스 → 수습생 → 주니어 → 마스터)
   - 가장 최근에 보았거나 완료하지 않은 레슨으로 즉각 연결되는 **'이어서 학습하기'** 히어로 카드

2. **단계별 UE5 학습 로드맵 (4대 핵심 트랙 & 16개 세부 레슨)**
   - 🧭 **UE5 에디터 기초**: 뷰포트 네비게이션, 액터 트랜스폼/스냅, 에셋 명명 규칙 & 리디렉터, 패키징 파이프라인
   - ⚡ **블루프린트 핵심**: 비주얼 스크립팅, 이벤트 그래프, 변수 & Cast To, BPI/이벤트 디스패처, 충돌(Collision) 매트릭스
   - 💻 **언리얼 C++ 입문**: 리플렉션 매크로(UCLASS/UPROPERTY/UFUNCTION), AActor 수명 주기, C++ & BP 하이브리드 아키텍처, TObjectPtr & 가비지 컬렉션
   - 🌄 **레벨 디자인 (Lumen & Nanite)**: 나나이트 가상화 지오메트리, 루멘 실시간 글로벌 일루미네이션, 환경 라이팅(Sky Atmosphere/Fog), 월드 파티션(OFPA)
   - 각 레슨별 핵심 단축키 칩, 실습 미션 가이드, 완료 체크 토글 및 개인 메모장 내장

3. **🤖 Gemini AI 파워드 UE5 AI 멘토 스튜디오**
   - **지원 모델:**
     - `gemini-3.8-flash`: UE5 블루프린트 설계 및 정밀한 C++ 코드 작성에 특화된 고지능 모델 (기본값)
     - `gemini-3.5-flash-lite`: 빠른 질의응답 및 단축키 조회를 위한 초저지연 라이트 모델
   - **원클릭 모델 전환:** 상단 헤더, 스튜디오 페이지 및 플로팅 위젯에서 자유롭게 모델 스위칭 가능
   - **사용자 API 키 직접 입력:** 사용자가 Google AI Studio에서 발급받은 무료 API 키를 웹에서 직접 입력하여 사용
   - **완전한 클라이언트 보안:** API 키는 사용자의 브라우저 `localStorage`에만 저장되며 외부 서버를 거치지 않음
   - **3가지 특화 모드 제공:**
     - 💡 **자유 질의응답**: 에디터 조작법, 나나이트/루멘 그래픽스, 용어 질문
     - ⚡ **블루프린트 & C++ 코드 생성기**: 자연어로 요구사항 입력 시 BP 노드 연결 순서와 C++ 코드 즉시 작성
     - 🐛 **에디터 오류 & 크래시 해결사**: VS 빌드 에러 및 언리얼 런타임 크래시 로그 분석
   - 전 페이지에서 언제든 열어볼 수 있는 플로팅 챗 위젯 및 전용 풀스크린 스튜디오(`/ai`) 동시 지원

4. **블루프린트 & 핵심 용어 빠른 검색 사전 (Cheat Sheet)**
   - Actor, Pawn, Character, GameModeBase, Tick, LineTrace 등 필수 엔진 개념 및 주요 블루프린트 노드 수록
   - 실시간 텍스트 검색 및 카테고리 필터링
   - 개념 요약, 주로 쓰는 상황, C++ 대응 코드 스니펫(원클릭 복사 지원) 및 노드 실행 흐름 제공

5. **개념 확인 미니 퀴즈**
   - 4개 트랙별 객관식 퀴즈 (문항별 4지 선다)
   - 정답 선택 시 **즉시 해설 카드** 표시 및 점수 자동 기록
   - 재도전 및 트랙별 최고 점수 이력 관리

6. **개인화 아카이브 (학습 메모 & 북마크)**
   - 레슨별 작성한 실습 일지 모아보기 및 삭제/편집
   - 자주 찾는 레슨 및 필수 용어 원클릭 즐겨찾기

---

## 🛠️ 기술 스택

- **언어:** TypeScript 5.x (Strict 모드 준수)
- **프레임워크:** Next.js 14+ (App Router)
- **스타일링:** Tailwind CSS 3.x (언리얼 에디터 다크 슬레이트 테마)
- **아이콘:** `lucide-react`
- **AI 엔진:** Google Gemini API (`gemini-3.8-flash`, 사용자 자체 키 입력 방식)
- **상태 관리 및 저장:** React Context API + 브라우저 `localStorage` (SSR Hydration 오류 원천 방지)
- **배포:** Netlify (`netlify.toml` + `@netlify/plugin-nextjs`)

---

## 📁 프로젝트 폴더 구조

```text
├── .gitignore
├── netlify.toml              # Netlify 배포 빌드 설정
├── next.config.mjs
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── README.md
└── src/
    ├── app/
    │   ├── globals.css           # 다크 모드 스타일 & 커스텀 스크롤바
    │   ├── layout.tsx            # Context Provider, GNB, 푸터, AI 위젯
    │   ├── page.tsx              # 대시보드 (진도율, 통계, 트랙 개요, 이어하기)
    │   ├── ai/
    │   │   └── page.tsx          # 🤖 Gemini 3.8 Flash AI 멘토 스튜디오
    │   ├── roadmap/
    │   │   └── page.tsx          # 4개 트랙 & 16개 레슨 로드맵
    │   ├── glossary/
    │   │   └── page.tsx          # 블루프린트 노드 & UE5 사전 치트시트
    │   ├── quiz/
    │   │   └── page.tsx          # 트랙별 개념 확인 퀴즈 & 결과
    │   └── notes/
    │       └── page.tsx          # 작성한 메모 & 북마크 모아보기
    ├── components/
    │   ├── Navbar.tsx            # 최상단 글로벌 네비게이션 & API 키 상태 뱃지
    │   ├── Footer.tsx            # 하단 푸터
    │   ├── ApiKeyModal.tsx       # 🔑 사용자 Gemini API 키 등록/관리 모달
    │   ├── AiAssistantWidget.tsx # 💬 플로팅 AI 챗 어시스턴트 위젯
    │   ├── ProgressBar.tsx       # 전체 학습 진행률 바 & 랭크 뱃지
    │   ├── DashboardStats.tsx    # 4대 통계 카드 & 이어서 학습하기 카드
    │   ├── LessonCard.tsx        # 레슨 카드 (완료 체크, 단축키, 실습, 메모)
    │   ├── GlossaryCard.tsx      # 용어 카드 (C++ 코드, 노드 흐름, 태그)
    │   ├── QuizRunner.tsx        # 퀴즈 풀이 컴포넌트 (즉시 해설, 점수 저장)
    │   └── NoteEditor.tsx        # 레슨별 실시간 로컬 메모 편집기
    ├── data/
    │   ├── curriculum.ts         # 4개 트랙 16개 정량 커리큘럼 데이터
    │   ├── glossary.ts           # 필수 언리얼 엔진 5 용어 & 노드 데이터
    │   └── quizzes.ts            # 트랙별 4문항 퀴즈 & 한국어 해설 데이터
    ├── hooks/
    │   └── useLearningProgress.tsx # localStorage 동기화 & Context 공급자
    ├── services/
    │   └── gemini.ts             # 🤖 Gemini 3.8 Flash API 클라이언트 & 유효성 검증
    └── types/
        └── index.ts              # TypeScript 인터페이스 & 도메인 모델
```

---

## 📦 깃허브(GitHub) 수동 업로드 안내

### 1. 꼭 올려야 하는 파일 및 폴더 (100% 필수)
- **`src/`** 폴더 전체 (모든 소스 코드 및 데이터)
- **`package.json`**
- **`tsconfig.json`**
- **`tailwind.config.ts`**
- **`postcss.config.js`**
- **`next.config.mjs`**
- **`netlify.toml`**
- **`.gitignore`**
- **`README.md`**

### 2. 절대 올리지 말아야 하는 파일 및 폴더 (용량 낭비 및 보안 방지)
- ❌ **`node_modules/`** (다운로드된 무거운 라이브러리들, 깃허브 용량 초과 원인)
- ❌ **`.next/`** (로컬 빌드 임시 결과물)
- ❌ **`.env`, `.env.local`** (비밀 환경변수 파일이 생기더라도 제외)
- ❌ **`.netlify/`** (넷리파이 로컬 캐시)

> 💡 **팁:** 프로젝트 루트에 포함된 [`.gitignore`](file:///c:/Users/유아122-00/Desktop/새%20폴더/.gitignore) 파일에 이미 위 폴더들이 등록되어 있으므로, Git 명령어를 사용할 경우 불필요한 파일이 자동으로 제외됩니다.

---

## 🚀 로컬 실행 방법

### 1. 패키지 설치
```bash
npm install
```

### 2. 개발 서버 구동
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 3. 프로덕션 빌드 & 테스트
```bash
npm run build
npm run start
```
