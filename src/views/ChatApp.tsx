import React, { ReactElement } from "react";
import { Route, Switch } from "react-router-dom";
import '../styles/chatapp.scss'
import Chatbox from "./chatapp-components/Chatbox";
import Sidebar from "./chatapp-components/Sidebar";
import KeepAliveHelper from "./KeepAliveHelper";

interface IProps {
    onLogout: Function
}

interface IStates {
    currentModal: ReactElement
}

export default class ChatApp extends React.Component<IProps, IStates> {
    private static _instance: ChatApp;

    constructor(props: IProps) {
        super(props);

        ChatApp._instance = this;

        this.state = {
            currentModal: <></>
        }
    }

    static ShowModal(modal: ReactElement) {
        ChatApp._instance.setState({
            currentModal: modal
        });
    }

    static RemoveModal() {
        ChatApp._instance.setState({
            currentModal: <></>
        });
    }

    render() {
        return (
            <>
                <KeepAliveHelper onExpire={this.props.onLogout} />

                <div className="container-fluid">
                    <div className="row flex-grow-1">
                        <div className="col-2 p-3 border-right bg-white">
                            <Sidebar />
                        </div>
                        <div className="col p-0 bg-white">
                            <Switch>
                                <Route path='/t/:targetUsername' component={Chatbox}/>
                                <Route path='/' render={() => {
                                    return (
                                        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                                            <i>Please select a friend to start chit-chat in private.</i>
                                        </div>
                                    )
                                }}/>
                            </Switch>
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