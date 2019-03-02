const { prompt } = require('enquirer');
const { defaults, addEmail } = require('./functions');

const gitConfig = async (scope = '') => {
  defaults();

  const response = await prompt({
    type: 'select',
    name: 'action',
    message: 'select action to perform',
    choices: [
      'change user email',
      'add email',
      'remove email',
      'change username',
      'exit',
    ],
  });

  switch (response.action) {
    case 'add email':
      await addEmail();
      return await gitConfig();

    default:
      break;
  }
};

// suppress 'UnhandledPromiseRejectionWarning'
process.on('unhandledRejection', () => {
  process.exit(1);
});

let arg = process.argv.length < 3 ? process.argv[2] : '';
arg = arg === '--global' ? arg : '';

gitConfig(arg);
