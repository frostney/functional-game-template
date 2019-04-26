import shortid from 'shortid';

import * as CanvasProvider from './CanvasProvider';

export * as Assets from './Assets';

const gameObjectMap = {};
const globalState = {};

const defaultGameObjectState = {
  x: 0,
  y: 0,
  z: 0,
  pivotX: 0,
  pivotY: 0,
  angle: 0,
};

class GameObjectList {
  constructor(parent) {
    this.parent = parent;
  }

  push() {}

  pop() {}
}

const populateGlobalStateByBranch = (branchName, gameObjects) => {
  gameObjectMap[branchName] = gameObjects.map(() => shortid.generate());

  gameObjects.forEach((gameObject, index) => {
    const initialState = gameObject.initialState || {};
    globalState[gameObjectMap[branchName][index]] = {
      ...defaultGameObjectState,
      ...initialState,
    };
  });
};
const populateGlobalState = (gameObjects) => {
  populateGlobalStateByBranch('root', gameObjects);
};

const countChildren = (gameObjects) => {
  gameObjects.forEach((gameObject) => {
    // if (Array.isArray(gameObject.children) && gameObject.children.length > 0) {
    // }
  });
};

const dispatch = () => {};
dispatch.toChildren = () => {};

export default function (width, height, gameObjects) {
  CanvasProvider.createContext(width, height);

  populateGlobalState(gameObjects);

  // TODO: Walk through gameobject map rather than passed in game objects
  gameObjects.forEach((gameObject, index) => {
    const state = globalState[gameObjectMap.root[index]];

    // TODO: Collect preload functions

    if (gameObject.render) {
      gameObject.render(state)(CanvasProvider);
    }

    if (gameObject.update) {
      gameObject.update(state)();
    }

    // Detect changes to children and update state and map
  });

  console.log(gameObjectMap);
  console.log(globalState);
}
