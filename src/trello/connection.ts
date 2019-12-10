import * as vscode from "vscode";
import axios from "axios";

export class Connection{

    constructor(context?: vscode.ExtensionContext){}

    async get(url: string, data: object): Promise<any> {
        try {
          const res = await axios.get(url, { data });
          return res.data;
        } catch (error) {
          if (error.response) {
            console.error("GET error", error.response);
            vscode.window.showErrorMessage(`HTTP error: ${error.response.status} - ${error.response.data}`);
          }
        }
        return null;
      }
    
      async post(url: string, data: object): Promise<any> {
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
    
      async put(url: string, data: object): Promise<any> {
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
    
      async delete(url: string, data: object): Promise<any> {
        try {
          const res = await axios.delete(url, { data });
          return res.data;
        } catch (error) {
          if (error.response) {
            console.error("DELETE error", error.response);
            vscode.window.showErrorMessage(`HTTP error: ${error.response.status} - ${error.response.data}`);
          }
        }
        return null;
      }
    
}