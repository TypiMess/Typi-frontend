import React from "react";
import Message from "../../../models/Message";

interface IProps {
    message: Message
}

export default class MessageView extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }
    
    render() {
        return (
            <></>
        )
    }
}