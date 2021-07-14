import React from "react";
import CurrentUserController from "../../../controllers/CurrentUserController";
import Avatar from "../Avatar";

export default class FriendsList extends React.Component {
    render() {
        const friends = CurrentUserController.Instance.Friends;
        const friendRequests = CurrentUserController.Instance.FriendRequests;
        
        return (
            <>
                <div className="d-flex p-2 rounded align-items-center justify-content-between + $style.menu_entry" v-if="pendingFriends.length > 0" onClick={e => {}}>
                    <b>Pending requests</b>
                    <span className="badge bg-info">{ friendRequests.length }</span>
                </div>
                
                {
                    friends.map(friend => {
                        return (
                            <div className="d-flex p-2 rounded align-items-center + $style.menu_entry" onClick={e => {}}>
                                <div className="d-inline-flex justify-content-center mr-3"><Avatar text={friend.Username.charAt(0)}></Avatar></div>
                                <div className="d-inline-block">{ friend.Username }</div>
                            </div>
                        )
                    })
                }
                
            </>
        )
    }
}