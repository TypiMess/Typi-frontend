export default class InvalidError extends Error {    
    constructor()
    {
        super("Input is invalid.");
        this.name = "InvalidError";
    }
}