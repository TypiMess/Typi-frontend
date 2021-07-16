import React from "react";
import CurrentUserController from "../../controllers/CurrentUserController";
import User from "../../models/User";
import AddFriendButton from "./sidebar-components/AddFriendButton";
import FriendsList from "./sidebar-components/FriendsList";
import OptionsMenu from "./sidebar-components/OptionsMenu";

interface IStates {
    currentUser?: User
}

export default class Sidebar extends React.Component<{}, IStates> {
    constructor(props: {})
    {
        super(props);
        
        this.state = {
            currentUser: undefined
        }
    }
    
    componentDidMount() {
        this.setState({ currentUser: CurrentUserController.Instance.CurrentUser });
    }
    
    render() {
        return (
            <>
                <div className="d-flex align-items-center">
                    <img src="/assets/typi-logo.png" style={{ height: "40px" }}/><h2>ypi</h2>
                </div>
                <div className="d-flex align-items-center">
                    <div className="me-auto">
                        Hi <b>{ this.state.currentUser?.Username }</b>.
                    </div>
                    <AddFriendButton/>
                    <div className="ms-1">
                        <div className="button_icon">
                            <i className="bi-three-dots"></i>
                        </div>
                        <OptionsMenu />
                    </div>
                </div>
                <div className="mt-3">
                    <FriendsList />
                </div>
            </>
        )
    }
}