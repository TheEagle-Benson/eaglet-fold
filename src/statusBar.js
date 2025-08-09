const vscode = require('vscode');

let foldMode = true;
let statusBarItem;


function createStatusBarItem() {
  statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  statusBarItem.command = 'eaglet.toggleFoldMode';
  statusBarItem.text = `${foldMode ? '$(eye) Fold Mode: On' : '$(eye-closed) Fold Mode: Off'}`;
  statusBarItem.tooltip = 'Click to toggle fold mode';
  statusBarItem.show();
  console.log(`Fold Mode: ${foldMode}`);
}

function toggleFoldMode() {
  foldMode = !foldMode;
  statusBarItem.text = `${foldMode ? '$(eye) Fold Mode: On' : '$(eye-closed) Fold Mode: Off'}`;
}

function getFoldMode() {
  return foldMode;
} 

module.exports = {
  createStatusBarItem,
  toggleFoldMode,
  getFoldMode,
  statusBarItem
}