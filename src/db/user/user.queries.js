export const SQL_QUERIES = {
  FIND_USER_BY_ID: 'SELECT * FROM user WHERE id = ?',
  // UPDATE_USER_LOGIN: 'UPDATE user SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
  // UPDATE_HIGH_SCORE: 'UPDATE user SET high_score = ? WHERE id = ?',
  UPDATE_USER_SCORE: 'UPDATE user SET high_score = GREATEST(high_score, ?) WHERE id = ?',

  // user 테이블 name 값이 not null인데 해당 값을 저장하지 않음, 오류 발생 가능
  INSERT_USER: 'INSERT INTO user (id, pw) VALUES (?, ?)',

  FIND_PASSWORD_BY_ID: 'SELECT pw AS password FROM user WHERE id = ?',
};
