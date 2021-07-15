export default class DuplicateError extends Error {    
    constructor()
    {
        super("Entry already exists.");
        this.name = "DuplicateError";
    }
}