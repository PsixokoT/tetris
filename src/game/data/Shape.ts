import { Point, ShapeDataMap, ShapePoints } from '../typings';
import { ShapeData } from './ShapeData';

export class Shape {
  public x: number = 0;
  public y: number = 0;

  private _currentFrame: number = 0;
  public get currentFrame(): number {
    return this._currentFrame;
  }

  public get frame(): ShapePoints {
    return this._data.frames[this._currentFrame];
  }

  private get _shapeDataMap(): ShapeDataMap {
    return this._data.shapeDataFrames[this._currentFrame];
  }

  public get width() {
    return this._shapeDataMap[0].length;
  }

  public get height() {
    return this._shapeDataMap.length;
  }

  constructor(public readonly color: number, private readonly _data: ShapeData) {
  }

  rotate(count: number = 1) {
    const len = this._data.framesCount;
    const value = (this._currentFrame + count) % len;
    this._currentFrame = value < 0 ? len + value : value;
  }

  toString() {
    return this._shapeDataMap.map(row => row.join(' ')).join('\n');
  }

  * [Symbol.iterator](): IterableIterator<Point> {
    for (let i = 0; i < this.frame.length; i++) {
      yield this.frame[i];
    }
  }
}
