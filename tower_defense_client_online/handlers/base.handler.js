import { updateBaseHp } from '../src/multi_game.js';

export const attackBaseHandler = (payload) => {
  const { baseHp, monsterId } = payload;
  updateBaseHp(baseHp, monsterId);
};

export const attackOpponentBaseHandler = (payload) => {
  const { baseHp, monsterId } = payload;
  updateBaseHp(baseHp, monsterId, true);
};
