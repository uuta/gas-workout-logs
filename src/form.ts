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
  });

  const sheet = destSheet ?? SpreadsheetApp.create(name);
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  return { sheet, form };
}
