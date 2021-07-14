import React from "react";
import CurrentUserController from "../controllers/CurrentUserController";
import '../styles/chatapp.scss'
import Chatbox from "./chatapp-components/Chatbox";
import Sidebar from "./chatapp-components/Sidebar";

export default class ChatApp extends React.Component {
    componentDidMount() {
        CurrentUserController.Update();
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