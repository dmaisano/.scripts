const { prompt } = require('enquirer');

// terminal prompt
const promptUser = async fileName => {
  const result = await prompt({
    type: 'select',
    name: 'type',
    message: 'Select conversion type',
    choices: ['docx to pdf', 'image to pdf'],
  }).catch(e => {
    console.error(e);
    process.exit(1);
  });

  switch (result.type) {
    case 'docx to pdf':
      console.log('owo');
      return;
      convertHelper(fileName, 'exportPDF')
        .then(arrayBuffer => {
          fs.writeFileSync(
            `${fileName.split('.')[0]}.pdf`,
            new Uint8Array(arrayBuffer)
          );
          console.log(`successfully converted file 📝`);
        })
        .catch(e => {
          console.error(e);
        });
      break;

    case 'image to pdf':
      return;

    default:
      exit(1);
  }
};

if (process.argv.length < 3) {
  console.log('missing file');
  process.exit(1);
} else if (process.argv.length > 3) {
  console.log('too many args');
  process.exit(1);
}

const fileNameWithExt = process.argv[2].substring(
  process.argv[2].lastIndexOf('/') + 1
);

promptUser(fileNameWithExt);
