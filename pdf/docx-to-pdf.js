const fs = require('fs-extra');
const docx = require('@nativedocuments/docx-wasm');
const { ND_DEV_ID, ND_DEV_SECRET } = require('./config');

// init docx engine
docx
  .init({
    ND_DEV_ID,
    ND_DEV_SECRET,
    ENVIRONMENT: 'NODE',
    LAZY_INIT: true,
  })
  .catch(function(e) {
    console.error(e);
  });

async function convertHelper(document, exportFct) {
  const api = await docx.engine();
  await api.load(document);
  const arrayBuffer = await api[exportFct]();
  await api.close();
  return arrayBuffer;
}

module.exports = {
  convertHelper,
};
