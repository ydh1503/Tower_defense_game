import { getGameSession } from '../session/game.session.js';

export const purchaseTowerHandler = async (uuid, payload) => {
  console.log(`server: ${JSON.stringify(payload)}`);
  const { x, y, gameId } = payload;

  const gameSession = getGameSession(gameId);
  gameSession.updateTower(uuid, { handlerId: 12, x: x, y: y });

  // 1. 보내온 x, y값을 기준으로 서버에 해당 클라에 데이터를 저장
  // 2. 서버에서 클라이언트로 타워 생성 요청
  // 3. 클라이언트에서 타워 생성

  // if (userData.gold < commonData.tower_cost) // 유저의 골드가 타워 가격보다 적을 경우
  //   return { status: 'fail', message: '돈이 부족해서 구매에 실패했습니다!' };

  // userData.gold -= commonData.tower_cost;
  // userData.tower_coordinates.push({
  //   x: payload.x,
  //   y: payload.y,
  // });

  // await updateUserData(userData); // 유저의 데이터를 서버에 업데이트

  return {
    status: 'success',
    message: '구매한 타워가 성공적으로 배치되었습니다.',
    x,
    y,
    handlerId: 12,
    userId: uuid,
  };
};
