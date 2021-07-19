import APIConfig from "./APIConfig";
import { SessionsApi } from "../../sdk";
import { CodeToError } from "../errors/Errors";

export default class SessionsController {
    private static _instance: SessionsController;
    private static _sessionsAPI = new SessionsApi(APIConfig);
    
    private constructor() {
        SessionsController._instance = this;
    }
    
    static get Instance() {
        return this._instance || new SessionsController();
    }
    
    /**
     * Send a request to extend the current session TTL
     */
    async SendKeepAlive()
    {
        try
        {
            await SessionsController._sessionsAPI.sessionsKeepAlivePut();
        }
        catch (e)
        {
            let response = e as Response;
            throw CodeToError(response.status);
        }
    }
    
    /**
     * Send a request to check if current session ID is valid
     * @returns true if session is valid, false otherwise
     */
    async VerifySession(): Promise<boolean>
    {
        try
        {
            await SessionsController._sessionsAPI.sessionsVerifyGet();
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
    
    async Logout() {
        try
        {
            await SessionsController._sessionsAPI.sessionsLogoutDelete();
        }
        catch
        {
            console.log("Session already expired");
        }
    }
}