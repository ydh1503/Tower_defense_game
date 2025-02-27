// gameSession별 모든 유저가 공유하는 정보 관리를 위한 매니저, 현재 위치정보, ping, 보스 몬스터 현재 체력 등...

import GAME_OBJECT_TYPES from '../../constants/gameObjectTypes.js';
import Base from '../models/gameObject/base.class.js';
import Tower from '../models/gameObject/tower.class.js';
import Path from '../models/gameObject/path.class.js';
import BaseManager from './base.manager.js';

const BASE_MAX_HP = 100;
const CANVAS = { width: 1500, heigth: 680 };

class GameManager extends BaseManager {
  constructor() {
    super();
    this.gameObjects = new Map();
  }

  addPlayer(playerId, ...args) {
    this.gameObjects.set(playerId, new Map());

    this.gameObjects.get(playerId).set(GAME_OBJECT_TYPES.OBJECT.PATH, new Path(args[0] ?? CANVAS));

    const path = this.gameObjects.get(playerId).get(GAME_OBJECT_TYPES.OBJECT.PATH).path;
    this.gameObjects
      .get(playerId)
      .set(
        GAME_OBJECT_TYPES.OBJECT.BASE,
        new Base(path[path.length - 1].x, path[path.length - 1].y, BASE_MAX_HP),
      );
    const towers = [];
    for (let initTower = 0; initTower < 2; initTower++) {
      towers.push(new Tower(path));
    }
    this.gameObjects.get(playerId).set(GAME_OBJECT_TYPES.OBJECT_ARRAY.TOWERS, towers);
    this.gameObjects.get(playerId).set(GAME_OBJECT_TYPES.OBJECT_ARRAY.MONSTERS, []);
    this.gameObjects.get(playerId).set(GAME_OBJECT_TYPES.OBJECT.LEVEL, 0);
    this.gameObjects.get(playerId).set(GAME_OBJECT_TYPES.OBJECT.SCORE, 0);
    this.gameObjects.get(playerId).set(GAME_OBJECT_TYPES.OBJECT.GOLD, 1000);
    this.gameObjects.get(playerId).set(GAME_OBJECT_TYPES.OBJECT.KILLCOUNT, 0);
  }

  addObject(playerId, type, object) {
    if (this.gameObjects.has(playerId)) {
      const playerObjects = this.gameObjects.get(playerId);
      if (playerObjects.has(type)) {
        if (Object.values(GAME_OBJECT_TYPES.OBJECT).includes(type)) {
          playerObjects.set(type, object);
        } else if (Object.values(GAME_OBJECT_TYPES.OBJECT_ARRAY).includes(type)) {
          playerObjects.get(type).push(object);
        }
      }
    }
  }

  removePlayer(playerId) {
    if (this.gameObjects.has(playerId)) {
      this.gameObjects.delete(playerId);
    }
  }

  removeObject(playerId, type, objectIndex) {
    if (this.gameObjects.has(playerId)) {
      const playerObjects = this.gameObjects.get(playerId);
      if (playerObjects.has(type)) {
        if (Object.values(GAME_OBJECT_TYPES.OBJECT).includes(type)) {
          playerObjects.delete(type);
        } else if (Object.values(GAME_OBJECT_TYPES.OBJECT_ARRAY).includes(type)) {
          const object = playerObjects.get(type).splice(objectIndex, 1);
          return object;
        }
      }
    }
    return null;
  }

  getPlayer(playerId) {
    if (this.gameObjects.has(playerId)) {
      return this.gameObjects.get(playerId);
    }
    return null;
  }

  getObject(playerId, type) {
    if (this.gameObjects.has(playerId)) {
      const playerObjects = this.gameObjects.get(playerId);
      if (playerObjects.has(type)) {
        return playerObjects.get(type);
      }
    }
    return null;
  }

  clearAll() {
    this.gameObjects.clear();
  }
}

export default GameManager;
