import * as vscode from 'vscode';
import * as fs from 'fs';
import * as iconv from 'iconv-lite';
import * as jschardet from 'jschardet';

export class FileEncodingManager {
    public static convertFileEncodingIfUTF8(filePath: string): void {
        const fileBuffer = fs.readFileSync(filePath);
        const detectionResult = jschardet.detect(fileBuffer);

        if (detectionResult.encoding === 'UTF-8') {
            const eucKrBuffer = iconv.encode(iconv.decode(fileBuffer, 'utf8'), 'EUC-KR');
            fs.writeFileSync(filePath, eucKrBuffer);
            vscode.window.showInformationMessage(`File encoding converted to EUC-KR: ${filePath}`);
        } else {
            vscode.window.showInformationMessage(`File is not UTF-8 encoded, no conversion performed: ${filePath}`);
        }
    }

    public static convertSpacesToTabsInActiveFile(): void {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage("No active editor");
            return;
        }

        const document = editor.document;
        const text = document.getText();

        const convertedText = text.replace(/ {4}/g, '\t');

        const fullRange = new vscode.Range(
            document.positionAt(0),
            document.positionAt(text.length)
        );

        editor.edit(editBuilder => {
            editBuilder.replace(fullRange, convertedText);
        });
    }
}
