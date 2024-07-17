import { getMatchingSession } from '../../session/matching.session.js';
import { getUserById } from '../../session/user.session.js';

const startMatchingHandler = (userId, payload) => {
  const user = getUserById(userId);
  if (!user) {
    return { status: 'fail', message: 'user not found' };
  }

  user.canvas = { width: payload.width, height: payload.height };

  const matchingSession = getMatchingSession();
  matchingSession.addUser(user);

  return { status: 'success', message: 'start matching', timestamp: Date.now() };
};

export default startMatchingHandler;
