import { UsersApi } from "../../sdk";
import { CodeToError } from "../errors/Errors";
import APIConfig from "./APIConfig"

export default class RelationshipsController {
    private static _instance?: RelationshipsController;
    private static _usersAPI = new UsersApi(APIConfig);

    private constructor() {
        RelationshipsController._instance = this;
    }

    static get Instance() {
        return this._instance || new RelationshipsController();
    }
    
    async SendFriendRequest(targetUsername: string) {
        try
        {
            await RelationshipsController._usersAPI.usersFriendsAddTargetUsernamePost(targetUsername);
        }
        catch (e)
        {
            let response = e as Response;
            
            throw CodeToError(response.status);
        }
    }
}