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
  const apiKey = inputArray[0];
  if(!isApiKeyValid(apiKey)) {
    return {err: 'not valid apiKey'};
  }

  const parsed = {
    apiKey
  };
  return {parsed};
};

module.exports = {
  cli,
  isApiKeyValid
};