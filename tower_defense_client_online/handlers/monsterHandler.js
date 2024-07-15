import {
  deadMonster,
  deadOpponentMonster,
  pushMonsterArray,
  pushOpponentMonsterArray,
} from '../src/multi_game.js';

// 몬스터 스폰 핸들러
export const spawnMonsterHandler = (payload) => {
  const { id, level } = payload;
  pushMonsterArray(id, level);
};

export const spawnOpponentMonsterHandler = (payload) => {
  const { id, level } = payload;
  pushOpponentMonsterArray(id, level);
};

// 몬스터 사망 핸들러
export const deadMonsterHandler = (payload) => {
  const { monsterIndex, score, gold, level } = payload;
  deadMonster(monsterIndex, score, gold, level);
};

export const deadOpponentMonsterHandler = (payload) => {
  const { monsterIndex } = payload;
  deadOpponentMonster(monsterIndex);
};
