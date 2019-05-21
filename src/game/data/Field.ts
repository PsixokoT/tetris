import { Line } from '../typings';
import { Shape } from './Shape';

export type StepResult = 'done' | 'next' | 'complete';

export class Field {
  private readonly _lines:Line[];
  private _shape?:Shape;

  constructor(public readonly width:number, public readonly height:number) {
    this._lines = new Array(height).fill(new Array(width));
  }

  step():StepResult {
    return 'done';
  }

  addShape(shape:Shape) {
    shape.x = Math.round((this.width - shape.width) / 2);
    shape.y = 0;
    this._shape = shape;
  }
}
