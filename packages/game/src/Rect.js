export const initialState = {
  x: 100,
  y: 100,
  width: 100,
  height: 100,
  angle: 30,
};

export const render = state => graphics => {
  graphics.drawRect(state)({ color: 'yellow' });
};

export const update = state => (action = {}, dt) => {
  console.log('update');

  return { angle: state.angle + 20 * dt };
};
