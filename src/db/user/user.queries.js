export const SQL_QUERIES = {
  FIND_USER_BY_ID: 'SELECT * FROM user WHERE id = ?',
  UPDATE_USER_LOGIN: 'UPDATE user SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
  UPDATE_HIGH_SCORE: 'UPDATE user SET high_score = ? WHERE id = ?',
  UPDATE_USER_SCORE: 'UPDATE user SET high_score = GREATEST(high_score, ?) WHERE id = ?',
  INSERT_USER: 'INSERT INTO user (id, pw) VALUES (?, ?)',
  FIND_PASSWORD_BY_ID: 'SELECT pw AS password FROM user WHERE id = ?'
};
