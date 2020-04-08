const dollarsInFlight = (data, infection) => {
  const { avgDailyIncomePopulation, avgDailyIncomeInUSD } = data.region;
  const { periodType, timeToElapse } = data;
  let dollars;
  switch (periodType) {
    case 'weeks':
      dollars = infection
        * avgDailyIncomePopulation
        * avgDailyIncomeInUSD
        * (timeToElapse * 7);
      break;
    case 'months':
      dollars = infection
        * avgDailyIncomePopulation
        * avgDailyIncomeInUSD
        * (timeToElapse * 30);
      break;
    default:
      dollars = infection
        * avgDailyIncomePopulation
        * avgDailyIncomeInUSD
        * timeToElapse;
  }
  return dollars;
};

export default dollarsInFlight;
