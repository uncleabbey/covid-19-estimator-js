const input = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};
const currentlyInfected = (reportedCases, estimate) => reportedCases * estimate;

const infectionsByRequestedTime = (theCurrentlyInfected, days) => {
  const totalInDays = theCurrentlyInfected * 2 ** Math.floor(days / 3);
  return totalInDays;
};

const covid19ImpactEstimator = (data = input) => {
  const { reportedCases, timeToElapse } = data;
  return {
    data,
    impact: {
      currentlyInfected: currentlyInfected(reportedCases, 10),
      infectionsByRequestedTime: infectionsByRequestedTime(
        currentlyInfected(reportedCases, 10),
        timeToElapse
      )
    },
    severeImpact: {
      currentlyInfected: currentlyInfected(reportedCases, 50),
      infectionsByRequestedTime: infectionsByRequestedTime(
        currentlyInfected(reportedCases, 50),
        timeToElapse
      )
    }
  };
};
export default covid19ImpactEstimator;
