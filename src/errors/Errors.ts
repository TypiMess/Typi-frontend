class DummyError extends Error {
    constructor(msg: string)
    {
        super(msg);
        this.name = this.constructor.name;
    }
}

export class UnknownError extends DummyError {    
    constructor()
    {
        super("Unknown error. Please contact administrator regarding this issue.");
    }
}

export class UnauthorizedError extends DummyError {    
    constructor()
    {
        super("You are unauthorized.");
    }
}

export class InvalidError extends DummyError {    
    constructor()
    {
        super("Input is invalid.");
    }
}

export class NotFoundError extends DummyError {    
    constructor()
    {
        super("Not found.");
    }
}

export class ForbiddenError extends DummyError {    
    constructor()
    {
        super("You have no permission.");
    }
}

export class DuplicateError extends DummyError {    
    constructor()
    {
        super("Entry already exists.");
    }
}