import { FieldData, FieldPoints, ShapeData, ShapeDataFrames, ShapeRow } from '../typings';

export class Shape {
  public x: number = 0;
  public y: number = 0;

  private _currentFrame:number = 0;
  public get currentFrame():number {
    return this._currentFrame;
  }

  private _data:FieldData = [];
  public get data() {
    return this._data;
  }

  public get width() {
    return this.data.length;
  }

  public get height() {
    return this.data[0].length;
  }

  constructor(public readonly color: number, private readonly _frames: ShapeDataFrames) {
    this.calculate();
  }

  rotate(count:number = 1) {
    const len = this._frames.length;
    const value = (this._currentFrame + count) % len;
    this._currentFrame = count < 0 ? len + value : value;
    this.calculate();
  }

  toString() {
    const shape:ShapeData = this._frames[this._currentFrame];
    return shape.map(row => row.join(' ')).join('\n');
  }

  *[Symbol.iterator]():IterableIterator<{ x: number, y:number, color:number }> {
    for (let x:number = 0; x < this._data.length; x++) {
      const col:FieldPoints = this._data[x];
      for (let y:number = 0; y < col.length; y++) {
        const value = col[y];
        if (value !== undefined) {
          yield { x: x, y: y, color: this.color };
        }
      }
    }
  }

  private calculate() {
    this._data = [];
    const shape:ShapeData = this._frames[this._currentFrame];
    for (let y:number = 0; y < shape.length; y++) {
      const row:ShapeRow = shape[y];
      for (let x:number = 0; x < row.length; x++) {
        const value = row[x];
        if (!this._data[x]) this._data[x] = [];
        this._data[x][y] = value ? this.color : undefined;
      }
    }
  }
}
