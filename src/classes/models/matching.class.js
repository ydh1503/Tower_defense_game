import { v4 as uuidv4 } from 'uuid';
import { addGameSession } from '../../session/game.session.js';

const USERS_PER_GAME = 2;

class Matching {
  constructor() {
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);
    this.matchUsers();
  }

  removeUser(userId) {
    this.users = this.users.filter((user) => user.id !== userId);
  }

  matchUsers() {
    if (!this.users || this.users.length < USERS_PER_GAME) {
      console.log('not enough user', this.users);
      return null;
    }

    const matchedUsers = this.users.splice(0, USERS_PER_GAME);

    const gameId = uuidv4();
    addGameSession(gameId, matchedUsers);

    console.log('matching complete:', matchedUsers);
    return matchedUsers;
  }
}

export default Matching;
