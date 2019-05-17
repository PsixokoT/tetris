export type ShapeRow = number[];
export type ShapeData = ShapeRow[];
interface LevelData {
  points: number;
  speed: number;
  colors: number[];
}

export interface ConfigData {
  width: number;
  height: number;
  shapes: ShapeData[];
  points: number[];
  levels: LevelData[];
}

declare module '*/default.json' {
  const value:ConfigData;
  export default value;
}
