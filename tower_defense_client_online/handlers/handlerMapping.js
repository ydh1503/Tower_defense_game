import { attackBaseHandler, attackOpponentBaseHandler } from './base.handler.js';
import {
  attackedMonsterHandler,
  attackedOpponentMonsterHandler,
  deadMonsterHandler,
  deadOpponentMonsterHandler,
  spawnMonsterHandler,
  spawnOpponentMonsterHandler,
} from './monster.handler.js';
import { towerHandler } from './tower.handler.js';

const handlerMappings = {
  //1: 함수 이름,
  8: spawnMonsterHandler,
  9: spawnOpponentMonsterHandler,
  11: towerHandler,
  12: attackedMonsterHandler,
  13: attackedOpponentMonsterHandler,
  16: deadMonsterHandler,
  17: deadOpponentMonsterHandler,
  21: attackBaseHandler,
  22: attackOpponentBaseHandler,
};

export default handlerMappings;
