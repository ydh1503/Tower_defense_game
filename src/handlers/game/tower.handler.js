import Tower from '../../classes/models/gameObject/tower.class.js';
import { getGameSession } from '../../session/game.session.js';
import GAME_OBJECT_TYPES from '../../constants/gameObjectTypes.js';
import { sendNotification } from '../../utils/notification/game.notification.js';

export const purchaseTowerHandler = async (uuid, payload) => {
  const { gameId } = payload; // 세션 아이디
  const towerCost = 500; // 타워 코스트
  const gameSession = getGameSession(gameId); // 세션 아이디로 해당 세션을 가져온다.
  const opponentUserSocket = gameSession.getOpponentUserSocket(uuid); // 상대의 소켓을 가져온다.
  let userGold = gameSession.gameManager.getObject(uuid, GAME_OBJECT_TYPES.OBJECT.GOLD); // 서버에 저장된 유저의 골드를 가져온다.

  // 유저의 골드가 타워 코스트보다 클 경우에만 타워를 생성 및 해당 유저와 상대방에게 response 또는 notification 전송
  if (userGold >= towerCost) {
    const path = gameSession.gameManager.getObject(uuid, GAME_OBJECT_TYPES.OBJECT.PATH).path; // new Tower()에 인자로 들어갈 path값을 가져온다.

    gameSession.gameManager.addObject(uuid, GAME_OBJECT_TYPES.OBJECT_ARRAY.TOWERS, new Tower(path)); // 서버에 새로운 타워 추가.
    const towers = gameSession.gameManager.getObject(uuid, GAME_OBJECT_TYPES.OBJECT_ARRAY.TOWERS); // 서버 타워 데이터 가져오기.
    const { x, y } = towers[towers.length - 1]; // 마지막으로 설치한 타워의 x, y 값을 가져온다.

    gameSession.gameManager.addObject(uuid, GAME_OBJECT_TYPES.OBJECT.GOLD, (userGold -= towerCost)); // 서버에 저장된 유저의 골드를 타워 코스트 만큼 뺀다.
    sendNotification(opponentUserSocket, { handlerId: 11, x, y }, '적 타워가 생성되었습니다.'); // 유저의 골드가 타워 코스트 보다 클 경우 상대 소켓에 이벤트 전송.

    return {
      status: 'success',
      message: '구매한 타워가 성공적으로 배치되었습니다.',
      x,
      y,
      handlerId: 11,
      userId: uuid,
      userGold,
    };
  } else {
    return { status: 'fail', message: '타워 구매 실패, 골드가 부족합니다' };
  }
};
