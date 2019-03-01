const { exec } = require('child_process');

const foo = async () => {
  const bar = exec('echo', ['$HOME']);

  await bar.stdout.on('data', data => {
    console.log(`${data}`);
  });
};

foo();
