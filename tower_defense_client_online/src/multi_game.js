import { handleNotification, handleResponse } from '../handlers/helper.js';
import { Base } from './base.js';
import { Monster } from './monster.js';
import { Tower } from './tower.js';

if (!getCookieValue('authorization1')) {
  alert('로그인이 필요합니다.');
  location.href = '/login.html';
}

let serverSocket;
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const opponentCanvas = document.getElementById('opponentCanvas');
const opponentCtx = opponentCanvas.getContext('2d');

const progressBarContainer = document.getElementById('progressBarContainer');
const progressBarMessage = document.getElementById('progressBarMessage');
const progressBar = document.getElementById('progressBar');
const loader = document.getElementsByClassName('loader')[0];

const NUM_OF_MONSTERS = 5; // 몬스터 개수

// 서버 데이터
let gameId;

// 게임 데이터
let isPlay = false;
let towerCost = 0; // 타워 구입 비용
let monsterSpawnInterval = 3000; // 몬스터 생성 주기

// 유저 데이터
let userGold = 0; // 유저 골드
let base; // 기지 객체
let baseHp = 0; // 기지 체력
let monsterLevel = 0; // 몬스터 레벨
let monsterPath; // 몬스터 경로
let initialTowerCoords; // 초기 타워 좌표
let basePosition; // 기지 좌표
const monsters = []; // 유저 몬스터 목록
const towers = []; // 유저 타워 목록
let score = 0; // 게임 점수
let highScore = 0; // 기존 최고 점수

// 상대 데이터
let opponentBase; // 상대방 기지 객체
let opponentMonsterPath; // 상대방 몬스터 경로
let opponentInitialTowerCoords; // 상대방 초기 타워 좌표
let opponentBasePosition; // 상대방 기지 좌표
const opponentMonsters = []; // 상대방 몬스터 목록
const opponentTowers = []; // 상대방 타워 목록

let isInitGame = false;

// 이미지 로딩 파트
const backgroundImage = new Image();
backgroundImage.src = 'images/bg.webp';

const towerImage = new Image();
towerImage.src = 'images/tower.png';

const baseImage = new Image();
baseImage.src = 'images/base.png';

const pathImage = new Image();
pathImage.src = 'images/path.png';

const monsterImages = [];
for (let i = 1; i <= NUM_OF_MONSTERS; i++) {
  const img = new Image();
  img.src = `images/monster${i}.png`;
  monsterImages.push(img);
}

let bgm;

function getCookieValue(name) {
  const regex = new RegExp(`(^| )${name}=([^;]+)`);
  const match = document.cookie.match(regex);
  if (match) {
    return match[2];
  }
  return;
}

function initMap() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // 배경 이미지 그리기
  drawPath(monsterPath, ctx);
  drawPath(opponentMonsterPath, opponentCtx);
  placeInitialTowers(initialTowerCoords, towers, ctx); // 초기 타워 배치
  placeInitialTowers(opponentInitialTowerCoords, opponentTowers, opponentCtx); // 상대방 초기 타워 배치
  placeBase(basePosition, true);
  placeBase(opponentBasePosition, false);
}

function drawPath(path, context) {
  const segmentLength = 10; // 몬스터 경로 세그먼트 길이
  const imageWidth = 30; // 몬스터 경로 이미지 너비
  const imageHeight = 30; // 몬스터 경로 이미지 높이
  const gap = 3; // 몬스터 경로 이미지 겹침 방지를 위한 간격

  for (let i = 0; i < path.length - 1; i++) {
    const startX = path[i].x;
    const startY = path[i].y;
    const endX = path[i + 1].x;
    const endY = path[i + 1].y;

    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY); // 피타고라스 정리로 두 점 사이의 거리를 구함 (유클리드 거리)
    const angle = Math.atan2(deltaY, deltaX); // 두 점 사이의 각도를 tan-1(y/x)로 구해야 함 (자세한 것은 역삼각함수 참고): 삼각함수는 변의 비율! 역삼각함수는 각도를 구하는 것!

    for (let j = gap; j < distance - gap; j += segmentLength) {
      const x = startX + Math.cos(angle) * j; // 다음 이미지 x좌표 계산(각도의 코사인 값은 x축 방향의 단위 벡터 * j를 곱하여 경로를 따라 이동한 x축 좌표를 구함)
      const y = startY + Math.sin(angle) * j; // 다음 이미지 y좌표 계산(각도의 사인 값은 y축 방향의 단위 벡터 * j를 곱하여 경로를 따라 이동한 y축 좌표를 구함)
      drawRotatedImage(pathImage, x, y, imageWidth, imageHeight, angle, context);
    }
  }
}

