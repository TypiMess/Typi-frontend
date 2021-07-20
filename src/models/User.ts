import { InvalidError } from "../errors/Errors";

export default class User {
    private _username: string;
    
    constructor(username: string)
    {
        if (User.CheckUsernameValid(username)) {
            this._username = username;
        }
        else {
            this._username = "";
            console.error("Invalid username found: %s!", username);
        }
            
    }
    
    get Username()
    {
        return this._username;
    }
    
    static CheckUsernameValid(username: string) {
        return /(\w|\d){3,32}/.test(username);
    }
}