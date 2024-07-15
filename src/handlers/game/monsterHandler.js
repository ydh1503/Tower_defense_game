import { getGameSession } from '../../session/game.session.js';

// 몬스터 스폰 핸들러
export const spawnMonsterHandler = (uuid, payload) => {
  const { gameId, monsterId, level } = payload;

  const gameSession = getGameSession(gameId);
  gameSession.spawnMonster(uuid, { handlerId: 9, id: monsterId, level: level });

  return {
    status: 'success',
    message: '몬스터가 생성되었습니다.',
    handlerId: 8,
    id: monsterId,
    level: level,
  };
};
