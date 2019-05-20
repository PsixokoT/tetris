import { Config } from '../../src/game/config/Config';
import { ConfigData } from '../../src/game/typings';
import { Level } from '../../src/game/data/Level';
import { Shape } from '../../src/game/data/Shape';

const testConfig: ConfigData = {
  width: 30,
  height: 60,
  points: [1, 2, 3, 4],
  shapes: [
    [
      [
        [1, 1],
        [0, 1]
      ],
      [
        [0, 1],
        [1, 1]
      ],
      [
        [1, 0],
        [1, 1]
      ],
      [
        [1, 1],
        [1, 0]
      ]
    ],
    [
      [
        [0, 1],
        [1, 0]
      ],
      [
        [1, 0],
        [0, 1]
      ]
    ]
  ],
  levels: [
    {
      points: 1000,
      speed: 1,
      colors: [1, 2]
    },
    {
      points: 2000,
      speed: 1.2,
      colors: [3, 4]
    },
    {
      points: 3000,
      speed: 3,
      colors: [5, 6]
    }
  ]
};

describe('Config', () => {
  describe('static init', () => {
    it('load default settings', async () => {
      const config = await Config.init();
      expect(config.width).toEqual(10);
      expect(config.height).toEqual(20);
      expect(config.getPoints(1)).toEqual(100);
    });

    it('merge default settings with my options', async () => {
      const config = await Config.init({
        width: 13,
        height: 6,
        points: [300]
      });
      expect(config.width).toEqual(13);
      expect(config.height).toEqual(6);
      expect(config.getPoints(1)).toEqual(300);
    });
  });

  describe('validations', () => {
    it('size', () => {
      expect(() => {
        const _ = new Config({ width: 0, height: 0, shapes: [], levels: [], points: [] });
      }).toThrowError(new RangeError('incorrect size'));
    });

    it('shapes', () => {
      expect(() => {
        const _ = new Config({ width: 1, height: 1, shapes: [], levels: [], points: [] });
      }).toThrowError(new Error("shapes can't be empty"));
    });

    it('levels', () => {
      expect(() => {
        const _ = new Config({ width: 1, height: 1, shapes: [[]], levels: [], points: [] });
      }).toThrowError(new Error("levels can't be empty"));
    });

    it('points', () => {
      expect(() => {
        const _ = new Config({ width: 1, height: 1, shapes: [[]], levels: [{ points: 0 , colors: [], speed: 0 }], points: [] });
      }).toThrowError(new Error("points can't be empty"));
    });
  });

  describe('getPoints()', () => {
    it('return points for lines clear from config', () => {
      const config = new Config(testConfig);
      expect(config.getPoints(1)).toEqual(1);
      expect(config.getPoints(2)).toEqual(2);
      expect(config.getPoints(3)).toEqual(3);
      expect(config.getPoints(4)).toEqual(4);
      expect(config.getPoints(5)).toEqual(undefined);
    });
  });

  describe('getLevelByPoints()', () => {
    const config = new Config(testConfig);

    it('return first level at 0 points', () => {
      const level = config.getLevelByPoints(0);
      expect(level).toBeInstanceOf(Level);
      expect(level).toMatchObject({
        id: '0',
        minPoints: 0,
        maxPoints: 1000
      });
    });

    it('return second level at 1500 points', () => {
      const level = config.getLevelByPoints(1500);
      expect(level).toBeInstanceOf(Level);
      expect(level).toMatchObject({
        id: '1',
        minPoints: 1000,
        maxPoints: 2000,
        speed: 1.2
      });
    });

    it('return last level if points count very big', () => {
      const level = config.getLevelByPoints(100500);
      expect(level).toBeInstanceOf(Level);
      expect(level).toMatchObject({
        id: '2',
        minPoints: 2000,
        maxPoints: 3000,
        speed: 3
      });
    });
  });

  describe('getRandomShape()', () => {
    it('return shape with correct color', () => {
      const config = new Config(testConfig);
      const level = config.getLevelByPoints(0);
      const shape = config.getRandomShape(level.getRandomColor());
      expect(shape).toBeInstanceOf(Shape);
      expect([1, 2]).toContain(shape.color);
    });
  });
});
