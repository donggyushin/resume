# iOS 개발자 모의 면접 연습 (2026-03-23)

## Q1. [경험] 피드 화면 CPU 사용률 40% 감소 과정

### 내 답변
- 피드 화면 개발 중 사용성이 좋지 않다는 것을 직접 체감하면서 인지
- Xcode Instruments(Time Profiler)로 frame drop, hitch, main thread block 지점 추적
- 메인 스레드에서 돌 필요 없는 무거운 로직을 백그라운드 스레드로 이동
- 셀 높이값 등 계산 결과를 메모리 캐싱
- 동영상: HLS 적용 + 썸네일 로직으로 검은 화면 제거
- CompositionalLayout 적용으로 중첩 레이아웃 최적화
- 이미지 캐시는 검증된 라이브러리 사용, PDF 캐싱은 FileManager로 직접 구현

### 피드백
- **보완:** "40%"를 어떻게 측정했는지 한 마디 추가 (Instruments 전후 비교)
- **보완:** CompositionalLayout이 기존 방식보다 나은 이유 설명 (뷰 계층 평탄화)
- **보완:** 사용자 관점 결과 언급 (스크롤 히치 제거, 발열 이슈 리포트 소멸)

---

## Q2. [기술] GCD vs OperationQueue vs Swift Concurrency 차이점

### 내 답변
- GCD: 코드 블록을 원하는 큐에서 실행, 단순하고 직관적
- OperationQueue: 작업 객체화, 최대 갯수 제한/취소 등 세밀한 제어
- Swift Concurrency: 비동기 코드를 동기처럼 작성, 에러 처리 간편, 주로 ViewModel에서 API 호출 시 사용

### 피드백
- **보완:** OperationQueue의 `addDependency` (작업 간 순서 보장) 언급
- **보완:** Structured Concurrency (TaskGroup, 스코프 바인딩) 언급
- **보완:** Actor로 데이터 레이스 컴파일 타임 방지 언급
- **보완:** GCD 단점 (콜백 중첩, 에러 전파 어려움) 언급

---

## Q3. [경험+기술] Atomic Design 디자인 시스템 + SPM 배포

### 내 답변
- Atom: 색상, 폰트, 아이콘 (나눌 수 없는 최소 단위)
- Molecule: 버튼, 텍스트필드, 스낵바 (Atom 조합, 재사용 빈도 높은 컴포넌트)
- Organism: 리스트 아이템, 네비게이션바 (Molecule 조합)
- SPM으로 위계 구분은 좋았지만, 디자인 시스템 업데이트 시 프로젝트 전환이 필요해 생산성 저하

### 피드백
- **보완:** 생산성 문제를 어떻게 해결했는지/다시 한다면 어떻게 할지 (Tuist 모듈화, 로컬 SPM → 리모트 전환)
- **보완:** "30% 단축" 수치의 근거 준비 (기존 3일 → 2일 등)
- **보완:** 디자이너와 네이밍 싱크 방법 언급하면 협업 역량 어필

---

## Q4. [기술 심화] Tuist 모듈화 아키텍처 설계

### 내 답변
- Domain 모듈 (비즈니스 로직), Data 모듈 (통신/데이터), App (애플리케이션), Feature (큰 기능 단위)
- 순환 의존성은 Tuist generate 시점에 Tuist가 감지 → 이에 의존

### 피드백
- **보완:** 의존성 방향 규칙 명시 — "App → Feature → Domain ← Data, Domain은 어디에도 의존하지 않는다"
- **보완:** Feature 간 통신 방법 (프로토콜/인터페이스, Coordinator 패턴)
- **보완:** 설계 단계의 원칙 언급 — "Domain에 외부 의존성 금지", "Feature 간 직접 참조 금지" 등

---

## Q5. [행동/협업] 기획자/디자이너와 의견 충돌 경험

### 내 답변
- 사용자 경험 측면: 기획자/디자이너가 더 깊이 고려한 경우가 많아서, 배경 설명을 듣고 수용
- 기술적 난이도 측면: 대안을 제시 (더 빠른 구현, 안정적 경험 등 상대방 관점의 이점으로 설득)
- 임팩트가 크다면 기꺼이 기술적 챌린지 수용

### 피드백
- **보완:** 구체적 에피소드 하나 곁들이기 (STAR 기법: Situation → Task → Action → Result)

---

## Q6. [기술] Combine vs RxSwift 차이점과 선택 기준

### 내 답변
- Combine: Swift 내장, 버전 관리 부담 없음, SwiftUI와 필수 조합 (ObservableObject)
- RxSwift: RxCocoa 기반 UIKit 호환 좋음
- UIKit/SwiftUI 기반에 따라 유동적으로 선택

