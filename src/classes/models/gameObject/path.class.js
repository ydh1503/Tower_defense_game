class Path {
  constructor(canvas) {
    this.path = this.generateRandomMonsterPath(canvas.width, canvas.height);
  }

  generateRandomMonsterPath(width, height) {
    const path = [];
    let currentX = 0;
    let currentY = Math.floor(Math.random() * 21) + 500; // 500 ~ 520 범위의 y 시작

    path.push({ x: currentX, y: currentY });

    while (currentX < width) {
      currentX += Math.floor(Math.random() * 100) + 50; // 50 ~ 150 범위의 x 증가
      if (currentX > width) {
        currentX = width;
      }

      currentY += Math.floor(Math.random() * 200) - 100; // -100 ~ 100 범위의 y 변경
      if (currentY < 0) {
        currentY = 0;
      }
      if (currentY > height) {
        currentY = height;
      }

      path.push({ x: currentX, y: currentY });
    }

    return path;
  }
}

export default Path;
