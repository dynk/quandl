const request = require('request-promise');

const get = (parameters) => {
  const {stockSymbol, apiKey, startDate, endDate} = parameters;
  const url = `https://www.quandl.com/api/v3/datasets/WIKI/${stockSymbol}/data.json?${apiKey}&${startDate}&${endDate}`;
  const options = {json: true};
  return request.get(url,options);
};

module.exports = {
  get
};