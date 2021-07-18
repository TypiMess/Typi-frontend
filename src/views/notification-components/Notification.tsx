import React from "react";
import { Toast } from 'bootstrap'

interface IProps {
    title: string,
    type: "normal" | "warning" | "error",
    onClose: Function,
    notiID: number
}

export default class Notification extends React.Component<IProps> {
    private background: string;
    private notiRef: React.RefObject<HTMLDivElement>;

    constructor(props: IProps) {
        super(props);

        switch (props.type) {
            case "warning":
                this.background = "bg-warning";
                break;
            case "error":
                this.background = "bg-danger";
                break;
            case "normal":
            default:
                this.background = "bg-light";
                break;
        }

        this.notiRef = React.createRef();
    }

    componentDidMount() {
        new Toast(this.notiRef.current!).show();
    }

    render() {
        return (
            <div ref={this.notiRef} className={this.background + " toast"} role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <strong className="me-auto">{this.props.title}</strong>
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => this.props.onClose(this.props.notiID)}></button>
                </div>
                <div className="toast-body">
                    {this.props.children}
                </div>
            </div>
        )
    }
}