import { Track } from '@/types';

export const TRACKS: Track[] = [
  {
    id: 'editor-basics',
    title: 'UE5 에디터 기초',
    shortTitle: '에디터 기초',
    description: '언리얼 엔진 5의 인터페이스 구조, 3D 뷰포트 네비게이션, 액터 조작 및 프로젝트 빌드 프로세스를 익힙니다.',
    iconName: 'Compass',
    accentColor: 'text-sky-400',
    badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    lessons: [
      {
        id: 'editor-01',
        trackId: 'editor-basics',
        order: 1,
        title: '에디터 레이아웃과 뷰포트 네비게이션',
        summary: 'UE5 에디터의 주요 창 구성과 3D 뷰포트를 빠르고 능숙하게 다루는 카메라 조작법을 학습합니다.',
        estimatedMinutes: 20,
        difficulty: '입문',
        coreConcepts: ['뷰포트 렌더링 모드', 'WASD 비행 카메라 조작', '카메라 속도 스케일링', '기본 윈도우 도킹'],
        content: {
          overview: '언리얼 엔진 5는 이전 세대보다 직관적인 UI로 개편되었습니다. 상단 메인 툴바, 중앙 3D 뷰포트, 좌측 액터 배치 및 아웃라이너, 우측 디테일 패널, 하단 콘텐츠 드로어(Ctrl+Space)의 역할을 이해하는 것이 작업 속도의 핵심입니다.',
          keyPoints: [
            {
              subtitle: '1. 3D 뷰포트 카메라 조작법',
              body: '뷰포트 우클릭을 유지한 상태에서 W, A, S, D, Q(하강), E(상승) 키를 사용하여 FPS 게임을 하듯 씬 내부를 자유롭게 탐색할 수 있습니다. 마우스 휠을 굴려 카메라 이동 속도를 즉각 조절할 수 있습니다.'
            },
            {
              subtitle: '2. 뷰포트 뷰 모드와 표시 플래그',
              body: 'Lit(라이팅 포함), Unlit(무라이팅), Wireframe, Detail Lighting 등 다양한 모드를 지원합니다. 성능 디버깅이나 폴리곤 밀도를 확인할 때 필수적입니다.'
            },
            {
              subtitle: '3. 콘텐츠 드로어(Content Drawer)',
              body: 'Ctrl+Space를 누르면 언제든지 하단에서 콘텐츠 브라우저가 서랍 형태로 열리고, 빈 곳을 클릭하면 자동으로 닫혀 넓은 뷰포트 작업 공간을 확보해 줍니다.'
            }
          ]
        },
        tipsAndShortcuts: [
          { shortcut: 'F (Focus)', description: '아웃라이너나 뷰포트에서 선택한 액터로 카메라를 즉시 근접 이동시킵니다.' },
          { shortcut: 'Alt + 좌/우클릭 드래그', description: '선택한 오브젝트를 중심으로 카메라 궤도 회전(Tumble) 및 줌인/아웃을 수행합니다.' },
          { shortcut: 'Ctrl + Space', description: '콘텐츠 드로어를 토글하여 화면 공간을 절약합니다.' },
          { shortcut: 'G (Game View)', description: '기즈모, 아이콘, 볼륨 와이어프레임을 숨기고 실제 게임 화면처럼 뷰포트를 정돈합니다.' }
        ],
        practiceGuide: '기본 템플릿(Blank 또는 Third Person)을 열고, 아웃라이너에서 플레이어 스타트 액터를 찾아 F키를 눌러 포커스한 후, G키로 게임 뷰 모드를 켜고 끄며 조작감을 익혀보세요.'
      },
      {
        id: 'editor-02',
        trackId: 'editor-basics',
        order: 2,
        title: '액터(Actor)와 3D 트랜스폼(Transform) 조작',
        summary: '월드에 배치되는 모든 기본 단위인 액터의 위치, 회전, 스케일 조작 및 스냅(Snap) 기법을 숙달합니다.',
        estimatedMinutes: 25,
        difficulty: '기초',
        coreConcepts: ['월드(World) vs 로컬(Local) 좌표계', '트랜스폼 기즈모(W, E, R)', '그리드 스냅(Grid Snapping)', '피벗(Pivot) 정렬'],
        content: {
          overview: '언리얼 엔진에서 레벨에 스폰되거나 배치될 수 있는 모든 오브젝트는 AActor를 상속받습니다. 액터는 고유한 트랜스폼(Location, Rotation, Scale) 정보를 가집니다.',
          keyPoints: [
            {
              subtitle: '1. 기즈모 모드 전환 단축키',
              body: 'W키는 이동(Translate), E키는 회전(Rotate), R키는 스케일(Scale) 조절 기즈모를 활성화합니다. 스페이스바를 누르면 세 가지 모드가 순차적으로 순환 전환됩니다.'
            },
            {
              subtitle: '2. 월드 좌표계와 로컬 좌표계',
              body: '뷰포트 우측 상단의 지구본/큐브 아이콘(단축키 Ctrl + ~)을 통해 월드 절대 좌표계와 액터 기준 상대 좌표계를 스위칭할 수 있습니다. 경사진 물체를 이동할 때 로컬 좌표계 전환이 필수적입니다.'
            },
            {
              subtitle: '3. 그리드 스냅과 서피스 스냅',
              body: '모듈러 레벨 제작 시 10, 50, 100 단위의 위치 스냅을 켜두어야 메쉬 간의 틈새가 벌어지지 않습니다. End 키를 누르면 오브젝트가 바로 아래 지형 표면에 딱 달라붙습니다.'
            }
          ]
        },
        tipsAndShortcuts: [
          { shortcut: 'Alt + 기즈모 축 드래그', description: '선택한 액터를 복제하면서 즉시 원하는 축 방향으로 이동시킵니다.' },
          { shortcut: 'End 키', description: '액터를 바닥(충돌이 있는 지형 표면)으로 자동 착지시킵니다.' },
          { shortcut: 'Ctrl + End', description: '액터의 바운딩 박스를 기준으로 바닥 표면에 완벽하게 맞춥니다.' },
          { shortcut: '스페이스바', description: '이동(W) -> 회전(E) -> 스케일(R) 기즈모를 순환합니다.' }
        ],
        practiceGuide: '기본 큐브 메쉬를 뷰포트에 드래그 배치한 후, Alt + 드래그를 이용해 벽돌처럼 5개를 정밀하게 이어붙이고 End 키로 바닥에 정렬해 보세요.'
      },
      {
        id: 'editor-03',
        trackId: 'editor-basics',
        order: 3,
        title: '콘텐츠 브라우저와 효율적인 에셋 관리',
        summary: '에셋 폴더 구조 표준화, 명명 규칙(Naming Convention), 리디렉터(Redirector) 정리 방법을 익힙니다.',
        estimatedMinutes: 20,
        difficulty: '기초',
        coreConcepts: ['에픽게임즈 에셋 명명 규칙', '에셋 마이그레이션(Migrate)', '리디렉터 정리(Fix Up Redirectors)', '필터와 컬렉션'],
        content: {
          overview: '대규모 게임 프로젝트에서는 수천 개의 텍스처, 메쉬, 사운드 에셋이 사용됩니다. 정해진 명명 규칙과 폴더 계층을 지키지 않으면 빌드 오류와 메모리 낭비로 이어집니다.',
          keyPoints: [
            {
              subtitle: '1. 에픽게임즈 공식 권장 접두사 규칙',
              body: 'Static Mesh는 SM_, Skeletal Mesh는 SK_, Material은 M_, Material Instance는 MI_, Blueprint Class는 BP_, Texture는 T_ 접두사를 붙이는 것이 업계 표준입니다.'
            },
            {
              subtitle: '2. 리디렉터(Redirectors)의 중요성',
              body: '에디터에서 에셋을 다른 폴더로 이동하면 기존 참조 관계가 깨지지 않도록 보이지 않는 리디렉터 파일이 남습니다. 주기적으로 폴더 우클릭 후 [폴더의 리디렉터 고치기(Fix Up Redirectors)]를 실행해야 합니다.'
            },
            {
              subtitle: '3. 에셋 이주(Migrate) 기능',
              body: '단순히 윈도우 탐색기에서 파일을 복사하면 의존성(머티리얼, 텍스처 등)이 누락됩니다. 반드시 에디터 내에서 우클릭 -> [에셋 액션] -> [이주(Migrate)]를 사용해야 모든 연결 에셋이 완벽히 추출됩니다.'
            }
          ]
        },
        tipsAndShortcuts: [
          { shortcut: 'F2', description: '선택한 에셋이나 폴더의 이름을 즉시 변경합니다.' },
          { shortcut: 'Ctrl + B', description: '현재 뷰포트나 디테일 패널에서 선택된 오브젝트의 원본 에셋을 콘텐츠 브라우저에서 찾아줍니다.' },
          { shortcut: 'Ctrl + Shift + S', description: '수정된 모든 레벨과 에셋을 일괄 저장합니다.' }
        ],
        practiceGuide: '새 폴더 `Characters/Hero/`를 생성하고, `BP_HeroCharacter`, `SM_HeroSword`, `MI_HeroArmor` 처럼 표준 접두사를 적용한 더미 에셋들을 만들어 구조화해 보세요.'
      },
      {
        id: 'editor-04',
        trackId: 'editor-basics',
        order: 4,
        title: '프로젝트 패키징과 빌드 파이프라인',
        summary: '개발 중인 게임을 독립 실행형(Standalone Win64 .exe) 실행 파일로 빌드하고 쿠킹하는 절차를 배웁니다.',
        estimatedMinutes: 30,
        difficulty: '중급',
        coreConcepts: ['에셋 쿠킹(Cooking)', 'Shipping vs Development 빌드 설정', '기본 맵 지정', '로그 파일 분석'],
        content: {
          overview: '에디터 상에서 플레이(PIE)하는 것과 최종 유저에게 배포되는 패키징 빌드는 렌더링 최적화 및 런타임 환경에서 큰 차이가 있습니다.',
          keyPoints: [
            {
              subtitle: '1. 프로젝트 세팅과 기본 게임 맵',
              body: '[프로젝트 세팅] -> [맵 & 모드]에서 `Editor Startup Map`과 `Game Default Map`을 설정해야 합니다. 게임 기본 맵이 None으로 되어 있으면 패키징 후 실행 시 검은 화면만 출력됩니다.'
            },
            {
              subtitle: '2. 빌드 구성(Build Configuration)',
              body: 'Development 빌드는 콘솔 명령어(~), 온스크린 디버그 메시지 출력이 가능하여 테스트에 적합하며, Shipping 빌드는 디버그 코드를 모두 제거하고 성능을 극대화하여 실제 스팀 배포용으로 쓰입니다.'
            },
            {
              subtitle: '3. 에셋 쿠킹(Asset Cooking) 이해',
              body: '쿠킹이란 에디터 전용 포맷(.uasset)을 타겟 플랫폼(DirectX 12, Vulkan 등)의 바이너리로 직렬화/압축하는 필수 과정입니다.'
            }
          ]
        },
        tipsAndShortcuts: [
          { shortcut: 'Shift + F1', description: 'PIE(Play In Editor) 실행 중 마우스 커서를 게임 창 밖으로 빼낼 때 사용합니다.' },
          { shortcut: '~ (물결표)', description: '인게임 런타임 콘솔 창을 열어 `stat fps`, `stat unit` 명령어를 입력합니다.' }
        ],
        practiceGuide: '프로젝트 세팅에서 기본 맵을 세팅한 후 [플랫폼] -> [Windows] -> [프로젝트 패키지]를 실행하여 `WindowsNoEditor` 폴더에 생성된 `.exe`를 직접 실행해 보세요.'
      }
    ]
  },
  {
    id: 'blueprint-core',
    title: '블루프린트(Blueprint) 핵심',
    shortTitle: '블루프린트',
    description: '코딩 경험 없이도 게임 로직을 시각적으로 설계하는 비주얼 스크립팅의 필수 노드와 통신 패턴을 마스터합니다.',
    iconName: 'Workflow',
    accentColor: 'text-amber-400',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    lessons: [
      {
        id: 'bp-01',
        trackId: 'blueprint-core',
        order: 1,
        title: '비주얼 스크립팅 원리와 이벤트 그래프',
        summary: '화이트 실행 핀(Exec Pin), 데이터 핀의 차이와 BeginPlay, Tick 등 핵심 진입점 이벤트를 배웁니다.',
        estimatedMinutes: 25,
        difficulty: '입문',
        coreConcepts: ['실행 핀(White Exec Pin)', '순수 함수(Pure Function) vs 비순수 함수', 'Event BeginPlay', 'Event Tick과 Delta Seconds'],
        content: {
          overview: '블루프린트는 C++ 코드를 시각화한 완전한 객체 지향 프로그래밍 시스템입니다. 노드의 하얀색 화살표 핀은 코드의 실행 흐름(순서)을 나타내며, 유색 핀들은 데이터의 입력과 출력을 의미합니다.',
          keyPoints: [
            {
              subtitle: '1. 하얀색 실행 핀(Exec Pin)과 데이터 핀의 분리',
              body: '코드가 실행되려면 반드시 하얀색 실행선이 연결되어야 합니다. 반면 초록(Float), 파랑(Transform), 노랑(Vector) 등의 데이터 핀은 값이 전달되는 통로입니다.'
            },
            {
              subtitle: '2. 주요 핵심 이벤트',
              body: '`Event BeginPlay`는 액터가 게임 월드에 스폰되거나 레벨이 시작될 때 딱 한 번 호출됩니다. `Event Tick`은 매 프레임마다 호출되며 이전 프레임과의 시간 간격인 `Delta Seconds`를 제공합니다.'
            },
            {
              subtitle: '3. 순수(Pure) 함수 vs 비순수(Impure) 함수',
              body: '실행 핀이 없는 컴팩트한 녹색 노드는 순수 함수로, 연결된 노드가 실행될 때마다 즉석에서 값을 계산해 반환합니다. 실행 핀이 있는 비순수 함수는 부작용(상태 변화)을 일으키는 연산에 쓰입니다.'
            }
          ]
        },
        tipsAndShortcuts: [
          { shortcut: 'C 키', description: '선택한 노드들을 감싸는 주석 박스(Comment Box)를 생성하여 가독성을 높입니다.' },
          { shortcut: 'B + 좌클릭', description: '조건 분기문인 Branch(if-else) 노드를 1초 만에 생성합니다.' },
          { shortcut: 'S + 좌클릭', description: '코드 흐름을 순차적으로 여러 갈래로 분기하는 Sequence 노드를 생성합니다.' },
          { shortcut: 'Print String 노드', description: '화면 좌상단에 디버그 텍스트를 출력하여 로직의 정상 동작 여부를 확인합니다.' }
        ],
        practiceGuide: '`BP_TestActor`를 만들고 BeginPlay에 Print String을 연결하여 "엔진 로드 완료!"를 화면에 띄우고, Tick에서 Delta Seconds를 누적 출력해보세요.'
      },
      {
        id: 'bp-02',
        trackId: 'blueprint-core',
        order: 2,
        title: '변수, 데이터 타입, 캐스팅(Cast To) 심층 분석',
        summary: '기본 타입(Vector, Rotator)과 객체 참조, 그리고 런타임 안전성을 보장하는 Cast To 노드를 배웁니다.',
        estimatedMinutes: 30,
        difficulty: '기초',
        coreConcepts: ['Vector(위치)와 Rotator(회전)', 'Object Reference vs Class Reference', 'Cast To 노드와 유효성 검사', 'Is Valid 노드'],
        content: {
          overview: '블루프린트 변수는 데이터의 형태를 결정합니다. 특히 3D 공간을 다루는 Vector(X, Y, Z)와 Rotator(Roll, Pitch, Yaw)의 개념 및 동적 타입 변환인 Cast 노드를 바르게 이해해야 합니다.',
          keyPoints: [
            {
              subtitle: '1. 3D 좌표 데이터: Vector와 Rotator',
              body: '언리얼은 왼손 좌표계(X: 전방, Y: 우측, Z: 상방)를 사용합니다. 회전은 Roll(X축 회전), Pitch(Y축 회전), Yaw(Z축 회전)으로 정의됩니다.'
            },
            {
              subtitle: '2. Cast To 노드의 동작 원리',
              body: '부모 타입(예: Actor)으로 들어온 대상을 구체적인 자식 타입(예: BP_ThirdPersonCharacter)으로 다운캐스팅합니다. 성공 시 파란 출력 핀에서 자식의 고유 변수와 함수에 접근할 수 있으며, 실패 시 Cast Failed 핀으로 분기합니다.'
            },
            {
              subtitle: '3. 널 포인터 방지: Is Valid',
              body: '삭제되었거나 아직 생성되지 않은 액터 참조에 접근하면 충돌이 발생합니다. 객체 변수를 읽기 전 `Is Valid` 매크로 노드를 거치는 습관이 필수적입니다.'
            }
          ]
        },
        tipsAndShortcuts: [
          { shortcut: 'Alt + 변수 드래그', description: '내 블루프린트 패널에서 변수를 Alt를 누른 채 드래그하면 Set(변수 대입) 노드가 생성됩니다.' },
          { shortcut: 'Ctrl + 변수 드래그', description: '변수를 Ctrl을 누른 채 드래그하면 Get(변수 읽기) 노드가 생성됩니다.' },
          { shortcut: '핀 분할 (Split Struct Pin)', description: 'Vector나 Rotator 핀을 우클릭하고 "구조체 핀 분할"을 누르면 X, Y, Z 개별 float 핀으로 즉시 펼쳐집니다.' }
        ],
        practiceGuide: '트리거 박스에 들어온 액터(Other Actor)를 `Cast To Character`로 검사하여 플레이어일 때만 체력 변수를 감소시키는 로직을 만들어 보세요.'
      },
      {
        id: 'bp-03',
        trackId: 'blueprint-core',
        order: 3,
        title: '액터 간 통신 기법 (Cast vs Interface vs Dispatcher)',
        summary: '프로젝트가 커질수록 중요해지는 액터 간 결합도(Coupling)를 낮추는 3가지 상호작용 통신 패턴을 비교합니다.',
        estimatedMinutes: 35,
        difficulty: '중급',
        coreConcepts: ['하드 레퍼런스(Hard Reference)', '블루프린트 인터페이스(BPI)', '이벤트 디스패처(Event Dispatcher)', '느슨한 결합(Loose Coupling)'],
        content: {
          overview: 'A 액터가 B 액터와 소통할 때 Direct Cast를 남발하면 메모리에 모든 에셋이 얽혀 올라가는 하드 레퍼런스 지옥이 발생합니다. 상황에 맞는 통신 방식을 채택해야 합니다.',
          keyPoints: [
            {
              subtitle: '1. 다이렉트 캐스팅 (Direct Casting)',
              body: '특정 액터와 1:1로 긴밀하게 결합되어야 할 때 가장 빠르고 단순합니다. 그러나 A가 B를 캐스팅하면 B의 모든 종속 에셋이 메모리에 로드됩니다.'
            },
            {
              subtitle: '2. 블루프린트 인터페이스 (BPI)',
              body: '상대방이 문(Door)이든, NPC이든, 상자(Chest)이든 상관없이 "Interact(상호작용)" 함수를 일관되게 찌를 수 있습니다. 수신 측이 인터페이스를 구현하지 않았어도 게임이 튕기지 않고 무시되므로 결합도가 가장 낮습니다.'
            },
            {
              subtitle: '3. 이벤트 디스패처 (Event Dispatcher / Delegate)',
              body: '1:N 방송(Pub-Sub) 패턴입니다. 플레이어가 사망했을 때 `OnPlayerDied` 디스패처를 호출(Call)하면, UI 위젯, 사운드 매니저, 적 AI가 각자 바인딩해 둔 이벤트를 스스로 실행합니다.'
            }
          ]
        },
        tipsAndShortcuts: [
          { shortcut: '인터페이스 생성', description: '콘텐츠 브라우저 우클릭 -> 블루프린트 -> 블루프린트 인터페이스를 선택하여 생성합니다.' },
          { shortcut: 'Does Implement Interface', description: '액터가 특정 인터페이스를 지원하는지 런타임에 불리언으로 사전 체크할 수 있습니다.' }
        ],
        practiceGuide: '`BPI_Interactable` 인터페이스를 만들고 `Interact` 함수를 정의한 뒤, 불 켜는 스위치 액터와 보물상자 액터에 각각 인터페이스를 구현하여 단일 라인트레이스로 조작해 보세요.'
      },
      {
        id: 'bp-04',
        trackId: 'blueprint-core',
        order: 4,
        title: '컴포넌트 기반 아키텍처와 충돌(Collision) 처리',
        summary: '재사용 가능한 레고 블록 컴포넌트(Mesh, Collision, Movement) 구성과 언리얼 콜리전 채널 매트릭스를 다룹니다.',
        estimatedMinutes: 30,
        difficulty: '기초',
        coreConcepts: ['Root Component & Scene Component', 'Collision Preset (Overlap vs Block)', 'OnComponentBeginOverlap', 'Collision Response to Channels'],
        content: {
          overview: '언리얼의 액터는 빈 껍데기(Container)이며, 실제 시각적 외형, 충돌 판정, 이동 능력은 내부에 부착된 컴포넌트(Component)들이 담당합니다.',
          keyPoints: [
            {
              subtitle: '1. 루트 컴포넌트(Root Component)의 법칙',
              body: '액터의 월드 트랜스폼 위치는 오직 루트 씬 컴포넌트에 종속됩니다. 하위 컴포넌트들은 루트의 상대적(Relative) 위치로 배치됩니다.'
            },
            {
              subtitle: '2. 콜리전 응답(Collision Response): 무시(Ignore), 겹침(Overlap), 막힘(Block)',
              body: '두 물체가 부딪힐 때 한쪽이라도 Ignore면 아무 반응이 없고, 양쪽 모두 Block이어야 물리적 튕김이 일어납니다. 어느 한쪽이라도 Overlap이면 겹침 통과 이벤트(BeginOverlap)가 발생합니다.'
            },
            {
              subtitle: '3. Line Trace (Raycast)의 활용',
              body: '카메라 전방이나 총구에서 보이지 않는 선을 쏘아 물체와의 충돌 지점, 표면 법선(Normal), 피격 액터를 정확히 감지합니다.'
            }
          ]
        },
        tipsAndShortcuts: [
          { shortcut: 'Generate Overlap Events 체크', description: '오버랩 이벤트가 발동하지 않는 원인의 90%는 이 체크박스가 꺼져있기 때문입니다.' },
          { shortcut: 'Draw Debug Type', description: 'LineTrace 노드에서 Draw Debug Type을 For Duration(빨간 선)으로 두면 레이캐스트 경로를 눈으로 확인하며 디버깅할 수 있습니다.' }
        ],
        practiceGuide: 'BoxCollision 컴포넌트를 가진 발판 액터를 만들고, `OnComponentBeginOverlap` 이벤트에서 플레이어가 밟으면 점프력이 2배로 증가하는 부스터 패드를 구현해 보세요.'
      }
    ]
  },
  {
    id: 'unreal-cpp',
    title: '언리얼 C++ 입문',
    shortTitle: '언리얼 C++',
    description: '고성능 게임 개발과 대규모 시스템 설계를 위한 언리얼 네이티브 C++ 클래스 구조, U-매크로, 메모리 관리를 정복합니다.',
    iconName: 'Code2',
    accentColor: 'text-violet-400',
    badgeColor: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
    lessons: [
      {
        id: 'cpp-01',
        trackId: 'unreal-cpp',
        order: 1,
        title: '언리얼 리플렉션 시스템과 U-매크로',
        summary: 'UBT/UHT가 C++ 코드를 에디터와 블루프린트에 노출하는 UCLASS, UPROPERTY, UFUNCTION 매크로의 원리를 배웁니다.',
        estimatedMinutes: 30,
        difficulty: '중급',
        coreConcepts: ['Unreal Header Tool (UHT)', '.generated.h 헤더', 'UPROPERTY 지정자 (EditAnywhere, BlueprintReadWrite)', 'UFUNCTION 지정자'],
        content: {
          overview: '표준 C++에는 런타임 타입 정보(RTTI)가 제한적입니다. 에픽게임즈는 자체 리플렉션 도구(UHT)를 만들어 C++ 변수와 함수를 블루프린트 그래프와 에디터 디테일 패널에서 제어할 수 있게 했습니다.',
          keyPoints: [
            {
              subtitle: '1. #include "클래스명.generated.h" 규칙',
              body: 'UHT가 생성하는 코드로, 헤더 파일의 최하단 include 목록 맨 마지막에 반드시 위치해야 합니다. 이 규칙을 어기면 컴파일 에러가 발생합니다.'
            },
            {
              subtitle: '2. 자주 쓰이는 UPROPERTY 지정자 조합',
              body: '`UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Combat") float Health;` -> 에디터 인스펙터 창과 블루프린트 그래프 양쪽 모두에서 편집 및 조회가 가능해집니다.'
            },
            {
              subtitle: '3. 가비지 컬렉션과의 연계',
              body: 'UObject 포인터에 UPROPERTY()를 붙여두지 않으면 언리얼의 가비지 컬렉터가 해당 객체를 사용하지 않는 것으로 간주하여 메모리에서 무단 수거(Dangling Pointer)해버릴 수 있습니다.'
            }
          ]
        },
        tipsAndShortcuts: [
          { shortcut: 'Live Coding (Ctrl + Alt + F11)', description: '에디터를 끄지 않고도 C++ 소스 수정 후 즉시 바이너리를 핫 리로딩(Live Coding)할 수 있습니다.' },
          { shortcut: 'VisibleAnywhere', description: '컴포넌트 포인터는 변수 자체를 교체하지 못하게 Edit 대신 VisibleAnywhere로 선언하는 것이 원칙입니다.' }
        ],
        practiceGuide: 'C++ 액터 클래스 `AMyItem`을 생성하고, 체력 회복량(`HealAmount`) 변수를 UPROPERTY로 선언한 후 라이브 코딩을 통해 에디터 디테일 패널에 노출되는지 확인해 보세요.'
      },
      {
        id: 'cpp-02',
        trackId: 'unreal-cpp',
        order: 2,
        title: 'AActor 파생 클래스 생성과 수명 주기(Lifecycle)',
        summary: 'C++ 생성자(Constructor), BeginPlay, Tick, EndPlay의 실행 순서와 컴포넌트 부착(CreateDefaultSubobject)을 배웁니다.',
        estimatedMinutes: 35,
        difficulty: '중급',
        coreConcepts: ['CreateDefaultSubobject', 'SetupAttachment', 'Super::BeginPlay()', 'PrimaryActorTick.bCanEverTick'],
        content: {
          overview: 'C++ 액터는 클래스 생성자에서 기본 컴포넌트 계층을 조립하고, 월드 스폰 후 생명주기 가상 함수들을 단계적으로 실행합니다.',
          keyPoints: [
            {
              subtitle: '1. 생성자(Constructor)에서의 컴포넌트 초기화',
              body: '`MeshComp = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("MeshComp"));` 코드로 컴포넌트를 할당하고 `MeshComp->SetupAttachment(RootComponent);`로 부모에 종속시킵니다.'
            },
            {
              subtitle: '2. 생명주기 순서: Constructor -> BeginPlay -> Tick -> EndPlay',
              body: '생성자는 에디터 로드 시점(CDO 생성)에도 실행되므로 월드 상호작용 로직을 넣으면 안 됩니다. 실제 게임 로직 초기화는 `BeginPlay()` 내부에서 수행해야 합니다.'
            },
            {
              subtitle: '3. Super 키워드 호출 필수',
              body: '`Super::BeginPlay();` 및 `Super::Tick(DeltaTime);` 호출을 누락하면 엔진 기반 클래스의 필수 내부 처리가 누락되어 버그가 발생합니다.'
            }
          ]
        },
        tipsAndShortcuts: [
          { shortcut: 'bCanEverTick 최적화', description: '매 프레임 연산이 필요 없는 액터는 생성자에서 `PrimaryActorTick.bCanEverTick = false;`로 설정하여 CPU 부하를 제거하세요.' },
          { shortcut: 'TEXT() 매크로', description: '언리얼의 FString이나 FName에 문자열 리터럴을 넘길 때는 플랫폼 호환성을 위해 반드시 `TEXT("이름")` 매크로로 감싸야 합니다.' }
        ],
        practiceGuide: 'C++ 생성자에서 RootComponent로 USceneComponent를 만들고, 그 아래 UStaticMeshComponent를 부착한 뒤 BeginPlay에서 UE_LOG를 찍어 출력 로그 창에서 확인해 보세요.'
      },
      {
        id: 'cpp-03',
        trackId: 'unreal-cpp',
        order: 3,
        title: 'C++와 블루프린트의 하이브리드 협업 아키텍처',
        summary: '성능이 필요한 무거운 연산은 C++ 베이스에 두고, 비주얼 연출은 블루프린트 자식에서 완성하는 현업 권장 패턴을 학습합니다.',
        estimatedMinutes: 35,
        difficulty: '심화',
        coreConcepts: ['BlueprintCallable vs BlueprintPure', 'BlueprintImplementableEvent', 'BlueprintNativeEvent', 'CDO (Class Default Object)'],
        content: {
          overview: 'AAA 게임 스튜디오에서는 100% C++이나 100% 블루프린트를 지양합니다. C++로 단단한 기반 클래스를 설계하고, 블루프린트 클래스가 이를 상속받아 사운드, 이펙트, 메쉬를 지정하는 하이브리드 방식을 채택합니다.',
          keyPoints: [
            {
              subtitle: '1. BlueprintCallable 함수',
              body: 'C++에서 복잡한 수학 계산이나 경로 탐색을 구현하고, `UFUNCTION(BlueprintCallable)`을 붙여 기획자가 블루프린트 그래프에서 일반 노드로 호출할 수 있게 합니다.'
            },
            {
              subtitle: '2. BlueprintImplementableEvent',
              body: '함수의 선언과 호출 시점은 C++에 존재하지만, 실제 실행 내용은 블루프린트에서 이벤트 노드로 직접 구현하도록 위임하는 패턴입니다.'
            },
            {
              subtitle: '3. BlueprintNativeEvent',
              body: 'C++에서 디폴트 동작(`함수명_Implementation`)을 정의해 두고, 필요시 자식 블루프린트에서 이를 오버라이드하여 덮어쓰거나 부모 호출을 덧붙일 수 있는 가장 유연한 방식입니다.'
            }
          ]
        },
        tipsAndShortcuts: [
          { shortcut: '헤더 변경 시 팁', description: 'UFUNCTION 지정자를 새로 추가하거나 시그니처를 바꿨을 때는 라이브 코딩 대신 에디터를 닫고 VS에서 정식 Rebuild하는 것이 안정적입니다.' }
        ],
        practiceGuide: 'C++에서 `OnTakeDamage`라는 `BlueprintNativeEvent`를 선언하고, C++에서는 체력 차감 로직을, 상속받은 자식 BP에서는 피격 파티클 이펙트를 재생하도록 역할을 나눠 보세요.'
      },
      {
        id: 'cpp-04',
        trackId: 'unreal-cpp',
        order: 4,
        title: '메모리 관리, 스마트 포인터(TObjectPtr)와 가비지 컬렉션(GC)',
        summary: '언리얼 가비지 컬렉터의 마킹(Mark-and-Sweep) 원리와 UE5 최신 TObjectPtr 포인터 규칙을 이해합니다.',
        estimatedMinutes: 30,
        difficulty: '심화',
        coreConcepts: ['TObjectPtr<T> (UE5 신규 표준)', 'TWeakObjectPtr<T>', '가비지 컬렉션 루트(Root Set)', 'UPROPERTY를 통한 참조 유지'],
        content: {
          overview: 'C++의 대표적인 난제인 메모리 릭(Memory Leak)과 댕글링 포인터 크래시를 방지하기 위해 언리얼은 UObject 전용 가비지 컬렉션 시스템을 제공합니다.',
          keyPoints: [
            {
              subtitle: '1. UE5에서의 TObjectPtr 권장',
              body: 'UE4 시절의 날것 포인터(Raw Pointer `AActor*`) 대신, UE5에서는 헤더 파일 멤버 변수로 `TObjectPtr<AActor>`를 사용하는 것이 공식 표준입니다. 에디터 빌드에서 동적 액세스 추적 및 최적화를 지원합니다.'
            },
            {
              subtitle: '2. 순환 참조 방지: TWeakObjectPtr',
              body: '서로가 서로를 강한 참조(Strong Reference)로 쥐고 있으면 GC가 절대 수거하지 못합니다. 캐싱 목적의 참조는 `TWeakObjectPtr<T>`를 사용하여 대상이 파괴되었을 때 안전하게 감지(`IsValid()`)해야 합니다.'
            },
            {
              subtitle: '3. ConditionalBeginDestroy()와 수거 주기',
              body: '객체가 파괴 대기 상태가 되면 즉시 지워지는 것이 아니라 다음 GC 주기(CollectGarbage)에 일괄 수거됩니다.'
            }
          ]
        },
        tipsAndShortcuts: [
          { shortcut: 'GC 강제 실행 콘솔 명령', description: '인게임 콘솔(~)에서 `obj gc`를 입력하여 즉시 가비지 컬렉션을 강제 구동할 수 있습니다.' },
          { shortcut: 'nullptr 검사 습관', description: '포인터를 다룰 때는 항상 `if (MyActor) { ... }` 또는 `IsValid(MyActor)` 검사를 잊지 마세요.' }
        ],
        practiceGuide: '자신을 타겟팅하는 적의 참조를 `TWeakObjectPtr<AActor>`로 보관하고, 타겟 액터가 파괴되었을 때 안전하게 `TargetActor.IsValid()`가 false를 반환하는지 로그로 검증해 보세요.'
      }
    ]
  },
  {
    id: 'level-design',
    title: '레벨 디자인 & 차세대 그래픽스',
    shortTitle: '레벨 디자인 (Lumen/Nanite)',
    description: 'UE5의 시그니처 혁신 기술인 나나이트(가상화 지오메트리)와 루멘(글로벌 일루미네이션), 월드 파티션을 활용한 차세대 레벨 빌드 기법을 배웁니다.',
    iconName: 'Layers',
    accentColor: 'text-emerald-400',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    lessons: [
      {
        id: 'level-01',
        trackId: 'level-design',
        order: 1,
        title: '나나이트(Nanite) 가상화 지오메트리 파이프라인',
        summary: '수백만 개의 폴리곤을 수동 LOD 작업 없이 픽셀 스케일로 실시간 렌더링하는 나나이트의 원리와 제약 사항을 탐구합니다.',
        estimatedMinutes: 25,
        difficulty: '기초',
        coreConcepts: ['마이크로 폴리곤 가상화', 'LOD(Level of Detail) 자동화', '나나이트 시각화 뷰(Nanite Visualizers)', '불투명(Opaque) 메쉬 제약'],
        content: {
          overview: '나나이트(Nanite)는 ZBrush에서 조각한 고해상도 영화급 하이폴리곤 원본을 노멀맵 베이킹이나 폴리곤 다운사이징 없이 언리얼 씬에 그대로 드롭할 수 있게 만든 혁명적 기술입니다.',
          keyPoints: [
            {
              subtitle: '1. 나나이트의 내부 작동 메커니즘',
              body: '화면 화면상 픽셀 크기에 맞춰 지오메트리를 클러스터(Cluster) 단위로 쪼개고, 시야 거리에 따라 매 프레임 동적으로 해상도를 조절합니다. 그 결과 폴리곤 수천만 개가 있어도 드로우콜과 메모리 오버헤드가 극적으로 줄어듭니다.'
            },
            {
              subtitle: '2. 나나이트 활성화 방법',
              body: '스태틱 메쉬 에디터에서 [Nanite Settings] -> [Enable Nanite Support] 체크박스를 켜고 [Apply Changes]를 누르면 즉시 변환됩니다.'
            },
            {
              subtitle: '3. 나나이트 사용 시 주의 및 한계',
              body: '반투명(Translucent) 머티리얼, 스켈레탈 메쉬(일부 지원 확대 중이나 전통적 제약 존재), 양면 잎사귀 식생(Foliage)의 경우 마스크 처리 비용을 고려해야 합니다.'
            }
          ]
        },
        tipsAndShortcuts: [
          { shortcut: '뷰포트 나나이트 뷰 모드', description: '뷰포트 상단 [Lit] -> [Nanite Visualization] -> [Triangles]를 선택하면 나나이트 클러스터가 실시간으로 재구성되는 모습을 컬러로 볼 수 있습니다.' }
        ],
        practiceGuide: '메가스캔(Quixel Megascans) 또는 고폴리곤 바위 메쉬를 임포트하여 나나이트를 활성화하고, 뷰포트에서 거리를 조절하며 삼각형 밀도 시각화 모드를 관찰해 보세요.'
      },
      {
        id: 'level-02',
        trackId: 'level-design',
        order: 2,
        title: '루멘(Lumen) 실시간 글로벌 일루미네이션과 반사',
        summary: '라이트맵을 몇 시간 동안 굽는 베이킹(Baking) 없이 무한 간접광(GI)과 사실적 반사를 실시간 계산하는 루멘을 설정합니다.',
        estimatedMinutes: 30,
        difficulty: '중급',
        coreConcepts: ['글로벌 일루미네이션(Global Illumination)', '소프트웨어 vs 하드웨어 레이트레이싱', '포스트 프로세스 볼륨(Post Process Volume)', '발광(Emissive) 머티리얼 조명'],
        content: {
          overview: '루멘은 빛이 벽이나 바닥에 튕겨 나오는 간접 바운스광(Bounce Light)을 실시간으로 시뮬레이션합니다. 레벨의 벽을 부수거나 태양 각도를 바꾸면 즉시 빛과 그림자가 자연스럽게 변화합니다.',
          keyPoints: [
            {
              subtitle: '1. 프로젝트 세팅과 루멘 활성화',
              body: '[프로젝트 세팅] -> [렌더링]에서 Dynamic Global Illumination Method를 `Lumen`으로, Reflection Method를 `Lumen`으로 지정합니다.'
            },
            {
              subtitle: '2. 메시 디스턴스 필드(Mesh Distance Fields)',
              body: '루멘 소프트웨어 레이트레이싱은 메쉬의 3D 부호화 거리 필드(SDF)를 사용하여 광선을 추적하므로 고사양 RT 코어가 없는 환경에서도 뛰어난 퍼포먼스를 냅니다.'
            },
            {
              subtitle: '3. 포스트 프로세스 볼륨으로 루멘 미세 조절',
              body: 'Post Process Volume을 배치하고 `Infinite Extent (Unbound)`를 켜면 레벨 전체의 루멘 GI 품질, 최종 수집(Final Gather) 품질, 레이트레이싱 최대 바운스 수를 제어할 수 있습니다.'
            }
          ]
        },
        tipsAndShortcuts: [
          { shortcut: 'Lumen Scene 시각화', description: '뷰포트 [Lit] -> [Lumen] -> [Lumen Scene]을 통해 루멘이 월드를 표면 캐시로 어떻게 인식하고 있는지 디버깅할 수 있습니다.' }
        ],
        practiceGuide: '창문이 하나 있는 밀폐된 방을 만들고 창밖에서 Directional Light를 비춘 뒤, 직사광선이 닿지 않는 어두운 구석이 바닥의 바운스광으로 은은하게 밝아지는 루멘 GI를 관찰해 보세요.'
      },
      {
        id: 'level-03',
        trackId: 'level-design',
        order: 3,
        title: '언리얼 라이팅 시스템 (Sky Atmosphere & Volumetric Fog)',
        summary: '태양광, 대기 산란, 볼류메트릭 클라우드, 지수형 높이 안개를 유기적으로 결합하여 사실적인 야외 환경을 구축합니다.',
        estimatedMinutes: 25,
        difficulty: '중급',
        coreConcepts: ['Directional Light (태양광)', 'Sky Atmosphere (대기 산란)', 'Sky Light (환경 스카이광)', 'Exponential Height Fog (빛기둥 연출)'],
        content: {
          overview: 'UE5의 물리 기반 환경 라이팅은 4개의 필수 액터가 상호작용하여 사실적인 하늘과 대기를 만듭니다. 지구 대기의 레일리(Rayleigh) 및 미(Mie) 산란 공식을 그대로 시뮬레이션합니다.',
          keyPoints: [
            {
              subtitle: '1. 4대 야외 필수 액터',
              body: '1) Directional Light(직사 태양), 2) Sky Atmosphere(대기 모델), 3) Sky Light(전천 간접광), 4) Exponential Height Fog(안개 및 대기 원근감). 이 넷이 모여 완전한 야외 환경이 완성됩니다.'
            },
            {
              subtitle: '2. Atmosphere Sun Light 인덱스 연결',
              body: 'Directional Light의 세팅에서 `Atmosphere Sun Light` 옵션을 켜두어야 태양 각도를 바꿀 때 하늘의 노을 색상과 태양 디스크 위치가 자동으로 연동됩니다.'
            },
            {
              subtitle: '3. 신비로운 빛줄기(God Ray) 연출',
              body: 'Exponential Height Fog에서 `Volumetric Fog` 체크박스를 활성화하면 숲속 나무 사이나 동굴 틈새로 쏟아지는 빛줄기를 실시간 렌더링할 수 있습니다.'
            }
          ]
        },
        tipsAndShortcuts: [
          { shortcut: 'Ctrl + L + 마우스 드래그', description: '뷰포트 화면 어디서든 이 단축키를 누르고 마우스를 움직이면 실시간으로 태양의 시간대(정오, 일몰, 밤)를 즉시 회전시킬 수 있습니다.' },
          { shortcut: '환경 라이트 믹서(Env Light Mixer)', description: '상단 창 메뉴에서 [환경 라이트 믹서]를 열면 4개 필수 액터를 원클릭으로 일괄 생성하고 조율할 수 있습니다.' }
        ],
        practiceGuide: 'Ctrl + L을 누른 채 마우스를 회전시켜 붉은 노을이 지는 황혼 시간대로 하늘을 바꾸고, Volumetric Fog의 밀도를 조절하여 몽환적인 석양 씬을 연출해 보세요.'
      },
      {
        id: 'level-04',
        trackId: 'level-design',
        order: 4,
        title: '월드 파티션(World Partition)과 대규모 오픈월드 구축',
        summary: '수 킬로미터의 거대한 오픈월드를 여러 디자이너가 동시 편집하고 그리드 셀 단위로 자동 스트리밍하는 월드 파티션을 다룹니다.',
        estimatedMinutes: 30,
        difficulty: '심화',
        coreConcepts: ['월드 파티션(World Partition)', 'One File Per Actor (OFPA)', '데이터 레이어(Data Layers)', '계층형 LOD(HLOD)'],
        content: {
          overview: '과거에는 거대한 맵을 구역별 서브레벨로 쪼개 수동 레벨 스트리밍 볼륨을 심어야 했습니다. UE5의 월드 파티션은 그리드 기반 셀 분할과 OFPA 시스템을 통해 대규모 팀 협업과 광활한 오픈월드를 자동화합니다.',
          keyPoints: [
            {
              subtitle: '1. One File Per Actor (OFPA)',
              body: '과거에는 레벨 파일(.umap) 하나를 누군가 수정하면 Git 충돌이 발생했습니다. OFPA는 액터마다 독립된 파일로 디스크에 저장하므로 팀원 10명이 같은 레벨에서 동시에 작업할 수 있습니다.'
            },
            {
              subtitle: '2. 런타임 그리드 셀 스트리밍',
              body: '플레이어의 현재 위치 반경에 속한 그리드 셀 액터들만 메모리에 스트리밍되고, 먼 거리에 있는 액터는 자동으로 언로드되어 무한한 크기의 월드를 구현할 수 있습니다.'
            },
            {
              subtitle: '3. 데이터 레이어(Data Layers)',
              body: '시즌 이벤트(할로윈, 크리스마스)나 파괴 전/후 상태처럼 서로 다른 월드 구성을 동일한 공간에 레이어 형태로 온/오프할 수 있는 강력한 기능입니다.'
            }
          ]
        },
        tipsAndShortcuts: [
          { shortcut: '월드 파티션 창 열기', description: '[창] -> [월드 파티션] -> [월드 파티션 에디터]에서 원하는 그리드 영역을 드래그 선택 후 우클릭하여 선택 영역만 로드/언로드할 수 있습니다.' }
        ],
        practiceGuide: '월드 파티션 활성화 레벨을 생성한 후, 월드 파티션 에디터 창에서 특정 영역만 로드하고 언로드해보며 뷰포트 메모리가 어떻게 최적화되는지 확인해 보세요.'
      }
    ]
  }
];
