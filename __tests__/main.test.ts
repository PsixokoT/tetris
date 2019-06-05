require('../src/main');

console.log = jest.fn();

function fakeDOMLoaded() {
  const fakeEvent = document.createEvent('Event');

  fakeEvent.initEvent('DOMContentLoaded', true, true);
  window.document.dispatchEvent(fakeEvent);
}

fakeDOMLoaded();

describe('Main', () => {
  it('log hello', () => {
    let pr = new Promise(resolve => { resolve(); });
    pr.then(() => {
      expect(console.log).toHaveBeenCalledWith('hello');
    });
  });
});
