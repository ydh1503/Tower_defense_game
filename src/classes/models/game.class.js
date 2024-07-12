import { foundMatchNotification } from '../../utils/notification/game.notification.js';
// import IntervalManager from '../managers/interval.manager.js';

class Game {
  constructor(id, users) {
    this.id = id;
    this.users = users;
    this.startGame();
    // this.intervalManger = new IntervalManager();
  }

  getUser(userId) {
    return this.users.find((user) => user.id === userId);
  }

  removeUser(userId) {
    this.users = this.users.filter((user) => user.id !== userId);
    // this.intervalManger.removePlayer(userId);

    if (this.users.length < MAX_PLAYERS) {
      this.state = 'waiting';
    }
  }

  startGame() {
    this.users.forEach((user) => {
      const userData = 'userData'; // 해당 유저 게임 초기 설정 값(몬스터 경로, 초기 타워 위치 등)
      const opponentData = this.users
        .filter((opponent) => opponent !== user)
        .map((opponent) => 'opponentData');

      foundMatchNotification(user.socket, userData, opponentData, this.id);
    });
  }
}

export default Game;
