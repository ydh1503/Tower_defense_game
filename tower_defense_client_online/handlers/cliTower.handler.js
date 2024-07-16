import { addTower } from '../src/multi_game.js';

export const cliTowerhandler = async (payload) => {
  const { userId, x, y, userGold } = payload;
  addTower(userId, x, y, userGold);
};
