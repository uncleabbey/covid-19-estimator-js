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

const infectionsByRequestedTime = (data, theCurrentlyInfected) => {
  let infected = null;
  const { periodType, timeToElapse } = data;
  switch (periodType) {
    case 'weeks':
      infected = theCurrentlyInfected * (2 ** Math.round((timeToElapse * 7) / 3));
      break;
    case 'months':
      infected = theCurrentlyInfected * (2 ** Math.round((timeToElapse * 30) / 3));
      break;
    default:
      infected = theCurrentlyInfected * (2 ** Math.round(timeToElapse / 3));
  }
  return infected;
};

const covid19ImpactEstimator = (data = input) => {
  const { reportedCases } = data;
  return {
    data,
    impact: {
      currentlyInfected: currentlyInfected(reportedCases, 10),
      infectionsByRequestedTime: infectionsByRequestedTime(
        data,
        currentlyInfected(reportedCases, 10)
      )
    },
    severeImpact: {
      currentlyInfected: currentlyInfected(reportedCases, 50),
      infectionsByRequestedTime: infectionsByRequestedTime(
        data,
        currentlyInfected(reportedCases, 50)
      )
    }
  };
};
export default covid19ImpactEstimator;
