
import * as vscode from 'vscode';
import * as jschardet from 'jschardet';
import * as fs from 'fs';

export async function checkFileAndShowPopup(document: vscode.TextDocument) {
    const filePath: string = document.fileName;
    const fileBuffer = fs.readFileSync(filePath);
    const encodingResult = jschardet.detect(fileBuffer);

    // 인코딩 검사 [지원하는게 없기 때문에 기능 사용하지 않음]
    /*
    if (encodingResult.encoding.includes('UTF') || encodingResult.encoding.includes('utf')) {
        const encodingSelection = await vscode.window.showInformationMessage(
            `현재 파일 인코딩이 ${encodingResult.encoding} 입니다. EUC-KR로 파일 인코딩 수정이 필요합니다.`, 
            '인코딩 변경', '무시'
        );
        if (encodingSelection === '인코딩 변경') {
            // 인코딩 변환 로직
            vscode.commands.executeCommand('workbench.action.editor.changeEncoding');
        }
    }
    */

    // 탭 설정 검사
    const useSpaces = vscode.workspace.getConfiguration('editor').get('insertSpaces');
    const tabSize = vscode.workspace.getConfiguration('editor').get('tabSize');
    if (!useSpaces || tabSize !== 4) {
        const tabSelection = await vscode.window.showInformationMessage(
            `현재 ${tabSize}칸의 공백이 설정되어 있습니다. 스크립트 작성을 위해 탭을 활용한 들여쓰기(size:4)로 변경합니다.`, 
            '변경', '무시'
        );
        if (tabSelection === '변경') {
            // 탭 설정 조정 로직
            vscode.workspace.getConfiguration('editor').update('tabSize', 4, true);
            vscode.workspace.getConfiguration('editor').update('insertSpaces', false, true);
        }
    }

    // 여기에 추가적인 조건 검사와 액션을 순차적으로 추가할 수 있습니다.
    await checkIndentationAndSuggestTabUse(document);

    // 알림 메시지
    await vscode.window.showInformationMessage(
        `현재 파일 인코딩이 ${encodingResult.encoding ?? 'EUC-KR이 아닌 형태'} 입니다. EUC-KR이 아닌 경우 정상적인 스크립트 작업이 불가능합니다.`, 
    );
}

async function checkIndentationAndSuggestTabUse(document: vscode.TextDocument) {
    // 파일의 모든 행을 순회하며 공백 들여쓰기를 사용하는지 확인
    const lineCount = document.lineCount;
    for (let i = 0; i < lineCount; i++) {
        const lineText = document.lineAt(i).text;
        // 정규식을 사용하여 행의 시작 부분에 공백 4개 이상이 있는지 확인
        if (/^( {4,})/.test(lineText)) {
            // 공백 들여쓰기를 탭 들여쓰기로 변경하라는 안내 메시지를 표시
            vscode.window.showInformationMessage("들여쓰기가 공백으로 되어 있습니다. 이런 경우 정상적인 로직 처리가 되지 않을 수 있습니다. 탭으로 변경하시겠습니까?", "변환", "무시")
                .then(selection => {
                    if (selection === "변환") {
                        // 탭 들여쓰기로 변경하는 함수 호출 (아래 함수 구현 필요)
                        convertSpacesToTabsForDocument(document);
                    }
                });
            break;
        }
    }
}

async function convertSpacesToTabsForDocument(document: vscode.TextDocument) {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const fullRange = new vscode.Range(0, 0, document.lineCount, 0);
        editor.edit(editBuilder => {
            const text = document.getText();
            const convertedText = text.replace(/^ {4}/gm, '\t');
            editBuilder.replace(fullRange, convertedText);
        });
    }
}