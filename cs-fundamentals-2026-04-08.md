# CS 기본 면접 질문 정리

---

## 1. 프로세스 vs 스레드

- **프로세스:** 독립된 메모리 공간(코드, 데이터, 힙, 스택)을 가진 실행 단위. 프로세스 간 통신은 IPC(파이프, 소켓 등)를 사용해야 하므로 비용이 큼
- **스레드:** 프로세스 내에서 코드, 데이터, 힙을 공유하고 스택만 독립. 공유 메모리 덕분에 통신이 빠르지만, 동시에 같은 자원에 접근하면 **Race Condition** 발생 가능
- **iOS 관점:** Main Thread는 UI 업데이트 전담, 무거운 작업은 Background Thread에서 처리. GCD/Swift Concurrency로 스레드 관리

---

## 2. 동시성(Concurrency) vs 병렬성(Parallelism)

- **동시성:** 여러 작업을 번갈아가며 처리하여 동시에 진행되는 것처럼 보이게 함 (싱글 코어에서도 가능)
- **병렬성:** 여러 코어에서 실제로 동시에 작업을 수행
- **iOS 관점:** GCD의 Concurrent Queue는 동시성을 제공하고, 시스템이 가용 코어에 따라 병렬 실행을 결정

---

## 3. 교착 상태(Deadlock)

- 두 개 이상의 스레드가 서로 상대방이 점유한 자원을 기다리며 무한 대기하는 상태
- **발생 조건 4가지:** 상호 배제, 점유 대기, 비선점, 순환 대기 — 4가지 모두 충족 시 발생
- **iOS에서 흔한 사례:** Main Thread에서 `DispatchQueue.main.sync`를 호출하면 자기 자신을 기다리게 되어 Deadlock
- **예방:** 자원 획득 순서 통일, 타임아웃 설정, `sync` 대신 `async` 사용

---

## 4. Race Condition과 해결 방법

- 여러 스레드가 동시에 같은 데이터를 읽고 쓸 때 결과가 실행 순서에 따라 달라지는 문제
- **해결 방법:**
  - **Serial Queue:** 특정 자원 접근을 직렬 큐로 제한
  - **Lock/Mutex:** `NSLock`, `os_unfair_lock` 등으로 임계 영역 보호
  - **Actor (Swift Concurrency):** 컴파일 타임에 데이터 레이스를 방지, Swift 6에서 Strict Concurrency로 더욱 강화
  - **Reader-Writer Lock:** 읽기는 동시 허용, 쓰기는 배타적 접근 (concurrent queue + barrier flag)

---

## 5. 메모리 구조 (코드/데이터/힙/스택)

- **코드(Text):** 컴파일된 기계어 코드 저장, 읽기 전용
- **데이터(Data):** 전역 변수, static 변수 저장. 초기화된(Data) / 미초기화된(BSS) 영역으로 구분
- **힙(Heap):** 동적 할당 영역, 개발자가 관리 (iOS에서는 ARC가 대신 관리). 크기가 유동적이고 할당/해제 비용이 큼
- **스택(Stack):** 함수 호출 시 지역 변수, 매개변수, 복귀 주소 저장. LIFO 구조, 빠르지만 크기 제한

---

## 6. ARC (Automatic Reference Counting)

- 컴파일 타임에 `retain`/`release` 코드를 자동 삽입하여 참조 카운트 기반으로 메모리 관리
- **GC(Garbage Collection)와 차이:** GC는 런타임에 주기적으로 수집 → 예측 불가능한 일시 정지 발생. ARC는 컴파일 타임 삽입이라 런타임 오버헤드 없음
- **순환 참조(Retain Cycle):** 두 객체가 서로를 strong으로 참조하면 둘 다 해제 불가 → 메모리 누수
- **해결:** `weak`(nil 가능), `unowned`(nil 불가, 해제 후 접근 시 크래시) 사용. 클로저에서 `[weak self]` 캡처

---

## 7. 값 타입 vs 참조 타입

- **값 타입(Struct, Enum):** 할당/전달 시 복사. 스택에 저장(작은 경우). 독립적이라 멀티스레드에서 안전
- **참조 타입(Class):** 할당/전달 시 같은 인스턴스를 참조. 힙에 저장. 참조 카운트 관리 필요
- **Swift의 Copy-on-Write:** Array, Dictionary 등 값 타입이지만 실제 복사는 수정 시점에만 발생 → 불필요한 복사 비용 방지
- **선택 기준:** 상태 공유가 필요하면 Class, 독립적인 데이터 모델이면 Struct

---

## 8. 해시 테이블 (Dictionary)

- Key를 해시 함수로 변환하여 인덱스를 계산, 평균 O(1)로 조회/삽입/삭제
- **해시 충돌 해결:**
  - **Chaining:** 같은 인덱스에 연결 리스트로 저장
  - **Open Addressing:** 충돌 시 다음 빈 슬롯 탐색 (Linear Probing, Quadratic Probing)
- **Swift Dictionary:** Hashable 프로토콜 준수 필요. `hash(into:)`로 해시값 생성

---

## 9. 시간 복잡도

| 구조/알고리즘 | 접근 | 검색 | 삽입 | 삭제 |
|---|---|---|---|---|
| Array | O(1) | O(n) | O(n) | O(n) |
| Dictionary | - | O(1) | O(1) | O(1) |
| Set | - | O(1) | O(1) | O(1) |
| Linked List | O(n) | O(n) | O(1) | O(1) |

