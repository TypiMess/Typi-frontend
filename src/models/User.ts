export default class User {
    private _username: string;
    
    constructor(username: string)
    {
        this._username = username;
    }
    
    get Username()
    {
        return this._username;
    }
}