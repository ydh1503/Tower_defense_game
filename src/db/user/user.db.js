import pools from '../database.js';
import { SQL_QUERIES } from './user.queries.js';

export const findUserByID = async (id) => {
  const [rows] = await pools.USER_DB.query(SQL_QUERIES.FIND_USER_BY_ID, [id]);
  return rows.length > 0; // 해당 ID를 가진 사용자가 존재하면 true, 아니면 false 반환
  // 체크 필요
};

// 유저 테이블에 로그인 시간을 기록하지 않으므로 삭제 필요
// export const updateUserLogin = async (id) => {
//   await pools.USER_DB.query(SQL_QUERIES.UPDATE_USER_LOGIN, [id]); // 사용자의 로그인 시간 업데이트
// };

export const updateUserScore = async (score, id) => {
  await pools.USER_DB.query(SQL_QUERIES.UPDATE_USER_SCORE, [score, id]); // 사용자의 점수 업데이트
};

export const registerUser = async (id, password) => {
  await pools.USER_DB.query(SQL_QUERIES.INSERT_USER, [id, password]); // 새로운 사용자 등록
};

export const getPasswordById = async (id) => {
  const [rows] = await pools.USER_DB.query(SQL_QUERIES.FIND_PASSWORD_BY_ID, [id]);
  return rows[0]?.password || null; // 해당 ID를 가진 사용자의 비밀번호 반환
};
