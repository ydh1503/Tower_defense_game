import {
  attackedMonsterHandler,
  attackedOpponentMonsterHandler,
  deadMonsterHandler,
  deadOpponentMonsterHandler,
  spawnMonsterHandler,
  spawnOpponentMonsterHandler,
} from './monsterHandler.js';
import { cliTowerhandler } from './cliTower.handler.js';

const handlerMappings = {
  //1: 함수 이름,
  8: spawnMonsterHandler,
  9: spawnOpponentMonsterHandler,
  12: attackedMonsterHandler,
  13: attackedOpponentMonsterHandler,
  16: deadMonsterHandler,
  17: deadOpponentMonsterHandler,
  12: cliTowerhandler,
};

export default handlerMappings;
