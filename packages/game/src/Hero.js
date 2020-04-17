import { Assets, Key } from 'engine';
import hero from './hero_front.png';

import * as Hitpoints from './Hitpoints';
import * as Rect from './Rect';

export const initialState = {
  x: 20,
  y: 20,
};

export const children = [Hitpoints, Rect];

export const preload = () => ({
  hero,
});

export const render = state => graphics => {
  graphics.drawTexture(state)('hero');
};

export const update = (state, dispatch) => (action = {}, dt) => {
  switch (action.type) {
    case 'KEY_DOWN': {
      dispatch.toChildren({ type: 'DECREASE_HITPOINTS' });

      if (action.keyCode === Key.right) {
        return { x: state.x + 10 * dt };
      }

      if (action.keyCode === Key.left) {
        return { x: state.x - 10 * dt };
      }

      if (action.keyCode === Key.up) {
        return { y: state.y - 10 * dt };
      }

      if (action.keyCode === Key.down) {
        return { y: state.y + 10 * dt };
      }

      return {};
    }

    default:
      return {};
  }
};
