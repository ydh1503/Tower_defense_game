import pools from '../database.js';
import { SQL_QUERIES } from './game.queries.js';

export const findGameLogsByUserId = async (id) => {
  const [rows] = await pools.GAME_DB.query(SQL_QUERIES.FIND_GAME_LOGS_BY_USER_ID, [id, id]);
  return rows[0];
};

export const createGameLog = async (id, user1, user2) => {
  await pools.GAME_DB.query(SQL_QUERIES.CREATE_GAME_LOG, [
    id,
    user1.id,
    user2.id,
    user1.isWin,
    user1.score,
    user2.score,
  ]);
};
