// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {
    Connection
} from "./trello/connection";
import * as fs from 'fs';
import * as path from 'path';
import {
    homedir
} from 'os';

const writeSerializedBlobToFile = (serializeBlob: {
    split: (arg0: string) => Iterable < number > ;
}, fileName: string) => {
    const bytes = new Uint8Array(serializeBlob.split(','));
    fs.writeFileSync(fileName, Buffer.from(bytes));
};

const P_TITLE = 'Screenshot 📸';

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context: vscode.ExtensionContext) {
    const htmlPath = path.resolve(context.extensionPath, 'webview/index.html');

    let lastUsedImageUri = vscode.Uri.file(path.resolve(homedir(), 'Desktop/code.png'));
    let panel: vscode.WebviewPanel;

    vscode.window.registerWebviewPanelSerializer('screenshot', {
        async deserializeWebviewPanel(_panel, {
            innerHTML
        }) {
            panel = _panel;
            panel.webview.html = getHtmlContent(htmlPath);
            panel.webview.postMessage({
                type: 'restore',
                innerHTML,
                bgColor: context.globalState.get('screenshot.bgColor', '#2e3440')
            });
            const selectionListener = setupSelectionSync();
            panel.onDidDispose(() => {
                selectionListener.dispose();
            });
            setupMessageListeners();
        }
    });

      vscode.workspace.onDidChangeConfiguration(e => {
        if (e.affectsConfiguration('screenshot') || e.affectsConfiguration('editor')) {
            syncSettings();
        }
    });

    function setupMessageListeners() {
        panel.webview.onDidReceiveMessage(({
            type,
            data
        }) => {
            switch (type) {
                case 'shoot':
                    vscode.window
                        .showSaveDialog({
                            defaultUri: lastUsedImageUri,
                            filters: {
                                Images: ['png']
                            }
                        })
                        .then(uri => {
                            if (uri) {
                                writeSerializedBlobToFile(data.serializedBlob, uri.fsPath);
                                lastUsedImageUri = uri;
                            }
                        });
                    break;
                case 'getAndUpdateCacheAndSettings':
                    panel.webview.postMessage({
                        type: 'restoreBgColor',
                        bgColor: context.globalState.get('screenshot.bgColor', '#2e3440')
                    });

                    syncSettings();
                    break;
                case 'updateBgColor':
                  context.globalState.update('screenshot.bgColor', data.bgColor);
                    break;
                case 'invalidPasteContent':
                    vscode.window.showInformationMessage(
                        'Pasted content is invalid. Only copy from VS Code and check if your shortcuts for copy/paste have conflicts.'
                    );
                    break;
            }
        });

    }

    function syncSettings() {
        const settings = vscode.workspace.getConfiguration('screenshot');
        const editorSettings = vscode.workspace.getConfiguration('editor', null);
        panel.webview.postMessage({
            type: 'updateSettings',
            shadow: settings.get('shadow'),
            transparentBackground: settings.get('transparentBackground'),
            backgroundColor: settings.get('backgroundColor'),
            target: settings.get('target'),
            ligature: editorSettings.get('fontLigatures')
        });
    }

    function setupSelectionSync() {
        return vscode.window.onDidChangeTextEditorSelection(({
            selections
        }) => {
            if (selections[0] && !selections[0].isEmpty) {
                vscode.commands.executeCommand('editor.action.clipboardCopyAction');
                panel.webview.postMessage({
                    type: 'update'
                });
            }
        });
    }

    let disposable = vscode.commands.registerCommand('screenshot.activate', async () => {
      panel = vscode.window.createWebviewPanel('screenshot', P_TITLE, 2, {
          enableScripts: true,
          localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'webview'))]
      });
      
      panel.webview.html = getHtmlContent(htmlPath);

      const selectionListener = setupSelectionSync();
      panel.onDidDispose(() => {
          selectionListener.dispose();
      });

      setupMessageListeners();

      const fontFamily = vscode.workspace.getConfiguration('editor').fontFamily;
      const bgColor = context.globalState.get('screenshot.bgColor', '#2e3440');
      panel.webview.postMessage({
          type: 'init',
          fontFamily,
          bgColor
      });

      syncSettings();
  });

  context.subscriptions.push(disposable);

}

function getHtmlContent(htmlPath: string) {
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    return htmlContent.replace(/script src="([^"]*)"/g, (match, src) => {
        const realSource = `vscode-resource:${path.resolve(htmlPath, '..', src)}`;
        return `script src="${realSource}"`;
    });
}

// exports.activate = activate;

// this method is called when your extension is deactivated
export function deactivate() {}