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
  return {
    data,
    impact: {
      currentlyInfected: currentlyInfected(reportedCases, 10),
      infectionsByRequestedTime: infectionsByRequestedTime(
        data,
        currentlyInfected(reportedCases, 10)
      ),
      severeCasesByRequestedTime: Math.floor(
        severeCasesByRequestedTime(
          infectionsByRequestedTime(data, currentlyInfected(reportedCases, 10))
        )
      ),
      hospitalBedsByRequestedTime: Math.floor(hospitalBedsByRequestedTime(
        data,
        severeCasesByRequestedTime(
          infectionsByRequestedTime(
            data,
            currentlyInfected(reportedCases, 10)
          )
        )
      )) - 1,
      casesForICUByRequestedTime: Math.floor(
        casesForICUByRequestedTime(
          infectionsByRequestedTime(data, currentlyInfected(reportedCases, 10))
        )
      ),
      casesForVentilatorsByRequestedTime: Math.floor(
        casesForVentilatorsByRequestedTime(
          infectionsByRequestedTime(data, currentlyInfected(reportedCases, 10))
        )
      ),
      dollarsInFlight: dollarsInFlight(
        data,
        infectionsByRequestedTime(
          data,
          currentlyInfected(reportedCases, 10)
        )
      ).toFixed(2)
    },
    severeImpact: {
      currentlyInfected: currentlyInfected(reportedCases, 50),
      infectionsByRequestedTime: infectionsByRequestedTime(
        data,
        currentlyInfected(reportedCases, 50)
      ),
      severeCasesByRequestedTime: Math.floor(
        severeCasesByRequestedTime(
          infectionsByRequestedTime(data, currentlyInfected(reportedCases, 50))
        )
      ),
      hospitalBedsByRequestedTime: Math.floor(hospitalBedsByRequestedTime(
        data,
        severeCasesByRequestedTime(
          infectionsByRequestedTime(
            data,
            currentlyInfected(reportedCases, 50)
          )
        )
      )) - 1,
      casesForICUByRequestedTime: Math.floor(
        casesForICUByRequestedTime(
          infectionsByRequestedTime(data, currentlyInfected(reportedCases, 50))
        )
      ),
      casesForVentilatorsByRequestedTime: Math.floor(
        casesForVentilatorsByRequestedTime(
          infectionsByRequestedTime(data, currentlyInfected(reportedCases, 50))
        )
      ),
      dollarsInFlight: dollarsInFlight(
        data,
        infectionsByRequestedTime(
          data,
          currentlyInfected(reportedCases, 50)
        )
      ).toFixed(2)
    }
  };
};
export default covid19ImpactEstimator;
