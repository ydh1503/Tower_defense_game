import { ctx, opponentCtx, towers, opponentTowers, towerImage, userId } from '../src/multi_game.js';
import { Tower } from '../src/tower.js';

export const cliTowerhandler = async (data) => {
  console.log(`data: ${JSON.stringify(data)}`);

  if (data.userId) {
    const tower = new Tower(data.x, data.y);
    towers.push(tower);
    tower.draw(ctx, towerImage);
  } else {
    const tower = new Tower(data.x, data.y);
    opponentTowers.push(tower);
    tower.draw(opponentCtx, towerImage);
  }
};
