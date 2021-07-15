import { CredsApi } from "../../sdk";
import DuplicateError from "../errors/DuplicateError";
import InvalidError from "../errors/InvalidError";
import NotFoundError from "../errors/NotFoundError";
import UnknownError from "../errors/UnknownError";
import APIConfig from "./APIConfig";

export default class CredentialsController {
    private static _instance: CredentialsController;
    private static _credsAPI = new CredsApi(APIConfig);
    
    private constructor() {}
    
    static get Instance() { return this._instance || new CredentialsController() }
    
    /**
     * Send login request to the API server
     * @param username 
     * @param password 
     * @throws {@link NotFoundError} if the username and password combination is not found/match
     * @throws {@link InvalidError} if the username or password is invalid
     * @throws {@link UnknownError} for other errors
     */
    async Login(username: string, password: string)
    {
        try
        {
            await CredentialsController._credsAPI.credsLoginPost({
                Username: username,
                Password: password
            });
        }
        catch (e)
        {
            let error = <Response>e;
            
            switch (error.status)
            {
                case 404:
                    throw new NotFoundError();
                case 406:
                    throw new InvalidError();
                default:
                    throw new UnknownError();
            }
        }
    }
    
    async Register(username: string, password: string)
    {
        try
        {
            await CredentialsController._credsAPI.credsRegisterPost({
                Username: username,
                Password: password
            });
        }
        catch (e)
        {
            let error = <Response>e;
            
            switch (error.status)
            {
                case 406:
                    throw new InvalidError();
                case 409:
                    throw new DuplicateError();
                default:
                    throw new UnknownError();
            }
        }
    }
} 