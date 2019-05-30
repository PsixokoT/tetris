require('../src/main');

console.log = jest.fn();

function fakeDOMLoaded() {
  const fakeEvent = document.createEvent('Event');

  fakeEvent.initEvent('DOMContentLoaded', true, true);
  window.document.dispatchEvent(fakeEvent);
}

fakeDOMLoaded();

describe('Main', () => {
  it('log hello', async () => {
    await expect(console.log).toHaveBeenCalledWith('hello');
  });
});
