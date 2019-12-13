// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {Connection} from "./trello/connection";
import { sendCode } from './trello/utils';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "trello" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// vscode.commands.registerCommand('extension.helloWorld', async () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World!');
		// let c : Connection = new Connection();
	
		// const key = vscode.workspace.getConfiguration().get('trello.key');
		// const token = vscode.workspace.getConfiguration().get('trello.token');
		// const abc = await c.get("https://api.trello.com/1/members/me/boards?",{
		// 	key: key,
      	// 	token: token,
		// });
		// console.log(abc);
	// });
	let s = vscode.commands.registerCommand('extension.sendCode', async () => {
		await sendCode();
	});
	context.subscriptions.push(s);
	//context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
