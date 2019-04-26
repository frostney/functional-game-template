export const initialState = {
  x: 100,
  y: 100,
  w: 100,
  h: 100,
};

export const render = state => (graphics) => {
  graphics.drawRect(state)({ color: 'yellow' });
};
