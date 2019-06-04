import { Game, IGame } from '../../src/game/Game';
import { Config } from '../../src/game/config/Config';
import { ConfigData, ShapeDataMap } from '../../src/game/typings';
import { ShapeData } from '../../src/game/data/ShapeData';
import { IShape, Shape } from '../../src/game/data/Shape';
import { Field } from '../../src/game/data/Field';

const testConfig: ConfigData = {
  width: 5,
  height: 10,
  score: [100, 200, 300, 400],
  shapes: [
    [
      [
        [1, 1, 0],
        [0, 1, 1]
      ],
      [
        [0, 1],
        [1, 1],
        [1, 0]
      ]
    ],
    [
      [
        [0, 1, 1],
        [1, 1, 0]
      ],
      [
        [1, 0],
        [1, 1],
        [0, 1]
      ]
    ],
    [
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0]
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0]
      ]
    ],
    [
      [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
      ],
      [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0]
      ]
    ],
    [
      [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0]
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1]
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0]
      ],
      [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
      ]
    ],
    [
      [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1]
      ]
    ],
    [
      [
        [1, 1],
        [1, 1]
      ]
    ]
  ],
  levels: [
    {
      score: 1000,
      speed: 1000,
      colors: [1, 2]
    },
    {
      score: 2000,
      speed: 800,
      colors: [3, 4]
    },
    {
      score: 3000,
      speed: 600,
      colors: [5, 6]
    }
  ]
};

const createGame = (configData:Partial<ConfigData> = {}) => {
  const config = new Config({ ...testConfig, ...configData });
  return new Game(config);
};

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

  describe('start()', () => {
    it('should set default start values', () => {
      const game = createGame();
      game.start();
      expect(game.level.id).toEqual('0');
      expect(game.lines).toEqual(0);
      expect(game.score).toEqual(0);
    });

    it('should add shape into field', () => {
      const game = createGame();
      const spy = jest.spyOn(Field.prototype, 'addShape');
      game.start();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe('update()', () => {
    let game:IGame;
    beforeEach(() => {
      game = createGame({
        levels: [
          {
            colors: [],
            speed: 400,
            score: 0
          }
        ]
      });
    });

    it('should update time on delta', () => {
      game.update(120);
      expect(game.time).toEqual(120);
    });

    it('should call step if time more the level speed', () => {
      const spy = jest.spyOn(game as any, 'step');
      game.update(400);
      expect(spy).toBeCalledTimes(1);
    });

    it('should call step every game frame', () => {
      const spy = jest.spyOn(game as any, 'step');
      spy.mockReturnValue(true);
      game.update(1320);
      expect(spy).toBeCalledTimes(3);
      expect(game.time).toEqual(120);
    });
  });

  describe('step()', () => {
    let game:Game;
    beforeEach(() => {
      game = createGame({
        width: 5,
        height: 5,
        levels: [
          {
            colors: [0],
            speed: 400,
            score: 0
          }
        ]
      });
      const spy = jest.spyOn(game.config, 'getRandomShapeData');
      spy.mockReturnValueOnce(new ShapeData([
        [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [1, 1, 0, 1, 1],
          [1, 1, 0, 1, 1]
        ]
      ])).mockReturnValueOnce(new ShapeData([
        [
          [1],
          [1]
        ]
      ])).mockReturnValueOnce(new ShapeData([
        [
          [1, 1],
          [1, 1]
        ]
      ]));
      game.start();
      game.update(400);
      spy.mockRestore();
    });

    it('should prepare game in beforeEach', () => {
      expect(game.field.toString()).toEqual('' +
        '0 0 1 0 0' + '\n' +
        '0 0 1 0 0' + '\n' +
        '0 0 0 0 0' + '\n' +
        '1 1 0 1 1' + '\n' +
        '1 1 0 1 1'
      );
    });

    it('should have positive scenario', () => {
      expect(game.update(1700)).toBeTruthy();
      expect(game.lines).toEqual(2);
      expect(game.score).toEqual(200);
      expect(game.field.toString()).toEqual('' +
        '0 0 1 1 0' + '\n' +
        '0 0 1 1 0' + '\n' +
        '0 0 0 0 0' + '\n' +
        '0 0 0 0 0' + '\n' +
        '0 0 0 0 0'
      );
    });
  });

  describe('Shape manipulations: move/rotate', () => {
    let game:IGame;
    let shape:IShape;
    beforeEach(() => {
      game = createGame();
      game.start();
      shape = game.field.shape!;
    });

    it('should moveLeft', () => {
      const shapeX = shape.x;
      game.moveLeft();
      expect(shape.x).toEqual(shapeX - 1);
    });

    it('should moveRight', () => {
      const shapeX = shape.x;
      game.moveRight();
      expect(shape.x).toEqual(shapeX + 1);
    });

    it('should moveDown', () => {
      const shapeY = shape.y;
      game.moveDown();
      expect(shape.y).toEqual(shapeY + 1);
    });

    it('should rotate', () => {
      const frame = shape.currentFrame;
      game.rotate();
      expect(shape.currentFrame).not.toEqual(frame);
    });
  });
});
