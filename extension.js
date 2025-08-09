const vscode = require('vscode');

const {toggleFold} = require('./src/commands/toggleFoldCommand');
const { foldAllClass } = require('./src/commands/globalToggle');
const { createStatusBarItem, toggleFoldMode, statusBarItem, getFoldMode } = require('./src/statusBar');
const { restoreFoldedLines } = require('./src/restoreFoldedLines');
const { clearDecorations } = require('./src/decorators/classDecoration');
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	if(!getFoldMode()) return;
	createStatusBarItem();
	const status = vscode.commands.registerCommand('eaglet.toggleFoldMode', function () {
		toggleFoldMode();
	});

	const disposable = vscode.commands.registerCommand('eaglet.fold', function () {
	const editor = vscode.window.activeTextEditor;
	if (!editor) return;

	const lineNumber = editor.selection.active.line;
	toggleFold(editor, lineNumber);

	});

	const foldAllClasses = vscode.commands.registerCommand('eaglet.fold/unfold All', function () {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;
		const foldall = foldAllClass(editor);
		console.log(foldall);

	});

	vscode.window.onDidChangeActiveTextEditor(editor => {
		if (editor) {
		clearDecorations(editor.document.uri.toString());
    restoreFoldedLines();
  }
});


	context.subscriptions.push(disposable);
	context.subscriptions.push(foldAllClasses);
	context.subscriptions.push(status);
	context.subscriptions.push(statusBarItem);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}

