import React from "react";

interface IProps {
    onClick?: React.MouseEventHandler
}

export default class MenuEntry extends React.Component<IProps> {
    render() {
        return (
            <div className="d-flex p-2 rounded align-items-center menu_entry" onClick={this.props.onClick}>
                { this.props.children }
            </div>
        )
    }
}