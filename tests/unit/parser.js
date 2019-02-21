const assert = require('assert');
const parserService = require('../../services/parser');
const rawQuandlData = require('../fixtures/data-set.json');
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

  it('should parse quandl input', () => {
    const expeted = [
      { date: '2018-01-05',
        open: 173.44,
        high: 175.37,
        low: 173.05,
        close: 175 },
      { date: '2018-01-04',
        open: 172.54,
        high: 173.47,
        low: 172.08,
        close: 173.03 },
      { date: '2018-01-03',
        open: 172.53,
        high: 174.55,
        low: 171.96,
        close: 172.23 },
      { date: '2018-01-02',
        open: 170.16,
        high: 172.3,
        low: 169.26,
        close: 172.26 }
    ];
    const parsedQuand = parserService.parseResponseQuandl(rawQuandlData);
    assert.deepEqual(expeted, parsedQuand);
  });

});