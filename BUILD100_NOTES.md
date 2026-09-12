# Build 100 변경 사항

- Build 092 기능/Firestore 구조는 유지하여 데이터 손실 위험을 피했습니다.
- iOS-inspired visual system을 적용했습니다: grouped list, 최소 그림자, 시스템 여백, bottom navigation, bottom sheet, 44px touch target.
- 자녀 화면의 자기주도학습 메시지/오늘의 계획 흐름을 우선 시각 계층으로 유지했습니다.
- 노트북 전용 `👦 자녀 화면 미리보기`를 헤더에 추가했습니다. 기존 `PC 테스트 역할` 기능과 동일한 sessionStorage 기반이며 실제 Firebase device role을 변경하지 않습니다.
- 기존 `🧪 부모 화면으로 돌아가기` 기능도 유지했습니다.
- 자정이 지나도 앱을 재실행하지 않아도 TODAY 기준일이 갱신되도록 했습니다.
- 의도적으로 Firestore 데이터를 `families/{familyId}`로 아직 이동하지 않았습니다. 실제 데이터 migration과 Rules 전환은 별도 단계에서 Emulator 테스트 후 적용해야 합니다.

## 검증
- JavaScript syntax check
- 중복 DOM ID check
- Firebase 초기화/주요 collection check
- Build 092 대비 주요 function 존재 여부 check
