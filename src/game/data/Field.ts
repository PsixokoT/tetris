import { Shape } from './Shape';

type Column = (number | undefined)[];

export class Field {
  public readonly map: Column[];
  private _shape?: Shape;
  public get shape() {
    return this._shape;
  }

  constructor(public readonly width: number, public readonly height: number) {
    if (width <= 0 || height <= 0) throw new Error('invalid size');
    this.map = Array.from({ length: this.width }, () => new Array(this.height).fill(undefined));
  }

  toString() {
    type Row = ('1' | '0')[];
    const mapToRows = this.map.reduce((rows: Row[], col, x) => {
      col.forEach((value, y) => {
        if (!rows[y]) rows[y] = [];
        rows[y][x] = value !== undefined ? '1' : '0';
      });
      return rows;
    }, []);
    if (this._shape) {
      const { x: shapeX, y: shapeY, frame } = this._shape;
      frame.forEach(({ x, y }) => {
        mapToRows[shapeY + y][shapeX + x] = '1';
      });
    }
    return mapToRows.map(row => row.join(' ')).join('\n');
  }

  addShape(shape: Shape): boolean {
    if (this._shape) return false;
    shape.x = Math.round((this.width - shape.width) / 2);
    shape.y = 0;
    this._shape = shape;
    return this.move(0, 0);
  }

  move(x: number, y: number): boolean {
    if (!this._shape) return false;
    if (y < 0) return false;
    const { x: shapeX, y: shapeY, frame } = this._shape;
    const newX = shapeX + x;
    const newY = shapeY + y;
    const absolutePoints = frame.map(({ x: relativeX, y: relativeY }) => {
      return {
        x: newX + relativeX,
        y: newY + relativeY
      };
    });
    const validPosition = absolutePoints.every(({ x: pointX, y: pointY }) => {
      if (pointX < 0 || pointX >= this.width) return false;
      if (pointY < 0 || pointY >= this.height) return false;
      return this.map[pointX][pointY] === undefined;
    });
    if (validPosition) {
      this._shape.x = newX;
      this._shape.y = newY;
    }
    return validPosition;
  }

  rotate(count: number = 1) {
    if (!this._shape) return;
    this._shape.rotate(count);
    if (!this.move(0, 0)) {
      this._shape.rotate(count * -1);
    }
  }

  step(): number {
    if (!this._shape) return 0;
    if (!this.move(0, 1)) {
      const { x: shapeX, y: shapeY, frame, color } = this._shape;
      frame.forEach(({ x, y }) => {
        this.map[shapeX + x][shapeY + y] = color;
      });
      this._shape = undefined;
      return this.clearLines();
    }
    return -1;
  }

  private clearLines(): number {
    let count = 0;
    for (let y = this.height - 1; y >= 0; y--) {
      const hasLine = this.map.every(col => col[y] !== undefined);
      if (hasLine) {
        this.map.forEach(col => {
          col.splice(y, 1);
          col.unshift(undefined);
        });
        count++;
      }
    }
    return count;
  }
}
