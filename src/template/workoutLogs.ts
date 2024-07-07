import { createForm } from '../form';
import { addHeaders, createSheet } from '../sheet';

const workoutTitles: Record<string, string> = {
  'Incline dumbbell press': '8iPEnn-ltC8&ab_channel=ScottHermanFitness',
  'Incline dumbbell fly': 'JSDpq14vCZ8&ab_channel=PureGym',
  'Chest press': 'xUm0BiZCWlQ&ab_channel=ScottHermanFitness',
  'Hip thrust': 'SEdqd1n0cvg&ab_channel=ScottHermanFitness',
  'Leg press': 'qCR9bN3G1t4&ab_channel=PureGym',
  'Inner Thigh': 'CjAVezAggkI&ab_channel=PureGym',
  'Outer Thigh': 'G_8LItOiZ0Q&ab_channel=PureGym',
  'Arnold press': 'jeJttN2EWCo&ab_channel=PureGym',
  'Rear raise': 'nlkF7_2O_Lw&ab_channel=PureGym',
  'Side raise': 'z-kOn7flIZg&ab_channel=PureGym',
  'Front raise': 'zkP0MsTcIVU&ab_channel=PureGym',
  'Incline side raise': 'Ak8RCI35y40&ab_channel=JoshBowers',
  'Knee to chest': '9hVZ4rc2_3Y&ab_channel=LIVESTRONG.COM',
  'Close Press': 'fZuQpjhaR_M&ab_channel=PureGym',
  'Hyght dumbbell fly': 'ADDBZPi6Up8&ab_channel=SETFORSET',
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
  const { sheet } = createForm({
    name: 'Workout logs',
    description: 'Workout form for the gym. Please fill out the form below.',
    entities: workoutTitles,
  });
  Object.entries(workoutSheets).forEach(([sheetName, v]) => {
    const sheetInstance = createSheet(sheet, sheetName);
    addHeaders(sheetInstance, v.headers);
  });
}