import { spawnMonsterHandler } from './game/monsterHandler';
import startMatchingHandler from './startMatching.handler.js';

const handlerMappings = {
  // 1: 함수이름,
  8: spawnMonsterHandler,
  2: startMatchingHandler,
};

export default handlerMappings;
