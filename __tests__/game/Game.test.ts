import { Game, IGame } from '../../src/game/Game';
import { Config } from '../../src/game/config/Config';
import { ConfigData, ShapeDataMap } from '../../src/game/typings';
import { ShapeData } from '../../src/game/data/ShapeData';
import { Shape } from '../../src/game/data/Shape';
import { Field } from '../../src/game/data/Field';

const testConfig: ConfigData = {
  width: 5,
  height: 10,
  score: [1, 2, 3, 4],
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

const createGame = (configData:Partial<ConfigData> = {}, shapeData?: ShapeDataMap) => {
  const config = new Config({ ...testConfig, ...configData });
  if (shapeData) {
    config.getRandomShapeData = () => {
      return new ShapeData([shapeData]);
    };
  }
  const game = new Game(config);
  return game;
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
      const game = createGame({}, [
        [1]
      ]);
      game.start();
      expect(game.level.id).toEqual('0');
      expect(game.lines).toEqual(0);
      expect(game.score).toEqual(0);
    });

    it('should add shape into field', () => {
      const game = createGame({}, [
        [1]
      ]);
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
      const mockStep = jest.fn();
      (Game.prototype as any).step = mockStep;
      game.update(400);
      expect(mockStep).toBeCalledTimes(1);
      mockStep.mockRestore();
    });

    it('should call step every game frame', () => {
      const mockStep = jest.fn().mockReturnValue(true);
      (Game.prototype as any).step = mockStep;
      game.update(1320);
      expect(mockStep).toBeCalledTimes(3);
      expect(game.time).toEqual(120);
      mockStep.mockRestore();
    });
  });

  describe('step()', () => {
    let game:IGame;
    beforeEach(() => {
      game = createGame({
        width: 5,
        height: 5,
        levels: [
          {
            colors: [],
            speed: 400,
            score: 0
          }
        ]
      }, [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1]
      ]);
      game.start();
      game.update(400);
    });

    it('should prepare game in beforeEach', () => {
      expect(game.field.toString()).toEqual('' +
        '0 0 0 0 0' + '\n' +
        '0 0 0 0 0' + '\n' +
        '0 0 0 0 0' + '\n' +
        '1 1 0 1 1' + '\n' +
        '1 1 0 1 1'
      );
    });
  });
});
