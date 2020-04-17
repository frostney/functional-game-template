export const localToGlobal = () => {};
export const globalToLocal = () => {};
export const isPointInRect = point => rect =>
  point.x >= rect.x &&
  point.y >= rect.y &&
  point.x < rect.x + rect.w &&
  point.y < rect.y + rect.h;

const validProps = [
  'preload',
  'children',
  'name',
  'render',
  'update',
  'initialState',
];

export const moduleToGameObject = mod =>
  validProps.reduce(
    (acc, currentValue) => ({ ...acc, [currentValue]: mod[currentValue] }),
    {}
  );
