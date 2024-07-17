import express from 'express';
import bcrypt from 'bcrypt';
import { config } from '../config/config.js';
import jwt from 'jsonwebtoken';
import { findUserByName, registerUser } from '../db/user/user.db.js';
import { v4 as uuidv4 } from 'uuid';

const accountRouter = express.Router();

const register = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({ errorMessage: '유저 아이디를 입력해 주세요!' });
  }
  if (!password) {
    return res.status(400).json({ errorMessage: '비밀번호를 입력해 주세요!' });
  }

  const validatePassword = (password) => {
    if (password == null || password == undefined) {
      return res.status(400).json({ errorMessage: '사용할 수 없는 문구가 포함되어 있습니다!' });
    }
    const regex = /^(?=\S+$).{4,}$/;
    return regex.test(password);
  };
  if (!validatePassword(password)) {
    return res.status(400).json({ errorMessage: '비밀번호 유효성 검사 실패!' });
  }

  try {
    const exists = await findUserByName(username);
    if (exists) {
      return res.status(409).json({ errorMessage: '이미 존재하는 사용자입니다!.' });
    }

    const userUUID = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    await registerUser(userUUID, username, hashedPassword);

    return res.status(201).json({ message: '회원가입 완료' });
  } catch (error) {
    console.error('회원가입 오류:', error);
    return res.status(500).json({ errorMessage: '서버 오류가 발생했습니다!.' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await findUserByName(username);
    if (!user) {
      return res.status(409).json({ errorMessage: '존재하지 않는 사용자 입니다!.' });
    }

    const hashedPassword = user.pw;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatch) {
      return res.status(401).json({ errorMessage: '비밀번호가 일치하지 않습니다.' });
    }

    const token = jwt.sign({ id: user.id }, config.key.secret_key, {
      //토큰에 담는 정보
      expiresIn: '24h',
    });
    res.status(200).json({ message: '로그인 성공 인증토큰 발행 완료', token });
  } catch (error) {
    console.log('서버 에러 발생', error);
    res.status(500).json({ errorMessage: error.message });
  }
};

accountRouter.post('/register', register);
accountRouter.post('/login', login);

export default accountRouter;
