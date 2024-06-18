import { sheet } from './sheet';
import { getStatus } from './status';

export function getObjLogs(): Record<string, number>[] {
  const logsSheet = sheet('logs');
  if (logsSheet === null) {
    throw new Error('logs sheet not found');
  }
  const { lastUpdatedAt, row } = getStatus();
  const logs = logsSheet
    .getRange(row, 1, logsSheet.getLastRow() - row + 1, logsSheet.getLastColumn())
    .getValues();
  if (
    row !== 2 &&
    lastUpdatedAt !== undefined &&
    new Date(lastUpdatedAt).toLocaleString() !== new Date(logs[0][0]).toLocaleString()
  ) {
    throw new Error('previous processing refers to the different data');
  }
  logs[0].shift();

  // logs to objects
  const logsHeaders: string[] = logsSheet
    .getRange(1, 1, 1, logsSheet.getLastColumn())
    .getValues()[0];
  const objLogs: Record<string, number>[] = [];
  for (let i = 1; i < logs.length; i++) {
    const row = logs[i];
    const obj: Record<string, number> = {};
    for (let j = 0; j < logsHeaders.length; j++) {
      obj[logsHeaders[j]] = row[j];
    }
    objLogs.push(obj);
  }
  return objLogs;
}
