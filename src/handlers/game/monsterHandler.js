// 몬스터 스폰 핸들러
export const spawnMonsterHandler = (uuid, payload) => {
  // 클라 uuid를 받아 게임 세션에서 해당 uuid를 검색
  // 검색한 게임 세션에서 상대방 uuid를 가져온 후 서버로 소켓을 보낸 클라에게 다시 response에 각 값을 넣고 emit
  // helper.js에서 if문 처리로 to 라는 데이터가 있다면 io.to(socket.id).emit 을 통해 특정 상대방에게 emit 가능
  // payload = { monsterId, level, width, height }
};

// 몬스터 경로 구하는 함수
function generateRandomMonsterPath(width, height) {
  const path = [];
  let currentX = 0;
  let currentY = Math.floor(Math.random() * 21) + 500; // 500 ~ 520 범위의 y 시작 (캔버스 y축 중간쯤에서 시작할 수 있도록 유도)

  path.push({ x: currentX, y: currentY });

  while (currentX < width) {
    currentX += Math.floor(Math.random() * 100) + 50; // 50 ~ 150 범위의 x 증가
    // x 좌표에 대한 clamp 처리
    if (currentX > width) {
      currentX = width;
    }

    currentY += Math.floor(Math.random() * 200) - 100; // -100 ~ 100 범위의 y 변경
    // y 좌표에 대한 clamp 처리
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