### 피드백
- **보완:** 입장을 명확히 — "새 프로젝트라면 Combine 선택, 외부 의존성 없고 Apple 장기 지원 보장"
- **보완:** RxSwift만의 강점 (풍부한 연산자, Driver/Signal trait, iOS 13 미만 지원)
- **보완:** Observation 프레임워크(iOS 17) — `@Observable` 매크로로 Combine 없이도 상태 관리 가능, Apple의 미래 방향

---

## Q7. [문제 해결] 프로덕션 간헐적 크래시 디버깅 접근법

### 내 답변
- 빌드 환경(Debug/Release) 차이인지, 특정 유저 케이스인지 파악
- Release 환경으로 빌드해서 재현 시도
- 특정 유저 문제라면 동일한 데이터/상태값으로 재현

### 피드백 (가장 보완 필요)
- **보완 — 체계적 프로세스:**
  1. 스택 트레이스 분석 + dSYM 심볼리케이션 확인
  2. 패턴 파악 (OS 버전, 디바이스, 발생 빈도, 진입 경로)
  3. 코드 분석 (force unwrap, 동시성 이슈, 메모리 해제 타이밍)
  4. 재현 시도 (Release 빌드, Thread/Address Sanitizer 활용)
  5. 방어 코드 + 로깅 추가 핫픽스 배포

---

## Q8. [설계] 여러 화면의 유저 프로필 데이터 동기화

### 내 답변
- 각 화면에서 항상 API 호출해서 서버 정합성을 맞추는 편 (본인도 확신 없음)

### 피드백
- **매번 API 호출의 문제:** 네트워크 비용, 로딩 UX 저하, 오프라인 불가
- **권장 패턴:**
  - Single Source of Truth — `UserProfileRepository`가 프로필 데이터 보유
  - Combine `CurrentValueSubject`로 구독자에게 리액티브 전파
  - 서버 동기화는 앱 진입 시, pull-to-refresh, 특정 주기로만
  - Optimistic Update — API 호출 전 로컬 먼저 갱신, 실패 시 롤백

---

## Q9. [기술] Universal Link vs URL Scheme

### 내 답변
- URL Scheme: 커스텀 스킴 등록으로 앱 오픈
- Universal Link: 웹 URL 기반, fallback URL로 앱 미설치 시 행동 정의
- 구현 시 주의할 점은 잘 모름

### 피드백 (보완 필요)
- **AASA 파일:** `/.well-known/apple-app-site-association` 호스팅, Content-Type `application/json`
- **Apple CDN 캐싱:** 업데이트 반영이 즉시 안 됨 (디버깅 난이도 상승)
- **설치 시점 다운로드:** AASA 수정해도 기존 유저에게 바로 반영 안 됨
- **같은 도메인 링크 제한:** Safari에서 같은 도메인 Universal Link 클릭 시 앱 안 열림
- **URL Scheme 보안 문제:** 여러 앱이 같은 scheme 등록 가능 → hijacking 위험, Universal Link는 도메인 소유권 검증으로 안전

---

## Q10. [가치관] 가장 성장한 순간 + 되고 싶은 개발자

### 내 답변
- 기획 회의에서 "기술적으로 구현 가능한가?" → "비즈니스 임팩트가 뭔가?"로 사고가 전환된 순간
- 과거에는 코드를 정말 잘 짜는 개발자가 목표였지만, AI 시대에 그것만으로는 부족
- 서비스를 같이 고민하고 비즈니스 임팩트에 긍정적 영향을 주는 개발자가 되고 싶음

### 피드백
- **보완:** AI 언급 시 "AI 활용하되, 아키텍처 설계와 기술 판단은 개발자의 역할"로 뉘앙스 조절
- **보완:** 비즈니스 관점 기여의 구체적 사례 하나 추가

---

## 총평

### 강점
- 실무 경험 기반의 자연스럽고 솔직한 답변
- 성능 최적화 관련 답변이 가장 강력
- 모르는 것을 숨기지 않는 태도가 신뢰감을 줌

### 공통 보완 사항
| 영역 | 조언 |
|------|------|
| 구체성 | 숫자, 에피소드, 전후 비교를 더 넣기 |
| STAR 기법 | 경험 질문은 Situation → Task → Action → Result로 정리 |
| 깊이 | 기술 질문에서 한 단계 더 (왜 그런지, 내부 동작 원리) |
| 최신 트렌드 | Observation, Swift 6 Concurrency, Xcode 16 등 준비 |
| 입장 표명 | "상황에 따라 다르다"보다 근거 있는 선택을 먼저, 예외를 덧붙이기 |

### 답변 평가
- **가장 강했던 답변:** Q1 (CPU 40% 최적화), Q10 (성장/가치관)
- **가장 보완 필요:** Q7 (크래시 디버깅), Q9 (Universal Link)
