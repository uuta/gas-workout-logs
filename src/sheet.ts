import { Score } from './score';
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;
import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;

export function sheet(name: string): Sheet | null {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  return spreadsheet.getSheetByName(name);
}

export function write(scores: Record<string, Score>) {
  const scoresSheet = sheet('scores');
  if (scoresSheet === null) {
    throw new Error('scores sheet not found');
  }
  Object.entries(scores).map((entry) => {
    const scoreArr = [entry[0], ...Object.values(entry[1])];
    const position = scoresSheet.createTextFinder(String(scoreArr[0])).findAll();
    if (position.length > 0) {
      const lastPosition = position.at(-1);
      if (!lastPosition) {
        return;
      }
      const range = scoresSheet.getRange(lastPosition.getRow(), 1, 1, scoreArr.length);
      range.setValues([scoreArr]);
      return;
    }
    const targetRow = scoresSheet.getLastRow() + 1;
    const range = scoresSheet.getRange(targetRow, 1, 1, scoreArr.length);
    range.setValues([scoreArr]);
  });
}

export function create(name: string): Spreadsheet {
  return SpreadsheetApp.create(name);
}

export function createSheet(sheet: Spreadsheet, name: string): Sheet {
  return sheet.insertSheet(name);
}

export function addHeaders(sheet: Sheet, headers: string[]): void {
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
}
