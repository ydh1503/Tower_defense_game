import { updateBaseHp } from '../src/multi_game.js';

export const attackBaseHandler = (payload) => {
  const { baseHp } = payload;
  updateBaseHp(baseHp);
};

export const attackOpponentBaseHandler = (payload) => {
  const { baseHp } = payload;
  updateBaseHp(baseHp, true);
};
