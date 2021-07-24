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
            <div id="messagesContainer" className="flex-grow-1 d-flex flex-column-reverse overflow-auto">
                {
                    this.state.messages.map((msg, i) => {
                        return <MessageView message={msg} key={i}></MessageView>
                    })
                }
            </div>
        )
    }
}