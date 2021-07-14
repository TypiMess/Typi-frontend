import { UsersApi } from "../../sdk";
import UnauthorizedError from "../errors/UnauthorizedError";
import UnknownError from "../errors/UnknownError";
import User from "../models/User";
import APIConfig from "./APIConfig";

export default class CurrentUserController {
    private static _instance: CurrentUserController;
    private static _userAPI = new UsersApi(APIConfig);
    
    private _currentUser: User;
    private _friends: User[];
    private _friendRequests: User[];
    
    private constructor(currentUser: User, friends: User[], friendRequests: User[])
    {
        this._currentUser = currentUser;
        this._friends = friends;
        this._friendRequests = friendRequests;
    }
    
    static get Instance() { return CurrentUserController._instance }
    get CurrentUser() { return this._currentUser }
    get Friends() { return this._friends }
    get FriendRequests() { return this._friendRequests }
    
    /**
     * Update current user info and friends info
     * @throws {UnauthorizedError} if user is not logged in
     * @throws {UnknownError} for other errors
     */
    public static async Update()
    {
        try
        {
            let getCurrentUserRes = await this._userAPI.usersMeGet();
            let getFriendsRes = await this._userAPI.usersFriendsGet();
            let getFriendRequestsRes = await this._userAPI.usersFriendsRequestsGet();
            
            let currentUser = new User(getCurrentUserRes.userID, getCurrentUserRes.username);
            let listFriends: User[] = [];
            let listFriendRequests: User[] = [];
            
            getFriendsRes.map(u => listFriends.push(new User(u.userID, u.username)));
            getFriendRequestsRes.map(u => listFriendRequests.push(new User(u.userID, u.username)));
            
            if (CurrentUserController._instance === undefined)
            {
                CurrentUserController._instance = new CurrentUserController(currentUser, listFriends, listFriendRequests);
            }
            else
            {
                CurrentUserController._instance._currentUser = currentUser;
                CurrentUserController._instance._friends = listFriends;
                CurrentUserController._instance._friendRequests = listFriendRequests;
            }
        }
        catch (e)
        {
            let response = <Response>e;
            
            console.error("Error updating current user.");
            
            if (response.status == 401)
            {
                throw new UnauthorizedError();
            }
            else
            {
                throw new UnknownError();
            }
        }
    }
    
    /**
     * Used to check if the instance is available. Instance is only defined if current user's info are loaded.
     * This function can be used to check if current user is loaded
     */
    static get IsReady()
    {
        return CurrentUserController.Instance !== undefined;
    }
}