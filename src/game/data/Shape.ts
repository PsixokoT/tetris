import { ShapeData } from '../typings';

export class Shape {
  public x: number = 0;
  public y: number = 0;

  constructor(public color: number, private readonly _data: ShapeData) {}

  toString() {
    return this._data.map(row => row.join(' ')).join('\n');
  }
}
