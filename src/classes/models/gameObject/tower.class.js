class Tower {
  constructor(path) {
    const { x, y } = this.getRandomPositionNearPath(200, path);
    this.x = x; // 타워 x 좌표
    this.y = y; // 타워 y 좌표
  }

  getRandomPositionNearPath(maxDistance, monsterPath) {
    const segmentIndex = Math.floor(Math.random() * (monsterPath.length - 1));
    const startX = monsterPath[segmentIndex].x;
    const startY = monsterPath[segmentIndex].y;
    const endX = monsterPath[segmentIndex + 1].x;
    const endY = monsterPath[segmentIndex + 1].y;

    const t = Math.random();
    const posX = startX + t * (endX - startX);
    const posY = startY + t * (endY - startY);

    const offsetX = (Math.random() - 0.5) * 2 * maxDistance;
    const offsetY = (Math.random() - 0.5) * 2 * maxDistance;

    return {
      x: posX + offsetX,
      y: posY + offsetY,
    };
  }
  // method 추가
  // upgrade(){}
}

export default Tower;
