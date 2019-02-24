#!/usr/bin/env node

const { prompt } = require('enquirer');
const { defaults, addEmail, changeEmail, removeEmail } = require('./utils');

async function gitConfig(scope = '') {
  defaults();

  if (scope === '' && process.argv.length < 3) {
    const response = await prompt({
      type: 'select',
      name: 'scope',
      message: 'select git config scope',
      choices: ['global', 'local'],
    });

    scope = `--${response.scope}`;
  } else {
    scope = process.argv[2];
    scope = scope.startsWith('--') ? scope : `--${scope}`;
  }

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
    case 'change user email':
      await changeEmail(scope);
      await gitConfig();
      break;
    case 'add email':
      await addEmail();
      await gitConfig();
      break;
    case 'remove email':
      await removeEmail();
      await gitConfig();
      break;
    case 'change username':
      break;
    default:
      break;
  }
}

// suppress 'UnhandledPromiseRejectionWarning'
process.on('unhandledRejection', () => {
  process.exit(1);
});

gitConfig();
