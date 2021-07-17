class DummyError extends Error {
    constructor(msg: string)
    {
        super(msg);
        this.name = this.constructor.name;
    }
}

/**
 * Get an instance of error from HTTP code
 * @param httpCode HTTP code (4xx)
 * @returns an instance of a respective error
 */
export function CodeToError(httpCode: number): DummyError {
    switch (httpCode)
    {
        case 401:
            return new UnauthorizedError();
        case 403:
            return new ForbiddenError();
        case 404:
            return new NotFoundError();
        case 406:
            return new InvalidError();
        case 409:
            return new DuplicateError();
        default:
            return new UnknownError();
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