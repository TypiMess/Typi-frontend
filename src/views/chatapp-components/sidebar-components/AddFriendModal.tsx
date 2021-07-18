import React, { ChangeEvent } from "react";
import RelationshipsController from "../../../controllers/RelationshipsController";
import { DuplicateError, ForbiddenError, InvalidError, NotFoundError, UnauthorizedError } from "../../../errors/Errors";
import NotificationContainer from "../../notification-components/NotificationContainer";
import Notification from "../../notification-components/Notification";
import Modal from "../Modal";

interface IStates {
    targetUsername: string
}

export default class AddFriendModal extends React.Component<{}, IStates> {
    constructor(props: {}) {
        super(props);

        this.state = {
            targetUsername: ""
        }

        this.handleTargetUsernameChange = this.handleTargetUsernameChange.bind(this);
        this.handleSendRequestClick = this.handleSendRequestClick.bind(this);
    }

    handleTargetUsernameChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;

        this.setState({ targetUsername: value });
    }

    handleSendRequestClick() {
        RelationshipsController.Instance.SendFriendRequest(this.state.targetUsername)
            .then(() => {
                this.setState({ targetUsername: "" });
            })
            .catch(error => {
                if (error instanceof UnauthorizedError) {
                    NotificationContainer.AddNotification({ title: "Unauthorized", type: "warning", body: <>You have been logged out. Please login to continue.</> });
                }
                else if (error instanceof ForbiddenError) {
                    NotificationContainer.AddNotification({ title: "Forbidden", type: "warning", body: <>You do not have permission to interact with this person.</> });
                }
                else if (error instanceof NotFoundError || error instanceof InvalidError) {
                    NotificationContainer.AddNotification({ title: "Not found", type: "warning", body: <>The username you entered does not match any user. Please check again.</> });
                }
                else if (error instanceof DuplicateError) {
                    NotificationContainer.AddNotification({ title: "More than friends?", type: "warning", body: <>You are already friends with <strong>{this.state.targetUsername}</strong></> });
                }
                else {
                    NotificationContainer.AddNotification({ title: "Error", type: "error", body: <>An unknown error has occured. Sorry for the inconvenience.</> });
                }
            });
    }

    render() {
        return (
            <Modal title="Add friend" showCloseButton={true} additionalFooter={
                <button className="btn btn-primary" onClick={this.handleSendRequestClick}>Send request</button>
            }>
                <label className="form-label" htmlFor="targetUsername">Their username:</label>
                <input className="form-control" id="targetUsername" name="targetUsername" value={this.state.targetUsername} onChange={this.handleTargetUsernameChange} />
            </Modal>
        )
    }
}