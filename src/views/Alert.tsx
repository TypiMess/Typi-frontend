import React from "react";

export default class Alert extends React.Component {
    render() {
        return (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                { this.props.children }
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        )
    }
}