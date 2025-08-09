const vscode = require('vscode');

const { extractClass } = require('../utils/helpers');
const { decorateClass, removeDecoration } = require('../decorators/classDecoration');
const { rememberClass, forgetClass, getClass } = require('../utils/memory');
const { getFoldMode } = require('../statusBar');

function foldAllClass(editor) {
  if (!getFoldMode()) return;
  const document = editor.document;
  const currentFile = document.getText();
  const currentFileLine = currentFile.split('\n');
  const currentPath = document.uri.fsPath;

  currentFileLine.forEach((line, lineNumber) => {
    const classMatch = extractClass(line);
    if (lineNumber < 0) return;
    if (!classMatch) return;
    const startChar = classMatch.index;
    const endChar = startChar + classMatch[0].length;
    const startPos = new vscode.Position(lineNumber, startChar);
    const endPos = new vscode.Position(lineNumber, endChar);
    const classValue = classMatch[1];
    const foldedClasses = classValue.split(' ').slice(0, 2).join(' ') + '...';
    const fullClass = classValue; 
    const classes = classValue.split(' ');
    const isFolded = getClass(currentPath);
    const folded = isFolded?.has(lineNumber);
   
    
      if (folded) {
        removeDecoration(startPos, endPos);
        forgetClass(currentPath, lineNumber);
      } else{
        if (classes.length > 2){
        decorateClass(foldedClasses, fullClass, startPos, endPos);
        rememberClass(currentPath, lineNumber);
        console.log(getClass(currentPath));
      } else{
        return;
      }
    }


  });
}

module.exports = { foldAllClass };