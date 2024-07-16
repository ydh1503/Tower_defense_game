import { convertMapToObject } from '../transform.js';

export const sendNotification = (socket, payload, message, eventName = 'notification') => {
  socket.emit(eventName, { status: 'success', message, payload });
};

export const foundMatchNotification = (socket, userData, opponentData, gameId) => {
  const payload = {
    userData: convertMapToObject(userData),
    opponentData: convertMapToObject(opponentData),
    gameId,
  };
  return sendNotification(socket, payload, 'found matching', 'matchFound');
};

export const endGameNotification = (socket, isWin, score) => {
  const payload = {
    isWin,
    score,
  };
  return sendNotification(socket, payload, 'game over', 'gameOver');
};
