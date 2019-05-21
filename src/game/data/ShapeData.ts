import { ShapeDataFrames, ShapeFrames, ShapePoints, ShapeRow } from '../typings';

export class ShapeData {
  public readonly frames: ShapeFrames;
  public readonly framesCount: number;

  constructor(public readonly shapeDataFrames: ShapeDataFrames) {
    this.frames = this.shapeDataFrames.map(shape => {
      const shapePoints: ShapePoints = [];
      for (let y: number = 0; y < shape.length; y++) {
        const row: ShapeRow = shape[y];
        for (let x: number = 0; x < row.length; x++) {
          const value = row[x];
          if (value > 0) {
            shapePoints.push({ x: x, y: y });
          }
        }
      }
      return shapePoints;
    });
    this.framesCount = this.frames.length;
  }
}
