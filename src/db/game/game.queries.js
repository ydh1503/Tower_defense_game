export const SQL_QUERIES = {
  FIND_GAME_LOGS_BY_USER_ID: 'SELECT * FROM game_log WHERE user1_id = ? OR user2_id = ?',
  CREATE_GAME_LOG:
    'INSERT INTO game_log (id, user1_id, user2_id, user1_win, user1_score, user2_score) VALUES (?, ?, ?, ?, ?, ?)',
};
