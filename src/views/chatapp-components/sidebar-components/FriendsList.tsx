import React from "react";
import { Redirect } from "react-router-dom";
import CurrentUserController from "../../../controllers/CurrentUserController";
import ReceiverController from "../../../controllers/ReceiverController";
import NotificationContainer from "../../notification-components/NotificationContainer";
import Avatar from "../Avatar";
import MenuEntry from "../MenuEntry";

interface IStates {
    selectedUsername: string
}

export default class FriendsList extends React.Component<{}, IStates> {
    constructor(props: {}) {
        super(props);
        
        this.state = {
            selectedUsername: ''
        }

        this.handleFriendClick = this.handleFriendClick.bind(this);
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
        const friends = CurrentUserController.Instance.Friends;
        const friendRequests = CurrentUserController.Instance.FriendRequests;

        return (
            <>
                {
                    this.state.selectedUsername &&
                    <Redirect to={'/t/' + encodeURIComponent(this.state.selectedUsername)} />
                }
                {
                    friendRequests.length > 0 &&

                    <MenuEntry>
                        <strong>Pending requests</strong>
                        <span className="ms-auto badge bg-info">{friendRequests.length}</span>
                    </MenuEntry>
                }

                {
                    friends.map(friend => {
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