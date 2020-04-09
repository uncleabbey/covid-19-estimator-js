const days = 'days';
const weeks = 'weeks';
const months = 'months';

const monthInDays = 30;
const weekInDays = 7;
const bestCaseInfectionsMultiplier = 10;
const worstCaseInfectionsMultiplier = 50;

const getImpactCurrentlyInfected = (reportedCases) => reportedCases * bestCaseInfectionsMultiplier;

const getSevereCurrentlyInfected = (reportedCases) => reportedCases * worstCaseInfectionsMultiplier;

const getNormalizedPeriod = (timeToElapse, periodType = days) => {
  switch (periodType) {
    case months:
      return timeToElapse * monthInDays;
    case weeks:
      return timeToElapse * weekInDays;
    default:
      return timeToElapse;
  }
};

const getInfectionsByRequestedTime = (currentlyInfected, period) => {
  const factor = Math.floor(period / 3);
  return currentlyInfected * (2 ** factor);
};

const getSevereCasesCount = (numberOfInfections) => numberOfInfections * 0.15;

const getRemainingHospitalBedsCount = (
  numberOfSevereCases,
  totalBeds
) => {
  const availableBeds = totalBeds * 0.35;
  return availableBeds - numberOfSevereCases;
};

const getCasesForICUCount = (numberOfInfections) => numberOfInfections * 0.05;

const getCasesForVentilatorsCount = (numberOfInfections) => numberOfInfections * 0.02;

const getDollarsInFlight = (
  numberOfInfections,
  avgIncomePopulationPercentage,
  avgDailyIncome,
  period
) => {
  const result = numberOfInfections * avgIncomePopulationPercentage * avgDailyIncome * period;
  return result;
};

const covid19ImpactEstimator = (data) => {
  const result = {
    impact: {},
    severeImpact: {}
  };


  // Express period in days
  const period = getNormalizedPeriod(data.timeToElapse, data.periodType);


  // Add the input data
  result.data = data;


  // Add currently Infected
  result.impact.currentlyInfected = getImpactCurrentlyInfected(data.reportedCases);
  result.severeImpact.currentlyInfected = getSevereCurrentlyInfected(data.reportedCases);


  // Add infections by requested time
  result.impact.infectionsByRequestedTime = getInfectionsByRequestedTime(
    result.impact.currentlyInfected,
    period
  );

  result.severeImpact.infectionsByRequestedTime = getInfectionsByRequestedTime(
    result.severeImpact.currentlyInfected,
    period
  );


  // Add severe cases by requested time
  result.impact.severeCasesByRequestedTime = getSevereCasesCount(
    result.impact.infectionsByRequestedTime
  );

  result.severeImpact.severeCasesByRequestedTime = getSevereCasesCount(
    result.severeImpact.infectionsByRequestedTime
  );


  // Add hospital beds by requested time
  result.impact.hospitalBedsByRequestedTime = getRemainingHospitalBedsCount(
    result.impact.severeCasesByRequestedTime,
    data.totalHospitalBeds
  );

  result.severeImpact.hospitalBedsByRequestedTime = getRemainingHospitalBedsCount(
    result.severeImpact.severeCasesByRequestedTime,
    data.totalHospitalBeds
  );


  // Add cases for ICU by requested time
  result.impact.casesForICUByRequestedTime = getCasesForICUCount(
    result.impact.infectionsByRequestedTime
  );

  result.severeImpact.casesForICUByRequestedTime = getCasesForICUCount(
    result.severeImpact.infectionsByRequestedTime
  );

  // Add cases for ventilators by requested time
  result.impact.casesForVentilatorsByRequestedTime = getCasesForVentilatorsCount(
    result.impact.infectionsByRequestedTime
  );

  result.severeImpact.casesForVentilatorsByRequestedTime = getCasesForVentilatorsCount(
    result.severeImpact.infectionsByRequestedTime
  );

  // Add money lost over period of 30 days
  result.impact.dollarsInFlight = getDollarsInFlight(
    result.impact.infectionsByRequestedTime,
    data.region.avgDailyIncomePopulation,
    data.region.avgDailyIncomeInUSD,
    period
  );

  result.severeImpact.dollarsInFlight = getDollarsInFlight(
    result.severeImpact.infectionsByRequestedTime,
    data.region.avgDailyIncomePopulation,
    data.region.avgDailyIncomeInUSD,
    period
  );

  return result;
};

export default covid19ImpactEstimator;
