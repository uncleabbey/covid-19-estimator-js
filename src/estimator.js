const covid19ImpactEstimator = (data) => {
  const input = data;
  input: {
    region: {
      name: 'Africa';
      avgAge: 19.7;
      avgDailyIncomeInUSD: 5;
      avgDailyIncomePopulation: 0.71;
    }
    periodType: 'days';
    timeToElapse: 58;
    reportedCases: 674;
    population: 66622705;
    totalHospitalBeds: 1380614;
  }
  return {
    data: input, //input data I get
    impact: {
      currentlyInfected: reportedCases * 10
    }, //best case estimation
    severeImpact: {
      currentlyInfected: reportedCases * 50
    } //sever case estimation
  };
};

export default covid19ImpactEstimator;
