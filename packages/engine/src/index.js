import * as CanvasProvider from './CanvasProvider';
import * as Loop from './Loop';
import * as ActionConstants from './ActionConstants';
import * as Assets from './Assets';
import {
  populateGlobalStateByBranch,
  renderGameObjects,
  updateGameObjects,
  preloadGameObjects,
  debugLogState,
} from './State';
import * as Dispatcher from './Dispatcher';

import Key from './Key';

export * from './utils';

export { Assets, ActionConstants, Key };

export default function (width, height, gameObjects) {
  CanvasProvider.createContext(width, height);

  populateGlobalStateByBranch('root', gameObjects);
  debugLogState();

  CanvasProvider.getCanvasElement().addEventListener(
    'mousedown',
    ({ clientX, clientY }) => {
      Dispatcher.dispatchGlobal({
        type: ActionConstants.MOUSE_DOWN,
        x: clientX,
        y: clientY,
      });
    }
  );

  CanvasProvider.getCanvasElement().addEventListener(
    'mouseup',
    ({ clientX, clientY }) => {
      Dispatcher.dispatchGlobal({
        type: ActionConstants.MOUSE_UP,
        x: clientX,
        y: clientY,
      });
    }
  );

  document.addEventListener('keydown', ({ keyCode }) => {
    Dispatcher.dispatchGlobal({ type: ActionConstants.KEY_DOWN, keyCode });
  });

  document.addEventListener('keyup', ({ keyCode }) => {
    Dispatcher.dispatchGlobal({ type: ActionConstants.KEY_UP, keyCode });
  });

  Loop.on('loop', dt => {
    CanvasProvider.clearRect({
      x: 0,
      y: 0,
      w: width,
      h: height,
    })();
    CanvasProvider.drawRect({
      x: 0,
      y: 0,
      w: width,
      h: height,
    })({
      color: '#fff',
    });

    renderGameObjects('root');
    updateGameObjects('root', dt, Dispatcher);

    Dispatcher.clear();
  });

  preloadGameObjects().then(() => Loop.run());
}
