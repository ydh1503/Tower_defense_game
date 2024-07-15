import { spawnMonsterHandler } from './game/monsterHandler.js';
import startMatchingHandler from './startMatching.handler.js';
import { purchaseTowerHandler } from './tower.handler.js';

const handlerMappings = {
  // 1: 함수이름,
  2: startMatchingHandler,
  8: spawnMonsterHandler,
  11: purchaseTowerHandler,
};

export default handlerMappings;
