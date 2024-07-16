import GAME_OBJECT_TYPES from '../../constants/gameObjectTypes.js';
import { getGameSession } from '../../session/game.session.js';
import { sendNotification } from '../../utils/notification/game.notification.js';

export const attackBaseHandler = (userId, payload) => {
  const { gameId, damage } = payload;
  const gameSession = getGameSession(gameId);

  const base = gameSession.gameManager.getObject(userId, GAME_OBJECT_TYPES.OBJECT.BASE);
  if (base.takeDamage(damage)) {
    // 게임 종료 코드 추가
    return { status: 'success', message: 'Game end' };
  }

  const opponentUserSocket = gameSession.getOpponentUserSocket(userId);
  sendNotification(
    opponentUserSocket,
    { handlerId: 22, baseHp: base.hp },
    'opponent base is attacked',
  );

  return { status: 'success', message: 'Base is attacked', handlerId: 21, baseHp: base.hp };
};
