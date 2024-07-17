export const SQL_QUERIES = {
  FIND_USER_BY_ID: 'SELECT * FROM user WHERE id = ?',
  FIND_USER_BY_NAME: 'SELECT * FROM user WHERE name = ?',
  UPDATE_USER_SCORE: 'UPDATE user SET high_score = GREATEST(high_score, ?) WHERE id = ?',
  INSERT_USER: 'INSERT INTO user (id, name, pw) VALUES (?, ?, ?)',
};