function drawRotatedImage(image, x, y, width, height, angle, context) {
  context.save();
  context.translate(x + width / 2, y + height / 2);
  context.rotate(angle);
  context.drawImage(image, -width / 2, -height / 2, width, height);
  context.restore();
}

function placeInitialTowers(initialTowerCoords, initialTowers, context) {
  initialTowerCoords.forEach((towerCoords) => {
    const tower = new Tower(towerCoords.x, towerCoords.y);
    initialTowers.push(tower);
    tower.draw(context, towerImage);
  });
}

function placeNewTower() {
  // 타워 구입 이벤트
  sendEvent(11, { gameId });
}

function placeBase(position, isPlayer) {
  if (isPlayer) {
    base = new Base(position.x, position.y, baseHp);
    base.draw(ctx, baseImage);
  } else {
    opponentBase = new Base(position.x, position.y, baseHp);
    opponentBase.draw(opponentCtx, baseImage, true);
  }
}

function spawnMonster() {
  const monsterNumber = Math.floor(Math.random() * monsterImages.length);
  sendEvent(8, {
    gameId,
    monsterNumber: monsterNumber,
    level: monsterLevel,
  });
}

function gameLoop() {
  // 렌더링 시에는 항상 배경 이미지부터 그려야 합니다! 그래야 다른 이미지들이 배경 이미지 위에 그려져요!
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // 배경 이미지 다시 그리기
  drawPath(monsterPath, ctx); // 경로 다시 그리기

  ctx.font = '25px Times New Roman';
  ctx.fillStyle = 'skyblue';
  ctx.fillText(`최고 기록: ${highScore}`, 100, 50); // 최고 기록 표시
  ctx.fillStyle = 'white';
  ctx.fillText(`점수: ${score}`, 100, 100); // 현재 스코어 표시
  ctx.fillStyle = 'yellow';
  ctx.fillText(`골드: ${userGold}`, 100, 150); // 골드 표시
  ctx.fillStyle = 'black';
  ctx.fillText(`현재 레벨: ${monsterLevel}`, 100, 200); // 최고 기록 표시

  // 타워 그리기 및 몬스터 공격 처리
  towers.forEach((tower, towerIndex) => {
    tower.draw(ctx, towerImage);
    tower.updateCooldown();
    monsters.forEach((monster, monsterIndex) => {
      monster.draw(ctx);
      const distance = Math.sqrt(
        Math.pow(tower.x - monster.x, 2) + Math.pow(tower.y - monster.y, 2),
      );
      if (distance < tower.range) {
        const isAttack = tower.isAttack();
        if (isAttack) {
          sendEvent(12, {
            gameId,
            monsterId: monster.id,
            towerIndex,
          });
        }
      }
    });
  });

  // 몬스터가 공격을 했을 수 있으므로 기지 다시 그리기
  base.draw(ctx, baseImage);

  for (let i = monsters.length - 1; i >= 0; i--) {
    const monster = monsters[i];
    if (monster.hp > 0) {
      const Attacked = monster.move();
      if (Attacked) {
        const attackedSound = new Audio('sounds/attacked.wav');
        attackedSound.volume = 0.3;
        attackedSound.play();
        sendEvent(21, { gameId, damage: monster.attackPower, monsterId: monster.id });
      }
    } else {
      sendEvent(16, {
        gameId,
        monsterId: monster.id,
      });
    }
  }

  // 상대방 게임 화면 업데이트
  opponentCtx.drawImage(backgroundImage, 0, 0, opponentCanvas.width, opponentCanvas.height);
  drawPath(opponentMonsterPath, opponentCtx); // 상대방 경로 다시 그리기

  opponentTowers.forEach((tower) => {
    tower.draw(opponentCtx, towerImage);
    tower.updateCooldown(); // 적 타워의 쿨다운 업데이트
  });

  opponentMonsters.forEach((monster) => {
    monster.move();
    monster.draw(opponentCtx, true);
  });

  opponentBase.draw(opponentCtx, baseImage, true);

  if (isPlay) {
    requestAnimationFrame(gameLoop); // 지속적으로 다음 프레임에 gameLoop 함수 호출할 수 있도록 함
  }
}

