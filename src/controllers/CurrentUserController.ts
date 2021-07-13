import { UsersApi } from "../../sdk";
import UnauthorizedError from "../errors/UnauthorizedError";
import UnknownError from "../errors/UnknownError";
import User from "../models/User";

interface FriendsInfo {
    User: User,
    TargetUser: number,
    Status: string
}

export default class CurrentUserController {
    private static _instance: CurrentUserController;
    private static _userAPI = new UsersApi();
    
    private _currentUser: User;
    private _friends: FriendsInfo[];
    
    constructor(currentUser: User, friends: FriendsInfo[])
    {
        this._currentUser = currentUser;
        this._friends = friends;
    }
    
    public static async Update()
    {
        try
        {
            let getCurrentUserRes = await this._userAPI.usersMeGet();
            let getFriendsRes = await this._userAPI.usersFriendsGet();
            
            let currentUser = new User(getCurrentUserRes.userID, getCurrentUserRes.username);
            let listFriends: FriendsInfo[] = [];
            
            getFriendsRes.map(u => {
                listFriends.push({User: new User(u.userID, u.username), TargetUser: u.TargetUser, Status: u.Status});
            });
            
            if (CurrentUserController._instance === undefined)
            {
                CurrentUserController._instance = new CurrentUserController(currentUser, listFriends);
            }
            else
            {
                CurrentUserController._instance._currentUser = currentUser;
                CurrentUserController._instance._friends = listFriends;
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
}