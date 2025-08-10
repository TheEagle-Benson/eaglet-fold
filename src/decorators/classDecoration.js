const vscode = require('vscode');
const { getFoldMode } = require('../statusBar');

const myDecorationType = vscode.window.createTextEditorDecorationType({
  after: {
    contentText: '',
    color: '#888',
    fontStyle: 'italic',
    margin: '0 0 0 8px',
  },
  textDecoration: 'none; position: absolute; width: 0; opacity: 0;'
});
const decorationMap = new Map();

function decorateClass(foldedClasses, fullClass, startPos, endPos){
  if (!getFoldMode()) return;
  if (!foldedClasses || !startPos || !endPos) {
    return ;
  }
  const editor = vscode.window.activeTextEditor;
  let uri = editor.document.uri.toString();
  const decorations = decorationMap.get(uri) || [];
  
  if (!decorationMap.has(uri)) {
    decorationMap.set(uri, []);
  }

  const md = new vscode.MarkdownString(
    `**${fullClass}**`
  );
  md.isTrusted = true;

  const alreadyExists = decorations.some(item =>
  item.range.start.line === startPos.line &&
  item.range.start.character === startPos.character &&
  item.range.end.line === endPos.line &&
  item.range.end.character === endPos.character

);
  if (alreadyExists) return;


  const decoration = ({
    range: new vscode.Range(startPos, endPos),
    renderOptions: {after: { contentText: `class='${foldedClasses}'` }},
    hoverMessage: md
  });
  decorations.push(decoration);
  decorationMap.set(uri, decorations);
  return editor.setDecorations(myDecorationType, decorations);
}

function removeDecoration(startPos, endPos){
  if (!getFoldMode()) return;
  if(!startPos || !endPos) {
    return;
  }
  const editor = vscode.window.activeTextEditor;
  const uri = editor.document.uri.toString();
  const decorations = decorationMap.get(uri) || [];
  const removeIdx = decorations.findIndex( item => {
    const r = item.range;
    return (
      r.start.line === startPos.line &&
      r.start.character === startPos.character &&
      r.end.line === endPos.line &&
      r.end.character === endPos.character
    );
  })
  
  if (removeIdx !== -1){
    decorations.splice(removeIdx, 1);
    decorationMap.set(uri, decorations);
    editor.setDecorations(myDecorationType, decorations);
    
  }

}

function clearDecorations(uri) {
  if (!getFoldMode()) return;
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.document.uri.toString() !== uri) return;
  editor.setDecorations(myDecorationType, []);
  decorationMap.set(uri, []);
}


module.exports = { decorateClass, removeDecoration, decorationMap, clearDecorations };