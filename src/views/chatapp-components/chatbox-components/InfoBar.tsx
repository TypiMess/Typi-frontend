import React from "react";
import ReceiverController from "../../../controllers/ReceiverController";
import User from "../../../models/User";
import Avatar from "../Avatar";

interface IStates {
    receiver?: User
}

export default class InfoBar extends React.Component<{}, IStates> {
    constructor(props: {}) {
        super(props);

        this.state = {
            receiver: ReceiverController.Instance.Receiver
        }
    }

    render() {
        return (
            <>
                {
                    this.state.receiver &&
                    <div className="d-flex align-items-center p-3 border-bottom shadow-sm">
                        <div className="me-3"><Avatar text={this.state.receiver.Username.charAt(0)} /></div>
                        <div><strong>{this.state.receiver.Username}</strong></div>
                        <div className="ms-auto button_icon"><i className="bi-info-circle-fill" style={{ fontSize: '1.3em' }}></i></div>
                    </div>
                }
            </>
        )
    }
}