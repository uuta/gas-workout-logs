import { createForm, updateForm } from '../form';
import { addHeaders, createSheet } from '../sheet';

type WorkoutEntities = {
  category: string;
  youtubeUrl: string;
};

/**
 * Add keys and values whatever you want to use in the form
 */
const workoutTitles: Record<string, WorkoutEntities> = {
  'Incline dumbbell press': {
    category: 'chest',
    youtubeUrl: '8iPEnn-ltC8&ab_channel=ScottHermanFitness',
  },
  'Incline dumbbell fly': {
    youtubeUrl: 'JSDpq14vCZ8&ab_channel=PureGym',
    category: 'chest',
  },
  'Chest press': {
    youtubeUrl: 'xUm0BiZCWlQ&ab_channel=ScottHermanFitness',
    category: 'chest',
  },
  'Hip thrust': {
    youtubeUrl: 'SEdqd1n0cvg&ab_channel=ScottHermanFitness',
    category: 'butt',
  },
  'Leg press': {
    youtubeUrl: 'qCR9bN3G1t4&ab_channel=PureGym',
    category: 'legs',
  },
  'Inner Thigh': {
    youtubeUrl: 'CjAVezAggkI&ab_channel=PureGym',
    category: 'legs',
  },
  'Outer Thigh': {
    youtubeUrl: 'G_8LItOiZ0Q&ab_channel=PureGym',
    category: 'legs',
  },
  'Arnold press': {
    youtubeUrl: 'jeJttN2EWCo&ab_channel=PureGym',
    category: 'shoulder',
  },
  'Rear raise': {
    youtubeUrl: 'nlkF7_2O_Lw&ab_channel=PureGym',
    category: 'shoulder',
  },
  'Side raise': {
    youtubeUrl: 'z-kOn7flIZg&ab_channel=PureGym',
    category: 'shoulder',
  },
  'Front raise': {
    youtubeUrl: 'zkP0MsTcIVU&ab_channel=PureGym',
    category: 'shoulder',
  },
  'Incline side raise': {
    youtubeUrl: 'Ak8RCI35y40&ab_channel=JoshBowers',
    category: 'shoulder',
  },
  'Knee to chest': {
    youtubeUrl: '9hVZ4rc2_3Y&ab_channel=LIVESTRONG.COM',
    category: 'stomach',
  },
  'Close Press': {
    youtubeUrl: 'fZuQpjhaR_M&ab_channel=PureGym',
    category: 'chest',
  },
  'Hyght dumbbell fly': {
    youtubeUrl: 'ADDBZPi6Up8&ab_channel=SETFORSET',
    category: 'chest',
  },
  'Kettlebell Swing': {
    youtubeUrl: '6A0yJetx7hg&ab_channel=PureGym',
    category: 'stomach',
  },
};

type SheetEntities = {
  headers: string[];
};

const workoutSheets: Record<string, SheetEntities> = {
  scores: {
    headers: ['Timestamp', 'shoulder', 'chest', 'butt', 'legs', 'stomach'],
  },
  categories: {
    headers: ['category_name', 'weighting'],
  },
  category_relations: {
    headers: ['category_relation_id', 'name', 'category_name', 'count_name'],
  },
  status: {
    headers: ['last_updated_at', 'row'],
  },
};

export function workoutLogs() {
  const entities: Record<string, string> = {};
  for (const [key, value] of Object.entries(workoutTitles)) {
    entities[key] = value.youtubeUrl;
  }

  // Get the current spreadsheet
  let sheet = SpreadsheetApp.getActiveSpreadsheet();
  const formName = 'Workout logs';

  let existingForms = null;
  try {
    existingForms = FormApp.openByUrl(sheet?.getFormUrl() ?? '');
  } catch (e) {
    // Ignore the error if the form doesn't exist
  }
  if (existingForms) {
    updateForm({
      entities,
      form: existingForms,
    });
  } else {
    // Create a form
    const { sheet: currentSheet } = createForm({
      name: formName,
      description: 'Workout form for the gym. Please fill out the form below.',
      entities,
      destSheet: sheet,
    });
    sheet = currentSheet;

    // Create sheets
    Object.entries(workoutSheets).forEach(([sheetName, v]) => {
      const sheetInstance = createSheet(sheet, sheetName);
      addHeaders(sheetInstance, v.headers);
    });
  }
  // Category relations that values are based on the workoutTitles
  // string[][0]: category_relation_id
  // string[][1]: name
  // string[][2]: category_name
  // string[][3]: count_name
  const categoryRelations: string[][] = [];
  Object.entries(workoutTitles).forEach(([workout, { category }], index) => {
    categoryRelations.push([
      String(index + 1),
      `${workout} (weight)`,
      category,
      `${workout} (count)`,
    ]);
  });
  const CategoryRelationsSheet = sheet.getSheetByName('category_relations');
  if (CategoryRelationsSheet === null) {
    throw new Error('category relations sheet not found');
  }
  CategoryRelationsSheet.getRange(2, 1, categoryRelations.length, 4).setValues(categoryRelations);

  // Log the form URL and the sheet URL
  Logger.log(sheet.getFormUrl());
  Logger.log(sheet.getUrl());
}
