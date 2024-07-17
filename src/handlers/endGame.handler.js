import GAME_OBJECT_TYPES from '../constants/gameObjectTypes.js';
import { updateUserScore } from '../db/user/user.db.js';
import { getGameSession, removeGameSession } from '../session/game.session.js';

const endGameHandler = (userId, payload) => {
  const { gameId } = payload;
  const gameSession = getGameSession(gameId);

  const score = gameSession.gameManager.getObject(userId, GAME_OBJECT_TYPES.OBJECT.SCORE);
  //   updateUserScore(score, userId);
  gameSession.removeUser(userId);
  if (!gameSession.users.length) {
    removeGameSession(gameId);
  }

  return { status: 'success', message: 'End game' };
};

export default endGameHandler;
