'use strict';

import * as vscode from 'vscode';
import { isRathenaHeader } from './rathena';
import { CompletionProvider } from './completionProvider';

function associateFile (doc: vscode.TextDocument): void {
  if (isRathenaHeader(doc.lineAt(0).text)) {
    vscode.languages.setTextDocumentLanguage(doc, 'rathena');
  }
}

export function activate (context: vscode.ExtensionContext): void {
  const provider = new CompletionProvider();
  const triggerCharacters = ['set'];

  for (const doc of vscode.workspace.textDocuments) {
    associateFile(doc);
  }

  // Also associate file on open and save
  context.subscriptions.push(vscode.workspace.onDidOpenTextDocument(associateFile));
  context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(associateFile));

  context.subscriptions.push(vscode.languages.registerCompletionItemProvider({ language: 'rathena', scheme: 'file' }, provider, ...triggerCharacters));
}

export function deactivate (): void {
	//
}
