export default class UnauthorizedError extends Error {
    name = "UnauthorizedError";
    
    constructor()
    {
        super("You are unauthorized.");
    }
}