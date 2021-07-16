import APIConfig from "./APIConfig";
import { SessionsApi } from "../../sdk";
import { NotFoundError, UnknownError } from "../errors/Errors";

export default class SessionsController {
    private static _sessionsAPI = new SessionsApi(APIConfig);
    
    /**
     * Send a request to extend the current session TTL
     */
    public static async SendKeepAlive()
    {
        try
        {
            await this._sessionsAPI.sessionsKeepAlivePut();
        }
        catch (e)
        {
            let result = e as Response;
            switch (result.status)
            {
                case 404:
                    throw new NotFoundError();
                default:
                    throw new UnknownError();
            }
        }
    }
    
    /**
     * Send a request to check if current session ID is valid
     * @returns true if session is valid, false otherwise
     */
    public static async VerifySession(): Promise<boolean>
    {
        try
        {
            await this._sessionsAPI.sessionsVerifyGet();
            // response throws an error if invalid
            // Session ID valid
            return true;
        }
        catch (e)
        {
            // Session invalid
            return false;
        }
    }
}