import infectionsByRequestedTime from './infectionsByRequestedTime';
import dollarsInFlight from './dollarsInFlight';

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

const severeCasesByRequestedTime = (time) => Math.round(time * 0.15);

const hospitalBedsByRequestedTime = (data, severity) => {
  const { totalHospitalBeds } = data;
  const availableBeds = totalHospitalBeds * 0.35;
  return availableBeds - severity;
};

const casesForICUByRequestedTime = (infections) => infections * 0.05;

const casesForVentilatorsByRequestedTime = (infections) => infections * 0.02;

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
      severeCasesByRequestedTime: severeCasesByRequestedTime(
        infectionsByRequestedTime(data, currentlyInfected(reportedCases, 10))
      ),
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTime(
        data,
        severeCasesByRequestedTime(
          infectionsByRequestedTime(data, currentlyInfected(reportedCases, 10))
        )
      ),
      casesForICUByRequestedTime: casesForICUByRequestedTime(
        infectionsByRequestedTime(data, currentlyInfected(reportedCases, 10))
      ),
      casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTime(
        infectionsByRequestedTime(data, currentlyInfected(reportedCases, 10))
      ),
      dollarsInFlight: dollarsInFlight(
        data,
        infectionsByRequestedTime(data, currentlyInfected(reportedCases, 10))
      )
    },
    severeImpact: {
      currentlyInfected: currentlyInfected(reportedCases, 50),
      infectionsByRequestedTime: infectionsByRequestedTime(
        data,
        currentlyInfected(reportedCases, 50)
      ),
      severeCasesByRequestedTime: severeCasesByRequestedTime(
        infectionsByRequestedTime(data, currentlyInfected(reportedCases, 50))
      ),
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTime(
        data,
        severeCasesByRequestedTime(
          infectionsByRequestedTime(data, currentlyInfected(reportedCases, 50))
        )
      ),
      casesForICUByRequestedTime: casesForICUByRequestedTime(
        infectionsByRequestedTime(data, currentlyInfected(reportedCases, 50))
      ),
      casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTime(
        infectionsByRequestedTime(data, currentlyInfected(reportedCases, 50))
      ),
      dollarsInFlight: dollarsInFlight(
        data,
        infectionsByRequestedTime(data, currentlyInfected(reportedCases, 50))
      )
    }
  };
};
export default covid19ImpactEstimator;