function initGame() {
  if (isInitGame) {
    return;
  }
  isPlay = true;

  bgm = new Audio('sounds/bgm.mp3');
  bgm.loop = true;
  bgm.volume = 0.2;
  bgm.play();

  initMap(); // 맵 초기화 (배경, 몬스터 경로 그리기)

  setInterval(spawnMonster, monsterSpawnInterval); // 설정된 몬스터 생성 주기마다 몬스터 생성
  gameLoop(); // 게임 루프 최초 실행
  isInitGame = true;
}

// 이미지 로딩 완료 후 서버와 연결하고 게임 초기화
Promise.all([
  new Promise((resolve) => (backgroundImage.onload = resolve)),
  new Promise((resolve) => (towerImage.onload = resolve)),
  new Promise((resolve) => (baseImage.onload = resolve)),
  new Promise((resolve) => (pathImage.onload = resolve)),
  ...monsterImages.map((img) => new Promise((resolve) => (img.onload = resolve))),
]).then(() => {
  serverSocket = io('http://localhost:3000', {
    auth: {
      token: getCookieValue('authorization1'),
    },
  });

  serverSocket.on('connect_error', (err) => {
    if (err.message === 'Authentication error') {
      alert('잘못된 토큰입니다.');
      location.href = '/login.html';
    }
  });

  serverSocket.on('connect', () => {
    console.log('success connect');
  });

  serverSocket.on('connection', (data) => {
    sendEvent(2, { width: canvas.width, height: canvas.height });
    highScore = data.highScore;
  });

  serverSocket.on('matchFound', (data) => {
    console.log(data);
    console.log(data.message);

    gameId = data.payload.gameId;
    monsterPath = data.payload.userData.path.path; // path, base, towers, monsters (임시)
    opponentMonsterPath = data.payload.opponentData[0].path.path;
    initialTowerCoords = data.payload.userData.towers; // 초기 타워 배치
    opponentInitialTowerCoords = data.payload.opponentData[0].towers;
    baseHp = data.payload.userData.base.maxHp;
    basePosition = data.payload.userData.base;
    opponentBasePosition = data.payload.opponentData[0].base;
    userGold = data.payload.userData.gold;

    // 상대가 매치되면 3초 뒤 게임 시작
    progressBarMessage.textContent = '게임이 3초 뒤에 시작됩니다.';

    let progressValue = 0;
    const progressInterval = setInterval(() => {
      progressValue += 10;
      progressBar.value = progressValue;
      progressBar.style.display = 'block';
      loader.style.display = 'none';

      if (progressValue >= 100) {
        clearInterval(progressInterval);
        progressBarContainer.style.display = 'none';
        progressBar.style.display = 'none';
        buyTowerButton.style.display = 'block';
        canvas.style.display = 'block';
        opponentCanvas.style.display = 'block';

        // TODO. 유저 및 상대방 유저 데이터 초기화
        if (!isInitGame) {
          initGame();
        }
      }
    }, 300);
  });

  serverSocket.on('notification', (data) => {
    handleNotification(data);
  });

  serverSocket.on('response', (data) => {
    handleResponse(data);
  });

  serverSocket.on('gameOver', (data) => {
    bgm.pause();
    const { isWin } = data.payload;
    let sound;
    let message;
    if (isWin) {
      sound = new Audio('sounds/win.wav');
      message = '당신이 게임에서 승리했습니다!';
    } else {
      sound = new Audio('sounds/lose.wav');
      message = '아쉽지만 대결에서 패배하셨습니다! 다음 대결에서는 꼭 이기세요!';
    }
    sound.volume = 0.3;
    sound.play().then(() => {
      isPlay = false;
      alert(message);
      sendEvent(3, { gameId });
      location.reload();
    });
  });
});

