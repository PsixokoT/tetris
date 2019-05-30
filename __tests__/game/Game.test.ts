import { Game } from '../../src/game/Game';
import { Config } from '../../src/game/config/Config';
import { ConfigData, ShapeDataMap } from '../../src/game/typings';
import { ShapeData } from '../../src/game/data/ShapeData';
import { Shape } from '../../src/game/data/Shape';

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
      speed: 400,
      colors: [1, 2]
    },
    {
      score: 2000,
      speed: 1.2,
      colors: [3, 4]
    },
    {
      score: 3000,
      speed: 3,
      colors: [5, 6]
    }
  ]
};

const createGame = (configData:Partial<ConfigData>, shapeData: ShapeDataMap) => {
  const config = new Config({ ...testConfig, ...configData });
  config.getRandomShapeData = () => {
    return new ShapeData([shapeData]);
  };
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
      game.start();
      expect(game.field.shape).toBeInstanceOf(Shape);
    });
  });
});
