export class Level {
  constructor(
    public readonly id: string,
    public readonly speed: number,
    public readonly minScore: number,
    public readonly maxScore: number,
    private readonly _colors: number[]
  ) {
    if (speed <= 0) throw new RangeError('speed mast be greater than 0');
    if (maxScore < minScore) throw new RangeError('maxScore mast be greater than minScore');
  }

  containScore(value:number):Boolean {
    return value >= this.minScore && value < this.maxScore;
  }

  getRandomColor(): number {
    return this._colors[Math.floor(Math.random() * this._colors.length)];
  }
}
