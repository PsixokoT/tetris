import { Config } from './config/Config';
import { ConfigData } from './typings';
import { Field, IField } from './data/Field';
import { Level } from './data/Level';
import { Shape } from './data/Shape';
import { ShapeData } from './data/ShapeData';
import { continueStatement } from '@babel/types';

export interface IGame {
  time: number;
  field: IField;
  start(): void;
  update(delta: number): void;
  moveLeft(): void;
  moveRight(): void;
  moveDown(): void;
  rotate(): void;
}

export class Game implements IGame {

  // --------------------------------------------------------------------------
  //  Static
  // --------------------------------------------------------------------------

  static async init(options: Partial<ConfigData> = {}): Promise<Game> {
    const config = await Config.init(options);
    return new Game(config);
  }

  // --------------------------------------------------------------------------
  //  Properties
  // --------------------------------------------------------------------------

  private _score: number;
  public get score() {
    return this._score;
  }

  private _lines: number;
  public get lines() {
    return this._lines;
  }

  private _level: Level;
  public get level() {
    return this._level;
  }

  private _nextShape: ShapeData;
  public get nextShape() {
    return this._nextShape;
  }

  private readonly _field: Field;
  public get field(): IField {
    return this._field;
  }

  private _time: number;
  public get time() {
    return this._time;
  }

  constructor(public config: Config) {
    // TODO : TypeScript Type Inference from method start() in constructor
    this._time = 0;
    this._score = 0;
    this._lines = 0;
    this._level = this.config.getLevelByScore(this._score);
    this._field = new Field(this.config.width, this.config.height);
    this._nextShape = this.config.getRandomShapeData();
  }

  start() {
    this._time = 0;
    this._score = 0;
    this._level = this.config.getLevelByScore(this._score);
    this._field.dispose();
    let shape = new Shape(this._level.getRandomColor(), this.config.getRandomShapeData());
    this._field.addShape(shape);
    this._nextShape = this.config.getRandomShapeData();
  }

  update(delta: number): boolean {
    this._time += delta;
    let stepsCount = Math.floor(this._time / this._level.speed);
    if (stepsCount > 0) {
      while (stepsCount-- > 0) {
        if (!this.step()) return false;
      }
      this._time = this._time % this._level.speed;
    }
    return true;
  }

  moveLeft() {
    this._field.move(-1, 0);
  }

  moveRight() {
    this._field.move(1, 0);
  }

  moveDown() {
    this._field.move(0, 1);
  }

  rotate() {
    this._field.rotate();
  }

  private step(): boolean {
    const linesCount = this._field.step();
    if (linesCount >= 0) {
      this._lines += linesCount;
      this._score += this.config.getScore(linesCount);
      this._level = this.config.getLevelByScore(this._score);

      const shape = new Shape(this._level.getRandomColor(), this._nextShape);
      this._nextShape = this.config.getRandomShapeData();
      return this._field.addShape(shape);
    }
    return true;
  }
}
