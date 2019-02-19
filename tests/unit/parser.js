const assert = require('assert');
const parserService = require('../../services/parser');
describe('parserService functions', ()=> {
  it('Should not parse invalids input', () => {
    const invalidInputs = [
      '',
      [],
      2,
      'API_KEY=XXXX stock.rb AAPL Jan 1'
    ];
    for(const ip of invalidInputs) {
      const { err } = parserService.cli(ip);
      assert.notEqual(err, null);
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

  it('Should parse valid inputs', () => {
    const validInputs = [
      'API_KEY=XXXX stock.rb AAPL Jan 1 2018',
      'API_KEY=XXXX stock.rb AAPL Jan 1 2018 - Jan 5 2018'
    ];
    const expectedParsed = [
      {
        apiKey: 'API_KEY=XXXX',
        stockSymbol: 'AAPL',
        startDate: 'start_date=Jan-1-2018'
      },
      {
        apiKey: 'API_KEY=XXXX',
        stockSymbol: 'AAPL',
        startDate: 'start_date=Jan-1-2018',
        endDate: 'end_date=Jan-5-2018'
      }
    ];
    for(let i = 0; i < validInputs.length; i++) {
      const {parsed} = parserService.cli(validInputs[i]);
      assert.deepEqual(expectedParsed[i], parsed);
    }
  });

});