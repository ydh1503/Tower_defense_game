import { pushMonsterArray, pushOpponentMonsterArray } from '../src/multi_game.js';

// 몬스터 스폰 핸들러
export const spawnMonsterHandler = (payload) => {
  const { id, level } = payload;
  pushMonsterArray(id, level);

  console.log('1' + id);
};

export const spawnOpponentMonsterHandler = (payload) => {
  const { id, level } = payload;
  pushOpponentMonsterArray(id, level);

  console.log('2' + id);
};
