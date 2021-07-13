export default class UnknownError extends Error {
    name = "UnknownError";
    
    constructor()
    {
        super("Unknown error. Please contact administrator regarding this issue.");
    }
}