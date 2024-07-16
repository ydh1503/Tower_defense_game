import { attackBaseHandler } from './game/base.handler.js';
import { deadMonsterHandler, spawnMonsterHandler } from './game/monsterHandler.js';
import startMatchingHandler from './startMatching.handler.js';
import { purchaseTowerHandler } from './game/tower.handler.js';

const handlerMappings = {
  // 1: 함수이름,
  2: startMatchingHandler,
  8: spawnMonsterHandler,
  11: purchaseTowerHandler,
  16: deadMonsterHandler,
  21: attackBaseHandler,
};

export default handlerMappings;
