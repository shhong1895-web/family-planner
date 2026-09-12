Family Planner Build 101

- Build 100의 기존 Firestore 컬렉션/데이터 구조는 그대로 유지합니다.
- p-mode 강조 카드가 iOS 스타일 공통 카드 CSS에 의해 흰 배경 + 흰 글자로 바뀌던 문제를 수정했습니다.
  - 부모 오늘 화면의 자녀 현황 카드
  - 기기 화면의 접속 기기 승인 카드
  등이 정상적으로 다시 표시됩니다.
- 가족 사진 패널은 기기 화면을 다시 그릴 때도 즉시 렌더링되도록 보완했습니다.
- 가족 사진은 기존 meta/familyPhotos 문서 구조를 유지하되,
  - 최대 4장
  - 480px JPEG / quality 0.42로 압축
  - 저장 전 약 780KB 상한 검사
  를 적용하여 Firestore 문서 용량 초과 실패 가능성을 낮췄습니다.
- 사진 저장 성공 시 화면에 즉시 목록을 반영합니다.
- 기존 노트북 테스트 모드(sessionStorage 기반)는 그대로 유지합니다.

주의:
- 이번 Build 101에서도 Firestore Rules/컬렉션 구조의 근본적인 V2 migration은 하지 않았습니다.
- 실제 iPhone/Android에서 사진 선택 및 저장까지 확인하는 것이 필요합니다.
