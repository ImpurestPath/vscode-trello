import * as vscode from "vscode";
interface IBasic{
    id: string;
    name: string;
}


export interface ICard extends IBasic {
    desc: string;
    idBoard: string;
    idList: string;
}

export interface IList extends IBasic {
    idBoard: string;
}


export interface IBoard extends IBasic{
    desc: string;
}