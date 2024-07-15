import GAME_OBJECT_TYPES from '../../constants/gameObjectTypes.js';
import {
  foundMatchNotification,
  sendNotification,
} from '../../utils/notification/game.notification.js';
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

  getOpponentUserSocket(userId) {
    return this.users.find((user) => user.id !== userId).socket;
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

  updateBaseHP(userId, amount) {
    const base = this.gameManager.getObject(userId, GAME_OBJECT_TYPES.OBJECT.BASE);
    if (base.takeDamage(amount)) {
      // 게임 종료 코드 추가
    } else {
      this.users.forEach((opponent, i) => {
        if (opponent.id !== userId) {
          sendNotification(
            opponent.socket,
            { opponentIndex: i, baseHp: base.hp },
            `opponent${i} base is attacked`,
          );
        }
      });
    }

    return base.hp;
  }
}

export default Game;
