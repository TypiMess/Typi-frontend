import APIConfig, { COOKIE_SESSION_ID_NAME } from "./APIConfig";
import { SessionsApi } from "../../sdk";

export default class SessionsController {
    private static _sessionsAPI = new SessionsApi(APIConfig);
    
    /**
     * Send a request to extend the current session TTL
     */
    public static SendKeepAlive()
    {
        this._sessionsAPI.sessionsKeepAlivePut();
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