export function transpose(matrix) {
  return matrix[0].map((_, c) => matrix.map(r => r[c]));
}

export function min(arr) {
  return arr.reduce((a, b) => Math.min(a, b));
}

export function max(arr) {
  return arr.reduce((a, b) => Math.max(a, b));
}

const normalizeValue = (value, minI, maxI) => (value - minI) / (maxI - minI);

export function findRangeForSymptom(matrix, m2) {
  const maxRange = [];
  const minRange = [];
  const transporedMatrix = transpose(matrix);
  const transporedM2 = transpose(m2);
  transporedMatrix.forEach((row, i) => {
    maxRange.push(max(row.concat(transporedM2[i])));
    minRange.push(min(row.concat(transporedM2[i])));
  });
  return {
    max: maxRange,
    min: minRange,
  };
}

export function normalizeMatrix(matrix, range) {
  return matrix.map(row =>
    row.map((el, i) => normalizeValue(el, range.min[i], range.max[i])),
  );
}

const calculateCoeff = (row1, row2) => {
  return max(row1) - min(row2);
};

export function getCompactnessCoefficient(healthy, sick) {
  const coeff = [];
  const transporedSick = transpose(sick);
  const transporedHealthy = transpose(healthy);
  transporedHealthy.forEach((row, i) => coeff.push(calculateCoeff(row, transporedSick[i])));
  return coeff;
}
