class Base {
  constructor(x, y, maxHp) {
    this.x = x; // 기지 x 좌표
    this.y = y; // 기지 y 좌표
    this.hp = maxHp; // 기지의 현재 HP
    this.maxHp = maxHp; // 기지의 최대 HP
  }

  // method 추가
  takeDamage(amount) {
    this.hp -= amount;
    return this.hp <= 0; // 기지의 HP가 0 이하이면 true, 아니면 false
  }
}

export default Base;
