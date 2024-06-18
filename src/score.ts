import { sheet } from './sheet';
import { ObjCategoryRelations } from './categoryRelations';
import { getStatus } from './status';

export type Score = {
  shoulder: number;
  chest: number;
  butt: number;
  legs: number;
  stomach: number;
};

const scoreKeys: (keyof Score)[] = ['shoulder', 'chest', 'butt', 'legs', 'stomach'];

export function isKeyOfScore(key: string): key is keyof Score {
  return scoreKeys.includes(key as keyof Score);
}

export function scoring({
  objLogs,
  objCategoryRelations,
}: {
  objLogs: Record<string, number>[];
  objCategoryRelations: Record<string, ObjCategoryRelations>;
}): Record<string, Score> {
  const scoresSheet = sheet('scores');
  if (scoresSheet === null) {
    throw new Error('scores sheet not found');
  }
  const scores: string[][] = scoresSheet.getDataRange().getValues();
  const [, ...scoreRows] = scores;
  const { lastUpdatedAt } = getStatus();
  const score = {} as Record<string, Score>;
  scoreRows.forEach((row) => {
    const date = new Date(row[0]);
    // TODO: consider summer time
    date.setHours(date.getHours() + 11);
    const rowDate = date.toLocaleDateString('ja-JP');
    if (lastUpdatedAt === undefined) {
      score[rowDate] = {
        shoulder: Number(row[1]),
        chest: Number(row[2]),
        butt: Number(row[3]),
        legs: Number(row[4]),
        stomach: Number(row[5]),
      };
      return;
    }
    const lastUpdatedAtDate = new Date(lastUpdatedAt).toLocaleDateString('ja-JP');
    if (rowDate >= lastUpdatedAtDate) {
      score[rowDate] = {
        shoulder: Number(row[1]),
        chest: Number(row[2]),
        butt: Number(row[3]),
        legs: Number(row[4]),
        stomach: Number(row[5]),
      };
    }
  });
  objLogs.forEach((l) => {
    Object.entries(objCategoryRelations).forEach(([key, value]) => {
      if (l[key] === undefined) {
        return;
      }
      if (l[value.countName] === undefined) {
        return;
      }
      const date = new Date(l.Timestamp).toLocaleDateString('ja-JP');
      if (!score[date]) {
        score[date] = {
          shoulder: 0,
          chest: 0,
          butt: 0,
          legs: 0,
          stomach: 0,
        };
      }
      if (value.categoryName in score[date]) {
        score[date][value.categoryName] += l[key] * l[value.countName];
      }
    });
  });
  return score;
}
