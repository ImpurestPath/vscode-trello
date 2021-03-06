import * as vscode from "vscode";
import axios from "axios";
import { IBoard, IList, ICard } from "./entities";
import FormData = require("form-data");


export class Connection{

    constructor(context?: vscode.ExtensionContext){}
    
    private static getKey(): string{
      const key = <string> vscode.workspace.getConfiguration().get('trello.key');
      return key;
    }

    private static getToken(): string{
      const token = <string> vscode.workspace.getConfiguration().get('trello.token');
      return token;
    }

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
            console.error("POST error", error.response.data);

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
        const res =  Connection.get("https://api.trello.com/1/members/me/boards",{
          key:  this.getKey(),
          token: this.getToken(),
        });
        return res;
      }

      static getBoard(id: string): Promise<IBoard> {
        return Connection.get(`https://api.trello.com/1/board/${id}`,{
          key:  this.getKey(),
          token: this.getToken(),
        });
      }

      static getList(id: string): Promise<IList> {
        return Connection.get(`https://api.trello.com/1/list/${id}`,{
          key:  this.getKey(),
          token: this.getToken(),
        });
      }

      static getListsByBoard(id: string): Promise<IList[]> {
        return Connection.get(`https://api.trello.com/1/board/${id}/lists`,{
          key:  this.getKey(),
          token: this.getToken(),
        });
      }

      static getCard(id: string): Promise<ICard> {
        return Connection.get(`https://api.trello.com/1/card/${id}`,{
          key:  this.getKey(),
          token: this.getToken(),
        });
      }

      static getCardsByList(id: string): Promise<ICard[]> {
        return Connection.get(`https://api.trello.com/1/list/${id}/cards`,{
          key:  this.getKey(),
          token: this.getToken(),
        });
      }

      static postCard(card: ICard) : Promise<any> {
        return Connection.post("https://api.trello.com/1/card", {
          name: card.name,
          desc: card.desc,
          idList: card.idList,
          key: this.getKey(),
          token: this.getToken(),
        });
      }

      static postList(list: IList) : Promise<any> {
        return Connection.post("https://api.trello.com/1/list", {
          name: list.name,
          idBoard: list.idBoard,
          key: this.getKey(),
          token: this.getToken(),
        });
      }

      static postBoard(board: IBoard) : Promise<any> {
        return Connection.post("https://api.trello.com/1/board", {
          name: board.name,
          desc: board.desc,
          key: this.getKey(),
          token: this.getToken(),
        });
      }


      static putCard(card: ICard) : Promise<any> {
        return Connection.put("https://api.trello.com/1/card", {
          id: card.id,
          name: card.name,
          desc: card.desc,
          idList: card.idList,
          key: this.getKey(),
          token: this.getToken(),
        });
      }

      static putList(list: IList) : Promise<any> {
        return Connection.put("https://api.trello.com/1/list", {
          id: list.id,
          name: list.name,
          idBoard: list.idBoard,
          key: this.getKey(),
          token: this.getToken(),
        });
      }

      static putBoard(board: IBoard) : Promise<any> {
        return Connection.put("https://api.trello.com/1/board", {
          id: board.id,
          name: board.name,
          desc: board.desc,
          key: this.getKey(),
          token: this.getToken(),
        });
      }

      //Deleting can't be undone, It's safer to mark as closed
      static deleteCard(card: ICard) : Promise<any> {
        return Connection.delete("https://api.trello.com/1/card", {
          id: card.id,
          key: this.getKey(),
          token: this.getToken(),
        });
      }

      static deleteList(list: IList) : Promise<any> {
        return Connection.delete("https://api.trello.com/1/list", {
          id: list.id,
          key: this.getKey(),
          token: this.getToken(),
        });
      }

      static deleteBoard(board: IBoard) : Promise<any> {
        return Connection.delete("https://api.trello.com/1/board", {
          id: board.id,
          key: this.getKey(),
          token: this.getToken(),
        });
      }


      static attachFile(idCard: string, name: string, url ?: string,  file?: any) : any{
        if (url){
          return Connection.post(`https://api.trello.com/1/card/${idCard}/attachments`, {
            key: this.getKey(),
            token: this.getToken(),
            name: name,
            url: url,
          });
        }
        else if (file){
          var form = new FormData();
          form.append("file", file);
          form.append("name", name);
          form.append("key",'6e0a164b0bb96842b6bd837fb8b4f9d0');
          form.append("token",'415b41b03f66b8ad535de5dcc96ed74550aca05d8f9f091e31b0252d6f7f5979');
          //form.append("mimeType", "image/jpg");
          form.submit(`https://api.trello.com/1/cards/${idCard}/attachments`, function(err, res) {
            // res – response object (http.IncomingMessage)  //
            res.resume();
          });
        }
      }



      static addCommentToCard(idCard: string, text: string) : Promise<any>{
        return Connection.post(`https://api.trello.com/1/cards/${idCard}/actions/comments`, {
          text: text,
          key: this.getKey(),
          token: this.getToken()
        });
      }

}