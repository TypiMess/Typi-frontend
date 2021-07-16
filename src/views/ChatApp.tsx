import React from "react";
import CurrentUserController from "../controllers/CurrentUserController";
import SessionsController from "../controllers/SessionsController";
import { NotFoundError } from "../errors/Errors";
import '../styles/chatapp.scss'
import Chatbox from "./chatapp-components/Chatbox";
import Sidebar from "./chatapp-components/Sidebar";

interface IProps {
    onLogout: Function
}

export default class ChatApp extends React.Component<IProps> {
    constructor(props: IProps)
    {
        super(props);
    }
    
    componentDidMount() {
        
        let sendKeepAliveInterval = setInterval(() => {
            SessionsController.SendKeepAlive().catch(err => {
                clearInterval(sendKeepAliveInterval);
                
                if (err instanceof NotFoundError)
                {
                    this.props.onLogout();
                }
                else
                {
                    
                }
            });
        }, 60000);
        
    }
    
    render() {
        return (
            <div className="container-fluid">
                <div className="row flex-grow-1">
                    <div className="col-2 p-3 border-right bg-white">
                        <Sidebar />
                    </div>
                    <div className="col p-0 bg-white">
                        <Chatbox />
                    </div>
                </div>
            </div>
        )
    }
}