import { Connection } from "./connection";
import * as vscode from 'vscode';
import { IBoard, IList, ICard } from "./entities";

class BoardItem implements vscode.QuickPickItem{
    label :string;
    id : string;
    description: string;

    constructor(board: IBoard){
        this.label = board.name;
        this.id = board.id;
        this.description = board.desc;
    }
}


class CardItem implements vscode.QuickPickItem{
    label :string;
    id : string;
    description: string;

    constructor(card: ICard){
        this.label = card.name;
        this.id = card.id;
        this.description = card.desc;
    }
}

class ListItem implements vscode.QuickPickItem{
    label :string;
    id : string;
    description: string;

    constructor(list: IList){
        this.label = list.name;
        this.id = list.id;
        this.description = '';
    }
}

export async function sendCode(): Promise<any> {
    let clipboard_content = await vscode.env.clipboard.readText();

    const bb = (await Connection.getAllUserBoards()).map( board => {return new BoardItem(board);});
    const b = await vscode.window.showQuickPick(bb);
    if (b) {
        const ll = (await Connection.getListsByBoard(b.id)).map( list => {return new ListItem(list);});
        let l = await vscode.window.showQuickPick(ll);
        if (l) {
            const cc = (await Connection.getCardsByList(l.id)).map( card => {return new CardItem(card);});
            let c = await vscode.window.showQuickPick(cc);
            if (c) {
                const text = 
`\`\`\`
${clipboard_content}
\`\`\``;
                await Connection.addCommentToCard(c.id,text);
                vscode.window.showInformationMessage(`Successfully add code to comments of ${c.label} card`);
            }
        }
    }


//     Connection.addCommentToCard(idCard, `
// \`\`\`

// ${code}

// \`\`\`
//     `);
};

