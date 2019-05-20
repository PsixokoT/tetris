export type ShapeRow = number[];
export type ShapeData = ShapeRow[];
export type ShapeDataFrames = ShapeData[];

interface LevelData {
  points: number;
  speed: number;
  colors: number[];
}

export interface ConfigData {
  width: number;
  height: number;
  shapes: ShapeDataFrames[];
  points: number[];
  levels: LevelData[];
}

export type FieldPoints = (number | undefined)[]; // Color || empty
export type FieldData = FieldPoints[];// data[x][y] = empty || color

declare module '*/default.json' {
  const value:ConfigData;
  export default value;
}
