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

export function findRangeForSymptom(matrix) {
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

export function normalizeMatrix(matrix) {
  const range = findRangeForSymptom(matrix);
  return matrix.map(row =>
    row.map((el, i) => normalizeValue(el, range.min[i], range.max[i])),
  );
}
