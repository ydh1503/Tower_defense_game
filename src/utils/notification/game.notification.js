import { convertMapToObject } from '../transform.js';

export const sendNotification = (socket, payload, message, eventName = 'notification') => {
  socket.emit(eventName, { status: 'success', message, payload });
};

export const startMatching = (socket) => {
  const payload = { timestamp: Date.now() };
  return sendNotification(socket, payload, 'start matching');
};

export const foundMatchNotification = (socket, userData, opponentData, gameId) => {
  const payload = {
    userData: convertMapToObject(userData),
    opponentData: convertMapToObject(opponentData),
    gameId,
  };
  return sendNotification(socket, payload, 'found matching', 'matchFound');
};
