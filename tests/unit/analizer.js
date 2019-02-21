const assert = require('assert');
const service = require('../../services/analizer');
describe('ANALYZER functions', ()=> {
  const stocks = [
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
  it('should calculate Drawdowns', () => {
    const result = service.drawdowns(stocks);
    const expected = [ 1.3, 0.8, 1.5, 1.8 ];
    assert.deepEqual(expected, result);
  });

  it('should calculate rate of return', () => {
    const result = service.rateOfReturn(stocks);
    const expected = 1.6;
    assert.equal(expected, result);
  });
});