const assert = require('assert');
const parserService = require('../../services/parser');
describe('Main functions', ()=> {
  it('Should not parse invalids input', () => {
    const invalidInputs = ['', [], 2, ''];
    for(const ip of invalidInputs) {
      const { parsed, err } = parserService.cli(ip);
      assert.notEqual(err, null);
      assert.equal(parsed, null);
    }
  });

  it('Should reject wrong apikey input', () => {
    const invalidInputs = [
      'apikey=123',
      '',
      null,
      'apikey=',
      '=123'
    ];
    for(const ip of invalidInputs) {
      assert.equal(false, parserService.isApiKeyValid(ip));
    }
  });

  it('Should accept valid apikey input', () => {
    const validInputs = [
      'api_key=123',
      'api_key=dasjk12',
      'API_KEY=dasjk12',
      'aPi_key=dasjk12',
      'Api_keY=dasjk12',
    ];
    for(const ip of validInputs) {
      assert.equal(true, parserService.isApiKeyValid(ip));
    }
  });

});