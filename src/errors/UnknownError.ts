export default class UnknownError extends Error {    
    constructor()
    {
        super("Unknown error. Please contact administrator regarding this issue.");
        this.name = "UnknownError";
    }
}