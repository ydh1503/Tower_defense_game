import { pushMonsterArray, pushOpponentMonsterArray } from '../src/multi_game';

// 몬스터 스폰 핸들러
export const spawnMonsterHandler = (uuid, payload) => {
  const { path, level, id } = payload;
  pushMonsterArray(path, level, id);
};

export const spawnOpponentMonsterHandler = (uuid, payload) => {
  const { path, level, id } = payload;
  pushOpponentMonsterArray(path, level, id);
};
