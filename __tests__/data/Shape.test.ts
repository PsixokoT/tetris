import { Shape } from '../../src/game/data/Shape';
import { ShapeDataFrames } from '../../src/game/typings';
import { ShapeData } from '../../src/game/data/ShapeData';

const createShape = (frames: ShapeDataFrames, color: number = 0) => new Shape(color, new ShapeData(frames));

describe('Shape', () => {
  it('toString', () => {
    const frames: ShapeDataFrames = [
      [
        [0, 1, 1],
        [0, 1, 0],
        [1, 1, 0]
      ]
    ];
    const shape = createShape(frames);
    const expected = '' +
      '0 1 1' + '\n' +
      '0 1 0' + '\n' +
      '1 1 0';
    expect(shape.toString()).toEqual(expected);
  });

  describe('frame', () => {
    it('set correct frame from shapeData', () => {
      const frames: ShapeDataFrames = [
        [
          [0, 1, 1],
          [0, 1, 0],
          [0, 1, 0]
        ]
      ];
      const shape = createShape(frames);
      expect(shape.frame).toEqual(expect.arrayContaining([
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 2, y: 0 }
      ]));
    });
  });

  describe('Iterator', () => {
    it('in for..of and other loops its take his frame', () => {
      const frames: ShapeDataFrames = [
        [
          [0, 0, 0],
          [1, 1, 1],
          [0, 1, 0]
        ]
      ];
      const shape = createShape(frames);
      expect([...shape]).toEqual(expect.arrayContaining([
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 2, y: 1 }
      ]));
    });
  });

  describe('size', () => {
    it('return correct values', () => {
      const frames: ShapeDataFrames = [
        [
          [1],
          [1],
          [0]
        ]
      ];
      const shape = createShape(frames);
      expect(shape.width).toEqual(1);
      expect(shape.height).toEqual(3);
    });
  });

  describe('rotate', () => {
    it('rotate shape of a 90 degree clockwise by default', () => {
      const frames: ShapeDataFrames = [
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
      const shape = createShape(frames);
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
      const shape = createShape([[], [], [], []]);
      expect(shape.currentFrame).toEqual(0);
      shape.rotate(10);
      expect(shape.currentFrame).toEqual(2);
      shape.rotate(-3);
      expect(shape.currentFrame).toEqual(3);
    });
  });
});
