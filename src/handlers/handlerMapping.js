import { deadMonsterHandler, spawnMonsterHandler } from './game/monsterHandler.js';
import startMatchingHandler from './startMatching.handler.js';

const handlerMappings = {
  // 1: 함수이름,
  2: startMatchingHandler,
  8: spawnMonsterHandler,
  16: deadMonsterHandler,
  21: attackBaseHandler,
};

export default handlerMappings;
