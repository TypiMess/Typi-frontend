import { NotFoundError } from "../errors/Errors";
import User from "../models/User";
import CurrentUserController from "./CurrentUserController";

interface IOnChangeCallbackFunction {
    (user: User): void
}

export default class ReceiverController {
    private static _instance: ReceiverController;
    private onChangeCallbacks: IOnChangeCallbackFunction[] = [];

    private _receiver?: User;

    private constructor() {
        ReceiverController._instance = this;
    }

    static get Instance() { return this._instance || new ReceiverController() }

    /**
     * Set a new receiver user
     * ! Not using JS setter because it forces getter to return the same type
     * @param username username of the new receiver
     * @throws {@link NotFoundError} if user with given user cannot be found
     */
    SetReceiver(username: string) {
        const user = CurrentUserController.Instance.Friends.find(user => user.Username === username);
        
        if (user)
        {
            this._receiver = user;
            this.onChangeCallbacks.forEach(callback => callback(user));
        }
        else {
            throw new NotFoundError();
        }
    }

    /**
     * Get current receiver.
     * ! Can be undefined
     */
    get Receiver() { return this._receiver }
    
    AddOnChangeListener(onChange: IOnChangeCallbackFunction) {
        this.onChangeCallbacks.push(onChange);
    }
}