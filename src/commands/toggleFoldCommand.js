const vscode = require('vscode');
const { extractClass } = require('../utils/helpers');
const { decorateClass, removeDecoration } = require('../decorators/classDecoration');
const { rememberClass, forgetClass, getClass } = require('../utils/memory');
const { getFoldMode } = require('../statusBar')


function toggleFold(editor, lineNumber){
  if (!getFoldMode()) return;
  const currentLine = editor.document.lineAt(lineNumber).text;
  if (!currentLine.includes('class=')) return vscode.window.showErrorMessage('No content in the selected line');
  if (!editor || !lineNumber) return vscode.window.showErrorMessage('Please open a file and select a line');
  const extractedClass = extractClass(currentLine);
  const tailwindClasses = extractedClass[1].split(' ');
  const currentPath = editor.document.uri.fsPath;
  const foldedLines =  getClass(currentPath);
  const isFolded = foldedLines && foldedLines.has(lineNumber);
  const startChar = extractedClass.index;
  const endChar = startChar + extractedClass[0].length
  const startPos = new vscode.Position(lineNumber, startChar);
  const endPos = new vscode.Position(lineNumber, endChar);
  const foldedClasses = tailwindClasses.slice(0,2).join(' ') + '...';
  const fullClass = tailwindClasses.join(' ');  


  if (isFolded) {
    removeDecoration(startPos, endPos);
    forgetClass(currentPath, lineNumber);
  } else{
    if (tailwindClasses.length > 2){
    decorateClass(foldedClasses, fullClass, startPos, endPos);
    rememberClass(currentPath, lineNumber);
  } else{
    return;
  }

  }

}

module.exports = { toggleFold }