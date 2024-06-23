const baseYouTubeUrl = 'https://www.youtube.com/watch?v=';

export function createForm({
  name,
  description,
  entities,
}: {
  name: string;
  description: string;
  entities: Record<string, string>;
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

  const sheet = SpreadsheetApp.create(name + ' Responses');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());
  return { sheet, form };
}
