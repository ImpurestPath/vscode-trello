import * as vscode from "vscode";
import axios from "axios";
import { IBoard, IList, ICard } from "./entities";

export class Connection{

    constructor(context?: vscode.ExtensionContext){}
    
    static async get(url: string, params: object): Promise<any> {
        try {
          const res = await axios.get(url, { params });
          return res.data;
        } catch (error) {
          if (error.response) {
            console.error("GET error", error.response);
            vscode.window.showErrorMessage(`HTTP error: ${error.response.status} - ${error.response.data}`);
          }
        }
        return null;
      }
    
      static async post(url: string, data: object): Promise<any> {
        try {
          const res = await axios.post(url, data);
          return res.data;
        } catch (error) {
          if (error.response) {
            console.error("POST error", error.response);
            vscode.window.showErrorMessage(`HTTP error: ${error.response.status} - ${error.response.data}`);
          }
        }
        return null;
      }
    
      static async put(url: string, data: object): Promise<any> {
        try {
          const res = await axios.put(url, data);
          return res.data;
        } catch (error) {
          if (error.response) {
            console.error("PUT error", error.response);
            vscode.window.showErrorMessage(`HTTP error: ${error.response.status} - ${error.response.data}`);
          }
        }
        return null;
      }
    
      static async delete(url: string, params: object): Promise<any> {
        try {
          const res = await axios.delete(url, { params });
          return res.data;
        } catch (error) {
          if (error.response) {
            console.error("DELETE error", error.response);
            vscode.window.showErrorMessage(`HTTP error: ${error.response.status} - ${error.response.data}`);
          }
        }
        return null;
      }
      
      static getAllUserBoards(): Promise<IBoard[]> {
        const key = vscode.workspace.getConfiguration().get('trello.key');
        const token = vscode.workspace.getConfiguration().get('trello.token');
        const res =  Connection.get("https://api.trello.com/1/members/me/boards",{
          key:  key,
          token: token,
        });
        return res;
      }

      static getBoard(id: string): Promise<IBoard> {
        const key = vscode.workspace.getConfiguration().get('trello.key');
        const token = vscode.workspace.getConfiguration().get('trello.token');
        return Connection.get("https://api.trello.com/1/board/${id}",{
          key:  key,
          token: token,
        });
      }

      static getList(id: string): Promise<IList> {
        const key = vscode.workspace.getConfiguration().get('trello.key');
        const token = vscode.workspace.getConfiguration().get('trello.token');
        return Connection.get("https://api.trello.com/1/list/${id}",{
          key:  key,
          token: token,
        });
      }

      static getListsByBoard(id: string): Promise<IList[]> {
        const key = vscode.workspace.getConfiguration().get('trello.key');
        const token = vscode.workspace.getConfiguration().get('trello.token');
        return Connection.get("https://api.trello.com/1/board/${id}/lists",{
          key:  key,
          token: token,
        });
      }

      static getCard(id: string): Promise<ICard> {
        const key = vscode.workspace.getConfiguration().get('trello.key');
        const token = vscode.workspace.getConfiguration().get('trello.token');
        return Connection.get("https://api.trello.com/1/card/${id}",{
          key:  key,
          token: token,
        });
      }

      static getCardsByList(id: string): Promise<ICard[]> {
        const key = vscode.workspace.getConfiguration().get('trello.key');
        const token = vscode.workspace.getConfiguration().get('trello.token');
        return Connection.get("https://api.trello.com/1/list/${id}",{
          key:  key,
          token: token,
        });
      }


}