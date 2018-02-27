import XLSX from 'xlsx';
import { normalizeMatrix, getCompactnessCoefficient, findRangeForSymptom } from './utils';

const workbook = XLSX.readFile('sheet.xlsx');
const sheetNameList = workbook.SheetNames;
const healthy = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[1]]);
const sick = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[2]]);

const symptoms = Object.keys(healthy[0]).slice(1);
const healthyTab = healthy.map(row => Object.values(row).slice(1));
const sickTab = sick.map(row => Object.values(row).slice(1));

const range = findRangeForSymptom(sickTab, healthyTab);

const coeff = getCompactnessCoefficient(normalizeMatrix(healthyTab, range), normalizeMatrix(sickTab, range));
const selection = symptoms.map((el, i) => {
  const temp = {};
  temp[el] = coeff[i];
  return temp;
});

console.log('coeff: ', Array.from(selection).sort((a, b) => Object.values(a) - Object.values(b)));

const range2 = findRangeForSymptom(normalizeMatrix(healthyTab, range), normalizeMatrix(sickTab, range));
const area = [];
selection.forEach((v, i) => {
  if (range2.max[i] - range2.min[i] > Object.values(v)[0] * 2) {
    area.push(Object.keys(v));
  }
});

console.log('area: ', area);
