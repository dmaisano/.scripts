/**
 * utils.js
 * gitconfig utilities / functions
 */

const { prompt } = require('enquirer');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(`${__dirname}/db.json`);
const db = low(adapter);

// basic valid email regex
const validEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

// create default file config
const defaults = () => {
  db.defaults({ user: '', emails: [] }).write();
};

const addEmail = async (message = 'enter a new email') => {
  const response = await prompt({
    type: 'input',
    name: 'email',
    message,
  });

  let email = response.email;

  while (!validEmail.test(email)) {
    console.log('invalid email entered');
    email = await addEmail(scope, message);
    return;
  }

  db.get('emails')
    .push(response.email)
    .write();

  console.log(`added email ${response.email} ✉️`);
};

const removeEmail = async () => {
  db.get('emails')
    .remove(email)
    .write();
};

// choose an email to associate with git
const changeEmail = async (scope = '--local') => {
  const emails = db.get('emails').value();

  let email = '';

  if (emails.length === 0) {
    console.log('no emails added');
    email = await addEmail();
    email = email.email;

    return;
  }

  const response = await prompt({
    type: 'select',
    name: 'selectedEmail',
    message: 'select an email',
    choices: emails,
  });

  const { spawn } = require('child_process');
  const gitEmail = spawn('git', ['config', scope, 'user.email', email]);

  gitEmail.stdout.on('data', (data) => {
    console.log(`${data}`);
  });

  gitEmail.stderr.on('data', (data) => {
    console.log(`${data}`);
  });

  gitEmail.on('close', (code) => {
    process.exit(code);
  });

  console.log(`changed email to ${email} ✉️`);
};

module.exports = {
  defaults,
  addEmail,
  changeEmail,
  removeEmail,
};
