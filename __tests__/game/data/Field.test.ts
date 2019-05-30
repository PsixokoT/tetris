import { Field } from '../../../src/game/data/Field';
import { Shape } from '../../../src/game/data/Shape';
import { ShapeData } from '../../../src/game/data/ShapeData';
import { ShapeDataMap } from '../../../src/game/typings';

const createFieldWithShape = (width: number, height: number, shapeData: ShapeDataMap) => {
  const field = new Field(width, height);
  const shape = new Shape(0, new ShapeData([shapeData]));
  field.addShape(shape);
  return {
    field,
    shape
  };
};

describe('Field', () => {
  describe('validations', () => {
    it('size', () => {
      expect(() => {
        const _ = new Field(0, -2);
      }).toThrow('invalid size');
    });
  });

  describe('dispose()', () => {
    it('should clear map', () => {
      const { field } = createFieldWithShape(1, 1, [
        [1]
      ]);
      field.dispose();
      expect(field.toString()).toEqual('0');
    });
  });

  describe('toString()', () => {
    it('scenario #1', () => {
      const field = new Field(5, 4);
      expect(field.toString()).toEqual('' +
        '0 0 0 0 0' + '\n' +
        '0 0 0 0 0' + '\n' +
        '0 0 0 0 0' + '\n' +
        '0 0 0 0 0'
      );
      const shape = new Shape(0, new ShapeData(
        [
          [
            [0, 1, 0],
            [1, 1, 1]
          ]
        ]
      ));
      field.addShape(shape);
      expect(field.toString()).toEqual('' +
        '0 0 1 0 0' + '\n' +
        '0 1 1 1 0' + '\n' +
        '0 0 0 0 0' + '\n' +
        '0 0 0 0 0'
      );
    });
  });

  describe('addShape()', () => {
    it('new field does not have shape', () => {
      const field = new Field(1, 1);
      expect(field.shape).toBeUndefined();
    });

    it('add shape at center top', () => {
      const { field, shape } = createFieldWithShape(3, 2, [
        [1]
      ]);
      expect(field.shape).toEqual(shape);
      expect(field.shape!.x).toEqual(1);
      expect(field.shape!.y).toEqual(0);
    });

    it('does not add shape if field has one', () => {
      const { field, shape: shape1 } = createFieldWithShape(3, 2, [
        [1]
      ]);
      const shape2 = new Shape(0, new ShapeData([[[1]]]));
      expect(field.addShape(shape2)).toBeFalsy();
      expect(field.shape).toBe(shape1);
    });

    it('does not add shape if place is busy', () => {
      const { field } = createFieldWithShape(3, 1, [
        [0, 1, 0]
      ]);
      field.step();
      const shape = new Shape(0, new ShapeData([[[1]]]));
      expect(field.addShape(shape)).toBeFalsy();
    });

    it('does not add shape if that has invalid size', () => {
      const field = new Field(1, 1);
      const shape = new Shape(0, new ShapeData([[[1, 1]]]));
      expect(field.addShape(shape)).toBeFalsy();
    });
  });

  describe('move()', () => {
    it('return false if shape missing', () => {
      const field = new Field(1, 1);
      expect(field.move(0, 0)).toBeFalsy();
    });

    it('move shape to left', () => {
      const { field, shape } = createFieldWithShape(3, 3, [
        [1]
      ]);
      expect(field.move(-1, 0)).toBeTruthy();
      expect(shape.x).toEqual(0);
      expect(field.move(-1, 0)).toBeFalsy();
      expect(shape.x).toEqual(0);
      expect(shape.y).toEqual(0);
    });

    it('move shape to right', () => {
      const { field, shape } = createFieldWithShape(3, 3, [
        [1]
      ]);
      expect(field.move(1, 0)).toBeTruthy();
      expect(shape.x).toEqual(2);
      expect(field.move(1, 0)).toBeFalsy();
      expect(shape.x).toEqual(2);
      expect(shape.y).toEqual(0);
    });

    it('move shape to down', () => {
      const { field, shape } = createFieldWithShape(3, 3, [
        [1]
      ]);
      expect(field.move(0, 1)).toBeTruthy();
      expect(shape.y).toEqual(1);
      expect(field.move(0, 1)).toBeTruthy();
      expect(shape.y).toEqual(2);
      expect(field.move(0, 1)).toBeFalsy();
      expect(shape.y).toEqual(2);
    });

    it('dont move to up', () => {
      const { field, shape } = createFieldWithShape(3, 3, [
        [1]
      ]);
      field.move(0, 1);
      expect(field.move(0, -1)).toBeFalsy();
      expect(shape.y).toEqual(1);
    });

    it('dont move to non empty points', () => {
      const { field } = createFieldWithShape(3, 3, [
        [1, 0, 1],
        [1, 0, 1],
        [0, 1, 0]
      ]);
      field.step();
      const shape = new Shape(0, new ShapeData([[[1]]]));
      field.addShape(shape);
      expect(field.move(-1, 1)).toBeFalsy();
      expect(field.move(1, 1)).toBeFalsy();
      expect(field.move(0, 1)).toBeTruthy();
      expect(field.move(0, 1)).toBeFalsy();
      expect(field.toString()).toEqual('' +
        '1 0 1' + '\n' +
        '1 1 1' + '\n' +
        '0 1 0'
      );
    });
  });

  describe('rotate', () => {
    it('should rotate shape if can', () => {
      const field = new Field(5, 3);
      const shape = new Shape(0, new ShapeData([
        [
          [1, 0],
          [1, 1]
        ],
        [
          [1, 1],
          [1, 0]
        ]
      ]));
      field.addShape(shape);
      field.rotate();
      expect(field.toString()).toEqual('' +
        '0 0 1 1 0' + '\n' +
        '0 0 1 0 0' + '\n' +
        '0 0 0 0 0'
      );
    });

    it('should not rotate shape if can not', () => {
      const { field } = createFieldWithShape(3, 3, [
        [0, 0, 0],
        [1, 0, 1],
        [1, 0, 1]
      ]);
      field.step();

      const shape = new Shape(0, new ShapeData([
        [
          [1, 1, 1]
        ],
        [
          [1, 0, 0],
          [1, 0, 0],
          [1, 0, 0]
        ]
      ]));
      field.addShape(shape);
      field.rotate();
      expect(field.toString()).toEqual('' +
        '1 1 1' + '\n' +
        '1 0 1' + '\n' +
        '1 0 1'
      );
    });
  });

  describe('step()', () => {
    it('return lines count', () => {
      const { field } = createFieldWithShape(3, 3, [
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1]
      ]);
      expect(field.step()).toEqual(1);
      expect(field.toString()).toEqual('' +
        '0 0 0' + '\n' +
        '1 0 1' + '\n' +
        '1 0 1'
      );
    });

    it('should move shape down', () => {
      const { field, shape } = createFieldWithShape(3, 3, [
        [1]
      ]);
      field.step();
      expect(shape.y).toEqual(1);
    });

    it('should return -1 if round not complete', () => {
      const { field, shape } = createFieldWithShape(3, 3, [
        [1]
      ]);
      expect(field.step()).toEqual(-1);
      expect(field.shape).toBe(shape);
    });

    it('should clear shape if round complete', () => {
      const { field } = createFieldWithShape(3, 3, [
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1]
      ]);
      field.step();
      const shape = new Shape(0, new ShapeData(
        [
          [
            [1],
            [1],
            [1]
          ]
        ]
      ));
      field.addShape(shape);
      expect(field.step()).toEqual(3);
      expect(field.shape).toBeUndefined();
    });

    it('should correct clear lines', () => {
      const { field } = createFieldWithShape(5, 5, [
        [1, 1, 0, 1, 1],
        [1, 0, 0, 1, 1],
        [1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1],
        [1, 1, 0, 1, 0]
      ]);
      field.step();
      const shape = new Shape(0, new ShapeData(
        [
          [
            [1],
            [1],
            [1],
            [1]
          ]
        ]
      ));
      field.addShape(shape);
      expect(field.step()).toEqual(-1);
      expect(field.step()).toEqual(2);
      expect(field.toString()).toEqual('' +
        '0 0 0 0 0' + '\n' +
        '0 0 0 0 0' + '\n' +
        '1 1 0 1 1' + '\n' +
        '1 0 1 1 1' + '\n' +
        '1 1 1 1 0'
      );
    });
  });
});
