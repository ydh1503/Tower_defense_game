class User {
  constructor(id, socket) {
    this.id = id;
    this.socket = socket;
    this.monsters = [];
    this.towers = [];
  }

  addMonster(monster) {
    this.monsters.push(monster);
  }

  addTower(tower) {
    this.towers.push(tower);
  }
}

export default User;
