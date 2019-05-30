import { Game } from './game/Game';

document.addEventListener('DOMContentLoaded', async () => {
  const game = await Game.init();
  const p = document.createElement('p');
  document.body.appendChild(p);
  p.innerHTML = game.field.toString();
  console.log('hello');
});
