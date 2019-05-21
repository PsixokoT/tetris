import { Game } from '../../src/game/Game';

describe('Game', () => {
  describe('static create', () => {
    it('with default options', async () => {
      const game = await Game.init();
      expect(game.config.width).toEqual(10);
    });

    it('with my options', async () => {
      const game = await Game.init({ width: 5 });
      expect(game.config.width).toEqual(5);
    });
  });
});
