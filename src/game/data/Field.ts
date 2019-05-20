import { FieldData } from '../typings';
import { Shape } from './Shape';

export class Field {
  private readonly _data:FieldData;
  public get data() {
    return this._data;
  }
  private _shape?:Shape;

  constructor(public readonly width:number, public readonly height:number) {
    this._data = new Array(width).fill(new Array(height));
  }

  addShape(shape:Shape) {
    shape.x = Math.round((this.width - shape.width) / 2);
    shape.y = 0;
    this._shape = shape;
  }
}
