const { getFoldMode } = require('../statusBar');
const classes = new Map();

function rememberClass(filePath, lineNumber){
  if(!getFoldMode()) return;
  if (!classes.has(filePath)) {
    classes.set(filePath, new Set());
  }
  classes.get(filePath).add(lineNumber);
}

function forgetClass(filePath, lineNumber){
  if(!getFoldMode()) return;
  if (!classes.has(filePath)) return;
  classes.get(filePath).delete(lineNumber);
}

function getClass(filePath){
  if(!getFoldMode()) return;
  return classes.get(filePath);
}


module.exports = { rememberClass, forgetClass, getClass };