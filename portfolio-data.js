const portfolioData = [
  {
    company: "Cre8orClub",
    role: "iOS Developer",
    period: "2024.11 - Present",
    companyUrl: "https://cre8orclub.com/",
    companyDisplayName: "Ratel Partners",
    projects: [
      {
        title: "피드 화면 퍼포먼스 개선",
        description: "피드 화면 렌더링 성능 최적화를 위한 종합적인 퍼포먼스 개선. NSDiffableDataSourceSnapshot 기반 UI 업데이트, FileManager 캐싱 교체 알고리즘, 높이 계산 메모리 캐싱, 이미지 다운샘플링, AVPlayer 와 CurrentItem 간의 수동 binding/unbinding 도입",
        achievements: "CPU 사용률 40% 감소 | Energy Impact: Very High → Medium | 스크롤 끊김 현상 해결",
        tags: ["Performance Optimization", "NSDiffableDataSource", "Caching", "AVPlayer"]
      },
      {
        title: "Universal Link",
        description: "사용자 디바이스 환경별 최적화된 콘텐츠 연결을 위한 Universal Link 시스템 구축, AppsFlyer OneLink와 Associated Domain 활용하여 앱/웹/앱스토어 간 seamless한 사용자 경험 및 인코딩된 deepLink 파라미터 기반 정확한 목적지 라우팅 구현",
        achievementList: [
          "백엔드 푸시 알림, 프론트엔드 웹 링크, 마케팅 캠페인 URL 등 다양한 외부 진입점에서 앱 내부 화면으로의 직접 접근이 가능하도록 범용적인 딥링크 아키텍처를 설계",
          "백엔드/프론트엔드 팀이 iOS 코드 수정 없이 독립적으로 앱 내 거의 모든 화면에 대한 링크를 생성할 수 있게 되어, 크로스 플랫폼 간 의존성을 제거하고 마케팅 캠페인 및 사용자 리텐션 기능의 배포 속도를 향상"
        ],
        tags: ["Universal Links", "AppsFlyer", "Deep Linking"]
      },
      {
        title: "브랜디드 도메인 Universal Link",
        description: "주요 공유 경로에 대한 사용자 경험 개선을 위해 커스텀 도메인 기반의 Universal Link 시스템을 설계 및 구축",
        achievementList: [
          "공유 링크 길이 단축으로 사용자 공유 편의성 향상",
          "브랜드 일관성 강화 및 신뢰도 제고",
          "Deep Link 처리 안정성 확보"
        ],
        tags: ["Universal Links", "AppsFlyer", "Deep Linking"]
      },
      {
        title: "의존성 주입 방식 변경",
        description: "Swinject에서 Factory 라이브러리로 마이그레이션 작업 진행. 외부에서 의존성을 주입하던 방식에서 Service Locator Pattern 방식으로 변경",
        achievementList: [
          "Type Unsafe 하던 방식에서 Type Safe 한 방식으로 변경",
          "단순해진 생성자로 인해서 Dependency Drilling 문제 해결"
        ],
        tags: ["Dependency Injection", "Factory", "Service Locator"]
      },
      {
        title: "Xcode 프로젝트의 Tuist 기반 모듈화 아키텍처 마이그레이션",
        description: "모듈간 의존성 방향 관리, 빌드 설정, 서드파티 라이브러리 관리, 테스트 타겟 관리 등을 Tuist Project.swift 한 파일에서 선언적으로 관리.",
        tags: ["Tuist", "Modular Architecture", "Dependency Management"]
      },
      {
        title: "화면 캡쳐 후, 즉시 공유 기능",
        description: "스크린샷 후 즉시 공유 기능 구현을 위한 화면 캡처 감지 시스템 구축, Combine 프레임워크 기반 이벤트 처리와 TableView frame 계산 로직으로 주요 콘텐츠 자동 식별 및 바텀시트 연동",
        tags: ["Combine", "Screenshot Detection", "UIKit"]
      },
      {
        title: "네트워크 로깅 시스템 구축",
        description: "네트워크 통신 디버깅 효율화를 위한 실시간 로깅 시스템 구축, Alamofire EventMonitor 패턴과 조건부 컴파일 활용으로 기존 코드 영향 없이 API 호출 및 파일 업로드 진행률 모니터링 기능 구현",
        achievementList: [
          "API 이슈 디버깅 시간이 평균 30-40% 감소했습니다"
        ],
        tags: ["Alamofire", "EventMonitor", "Debugging"]
      },
      {
        title: "동영상 포트폴리오에 HLS(HTTP Live Streaming) 적용",
        description: "동영상 포트폴리오 스트리밍 성능 최적화를 위한 HLS 적응형 재생 시스템 구현, AVKit 기반 .m3u8 스트림 자동 감지 및 네트워크 상황별 화질 조정으로 끊김 없는 사용자 경험 제공",
        tags: ["HLS", "AVKit", "Video Streaming"]
      },
      {
        title: "이형 컬렉션 응답 처리 아키텍처 설계",
        description: "단일 엔드포인트에서 6가지 서로 다른 구조의 컨텐츠 타입을 반환하는 홈 피드 API의 복잡도를 해결하기 위해, Swift Enum의 Associated Values와 Custom Decodable 구현을 통한 다형성 디코딩 시스템 구축. 타입별 조건부 디코딩 및 nil-safe 도메인 변환 로직으로 런타임 에러를 사전 차단하고, 새로운 컨텐츠 타입 추가 시 확장 가능한 구조 확립",
        tags: ["Swift", "Codable", "Architecture Design"]
      },
      {
        title: "포트폴리오",
        description: "다양한 미디어 타입 지원 포트폴리오 시스템 구축, AVPlayer 및 PDFKit 기반 동영상/이미지/PDF/오디오 뷰어 구현과 PDF 페이지별 캐러셀 및 디스크 캐시 정책으로 최적화된 사용자 경험 제공",
        tags: ["AVPlayer", "PDFKit", "Media Player"]
      },
      {
        title: "Fastlane 도입",
        description: "iOS 배포 프로세스 자동화를 위한 Fastlane 스크립트 구축, Match를 통한 코드서명 인증서 중앙 관리 및 빌드/배포 자동화 스크립트로 개발팀 배포 효율성 향상 및 환경 일관성 보장",
        tags: ["Fastlane", "CI/CD", "Code Signing"]
      }
    ]
  },
  {
    company: "Heymoon",
    role: "iOS Developer",
    period: "2022.02 - 2024.08",
    companyUrl: "https://happymoonday.com/",
    companyDisplayName: "HappyMoonday",
    projects: [
      {
        title: "디자인 시스템 구축",
        description: "일관된 UI/UX 품질 향상을 위해 Atomic Design 방법론 기반의 컴포넌트 라이브러리를 설계 및 구축. Foundation 레이어(Color, Typography, Spacing)부터 Component(Button, TextField, Card), Organism(NavigationBar, ProfileSection) 레벨까지 체계적으로 분리하여 재사용 가능한 디자인 시스템을 완성. Swift Package Manager(SPM)로 독립적으로 관리하여 의존성을 최소화했으며, 이를 통해 디자인 변경 시 영향 범위를 명확히 파악하고 유지보수성을 크게 개선했습니다",
        achievements: "신규 화면 개발 시간 30% 단축 | UI 일관성 확보",
        tags: ["Design System", "SPM", "Component Library"]
      },
      {
        title: "체중 데이터 라인 차트",
        description: "사용자 건강 데이터 시각화를 위한 체중 변화 차트 시스템 구현, HealthKit 연동 및 UIBezierPath 기반 커스텀 라인 차트로 생리주기별 체중 패턴 분석 및 직관적인 건강 상태 모니터링 제공",
        image: {
          src: "resources/Screenshot_2024-07-20_at_2.09.45_PM.png",
          alt: "체중 데이터 라인 차트",
          height: "300px"
        },
        tags: ["HealthKit", "UIBezierPath", "Data Visualization"]
      },
      {
        title: "네트워크 광고",
        description: "사용자 경험 최적화 기반 네트워크 광고 시스템 구축, 페이지별 진입 확률 분석을 통한 동적 광고 최적화로 수익 창출과 UX 균형 달성",
        tags: ["Ad Network", "UX Optimization"]
      },
      {
        title: "월간 캘린더 작업",
        description: "사용자 건강 기록 데이터 가독성 향상을 위한 캘린더 UI/UX 개선, 월간 캘린더 기반 통합 요약 뷰 구현 및 선형/도트 시각화 요소를 활용한 직관적인 건강 데이터 추이 분석 인터페이스 구축",
        image: {
          src: "resources/monthly_calendar.png",
          alt: "월간 캘린더",
          height: "300px"
        },
        tags: ["Custom UI", "Calendar", "Data Visualization"]
      },
      {
        title: "사용자의 주기 상태 시각화",
        description: "개인화된 건강 인사이트 제공을 위한 월경주기 데이터 분석 및 시각화 시스템 구축, 분산된 기록 데이터의 패턴 분석을 통한 맞춤형 제안 알고리즘 및 주기별 상태 그래프 UI로 기록-분석-학습-개선의 완성된 헬스케어 경험 구현",
        image: {
          src: "resources/period_chart.png",
          alt: "주기 상태 시각화",
          height: "300px"
        },
        tags: ["Health Analytics", "Pattern Analysis", "Personalization"]
      },
      {
        title: "재사용 가능한 웹뷰 브릿지 구현",
        description: "커머스와 서비스 영역으로 분리되어 중복 구현되던 WebView 브릿지를 커머스, Shared, 서비스 3계층 구조로 재설계하여 공통 로직을 모듈화. WebKit MessageHandlers 기반 네이티브-웹 간 통신 인터페이스를 표준화하고 Shared 레이어에 재사용 가능한 핵심 브릿지 로직을 집중시켜 코드 중복을 제거하고 유지보수성 및 개발 생산성을 향상.",
        tags: ["WebKit", "JavaScript Bridge", "Modular Architecture"]
      }
    ]
  },
  {
    company: "집무실",
    role: "iOS Developer",
    period: "2021.01 - 2022.01",
    companyUrl: "https://www.alicorn.team/about",
    companyDisplayName: "Alicorn",
    projects: [
      {
        title: "공유오피스 통합 관리 플랫폼",
        description: "공유오피스 통합 관리 플랫폼 집무실 iOS 앱 개발, ReactorKit/RxSwift 아키텍처 기반 QR 출입 시스템 및 위치 기반 오피스 필터링, 실시간 사용자 현황 표시 기능으로 스마트 오피스 관리 솔루션 구현",
        tags: ["ReactorKit", "RxSwift", "QR System", "Location Services"]
      }
    ]
  }
];
