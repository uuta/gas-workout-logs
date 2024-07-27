const baseYouTubeUrl = 'https://www.youtube.com/watch?v=';

export function createForm({
  name,
  description,
  entities,
  destSheet,
}: {
  name: string;
  description: string;
  entities: Record<string, string>;
  destSheet?: GoogleAppsScript.Spreadsheet.Spreadsheet;
}) {
  const form = FormApp.create(name);

  form.setDescription(description);

  Object.entries(entities).forEach(([title, videoUrl]) => {
    form
      .addVideoItem()
      .setTitle(`How to do ${title}`)
      .setVideoUrl(baseYouTubeUrl + videoUrl);

    form.addTextItem().setTitle(`${title} (weight)`).setRequired(false);

    form.addTextItem().setTitle(`${title} (count)`).setRequired(false);
    Logger.log(`Added ${title} in createForm`);
  });

  let sheet: GoogleAppsScript.Spreadsheet.Spreadsheet;
  if (destSheet) {
    sheet = destSheet;
  } else {
    sheet = SpreadsheetApp.create(name);
  }

  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());
  let formResponseSheet = sheet.getSheets().find((s) => s.getFormUrl() !== null);
  if (!formResponseSheet) {
    formResponseSheet = sheet.insertSheet('logs');
  } else {
    formResponseSheet.setName('logs');
  }

  return { sheet, form };
}

export function updateForm({
  entities,
  form,
}: {
  entities: Record<string, string>;
  form: GoogleAppsScript.Forms.Form;
}) {
  const items = form.getItems();
  const objItems = items.reduce<{ [key: string]: GoogleAppsScript.Forms.Item }>((acc, item) => {
    const title = item.getTitle();
    acc[title] = item;
    return acc;
  }, {});

  Object.entries(entities).forEach(([title, videoUrl]) => {
    if (objItems[`How to do ${title}`]) {
      return;
    }
    form
      .addVideoItem()
      .setTitle(`How to do ${title}`)
      .setVideoUrl(baseYouTubeUrl + videoUrl);

    form.addTextItem().setTitle(`${title} (weight)`).setRequired(false);

    form.addTextItem().setTitle(`${title} (count)`).setRequired(false);
    Logger.log(`Added ${title} in updateForm`);
  });
}
