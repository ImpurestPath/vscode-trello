import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { Connection } from "../../trello/connection";
import { IBoard } from '../../trello/entities';
import FormData = require('form-data');
import fs = require('fs');
import * as path from 'path';

// import * as myExtension from '../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');
	let c : Connection = new Connection();
	test('Sample test', () => {
		assert.equal(-1, [1, 2, 3].indexOf(5));
		assert.equal(-1, [1, 2, 3].indexOf(0));
	});
	test('Get request', async () => {
		const key = vscode.workspace.getConfiguration().get('trello.key');
        const token = vscode.workspace.getConfiguration().get('trello.token');
		const abc = await Connection.get("https://api.trello.com/1/members/me/boards?",{
			key: key,
			token: token,
		});
		console.log(abc);
	});
	test('Get entity', async () => {
		await Connection.getAllUserBoards().then(boards => {console.log(boards as IBoard[]);});
	});


	// test('Post url image', async () => {
	
	// 	const file = new FormData();
	// 	file.append('file',fs.readFileSync(path.join(__dirname, '/../../../IMG.jpg')));
	// 	await Connection.attachFile("5df11e2b2db0465a622d9152",'https://i.imgur.com/wJayrej.jpg').then(r => console.log(r)).catch(r => console.log(r));
	// });
		
	// test('Post file image', async () => {
	// 	const fs = require("fs");
	// 	const path = require("path");
	// 	const id = "5df11e2b2db0465a622d9152";
	// 	const f = fs.createReadStream(path.join(__dirname, '/../../../IMG.jpg'));
	// 	Connection.attachFile(id,"Good image",'',f);
	// });
	

});

