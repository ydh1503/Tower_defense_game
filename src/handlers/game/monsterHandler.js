// 몬스터 스폰 핸들러
export const spawnMonsterHandler = (uuid, payload) => {
  // 클라 uuid를 받아 게임 세션에서 해당 uuid를 검색
  // 검색한 게임 세션에서 상대방 uuid를 가져온 후 서버로 소켓을 보낸 클라에게 다시 response에 각 값을 넣고 emit
  // helper.js에서 if문 처리로 to 라는 데이터가 있다면 io.to(socket.id).emit 을 통해 특정 상대방에게 emit 가능
  // payload = { monsterId, level, width, height }
};
