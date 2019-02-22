
const utilService = require('./util');

const calculateOneDrawdown = (stock) => {
  if(!stock) {
    throw new Error('stocks value doesnt exist or is not an Array');
  }
  const {high, low} = stock;
  return Math.round(((high-low)/high)*1000)/10;
};

const caldulateDrawdowns = (stocks) => {
  if(!stocks || !Array.isArray(stocks)) {
    throw new Error('stocks value doesnt exist or is not an Array');
  }
  return stocks.map(calculateOneDrawdown);
};

const calculateReturn = (stocks) => {
  if(!stocks || !Array.isArray(stocks)) {
    throw new Error('stocks value doesnt exist or is not an Array');
  }
  const [minIndex, maxIndex] = [utilService.getMinDateIndex(stocks), utilService.getMaxDateIndex(stocks)];
  const [vi, vf] = [stocks[minIndex].close, stocks[maxIndex].close];
  const absolutReturn = vf - vi;
  const rateOfReturn = Math.round((absolutReturn/ vi)*1000)/10;
  const start = {
    date: stocks[minIndex].date,
    close: stocks[minIndex].close
  };
  const end = {
    date: stocks[maxIndex].date,
    close: stocks[maxIndex].close
  };
  return {start, end, rateOfReturn, absolutReturn};
};

module.exports = {
  calculateOneDrawdown,
  caldulateDrawdowns,
  calculateReturn
};