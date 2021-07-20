import React from "react";
import { Redirect } from "react-router-dom";
import CurrentUserController from "../../../controllers/CurrentUserController";
import ReceiverController from "../../../controllers/ReceiverController";
import User from "../../../models/User";
import App from "../../App";
import NotificationContainer from "../../notification-components/NotificationContainer";
import Avatar from "../Avatar";
import MenuEntry from "../MenuEntry";

interface IStates {
    friends: User[],
    friendRequests: User[],
    selectedUsername: string
}

export default class FriendsList extends React.Component<{}, IStates> {
    constructor(props: {}) {
        super(props);

        this.state = {
            friends: [],
            friendRequests: [],
            selectedUsername: ''
        }

        this.handleUpdateFriends = this.handleUpdateFriends.bind(this);
        this.handleFriendClick = this.handleFriendClick.bind(this);
    }

    componentDidMount() {
        if (CurrentUserController.Initialized) {
            this.handleUpdateFriends();
            CurrentUserController.AddOnReadyListener(this.handleUpdateFriends);
        }
        else {
            App.CheckSession();
        }
    }

    handleUpdateFriends() {
        this.setState({
            friends: CurrentUserController.Instance!.Friends,
            friendRequests: CurrentUserController.Instance!.FriendRequests
        });
    }

    handleFriendClick(friendsUsername: string) {
        try {
            ReceiverController.Instance.SetReceiver(friendsUsername);
            this.setState({ selectedUsername: friendsUsername });
        }
        catch
        {
            NotificationContainer.AddNotification({ title: "Friend not found", type: "error", body: <>Cannot select the friend named <strong>{friendsUsername}</strong>. Please try reloading the page!</> });
        }
    }

    render() {
        return (
            <>
                {
                    this.state.selectedUsername &&
                    <Redirect to={'/t/' + encodeURIComponent(this.state.selectedUsername)} />
                }
                {
                    this.state.friendRequests.length > 0 &&

                    <MenuEntry>
                        <strong>Pending requests</strong>
                        <span className="ms-auto badge bg-info">{this.state.friendRequests.length}</span>
                    </MenuEntry>
                }

                {
                    this.state.friends.map(friend => {
                        return (
                            <MenuEntry key={friend.Username} onClick={() => this.handleFriendClick(friend.Username)}>
                                <div className="d-inline-block me-3"><Avatar text={friend.Username.charAt(0)}></Avatar></div>
                                <div className="d-inline-block">{friend.Username}</div>
                            </MenuEntry>
                        )
                    })
                }

            </>
        )
    }
}