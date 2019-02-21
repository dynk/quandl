const getMaxDateIndex = (arrayInput) => {
  if(!arrayInput || !Array.isArray(arrayInput)) {
    throw new Error('Invalid input');
  }
  let maxIndex;
  let maxValue;
  for(let i = 0; i < arrayInput.length; i++) {
    const el = arrayInput[i];
    if(!maxValue){
      maxValue = el.date;
      maxIndex = i;
    }else {
      if(maxValue < el.date) {
        maxValue = el.date;
        maxIndex = i;
      }
    }
  }
  return maxIndex;
};

const getMinDateIndex = (arrayInput) => {
  if(!arrayInput || !Array.isArray(arrayInput)) {
    throw new Error('Invalid input');
  }
  let minIndex;
  let minValue;
  for(let i = 0; i < arrayInput.length; i++) {
    const el = arrayInput[i];
    if(!minValue){
      minValue = el.date;
      minIndex = i;
    }else {
      if(minValue > el.date) {
        minValue = el.date;
        minIndex = i;
      }
    }
  }
  return minIndex;
};

module.exports = {
  getMaxDateIndex,
  getMinDateIndex
};
