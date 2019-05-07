import * as Hero from './Hero';
import * as Hitpoints from './Hitpoints';

export const children = [Hero, [Hitpoints, { y: 0, hitpointsValue: 50 }]];

export const render = state => (graphics) => {};
