import React from "react";

export default class MenuEntry extends React.Component {
    render() {
        return (
            <div className="d-flex p-2 rounded align-items-center menu_entry">
                { this.props.children }
            </div>
        )
    }
}