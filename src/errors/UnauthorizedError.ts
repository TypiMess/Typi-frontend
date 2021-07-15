export default class UnauthorizedError extends Error {    
    constructor()
    {
        super("You are unauthorized.");
        this.name = "UnauthorizedError";
    }
}