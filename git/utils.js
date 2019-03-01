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

  if (!validEmail.test(response.email)) {
    console.log('invalid email entered');
    return await addEmail();
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
const changeEmail = async (scope = '') => {
  const emails = db.get('emails').value();

  if (emails.length === 0) {
    console.log('no emails added');
    await addEmail();
    await changeEmail();
  }

  const response = await prompt({
    type: 'select',
    name: 'selectedEmail',
    message: 'select an email',
    choices: emails,
  });

  const email = response.selectedEmail;

  const { spawn } = require('child_process');

  scope === '--global' ? '--global' : '';

  const gitEmail =
    scope === '--global'
      ? spawn('git', ['config', '--global', 'user.email', email])
      : spawn('git', ['config', 'user.email', email]);

  await gitEmail.stdout.on('data', data => {
    console.log(`${data}`);
  });

  await gitEmail.stderr.on('data', data => {
    console.log(`${data}`);
  });

  await gitEmail.on('close', code => {
    process.exit(code);
  });

  // console.log(`changed email to ${email} ✉️`);
};

module.exports = {
  defaults,
  addEmail,
  changeEmail,
  removeEmail,
};
