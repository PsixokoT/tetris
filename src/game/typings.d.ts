export type ShapeRow = number[];
export type ShapeDataMap = ShapeRow[];
export type ShapeDataFrames = ShapeDataMap[];

interface LevelData {
  score: number;
  speed: number;
  colors: number[];
}

export interface ConfigData {
  width: number;
  height: number;
  shapes: ShapeDataFrames[];
  score: number[];
  levels: LevelData[];
}

export interface Point {
  x: number;
  y: number;
}

export type ShapePoints = Point[];
export type ShapeFrames = ShapePoints[];

declare module '*/default.json' {
  const value: ConfigData;
  export default value;
}
