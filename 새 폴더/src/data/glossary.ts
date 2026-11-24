import { GlossaryItem } from '@/types';

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    id: 'actor',
    name: 'Actor (액터)',
    category: 'Actor & Component',
    summary: '언리얼 엔진에서 레벨(World)에 배치하거나 스폰할 수 있는 모든 기본 객체 단위입니다.',
    description: 'AActor를 상속받는 모든 객체는 3D 공간에 존재할 수 있습니다. 자체적으로 비주얼이나 물리 기능을 수행하기보다는 SceneComponent나 StaticMeshComponent 같은 여러 컴포넌트를 부착하여 기능을 완성합니다.',
    commonUsage: '움직이는 문, 바닥의 보물상자, 몬스터, 조명, 카메라, 총알 등 월드에 실존하는 모든 사물을 구현할 때 기초 단위로 상속합니다.',
    codeSnippet: `// C++ 선언 예시
#include "GameFramework/Actor.h"
#include "MyActor.generated.h"

UCLASS()
class MYGAME_API AMyActor : public AActor
{
    GENERATED_BODY()
public:
    AMyActor();
protected:
    virtual void BeginPlay() override;
    virtual void Tick(float DeltaTime) override;
};`,
    blueprintNodeFlow: `[액터 배치] -> [컴포넌트 추가: StaticMesh] -> [이벤트 그래프 로직 작성]`,
    cppEquivalent: `AActor (모든 월드 배치 오브젝트의 최상위 기본 클래스)`,
    relatedTerms: ['Pawn', 'Character', 'SceneComponent'],
    tags: ['Core', 'OOP', 'World']
  },
  {
    id: 'pawn',
    name: 'Pawn (폰)',
    category: 'Actor & Component',
    summary: '플레이어나 인공지능(AI) 컨트롤러에 의해 직접 빙의(Possess)되어 제어될 수 있는 특수 액터입니다.',
    description: 'APawn은 입력을 수신하고 조종당할 수 있는 능력을 가집니다. 일반 액터와 달리 Controller(PlayerController 또는 AIController)와 결합하여 이동 및 공격 명령을 수행합니다.',
    commonUsage: '플레이어가 조작하는 우주선, 탱크, 드론, 체스 말, 또는 이동 제어가 필요한 단순 AI 몬스터를 만들 때 사용됩니다.',
    codeSnippet: `// Pawn 빙의 C++ 예시
APawn* MyPawn = GetWorld()->SpawnActor<APawn>(PawnClass);
APlayerController* PC = GetWorld()->GetFirstPlayerController();
if (PC && MyPawn)
{
    PC->Possess(MyPawn);
}`,
    blueprintNodeFlow: `[Possess (In: Controller, Pawn)] -> [Unpossess]`,
    cppEquivalent: `APawn : public AActor`,
    relatedTerms: ['Actor', 'Character', 'PlayerController'],
    tags: ['Control', 'Input', 'Player']
  },
  {
    id: 'character',
    name: 'Character (캐릭터)',
    category: 'Actor & Component',
    summary: '인간형 2족 보행 생명체를 위해 CapsuleCollision, CharacterMovementComponent, SkeletalMesh를 기본 내장한 고급 폰입니다.',
    description: 'ACharacter는 걷기, 달리기, 점프, 수영, 비행, 낙하 물리 처리를 자체적으로 연산해 주는 강력한 UCharacterMovementComponent를 탑재하고 있어 멀티플레이어 리플리케이션까지 기본 지원합니다.',
    commonUsage: '3인칭/1인칭 액션 게임의 주인공, 2족 보행하는 휴머노이드 적 NPC 및 보스 몬스터 개발 시 99% 사용됩니다.',
    codeSnippet: `// 점프 및 이동 C++
void AHeroCharacter::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
    Super::SetupPlayerInputComponent(PlayerInputComponent);
    // 점프 내장 함수 바인딩
    PlayerInputComponent->BindAction("Jump", IE_Pressed, this, &ACharacter::Jump);
}`,
    blueprintNodeFlow: `[EnhancedInputAction IA_Jump] -> [Jump 함수 호출] / [Add Movement Input]`,
    cppEquivalent: `ACharacter : public APawn`,
    relatedTerms: ['Pawn', 'CharacterMovementComponent', 'CapsuleCollision'],
    tags: ['Movement', 'Physics', 'Humanoid']
  },
  {
    id: 'gamemode-base',
    name: 'GameModeBase (게임 모드)',
    category: 'Core Concept',
    summary: '게임의 규칙, 점수 계산, 기본 플레이어 캐릭터 클래스 지정 및 승패 조건을 관장하는 심판 클래스입니다.',
    description: '서버 환경(또는 싱글플레이)에서만 유일하게 존재하며, 클라이언트에는 복제되지 않는 안전한 규칙 관리자입니다. 플레이어가 접속할 때 어떤 폰과 컨트롤러를 부여할지 결정합니다.',
    commonUsage: '플레이어 리스폰 시간, 사망 시 패널티, 라운드 제한 시간, 경기 시작/종료 판정, 기본 HUD 클래스 지정을 담당합니다.',
    codeSnippet: `// 기본 스폰 폰 클래스 지정 C++
AMyGameMode::AMyGameMode()
{
    static ConstructorHelpers::FClassFinder<APawn> PlayerPawnBPClass(TEXT("/Game/Characters/BP_Hero"));
    if (PlayerPawnBPClass.Class != nullptr)
    {
        DefaultPawnClass = PlayerPawnBPClass.Class;
    }
}`,
    blueprintNodeFlow: `[Project Settings] -> [Maps & Modes] -> [Default GameMode] -> [Default Pawn Class 지정]`,
    cppEquivalent: `AGameModeBase : public AInfo`,
    relatedTerms: ['PlayerController', 'GameStateBase', 'PlayerState'],
    tags: ['Rule', 'Server', 'Architecture']
  },
  {
    id: 'player-controller',
    name: 'PlayerController (플레이어 컨트롤러)',
    category: 'Core Concept',
    summary: '인간 플레이어의 의지(키보드/마우스/게임패드 입력)를 물리적 폰에 전달하고 UI(HUD)를 관리하는 매개체입니다.',
    description: '폰은 게임 도중 죽거나 바뀔 수 있지만, 플레이어 컨트롤러는 경기 내내 유지되어 입력 매핑 및 카메라 뷰 타겟을 안정적으로 유지합니다.',
    commonUsage: '마우스 커서 표시(`bShowMouseCursor`), 일시정지 메뉴 열기, 포커스 제어, 폰 사망 후 관전 모드 전환 등에 사용됩니다.',
    codeSnippet: `// 마우스 커서 활성화 C++
APlayerController* PC = UGameplayStatics::GetPlayerController(GetWorld(), 0);
if (PC)
{
    PC->bShowMouseCursor = true;
    PC->SetInputMode(FInputModeUIOnly());
}`,
    blueprintNodeFlow: `[Get Player Controller (Index 0)] -> [Set Show Mouse Cursor (true)]`,
    cppEquivalent: `APlayerController : public AController`,
    relatedTerms: ['Pawn', 'GameModeBase', 'EnhancedInput'],
    tags: ['Input', 'UI', 'Controller']
  },
  {
    id: 'tick',
    name: 'Event Tick (틱 이벤트)',
    category: 'Blueprint Node',
    summary: '게임의 매 프레임마다 연속적으로 호출되는 업데이트 이벤트 노드입니다.',
    description: '`Delta Seconds`(이전 프레임에서 현재 프레임까지 걸린 시간 초)를 인자로 제공합니다. 프레임률(FPS) 변동에 관계없이 일정한 속도를 유지하기 위해 이동 공식에 항상 Delta Seconds를 곱해야 합니다.',
    commonUsage: '지속적인 카메라 추적, 미사일 유도 궤적 계산, 부드러운 보간(FInterpTo) 처리에 사용되나, 과도하게 사용할 경우 심각한 성능 저하를 초래합니다.',
    codeSnippet: `// C++ Tick 함수
void AMyActor::Tick(float DeltaTime)
{
    Super::Tick(DeltaTime);
    AddActorWorldRotation(FRotator(0.f, 90.f * DeltaTime, 0.f)); // 초당 90도 회전
}`,
    blueprintNodeFlow: `[Event Tick (Delta Seconds)] -> [FInterp To / Add Actor Local Offset]`,
    cppEquivalent: `virtual void Tick(float DeltaTime) override;`,
    relatedTerms: ['Delta Seconds', 'Timeline', 'Timer by Event'],
    tags: ['Performance', 'Frame', 'Update']
  },
  {
    id: 'line-trace',
    name: 'Line Trace (라인 트레이스 / 레이캐스트)',
    category: 'Blueprint Node',
    summary: '시작 지점과 끝 지점 사이에 보이지 않는 광선을 쏘아 장애물과의 충돌 여부를 판정합니다.',
    description: '`LineTraceSingleByChannel`은 지정된 충돌 채널(Visibility, Camera 등)과 교차하는 첫 번째 물체의 히트 결과(Out Hit)를 반환합니다. 타격 위치, 노멀 벡터, 맞은 액터 정보를 얻을 수 있습니다.',
    commonUsage: '총기 히트스캔 사격 판정, 플레이어 발밑의 지형 재질 파악(발소리 사운드 변경), 상호작용 대상 감지 등에 필수적으로 사용됩니다.',
    codeSnippet: `// C++ LineTrace 예시
FHitResult HitResult;
FVector Start = CameraComp->GetComponentLocation();
FVector End = Start + (CameraComp->GetForwardVector() * 5000.f);
FCollisionQueryParams Params;
Params.AddIgnoredActor(this);

bool bHit = GetWorld()->LineTraceSingleByChannel(
    HitResult, Start, End, ECC_Visibility, Params
);
if (bHit && HitResult.GetActor())
{
    // HitResult.GetActor()->TakeDamage(...)
}`,
    blueprintNodeFlow: `[LineTraceByChannel (Start, End, Visibility)] -> [Break Hit Result] -> [Hit Actor / Impact Point]`,
    cppEquivalent: `UWorld::LineTraceSingleByChannel(...)`,
    relatedTerms: ['Collision', 'Hit Result', 'Raycast'],
    tags: ['Combat', 'Interaction', 'Physics']
  },
  {
    id: 'cast-to',
    name: 'Cast To (캐스팅)',
    category: 'Blueprint Node',
    summary: '범용 부모 타입의 객체 참조를 구체적인 자식 클래스 타입으로 동적 다운캐스팅(Dynamic Cast)합니다.',
    description: '지정된 타입이 맞으면 해당 객체의 전용 변수와 함수에 접근할 수 있고, 타입이 일치하지 않으면 실패(Cast Failed) 핀으로 실행 흐름을 안전하게 분기합니다.',
    commonUsage: '충돌한 `Other Actor`가 플레이어 캐릭터인지 확인하여 대미지를 주거나, 오버랩된 아이템이 특정 무기인지 검사할 때 사용합니다.',
    codeSnippet: `// C++ Cast 예시
AActor* HitActor = ...;
if (AHeroCharacter* Hero = Cast<AHeroCharacter>(HitActor))
{
    Hero->ApplyHealing(50.f);
}`,
    blueprintNodeFlow: `[Overlap Event (Other Actor)] -> [Cast To BP_Player] -> (Success) -> [Add Health]`,
    cppEquivalent: `Cast<TTargetClass>(SourcePointer)`,
    relatedTerms: ['Blueprint Interface', 'Polymorphism', 'Is Valid'],
    tags: ['OOP', 'Type Safety', 'Logic']
  },
  {
    id: 'blueprint-interface',
    name: 'Blueprint Interface (BPI)',
    category: 'Core Concept',
    summary: '함수의 시그니처만 정의해 두고, 서로 다른 클래스들이 각자 독자적인 방식으로 구현하도록 만드는 계약(Contract)입니다.',
    description: '인터페이스를 통하면 상대방의 구체적인 클래스를 하드 레퍼런스(Cast To)하지 않고도 메시지를 전송할 수 있습니다. 수신 측이 인터페이스를 구현하지 않았어도 크래시 없이 무시됩니다.',
    commonUsage: 'E키를 눌렀을 때 상자는 "열리기", 문은 "회전하기", NPC는 "대화창 띄우기"처럼 공통의 Interact 메시지를 다형성 있게 처리할 때 최고 권장 방식입니다.',
    codeSnippet: `// C++ 인터페이스 호출 예시
if (TargetActor->GetClass()->ImplementsInterface(UInteractableInterface::StaticClass()))
{
    IInteractableInterface::Execute_OnInteract(TargetActor, this);
}`,
    blueprintNodeFlow: `[BPI_Interactable Message] -> [Target 액터에 함수 전송]`,
    cppEquivalent: `UInterface & IInterface`,
    relatedTerms: ['Cast To', 'Loose Coupling', 'Polymorphism'],
    tags: ['Architecture', 'Optimization', 'Modular']
  },
  {
    id: 'uproperty',
    name: 'UPROPERTY (언리얼 프로퍼티 매크로)',
    category: 'C++ & Engine',
    summary: 'C++ 멤버 변수를 언리얼 리플렉션 엔진, 에디터 세부 정보 패널, 블루프린트 그래프, 가비지 컬렉터에 등록합니다.',
    description: '이 매크로가 없는 C++ 포인터 변수는 엔진의 가비지 컬렉터가 인식하지 못해 런타임에 불시에 소멸될 수 있으며, 블루프린트에서 읽거나 쓸 수도 없습니다.',
    commonUsage: '에디터에서 기획자가 조절할 이동 속도 변수, HUD에 바인딩할 현재 체력 변수 등을 블루프린트에 노출할 때 선언합니다.',
    codeSnippet: `// C++ UPROPERTY 문법
UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Player Stats", meta = (ClampMin = "0.0", ClampMax = "100.0"))
float MaxHealth;`,
    blueprintNodeFlow: `C++ 헤더 선언 -> 에디터 디테일 패널에 'Player Stats' 그룹으로 즉시 노출`,
    cppEquivalent: `UPROPERTY(지정자...)`,
    relatedTerms: ['UFUNCTION', 'UCLASS', 'Reflection'],
    tags: ['C++', 'Garbage Collection', 'Editor']
  },
  {
    id: 'lumen',
    name: 'Lumen (루멘 실시간 GI)',
    category: 'Rendering & Physics',
    summary: 'UE5의 완전 실시간 글로벌 일루미네이션(GI) 및 반사 시스템으로, 라이트맵 베이킹 없이 빛의 간접 바운스를 연산합니다.',
    description: '태양의 각도를 실시간으로 움직이거나 실내 벽을 허물어도 빛이 반사되어 벽과 천장에 튕겨 들어오는 무한 바운스 간접광과 거울 반사를 즉시 물리 기반으로 재계산합니다.',
    commonUsage: '시간 변화(낮/밤 주기), 파괴 가능한 건물 내부 조명, 손전등을 켰을 때 방 전체가 은은하게 밝아지는 차세대 비주얼 구현에 사용됩니다.',
    codeSnippet: `// 콘솔 변수로 루멘 GI 품질 실시간 조절
r.Lumen.DiffuseIndirect.Allow 1
r.Lumen.Reflections.MaxRoughnessToTrace 0.4`,
    blueprintNodeFlow: `[PostProcessVolume] -> [Global Illumination: Lumen 선택] -> [Final Gather Quality 조절]`,
    cppEquivalent: `렌더러 코어 내장 피처 (Project Settings에서 기본 활성화)`,
    relatedTerms: ['Nanite', 'Ray Tracing', 'Post Process Volume'],
    tags: ['Graphics', 'NextGen', 'Lighting']
  },
  {
    id: 'nanite',
    name: 'Nanite (나나이트 가상화 지오메트리)',
    category: 'Rendering & Physics',
    summary: '수백만 개의 폴리곤을 수동 LOD(Level of Detail) 작업 없이 픽셀 단위 마이크로 폴리곤으로 실시간 렌더링하는 기술입니다.',
    description: 'ZBrush에서 제작한 수억 개의 고해상도 지오메트리를 그대로 임포트해도 카메라 거리와 화면 픽셀 크기에 맞춰 실시간으로 클러스터를 병합/분할하므로 드로우콜 병목이 사라집니다.',
    commonUsage: '고해상도 메가스캔 바위, 정밀한 건축물 조각상, 방대한 암석 지형을 프레임 드랍 없이 배치할 때 필수 적용됩니다.',
    codeSnippet: `// 스태틱 메쉬 에디터 설정
bEnableNanite = true; // Nanite 가상화 활성화`,
    blueprintNodeFlow: `[에셋 우클릭] -> [나나이트] -> [선택 항목의 나나이트 활성화 토글]`,
    cppEquivalent: `FStaticMeshRenderData::NaniteResources`,
    relatedTerms: ['Lumen', 'LOD', 'Draw Call'],
    tags: ['Graphics', 'Optimization', 'Meshes']
  }
];
