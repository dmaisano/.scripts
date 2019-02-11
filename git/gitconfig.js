#!/usr/bin/env node

const { prompt } = require('enquirer');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');

const db = low(adapter);

db.defaults({ user: {}, emails: [] }).write();

async function userConfig() {
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

  const action = await prompt({
    type: 'select',
    name: 'action',
    message: 'select action to perform',
    choices: ['select email', 'change username'],
    // "email address updated! ✉️"
  });

  switch (action) {
    case 'select email':
      break;
    case 'change username':
      break;
  }
}

userConfig();
