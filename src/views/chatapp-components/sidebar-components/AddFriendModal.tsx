import React, { ChangeEvent, MouseEvent } from "react";
import RelationshipsController from "../../../controllers/RelationshipsController";
import { UnauthorizedError } from "../../../errors/Errors";
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
        RelationshipsController.Instance.SendFriendRequest(this.state.targetUsername).catch(error => {
            if (error instanceof UnauthorizedError)
            {
                
            }
        })
    }

    render() {
        return (
            <Modal title="Add friend" showCloseButton={true} additionalFooter={
                <button className="btn btn-primary" onClick={this.handleSendRequestClick}>Send request</button>
            }>
                <label htmlFor="">Their username:</label>
                <input className="form-control" id="targetUsername" name="targetUsername" onChange={this.handleTargetUsernameChange} />
            </Modal>
        )
    }
}