import { Shape } from '../../src/game/data/Shape';
import { ShapeDataFrames } from '../../src/game/typings';

describe('Shape', () => {
  it('toString', () => {
    const frames:ShapeDataFrames = [
      [
        [0, 1, 1],
        [0, 1, 0],
        [1, 1, 0]
      ]
    ];
    const shape = new Shape(0, frames);
    const expected = '' +
      '0 1 1' + '\n' +
      '0 1 0' + '\n' +
      '1 1 0';
    expect(shape.toString()).toEqual(expected);
  });

  describe('data', () => {
    it('fill block element in to color and set into coords', () => {
      const frames:ShapeDataFrames = [
        [
          [1, 0, 0],
          [1, 1, 1],
          [0, 0, 1]
        ]
      ];
      const shape = new Shape(3, frames);
      expect(shape.data).toEqual([
        [3, 3, undefined],
        [undefined, 3, undefined],
        [undefined, 3, 3]
      ]);
    });
  });

  describe('Iterator', () => {
    it('in for..of and other loops its take not empty points', () => {
      const frames:ShapeDataFrames = [
        [
          [0, 0, 0],
          [1, 1, 1],
          [0, 1, 0]
        ]
      ];
      const shape = new Shape(4, frames);
      expect([...shape]).toEqual([
        { x: 0, y: 1, color: 4 },
        { x: 1, y: 1, color: 4 },
        { x: 1, y: 2, color: 4 },
        { x: 2, y: 1, color: 4 }
      ]);
    });
  });

  describe('size', () => {
    it('return correct values', () => {
      const frames:ShapeDataFrames = [
        [
          [1],
          [1],
          [0]
        ]
      ];
      const shape = new Shape(0, frames);
      expect(shape.width).toEqual(1);
      expect(shape.height).toEqual(3);
    });
  });

  describe('rotate', () => {
    it('rotate shape of a 90 degree clockwise by default', () => {
      const frames:ShapeDataFrames = [
        [
          [0, 1, 1],
          [0, 1, 0],
          [1, 1, 0]
        ],
        [
          [1, 0, 0],
          [1, 1, 1],
          [0, 0, 1]
        ]
      ];
      const shape = new Shape(0, frames);
      expect(shape.toString()).toEqual('' +
        '0 1 1' + '\n' +
        '0 1 0' + '\n' +
        '1 1 0');
      shape.rotate();
      expect(shape.toString()).toEqual('' +
        '1 0 0' + '\n' +
        '1 1 1' + '\n' +
        '0 0 1');
      expect(shape.currentFrame).toEqual(1);
    });

    it('correct set currentFrame', () => {
      const shape = new Shape(0, [[], [], [], []]);
      expect(shape.currentFrame).toEqual(0);
      shape.rotate(10);
      expect(shape.currentFrame).toEqual(2);
      shape.rotate(-3);
      expect(shape.currentFrame).toEqual(3);
    });
  });
});
