import { Monster } from '../../classes/models/gameObject/monster.class.js';
import GAME_OBJECT_TYPES from '../../constants/gameObjectTypes.js';
import { getGameSession } from '../../session/game.session.js';
import { sendNotification } from '../../utils/notification/game.notification.js';
import { v4 as uuidv4 } from 'uuid';

// 몬스터 스폰 핸들러
export const spawnMonsterHandler = (uuid, payload) => {
  const { gameId, monsterNumber, level } = payload;

  const gameSession = getGameSession(gameId);

  const monsterId = uuidv4();
  gameSession.gameManager.addObject(
    uuid,
    GAME_OBJECT_TYPES.OBJECT_ARRAY.MONSTERS,
    new Monster(monsterId, monsterNumber, level),
  );

  const opponentUserSocket = gameSession.getOpponentUserSocket(uuid);
  sendNotification(
    opponentUserSocket,
    { handlerId: 9, id: monsterId, number: monsterNumber, level: level },
    '적 몬스터가 생성되었습니다.',
  );

  return {
    status: 'success',
    message: '몬스터가 생성되었습니다.',
    handlerId: 8,
    id: monsterId,
    number: monsterNumber,
    level,
  };
};

// 몬스터 사망 핸들러
export const deadMonsterHandler = (uuid, payload) => {
  const { gameId, monsterId } = payload;

  const gameSession = getGameSession(gameId);
  const monsterData = gameSession.gameManager.getObject(
    uuid,
    GAME_OBJECT_TYPES.OBJECT_ARRAY.MONSTERS,
  );
  const monsterIndex = monsterData.findIndex((monster) => monster.id === monsterId);

  if (monsterIndex === -1) {
    return {
      status: 'fail',
      message: '현재 생성되어 있는 올바른 몬스터가 아닙니다.',
    };
  }

  const opponentUserSocket = gameSession.getOpponentUserSocket(uuid);
  sendNotification(opponentUserSocket, { handlerId: 17, monsterId }, '적 몬스터가 죽었습니다.');

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

  gameSession.gameManager.removeObject(uuid, GAME_OBJECT_TYPES.OBJECT_ARRAY.MONSTERS, monsterIndex);

  return {
    status: 'success',
    message: '몬스터가 죽었습니다.',
    handlerId: 16,
    monsterId,
    score,
    gold,
    level: monsterLevel,
  };
};

// 타워가 몬스터 공격 핸들러
export const attackedMonsterHandler = (uuid, payload) => {
  const { gameId, monsterId, towerIndex } = payload;

  const gameSession = getGameSession(gameId);

  const monsterData = gameSession.gameManager.getObject(
    uuid,
    GAME_OBJECT_TYPES.OBJECT_ARRAY.MONSTERS,
  );
  const monsterIndex = monsterData.findIndex((monster) => monster.id === monsterId);

  if (monsterIndex === -1) {
    return {
      status: 'fail',
      handlerId: 12,
      message: '현재 생성되어 있는 올바른 몬스터가 아닙니다.',
      towerIndex,
      monsterId,
    };
  }

  const opponentUserSocket = gameSession.getOpponentUserSocket(uuid);
  sendNotification(
    opponentUserSocket,
    { handlerId: 13, towerIndex, monsterId },
    '적 타워가 적 몬스터를 공격했습니다.',
  );

  return {
    status: 'success',
    message: '타워가 몬스터를 공격했습니다.',
    handlerId: 12,
    towerIndex,
    monsterId,
  };
};
