
const analizer = require('./analizer');

const makeReport = (stocks) => {
  const orderedStocks = stocks.sort((a,b) => new Date(a.date) - new Date(b.date));
  const stocksWDrawdown = insertDrawdown(orderedStocks);
  const orderedStockByDrawdown = stocksWDrawdown.sort((a,b) => b.drawdown - a.drawdown);
  const rateOfReturnReport = analizer.calculateReturn(stocks);
  let result = '';
  for(const s of orderedStocks) {
    result += `${s.date}: Closed at ${s.close} (${s.low} ~ ${s.high}) \n`;
  }
  result += '\nFirst 3 Drawdowns:\n';
  for(const s of orderedStockByDrawdown.slice(0,3)){
    result += `-${s.drawdown}% (${s.high} on ${s.date} -> ${s.low} on ${s.date}) \n`;
  }
  const macDraw = orderedStockByDrawdown[0];
  result += `\nMaximum drawdown: -${macDraw.drawdown}% (${macDraw.high} on ${macDraw.date} -> ${macDraw.low} on ${macDraw.date}) \n\n`;
  const signal = (rateOfReturnReport.rateOfReturn >= 0) ? '+' : '-';
  result += `Return: ${rateOfReturnReport.absolutReturn} [${signal}${rateOfReturnReport.rateOfReturn}] (${rateOfReturnReport.start.close} on ${rateOfReturnReport.start.date} -> ${rateOfReturnReport.end.close} on ${rateOfReturnReport.end.date})`;
  console.log(result);
};

const runUsingQuandl = () => {

};

const insertDrawdown = (stocks) => {
  return stocks.map(s => {
    s.drawdown = analizer.calculateOneDrawdown(s);
    return s;
  });
};




module.exports = {
  makeReport,
  runUsingQuandl,
  insertDrawdown
};