import React from "react";
import CurrentUserController from "../../../controllers/CurrentUserController";
import Avatar from "../Avatar";
import MenuEntry from "../MenuEntry";

export default class FriendsList extends React.Component {
    render() {
        const friends = CurrentUserController.Instance.Friends;
        const friendRequests = CurrentUserController.Instance.FriendRequests;
        
        return (
            <>
                {
                    friendRequests.length > 0 &&
                    
                    <MenuEntry>
                        <b>Pending requests</b>
                        <span className="ms-auto badge bg-info">{ friendRequests.length }</span>
                    </MenuEntry>
                }
                
                {
                    friends.map(friend => {
                        return (
                            <MenuEntry key={friend.Username}>
                                <div className="d-inline-block me-3"><Avatar text={friend.Username.charAt(0)}></Avatar></div>
                                <div className="d-inline-block">{ friend.Username }</div>
                            </MenuEntry>
                        )
                    })
                }
                
            </>
        )
    }
}