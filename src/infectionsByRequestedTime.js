const infectionsByRequestedTime = (data, theCurrentlyInfected) => {
  let infected = null;
  const { periodType, timeToElapse } = data;
  switch (periodType) {
    case 'weeks':
      infected = theCurrentlyInfected * 2 ** Math.round((timeToElapse * 7) / 3);
      break;
    case 'months':
      infected = theCurrentlyInfected * 2 ** Math.round((timeToElapse * 30) / 3);
      break;
    default:
      infected = theCurrentlyInfected * 2 ** Math.floor(timeToElapse / 3);
  }
  return infected;
};

export default infectionsByRequestedTime;
