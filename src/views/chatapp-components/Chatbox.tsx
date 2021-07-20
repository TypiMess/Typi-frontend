import React from "react";
import { match, Redirect, Route } from "react-router-dom";
import ReceiverController from "../../controllers/ReceiverController";
import User from "../../models/User";
import '../../styles/chatbox.scss'
import NotificationContainer from "../notification-components/NotificationContainer";
import InfoBar from "./chatbox-components/InfoBar";

interface IProps {
    match: match<{ targetUsername: string }>
}

interface IStates {
    receiver?: User,
    redirectBack: boolean
}

export default class Chatbox extends React.Component<IProps, IStates> {
    constructor(props: IProps) {
        super(props);
        
        this.state = {
            receiver: ReceiverController.Instance.Receiver,
            redirectBack: false
        }
        
        this.handleOnReceiverUpdate = this.handleOnReceiverUpdate.bind(this);
    }
    
    componentDidMount() {
        ReceiverController.Instance.AddOnChangeListener(this.handleOnReceiverUpdate);
        
        try
        {
            ReceiverController.Instance.SetReceiver(this.props.match.params.targetUsername);
        }
        catch {
            NotificationContainer.AddNotification({ title: 'User does not exist', type: 'normal', body: <>The user you selected does not exist in your friends list. Please select another user.</> })
            this.setState({ redirectBack: true });
        }
    }
    
    handleOnReceiverUpdate(user: User) {
        this.setState({ receiver: user });
    }
    
    render() {
        return (
            <div id="chatbox">
                {
                    this.state.redirectBack && <Redirect to="/" />
                }
                {                    
                    this.state.receiver &&
                    <>
                        <InfoBar />
                    </>
                }
            </div>
        )
    }
}