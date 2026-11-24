import { TrackQuiz } from '@/types';

export const TRACK_QUIZZES: TrackQuiz[] = [
  {
    trackId: 'editor-basics',
    title: 'UE5 에디터 기초 역량 평가',
    description: '3D 뷰포트 조작, 트랜스폼 기즈모, 에셋 관리 및 패키징의 핵심 규칙을 점검합니다.',
    passingScore: 75,
    questions: [
      {
        id: 'q-eb-1',
        trackId: 'editor-basics',
        question: '언리얼 엔진 5 뷰포트에서 선택한 특정 액터로 카메라를 즉시 화면 중앙에 근접 포커스시키는 단축키는 무엇인가요?',
        options: ['G 키', 'F 키', 'End 키', '스페이스바'],
        correctIndex: 1,
        explanation: 'F (Focus) 키를 누르면 아웃라이너나 뷰포트에서 현재 선택된 오브젝트를 화면 중앙에 오도록 카메라가 즉시 이동합니다. G는 게임 뷰 토글, End는 바닥 착지입니다.',
        referenceLessonId: 'editor-01'
      },
      {
        id: 'q-eb-2',
        trackId: 'editor-basics',
        question: '에픽게임즈 공식 명명 규칙(Naming Convention)에 따르면 블루프린트 클래스(Blueprint Class)에 권장되는 접두사(Prefix)는 무엇인가요?',
        options: ['SM_', 'BP_', 'M_', 'SK_'],
        correctIndex: 1,
        explanation: '블루프린트 클래스는 `BP_`, 스태틱 메쉬는 `SM_`, 머티리얼은 `M_`, 스켈레탈 메쉬는 `SK_`를 붙이는 것이 전 세계적인 표준 규칙입니다.',
        referenceLessonId: 'editor-03'
      },
      {
        id: 'q-eb-3',
        trackId: 'editor-basics',
        question: '에셋을 다른 프로젝트로 안전하게 모든 의존성(텍스처, 머티리얼)을 유지하며 내보낼 때 에디터에서 사용하는 공식 기능은 무엇인가요?',
        options: [
          '윈도우 탐색기에서 파일 직접 복사/붙여넣기',
          '에셋 액션 -> 이주 (Migrate)',
          '소스 코드 Export',
          '전체 프로젝트 압축 후 복사'
        ],
        correctIndex: 1,
        explanation: '단순 탐색기 복사는 종속 에셋 경로가 끊어집니다. 언리얼 에디터의 [이주 (Migrate)] 기능을 사용해야 연결된 모든 종속 에셋을 분석하여 대상 Content 폴더로 완벽하게 전송합니다.',
        referenceLessonId: 'editor-03'
      },
      {
        id: 'q-eb-4',
        trackId: 'editor-basics',
        question: '최종 사용자 배포용으로 패키징할 때, 에디터 전용 디버그 콘솔이나 오버헤드를 모두 제거하고 최대 성능을 내기 위해 선택해야 하는 빌드 구성은 무엇인가요?',
        options: ['Debug Game', 'Development', 'Shipping', 'Editor Test'],
        correctIndex: 2,
        explanation: 'Shipping 빌드는 콘솔 명령어, 온스크린 디버그 메시지 등 개발용 편의 기능을 모두 스트립하여 실행 파일 용량을 줄이고 최고 성능과 보안을 보장하는 배포 전용 모드입니다.',
        referenceLessonId: 'editor-04'
      }
    ]
  },
  {
    trackId: 'blueprint-core',
    title: '블루프린트 로직 & 아키텍처 평가',
    description: '이벤트 실행 순서, 캐스팅(Cast To), 블루프린트 인터페이스, 콜리전 시스템을 검증합니다.',
    passingScore: 75,
    questions: [
      {
        id: 'q-bp-1',
        trackId: 'blueprint-core',
        question: '블루프린트에서 액터가 게임 월드에 스폰되거나 레벨이 시작될 때 딱 한 번 호출되는 진입점 이벤트는 무엇인가요?',
        options: ['Event Tick', 'Event BeginPlay', 'Construction Script', 'Event Destroyed'],
        correctIndex: 1,
        explanation: '`Event BeginPlay`는 액터가 게임 세션에 진입할 때 1회 호출되는 초기화 이벤트입니다. Construction Script는 에디터에서 액터가 움직이거나 배치될 때마다 사전 실행됩니다.',
        referenceLessonId: 'bp-01'
      },
      {
        id: 'q-bp-2',
        trackId: 'blueprint-core',
        question: 'A 액터가 B 액터와 통신할 때 하드 레퍼런스(메모리 종속성)를 발생시키지 않고 결합도를 가장 낮추는 최선의 기법은 무엇인가요?',
        options: [
          'Cast To 노드로 직접 캐스팅하기',
          '블루프린트 인터페이스 (Blueprint Interface) 메시지 호출',
          '전역 공용 변수에 액터 저장하기',
          'Tick 이벤트에서 매 프레임 이름 검색하기'
        ],
        correctIndex: 1,
        explanation: '블루프린트 인터페이스는 대상 액터의 구체적인 타입을 몰라도 정해진 인터페이스 메시지를 보낼 수 있어 메모리 하드 레퍼런스를 완벽히 차단하고 결합도를 최소화합니다.',
        referenceLessonId: 'bp-03'
      },
      {
        id: 'q-bp-3',
        trackId: 'blueprint-core',
        question: '두 물체가 겹쳤을 때 OnComponentBeginOverlap 이벤트가 정상적으로 발동하기 위해 디테일 패널에서 반드시 활성화되어야 하는 속성은?',
        options: [
          'Simulate Physics',
          'Generate Overlap Events',
          'Enable Gravity',
          'Can Character Step Up On'
        ],
        correctIndex: 1,
        explanation: '`Generate Overlap Events` 체크박스가 꺼져있으면 콜리전 프로파일이 Overlap으로 설정되어 있어도 겹침 이벤트가 엔진 내부에서 생성되지 않습니다.',
        referenceLessonId: 'bp-04'
      },
      {
        id: 'q-bp-4',
        trackId: 'blueprint-core',
        question: '특정 객체 참조 변수를 읽기 전, 해당 객체가 삭제되었거나 메모리에서 유효하지 않은 널(Null) 포인터인지 사전에 안전하게 검증하는 노드는?',
        options: ['Is Valid', 'Cast Failed', 'Equal (Object)', 'Get Display Name'],
        correctIndex: 0,
        explanation: '`Is Valid` 매크로 노드는 객체 참조가 존재하는지(Valid) 아니면 삭제되었거나 null인지(Is Not Valid) 검사하여 크래시를 예방합니다.',
        referenceLessonId: 'bp-02'
      }
    ]
  },
  {
    trackId: 'unreal-cpp',
    title: '언리얼 C++ & 엔진 코어 역량 평가',
    description: '리플렉션 매크로(UPROPERTY/UFUNCTION), 액터 수명 주기, 포인터 메모리 관리를 평가합니다.',
    passingScore: 75,
    questions: [
      {
        id: 'q-cpp-1',
        trackId: 'unreal-cpp',
        question: '언리얼 C++ 클래스 헤더 파일에서 Unreal Header Tool(UHT)이 생성하는 자동 생성 헤더(#include "...generated.h")의 올바른 위치는 어디인가요?',
        options: [
          '헤더 파일의 가장 첫 번째 줄',
          '#pragma once 바로 다음 줄',
          '헤더 파일 내 모든 #include 구문 중 반드시 맨 마지막 줄',
          '클래스 선언부 내부'
        ],
        correctIndex: 2,
        explanation: '언리얼 엔진 빌드 시스템의 엄격한 규칙으로, `.generated.h` 파일은 항상 해당 헤더 파일의 #include 목록에서 가장 마지막에 위치해야 정상 컴파일됩니다.',
        referenceLessonId: 'cpp-01'
      },
      {
        id: 'q-cpp-2',
        trackId: 'unreal-cpp',
        question: 'C++ 액터 클래스의 생성자(Constructor)에서 기본 서브 컴포넌트를 생성하고 인스턴스화할 때 사용하는 올바른 함수는 무엇인가요?',
        options: [
          'NewObject<T>()',
          'CreateDefaultSubobject<T>()',
          'SpawnActor<T>()',
          'new T()'
        ],
        correctIndex: 1,
        explanation: '액터의 생성자에서는 반드시 `CreateDefaultSubobject<T>(TEXT("이름"))`을 통해 기본 서브오브젝트 컴포넌트를 생성해야 엔진 CDO(Class Default Object)에 올바르게 등록됩니다.',
        referenceLessonId: 'cpp-02'
      },
      {
        id: 'q-cpp-3',
        trackId: 'unreal-cpp',
        question: 'C++에서 디폴트 실행 로직을 제공하면서, 자식 블루프린트에서 필요시 오버라이드할 수 있도록 허용하는 UFUNCTION 지정자는 무엇인가요?',
        options: [
          'BlueprintCallable',
          'BlueprintImplementableEvent',
          'BlueprintNativeEvent',
          'BlueprintPure'
        ],
        correctIndex: 2,
        explanation: '`BlueprintNativeEvent`는 C++에서 `_Implementation` 함수로 기본 동작을 구현하고, 자식 블루프린트에서 이를 오버라이드할 수 있도록 허용하는 하이브리드 패턴의 핵심입니다.',
        referenceLessonId: 'cpp-03'
      },
      {
        id: 'q-cpp-4',
        trackId: 'unreal-cpp',
        question: '언리얼 엔진 5(UE5)에서 가비지 컬렉터와 긴밀하게 연동되고 순환 참조 문제를 방지하기 위해 권장되는 스마트 약한 참조 타입은 무엇인가요?',
        options: [
          'std::shared_ptr<T>',
          'TWeakObjectPtr<T>',
          'Raw Pointer (T*)',
          'TUniquePtr<T>'
        ],
        correctIndex: 1,
        explanation: '`TWeakObjectPtr<T>`는 UObject의 참조 카운트를 증가시키지 않고 안전하게 대상의 생존 여부(`IsValid()`)를 검사할 수 있어 순환 참조 릭을 방지하는 표준 약한 참조 포인터입니다.',
        referenceLessonId: 'cpp-04'
      }
    ]
  },
  {
    trackId: 'level-design',
    title: '차세대 그래픽스 (Lumen & Nanite) 역량 평가',
    description: '나나이트 가상화 지오메트리, 루멘 글로벌 일루미네이션, 월드 파티션 환경 구축을 검증합니다.',
    passingScore: 75,
    questions: [
      {
        id: 'q-ld-1',
        trackId: 'level-design',
        question: '언리얼 엔진 5의 나나이트(Nanite) 가상화 지오메트리에 대한 설명으로 올바르지 않은 것은 무엇인가요?',
        options: [
          '수백만 개의 폴리곤을 화면 픽셀 스케일의 클러스터로 실시간 분할 및 병합한다.',
          '아티스트가 수동으로 LOD 0, 1, 2, 3 메시를 생성해야만 작동한다.',
          '스태틱 메쉬 에디터에서 원클릭으로 활성화할 수 있다.',
          '반투명(Translucent) 머티리얼 적용 시 일부 제약이 존재한다.'
        ],
        correctIndex: 1,
        explanation: '나나이트의 핵심 혁신은 수동 LOD 제작 파이프라인의 완전한 제거입니다. 원본 고해상도 지오메트리를 넣으면 엔진이 시야 거리에 맞춰 자동으로 실시간 LOD를 제어합니다.',
        referenceLessonId: 'level-01'
      },
      {
        id: 'q-ld-2',
        trackId: 'level-design',
        question: '루멘(Lumen) 시스템의 가장 큰 특징이자 이전 UE4 라이팅 방식과의 근본적인 차이점은 무엇인가요?',
        options: [
          '오프라인으로 수 시간 동안 라이트맵을 미리 구워야(Baking) 한다.',
          '빛의 실시간 무한 간접 바운스광과 반사를 베이킹 없이 즉각 연산한다.',
          '오직 엔비디아 지포스 RTX 4090 이상의 그래픽 카드에서만 구동된다.',
          '그림자를 생성하지 않는 단순 앰비언트 라이트이다.'
        ],
        correctIndex: 1,
        explanation: '루멘은 완전 동적 글로벌 일루미네이션(GI) 시스템으로, 라이트맵 베이킹 절차를 완전히 없애고 실시간으로 빛이 벽에 튕기는 간접광과 반사를 시뮬레이션합니다.',
        referenceLessonId: 'level-02'
      },
      {
        id: 'q-ld-3',
        trackId: 'level-design',
        question: '언리얼 엔진 5 뷰포트에서 태양광(Directional Light)의 시간대 각도를 마우스로 즉시 실시간 회전 변경할 수 있는 편리한 단축키는?',
        options: [
          'Ctrl + L + 마우스 드래그',
          'Shift + T + 마우스 드래그',
          'Alt + G + 좌클릭',
          'Ctrl + F12'
        ],
        correctIndex: 0,
        explanation: '`Ctrl + L`을 누른 상태에서 마우스를 이동하면 Directional Light의 회전축이 실시간으로 조작되어 정오, 일몰, 밤하늘을 즉각적으로 확인할 수 있습니다.',
        referenceLessonId: 'level-03'
      },
      {
        id: 'q-ld-4',
        trackId: 'level-design',
        question: '월드 파티션(World Partition) 시스템에서 여러 명의 개발자가 한 레벨 파일을 동시에 작업해도 깃(Git) 버전 관리 충돌을 방지해 주는 혁신적인 파일 저장 방식은?',
        options: [
          'One File Per Actor (OFPA)',
          'Sublevel Streaming Lock',
          'Master Map Splitting',
          'Single Binary Serialization'
        ],
        correctIndex: 0,
        explanation: 'OFPA (One File Per Actor)는 거대한 레벨 파일(.umap) 하나에 모든 정보를 담는 대신, 각 액터를 별도의 작은 바이너리 파일로 분리 저장하여 팀원 간 충돌 없이 동시 편집을 지원합니다.',
        referenceLessonId: 'level-04'
      }
    ]
  }
];
