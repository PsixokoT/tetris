import { Game } from './game/Game';

document.addEventListener('DOMContentLoaded', async () => {
  const game = await Game.init();
  console.log('hello');

  game.start();
  let time = performance.now();
  const gameLoop = (time: number) => {
    game.update(time);
    const field = game.field.toString().replace(/0/g, ' ').replace(/1/g, 'X');
    document.getElementById('field')!.textContent = field;
  };

  document.addEventListener('keydown', ({ code }) => {
    switch (code) {
      case 'ArrowLeft':
        game.moveLeft();
        break;
      case 'ArrowRight':
        game.moveRight();
        break;
      case 'ArrowDown':
        game.moveDown();
        break;
      case 'ArrowUp':
        game.rotate();
        break;
    }
  });

  window.requestAnimationFrame(function tick() {
    const t = performance.now();
    gameLoop(t - time);
    time = t;
    window.requestAnimationFrame(tick);
  });
});
