import { Level } from '../../src/game/data/Level';

describe('Level', () => {
  describe('validations', () => {
    it('speed', () => {
      expect(() => {
        const _ = new Level('test', 0, 0, 1, [1]);
      }).toThrowError(new RangeError('speed mast be greater than 0'));
    });

    it('max & min points', () => {
      expect(() => {
        const _ = new Level('test', 1, 100, 0, [1]);
      }).toThrow(new RangeError('maxPoints mast be greater than minPoints'));
    });
  });

  it('containPoints', () => {
    const level = new Level('0', 1, 1000, 2000, [1]);
    expect(level.containPoints(500)).toBeFalsy();
    expect(level.containPoints(1000)).toBeTruthy();
    expect(level.containPoints(1500)).toBeTruthy();
    expect(level.containPoints(2000)).toBeFalsy();
    expect(level.containPoints(2500)).toBeFalsy();
  });

  it('getRandomColor', () => {
    const level = new Level('0', 1, 0, 1, [1, 2]);
    for (let i:number = 0; i < 10; i++) {
      expect([1, 2]).toContain(level.getRandomColor());
    }
  });
});
