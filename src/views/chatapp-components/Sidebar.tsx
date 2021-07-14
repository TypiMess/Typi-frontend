import React from "react";
import CurrentUserController from "../../controllers/CurrentUserController";
import FriendsList from "./sidebar-components/FriendsList";
import OptionsMenu from "./sidebar-components/OptionsMenu";

export default class Sidebar extends React.Component {
    render() {
        return (
            <>
                <div className="d-flex align-items-center">
                    <img src="../assets/typi-logo.png" style={{ height: "40px" }}/><h2>ypi</h2>
                </div>
                <div className="d-flex align-items-center">
                    <div className="mr-auto">
                        Hi <b>{ CurrentUserController.Instance.CurrentUser.Username }</b>.
                    </div>
                    <div className="">
                        <i className="bi-person-plus-fill"></i>
                    </div>
                    <div className="ms-1">
                        <div className="$style.button_icon">
                            <i className="three-dots"></i>
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