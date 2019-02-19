const cli = (input) => {
  if(!input || typeof input !== 'string') {
    return {err: 'not valid input'};
  }
  return {parsed: input};
};

module.exports = {
  cli
};