import { Shape } from './Shape';

export type StepResult = 'done' | 'next' | 'complete';
type Column = number[];

export class Field {
  private readonly _map:Column[];
  private _shape?:Shape;

  constructor(public readonly width:number, public readonly height:number) {
    this._map = new Array(width).fill(new Array(height));
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
