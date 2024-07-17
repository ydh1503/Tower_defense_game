import jwt from 'jsonwebtoken';
import { config } from '../../config/config.js';
import { findUserByID } from '../../db/user/user.db.js';

export const authMiddleware = async (cookie) => {
  try {
    if (!cookie) throw new Error('토큰이 존재하지 않습니다.');

    const [tokenType, token] = cookie.split(' ');

    if (tokenType !== 'Bearer') throw new Error('토큰 타입이 일치하지 않습니다.');

    const decodedToken = jwt.verify(token, config.key.secret_key);
    const id = decodedToken.id;

    const user = await findUserByID(id);
    if (!user) {
      throw new Error('토큰 ID를 가진 사용자가 존재하지 않습니다.');
    }

    return user;
  } catch (err) {
    console.log(err);
  }
};
