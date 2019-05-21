import { ShapeDataFrames } from '../../src/game/typings';
import { ShapeData } from '../../src/game/data/ShapeData';

describe('ShapeData', () => {
  describe('set frames', () => {
    it('with one frame', () => {
      const frames:ShapeDataFrames = [
        [
          [1, 0, 0],
          [1, 1, 1],
          [0, 0, 1]
        ]
      ];
      const shape = new ShapeData(frames);
      expect(shape.framesCount).toEqual(1);
      expect(shape.frames).toEqual([
        [
          { x: 0, y: 0 },
          { x: 0, y: 1 },
          { x: 1, y: 1 },
          { x: 2, y: 1 },
          { x: 2, y: 2 }
        ]
      ]);
    });

    it('with two frames', () => {
      const frames:ShapeDataFrames = [
        [
          [1, 0, 0],
          [1, 1, 1],
          [0, 0, 1]
        ],
        [
          [0, 0],
          [0, 0]
        ]
      ];
      const shape = new ShapeData(frames);
      expect(shape.framesCount).toEqual(2);
      expect(shape.frames[1]).toEqual([]);
    });
  });
});
