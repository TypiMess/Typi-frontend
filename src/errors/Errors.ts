export class UnknownError extends Error {    
    constructor()
    {
        super("Unknown error. Please contact administrator regarding this issue.");
        this.name = "UnknownError";
    }
}

export class UnauthorizedError extends Error {    
    constructor()
    {
        super("You are unauthorized.");
        this.name = "UnauthorizedError";
    }
}

export class InvalidError extends Error {    
    constructor()
    {
        super("Input is invalid.");
        this.name = "InvalidError";
    }
}

export class NotFoundError extends Error {    
    constructor()
    {
        super("Not found.");
        this.name = "NotFoundError";
    }
}

export class ForbiddenError extends Error {    
    constructor()
    {
        super("You have no permission.");
        this.name = "ForbiddenError";
    }
}

export class DuplicateError extends Error {    
    constructor()
    {
        super("Entry already exists.");
        this.name = "DuplicateError";
    }
}