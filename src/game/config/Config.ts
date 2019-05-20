import deepmerge from 'deepmerge';
import { ConfigData, ShapeData, ShapeDataFrames } from '../typings';
import { Level } from '../data/Level';
import { Shape } from '../data/Shape';

export class Config {
  static async init(data: Partial<ConfigData> = {}): Promise<Config> {
    const defaultData: ConfigData = await import('./default.json');
    const overwriteMerge = (destinationArray: any[], sourceArray: any[]) => sourceArray;
    const merge: ConfigData = deepmerge(defaultData, data, { arrayMerge: overwriteMerge });
    return new Config(merge);
  }

  public readonly width: number;
  public readonly height: number;
  private readonly _points: number[];
  private readonly _shapes: ShapeDataFrames[];
  private readonly _levels: Level[];

  constructor(data: ConfigData) {
    if (data.width <= 0 || data.height <= 0) throw new RangeError('incorrect size');
    if (!data.shapes.length) throw new Error('shapes can\'t be empty');
    if (!data.levels.length) throw new Error('levels can\'t be empty');
    if (!data.points.length) throw new Error('points can\'t be empty');

    this.width = Math.round(data.width);
    this.height = Math.round(data.height);
    this._points = data.points;
    this._shapes = data.shapes;

    let minPoints: number = 0;
    this._levels = data.levels.map(({ speed, points, colors }, index) => {
      const level = new Level(index.toString(), speed, minPoints, points, colors);
      minPoints = points;
      return level;
    });
  }

  getPoints(linesCount: number): number {
    return this._points[linesCount - 1];
  }

  getRandomShape(color:number): Shape {
    const shapeDataFrames: ShapeDataFrames = this._shapes[Math.floor(Math.random() * this._shapes.length)];
    return new Shape(color, shapeDataFrames);
  }

  getLevelByPoints(value: number): Level {
    let level: Level = this._levels[0]; // TODO: remove this hack `Variable 'level' is used before being assigned.`
    for (let i: number = 0; i < this._levels.length; i++) {
      level = this._levels[i];
      if (level.containPoints(value)) break;
    }
    return level;
  }
}
