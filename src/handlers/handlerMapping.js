import attackBaseHandler from './attackBase.handler.js';
import startMatchingHandler from './startMatching.handler.js';

const handlerMappings = {
  // 1: 함수이름,
  2: startMatchingHandler,
  21: attackBaseHandler,
};

export default handlerMappings;
