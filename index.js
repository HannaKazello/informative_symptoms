import XLSX from 'xlsx';

const workbook = XLSX.readFile('sheet.xlsx');
const sheetNameList = workbook.SheetNames;
const healthy = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[1]]);
const sick = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[2]]);

const symptoms = Object.keys(healthy[0]).slice(1);
const healthyTab = healthy.map(row => Object.values(row).slice(1));
const sickTab = sick.map(row => Object.values(row).slice(1));

function transpose(matrix) {
  return matrix[0].map((_, c) => matrix.map(r => r[c]));
}

function min(arr) {
  return arr.reduce((a, b) => Math.min(a, b));
}

function max(arr) {
  return arr.reduce((a, b) => Math.max(a, b));
}

const normalizeValue = (value, minI, maxI) => (value - minI) / (maxI - minI);

function findRangeForSymptom (matrix) {
  const maxRange = [];
  const minRange = [];
  const transporedMatrix = transpose(matrix);
  transporedMatrix.forEach((row) => {
    maxRange.push(max(row));
    minRange.push(min(row));
  });
  return {
    max: maxRange,
    min: minRange,
  };
}

function normalizeMatrix(matrix) {
  const range = findRangeForSymptom(matrix);
  return matrix.map(row =>
    row.map((el, i) => normalizeValue(el, range.min[i], range.max[i])),
  );
}

console.log(normalizeMatrix([[1,2,3], [4,5,6], [7,8,9]]));
