#!/usr/bin/env node

const { prompt } = require('enquirer');
const { defaults, addEmail, removeEmail } = require('./utils');

async function gitConfig() {
  defaults();
  let flag;

  if (process.argv.length < 3) {
    flag = await prompt({
      type: 'select',
      name: 'flag',
      message: 'select config scope',
      choices: ['global', 'local'],
    });
  } else {
    flag = process.argv[2];
    flag = flag.startsWith('--') ? flag.slice(2, flag.length) : flag;
    flag = { flag };
  }

  const response = await prompt({
    type: 'select',
    name: 'action',
    message: 'select action to perform',
    choices: ['select email', 'add email', 'remove email', 'change username'],
    // "email address updated! ✉️"
  });

  switch (response.action) {
    case 'select email':
      break;
    case 'add email':
      addEmail();
      break;
    case 'remove email':
      removeEmail();
      break;
    case 'change username':
      break;
  }
}

gitConfig();
