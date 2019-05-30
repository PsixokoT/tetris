import { Config } from './config/Config';
import { ConfigData } from './typings';
import { Field } from './data/Field';
import { Level } from './data/Level';
import { Shape } from './data/Shape';
import { ShapeData } from './data/ShapeData';

export interface GameLoop {
  start(): void;
  pause(): void;
  unpause(): void;
  update(delta: number): void;
}

export class Game implements GameLoop {

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

  public readonly field: Field;

  // --------------------------------------------------------------------------
  //  Variables
  // --------------------------------------------------------------------------

  private _time: number;
  private _nextShape: ShapeData;

  constructor(public config: Config) {
    this._time = 0;
    this._score = 0;
    this._lines = 0;
    this._level = this.config.getLevelByScore(this._score);
    this.field = new Field(this.config.width, this.config.height);
    this._nextShape = this.config.getRandomShapeData();
  }

  start() {
    this._time = 0;
    this._score = 0;
    this._level = this.config.getLevelByScore(this._score);
    this.field.dispose();
    this.field.addShape(new Shape(this._level.getRandomColor(), this.config.getRandomShapeData()));
    this._nextShape = this.config.getRandomShapeData();
  }

  update(delta: number) {
    this._time += delta;
    let stepsCount = Math.round(this._time / this._level.speed);
    if (stepsCount > 0) {
      while (stepsCount-- > 0) {
        if (!this.step()) {
          console.log('finish game');
          break;
        }
      }
      this._time = this._time % this._level.speed;
    }
  }

  pause() {
    console.log('pause');
  }

  unpause() {
    console.log('unpause');
  }

  private step(): boolean {
    const linesCount = this.field.step();
    if (linesCount >= 0) {
      this._lines += linesCount;
      this._score += this.config.getScore(linesCount);
      this._level = this.config.getLevelByScore(this._score);

      const shape = new Shape(this._level.getRandomColor(), this._nextShape);
      this._nextShape = this.config.getRandomShapeData();
      return this.field.addShape(shape);
    }
    return true;
  }
}
