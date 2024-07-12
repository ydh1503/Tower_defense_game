// gameSession별 모든 유저가 공유하는 정보 관리를 위한 매니저, 현재 위치정보, ping, 보스 몬스터 현재 체력 등...

class BaseManager {
  constructor() {
    if (new.target === BaseManager) {
      throw new TypeError('Cannot construct BaseManager instances');
    }
  }

  addPlayer(playerId, ...args) {
    throw new Error('Method not implemented.');
  }

  removePlayer(playerId) {
    throw new Error('Method not implemented.');
  }

  clearAll() {
    throw new Error('Method not implemented.');
  }
}

export default BaseManager;
