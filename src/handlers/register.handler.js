import { v4 as uuidv4 } from 'uuid';
import { handleDisconnect, handleConnection, handleEvent } from './helper.js';

const registerHandler = async (io) => {
  await io.on('connection', async (socket) => {
    // 최초 커넥션을 맺은 이후 발생하는 각종 이벤트를 처리하는 곳

    // 접속시 유저 정보 생성 이벤트 처리
    await handleConnection(socket, userUUID);

    // 모든 서비스 이벤트 처리
    socket.on('event', async (data) => await handleEvent(io, socket, data));

    // 접속 해제시 이벤트 처리
    socket.on('disconnect', async () => await handleDisconnect(socket, userUUID));
  });
};

export default registerHandler;
