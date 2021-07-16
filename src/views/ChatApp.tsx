import React, { ReactElement } from "react";
import SessionsController from "../controllers/SessionsController";
import { NotFoundError } from "../errors/Errors";
import '../styles/chatapp.scss'
import Chatbox from "./chatapp-components/Chatbox";
import Modal from "./chatapp-components/Modal";
import Sidebar from "./chatapp-components/Sidebar";

interface IProps {
    onLogout: Function
}

interface IStates {
    currentModal: ReactElement
}

export default class ChatApp extends React.Component<IProps, IStates> {
    private static _instance: ChatApp;
    
    constructor(props: IProps)
    {
        super(props);
        
        ChatApp._instance = this;
        
        this.state = {
            currentModal: <></>
        }
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
    
    static ShowModal(modal: ReactElement)
    {
        ChatApp._instance.setState({
            currentModal: modal
        });
    }
    
    static RemoveModal()
    {
        ChatApp._instance.setState({
            currentModal: <></>
        })
    }
    
    render() {
        return (
            <>
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
            
            {
                this.state.currentModal
            }
            </>
        )
    }
}