import { config } from '../config/config.js';
import handlerMappings from './handlerMapping.js';

export const handleDisconnect = (socket, uuid) => {
  console.log(`User disconnected: ${socket.id}`);
};

export const handleConnection = async (socket, userUUID) => {
  console.log(`New user connected: ${userUUID} with socket ID ${socket.id}`);
  socket.emit('connection', { uuid: userUUID });
};

export const handleEvent = async (io, socket, data) => {
  if (!config.client.clientVersion !== data.clientVersion) {
    // 만약 일치하는 버전이 없다면 response 이벤트로 fail 결과를 전송합니다.
    socket.emit('response', { status: 'fail', message: 'Client version mismatch' });
    return;
  }

  const handler = handlerMappings[data.handlerId];
  if (!handler) {
    socket.emit('response', { status: 'fail', message: 'Handler not found' });
    return;
  }

  // 적절한 핸들러에 userID 와 payload를 전달하고 결과를 받습니다.
  const response = await handler(data.userId, data.payload);
  // 만약 결과에 broadcast (모든 유저에게 전달)이 있다면 broadcast 합니다.
  if (response.broadcast) {
    io.emit('response', response);
    return;
  }
  // 해당 유저에게 적절한 response를 전달합니다.
  socket.emit('response', response);
};
