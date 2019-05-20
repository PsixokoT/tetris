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
    it('fill block element in to color', () => {
      const frames:ShapeDataFrames = [
        [
          [1, 0, 0],
          [1, 1, 1],
          [0, 0, 1]
        ]
      ];
      const shape = new Shape(0, frames);
      expect(shape.data).toEqual([
        [0, undefined, undefined],
        [0,0,0],
        [undefined, undefined, 0]
      ]);
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
