const assert = require('assert');
const stockService = require('../../services/stock');
describe('stockService functions', ()=> {
  it('Should not parse invalids input', async () => {
    const parameters = {
      apiKey: 'API_KEY=XXXX',
      stockSymbol: 'AAPL',
      startDate: 'start_date=Jan-1-2018',
      endDate: 'end_date=Jan-5-2018'
    };
    const result = await stockService.get(parameters);
    assert.notEqual(null, result);
  });
});