const { prompt } = require('enquirer');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(`${__dirname}/db.json`);
const db = low(adapter);

// helper utilities / functions

// DB defaults
const defaults = () => {
  db.defaults({ user: '', emails: [] }).write();
};

// wrap the prompt in a try / catch block
const userPrompt = promptFunc => {
  try {
    promptFunc;
  } catch {
    return;
  }
};

// add an email
const addEmail = async () => {
  const response = await prompt({
    type: 'input',
    name: 'email',
    message: 'enter a new email',
  });

  db.get('emails')
    .push(response)
    .write();

  console.log(`added email ${response.email} ✉️`);
};

// remove an email
const removeEmail = async () => {
  db.get('emails')
    .remove(email)
    .write();
};

module.exports = {
  defaults,
  addEmail,
  removeEmail,
};
