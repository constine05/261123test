# UE5 Starter Roadmap (언리얼 엔진 5 입문자 로드맵 & 치트시트)

언리얼 엔진 5(UE5) 게임 제작 입문자를 위한 반응형 웹 애플리케이션(MVP)입니다.  
별도의 백엔드 데이터베이스 없이 클라이언트 브라우저 환경에서 즉시 실행되며, 학습 진도·퀴즈 점수·북마크·개인 메모가 `localStorage`를 통해 안전하게 영구 보존됩니다.

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

3. **블루프린트 & 핵심 용어 빠른 검색 사전 (Cheat Sheet)**
   - Actor, Pawn, Character, GameModeBase, Tick, LineTrace 등 필수 엔진 개념 및 주요 블루프린트 노드 수록
   - 실시간 텍스트 검색 및 카테고리 필터링
   - 개념 요약, 주로 쓰는 상황, C++ 대응 코드 스니펫(원클릭 복사 지원) 및 노드 실행 흐름 제공

4. **개념 확인 미니 퀴즈**
   - 4개 트랙별 객관식 퀴즈 (문항별 4지 선다)
   - 정답 선택 시 **즉시 해설 카드** 표시 및 점수 자동 기록
   - 재도전 및 트랙별 최고 점수 이력 관리

5. **개인화 아카이브 (학습 메모 & 북마크)**
   - 레슨별 작성한 실습 일지 모아보기 및 삭제/편집
   - 자주 찾는 레슨 및 필수 용어 원클릭 즐겨찾기

---

## 🛠️ 기술 스택

- **언어:** TypeScript 5.x (Strict 모드 준수)
- **프레임워크:** Next.js 14+ (App Router)
- **스타일링:** Tailwind CSS 3.x (언리얼 에디터 다크 슬레이트 테마)
- **아이콘:** `lucide-react`
- **상태 관리 및 저장:** React Context API + 브라우저 `localStorage` (SSR Hydration 오류 원천 방지)

---

## 📁 프로젝트 폴더 구조

```text
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── README.md
└── src/
    ├── app/
    │   ├── globals.css           # 다크 모드 스타일 & 커스텀 스크롤바
    │   ├── layout.tsx            # Context Provider, 공통 헤더/푸터
    │   ├── page.tsx              # 대시보드 (진도율, 통계, 트랙 개요, 이어하기)
    │   ├── roadmap/
    │   │   └── page.tsx          # 4개 트랙 & 16개 레슨 로드맵
    │   ├── glossary/
    │   │   └── page.tsx          # 블루프린트 노드 & UE5 사전 치트시트
    │   ├── quiz/
    │   │   └── page.tsx          # 트랙별 개념 확인 퀴즈 & 결과
    │   └── notes/
    │       └── page.tsx          # 작성한 메모 & 북마크 모아보기
    ├── components/
    │   ├── Navbar.tsx            # 최상단 글로벌 네비게이션 & 미니 진도 뱃지
    │   ├── Footer.tsx            # 하단 푸터
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
    └── types/
        └── index.ts              # TypeScript 인터페이스 & 도메인 모델
```

---

## 🚀 로컬 실행 방법

### 1. 패키지 설치
```bash
npm install
# 또는 yarn install / pnpm install
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

---

## 🌐 Netlify 배포 방법

이 프로젝트에는 Netlify 전용 설정 파일([netlify.toml](file:///c:/Users/유아122-00/Desktop/새%20폴더/netlify.toml))과 `@netlify/plugin-nextjs` 런타임 플러그인이 구성되어 있어 복잡한 설정 없이 즉시 배포할 수 있습니다.

### 방법 1: GitHub / GitLab 연동 (권장)
1. 코드를 GitHub 저장소에 푸시합니다.
2. [Netlify 대시보드](https://app.netlify.com/)에서 **"Add new site" > "Import an existing project"** 선택
3. 저장소를 선택하면 `netlify.toml`을 감지하여 빌드 설정이 자동 완성됩니다:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
4. **"Deploy site"** 버튼을 클릭하면 수 분 내에 글로벌 배포가 완료됩니다.

### 방법 2: Netlify CLI로 로컬에서 직접 배포
```bash
# Netlify CLI 전역 설치 (미설치 시)
npm install -g netlify-cli

# Netlify 로그인
netlify login

# 배포 실행
netlify deploy --build --prod
```

