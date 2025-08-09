const vscode = require('vscode');
const { getClass } = require('./utils/memory');
const { getFoldMode } = require('./statusBar');
const { extractClass } = require('./utils/helpers');
const { decorateClass } = require('./decorators/classDecoration');

function restoreFoldedLines(){
  if (!getFoldMode()) return;
  const editor = vscode.window.activeTextEditor;
  const currentFilePath = editor.document.uri.fsPath;
  if (getClass(currentFilePath)){
   const foldedLinesMap = getClass(currentFilePath);
   foldedLinesMap.forEach(lineNumber => {
   const line = editor.document.lineAt(lineNumber).text;
   if (lineNumber >= editor.document.lineCount) return;
   const extractedClass = extractClass(line);
   const startChar = extractedClass.index;
   const endChar = startChar + extractedClass[0].length;
   const startPos = new vscode.Position(lineNumber, startChar);
   const endPos = new vscode.Position(lineNumber, endChar);
   const foldedClasses = extractedClass[1].split(' ').slice(0, 2).join(' ') + '...';
   const fullClass = extractedClass[1];
 
  decorateClass(foldedClasses, fullClass, startPos, endPos);
   });
  }


}

module.exports = { restoreFoldedLines };