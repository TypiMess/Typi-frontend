import { UsersApi } from "../../sdk";
import { ForbiddenError, NotFoundError, UnauthorizedError, UnknownError } from "../errors/Errors";
import APIConfig from "./APIConfig"

export default class RelationshipsController {
    private static _instance: RelationshipsController;
    private static _usersAPI = new UsersApi(APIConfig);

    constructor() {
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
            
            switch (response.status)
            {
                case 401:
                    throw new UnauthorizedError();
                case 403:
                    throw new ForbiddenError();
                case 404:
                    throw new NotFoundError();
                default:
                    throw new UnknownError();
            }
        }
    }
}