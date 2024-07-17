import {
  attackedMonsterHandler,
  deadMonsterHandler,
  spawnMonsterHandler,
} from './game/monster.handler.js';
import startMatchingHandler from './game/startMatching.handler.js';
import { purchaseTowerHandler } from './game/tower.handler.js';
import { attackBaseHandler } from './game/base.handler.js';
import endGameHandler from './game/endGame.handler.js';

const handlerMappings = {
  // 1: 함수이름,
  2: startMatchingHandler,
  3: endGameHandler,
  8: spawnMonsterHandler,
  11: purchaseTowerHandler,
  12: attackedMonsterHandler,
  16: deadMonsterHandler,
  21: attackBaseHandler,
};

export default handlerMappings;
