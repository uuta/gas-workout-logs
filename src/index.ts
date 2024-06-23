import { write } from './sheet';
import { getObjCategoryRelations } from './categoryRelations';
import { getObjLogs } from './workoutLogs';
import { scoring } from './score';
import { setStatus } from './status';
import { workoutLogs } from './template/workoutLogs';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function main() {
  try {
    const objLogs = getObjLogs();
    const objCategoryRelations = getObjCategoryRelations();
    const scores = scoring({ objLogs, objCategoryRelations });
    write(scores);
    setStatus();
  } catch (e) {
    if (e instanceof Error) {
      console.log('Failed with error %s', e.message);
      return;
    }
    console.log('Failed with error %s', e);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createTemplate() {
  workoutLogs();
}
