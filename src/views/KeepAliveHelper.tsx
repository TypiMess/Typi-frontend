import React from "react";
import IdleTimer from "react-idle-timer";
import SessionsController from "../controllers/SessionsController";
import { NotFoundError } from "../errors/Errors";
import NotificationContainer from "./notification-components/NotificationContainer";

interface IProps {
    onExpire: Function
}

export default class KeepAliveHelper extends React.Component<IProps> {
    private sendKeepAliveInterval: number = 0;
    
    constructor(props: IProps)
    {
        super(props);
        
        this.handleOnActive = this.handleOnActive.bind(this);
        this.handleOnIdle = this.handleOnIdle.bind(this);
    }
    
    componentDidMount() {
        this.handleOnActive();
    }
    
    handleOnActive() {
        clearInterval(this.sendKeepAliveInterval);
        
        const sendKeepAlive = () => {
            SessionsController.Instance.SendKeepAlive().catch(err => {
                clearInterval(this.sendKeepAliveInterval);

                if (err instanceof NotFoundError) {
                    NotificationContainer.AddNotification({ title: "Session expired", type: "warning", body: <>Your session has expired. Please login again.</> });
                }
                else {
                    NotificationContainer.AddNotification({ title: "Server error", type: "error", body: <>An error has occured, please try again.</> });
                }
                
                this.props.onExpire();
            });
        }
        sendKeepAlive();
        
        this.sendKeepAliveInterval = setInterval(sendKeepAlive, 1000 * 60 * 5);
    }
    
    handleOnIdle() {
        clearInterval(this.sendKeepAliveInterval);
        this.sendKeepAliveInterval = 0;
        SessionsController.Instance.Logout().finally(() => this.props.onExpire());
    }
    
    componentWillUnmount() {
        clearInterval(this.sendKeepAliveInterval);
        this.sendKeepAliveInterval = 0;
    }
    
    render() {
        return (
            <IdleTimer
                timeout={1000 * 60 * 15}
                onActive={this.handleOnActive}
                onIdle={this.handleOnIdle}
                crossTab={true}
            />
        )
    }
}