import { Score } from "./score";
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

export function sheet(name: string): Sheet | null {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  return spreadsheet.getSheetByName(name);
}

export function write(scores: Record<string, Score>) {
  const scoresSheet = sheet("scores");
  if (scoresSheet === null) {
    throw new Error("scores sheet not found");
  }
  Object.entries(scores).map((entry) => {
    const scoreArr = [entry[0], ...Object.values(entry[1])];
    const position = scoresSheet
      .createTextFinder(String(scoreArr[0]))
      .findAll();
    if (position.length > 0) {
      const lastPosition = position.at(-1);
      if (!lastPosition) {
        return;
      }
      const range = scoresSheet.getRange(
        lastPosition.getRow(),
        1,
        1,
        scoreArr.length,
      );
      range.setValues([scoreArr]);
      return;
    }
    const targetRow = scoresSheet.getLastRow() + 1;
    const range = scoresSheet.getRange(targetRow, 1, 1, scoreArr.length);
    range.setValues([scoreArr]);
  });
}
