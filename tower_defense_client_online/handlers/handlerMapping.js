import { attackBaseHandler, attackOpponentBaseHandler } from './base.handler.js';
import {
  deadMonsterHandler,
  deadOpponentMonsterHandler,
  spawnMonsterHandler,
  spawnOpponentMonsterHandler,
} from './monsterHandler.js';

const handlerMappings = {
  //1: 함수 이름,
  8: spawnMonsterHandler,
  9: spawnOpponentMonsterHandler,
  16: deadMonsterHandler,
  17: deadOpponentMonsterHandler,
  21: attackBaseHandler,
  22: attackOpponentBaseHandler,
};

export default handlerMappings;
