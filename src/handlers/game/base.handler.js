import GAME_OBJECT_TYPES from '../../constants/gameObjectTypes.js';
import { getGameSession } from '../../session/game.session.js';
import { sendNotification } from '../../utils/notification/game.notification.js';

export const attackBaseHandler = (userId, payload) => {
  const { gameId, damage, monsterId } = payload;
  const gameSession = getGameSession(gameId);

  const monsters = gameSession.gameManager.getObject(
    userId,
    GAME_OBJECT_TYPES.OBJECT_ARRAY.MONSTERS,
  );
  const monsterIndex = monsters.findIndex((monster) => monster.id === monsterId);
  if (monsterIndex === -1) {
    return {
      status: 'fail',
      message: '현재 생성되어 있는 올바른 몬스터가 아닙니다.',
    };
  }
  gameSession.gameManager.removeObject(
    userId,
    GAME_OBJECT_TYPES.OBJECT_ARRAY.MONSTERS,
    monsterIndex,
  );

  const base = gameSession.gameManager.getObject(userId, GAME_OBJECT_TYPES.OBJECT.BASE);
  if (base.takeDamage(damage)) {
    gameSession.endGame();
  }

  const opponentUserSocket = gameSession.getOpponentUserSocket(userId);
  sendNotification(
    opponentUserSocket,
    { handlerId: 22, baseHp: base.hp, monsterId },
    'opponent base is attacked',
  );

  return {
    status: 'success',
    message: 'Base is attacked',
    handlerId: 21,
    baseHp: base.hp,
    monsterId,
  };
};
