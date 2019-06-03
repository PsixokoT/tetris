import { Game } from './game/Game';

document.addEventListener('DOMContentLoaded', async () => {
  const game = await Game.init();
  console.log('hello');
});
