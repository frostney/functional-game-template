import { requestAnimationFrame, performance } from 'animframe';
import EventMap from 'eventmap';

const loopEvents = new EventMap();
let pausedEvents = {};
const timers = [];

const Loop = (function () {
  let isRunning = true;

  /**
   * @method run
   */
  const run = function () {
    let time;

    (function loop() {
      /* eslint no-plusplus: 0 */
      /* eslint no-loop-func: 0 */

      requestAnimationFrame.call(window, loop);

      const now = performance.now();
      const dt = now - (time || now);

      time = now;

      if (!isRunning) {
        return;
      }

      timers.forEach((timer) => {
        timer.tick(now);
      });

      const eventKeys = Object.keys(loopEvents.events.listeners);

      for (let i = 0, j = eventKeys.length; i < j; i++) {
        (function (key) {
          if (!pausedEvents[key]) {
            loopEvents.trigger(key, dt);
          }
        }(eventKeys[i]));
      }
    }());
  };

  /**
   * @method stop
   */
  const stop = function () {
    isRunning = false;
  };

  const clear = function () {
    loopEvents.clear();
    pausedEvents = {};
  };

  const on = function (taskName, taskFunction) {
    loopEvents.on(taskName, taskFunction);
    pausedEvents[taskName] = false;
  };

  const off = function (taskName) {
    loopEvents.off(taskName);
    if (pausedEvents[taskName] != null) {
      delete pausedEvents[taskName];
    }
  };

  const pause = function (taskName) {
    pausedEvents[taskName] = true;
  };

  const resume = function (taskName) {
    if (taskName == null) {
      isRunning = true;
      return;
    }

    pausedEvents[taskName] = false;
  };

  return {
    run,

    stop,
    clear,

    on,
    off,

    pause,
    resume,
  };
}());

export default Loop;
