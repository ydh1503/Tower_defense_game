import { getGameSession } from '../session/game.session.js';

const attackBaseHandler = (userId, payload) => {
  const gameSession = getGameSession(payload.gameId);
  const baseHp = gameSession.updateBaseHP(userId, payload.damage);

  return { status: 'success', message: 'Base is attacked', baseHp };
};

export default attackBaseHandler;
