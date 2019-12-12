// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {Connection} from "./trello/connection";
import { TrelloTreeView } from "./trello/trello-viewer/TrelloTreeView";
// import { TrelloViewFavoriteList } from "./trello/trello-viewer/TrelloViewFavoriteList";
import { TrelloUtils, removeTempTrelloFile } from "./trello/trello-viewer/TrelloUtils";
import { TrelloCard } from "./trello/trello-viewer/trelloComponents";
import { TrelloItem } from "./trello/trello-viewer/TrelloItem";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "trello" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', async () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');
		// let c : Connection = new Connection();
	
		// const key = vscode.workspace.getConfiguration().get('trello.key');
		// const token = vscode.workspace.getConfiguration().get('trello.token');
		// const abc = await c.get("https://api.trello.com/1/members/me/boards?",{
		// 	key: key,
      	// 	token: token,
		// });
		// console.log(abc);
	});
	const trello = new TrelloUtils(context);
	const trelloTreeView = new TrelloTreeView(trello);
 	// const trelloViewFavoriteList = new TrelloViewFavoriteList(trello);
	// Tree views
	vscode.window.registerTreeDataProvider("trelloTreeView", trelloTreeView);
	// Refresh
	vscode.commands.registerCommand("trelloViewer.refresh", () => trelloTreeView.refresh());
	vscode.commands.registerCommand("trelloViewer.addCard", (list: TrelloItem) => trello.addCardToList(list));
	// Card Actions - edit
	// vscode.commands.registerCommand("trelloViewer.editCardTitle", (card: TrelloItem) => trello.editTitle(card));
	// vscode.commands.registerCommand("trelloViewer.editCardDescription", (card: TrelloItem) =>
	//   trello.editDescription(card)
	// );
	vscode.commands.registerCommand("trelloViewer.addScreenCode", (card: TrelloItem) => trello.addScreenCode(card));
	// vscode.commands.registerCommand("trelloViewer.addComment", (card: TrelloItem) => trello.addComment(card));
	// Card Actions - user
	// vscode.commands.registerCommand("trelloViewer.addSelfToCard", (card: TrelloItem) => trello.addSelfToCard(card));
	// vscode.commands.registerCommand("trelloViewer.removeSelfFromCard", (card: TrelloItem) =>
	//   trello.removeSelfFromCard(card)
	// );
	// vscode.commands.registerCommand("trelloViewer.addUserToCard", (card: TrelloItem) => trello.addUserToCard(card));
	// vscode.commands.registerCommand("trelloViewer.removeUserFromCard", (card: TrelloItem) =>
	//   trello.removeUserFromCard(card)
	// );
	// Card Actions - card
	// vscode.commands.registerCommand("trelloViewer.moveCardToList", (card: TrelloItem) => trello.moveCardToList(card));
	// vscode.commands.registerCommand("trelloViewer.archiveCard", (card: TrelloItem) => trello.archiveCard(card));
	// Card - Show using markdown preview
	vscode.commands.registerCommand("trelloViewer.showCard", (card: TrelloCard) => trello.showCard(card));
}

// this method is called when your extension is deactivated
export function deactivate() {}
