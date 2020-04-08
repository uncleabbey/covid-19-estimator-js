import infectionsByRequestedTime from './infectionsByRequestedTime';

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


const severeCasesByRequestedTime = (time) => (time * (15 / 100));


const hospitalBedsByRequestedTime = (data, severity) => {
  const { totalHospitalBeds } = data;
  const availableBeds = (totalHospitalBeds * (35 / 100));
  return availableBeds - severity;
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
      severeCasesByRequestedTime: severeCasesByRequestedTime(
        infectionsByRequestedTime(
          data,
          currentlyInfected(reportedCases, 10)
        )
      ),
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTime(
        data,
        severeCasesByRequestedTime(
          infectionsByRequestedTime(
            data,
            currentlyInfected(reportedCases, 10)
          )
        )
      )
    },
    severeImpact: {
      currentlyInfected: currentlyInfected(reportedCases, 50),
      infectionsByRequestedTime: infectionsByRequestedTime(
        data,
        currentlyInfected(reportedCases, 50)
      ),
      severeCasesByRequestedTime: severeCasesByRequestedTime(
        infectionsByRequestedTime(
          data,
          currentlyInfected(reportedCases, 50)
        )
      ),
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTime(
        data,
        severeCasesByRequestedTime(
          infectionsByRequestedTime(
            data,
            currentlyInfected(reportedCases, 50)
          )
        )
      )
    }
  };
};
export default covid19ImpactEstimator;
