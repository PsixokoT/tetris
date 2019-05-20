export type ShapeRow = (number | undefined)[];
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

declare module '*/default.json' {
  const value:ConfigData;
  export default value;
}
