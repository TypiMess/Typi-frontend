import React, { MouseEventHandler } from "react";

interface IProps {
    onClose: MouseEventHandler
}

export default class Alert extends React.Component<IProps> {
    constructor(props: IProps)
    {
        super(props);
    }
    
    render() {
        return (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                { this.props.children }
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={this.props.onClose}></button>
            </div>
        )
    }
}