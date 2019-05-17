export class Level {
  constructor(
    public readonly id: string,
    public readonly speed: number,
    public readonly minPoints: number,
    public readonly maxPoints: number,
    private readonly _colors: number[]
  ) {
    if (speed <= 0) throw new RangeError('speed mast be greater than 0');
    if (maxPoints < minPoints) throw new RangeError('maxPoints mast be greater than minPoints');
  }

  containPoints(value:number):Boolean {
    return value >= this.minPoints && value < this.maxPoints;
  }

  getRandomColor(): number {
    return this._colors[Math.floor(Math.random() * this._colors.length)];
  }
}
