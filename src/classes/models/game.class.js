import { foundMatchNotification, sendNotification } from '../../utils/notification/game.notification.js';
import GameManager from '../managers/game.manager.js';
// import IntervalManager from '../managers/interval.manager.js';

class Game {
  constructor(id, users) {
    this.id = id;
    this.users = users;
    this.gameManager = new GameManager();
    this.startGame();
    // this.intervalManger = new IntervalManager();
  }

  getUser(userId) {
    return this.users.find((user) => user.id === userId);
  }

  removeUser(userId) {
    this.users = this.users.filter((user) => user.id !== userId);
    // this.intervalManger.removePlayer(userId);
  }

  updateTower(userId, payload){
    const opponentUserSocket = this.users.find((user) => user.id !== userId).socket;
    sendNotification(opponentUserSocket, payload, '적 타워가 생성되었습니다.');
  }

  initGame() {
    this.users.forEach((user) => {
      this.gameManager.addPlayer(user.id, user.canvas);
    });
  }

  startGame() {
    this.initGame();
    this.users.forEach((user) => {
      const userData = this.gameManager.getPlayer(user.id); // 해당 유저 게임 초기 설정 값(몬스터 경로, 기지 위치 등)
      const opponentData = this.users
        .filter((opponent) => opponent !== user)
        .map((opponent) => this.gameManager.getPlayer(opponent.id));

      foundMatchNotification(user.socket, userData, opponentData, this.id);
    });
  }
}

export default Game;
