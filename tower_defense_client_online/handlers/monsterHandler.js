import {
  attackedMonster,
  attackedOpponentMonster,
  deadMonster,
  deadOpponentMonster,
  pushMonsterArray,
  pushOpponentMonsterArray,
} from '../src/multi_game.js';

// 몬스터 스폰 핸들러
export const spawnMonsterHandler = (payload) => {
  const { id, number, level } = payload;
  pushMonsterArray(id, number, level);
};

export const spawnOpponentMonsterHandler = (payload) => {
  const { id, number, level } = payload;
  pushOpponentMonsterArray(id, number, level);
};

// 몬스터 사망 핸들러
export const deadMonsterHandler = (payload) => {
  const { monsterId, score, gold, level } = payload;
  deadMonster(monsterId, score, gold, level);
};

export const deadOpponentMonsterHandler = (payload) => {
  const { monsterId } = payload;
  deadOpponentMonster(monsterId);
};

export const attackedMonsterHandler = (payload) => {
  const { towerIndex, monsterId, status } = payload;
  attackedMonster(towerIndex, monsterId, status);
};

export const attackedOpponentMonsterHandler = (payload) => {
  const { towerIndex, monsterId } = payload;
  attackedOpponentMonster(towerIndex, monsterId);
};
