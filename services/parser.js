const isApiKeyValid = (apiKey) => {
  if(
    !apiKey
    || typeof apiKey !== 'string'
    || !apiKey.length) {
    return false;
  }
  const apiKeyArray = apiKey.split('=');
  if(apiKeyArray.length !== 2) {
    return false;
  }
  if(apiKeyArray[0].toLowerCase() !== 'api_key'){
    return false;
  }
  if(apiKeyArray[0].length === 0){
    return false;
  }
  return true;
};

const cli = (input) => {
  if(
    !input
    || typeof input !== 'string'
    || !input.length
  ) {
    return {err: 'not valid input'};
  }
  const inputArray = input.split(' ');
  let apiKey = inputArray[0];
  if(!isApiKeyValid(apiKey)) {
    return {err: 'not valid apiKey'};
  }
  const apiKeyArray = apiKey.split('=');
  apiKey = `api_key=${apiKeyArray[1]}`;
  const stockSymbol = inputArray[1];
  if(!stockSymbol || !stockSymbol.length) {
    return {err: 'not valid stock symbol'};
  }
  if(inputArray.length < 6) {
    return {err: 'not valid start date'};
  }
  const startDate = `start_date=${inputArray[2]}-${inputArray[3]}-${inputArray[4]}`;
  const parsed = {
    apiKey,
    stockSymbol,
    startDate
  };
  if(inputArray.length > 8){
    parsed.endDate = `end_date=${inputArray[6]}-${inputArray[7]}-${inputArray[8]}`;
  }
  return {parsed};
};

const parseResponseQuandl = (rawQuandlData) => {
  if(!rawQuandlData) {
    throw new Error('rawQuandlData cannot be empty');
  }
  const {dataset_data: dataSet} = rawQuandlData;
  const {data} = dataSet;
  return data.map(parseOne);

  function parseOne(e) {
    return {
      date: e[0],
      open: e[1],
      high: e[2],
      low: e[3],
      close: e[4]
    };
  }
};

module.exports = {
  cli,
  isApiKeyValid,
  parseResponseQuandl
};