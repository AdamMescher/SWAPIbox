const dataBuilder = (nounObject) => {
  let returnObject = {
    displayData: {}
  };
  Object.keys(nounObject).forEach( key => {
    if (key === "url" || key === "name"){
      returnObject[key] = nounObject[key];
      return;
    }
    if (typeof nounObject[key] === 'object') {
      let reducedData = nounObject[key].map((item) => {
        return item.name;
      }).join(', ') || 'none';
      returnObject.displayData[key] = reducedData;
      return;
    }
    returnObject.displayData[key] = nounObject[key];
  });
  return returnObject;
};

export default dataBuilder;
