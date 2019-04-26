import hero from "./hero_front.png";

import { Assets } from "./icescraper";

import * as Rect from "./Rect";

export const initialState = {
  x: 20,
  y: 20,
  hitpoints: {
    max: 100,
    value: 50
  }
};

export const children = [Rect];

export const preload = () => ({
  hero
});

export const render = state => graphics => {
  const heroAsset = Assets.resolve("hero");

  graphics.drawImage(state)(heroAsset);

  graphics.drawRect({
    x: state.x,
    y: state.y - 20,
    w: heroAsset.width,
    h: 5
  })({ color: "red" });

  graphics.drawRect({
    x: state.x,
    y: state.y - 20,
    w: (state.hitpoints.value / state.hitpoints.max) * heroAsset.width,
    h: 5
  })({ color: "green" });
};

export const update = state => action => {};
