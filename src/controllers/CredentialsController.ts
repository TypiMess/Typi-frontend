import { CredsApi } from "../../sdk";
import { CodeToError } from "../errors/Errors";
import APIConfig from "./APIConfig";

export default class CredentialsController {
    private static _instance?: CredentialsController;
    private static _credsAPI = new CredsApi(APIConfig);
    
    private constructor() {
        CredentialsController._instance = this;
    }
    
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
            let response = e as Response;
            
            throw CodeToError(response.status);
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
            let response = e as Response;
            
            throw CodeToError(response.status);
        }
    }
} 