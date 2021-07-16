import React from "react";
import ChatApp from "../../ChatApp";
import AddFriendModal from "./AddFriendModal";

export default class AddFriendButton extends React.Component {
    constructor(props: {})
    {
        super(props);
        
        this.handleOnClick = this.handleOnClick.bind(this);
    }
    
    handleOnClick() {
        ChatApp.ShowModal(
            <AddFriendModal></AddFriendModal>
        );
        
    }
    
    render() {
        return (
            <div className="button_icon" onClick={this.handleOnClick}>
                <i className="bi-person-plus-fill"></i>
            </div>
        )
    }
}