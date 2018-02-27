import XLSX from 'xlsx';
import { normalizeMatrix } from './utils';

const workbook = XLSX.readFile('sheet.xlsx');
const sheetNameList = workbook.SheetNames;
const healthy = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[1]]);
const sick = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[2]]);

const symptoms = Object.keys(healthy[0]).slice(1);
const healthyTab = healthy.map(row => Object.values(row).slice(1));
const sickTab = sick.map(row => Object.values(row).slice(1));

console.log(normalizeMatrix([[1,2,3], [4,5,6], [7,8,9]]));
