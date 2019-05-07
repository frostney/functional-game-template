import * as MainMenu from './MainMenu';
import * as Game from './Game';

export const initialState = {
  activeScene: 'MainMenu',
};

export const children = [MainMenu, Game];
