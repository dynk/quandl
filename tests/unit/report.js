const assert = require('assert');
const service = require('../../services/report');
describe('REPORT functions', ()=> {
  const validStocks = [
    [
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
    ],
    [
      { date: '1980-01-01',
        open: 0,
        high: 0,
        low: 0,
        close: 0 },
      { date: '1980-01-02',
        open: 1,
        high: 1,
        low: 1,
        close: 1 }
    ]
  ];
  it('should insert Drawdown', () => {
    const expectedList = [
      [
        { date: '2018-01-05',
          open: 173.44,
          high: 175.37,
          low: 173.05,
          close: 175,
          drawdown: 1.3 },
        { date: '2018-01-04',
          open: 172.54,
          high: 173.47,
          low: 172.08,
          close: 173.03,
          drawdown: 0.8 },
        { date: '2018-01-03',
          open: 172.53,
          high: 174.55,
          low: 171.96,
          close: 172.23,
          drawdown: 1.5 },
        { date: '2018-01-02',
          open: 170.16,
          high: 172.3,
          low: 169.26,
          close: 172.26,
          drawdown: 1.8 }
      ],
      [
        { date: '1980-01-01',
          open: 0,
          high: 0,
          low: 0,
          close: 0,
          drawdown: undefined },
        { date: '1980-01-02',
          open: 1,
          high: 1,
          low: 1,
          close: 1,
          drawdown: 0 }
      ]
    ];
    for(let i = 0; i < validStocks.length; i++) {
      const expected = expectedList[i];
      const result = service.insertDrawdown(validStocks[i]);
      assert.deepEqual(expected, result);
    }
  });
});