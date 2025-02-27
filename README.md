# Tower_defense_game

Tower_defense_game

**프로젝트 개요**
**프로젝트 명 : 타워 디펜스 게임 심화 프로젝트 소개** 
**내용 : 타워를 구입하거나 강화하여 몰려오는 적들로부터 기지를 지키는 게임(조금 더 고도화) 
멀티 플레이를 지원하는 타워 디펜스 게임 서버 개발**

제작 기간 : 2024.7.11.(목) ~ 2024.7.17.(수)

![image](https://github.com/user-attachments/assets/99c94444-90bb-4be9-aaf1-3f5adfe02487)

프로젝트 설계 및 구현
-
1. **게임 서버 설계 및 구현**
    - [x]  타워 디펜스 게임의 기본 규칙을 이해하고 있다.
    - [x]  게임 서버의 주요 기능 (회원가입, 로그인, 게임 데이터 관리 등)을 설계할 수 있다.
    - [x]  WebSocket을 이용해 클라이언트와 서버 간 실시간 통신을 구현할 수 있다.
    - [x]  대전 대기열 기능을 구현할 수 있다.
    - [x]  클라이언트 요청에 따라 적절한 게임 데이터를 처리하고 응답할 수 있다.

1. **패킷 명세 작성**
    - [x]  Protocol Buffers를 사용하여 패킷 구조를 정의할 수 있다.
    - [x]  패킷의 종류들과 어떤 시점에 어떤 패킷을 보내야 하는지 이해하고 있다.
    - [x]  회원가입 / 로그인 등 모든 기능에 대한 패킷 명세를 완료했다.

1. **ERD 설계**
    - [x]  유저 테이블과 유저의 게임 기록 테이블을 설계할 수 있다.
    - [x]  ERD를 기반으로 데이터베이스 스키마를 작성할 수 있다.

1. **프로젝트 관리 및 협업**
    - [x]  Git을 사용해 소스 코드 버전 관리를 할 수 있다.
    - [x]  Git branch를 이용해 브랜치 관리 및 협업을 할 수 있다.
    - [x]  Pull Request와 코드 리뷰 과정을 이해하고 준수할 수 있다.

1. **클라이언트 연동 및 테스트**
    - [x]  제공된 게임 클라이언트를 이용해 서버와 통신할 수 있다.
    - [x]  상태 동기화에 대해서 이해하고 이에 필요한 게임 이벤트들을 정의할 수 있다.

회원 가입 & 로그인 구현 
- [x] 회원가입 API (요청*응답 패킷) 
- [X] 로그인 API (요청*응답 패킷)

대결신청 & 대결시작
- [X] 대결신청 (요청패킷 handlerID: 2)
- [X] 대결시작 (통지패킷)

타워구입*적 타워 추가 배치
- [X]  (요청 패킷) - towerHandler 함수 참고 (handlerID: 11)
- [X]  (통지 패킷) - (handlerID: 11)

몬스터 생성*적 몬스터 생성
- [X]  (요청 패킷)-spawnMonster 함수 참고(저희의 경우는 monsterHandler.js로 따로 관리) 유저의 맵에서 몬스터 생성 시 monsterNumber(수)를 서버로 보내는 패킷 (handlerID : 8)
- [X]  (통지 패킷)-서버로부터 적이 monsterNumber에 해당하는 몬스터를 스폰했다는 사실을 전달받음 (handlerID : 9)

-타워가 몬스터를 공격 * 적 몬스터를 공격
- [X] monsterHandler 참고 (요청패킷) (handlerID : 12)
- [X] monsterHandler 참고 (통지 패킷) (handlerID : 13)

몬스터가 기지를 공격 
- [X] (요청 패킷) (handlerID: 21)
기지 HP 업데이트 (통지 패킷) 
- [X] 
- [X]게임 오버 (통지 패킷)  endGame.handler 참고
- [X]게임 종료 (요청 패킷)  endGame.handler 참고

- [X]몬스터가 사망 - monsterHandler 에 정의. (handlerID : 16)
- [X]적의 몬스터가 사망 - monsterHandler 에 정의 (handlerID: 17)

기능 명세서 
https://teamsparta.notion.site/5988ef398e7a48d28239f22390dbe01e?v=76d807232fdf4527b8aa5f0609108cf2&pvs=4

| 필드 명 | 타입 | 설명 |
| --- | --- | --- |
| packetType | ushort | 패킷 타입 (2바이트) |
| version | string | 버전 (문자열) |
| sequence | uint32 | 유저의 호출 수 (42억) |
| payload | bytes | 실제 데이터 |


 ERD DIAGRAM  
 ![image](https://github.com/user-attachments/assets/ee4906cf-8e11-4344-8c2d-9a3c4b3d3140)

![스크린샷(531)](https://github.com/user-attachments/assets/3dd0aff3-5c49-4ba7-8139-5014671b68e6) > ![스크린샷(532)](https://github.com/user-attachments/assets/5275487a-e6d5-40a6-971f-4e428fc14a34) 
> ![스크린샷(533)](https://github.com/user-attachments/assets/20700915-5e30-4c93-ab77-e14f0cfca389) > ![스크린샷(534)](https://github.com/user-attachments/assets/711fe105-1e98-41c3-ad65-052b128ed7d3)
>![스크린샷(535)](https://github.com/user-attachments/assets/470be9da-1db5-4566-ae31-4a57611b3a85) > ![스크린샷(537)](https://github.com/user-attachments/assets/71551b99-60e2-4281-b80b-8aa46358115a)
> ![스크린샷(538)](https://github.com/user-attachments/assets/6518f50d-15b6-4091-8680-15bb36d2079f)


BackEnd Skills

![image](https://github.com/user-attachments/assets/1b161188-68bb-44fe-aeae-0e644debba1b) ![image](https://github.com/user-attachments/assets/41069cc1-9f16-43db-85d0-d9cf8cb1ac58)
![image](https://github.com/user-attachments/assets/6dcda4fd-6efc-4272-8c76-e6740f59c010) ![image](https://github.com/user-attachments/assets/40961f8c-9242-4fb4-a508-4191df9a97e0)
![image](https://github.com/user-attachments/assets/516e1cdf-b5cb-4423-9f3e-2b36273595c4) ![image](https://github.com/user-attachments/assets/4138d349-e397-450a-8562-9c47fe6d0713)
![image](https://github.com/user-attachments/assets/09e69c2b-d6db-4880-bb77-33448fc6e8de) ![image](https://github.com/user-attachments/assets/66a876c6-5a49-48c5-9c59-c7347805d187)
![image](https://github.com/user-attachments/assets/b622a092-3db7-46a9-ab7b-1c1d99c703bb) ![image](https://github.com/user-attachments/assets/2fed2579-dd85-4c58-a68d-b01c8c66c85f)
![image](https://github.com/user-attachments/assets/d8591acc-e545-422b-838c-a84511a0f4ae) ![image](https://github.com/user-attachments/assets/405b3f5d-9691-4f8e-8ffe-b9ab348dadd4)
![image](https://github.com/user-attachments/assets/4dcc7908-7662-493f-84aa-2cf8cba137d3)

게임 방법
회원가입 및 로그인
**Tower_defense_game/src/routers/account.router.js 참조**
 
게임 시작

로그인 후 게임 플레이 버튼을 통해 게임을 시작할 수 있다. 
멀티 플레이 라서 로그인 2로 다른 사람(user2)도 로컬 환경에서 로그인이 가능하다. 
**클라이언트 관련의 login.html, login2.html 참조**
**Tower_defense_game/tower_defense_client_online/src/login.html*login2.html**



매칭 세션  : 1vs1로 멀티 유저들이 매칭이 되면 매칭이 시작되며 둘의 대결이 시작된다. 
유저 1의 화면은 위 유저 2의 화면은 아래의 화면으로 잡히게 된다. 
 **상대방의 게임 상황도 실시간으로 같이 볼 수 있습니다.**
**(1) 게임 스타트 버튼**
**(2) 서버와 소켓 연결을 함**
**(3) 서버에서 소켓 연결 완료에 대한 connection 응답 이벤트를 보내줌**
**(4) 클라이언트에서는 connection 이벤트 내에서 서버에서 startMatching 이벤트를 전송**
**(5) 서버에서 startMatching 이벤트를 받으면 해당 유저를 매칭 세션에 push , 유저 수를 체크** 
**=> 2명 이상이면 서로 매칭시켜주는 방식.**
**=> 2명 미만이면 아무것도 없음.**


타워구입 : 타워를 구입하거나 타워의 광선 쿨타임 등을 조절하고 정의한다. 
구입할 때는 골드가 들어야 하고 그 골드가 생성되는 과정에서 그 골드를 잃어야 한다. 
골드를 소모해 타워를 구입할 수 있다. **tower.class.js와 tower.js 참조**

1. **base.js**
    1. Base 클래스는 기지의 상태와 동작을 정의합니다. 
    2. 기지의 HP 정보를 갖고 있습니다.
    3. **기지가 데미지를 입는 로직이 사라졌습니다.**
        1. 이제는 서버에서 기지의 HP를 관리하고 변경된 HP
2. **tower.js**
    1. Tower 클래스는 타워의 상태와 동작을 정의합니다. 
    2. 타워는 주기적으로 몬스터를 공격합니다.
3. **monster.js**
    1. Monster 클래스는 몬스터의 상태와 동작을 정의합니다. 
    2. 몬스터는 주어진 경로를 따라 이동하며 기지에 도달하면 기지에 데미지를 입힙니다.
        1. **전의 코드와는 다르게 몬스터가 직접 기지에 데미지를 입히는 것이 아닙니다!**
        2. 기지에 다다른 것이 확인이 되면 서버에 데미지를 입혀달라고 요청해요!
        3. 그러면, 서버가 기지의 최신 HP를 클라이언트에게 알려줍니다!
4. **multi_game.js (메인 게임 코드 - 멀티 플레이)**
    1. multi_game.js는 전체 게임의 흐름을 제어하는 클라이언트 코드입니다.
    2. **몇몇 로직들을 제외하고 서버 주도 기반으로 바뀌었습니다.**
    3. **상대방의 게임 상황도 실시간으로 같이 볼 수 있습니다.**
5. **multi_game2.js (메인 게임 코드 - 멀티 플레이)**
    1. multi_game2.js는 multi_game.js와 동일한 코드이나 **동일한 로컬에서 2개의 클라이언트를 실행하여 테스트 하는 경우**를 대비하여 생성한 코드입니다.


기획에 맞게 몬스터를 죽일 시 점수, 골드, 몬스터 레벨 설정 됩니다. constants 폴더 참조 
**Tower_defense_game/src/constants/gameObjectTypes.js에 정의**

게임이 종료되면 사용자들의 점수가 표시되며 해당사용자의 최고점수를 확인할수 있다.

게임이 시작되면 기본적으로 1000원을 가지고 시작하여 타워를 구입할 수 있습니다.
(타워 구매, 소켓 메세지 보여주기)
타워를 구매하면 상대방에게도 보여지게 됩니다.

게임 종료시 db에 정의해둔 game_log가 추가된다. 그래서 위의 최고점수나 둘중 누가 이겼는가 졌는가 win lose 를 판별해준다. 

**참조**
game.db와 user.db 분리 
**game.db.sql**  **user.db.sql**
