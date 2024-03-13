'use strict';

import * as vscode from 'vscode';
import { isRathenaHeader } from './rathena';
import { CompletionProvider } from './completionProvider';
import { checkFileAndShowPopup } from './encode/checkfile';

function associateFile (doc: vscode.TextDocument): void {
  if (isRathenaHeader(doc.lineAt(0).text)) {
    vscode.languages.setTextDocumentLanguage(doc, 'rathena');
  }
}

export function activate (context: vscode.ExtensionContext): void {
  const provider = new CompletionProvider();

  //파일 스니펫 및 context 처리
  for (const doc of vscode.workspace.textDocuments) {
    associateFile(doc);
  }

  // Also associate file on open and save
  context.subscriptions.push(vscode.workspace.onDidOpenTextDocument(associateFile));
  context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(associateFile));

  context.subscriptions.push(vscode.languages.registerCompletionItemProvider({ language: 'rathena', scheme: 'file' }, provider));
  
  context.subscriptions.push(vscode.workspace.onDidOpenTextDocument(document => {
    if (isRathenaHeader(document.lineAt(0).text) || (document.fileName.endsWith('.rs') || document.fileName.endsWith('.ers'))) {
      checkFileAndShowPopup(document);
    }
  }));
}

export function deactivate (): void {
	//
}
