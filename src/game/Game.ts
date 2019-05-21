import { Config } from './config/Config';
import { ConfigData } from './typings';
import { Field } from './data/Field';
import { Level } from './data/Level';
import { Shape } from './data/Shape';
import { ShapeData } from './data/ShapeData';

export class Game {
  static async init(options: Partial<ConfigData> = {}): Promise<Game> {
    const config = await Config.init(options);
    return new Game(config);
  }

  private _score?:number;
  private _level?:Level;
  private _field?:Field;
  private _nextShape?:ShapeData;

  constructor(public config: Config) {
  }

  start() {
    this._score = 0;
    this._level = this.config.getLevelByScore(this._score);
    this._field = new Field(this.config.width, this.config.height);
    this._field.addShape(new Shape(this._level.getRandomColor(), this.config.getRandomShapeData()));
    this._nextShape = this.config.getRandomShapeData();
  }

  pause() {
  }

  unpouse() {
  }
}
