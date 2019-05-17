import { Shape } from '../../src/game/data/Shape';

describe('Shape', () => {
  it('toString', () => {
    const shape = new Shape(0, [[0, 1, 1], [0, 1, 0], [1, 1, 0]]);
    const expected = '0 1 1\n0 1 0\n1 1 0';
    expect(shape.toString()).toEqual(expected);
  });
});
