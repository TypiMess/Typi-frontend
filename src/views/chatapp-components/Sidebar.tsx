import React from "react";
import CurrentUserController from "../../controllers/CurrentUserController";
import User from "../../models/User";
import App from "../App";
import AddFriendButton from "./sidebar-components/AddFriendButton";
import FriendsList from "./sidebar-components/FriendsList";
import OptionsMenu from "./sidebar-components/OptionsMenu";

interface IStates {
    currentUser?: User
}

export default class Sidebar extends React.Component<{}, IStates> {
    constructor(props: {}) {
        super(props);

        this.state = {
            currentUser: CurrentUserController.Instance?.CurrentUser
        }
    }

    componentDidMount() {
        if (!CurrentUserController.Initialized) {
            App.CheckSession();
        }
    }

    render() {
        return (
            <>
                <div className="d-flex align-items-center">
                    <img src="/assets/typi-logo.png" style={{ height: "40px" }} /><h2>ypi</h2>
                </div>
                <div className="d-flex align-items-center">
                    <div className="me-auto">
                        Hi <strong>{this.state.currentUser?.Username}</strong>.
                    </div>
                    <AddFriendButton />
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