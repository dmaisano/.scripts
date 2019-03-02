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

module.exports = {
  defaults,
  addEmail,
};
