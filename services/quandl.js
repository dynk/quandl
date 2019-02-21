const request = require('request-promise');

const get = (parameters) => {
  const {stockSymbol, apiKey, startDate, endDate} = parameters;
  return request.get(`https://www.quandl.com/api/v3/datasets/WIKI/${stockSymbol}/data.json?${apiKey}&${startDate}&${endDate}`);
};

module.exports = {
  get
};