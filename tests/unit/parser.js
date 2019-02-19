const assert = require('assert');
const parserService = require('../../services/parser');
describe('Main functions', ()=> {
  it('Should not parse invalids input', () => {
    const invalidInputs = ['', [], 2];
    for(const ip of invalidInputs) {
      const { parsed, err } = parserService.cli(ip);
      assert.notEqual(err, null);
      assert.equal(parsed, null);
    }
  });
});