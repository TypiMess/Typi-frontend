import React, { ReactElement } from "react";
import Notification from "./Notification";

interface IStates {
    notifications: NotificationInfo[]
}

interface NotificationInfo {
    title: string,
    type: "normal" | "warning" | "error",
    body: ReactElement
}

export default class NotificationContainer extends React.Component<{}, IStates> {
    private static _instance: NotificationContainer;

    private style: React.CSSProperties = {
        zIndex: 1059
    }

    constructor(props: {}) {
        super(props);

        NotificationContainer._instance = this;

        this.state = {
            notifications: []
        }

        this.handleRemoveNotification = this.handleRemoveNotification.bind(this);
    }

    static AddNotification(notification: NotificationInfo) {
        this._instance.setState({
            notifications: this._instance.state.notifications.concat(notification)
        });
    }

    handleRemoveNotification(index: number) {
        this.setState({
            notifications: this.state.notifications.filter((_, i) => i !== index)
        });
    }

    render() {
        return (
            <div className="toast-container position-fixed top-0 end-0 p-3" style={this.style}>
                {
                    this.state.notifications.map((noti, i) => {
                        return (
                            <Notification
                                title={noti.title}
                                type={noti.type}
                                key={i}
                                notiID={i}
                                onClose={this.handleRemoveNotification}>
                                {noti.body}
                            </Notification>
                        )
                    })
                }
            </div>
        )
    }
}