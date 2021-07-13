export default class User {
    private _userID: number;
    private _username: string;
    
    constructor(userID: number, username: string)
    {
        this._userID = userID;
        this._username = username;
    }
    
    get UserID()
    {
        return this._userID;
    }
    
    get Username()
    {
        return this._username;
    }
}