import { Server as SocketIO } from 'socket.io';
import pools from '../db/database.js';
import { createMatchingSession } from '../session/matching.session.js';
import { testAllConnections } from '../utils/db/testConnection.js';
import { loadProtos } from './loadProtos.js';
import registerHandler from '../handlers/register.handler.js';

const initSocket = async (server) => {
  try {
    const io = new SocketIO();
    io.attach(server);
    // 여기서 호출
    //await loadProtos();
    await testAllConnections(pools);
    createMatchingSession();
    // 클라이언트로부터 오는 이벤트를 처리할 핸들러를 서버에 등록
    registerHandler(io);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

export default initSocket;
