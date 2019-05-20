import { ShapeData, ShapeDataFrames } from '../typings';

export class Shape {
  public x: number = 0;
  public y: number = 0;

  private _currentFrame:number = 0;
  public get currentFrame():number {
    return this._currentFrame;
  }

  private _data:ShapeData = [];
  public get data():ShapeData {
    return this._data;
  }

  constructor(public readonly color: number, private readonly _frames: ShapeDataFrames) {
    this.calculate();
  }

  rotate(count:number = 1):ShapeData {
    const len = this._frames.length;
    const value = (this._currentFrame + count) % len;
    this._currentFrame = count < 0 ? len + value : value;
    this.calculate();
    return this._data;
  }

  toString() {
    const shape:ShapeData = this._frames[this._currentFrame];
    return shape.map(row => row.join(' ')).join('\n');
  }

  private calculate() {
    const shape:ShapeData = this._frames[this._currentFrame];
    this._data = shape.map(row => row.map(point => point ? this.color : undefined));
  }
}
