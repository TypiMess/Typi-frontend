import React from "react";
import Message from "../../../models/Message";
import MessageView from "./MessageView";

interface IStates {
    messages: Message[]
}

export default class MessagesContainer extends React.Component<{}, IStates> {
    constructor(props: {}) {
        super(props);
        
        this.state = {
            messages: []
        }
    }
    
    render() {
        return (
            <div id="messagesContainer" className="flex-grow-1">
                <div className="d-flex flex-column-reverse h-100">
                    {
                        this.state.messages.map(msg => {
                            return <MessageView message={msg}></MessageView>
                        })
                    }
                </div>
            </div>
        )
    }
}