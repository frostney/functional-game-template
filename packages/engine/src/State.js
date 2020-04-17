import shortid from 'shortid';
import shallowEqual from 'shallowequal';

import * as CanvasProvider from './CanvasProvider';
import * as Assets from './Assets';
import { combineActions } from './Dispatcher';

const globalStateMap = {};
const globalState = {};
const allGameObjects = {};

const defaultGameObjectState = {
  x: 0,
  y: 0,
  z: 0,
  pivotX: 0.5,
  pivotY: 0.5,
  angle: 0,
  visible: true,
};

const hasChildren = gameObject =>
  gameObject.children &&
  Array.isArray(gameObject.children) &&
  gameObject.children.length > 0;

export const getChildrenFor = id => globalStateMap[id];

export const populateGlobalStateByBranch = (branchName, gameObjects) => {
  globalStateMap[branchName] = gameObjects.map(() => shortid.generate());

  gameObjects.forEach((child, index) => {
    const id = globalStateMap[branchName][index];

    let initialState = {};
    let gameObject = null;

    if (Array.isArray(child)) {
      const [template, options] = child;
      initialState = { ...template.initialState, ...options };
      gameObject = template;
    } else {
      initialState = { ...child.initialState };
      gameObject = child;
    }

    globalState[id] = {
      ...defaultGameObjectState,
      ...initialState,
    };

    allGameObjects[id] = gameObject;

    if (hasChildren(gameObject)) {
      populateGlobalStateByBranch(
        globalStateMap[branchName][index],
        gameObject.children
      );
    }
  });
};

export const debugLogState = () => {
  console.log(globalStateMap);
  console.log(globalState);
  console.log(allGameObjects);
};

export const preloadGameObjects = () =>
  Promise.all(
    Object.keys(allGameObjects)
      .map(name => allGameObjects[name])
      .map(({ preload }) => preload)
      .filter(Boolean)
      .map(preload => Assets.queue(preload()))
  );

export const renderGameObjects = (branch, offset = { x: 0, y: 0 }) => {
  globalStateMap[branch].forEach(id => {
    const gameObject = allGameObjects[id];
    const state = globalState[id];

    if (state.visible) {
      if (gameObject.render) {
        gameObject.render({
          ...state,
          x: state.x + offset.x,
          y: state.y + offset.y,
        })(CanvasProvider);
      }

      if (hasChildren(gameObject)) {
        renderGameObjects(id, { x: state.x, y: state.y });
      }
    }
  });
};

export const updateGameObjects = (branch, dt, Dispatcher) => {
  globalStateMap[branch].forEach(id => {
    const gameObject = allGameObjects[id];
    const state = globalState[id];

    if (gameObject.update) {
      const dispatch = (...args) => Dispatcher.globalDispatch(...args);
      dispatch.toChildren = action =>
        getChildrenFor(id).forEach(child =>
          Dispatcher.toGameObject(child)(action)
        );

      const updatedGameObject = gameObject.update(state, dispatch);

      const updatedState = combineActions(['root', id]).reduce(
        (accumulator, currentValue) => ({
          ...accumulator,
          ...updatedGameObject(currentValue, dt / 100),
        }),
        state
      );

      if (!shallowEqual(state, updatedState)) {
        globalState[id] = updatedState;
      }
    }

    if (hasChildren(gameObject)) {
      updateGameObjects(id, dt, Dispatcher);
    }
  });
};
