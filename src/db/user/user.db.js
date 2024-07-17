import pools from '../database.js';
import { SQL_QUERIES } from './user.queries.js';

export const findUserByID = async (id) => {
  const [rows] = await pools.USER_DB.query(SQL_QUERIES.FIND_USER_BY_ID, [id]);
  return rows[0];
};

export const findUserByName = async (name) => {
  const [rows] = await pools.USER_DB.query(SQL_QUERIES.FIND_USER_BY_NAME, [name]);
  return rows[0];
};

export const updateUserScore = async (score, id) => {
  await pools.USER_DB.query(SQL_QUERIES.UPDATE_USER_SCORE, [score, id]); // 사용자의 점수 업데이트
};

export const registerUser = async (id, name, password) => {
  await pools.USER_DB.query(SQL_QUERIES.INSERT_USER, [id, name, password]); // 새로운 사용자 등록
};
