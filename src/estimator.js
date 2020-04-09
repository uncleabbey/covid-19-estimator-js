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

const infectionsByRequestedTime = (data, theCurrentlyInfected) => {
  let infected = null;
  const { periodType, timeToElapse } = data;
  switch (periodType) {
    case 'weeks':
      infected = theCurrentlyInfected * 2 ** Math.floor((timeToElapse * 7) / 3);
      break;
    case 'months':
      infected = theCurrentlyInfected * 2 ** Math.floor((timeToElapse * 30) / 3);
      break;
    default:
      infected = theCurrentlyInfected * 2 ** Math.floor(timeToElapse / 3);
  }
  return infected;
};

const currentlyInfected = (reportedCases, estimate) => reportedCases * estimate;

const severeCasesByRequestedTime = (time) => time * 0.15;

const hospitalBedsByRequestedTime = (data, severity) => {
  const { totalHospitalBeds } = data;
  const availableBeds = totalHospitalBeds * 0.35;
  return availableBeds - severity;
};

const casesForICUByRequestedTime = (infections) => infections * 0.05;

const casesForVentilatorsByRequestedTime = (infections) => infections * 0.02;

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

const covid19ImpactEstimator = (data = input) => {
  const { reportedCases } = data;
  const infections = infectionsByRequestedTime(
    data,
    currentlyInfected(reportedCases, 10)
  );
  const infectionsFS = infectionsByRequestedTime(
    data,
    currentlyInfected(reportedCases, 50)
  );
  const severeCaseFI = severeCasesByRequestedTime(infections);
  const severeCaseFS = severeCasesByRequestedTime(infectionsFS);
  return {
    data,
    impact: {
      currentlyInfected: currentlyInfected(reportedCases, 10),
      infectionsByRequestedTime: infections,
      severeCasesByRequestedTime: severeCaseFI,
      hospitalBedsByRequestedTime: Math.round(hospitalBedsByRequestedTime(data, severeCaseFI)),
      casesForICUByRequestedTime: casesForICUByRequestedTime(infections),
      casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTime(infections),
      dollarsInFlight: dollarsInFlight(data, infections).toFixed(2)
    },
    severeImpact: {
      currentlyInfected: currentlyInfected(reportedCases, 50),
      infectionsByRequestedTime: infectionsFS,
      severeCasesByRequestedTime: severeCaseFS,
      hospitalBedsByRequestedTime: Math.round(hospitalBedsByRequestedTime(data, severeCaseFS)),
      casesForICUByRequestedTime: casesForICUByRequestedTime(infectionsFS),
      casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTime(infectionsFS),
      dollarsInFlight: dollarsInFlight(data, infectionsFS).toFixed(2)
    }
  };
};
export default covid19ImpactEstimator;
