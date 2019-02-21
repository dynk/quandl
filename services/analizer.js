
const utilService = require('./util');
const drawdowns = (stocks) => {
  if(!stocks || !Array.isArray(stocks)) {
    throw new Error('stocks value doesnt exist or is not an Array');
  }
  return stocks.map(calculate);
  function calculate(stock) {
    const {high, low} = stock;
    return Math.round(((high-low)/high)*1000)/10;
  }
};

const rateOfReturn = (stocks) => {
  if(!stocks || !Array.isArray(stocks)) {
    throw new Error('stocks value doesnt exist or is not an Array');
  }
  const [minIndex, maxIndex] = [utilService.getMinDateIndex(stocks), utilService.getMaxDateIndex(stocks)];
  const [vi, vf] = [stocks[minIndex].close, stocks[maxIndex].close];
  console.log('minIndex',stocks);
  return Math.round(((vf - vi)/ vi)*1000)/10;
};

module.exports = {
  drawdowns,
  rateOfReturn
};