import * as vscode from 'vscode';

export class CompletionProvider implements vscode.CompletionItemProvider {
    provideCompletionItems(
        document: vscode.TextDocument, 
        position: vscode.Position, 
        token: vscode.CancellationToken, 
        context: vscode.CompletionContext
    ): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        const linePrefix = document.lineAt(position).text.substr(0, position.character);
        const userTyped = linePrefix.split(' ').pop(); // 사용자가 최근에 입력한 단어를 가져옴

        //TODO : 추후 intellisense 추가

        // 명령어와 관련된 세부 정보를 담은 객체
        const commandDetails: { [key: string]: { detail: string, documentation: string } } = {
            'set_name': { detail: '오브젝트의 이름을 설정합니다.', documentation: 'set_name .@id, "피디";' },
            'get_name': { detail: '오브젝트의 이름을 가져옵니다.', documentation: '.@name$ = get_name(.@id);' },
            'set_pcname': { detail: '캐릭터의 이름을 설정합니다.', documentation: 'set_name .@sd, "피디";' },
            'get_pcname': { detail: '캐릭터의 이름을 가져옵니다.', documentation: '.@name$ = get_pcname(.@sd);' },
        };

        if (!userTyped || userTyped.length < 3) {
            return [];
        }

        let startingMatches: vscode.CompletionItem[] = [];
        let partialMatches: vscode.CompletionItem[] = [];

        Object.keys(commandDetails).forEach(cmd => {
            if (cmd.startsWith(userTyped!)) {
                const item = new vscode.CompletionItem(cmd, vscode.CompletionItemKind.Function);
                item.detail = commandDetails[cmd].detail;
                item.documentation = new vscode.MarkdownString(commandDetails[cmd].documentation);
                startingMatches.push(item);
            } else if (cmd.includes(userTyped!)) {
                const item = new vscode.CompletionItem(cmd, vscode.CompletionItemKind.Function);
                item.detail = commandDetails[cmd].detail;
                item.documentation = new vscode.MarkdownString(commandDetails[cmd].documentation);
                partialMatches.push(item);
            }
        });

        // 먼저 시작하는 글자에 매칭되는 항목을 리스트에 추가하고, 그 다음 위치에 상관없이 매칭되는 항목을 추가합니다.
        return [...startingMatches, ...partialMatches];
    }
}