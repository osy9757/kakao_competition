## 어서와 한국은 처음이지

![어서와](https://github.com/Yjason-K/kakao_competition/assets/81736873/e44364ba-13e7-4a94-985a-0660b8b66d24)


<strong>사용자 제공 이미지를 통한 AI기반 비슷한 국내 여행지 추천 서비스<strong/>

# 폴더 구조
```
public/
 ├── assets/ (프론트에서 저장될 static 파일들)
 │ 
src/
 ├── components/
 │   └── common/ (버튼같은 공통적으로 사용되는 components를 모아두면 될 것 같습니다.)
 │   └── pages/ ( 각 페이지별 사용될 컴포넌트 )
 │         └── home
 │         └── service
 │         └── place
 │         └── login
 │         └── signup
 │         └── findpwd
 │         └── userinfo
 │
 ├── styles/
 │   └── common/ 
 │   └── pages/
 ├── lib/
 │   └──types/  .ts 파일만 두어 타입 관리
 │   └──api/  비동기 api 호출 함수 관리
 ├── pages/
 │   └── 페이지들 ~~
 ├── hooks/ ( 반응형 pages 구성 hook 관리)
 │
 ├── App.tsx
 ├── App.css
 ├── index.tsx
 └── index.css
```

## 서비스
![추천](https://github.com/Yjason-K/kakao_competition/assets/81736873/9ea6c7fa-20b7-45eb-a6bd-84196e245410)

사용자가 이미지를 첨부한 이미지를 기반으로 비슷한 한국 여행지를 추천

![image](https://github.com/Yjason-K/kakao_competition/assets/81736873/65cb829e-11f0-4a30-922d-708959cb0615)

여행지 정보 제공 및 카카와 지도 API를 사용하여 주변 시설 정보 제공

댓글을 통한 사용자간 여행지 정보 공유 가능


## Commit convetnion

| Type       | 설명                                                         |
|------------|------------------------------------------------------------|
| feat       | 새로운 기능 추가                                             |
| fix        | 버그 수정 또는 오타                                          |
| refactor   | 코드 리팩토링                                                 |
| design     | 사용자 UI 디자인 변경 (CSS 등)                               |
| comment    | 필요한 주석 추가 및 변경                                      |
| style      | 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우              |
| test       | 테스트 코드 추가, 수정, 삭제, 비즈니스 로직 변경이 없는 경우 |
| chore      | 위에 해당되지 않는 기타 변경사항 (빌드 스크립트, 패키지 등) |
| init       | 프로젝트 초기 생성                                            |
| rename     | 파일 또는 폴더명 수정 또는 이동                                |
| remove     | 파일을 삭제하는 작업만 수행하는 경우                          |


