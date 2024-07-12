import { spawnMonsterHandler, spawnOpponentMonsterHandler } from './monsterHandler';

const handlerMappings = {
  //1: 함수 이름,
  8: spawnMonsterHandler,
  9: spawnOpponentMonsterHandler,
};

export default handlerMappings;
