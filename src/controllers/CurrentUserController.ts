import { UsersApi } from "../../sdk";
import { UnauthorizedError, UnknownError } from "../errors/Errors";
import User from "../models/User";
import APIConfig from "./APIConfig";

export default class CurrentUserController {
    private static _instance: CurrentUserController;
    private static _userAPI = new UsersApi(APIConfig);
    private static _onReadyCallbacks: {owner: React.Component, callback: Function}[] = [];
    
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
    static async Update()
    {
        try
        {
            let getCurrentUserRes = await this._userAPI.usersMeGet();
            let getFriendsRes = await this._userAPI.usersFriendsGet();
            let getFriendRequestsRes = await this._userAPI.usersFriendsRequestsGet();
            
            let currentUser = new User(getCurrentUserRes.Username);
            let listFriends = getFriendsRes.map(u => { return new User(u.Username) });
            let listFriendRequests = getFriendRequestsRes.map(u => { return new User(u.Username) });
            
            if (this._instance === undefined)
            {
                this._instance = new CurrentUserController(currentUser, listFriends, listFriendRequests);
            }
            else
            {
                this._instance._currentUser = currentUser;
                this._instance._friends = listFriends;
                this._instance._friendRequests = listFriendRequests;
            }
            
            this._onReadyCallbacks.forEach(entry => {
                entry.callback(entry.owner);
            });
        }
        catch (e)
        {
            let response = <Response>e;
            
            console.error(`${response.status}: Error updating current user.`);
            
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
     * Add a callback function from a React Component to a pool, it will be called after current user's info is updated.
     * @param owner an instance of a {@link React.Component}
     * @param callback a function to call when instance is ready
     */
    static AddOnReadyListener(owner: React.Component, callback: Function)
    {
        this._onReadyCallbacks.push({ owner, callback });
    }
}