import { log } from '../src/main';

describe('Main', () => {
  it('log hello', () => {
    console.log = jest.fn();
    log('hello');
    expect(console.log).toHaveBeenCalledWith('hello');
  });
});