- **정렬:** Swift의 `sort()`는 Timsort 기반, 평균/최악 O(n log n)
- **면접 팁:** 무조건 최적 알고리즘이 아니라 데이터 크기와 상황에 맞는 선택이 중요

---

## 10. HTTP vs HTTPS

- **HTTP:** 평문 통신, 데이터 도청/변조 가능
- **HTTPS:** TLS(Transport Layer Security) 위에서 HTTP 통신. 암호화 + 서버 인증 + 데이터 무결성 보장
- **TLS Handshake 흐름:** 클라이언트 → 서버 인증서 검증 → 대칭 키 교환 → 암호화 통신 시작
- **iOS 관점:** ATS(App Transport Security)가 기본적으로 HTTPS를 강제. HTTP 사용 시 Info.plist에서 예외 설정 필요

---

## 11. REST API

- 자원(Resource)을 URI로 표현하고, HTTP 메서드(GET/POST/PUT/PATCH/DELETE)로 행위를 구분
- **특징:** Stateless(서버가 클라이언트 상태를 저장하지 않음), 캐시 가능, 계층적 구조
- **상태 코드:** 200(성공), 201(생성), 400(잘못된 요청), 401(인증 필요), 403(권한 없음), 404(없음), 500(서버 에러)
- **iOS 관점:** URLSession 또는 Alamofire로 통신, Codable로 JSON 직렬화/역직렬화

---

## 12. TCP vs UDP

- **TCP:** 연결 지향, 3-way handshake로 연결 수립. 순서 보장, 재전송으로 신뢰성 확보. 상대적으로 느림
- **UDP:** 비연결, handshake 없음. 순서/신뢰성 보장 안 됨. 빠름
- **사용 사례:** TCP — API 통신, 파일 전송 / UDP — 실시간 스트리밍, 게임, VoIP

---

## 13. 쿠키 vs 세션 vs 토큰(JWT)

- **쿠키:** 클라이언트(브라우저)에 저장되는 키-값 쌍, 요청 시 자동 전송
- **세션:** 서버에 상태 저장, 클라이언트는 세션 ID만 보유. 서버 메모리/스토리지 필요
- **JWT:** 서버가 상태를 저장하지 않고 토큰 자체에 정보를 담아 서명. Stateless라 서버 확장에 유리하지만, 토큰 탈취 시 만료 전까지 무효화가 어려움
- **iOS 관점:** 토큰은 Keychain에 안전하게 저장, UserDefaults에 저장하면 안 됨

---

## 14. 디자인 패턴

### SOLID 원칙
- **S(단일 책임):** 클래스는 하나의 책임만
- **O(개방-폐쇄):** 확장에 열리고 수정에 닫힘
- **L(리스코프 치환):** 자식 클래스는 부모를 대체할 수 있어야 함
- **I(인터페이스 분리):** 사용하지 않는 인터페이스에 의존하지 않음
- **D(의존성 역전):** 구체 타입이 아닌 추상(프로토콜)에 의존

### iOS에서 자주 쓰이는 패턴
- **MVC/MVVM:** UIKit은 MVC 기반이나 Massive ViewController 문제로 MVVM 선호. ViewModel이 비즈니스 로직 담당, View는 바인딩으로 상태 반영
- **Observer:** NotificationCenter, Combine, KVO
- **Delegate:** UITableViewDelegate 등 1:1 콜백 패턴
- **Repository:** 데이터 소스(API/DB)를 추상화하여 도메인 레이어에서 구체 구현에 의존하지 않도록 분리

---

## 15. 의존성 주입(DI)

- 객체가 필요로 하는 의존성을 외부에서 주입하는 패턴
- **장점:** 결합도 낮춤, 테스트 시 Mock 주입 용이, 유연한 구현체 교체
- **방식:** 생성자 주입(가장 권장), 프로퍼티 주입, 메서드 주입
- **iOS 실무:** Protocol로 추상화 → 생성자에서 구체 타입 주입. Factory 패턴으로 DI 컨테이너 구성

---

## 16. DispatchQueue.main vs RunLoop.main

- **DispatchQueue.main:** GCD 기반의 메인 스레드 직렬 큐. 블록을 메인 스레드에서 실행하도록 예약. 큐에 들어온 순서대로 즉시 실행
- **RunLoop.main:** 메인 스레드의 이벤트 루프. 터치, 타이머, 네트워크 등 입력 소스를 처리하는 반복 루프. **RunLoop Mode**에 따라 실행 시점이 달라짐
- **핵심 차이:**
  - `DispatchQueue.main.async`는 RunLoop의 현재 모드와 무관하게 실행됨
  - `RunLoop.main`에 등록된 Timer는 모드에 영향을 받음. 예: 스크롤 중(`.tracking` 모드)에는 `.default` 모드의 Timer가 멈춤
  - Combine의 `receive(on: DispatchQueue.main)`과 `receive(on: RunLoop.main)`도 이 차이를 그대로 따름
- **RunLoop Mode:**
  - `.default`: 일반 상태에서 동작
  - `.tracking`: UIScrollView 스크롤 중 동작
  - `.common`: `.default` + `.tracking` 모두에서 동작 (Timer를 `.common`에 등록하면 스크롤 중에도 동작)
- **실무 가이드:**
  - 대부분의 UI 업데이트 → `DispatchQueue.main` 사용 (모드 무관하게 안정적)
  - 스크롤과 연동되는 타이머/애니메이션 제어 → `RunLoop.main` + `.common` 모드 활용
  - Combine에서 `receive(on: RunLoop.main)` 사용 시 스크롤 중 이벤트가 지연될 수 있으므로 주의