const buyTowerButton = document.createElement('button');
buyTowerButton.textContent = '타워 구입';
buyTowerButton.style.position = 'absolute';
buyTowerButton.style.top = '10px';
buyTowerButton.style.right = '10px';
buyTowerButton.style.padding = '10px 20px';
buyTowerButton.style.fontSize = '16px';
buyTowerButton.style.cursor = 'pointer';
buyTowerButton.style.display = 'none';

buyTowerButton.addEventListener('click', placeNewTower);

document.body.appendChild(buyTowerButton);

function sendEvent(handlerId, payload) {
  serverSocket.emit('event', {
    clientVersion: '1.0.0',
    handlerId,
    payload,
  });
}

function pushMonsterArray(monsterId, monsterNumber, level) {
  const newMonster = new Monster(monsterId, monsterPath, monsterImages, level, monsterNumber);
  monsters.push(newMonster);
}

function pushOpponentMonsterArray(monsterId, monsterNumber, level) {
  const newMonster = new Monster(
    monsterId,
    opponentMonsterPath,
    monsterImages,
    level,
    monsterNumber,
  );
  opponentMonsters.push(newMonster);
}

function deadMonster(monsterId, updateScore, gold, level) {
  const monsterIndex = monsters.findIndex((monster) => monster.id === monsterId);

  score = updateScore;
  userGold = gold;
  monsterLevel = level;

  monsters.splice(monsterIndex, 1);
}

function deadOpponentMonster(monsterId) {
  const monsterIndex = opponentMonsters.findIndex((monster) => monster.id === monsterId);
  opponentMonsters.splice(monsterIndex, 1);
}

function updateBaseHp(baseHp, monsterId, isOpponent = false) {
  if (!isOpponent) {
    const monsterIndex = monsters.findIndex((monster) => monster.id === monsterId);
    monsters.splice(monsterIndex, 1);
    base.hp = baseHp;
  } else {
    deadOpponentMonster(monsterId);
    opponentBase.hp = baseHp;
  }
}

function attackedMonster(towerIndex, monsterId, status) {
  if (status === 'success') {
    const monsterIndex = monsters.findIndex((monster) => monster.id === monsterId);
    towers[towerIndex].attack(monsters[monsterIndex]);
  } else {
    towers[towerIndex].cooldown = 0;
  }
}

function attackedOpponentMonster(towerIndex, monsterId) {
  const monsterIndex = opponentMonsters.findIndex((monster) => monster.id === monsterId);
  opponentTowers[towerIndex].attack(opponentMonsters[monsterIndex]);
}

function addTower(userId, x, y, gold) {
  if (userId) {
    userGold = gold;
    const tower = new Tower(x, y);
    towers.push(tower);
    tower.draw(ctx, towerImage);
  } else {
    const tower = new Tower(x, y);
    opponentTowers.push(tower);
    tower.draw(opponentCtx, towerImage);
  }
}

export {
  pushMonsterArray,
  pushOpponentMonsterArray,
  deadMonster,
  deadOpponentMonster,
  updateBaseHp,
  addTower,
  attackedMonster,
  attackedOpponentMonster,
};
