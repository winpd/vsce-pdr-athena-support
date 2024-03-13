'use strict';

import * as vscode from 'vscode';
import { isRathenaHeader } from './rathena';
import { CompletionProvider } from './completionProvider';
import { FileEncodingManager } from './encode/fileEncodingManager';

function associateFile (doc: vscode.TextDocument): void {
  if (isRathenaHeader(doc.lineAt(0).text)) {
    vscode.languages.setTextDocumentLanguage(doc, 'rathena');
  }
}

export function activate (context: vscode.ExtensionContext): void {
  const provider = new CompletionProvider();
  const triggerCharacters = ['set'];

  //파일 스니펫 및 context 처리
  for (const doc of vscode.workspace.textDocuments) {
    associateFile(doc);
  }

  //파일 인코딩 처리
  let convertEncodingCommand = vscode.commands.registerCommand('extension.convertEncoding', () => {
    if (vscode.window.activeTextEditor) {
        FileEncodingManager.convertFileEncodingIfUTF8(vscode.window.activeTextEditor.document.fileName);
    }
  });

  let convertSpacesToTabsCommand = vscode.commands.registerCommand('extension.convertSpacesToTabs', () => {
      FileEncodingManager.convertSpacesToTabsInActiveFile();
  });

  // Also associate file on open and save
  context.subscriptions.push(vscode.workspace.onDidOpenTextDocument(associateFile));
  context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(associateFile));

  context.subscriptions.push(vscode.languages.registerCompletionItemProvider({ language: 'rathena', scheme: 'file' }, provider, ...triggerCharacters));
  context.subscriptions.push(convertEncodingCommand, convertSpacesToTabsCommand);
}

export function deactivate (): void {
	//
}
