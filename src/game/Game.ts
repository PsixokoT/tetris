import { Config } from './config/Config';
import { ConfigData } from './typings';

export class Game {
  static async init(options: Partial<ConfigData> = {}): Promise<Game> {
    const config = await Config.init(options);
    return new Game(config);
  }

  constructor(public config: Config) {
  }
}
