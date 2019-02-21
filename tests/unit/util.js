const assert = require('assert');
const service = require('../../services/util');

describe('UTIL service functions', ()=> {
  it('Should get max index date of an array of objects with field date', () => {
    const arrayInput = [
      {date: '2003-01-01'},
      {date: '2005-01-01'},
      {date: '2005-10-01'},
      {date: '2004-12-12'}
    ];
    const result = service.getMaxDateIndex(arrayInput);
    assert.equal(2,result);
  });

  it('Should get min index date of an array of objects with field date', () => {
    const arrayInput = [
      {date: '2003-01-01'},
      {date: '2005-01-01'},
      {date: '2005-10-01'},
      {date: '2004-12-12'}
    ];
    const result = service.getMinDateIndex(arrayInput);
    assert.equal(0,result);
  });


});