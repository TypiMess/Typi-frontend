export default class ForbiddenError extends Error {    
    constructor()
    {
        super("You have no permission.");
        this.name = "ForbiddenError";
    }
}