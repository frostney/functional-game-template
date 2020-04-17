import { Assets } from 'engine';

export const initialState = {
  x: 0,
  y: -10,
  hitpointsMax: 100,
  hitpointsValue: 80,
};

export const render = state => graphics => {
  const heroAsset = Assets.resolve('hero');

  graphics.drawRect({
    x: state.x,
    y: state.y,
    width: heroAsset.width,
    height: 5,
    pivotX: 0.5,
    pivotY: 0.5,
  })({ color: 'red' });

  graphics.drawRect({
    x: state.x,
    y: state.y,
    width: (state.hitpointsValue / state.hitpointsMax) * heroAsset.width,
    height: 5,
    pivotX: 0.5,
    pivotY: 0.5,
  })({ color: 'green' });
};

export const update = state => (action = {}, dt) => {
  switch (action.type) {
    case 'INCREASE_HITPOINTS': {
      return { hitpointsValue: state.hitpointsValue + 1 };
    }

    case 'DECREASE_HITPOINTS': {
      return { hitpointsValue: state.hitpointsValue - 1 };
    }

    default:
      return {};
  }
};
