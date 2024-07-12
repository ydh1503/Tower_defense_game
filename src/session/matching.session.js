import Matching from '../classes/models/matching.class.js';
import { matchingSession } from './sessions.js';

export const createMatchingSession = () => {
  const session = new Matching();
  matchingSession.push(session);
};

export const getMatchingSession = () => {
  return matchingSession[0];
};
