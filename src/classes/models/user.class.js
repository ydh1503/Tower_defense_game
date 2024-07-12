class User {
  constructor(id, socket) {
    this.id = id;
    this.socket = socket;
    this.sequence = 0;
    this.lastUpdateTime = Date.now();
    this.monsters = [];
    this.towers = [];
  }

  addMonster(monster) {
    this.monsters.push(monster);
  }

  addTower(tower) {
    this.towers.push(tower);
    this.sequence = 0;
    this.lastUpdateTime = Date.now();
  }

  getNextSequence() {
    return ++this.sequence;
  }
}

export default User;
