import * as vscode from 'vscode';

export class CompletionProvider implements vscode.CompletionItemProvider {
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        const linePrefix = document.lineAt(position).text.substr(0, position.character);
        let commands:string[] = [];

        if (linePrefix.endsWith('set')) {
            commands = ['set_name', 'set_money', 'set_hp', 'set_mp'];
        } else if (linePrefix.endsWith('get')) {
            commands = ['get_name', 'get_money', 'get_hp', 'get_mp'];
        }

        const completionItems = commands.map(cmd => new vscode.CompletionItem(cmd, vscode.CompletionItemKind.Function));

        return completionItems;
    }
}