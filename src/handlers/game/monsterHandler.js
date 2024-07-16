import Monster from '../../classes/models/gameObject/monster.class.js';
import GAME_OBJECT_TYPES from '../../constants/gameObjectTypes.js';
import { getGameSession } from '../../session/game.session.js';
import { sendNotification } from '../../utils/notification/game.notification.js';

// 몬스터 스폰 핸들러
export const spawnMonsterHandler = (uuid, payload) => {
  const { gameId, monsterId, level } = payload;

  const gameSession = getGameSession(gameId);
  const opponentUserSocket = gameSession.getOpponentUserSocket(uuid);
  sendNotification(
    opponentUserSocket,
    { handlerId: 9, id: monsterId, level: level },
    '적 몬스터가 생성되었습니다.',
  );

  gameSession.gameManager.addObject(
    uuid,
    GAME_OBJECT_TYPES.OBJECT_ARRAY.MONSTERS,
    new Monster(monsterId, level),
  );

  return {
    status: 'success',
    message: '몬스터가 생성되었습니다.',
    handlerId: 8,
    id: monsterId,
    level,
  };
};

// 몬스터 사망 핸들러
export const deadMonsterHandler = (uuid, payload) => {
  const { gameId, monsterIndex, monsterId, level } = payload;

  const gameSession = getGameSession(gameId);
  const monsterData = gameSession.gameManager.getObject(
    uuid,
    GAME_OBJECT_TYPES.OBJECT_ARRAY.MONSTERS,
  );

  if (
    monsterData[monsterIndex].monsterId !== monsterId &&
    monsterData[monsterIndex].level !== level
  ) {
    return {
      status: 'fail',
      message: '현재 생성되어 있는 올바른 몬스터가 아닙니다.',
    };
  }

  gameSession.gameManager.removeObject(uuid, GAME_OBJECT_TYPES.OBJECT_ARRAY.MONSTERS, monsterIndex);

  const opponentUserSocket = gameSession.getOpponentUserSocket(uuid);
  sendNotification(opponentUserSocket, { handlerId: 17, monsterIndex }, '적 몬스터가 죽었습니다.');

  let score = gameSession.gameManager.getObject(uuid, GAME_OBJECT_TYPES.OBJECT.SCORE);
  let gold = gameSession.gameManager.getObject(uuid, GAME_OBJECT_TYPES.OBJECT.GOLD);
  let monsterLevel = gameSession.gameManager.getObject(uuid, GAME_OBJECT_TYPES.OBJECT.LEVEL);
  let killCount = gameSession.gameManager.getObject(uuid, GAME_OBJECT_TYPES.OBJECT.KILLCOUNT);

  score += 100 + monsterData[monsterIndex].level * 10;
  killCount += 1;

  if (killCount >= 20) {
    killCount = 0;
    gold += 1000 + 200 * monsterLevel;
    monsterLevel += 1;
  }

  gameSession.gameManager.addObject(uuid, GAME_OBJECT_TYPES.OBJECT.SCORE, score);
  gameSession.gameManager.addObject(uuid, GAME_OBJECT_TYPES.OBJECT.GOLD, gold);
  gameSession.gameManager.addObject(uuid, GAME_OBJECT_TYPES.OBJECT.LEVEL, monsterLevel);
  gameSession.gameManager.addObject(uuid, GAME_OBJECT_TYPES.OBJECT.KILLCOUNT, killCount);

  return {
    status: 'success',
    message: '몬스터가 죽었습니다.',
    handlerId: 16,
    monsterIndex,
    score,
    gold,
    level: monsterLevel,
  };
};
