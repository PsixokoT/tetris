import deepmerge from 'deepmerge';
import { ConfigData } from '../typings';
import { Level } from '../data/Level';
import { ShapeData } from '../data/ShapeData';

export class Config {
  static async init(data: Partial<ConfigData> = {}): Promise<Config> {
    const defaultData: ConfigData = await import('./default.json');
    const overwriteMerge = (destinationArray: any[], sourceArray: any[]) => sourceArray;
    const merge: ConfigData = deepmerge(defaultData, data, { arrayMerge: overwriteMerge });
    return new Config(merge);
  }

  public readonly width: number;
  public readonly height: number;
  private readonly _score: number[];
  private readonly _shapes: ShapeData[];
  private readonly _levels: Level[];

  constructor(data: ConfigData) {
    // https://gaming.stackexchange.com/questions/13057/tetris-difficulty
    // http://harddrop.com/wiki/Tetris_(NES,_Nintendo)
    if (data.width <= 0 || data.height <= 0) throw new RangeError('incorrect size');
    if (!data.shapes.length) throw new Error('shapes can\'t be empty');
    if (!data.levels.length) throw new Error('levels can\'t be empty');
    if (!data.score.length) throw new Error('score can\'t be empty');

    this.width = Math.round(data.width);
    this.height = Math.round(data.height);
    this._score = data.score;

    this._shapes = data.shapes.map(frames => new ShapeData(frames));

    let minScore: number = 0;
    this._levels = data.levels.map(({ speed, score, colors }, index) => {
      const level = new Level(index.toString(), speed, minScore, score, colors);
      minScore = score;
      return level;
    });
  }

  getScore(linesCount: number): number {
    if (linesCount > 0 && linesCount <= this._score.length) {
      return this._score[linesCount - 1];
    }
    return 0;
  }

  getRandomShapeData(): ShapeData {
    return this._shapes[Math.floor(Math.random() * this._shapes.length)];
  }

  getLevelByScore(value: number): Level {
    let level: Level = this._levels[0]; // TODO: remove this hack `Variable 'level' is used before being assigned.`
    for (let i: number = 0; i < this._levels.length; i++) {
      level = this._levels[i];
      if (level.containScore(value)) break;
    }
    return level;
  }
}
