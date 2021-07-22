import React from "react";

export default class InputBar extends React.Component {
    render() {
        return (
            <form className="d-flex p-2 border-top">
                <input id="messageInput" className="form-control flex-grow-1 rounded-pill me-2 py-1 px-3" placeholder="Aa"/>
                <div className="d-inline-flex rounded-circle justify-content-center" id="sendButton"><i className="bi-cursor-fill" style={{ transform: 'rotate(45deg)', fontSize: '1.3em'}} ></i></div>
            </form>
        )
    }
}