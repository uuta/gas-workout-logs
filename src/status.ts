import { sheet } from './sheet';

type Status = {
  lastUpdatedAt?: string;
  row: number;
};

export function getStatus(): Status {
  const statusSheet = sheet('status');
  if (statusSheet === null) {
    throw new Error('status sheet not found');
  }
  const status: string[][] = statusSheet.getDataRange().getValues();
  if (status[1] === undefined) {
    return {
      row: 2,
    };
  }
  return {
    lastUpdatedAt: status[1][0],
    row: Number(status[1][1]),
  };
}

export function setStatus() {
  const logsSheet = sheet('logs');
  if (logsSheet === null) {
    throw new Error('logs sheet not found');
  }
  const timestamp = logsSheet.getRange(logsSheet.getLastRow(), 1).getValues();
  const statusSheet = sheet('status');
  if (statusSheet === null) {
    throw new Error('status sheet not found');
  }
  const range = statusSheet.getRange(2, 1, 1, 2);
  range.setValues([[timestamp, logsSheet.getLastRow()]]);
}
