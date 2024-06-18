import { sheet } from './sheet';
import { Score, isKeyOfScore } from './score';

export type ObjCategoryRelations = {
  countName: string;
  categoryName: keyof Score;
};

export function getObjCategoryRelations(): Record<string, ObjCategoryRelations> {
  const categoryRelationsSheet = sheet('category_relations');
  if (categoryRelationsSheet === null) {
    throw new Error('category_relations sheet not found');
  }
  const categoriesSheet = sheet('categories');
  if (categoriesSheet === null) {
    throw new Error('categories sheet not found');
  }
  const categoryRelations: string[][] = categoryRelationsSheet.getDataRange().getValues();
  const [, ...categories] = categoriesSheet.getDataRange().getValues();
  categoryRelations.forEach((categoryRelation, i) => {
    categories.forEach((category) => {
      if (categoryRelation[2] === category[0]) {
        categoryRelations[i] = Array.from(new Set([...categoryRelation, ...category]));
      }
    });
  });

  // categoryRelations to objects
  const objCategoryRelations: Record<string, ObjCategoryRelations> = {};
  for (let i = 1; i < categoryRelations.length; i++) {
    const row = categoryRelations[i];
    if (!isKeyOfScore(row[2])) {
      throw new Error(`Invalid categoryName: ${row[2]}`);
    }
    const obj: ObjCategoryRelations = {
      countName: row[3],
      categoryName: row[2],
    };
    objCategoryRelations[row[1]] = obj;
  }
  return objCategoryRelations;
}
