export default class ForbiddenError extends Error {
    name = "ForbiddenError";
    
    constructor()
    {
        super("You have no permission.");
    }
}