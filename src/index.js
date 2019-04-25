import icescraper, { Assets } from "./icescraper";

import * as Hero from "./Hero";

Assets.queue(Hero.preload())
  .then(res => {
    icescraper(800, 600, [Hero]);
  })
  .catch(err => console.error(err));
