import React from "react";
import Alert from "../Alert";

interface IStates {
    alertText: string
}

export default class Login extends React.Component<{}, IStates> {
    constructor(props: {}) {
        super(props);
        
        this.state = {
            alertText: ""
        }
    }
    
    render() {
        return (
            <div className="container rounded shadow p-3 bg-white">
                <h2 className="text-center">Login</h2>
                { this.state.alertText ? <Alert>{ this.state.alertText }</Alert> : <></> }
                <form>
                    <div className="mb-3">
                        <label className="form-label">Username:</label>
                        <input className="form-control" placeholder="Enter your username" pattern="(\w|\d){3,32}"></input>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input className="form-control" type="password" minLength={7} />
                    </div>
                    <button className="btn btn-primary" type="submit">Login</button>
                </form>
            </div>
        )
    }
}