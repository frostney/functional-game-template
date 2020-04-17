let queue = {};

export const dispatchGlobal = action => {
  (queue.root = queue.root || []).push(action);
};

export const toGameObject = id => action => {
  (queue[id] = queue[id] || []).push(action);
};

export const clear = () => {
  queue = {};
};

export const combineActions = ids =>
  ids
    .map(id => queue[id])
    .filter(Boolean)
    .reduce((acc, curr) => [...acc, ...curr], []);

export const getQueue = () => queue;
